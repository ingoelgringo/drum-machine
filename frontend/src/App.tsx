import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrumMachine from "./Components/DrumMachine";
import Login from "./Components/Login";
import Header from "./Components/Header";
import GlobalContext from "./Components/GlobalContext";

function App() {
  const [loggedInPlayer, setLoggedInPlayer] = useState<number | null>(null);
  const [loadedBeat, setLoadedBeat ] = useState<string>("")
  return (
    <GlobalContext.Provider value={{ loggedInPlayer, setLoggedInPlayer, loadedBeat, setLoadedBeat}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DrumMachine />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
