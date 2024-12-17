import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterLogin from "./Auth/Register-Login";
import ClusterMap from "./components/Map/ClusterMap";
import ReservationForm from "./components/Reservation/Reservation";
import HotelRoomsx from "./components/Hotel/HotelRooms";
import RoomDetails from "./components/Hotel/RoomDetails ";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Hotels from "./components/Hotel/Hotel";
import HotelFltring from "./components/filter/HotelFltring";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/Payment/Payment";
import "./index.css";

// Stripe public key
const stripePromise = loadStripe("pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX");

function App() {
  return (
    <div className="container">
      {/* Wrap Routes in Elements for Stripe context */}
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegisterLogin" element={<RegisterLogin />} />
          <Route path="/map" element={<ClusterMap />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
          <Route path="/hotels/:hotelId/rooms/:roomId" element={<RoomDetails />} />
          
          {/* Reservation form with dynamic room and hotel IDs */}
          <Route path="/reservation/:roomId/:hotelId" element={<ReservationForm />} />

          <Route path="/HotelFltring" element={<HotelFltring />} />
          {/* Include header directly in the layout, not as a route */}
          <Route path="/" element={<Header />} />

          {/* Payment Form */}
          <Route path="/payment/:reservationId" element={<PaymentForm />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;

