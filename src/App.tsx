import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import First from './pages/First'
import Second from "./pages/Second";
import { Navigate } from "react-router-dom";
import './App.css'

function App(){


return(<>
<Router>
<div>
<Routes>
    
<Route path="/" element={<Navigate to="/1" replace />} />
<Route path = "/1" element={<First />} />
<Route path = "/2" element={<Second />}/>

</Routes>

</div>
</Router>
</>)
}

export default App
