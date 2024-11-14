import { useNavigate } from "react-router-dom"


function Third(){

    const navigate = useNavigate()


    function Redirector(){
        navigate("/2")
    }
    return(<>
    
    <h1>This is second page</h1>
    
    <button onClick={Redirector}>Go to HOME </button>
    </>)
}

export default Third