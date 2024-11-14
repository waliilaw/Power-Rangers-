import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import First from "./pages/First";
import Second from "./pages/Second";

function App(){
return(<>
<Router>
<div>
<Routes>

<Route path = "/" element={<First />}/>
<Route path = "/2" element={<Second />} />

</Routes>

</div>
</Router>
</>)
}

export default App