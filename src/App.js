import React from 'react';
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import './App.css';
import reducers from "./reducers";
import Routes from "./Routes";

const store = createStore(reducers, window.InitialState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}> 
      <BrowserRouter>
        <div>
          {renderRoutes(Routes)}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
