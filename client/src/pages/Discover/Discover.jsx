import React, { useState } from "react";
import "./Discover.css";
import Nav from "@Nav";

import Searchtrem from "../../components/Search/Searchtrem";
import Hotels from "../../Hotelcomponents/filter/HotelFltring";

function Discover() {
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (data) => {
    console.log("Received search data in Discover:", JSON.stringify(data, null, 2));
    setSearchData(data);
  };

  return (
    <div className="container1">
      <div className="header">
        <Nav />
      </div>
      <div className="sidebar">
        <Searchtrem onSearch={handleSearch} />
      </div>
      <div className="content">
     
        <Hotels searchData={searchData} />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}


export default Discover;
