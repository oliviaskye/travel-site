import React from "react";

import "./HotelRooms.css";
import Header from "./detelis";
import Rooms from "../../Hotelcomponents/room/Rooms";
import Rating from "./Rating";
import Nav from "@Nav";
const HotelRoomsx = () => {
  return (
    <div className="container2">
      <div className="navbar1">
        <Nav />
        
      </div>
      <div className="header1"> 
        <Header />
      </div>
      <div className="rating">
        <Rating />
      </div>
      <div className="content6">
        <Rooms />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default HotelRoomsx;
