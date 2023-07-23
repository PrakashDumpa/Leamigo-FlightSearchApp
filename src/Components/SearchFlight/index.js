import Autocomplete from "@mui/material/Autocomplete";
import { v4 as gid } from "uuid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import flights_data from "../../flights_data.json";

const SearchFlight = (props) => {
  const [selectedOriginInput, setSelectedOriginInput] = useState("");
  const [selectedDestinationInput, setSelectedDestinationInput] = useState("");
  const [originStationsList, setOriginStationsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [allFlightsData, setAllFlightsData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFlights = async () => {
    try {
      // We can run the local JSON server and can make API calls to it. But when we are hosting on a server
      // it is not posible to run the json server on Hosting server.
      // For the Hosting services i'm commenting below.So uncomment below when we are running locally by running a JSON server.
      // const result = await fetch("http://localhost:3000/AvailableFlights");
      // const flights = await result.json();

      const flights = flights_data.AvailableFlights;
      // comment above when running local JSON server

      setAllFlightsData(flights);
      let uniqueOriginStations = [];
      flights.forEach((each) => {
        uniqueOriginStations.push(each.from);
      });
      uniqueOriginStations = Array.from(new Set(uniqueOriginStations)).map(
        (each) => ({
          label: each,
          id: gid(),
        })
      );
      setOriginStationsList(uniqueOriginStations);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFlights();
  }, []);

  const onChangeFromFlight = (event, selObject) => {
    if (selObject !== null) {
      setSelectedOriginInput(selObject.label);
    }
  };

  const onChangeToFlight = (event, selObject) => {
    if (selObject !== null) {
      setSelectedDestinationInput(selObject.label);
    }
  };

  const onChangeDate = (selDate) => {
    setSelectedDate(selDate);
  };

  const onClickSearchButton = () => {
    if (
      selectedOriginInput === selectedDestinationInput &&
      selectedOriginInput !== ""
    ) {
      window.alert("Origin and Destination should not be same!");
      return;
    }

    if (
      selectedDestinationInput &&
      selectedOriginInput &&
      JSON.stringify(selectedDate) !== JSON.stringify({})
    ) {
      dispatch({
        type: "UpdateTripDetails",
        selectedDate: JSON.stringify(selectedDate),
        selectedDestinationInput,
        selectedOriginInput,
        allFlightsData,
      });
      navigate("/available-flights");
    } else {
      window.alert("Please fill all the fields!");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="mt-3 p-3 d-flex">
        <div className="p-3 pb-0">
          <h1 className="h3 mb-3">Origin</h1>
          <Autocomplete
            options={originStationsList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select" />}
            onChange={onChangeFromFlight}
            value={selectedOriginInput}
          />
        </div>
        <div className="p-3 pb-0">
          <h1 className="h3 mb-3">Destination</h1>
          <Autocomplete
            options={originStationsList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select" />}
            onChange={onChangeToFlight}
            value={selectedDestinationInput}
          />
        </div>
        <div className="p-3 pb-0">
          <h1 className="h3 mb-3">Planning on</h1>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker onChange={onChangeDate} value={selectedDate} />
          </LocalizationProvider>
        </div>
        <div className="align-self-end p-3">
          <Button
            size="large"
            sx={{ height: 56, width: 150 }}
            variant="contained"
            color="primary"
            onClick={onClickSearchButton}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFlight;
