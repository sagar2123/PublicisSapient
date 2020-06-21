import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from "./Components/Container";
import { BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route
          exact
          path="/page/:pageId"
          render={(matchProps) =>
            <Container
              {...matchProps}
            />
          }
        />
    </BrowserRouter>
  );
}

export default App;
