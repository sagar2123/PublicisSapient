import React from 'react';
import './App.css';
import  Routes from "./Routes";
import {renderRoutes} from "react-router-config";

function App() {
  return (
    <div>
      {renderRoutes(Routes)}
    </div>
  );
}

export default App;
