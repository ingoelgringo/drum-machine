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
          <Route path="/" element={<DrumMachine />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
