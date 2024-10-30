import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxClient from '@mapbox/mapbox-sdk';

mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

const ClusterMap = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [24.9384, 60.1695],
      zoom: 10,
    });

    setMap(newMap);

    // الحصول على موقع المستخدم
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]); 
        newMap.flyTo({ center: [longitude, latitude], zoom: 12 }); 
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => newMap.remove();
  }, []);

  const getDirections = async () => {
    const client = MapboxClient({ accessToken: process.env.REACT_APP_MAP_TOKEN });
    const hotelLocation = [24.9384, 60.1695];

    if (!userLocation) {
      console.error('موقع المستخدم غير متوفر.');
      return;
    }

    try {
      const response = await client.getDirections({
        profile: 'driving',
        waypoints: [
          { coordinates: userLocation }, 
          { coordinates: hotelLocation }
        ],
        geometries: 'geojson',
      }).send();

      const route = response.body.routes[0];

     
      if (map) {
        map.flyTo({ center: hotelLocation, zoom: 10 });
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route.geometry.coordinates,
            },
          },
        });
        
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#888',
            'line-width': 8,
          },
        });
      }
    } catch (error) {
      console.error('Wrong', error);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "50vh", width: "100%" }}>
      <Box
        ref={mapContainerRef}
        sx={{ border: "2px solid black", height: "100%", width: "100%" }}
      />
      <Button variant="contained" onClick={getDirections} sx={{ position: 'absolute', top: 10, left: 10 }}>
       find way
      </Button>
    </Box>
  );
};

export default ClusterMap;
