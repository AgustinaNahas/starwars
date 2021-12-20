import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home";
import Pelicula from "./Pelicula";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pelicula/:uid" element={<Pelicula />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
