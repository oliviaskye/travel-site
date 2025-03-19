// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import Nav from "@Nav";
// import RoomModals from "./RoomModals";
// import "./Rooms.css";

// const Rooms = () => {
//   const { hotelId } = useParams();
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [currentRoomImages, setCurrentRoomImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/hotels/${hotelId}/rooms`
//         );
//         setRooms(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch rooms. Please try again.");
//         setLoading(false);
//         console.error(error); // Log the error for debugging
//       }
//     };

//     fetchRooms();
//   }, [hotelId]);

//   const openImageModal = (roomImages) => {
//     setCurrentRoomImages(roomImages);
//     setCurrentImageIndex(0);
//     setIsImageModalOpen(true);
//   };

//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//   };

//   const handleRoomSelection = (roomId) => {
//     setSelectedRoomId(roomId); // Set selected roomId
//     localStorage.setItem("selectedRoomId", roomId); // Store the selected roomId in localStorage
//   };

//   if (loading) return <p>Loading rooms...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="hotel-rooms-container">
//       <Nav />

//       <div className="room-grid">
//         {rooms.map((room) => (
//           <div
//             key={room._id}
//             className={`room-card ${
//               selectedRoomId === room._id ? "selected" : ""
//             }`}
//             onClick={() => handleRoomSelection(room._id)}
//           >
//             <div className="room-image">
//               {room.img?.length > 0 ? (
//                 <img
//                   src={`http://localhost:5000/${room.img[0].replace(
//                     /\\/g,
//                     "/"
//                   )}`}
//                   alt={room.title}
//                   className="room-img"
//                   onClick={() => openImageModal(room.img)}
//                 />
//               ) : (
//                 <img
//                   src="default-image.jpg"
//                   alt={room.title}
//                   className="room-img"
//                   onClick={() => openImageModal([room.img])}
//                 />
//               )}
//             </div>
//             <div className="room-info">
//               <h3>{room.title}</h3>
//               <p>{room.details}</p>
//               <p>
//                 <strong>Price:</strong> ${room.price}
//               </p>
//               <p>
//                 <strong>Room Number:</strong> {room.roomNumber}
//               </p>

//               <Link
//                 to={`/reservation/${hotelId}/${room._id}`}
//                 className="link-button"
//               >
//                 <button className="nav-button">Book now</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       <RoomModals
//         isImageModalOpen={isImageModalOpen}
//         closeImageModal={closeImageModal}
//         currentRoomImages={currentRoomImages}
//         currentImageIndex={currentImageIndex}
//         setCurrentImageIndex={setCurrentImageIndex}
//       />
//     </div>
//   );
// };

// export default Rooms;
