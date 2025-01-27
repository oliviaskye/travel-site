import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "../../assets/header.jpg";
import headerCSS from "./Header.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Header() {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [maxPrice, setMaxPrice] = useState(1000);

  const navigate = useNavigate();

  const handleSearch = () => {
    const priceRange = [0, maxPrice];
    navigate("/HotelFltring", {
      state: { destination, date, priceRange }, 
    });
  };
  

  return (
    <div className={`${headerCSS.HeaderWrapper} section`} id="home">
      <div className={headerCSS.Container}>
        <h1>Find Next Place To Trip</h1>
        <small>Discover New Places at Exclusive Deals</small>

        <div className={headerCSS.inputContainer}>
          <input
            type="text"
            placeholder="Enter city"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <div className="date-picker">
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDate([item.selection]);
                  setOpenDate(false);
                }}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>

          <div className="price-range-input">
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
            <p>{`$0 - $${maxPrice}`}</p>
          </div>

          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
