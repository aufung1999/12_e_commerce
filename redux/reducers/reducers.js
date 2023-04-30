import { combineReducers } from "redux";

//######################################################################################################

const addBtnReducer = (state = false, action) => {
  switch (action.type) {
    case "addBtn-is-Clicked":
      return !state;
    default:
      return state;
  }
};

//############################################################################################################################################################
const reducers = combineReducers({
  addBtn: addBtnReducer,
});

export default reducers;
