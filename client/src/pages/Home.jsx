import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import Hotels from "../Hotelcomponents/Hotel/Hotel";

import "../index.css";
import "../Middleware/mood/Light-Dark";

const Home = () => {
  return (
    <div>
      <div className="Header_Container">
        <Header />
      </div>
  

      <div>
        <div>
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
