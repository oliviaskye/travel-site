

import React, { useState } from "react";
import axios from "axios";

const AddHotels = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    photos: [],
    title: "",
    desc: "",
    rating: "",
    cheapestPrice: "",
    featured: false,
  });

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
    const data = new FormData();

    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("city", formData.city);
    data.append("address", formData.address);
    Array.from(formData.photos).forEach((file) => data.append("photos", file));
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("rating", parseFloat(formData.rating));
    data.append("cheapestPrice", formData.cheapestPrice);
    data.append("featured", formData.featured);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/hotels",
        data
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Failed to add hotel. Please try again.");
    }
    console.log("Form data before submitting:", formData);

  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Description:</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Images:</label>
        <input type="file" name="photos" onChange={handleChange} multiple />
      </div>
      <div style={{ marginBottom: "15px" }}>
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
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Cheapest Price:</label>
        <input
          type="number"
          name="cheapestPrice"
          value={formData.cheapestPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Featured:</label>
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
        />
      </div>

      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default AddHotels;
