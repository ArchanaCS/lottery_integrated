import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from './Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './persist'; 
import {Provider} from 'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Navigation/>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
