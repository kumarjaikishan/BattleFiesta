import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import  store  from './store/store.js'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
   <Provider store={store}>
    <BrowserRouter >
      <PersistGate persistor={persistor} >
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
