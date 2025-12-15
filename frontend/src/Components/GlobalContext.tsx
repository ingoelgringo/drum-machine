import { createContext, type SetStateAction, type Dispatch } from "react";

const GlobalContext = createContext(
  null as unknown as {
    loggedInPlayer: number | null;
    setLoggedInPlayer: (id: number | null) => void;
    loadedBeat: string;
    setLoadedBeat: Dispatch<SetStateAction<string>>;
  }
);

export default GlobalContext;
