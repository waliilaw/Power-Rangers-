import { useNavigate } from "react-router-dom";
import {Feedback} from './Feedback';
import {CreaterInfo} from './CreaterInfo';
import {YourRanger} from '../YourRanger';

function Second() {
  const navigate = useNavigate();
  

  function Redirector() {
    navigate("/");}
  return (
    <>
    <Feedback/>
    <CreaterInfo />
    <YourRanger />
      <h1>This is second page</h1>
      <button onClick={Redirector}>Go to HOME</button>
    </>
  )
}

export default Second;