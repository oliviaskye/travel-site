import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
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
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    navigate("/HotelFltring", {
      state: { destination, date, options, priceRange },
    });
  };

  return (
    <div className="bg-gradient-to-r from-black-300 via-gray-200 to-brown-100 min-h-screen flex flex-col items-center py-10 border-rounded">
      <div className="bg-light-gray p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-black-800 mb-4 text-center">
          Find Your Next Trip
        </h1>
        <small className="block text-gray-500 text-center mb-8">
          Discover amazing destinations with exclusive deals
        </small>

        <div className="space-y-6">
          {/* Destination */}
          <div className="flex items-center border rounded-lg p-1 bg-gray-50 shadow-sm">
            <HotelIcon className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full focus:outline-none text-gray-800 bg-transparent"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="flex items-center border rounded-lg p-3 bg-gray-50 shadow-sm relative">
            <CalendarTodayIcon className="text-gray-500 mr-3" />
            <span
              className="text-gray-700 cursor-pointer"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs
                onChange={(item) => {
                  setDate([item.selection]);
                  setOpenDate(false);
                }}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className=" absolute top-14 left-0 z-10"
                minDate={new Date()}
              />
            )}
          </div>

          {/* Options */}
          <div className="flex items-center border rounded-lg p-3 bg-gray-50 shadow-sm relative">
            <PersonIcon className="text-gray-500 mr-3" />
            <span
              className="text-gray-700 cursor-pointer"
              onClick={() => setOpenOptions(!openOptions)}
            >
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>
            {openOptions && (
              <div className="absolute top-14 left-0 bg-white border rounded-lg p-4 shadow-lg space-y-4 z-10">
                {["adult", "children", "room"].map((key) => (
                  <div className="flex justify-between items-center" key={key}>
                    <span className="text-gray-700 capitalize">{key}</span>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 text-white bg-gray-500 rounded disabled:bg-gray-300"
                        disabled={options[key] <= (key === "adult" ? 1 : 0)}
                        onClick={() => handleOption(key, "d")}
                      >
                        -
                      </button>
                      <span className="mx-3">{options[key]}</span>
                      <button
                        className="px-2 py-1 text-white bg-gray-500 rounded"
                        onClick={() => handleOption(key, "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <p className="text-gray-700">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), priceRange[1]])
                }
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              className="w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-800 transition"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

