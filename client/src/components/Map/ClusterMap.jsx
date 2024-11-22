import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAP_TOKEN;

const ClusterMap = ({ selectedLocation }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [24.92220464661415, 60.16032749891157],
        zoom: 10,
      });
      setMap(mapInstance);
    };
    initializeMap();
    return () => map?.remove();
  }, []);

  useEffect(() => {
    if (selectedLocation && map) {
      map.flyTo({ center: selectedLocation, zoom: 12 });
      new mapboxgl.Marker().setLngLat(selectedLocation).addTo(map);
    }
  }, [selectedLocation, map]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const geocodeResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`, {
        params: {
          access_token: mapboxgl.accessToken,
        },
      });

      const cityData = geocodeResponse.data.features[0];
      if (cityData) {
        const [longitude, latitude] = cityData.geometry.coordinates;
        map.flyTo({ center: [longitude, latitude], zoom: 12 });
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      } else {
        alert("City not found!");
      }

      const response = await axios.get(`http://localhost:5000/api/hotels?city=${searchQuery}`);
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching city or hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        label="Search by city, name, or address"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch} variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Search
      </Button>

      {loading && <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>Searching...</Typography>}

      <div ref={mapContainerRef} style={{ width: "100%", height: "500px", marginTop: '20px' }} />
      
      <Box style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Hotels in {searchQuery}
        </Typography>
        <List>
          {hotels.map((hotel, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={hotel.name}
                secondary={`Address: ${hotel.address} | Price: ${hotel.cheapestPrice} €`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ClusterMap;
