import React from 'react';
import './App.css';
import {Container} from "./Components/Container";
import { BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route
          path="/:pageId"
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
