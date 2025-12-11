import { type Dispatch, type SetStateAction, createContext } from "react";

const GlobalContext = createContext(
  null as unknown as {
    loggedInPlayer: number | null;
    setLoggedInPlayer: Dispatch<SetStateAction<number | null>>;
  }
);

export default GlobalContext;
