

import React, { useState } from "react";
import "./Discover.css"
import Nav from "@Nav"
import Searchtrem from "../../components/Search/Searchtrem"
import HotelFltring from "../../Hotelcomponents/filter/HotelFltring";
import Footer from "../../components/footer/Footer";
const Discover = () => {

    const [searchData, setSearchData] = useState(null);

    const handleSearch = (data) => {
      console.log("Received search data in Discover:", JSON.stringify(data, null, 2));
      setSearchData(data);
    };


  return (
    <div className="All-Parts">
      <div className="part-1">
        <Nav />
      </div>
      <div className="part-2">
      <Searchtrem onSearch={handleSearch} />
      </div>
      <div className="part-3">
      <HotelFltring searchData={searchData} />
      </div>
      <div className="part-4">
        <Footer />
      </div>
    </div>
  );
};

export default Discover;
