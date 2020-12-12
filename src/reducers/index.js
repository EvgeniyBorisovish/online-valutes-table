import { combineReducers } from "redux";
import {data} from "./data"
import {flow_control} from "./flow_control"
import {filter} from "./filter"
import {errors} from "./errors"

export default combineReducers({
  data,
  filter,
  flow_control,
  errors
});
