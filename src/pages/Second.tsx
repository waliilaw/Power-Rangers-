import { useNavigate } from "react-router-dom";
import { Feedback } from "./source/Feedback";
import {CreaterInfo} from './source/CreaterInfo';


function Second() {
  const navigate = useNavigate();
  

  function Redirector() {
    navigate("/");}
  return (
    <>
    <Feedback/>
    <CreaterInfo />

      <h1>This is second page</h1>
      <button onClick={Redirector}>Go to HOME</button>
    </>
  )
}

export default Second;