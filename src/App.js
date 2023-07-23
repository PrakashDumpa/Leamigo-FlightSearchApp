import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchFlight from "./Components/SearchFlight";
import NavBar from "./Components/NavBar";
import AvailableFlights from "./Components/AvailableFlights";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.alert(
      "Please find the json file for testing the ui with different combinations!"
    );
  }, []);
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
