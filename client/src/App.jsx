import { Routes, Route } from "react-router-dom";
import React from "react";
import RegisterLogin from "./Auth/Register-Login";
import ClusterMap from "./components/Map/ClusterMap";
import ReservationForm from "./components/Reservation/Reservation";

import HotelRoomsx from "./components/Hotel/HotelRooms";
import RoomDetails from "./components/Hotel/RoomDetails ";

import Header from "./components/header/Header";
import "./index.css";
import Home from "./pages/Home";

import Hotels from "./components/Hotel/Hotel";
import HotelFltring from "./components/filter/HotelFltring";
import UserProfile from "./components/pages/UserProfile";
import UpdateProfile from "./components/pages/UpdateProfile";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/RegisterLogin" element={<RegisterLogin />} />
        <Route path="/map" element={<ClusterMap />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
        <Route
          path="/hotels/:hotelId/rooms/:roomId"
          element={<RoomDetails />}
        />
        <Route path="/reservation" element={<ReservationForm />} />

        <Route path="/HotelFltring" element={<HotelFltring />} />

        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/UpdateProfile" element={<UpdateProfile/>} />


        <Route path="/Header" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;