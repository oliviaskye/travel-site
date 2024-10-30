import React, { useState } from 'react';
import axios from 'axios';

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    img: null, 
    price: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setFormData({
        ...formData,
        img: files[0],
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
    data.append('title', formData.title);
    data.append('details', formData.details);
    data.append('img', formData.img);
    data.append('price', formData.price);
    data.append('location', formData.location);

    try {
      const response = await axios.post('http://localhost:5000/api/room', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Failed to add room. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <div style={{ marginBottom: '15px' }}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Details:</label>
        <textarea name="details" value={formData.details} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Image:</label>
        <input type="file" name="img" onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
        Add Room
      </button>
    </form>
  );
};

export default AddRoomForm;


