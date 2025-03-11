import React from "react";
import BgVideo from '../../assets/BgVideo.mp4';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Nav from "../Nav/Nav";
import Hotels from "../Hotel/Hotel";
import FutureTrip from "../Future/FutureTrip";

const Livebg = () => {
    return (
        <div className="relative min-h-screen">
            {/* Video background */}
            <video 
                src={BgVideo} 
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            
            {/* Overlay to darken the video if needed */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>

            {/* Content Section */}
            <div className="relative z-10">
                <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50 min-h-screen flex flex-col">
                    <Nav />
                    <Header />
                </div>

                <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50 min-h-screen flex flex-col">
                    <FutureTrip />
                    <Hotels />
                </div>

                <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Livebg;
