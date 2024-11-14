import {useState} from "react";
import { PowerRangers } from "../Rangers/PowerRangers";
import { hashUsername } from "../logic/hash";
import { useNavigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function First(){

  const [username , setUsername ] = useState("")
  const [Ranger , setRanger ] = useState(null)
  const navigate = useNavigate()
  const { login, isAuthenticated, logout } = useKindeAuth();

  function getRanger(username: string){
    const position = hashUsername(username) % PowerRangers.length
    return PowerRangers[position]
  }

  function RangerAssigner(): any{
    const Ranger : any = getRanger(username)
    setRanger(Ranger)
    navigate("/2")
  }

  function toHome() : any {
    navigate("/1")
  }

  const handleLogin = async () => {
    await login(); 
    if(isAuthenticated){navigate("/2")}; 
  };

  const handleLogout = () => logout()

  function Home(){
    navigate("/2")
  }
  
return(<>
  
  <h1>Power Rangers</h1>
  <input type="text"  placeholder="Enter your username" value ={username} onChange={(e) => setUsername(e.target.value)} />
  <button onClick={RangerAssigner}>I'm Ready</button> ||||||| 
  <button onClick={toHome}>Home</button>
  {Ranger && (<>
  <h2>Your Ranger : {Ranger}</h2>
  </>)}


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
          <button onClick={handleLogin} type="button">
            Log In
          </button>
        </div>
      )}
    </>

    
  </>)

}

export default First
