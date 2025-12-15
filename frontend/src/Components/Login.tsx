import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import "./css/login.css";

function Login() {
  const { setLoggedInPlayer } = useContext(GlobalContext);
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleLogIn = async () => {
    fetch(`/api/login/${userName}/${password}`)
      .then((respone) => respone.json())
      .then((data) => {
        setLoggedInPlayer(data[0].playerid);
      });
  };

  return (
    <form action="">
      <label htmlFor="Name">
        Username:
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label htmlFor="Password">
        Password:
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={() => handleLogIn()}>
        <Link to={"/"}>Login</Link>
      </button>
      <button>Create account</button>
    </form>
  );
}

export default Login;
