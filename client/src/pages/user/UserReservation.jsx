import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
// import "../Nav/Nav"
import Nav from "@Nav";

const UserReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/api/reservations/user/${userId}`
        );
        setReservations(response.data);
        setFilteredReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Error fetching reservation data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query === "") {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter(
        (reservation) =>
          reservation.userId.toLowerCase().includes(query) ||
          reservation.HotelId.name.toLowerCase().includes(query)
      );
      setFilteredReservations(filtered);
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/reservations/${reservationId}`
      );

      setReservations(
        reservations.filter((reservation) => reservation._id !== reservationId)
      );
      setFilteredReservations(
        filteredReservations.filter(
          (reservation) => reservation._id !== reservationId
        )
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  if (loading) {
    return (
     
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
       
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
        <Nav />
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Reservation History
      </Typography>

  
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User ID</strong>
              </TableCell>
              <TableCell>
                <strong>Hotel Name</strong>
              </TableCell>
              <TableCell>
                <strong>Room Number</strong>
              </TableCell>
              <TableCell>
                <strong>Start Date</strong>
              </TableCell>
              <TableCell>
                <strong>End Date</strong>
              </TableCell>
              <TableCell>
                <strong>Paid</strong>
              </TableCell>
              {/* <TableCell>
                <strong>Actions</strong>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation._id}>
                <TableCell>{reservation.userId}</TableCell>
                <TableCell>{reservation.HotelId.name}</TableCell>
                <TableCell>
                  {reservation.roomId
                    ? reservation.roomId.roomNumber.join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(reservation.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(reservation.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{reservation.isPaid ? "Yes" : "No"}</TableCell>
                {/* <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => deleteReservation(reservation._id)}
                  >
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    </div>
  );
};

export default UserReservation;