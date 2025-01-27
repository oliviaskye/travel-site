import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Nav from "../components/Nav/Nav";
import Hotels from "../components/Hotel/Hotel";
import FutureTrip from "../components/Future/FutureTrip";

const Home = () => {
  return (
    <div>
      {/* Gradient Background for Header and Nav */}
      <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50 min-h-screen flex flex-col">
        <Nav />
        <Header />
      </div>

      {/* Gradient Background for Future Trips and Hotels */}
      <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50 min-h-screen flex flex-col">
        <FutureTrip />
        <Hotels />
      </div>

      {/* Gradient Background for Footer */}
      <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50">
        <Footer />
      </div>
    </div>
  );
};

export default Home;


