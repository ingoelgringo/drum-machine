import "./drumMachine.css";
import { useEffect, useState } from "react";

interface PadType {
  isActive: boolean;
  id: number;
}
interface DrumType {
  isActive: boolean;
  id: string;
}

function DrumMachine() {
  const [playActive, setPlayActive] = useState<boolean>(false);
  const [dotPlacement, setDotPlacement] = useState("");
  const [drumActive, setDrumActive] = useState<DrumType[]>([
    { isActive: false, id: "set" },
    { isActive: false, id: "bd" },
    { isActive: false, id: "sd" },
    { isActive: false, id: "hh" },
    { isActive: false, id: "oh" },
    { isActive: false, id: "cl" },
    { isActive: false, id: "ht" },
    { isActive: false, id: "lt" },
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
                setPlayActive(!playActive);
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
                  {drum.id.toUpperCase()}
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
