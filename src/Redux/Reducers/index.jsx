import { combineReducers } from "redux";
import { RegionsReducer } from "./RegionsReducer";
import { ProvincesReducer } from "./ProvincesReducer";
import { ReportsReducer } from "./ReportsReducer";

export const allReducers = combineReducers({
  regions: RegionsReducer,
  provinces: ProvincesReducer,
  reports: ReportsReducer
});
