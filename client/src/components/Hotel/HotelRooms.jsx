import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Nav from "../Nav/Nav";
import ReservationForm from "../Reservation/Reservation";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  imageContent: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
  const navigate = useNavigate();

  // Save hotelId and roomId in localStorage
  useEffect(() => {
    if (hotelId) {
      localStorage.setItem('hotelId', hotelId);
    }
    if (roomId) {
      localStorage.setItem('roomId', roomId);
    }
  }, [hotelId, roomId]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms`);
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
          const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/rooms/${roomId}`);
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
    localStorage.setItem('hotelId', hotelId);  
    localStorage.setItem('roomId', room._id);  
    
    setSelectedRoom(room);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setSelectedRoom(null);
  };

  if (loading) return <p className="text-center text-xl text-brown-600">Loading rooms...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Nav />
      <h2 className="text-3xl font-semibold text-brown-800 mb-6 text-center">Available Rooms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="room-image">
              {room.img && Array.isArray(room.img) ? (
                room.img.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${image.replace(/\\/g, "/")}`}
                    alt={room.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openImageModal(room.img)} 
                  />
                ))
              ) : (
                <img
                  src="default-image.jpg"
                  alt={room.title}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => openImageModal([room.img])}
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-brown-800 mb-2">{room.title}</h3>
              <p className="text-brown-700 mb-2">{room.details}</p>
              <p className="text-brown-700"><strong>Price:</strong> ${room.price}</p>
              <p className="text-brown-700 mb-4"><strong>Room Number:</strong> {room.roomNumber}</p>
              <button 
                onClick={() => openReservationModal(room)} 
                className="bg-brown-500 text-white py-2 px-4 rounded-md hover:bg-brown-600 transition"
              >
                Book Now
              </button>
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
        <h2 className="text-xl font-semibold mb-4">Room Images</h2>
        <div className="image-gallery grid grid-cols-2 gap-4">
          {currentRoomImages.length > 0 ? (
            currentRoomImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${image.replace(/\\/g, "/")}`}
                alt={`Room Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No images available for this room.</p>
          )}
        </div>
        <button
          onClick={closeImageModal}
          className="mt-4 py-2 px-4 bg-brown-500 text-white rounded-md w-full hover:bg-brown-600 transition"
        >
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isReservationModalOpen}
        onRequestClose={closeReservationModal}
        style={customStyles}
        contentLabel="Reservation Form Modal"
      >
        <h2 className="text-xl font-semibold mb-4">Create a Reservation for {selectedRoom?.title}</h2>
        <ReservationForm room={selectedRoom} onClose={closeReservationModal} />
        <button
          onClick={closeReservationModal}
          className="mt-4 py-2 px-4 bg-brown-500 text-white rounded-md w-full hover:bg-brown-600 transition"
        >
          Close
        </button>
      </Modal>

      {room && (
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-brown-800 mb-4">{room.title}</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {room.img && Array.isArray(room.img) ? (
              room.img.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${image.replace(/\\/g, "/")}`}
                  alt={room.title}
                  className="w-full h-48 object-cover rounded-md shadow-md"
                />
              ))
            ) : (
              <img
                src="default-image.jpg"
                alt={room.title}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
            )}
          </div>
          <p className="text-brown-700">{room.details}</p>
          <p className="text-brown-700 mt-4"><strong>Price:</strong> ${room.price}</p>
          <p className="text-brown-700"><strong>Location:</strong> {room.location}</p>
        </div>
      )}
    </div>
  );
};

export default HotelRoomsx;
