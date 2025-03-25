import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Nav from "@Nav";

import FutureTrip from "../Hotelcomponents/Future/FutureTrip";
import "../index.css";
import Rewie from '../pages/Rewie';

const Home = () => {
  return (
    <div>
      <Nav />

      <Header />

      <div className="divider" />

      <FutureTrip />

      <div className="divider" />
     |
    <Rewie />
    < div className="divider" />
      <Footer />
    </div>
  );
};

export default Home;
