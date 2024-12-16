// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// استيراد المكونات
import RegisterLogin from "./Auth/Register-Login";
import ClusterMap from "./Map/ClusterMap";
import ReservationForm from "./components/Reservation/Reservation";
import HotelRoomsx from "./components/Hotel/HotelRooms";
import RoomDetails from "./components/Hotel/RoomDetails ";
import Header from "./components/header/Header"
import Home from "./pages/Home";
import Hotels from "./components/Hotel/Hotel";
import HotelFltring from "./components/filter/HotelFltring";
import PaymentForm from "./components/Payment/Payment";
import Nav from "./components/Nav/Nav";
import UserProfile from "./components/pages/UserProfile";
import "./index.css"

const stripePromise = loadStripe("pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX");

function App() {
  return (
    <div className="container">
  
      <Elements stripe={stripePromise}>
        <Routes>
          

          <Route path="/" element={<Home />} />
          <Route path="/RegisterLogin" element={<RegisterLogin />} />
          <Route path="/map" element={<ClusterMap />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
          <Route path="/hotels/:hotelId/rooms/:roomId" element={<RoomDetails />} />
          <Route path="/reservation/:roomId/:hotelId" element={<ReservationForm />} />
          <Route path="/HotelFltring" element={<HotelFltring />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/Nav" element={<Nav />} />


            <Route path="/UserProfile"  element={<UserProfile />} />

          <Route path="/payment/:reservationId" element={<PaymentForm />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
