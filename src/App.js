import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchFlight from "./Components/SearchFlight";
import NavBar from "./Components/NavBar";
import AvailableFlights from "./Components/AvailableFlights";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchFlight />} />
        <Route path="/available-flights" element={<AvailableFlights />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
