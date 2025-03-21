import React from 'react'
import Nav from "@Nav";
import "./Reservation.css"
import Add from "./add"
import ReservationForm from "../../Hotelcomponents/Reservation/Reservation"
const Reservationgrid = ()=>{
    return (
        <div className="container123">
          <nav className="Nav31">
            <Nav />
          </nav>
          <div className="main-content">
            <div className="left">
              <ReservationForm />
            </div>
            <div className="right">
              <Add />
            </div>
          </div>
          <footer className="f123">Footer</footer>
        </div>
      );
}


export default Reservationgrid