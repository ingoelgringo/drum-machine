import { useEffect, useState, useContext } from "react";
import "./beatLibrary.css";
import GlobalContext from "./GlobalContext";

interface Beats {
  beatid: number;
  beatname: string;
  beatsequence: JSON;
  player_id: number;
  playerid: number;
  username: string;
}

function BeatLibrary() {
  const { loggedInPlayer } = useContext(GlobalContext);
  const [beats, setBeats] = useState<Beats[]>();

  const handleBeatSelect = () => {};

  useEffect(() => {
    fetch(`/api/beat/${loggedInPlayer}`)
      .then((respone) => respone.json())
      .then((data) => {
        setBeats(data);
        console.log("DATA: ", data);
      });
  }, [loggedInPlayer]);

  return (
    <>
      <label>
        BEATS
        <select>
          {beats?.map((beat) => {
            return (
              <option value={beat.beatname} onClick={handleBeatSelect}>
                {beat.beatname}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
}

export default BeatLibrary;
