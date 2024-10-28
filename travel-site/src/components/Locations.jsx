import { Router, Routes, Route } from "react-router-dom"
import Hotels from "../pages/Hotels";

function Locations() {
    return(

        <div className="main">

        <Router>
                <Routes>
                    <Route
                        path="/hotels"
                        element={<stockholm/>}
                    />
                    <Route
                        path="/hotels"
                        element={<rovaniemi/>}
                    />
                    <Route
                        path="/hotels"
                        element={<rome/>}
                    />
                    <Route
                        path="/hotels"
                        element={<budapest/>}
                    />
                </Routes>
        </Router>



            {/* <div className="city-link">Stockholm</div>
            <div className="city-link">Rovaniemi</div>
            <div className="city-link">Rome</div>
            <div className="city-link">Budapest</div> */}
        </div>
    )
}

export default Locations;