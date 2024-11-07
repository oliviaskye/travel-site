import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';

mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

const ClusterMap = ({ onCenter }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [24.92220464661415, 60.16032749891157],
      zoom: 10,
    });

    setMap(newMap);

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
    if (!userLocation) {
      console.error('Location is wrong');
      return;
    }

    const directionsClient = MapboxDirections({ accessToken: mapboxgl.accessToken });
    const hotelLocation = [24.92220464661415, 60.16032749891157];

    try {
      const response = await directionsClient.getDirections({
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
      console.error('Error:', error);
    }
  };

  const centerMap = (coordinates) => {
    if (map) {
      map.flyTo({ center: coordinates, zoom: 12 });
    }
  };

  useEffect(() => {
    if (onCenter) {
      onCenter(centerMap);
    }
  }, );

  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100%" }}>
      <Box
        ref={mapContainerRef}
        sx={{ border: "2px solid black", height: "100%", width: "100%" }}
      />
      <Button variant="contained" onClick={getDirections} sx={{ position: 'absolute', top: 10, left: 10 }}>
        Find Us
      </Button>
    </Box>
  );
};

export default ClusterMap;
