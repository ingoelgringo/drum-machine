import "./css/drumMachine.css";
import { useEffect, useRef, useState, useContext } from "react";
import * as Tone from "tone";
import GlobalContext from "./GlobalContext";

const NOTE = "C2";

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

interface Sample {
  id: number;
  url: string;
  name: string;
}

interface DrumType {
  isActive: boolean;
  id: string;
  sequence: Sequence[];
}

interface Sequence {
  beatId: number;
  active: boolean;
}

type BeatSeq = {
  [key: string]: string;
};

interface BeatFetch {
  beatid: number;
  beatname: string;
  beatsequence: BeatSeq;
  player_id: number;
}

function DrumMachine() {
  const { loggedInPlayer, loadedBeat } = useContext(GlobalContext);
  const [fullSetISActive, setFullSetIsActive] = useState<boolean>(true);
  const [playActive, setPlayActive] = useState<boolean>(false);
  const [dotPlacement, setDotPlacement] = useState("");
  const samples: Sample[] = [
    {
      id: 1,
      url: "../../public/audio/krille/bd.wav",
      name: "BD",
    },
    {
      id: 2,
      url: "../../public/audio/krille/sd.wav",
      name: "SD",
    },
    {
      id: 3,
      url: "../../public/audio/krille/hh.wav",
      name: "HH",
    },
    {
      id: 4,
      url: "../../public/audio/krille/oh.wav",
      name: "OH",
    },
    {
      id: 5,
      url: "../../public/audio/krille/cl.wav",
      name: "CL",
    },
  ];
  const createSequence = () =>
    Array.from({ length: 16 }, (_, i) => ({
      beatId: i + 1,
      active: false,
    }));

  const drumIds = ["BD", "SD", "HH", "OH", "CL", "HT", "LT"];

  const [drumActive, setDrumActive] = useState<DrumType[]>(
    drumIds.map((id) => ({
      id,
      isActive: false,
      sequence: createSequence(),
    }))
  );

  const tracksRef = useRef<Track[]>([]);
  const seqRef = useRef<Tone.Sequence | null>(null);

  const handleStartClick = async () => {
    if (Tone.Transport.state === "started") {
      Tone.Transport.stop();
      setPlayActive(false);
    } else {
      await Tone.start();
      Tone.Transport.start();
      setPlayActive(true);
    }
  };

  function convert(input: BeatSeq): DrumType[] {
    return Object.entries(input).map(([id, sequenceString]) => {
      const sequenceJson = sequenceString.replace(/(\d+):/g, '"$1":');
      const parsed = JSON.parse(sequenceJson) as Record<string, boolean>;
      console.log("parsed: ", parsed);
      const sequence: Sequence[] = Object.entries(parsed).map(
        ([beatId, active]) => ({
          beatId: Number(beatId),
          active,
        })
      );

      return {
        id,
        isActive: false,
        sequence,
      };
    });
  }

  //* HÄMTA BEAT
  useEffect(() => {
    if (loggedInPlayer) {
      console.log("loggedInPlayer: ", loggedInPlayer);
      fetch(`/api/beat/${loggedInPlayer}`)
        .then((respone) => respone.json())
        .then((data) => {
          console.log("DATA: ", data);
          data.map((b: BeatFetch) => {
            console.log("b.beatname: ", b.beatname, "loadedBeat: ", loadedBeat);
            if (b.beatname === loadedBeat) {
              const beatSeq = convert(b.beatsequence);
              setDrumActive(beatSeq);
            }
          });
        });
    }
  }, [loggedInPlayer, loadedBeat]);

  useEffect(() => {
    const stepIds = [...Array(16).keys()] as const;

    tracksRef.current = samples.map((sample, id) => ({
      id,
      sampler: new Tone.Sampler({
        urls: { [NOTE]: sample.url },
      }).toDestination(),
    }));

    seqRef.current = new Tone.Sequence(
      (time, step) => {
        const drumsToPlay = fullSetISActive
          ? drumActive
          : drumActive.filter((d) => d.isActive);

        drumsToPlay.forEach((drum) => {
          if (drum.sequence[step]?.active) {
            const trackIndex = samples.findIndex((s) => s.name === drum.id);
            if (trackIndex >= 0) {
              tracksRef.current[trackIndex]?.sampler.triggerAttack(NOTE, time);
            }
          }
        });
      },
      [...stepIds],
      "16n"
    ).start(0);
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.forEach((trk) => trk.sampler.dispose());
    };
    //eslint-disable-next-line
  }, [drumActive, fullSetISActive]);

  useEffect(() => {
    drumActive.forEach((drum) => {
      if (drum.isActive) setDotPlacement(drum.id);
    });
  });

  return (
    <div className="flexContainer">
      <div className="drumMachine">
        <h1>INGO BONGO</h1>
        <div className="controlPanel">
          <div className="playContainer">
            <div
              className={playActive ? "playActive" : "playNotActive"}
              onClick={() => {
                handleStartClick();
              }}
            >
              <img src="../public/images/play-pause.svg" alt="play" />
            </div>
          </div>
          <div className="knobContainer">
            <div
              key="SET"
              className={
                fullSetISActive ? "SET drumActive" : "SET drumNotActive"
              }
              onClick={() => {
                setFullSetIsActive(!fullSetISActive);
                setDrumActive(
                  drumActive.map((drum) => {
                    return { ...drum, isActive: true };
                  })
                );
              }}
            >
              SET
            </div>
            {drumActive.map((drum) => {
              return (
                <div
                  key={drum.id}
                  data-cy={drum.id}
                  className={
                    drum.isActive && !fullSetISActive
                      ? `${drum.id} drumActive`
                      : `${drum.id} drumNotActive`
                  }
                  onClick={() => {
                    setFullSetIsActive(false);
                    setDrumActive(
                      drumActive.map((d) =>
                        d.id === drum.id
                          ? { ...d, isActive: true }
                          : { ...d, isActive: false }
                      )
                    );
                  }}
                >
                  {drum.id}
                </div>
              );
            })}
            <div className="knob">
              <div
                className={
                  fullSetISActive
                    ? "knobDot SETDot"
                    : `knobDot ${dotPlacement}Dot`
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="pads">
          {drumActive
            .find((drum) => drum.isActive)
            ?.sequence.map((beat) => {
              return (
                <div key={beat.beatId} className="padContainer">
                  <div
                    className={beat.active ? "padActive" : "padNotActive"}
                    onClick={() => {
                      setDrumActive(
                        drumActive.map((drum) =>
                          drum.isActive
                            ? {
                                ...drum,
                                sequence: drum.sequence.map((seq) =>
                                  seq.beatId === beat.beatId
                                    ? { ...seq, active: !seq.active }
                                    : seq
                                ),
                              }
                            : drum
                        )
                      );
                    }}
                    data-cy={beat.beatId}
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
      {/* {loadedBeat && <p>{JSON.stringify(drumActive)}</p>} */}
    </div>
  );
}

export default DrumMachine;
