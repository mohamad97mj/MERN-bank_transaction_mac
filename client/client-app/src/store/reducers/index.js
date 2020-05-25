import { combineReducers } from "redux";
import authReducer from "./auth";
import mainReducer from "./main";
import profileReducer from "./profile";
import transactionReducer from "./transaction";

export default combineReducers({
  auth: authReducer,
  profile : profileReducer,
  main: mainReducer,
  transaction: transactionReducer
  // errors: mainReducer,
  // projects: profileReducer,
});
