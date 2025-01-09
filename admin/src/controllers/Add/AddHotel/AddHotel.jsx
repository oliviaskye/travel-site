import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./AddHotel.scss";

const AddHotels = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    photos: [],
    title: "",
    desc: "",
    rating: "",
    phoneNumber: "",
    cheapestPrice: "",
    maxPrice: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photos") {
      setFormData({
        ...formData,
        photos: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photos") {
        Array.from(value).forEach((file) => data.append("photos", file));
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hotels",
        data
      );
      setMessage(response.data.message || "Hotel added successfully!");
    } catch (error) {
      console.error("Error adding hotel:", error);
      setMessage("Failed to add hotel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="add-hotel-container">
        <form onSubmit={handleSubmit} className="add-hotel-form">
          <h2>Add Hotel</h2>

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />

          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />

          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />

          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          ></textarea>

          <label>Images:</label>
          <input type="file" name="photos" onChange={handleChange} multiple />

          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <label>Cheapest Price:</label>
          <input
            type="number"
            name="cheapestPrice"
            value={formData.cheapestPrice}
            onChange={handleChange}
            required
          />

          <label>Max Price:</label>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            required
          />

          <label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
            Featured
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Adding Hotel..." : "Add Hotel"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddHotels;
