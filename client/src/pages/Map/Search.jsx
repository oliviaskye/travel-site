import axios from 'axios';

export const fetchCityCoordinates = async (searchQuery) => {
  const mapboxAccessToken = import.meta.env.VITE_REACT_APP_MAP_TOKEN;
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`,
    {
      params: { access_token: mapboxAccessToken },
    }
  );
  return response.data.features[0];
};

export const fetchHotelsByCity = async (searchQuery) => {
  const response = await axios.get('http://localhost:5000/api/hotels/map', {
    params: { query: searchQuery },
  });
  return response.data;
};

