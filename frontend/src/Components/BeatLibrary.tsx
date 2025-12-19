import { useEffect, useState, useContext } from "react";
import "./css/beatLibrary.css";
import GlobalContext from "./GlobalContext.tsx";

interface Beats {
  beatid: number;
  beatname: string;
  beatsequence: JSON;
  player_id: number;
  playerid: number;
  username: string;
}

function BeatLibrary() {
  const { loggedInPlayer, setLoadedBeat } = useContext(GlobalContext);
  const [beats, setBeats] = useState<Beats[]>();

  const handleBeatSelect = (name: string) => {
    setLoadedBeat(name);
  };

  useEffect(() => {
    if (loggedInPlayer) {
      fetch(`/api/beat/${loggedInPlayer}`)
        .then((respone) => respone.json())
        .then((data) => {
          setBeats(data);
        });
    }
  }, [loggedInPlayer]);

  return (
    <>
      <label>
        BEATS
        <select
          data-cy="beat"
          onChange={(e) => handleBeatSelect(e.target.value)}
        >
          {beats?.map((beat) => (
            <option key={beat.beatid} value={beat.beatname}>
              {beat.beatname}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default BeatLibrary;
