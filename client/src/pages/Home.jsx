import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Nav from "@Nav";
import FutureTrip from "../Hotelcomponents/Future/FutureTrip";

import "../index.css";
import "../Middleware/mood/Light-Dark";

const Home = () => {
  return (
    <div>
      <Nav  />
      <div className="Header_Container">
        <Header />
      </div>
  
      
      <div className="divider" />
      <div>
        <FutureTrip />
      </div>
      <div className="divider" />

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
