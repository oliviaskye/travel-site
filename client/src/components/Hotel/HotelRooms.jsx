import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Nav from "../Nav/Nav";
import ReservationForm from "../Reservation/Reservation";
import "./HotelRoomsx.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    padding: "20px",
  },
  imageContent: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const HotelRoomsx = () => {
  const { hotelId, roomId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentRoomImages, setCurrentRoomImages] = useState([]);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Handle theme toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (hotelId) {
      localStorage.setItem("hotelId", hotelId);
    }
    if (roomId) {
      localStorage.setItem("roomId", roomId);
    }
  }, [hotelId, roomId]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hotels/${hotelId}/rooms`
        );
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to fetch rooms. Please try again.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (roomId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/hotels/${hotelId}/rooms/${roomId}`
          );
          setRoom(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching room details:", error);
          setError("Failed to fetch room details. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchRoomDetails();
  }, [hotelId, roomId]);

  const openImageModal = (roomImages) => {
    setCurrentRoomImages(roomImages);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const openReservationModal = (room) => {
    localStorage.setItem("hotelId", hotelId);
    localStorage.setItem("roomId", room._id);
    localStorage.setItem("email", room.email || "");
    localStorage.setItem("price", room.price);

    setSelectedRoom(room);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setSelectedRoom(null);
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hotel-rooms-container">
      <Nav />
      <h2>Available Rooms</h2>

      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <div className="room-image">
              {room.img && Array.isArray(room.img) ? (
                room.img.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${image.replace(/\\/g, "/")}`}
                    alt={room.title}
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    onClick={() => openImageModal(room.img)}
                  />
                ))
              ) : (
                <img
                  src="default-image.jpg"
                  alt={room.title}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                  onClick={() => openImageModal([room.img])}
                />
              )}
            </div>
            <div className="room-info">
              <h3>{room.title}</h3>
              <p>{room.details}</p>
              <p>
                <strong>Price:</strong> ${room.price}
              </p>
              <p>
                <strong>Room Number:</strong> {room.roomNumber}
              </p>
              <button onClick={() => openReservationModal(room)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={closeImageModal}
        style={customStyles.imageContent}
        contentLabel="Room Images Modal"
      >
        <h2>Room Images</h2>
        <div className="image-gallery">
          {currentRoomImages.length > 0 ? (
            currentRoomImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${image.replace(/\\/g, "/")}`}
                alt={`Room Image ${index + 1}`}
                className="gallery-image"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            ))
          ) : (
            <p>No images available for this room.</p>
          )}
        </div>
        <button onClick={closeImageModal} style={{ marginTop: "10px" }}>
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isReservationModalOpen}
        onRequestClose={closeReservationModal}
        style={customStyles}
        contentLabel="Reservation Form Modal"
      >
        <h2>Create a Reservation for {selectedRoom?.title}</h2>
        <ReservationForm room={selectedRoom} onClose={closeReservationModal} />
        <button onClick={closeReservationModal} style={{ marginTop: "10px" }}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default HotelRoomsx;
