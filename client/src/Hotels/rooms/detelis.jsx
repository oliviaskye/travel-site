import React, { useEffect, useState } from "react";

const Header = ({ hotelId }) => {
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
    width: "100vw", // استخدم "100vw" بدلاً من "100vh" للحصول على عرض الشاشة بالكامل
    display: "flex",
    flexDirection: "row-reverse", // لجعل العناصر من اليمين لليسار
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    justifyContent: "flex-end", // تحديد ترتيب العناصر في الحاوية
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

export default Header;
