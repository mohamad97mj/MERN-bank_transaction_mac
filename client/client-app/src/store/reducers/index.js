import { combineReducers } from "redux";
import transactionReducer from "./transaction";

export default combineReducers({
  transaction: transactionReducer
});
