import { useNavigate } from "react-router-dom";

function Second() {
  const navigate = useNavigate();
  
  function Redirector() {
    navigate("/");}
  return (
    <>
      <h1>This is second page</h1>
      <button onClick={Redirector}>Go to HOME</button>
    </>
  )
}

export default Second;
