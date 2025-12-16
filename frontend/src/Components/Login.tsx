import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import "./css/login.css";

function Login() {
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [fillFormError, setFillFormError] = useState<boolean>(false);
  const [createAccountSuccess, setCreateAccountSuccess] =
    useState<boolean>(false);
  const { setLoggedInPlayer } = useContext(GlobalContext);

  const handleLogIn = async () => {
    if (userName && password) {
      fetch(`/api/login/${userName}/${password}`)
        .then((respone) => respone.json())
        .then((data) => {
          setLoggedInPlayer(data[0].playerid);
        });
    } else {
      setFillFormError(true);
    }
  };

  const handleCreateAccount = async () => {
    if (userName && password) {
      setCreateAccountSuccess(true);

      // fetch(`/api/login/${userName}/${password}`)
      //   .then((respone) => respone.json())
      //   .then((data) => {
      //     setLoggedInPlayer(data[0].playerid);
      //   });
    }
  };

  return (
    <form action="">
      <label htmlFor="Name">
        Username:
        <input
          data-cy="nameInput"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label htmlFor="Password">
        Password:
        <input
          data-cy="pswInput"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button data-cy="inlogBtn" type="button" onClick={() => handleLogIn()}>
        <Link to={"/"}>Login</Link>
      </button>
      <button
        data-cy="createBtn"
        type="button"
        onClick={() => handleCreateAccount()}
      >
        Create account
      </button>
      {fillFormError && (
        <p data-cy="errorMessage">You need to fill out name and password!</p>
      )}
      {createAccountSuccess && (
        <p data-cy="successMessage">
          You have successfully created an account!
        </p>
      )}
    </form>
  );
}

export default Login;
