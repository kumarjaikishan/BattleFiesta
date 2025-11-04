import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_API_GOOGLE_CLIENTID
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter >
        <PersistGate persistor={persistor} >
          <ThemeProvider theme={theme}>
            <GoogleOAuthProvider clientId={clientId}>
              <App />
            </GoogleOAuthProvider>
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
)
