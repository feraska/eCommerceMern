import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import   { store, persistor }  from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Lodaing.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <PersistGate loading={<Loading/>} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>

)
