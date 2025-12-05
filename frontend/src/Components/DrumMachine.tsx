import "./drumMachine.css";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const NOTE = "C2";

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

type Props = {
  samples: { url: string; name: string }[];
  numOfSteps: number;
};

interface PadType {
  isActive: boolean;
  id: number;
}
interface DrumType {
  isActive: boolean;
  id: string;
}

function DrumMachine({ samples, numOfSteps }: Props) {
  const [playActive, setPlayActive] = useState<boolean>(false);
  const [dotPlacement, setDotPlacement] = useState("");
  const [drumActive, setDrumActive] = useState<DrumType[]>([
    { isActive: false, id: "SET" },
    { isActive: false, id: "BD" },
    { isActive: false, id: "SD" },
    { isActive: false, id: "HH" },
    { isActive: false, id: "OH" },
    { isActive: false, id: "CL" },
    { isActive: false, id: "HT" },
    { isActive: false, id: "LT" },
  ]);
  const [padBtn, setPadBtn] = useState<PadType[]>([
    { isActive: false, id: 1 },
    { isActive: false, id: 2 },
    { isActive: false, id: 3 },
    { isActive: false, id: 4 },
    { isActive: false, id: 5 },
    { isActive: false, id: 6 },
    { isActive: false, id: 7 },
    { isActive: false, id: 8 },
    { isActive: false, id: 9 },
    { isActive: false, id: 10 },
    { isActive: false, id: 11 },
    { isActive: false, id: 12 },
    { isActive: false, id: 13 },
    { isActive: false, id: 14 },
    { isActive: false, id: 15 },
    { isActive: false, id: 16 },
  ]);

  const tracksRef = useRef<Track[]>([]);
  const stepsRef = useRef<HTMLDivElement[][]>([[]]);
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

  useEffect(() => {
    const stepIds = [...Array(numOfSteps).keys()] as const;

    tracksRef.current = samples.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: { [NOTE]: sample.url },
      }).toDestination(),
    }));
    seqRef.current = new Tone.Sequence(
      (time, step) => {
        tracksRef.current.forEach((trk) => {
          if (padBtn[step]?.isActive) {
            trk.sampler.triggerAttack(NOTE, time);
          }
        });
        console.log(step);
      },
      [...stepIds],
      "16n"
    ).start(0);
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.forEach((trk) => trk.sampler.dispose());
    };
  }, [samples, numOfSteps, padBtn]);

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
            {drumActive.map((drum) => {
              return (
                <div
                  key={drum.id}
                  className={
                    drum.isActive
                      ? `${drum.id} drumActive`
                      : `${drum.id} drumNotActive`
                  }
                  onClick={() => {
                    setDrumActive(
                      drumActive.map(({ id }) =>
                        id === drum.id
                          ? { id, isActive: true }
                          : { id, isActive: false }
                      )
                    );
                  }}
                >
                  {drum.id}
                </div>
              );
            })}
            <div className="knob">
              <div className={`knobDot ${dotPlacement}Dot`}></div>
            </div>
          </div>
        </div>
        <div className="pads">
          {padBtn.map((pad) => {
            return (
              <div key={pad.id} className="padContainer">
                <div
                  className={pad.isActive ? "padActive" : "padNotActive"}
                  onClick={() => {
                    setPadBtn(
                      padBtn.map(({ id, isActive }) =>
                        id === pad.id
                          ? { id, isActive: !isActive }
                          : { id, isActive }
                      )
                    );
                  }}
                  ref={(elm) => {
                    if (!elm) return;
                    if (!stepsRef.current[0]) {
                      stepsRef.current[0] = [];
                    }
                    stepsRef.current[0][pad.id] = elm;
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DrumMachine;
