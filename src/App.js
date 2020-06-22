import React from 'react';
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
        <Route
          exact
          path="/"
          component={Container}
        />
    </BrowserRouter>
  );
}

export default App;
