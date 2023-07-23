const initialState = {
  selectedDate: {},
  selectedDestinationInput: "",
  selectedOriginInput: "",
  AvailableFlightsList: [],
};

const Reducer = (state = initialState, action) => {
  let {
    selectedDate,
    selectedDestinationInput,
    selectedOriginInput,
    allFlightsData,
  } = action;

  switch (action.type) {
    case "UpdateTripDetails":
      state = {
        ...state,
        selectedDate: JSON.parse(selectedDate),
        selectedDestinationInput,
        selectedOriginInput,
        AvailableFlightsList: allFlightsData,
      };
      break;
    default:
      break;
  }

  return { ...state };
};
export default Reducer;
