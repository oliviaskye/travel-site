import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

const ClusterMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, 
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-74.5, 40], 
      zoom: 3, 
    });

    return () => map.remove();
  }, []);

  return (
    <Box sx={{ position: "relative", height: "50vh", width: "100%" }}>
      <Box
        ref={mapContainerRef}
        sx={{ border: "2px solid black", height: "100%", width: "100%" }}
      />

    </Box>
  );
};

export default ClusterMap;
