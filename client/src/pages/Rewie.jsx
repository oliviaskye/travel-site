import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Parallax } from "swiper/modules";

const RatingList = [
  { id: "1", name: "John Doe", comment: "Best hotel I've ever stayed at!", image: "https://randomuser.me/api/portraits/men/3.jpg", stars: 5 },
  { id: "2", name: "Jane Smith", comment: "Great experience, highly recommend!", image: "https://randomuser.me/api/portraits/women/4.jpg", stars: 4 },
  { id: "3", name: "Sam Wilson", comment: "The staff was amazing, very friendly.", image: "https://randomuser.me/api/portraits/men/5.jpg", stars: 5 },
  { id: "4", name: "Emily Johnson", comment: "Loved the ambience and service!", image: "https://randomuser.me/api/portraits/women/6.jpg", stars: 4 },
  { id: "5", name: "Michael Brown", comment: "Highly recommended, will visit again.", image: "https://randomuser.me/api/portraits/men/7.jpg", stars: 5 },
  { id: "6", name: "Alice Green", comment: "Amazing experience! Great location.", image: "https://randomuser.me/api/portraits/women/7.jpg", stars: 5 },
  { id: "7", name: "George Black", comment: "Would come back every time!", image: "https://randomuser.me/api/portraits/men/8.jpg", stars: 4 },
];

function Review() {
  return (
    <div style={styles.wrapper}>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={10}  // Decreased gap between slides
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}  // Faster autoplay speed
        speed={700}  // Faster slide transition
        parallax={true}
        modules={[Autoplay, Parallax]}
      >
        {RatingList.map((person) => (
          <SwiperSlide key={person.id}>
            <div style={styles.ratingItem}>
              <img src={person.image} alt={person.name} style={styles.image} />
              <div style={styles.textContainer}>
                <h3 style={styles.name}>{person.name}</h3>
                <p style={styles.comment}>{person.comment}</p>
                <div style={styles.stars}>
                  {"★".repeat(person.stars)}{"☆".repeat(5 - person.stars)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    height: "auto",
    padding: "10px 10",
    backgroundColor: "#f9f9f9",  // Light background for a modern look
  },
  ratingItem: {
    display: "flex",
    alignItems: "center",
    padding: "40px",  // Increased padding for a larger box
    backgroundColor: "#fff",
    borderRadius: "20px",  // Rectangular, no rounded corners
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Subtle shadow for elevation
    marginBottom: "2px",  // Increased margin for more separation between reviews
    transition: "transform 0.3s ease-in-out",  // Smooth hover effect
    maxWidth: "450px",  // Increased width for the review box
    margin: "0 auto",  // Center the item horizontally
  },
  image: {
    width: "80px",  // Larger image for better visual impact
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "20px",  
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: "20px",  // Larger font size for name
    fontWeight: "600",  // Slightly bolder text
    margin: "5px 0",
    color: "#333",
  },
  comment: {
    fontSize: "16px",  // Larger font size for comment
    color: "#666",
    margin: "10px 0",
    lineHeight: "1.6",  // More line spacing for better readability
  },
  stars: {
    fontSize: "20px",  // Larger stars for more visibility
    color: "#f39c12",  
  },
};

export default Review;