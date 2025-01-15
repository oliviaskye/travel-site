import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { fetchCityCoordinates, fetchHotelsByCity } from '../Search/Search';
import { initializeMap, flyToLocation } from '../mapUtils/mapUtils';
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mapInstance = initializeMap(mapContainerRef.current);
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a city or country name!');
      return;
    }
  
    setLoading(true);
    setHotels([]);
  
    try {
      const cityData = await fetchCityCoordinates(searchQuery);
      if (cityData) {
        const [longitude, latitude] = cityData.geometry.coordinates;
        

        const cityMarker = new mapboxgl.Marker({ anchor: 'center' })
          .setLngLat([longitude, latitude])
          .addTo(map);
          
      
        cityMarker.getElement().style.pointerEvents = 'none';
  
   
        flyToLocation(map, [longitude, latitude]);
      }
    
  
      const hotelsData = await fetchHotelsByCity(searchQuery);
      setHotels(hotelsData);
  
      if (hotelsData.length === 0) {
        alert('No hotels found in this location.');
      } else {
  
        hotelsData.forEach((hotel) => {
          if (hotel.latitude && hotel.longitude) {
            const hotelMarker = new mapboxgl.Marker({ anchor: 'center' })
              .setLngLat([hotel.longitude, hotel.latitude])
              .addTo(map);
            
       
            hotelMarker.getElement().style.pointerEvents = 'none';
          }
          console.log(hotel.longitude, hotel.latitude)
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>

      <Box sx={{ width: '300px', padding: '20px', overflowY: 'auto' }}>
        <TextField
          label="Search by city or country"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button>

        {loading && (
          <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
            Searching...
          </Typography>
        )}

        <Box style={{ marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Hotels in {searchQuery}
          </Typography>

          {hotels.length === 0 ? (
            <Typography>No hotels found in this city.</Typography>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }}>
              {hotels.map((hotel) => (
                <div key={hotel._id} className="container" style={{ border: '1px solid #ccc', padding: '15px' }}>
                  <img
                    src={`http://localhost:5000/${hotel.photos && hotel.photos.length > 0 ? hotel.photos[0].replace(/\\/g, '/') : 'default-image.jpg'}`}
                    alt={hotel.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <h3>{hotel.name}</h3>
                  <p><strong>Country:</strong> {hotel.country}</p>
                  <p><strong>City:</strong> {hotel.city}</p>
                  <p><strong>Address:</strong> {hotel.address}</p>
                  <p><strong>Cheapest Price:</strong> ${hotel.cheapestPrice}</p>
                  <p><strong>Max Price:</strong> ${hotel.maxPrice}</p>
                  <p><strong>Phone Number:</strong> {hotel.phoneNumber}</p>

                  <Link to={`/hotels/${hotel._id}/rooms`}>Go to Rooms</Link>
                </div>
              ))}
            </div>
          )}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, height: '500px', marginTop: '20px' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  );
};

export default Map;
