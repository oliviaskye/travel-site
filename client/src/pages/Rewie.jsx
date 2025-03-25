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
        spaceBetween={0}  // 👈 No space between slides
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={800}
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
    overflow: "hidden",
    padding: "0", // 👈 No extra padding
  },
  ratingItem: {
    display: "flex",
    alignItems: "center",
    padding: "6px",  // 👈 Reduced padding
    backgroundColor: "#fff",
    borderRadius: "6px",
    width: "100%", // 👈 Full width to eliminate gaps
  },
  image: {
    width: "40px", // 👈 Slightly smaller image
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "8px",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: "12px",
    fontWeight: "bold",
    margin: "1px 0",
  },
  comment: {
    fontSize: "10px",
    color: "#555",
    margin: "2px 0",
  },
  stars: {
    fontSize: "12px",
    color: "#f39c12",
  },
};

export default Review;







