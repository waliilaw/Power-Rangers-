import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import First from './pages/First';
import Second from "./pages/Second";
import './App.css'
import {Feedback} from './pages/Feedback';
import {CreaterInfo} from './pages/CreaterInfo';
import {YourRanger} from './pages/YourRanger';

function App() {
  return (
    <>
    <Feedback/>
    <CreaterInfo/>
    <YourRanger/>
      <Router>
        <div>
    <Routes>
            <Route path="/" element={<First />} />
            <Route path="/2" element={<Second />} />
    </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
