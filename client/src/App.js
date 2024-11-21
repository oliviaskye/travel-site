import { Routes, Route } from "react-router-dom";
import RegisterLogin from "./Auth/Register-Login";
import ClusterMap from "./components/2-Map/ClusterMap ";
import ReservationForm from "./components/4-Reservation/Reservation";
import Hotels from "./components/Hotel/Hotel";
import HotelRoomsx from "./components/Hotel/HotelRooms";
import RoomDetails from "./components/Hotel/RoomDetails ";
import HotelList from "./Admin/Hotel/HotelList ";
import AddHotels from "./Admin/AddHotel/AddHotel";
import EditHotel from "./Admin/Edit/EditHotel ";
import HotelRooms from "./Admin/Rooms/RoomsList";
import AddRoomForm from "./Admin/AddRooms/AddRooms";
import EditRoom from "./Admin/Edit/EditRoom ";
import UserList from "./Admin/Users/UserList";

import "./index.css";

function App() {
  return (
    <div className="container">
      <Routes>
        {/* Admin */}

        <Route path="/admin/hotels" element={<HotelList />} />
        <Route path="/admin/hotels/AddHotels" element={<AddHotels />} />
        <Route path="/admin/hotels/edit/:hotelId" element={<EditHotel />} />
        <Route path="/admin/hotels/:hotelId/rooms" element={<HotelRooms />} />
        <Route path="/hotels/:hotelId/add-room" element={<AddRoomForm />} />
        <Route path="/hotels/:hotelId/rooms/:roomId/edit" element={<EditRoom />} />
        <Route path="/admin/User" element={<UserList />} />


        {/* Admin */}

        <Route path="/" element={<RegisterLogin />} />
        <Route path="/map" element={<ClusterMap />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
        <Route path="/hotels/:hotelId/rooms/:roomId" element={<RoomDetails />}/>
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/UserProfile"element={<UserProfile/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
