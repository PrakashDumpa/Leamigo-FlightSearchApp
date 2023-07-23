import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./index.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AvailableFlights = () => {
  const [formatedDate, setFormatedDate] = useState("");
  const navigate = useNavigate();

  const data = useSelector((state) => state);

  const {
    selectedDate,
    selectedDestinationInput,
    selectedOriginInput,
    AvailableFlightsList,
  } = data;
  const dateFormate = () => {
    const dateObj = new Date(selectedDate);
    let currentDate = dateObj.getDate();
    let currentMonth = dateObj.getMonth();
    let currentYear = dateObj.getFullYear();
    if (currentMonth + 1 <= 9) {
      currentMonth = `0${currentMonth + 1}`;
    }
    let date = `${currentDate}-${currentMonth}-${currentYear}`;

    setFormatedDate(date);
  };

  useEffect(() => {
    dateFormate();
  }, []);

  const filteredList = AvailableFlightsList?.filter(
    (each) =>
      each.date === formatedDate &&
      each.to === selectedDestinationInput &&
      each.from === selectedOriginInput
  );

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="w-75 card shadow p-3 mt-4">
        <h1 className="mb-4 h2 text-success pl-2">Available Flights</h1>
        <div className="d-flex text-center">
          <h1 className="col-4 h3">Origin Station</h1>
          <h1 className="col-4 h3">Final Station</h1>
          <h1 className="col-4 h3">Date</h1>
        </div>
        {filteredList.length === 0 ? (
          <div>
            <h1 className="text-secondary h2 text-center mt-5 mb-5">
              No Flights Are Available!
            </h1>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </div>
        ) : (
          <ul className="mt-3">
            {filteredList.map((each) => (
              <li
                className="d-flex text-center text-secondary mb-2 mt-1"
                key={each.id}
              >
                <p className="col-4 h5">{each.from}</p>
                <p className="col-4 h5">{each.to}</p>
                <p className="col-4 h5">{each.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailableFlights;
