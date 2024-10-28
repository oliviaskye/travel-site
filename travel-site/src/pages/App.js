// import Locations from "../components/Locations.jsx"
import { BrowserRouter } from "react-router-dom";
import Photo from "../components/Photo.jsx";
import { Link } from "react-router-dom";
// import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Photo/>
      </div>
    </BrowserRouter>
  );
}


