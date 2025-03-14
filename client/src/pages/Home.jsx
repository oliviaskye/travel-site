import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Nav from "@Nav";
import Hotels from "../Hotelcomponents/Hotel/Hotel";
import FutureTrip from "../Hotelcomponents/Future/FutureTrip";
import "../index.css";
import "../Middleware/mood/Light-Dark.css";

const Home = () => {
  return (
    <div>
      <div className="Header_Container">
        <Nav />
        <Header />
      </div>

      <div>
        <div>
          <FutureTrip />
          <div className="divider" />
          <Hotels />
        </div>
      </div>
      <div className="divider" />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
