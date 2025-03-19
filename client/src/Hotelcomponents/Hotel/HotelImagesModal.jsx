import React from "react";
import Modal from "react-modal";
import "../Hotel/HotelImagesModal.css";  // This will now use the same CSS file as the second one.
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    textAlign: "center",
    position: "relative",
  },
};

const HotelImagesModal = ({ isOpen, onClose, images }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Hotel Images Modal"
      className="hotel-images-modal"
    >
      <div className="image-gallery-container">
        <Swiper
          className="image-swiper"
          loop={true} 
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          modules={[Navigation]}
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`http://localhost:5000/${image.replace(/\\/g, "/")}`}
                  alt={`Hotel Image ${index + 1}`}
                  className="gallery-image"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </SwiperSlide>
            ))
          ) : (
            <p>No images available for this hotel.</p>
          )}
        </Swiper>

        <div className="container-btn">
          <button className="nav-button prev-btn">
            <FaArrowLeft />
          </button>
          <button onClick={onClose} className="nav-button">
            <FaTimes size={20} />
          </button>
          <button className="nav-button next-btn">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HotelImagesModal;
