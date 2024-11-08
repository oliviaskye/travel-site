import { Routes, Route } from "react-router-dom";
import AddRoomForm from "./components/3-AddRoom/AddRoom";
import RegisterLogin from "./Auth/Register-Login";
// import ClusterMap from "./components/2-Map/ClusterMap";
import Rooms from "./components/3-AddRoom/Rooms";
import Reservation from "./components/4-Reservation/Reservation";
import './index.css';
import UserProfile from "./components/pages/UserProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        {/* <Route path="/map" element={<ClusterMap />} />
        <Route path="/add-room" element={<AddRoomForm />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/reservation/:id" element={<Reservation />} />  */}
        <Route path="/UserProfile"element={<UserProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;

