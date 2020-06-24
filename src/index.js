import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import App from './App';
import { BrowserRouter, Route} from "react-router-dom";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter> ,
  document.getElementById('root')
);
