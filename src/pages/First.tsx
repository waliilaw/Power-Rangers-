import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";

function First() {
  const { login, register, isAuthenticated,logout } = useKindeAuth();


 const handleLogin = async () => {
    await login(); 
    if(isAuthenticated){navigate("/2")}; 
  };
  
  const handleRegister = () => register();
  const navigate = useNavigate()
  const handleLogout = () => logout()

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
          <button onClick={handleLogout}>Log out</button>
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
