import React from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css"

import RegisterLogin from "./Auth/Register-Login";

import Home from "./pages/Home";

import HotelFltring from "./components/filter/HotelFltring";
import Hotels from "./components/Hotel/Hotel";
import HotelRoomsx from "./components/Hotel/HotelRooms";

import ReservationForm from "./components/Reservation/Reservation";
import PaymentForm from "./components/Payment/Payment";

import UserProfile from "./components/pages/UserProfile";
import UserReservation from "./components/pages/UserReservation";

import Map from "./Map/Map/Map";


const stripePromise = loadStripe("pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX");


// Stripe public key


function App() {
  return (
    <div className="container">
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegisterLogin" element={<RegisterLogin />} />
          <Route path="/map" element={<Map />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
   
          <Route path="/reservation/:roomId/:hotelId" element={<ReservationForm />} />

          <Route path="/HotelFltring" element={<HotelFltring />} />
          <Route path="/UserProfile" element={<UserProfile />} />

          <Route path="/UserReservation" element={<UserReservation />} />

          <Route path="/payment/:reservationId" element={<PaymentForm />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;



