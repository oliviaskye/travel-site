<<<<<<< HEAD
=======

// App.js
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
import React from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
<<<<<<< HEAD
=======


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
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
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
<<<<<<< HEAD
      <Elements stripe={stripePromise}>
        <Routes>
=======

  
      <Elements stripe={stripePromise}>
        <Routes>
          



>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
          <Route path="/" element={<Home />} />
          <Route path="/RegisterLogin" element={<RegisterLogin />} />
          <Route path="/map" element={<Map />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId/rooms" element={<HotelRoomsx />} />
<<<<<<< HEAD
   
=======
          <Route path="/hotels/:hotelId/rooms/:roomId" element={<RoomDetails />} />

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
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

<<<<<<< HEAD


=======
>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a
