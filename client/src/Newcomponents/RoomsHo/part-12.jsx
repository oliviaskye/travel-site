import React, { useEffect, useState } from "react";

const Part12 = ({ hotelId }) => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      const storedHotel = localStorage.getItem("selectedHotel");
      if (storedHotel) {
        const hotelData = JSON.parse(storedHotel);
        if (hotelData.id === hotelId) {
          setHotel(hotelData);
        }
      }
    };

    fetchHotelData();
  }, [hotelId]);

  return (
    <div style={styles.container}>
 
      {hotel ? (
        <div style={styles.hotelInfo}>
          <h2 style={styles.hotelName}>{hotel.name}</h2>
          <div style={styles.hotelInfo1}>
            <p>
              <strong>Country:</strong> {hotel.country}
            </p>
            <p>
              <strong>City:</strong> {hotel.city}
            </p>
            <p>
              <strong>Price:</strong> ${hotel.cheapestPrice}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading hotel data...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw", 
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  hotelInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "10px", 
  },
  hotelName: {
    fontSize: "30px",  
    fontWeight: "bold", 
    fontFamily: "'Arial', sans-serif", 
    
  },
  hotelInfo1: {
    fontSize: "14px",
    fontWeight: "normal", 
    fontFamily: "'Tahoma', sans-serif", // اختيار خط أخف
    color: "black", 
  },
};

export default Part12;