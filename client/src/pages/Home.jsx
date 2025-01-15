import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Nav from "../components/Nav/Nav";
import Hotels from "../components/Hotel/Hotel";
import FutureTrip from "../components/Future/FutureTrip";
import "./Home.css";

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
          <Hotels />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
