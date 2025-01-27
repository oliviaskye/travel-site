// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import ContextProvider from './context/ContextProvider';
// import { BrowserRouter } from "react-router-dom";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { ThemeProvider } from '../src/Themprovider';
// import ErrorBoundary from '../src/ErrorBoundary'; 
// import './index.css'; 


// const stripePromise = loadStripe('pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX');

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <ContextProvider>
//       <ErrorBoundary> {/* قرار دادن ErrorBoundary */}
//         <ThemeProvider>
//           <Elements stripe={stripePromise}>
//             <App />
//           </Elements>
//         </ThemeProvider>
//       </ErrorBoundary>
//     </ContextProvider>
//   </BrowserRouter>
// );


import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ContextProvider from './context/ContextProvider';
import { BrowserRouter } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QFvkhLAzYW8YRzjlm4VYKp19bMXpFMoHcCsHM3wda661NR4YOjHO2iyXMrDZmNqKfGUNXD5neKjeUmt1mTClIgc00RBYWEAAX');

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <>
    <Elements stripe={stripePromise}>
      <App />
      </Elements>
      </>
    </ContextProvider>
  </BrowserRouter>
);