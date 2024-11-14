import  {useState} from "react";
import { PowerRangers } from "../Rangers/PowerRangers";
import { hashUsername } from "../logic/hash";
import { useNavigate } from "react-router-dom";

function Second(){

  const [username , setUsername ] = useState("")
  const [Ranger , setRanger ] = useState(null)
  const navigate = useNavigate()

  function getRanger(username: string){
    const position = hashUsername(username) % PowerRangers.length
    return PowerRangers[position]
  }

  function RangerAssigner(): any{
    const Ranger : any = getRanger(username)
    setRanger(Ranger)
    navigate("/3")
  }

  function toHome() : any {
    navigate("/1")
  }
  
return(<>
  
  <h1>Power Rangers</h1>
  <input type="text"  placeholder="Enter your username" value ={username} onChange={(e) => setUsername(e.target.value)} />
  <button onClick={RangerAssigner}>I'm Ready</button> ||||||| 
  <button onClick={toHome}>Home</button>
  {Ranger && (<>
  <h2>Your Ranger : {Ranger}</h2>
  </>)}
  </>)

}

export default Second
