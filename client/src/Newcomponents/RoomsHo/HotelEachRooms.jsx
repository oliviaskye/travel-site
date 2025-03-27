import React from "react";
import "./HotelEachRooms.css";
import Part13 from "./part-13";
import Part12 from "./part-12";
import Nav from "@Nav";
import Rooms from "../../Hotelcomponents/room/Rooms"


const HotelEachRooms = () => {
  return (
    <div className="All-Parts10">
      <div className="part-11">
        <Nav />
      </div>
      <div className="part-12">
        <Part12 />
      </div>
      <div className="part-13">
        <Part13 />
      </div>
      <div className="part-14">
        <Rooms />
      </div>
      <div className="part-15">
      
      </div>
    </div>
  );
};

export default HotelEachRooms;