import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Pelicula from "./Pelicula";
import React from "react";

function App() {
  return (
      <HashRouter basename="/">
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/pelicula/:uid" element={<Pelicula />} />
          </Routes>
      </HashRouter>
  );
}

export default App;
