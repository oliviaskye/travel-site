import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAP_TOKEN;

export const initializeMap = (container) => {
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [24.92220464661415, 60.16032749891157], // Default position (Helsinki)
    zoom: 10,
    interactive: true,
  });

  return map;
};

export const flyToLocation = (map, coordinates) => {
  map.flyTo({
    center: coordinates,
    zoom: 12,
    essential: true,
  });
};

