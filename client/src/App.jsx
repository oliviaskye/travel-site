import React from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import  "@container" 
import RegisterLogin from "./pages/Auth/Register-Login";

import Home from "./pages/Home";

import HotelFltring from "./Hotelcomponents/filter/HotelFltring";
import Hotels from "./Hotelcomponents/Hotel/Hotel";
import HotelRoomsx from "./Hotelcomponents/Hotel/HotelRooms";

import ReservationForm from "./Hotelcomponents/Reservation/Reservation";

import PaymentForm from "./Hotelcomponents/Payment/Payment";

import UserProfile from "./pages/user/UserProfile";
import UserReservation from "./pages/user/UserReservation";
import UpdateProfile from "./pages/user/UpdateProfile";

import Map from "./pages/Map/Map";

import Livebg from "./components/Live bg/Livebg";

const stripePromise = loadStripe(
  "pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX"
);


function App() {
  
  return (
    <div>
      <Livebg />
      <div className="container">
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/RegisterLogin" element={<RegisterLogin />} />
            <Route path="/map" element={<Map />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
            <Route
              path="/reservation/:roomId/:hotelId"
              element={<ReservationForm />}
            />
            <Route path="/HotelFltring" element={<HotelFltring />} />
            <Route path="/UserReservation" element={<UserReservation />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="/payment/:reservationId" element={<PaymentForm />} />
          </Routes>
        </Elements>
      </div>
    </div>
  );
}


export default App;
