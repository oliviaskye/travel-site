import { createContext, useContext, useReducer } from 'react';
import reducer from "./reducer";


const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details :{title: '', description: '', price: 0},
  location: { lng: 0, lat: 0 },
  rooms: [],
  priceFilter: 50,
  addressFilter: null,
  filteredRooms: [],
};

const Context = createContext(initialState);



export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
