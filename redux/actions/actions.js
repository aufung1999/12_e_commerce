import moment from "moment";
import * as uuid from "uuid";

export const loadInitalDataAction = () => {
  // Thunk Function
  return async (dispatch, getState) => {
    // Fetching results from an API : asynchronous action
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=6e0f30fd9824b943d84e28b935ec6e4d&units=metric&cnt=40"
    );
    const data = await response.json();

    dispatch({
      type: "loadInital-Weather-Data",
      payload: data,
    });
  };
};

//###################################################################################

export const loadTodosAction = (data) => {
  return {
    type: "add-to-Cart",
    payload: data,
  };
};

