import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrumMachine from "./Components/DrumMachine";
import Login from "./Components/Login";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <DrumMachine
                samples={[
                  {
                    url: "../public/audio/krille/bd.wav",
                    name: "BD",
                  },
                  {
                    url: "../public/audio/krille/hh.wav",
                    name: "HH",
                  },
                  {
                    url: "../public/audio/krille/oh.wav",
                    name: "OH",
                  },
                  {
                    url: "../public/audio/krille/sd.wav",
                    name: "SD",
                  },
                ]}
                numOfSteps={16}
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
