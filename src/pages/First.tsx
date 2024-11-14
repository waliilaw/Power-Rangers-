import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";

function First() {
  const { login, register, isAuthenticated, user } = useKindeAuth();


  const handleLogin = () => login();
  const handleRegister = () => register();
  const navigate = useNavigate()

  function Home(){
    navigate("/2")
  }
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h2>Welcome </h2>
          <p>You are logged in.</p>
          <button onClick={Home}>Go to Home </button>
        </div>
      ) : (
        <div>
          <button onClick={handleRegister} type="button">
            Register
          </button>
          <button onClick={handleLogin} type="button">
            Log In
          </button>
        </div>
      )}
    </>
  );
}

export default First;
