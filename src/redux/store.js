import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import counter from './slices/counter';
import studentbehavior from './slices/studentbehavior';
import enrollment from './slices/enrollment';
import schoolperformance from './slices/schoolperformance';
import studentperformance from './slices/studentperformance';
import strengthweakness from './slices/strengthweakness';
import filter from './slices/filter';
import statebenchmarking from './slices/statebenchmarking';
import financedashboard from './slices/financedashboard';


const reducer = combineReducers({
  'netsales': counter,
  'studentbehavior': studentbehavior,
  'enrollment': enrollment,
  'schoolperformance': schoolperformance,
  'studentperformance': studentperformance,
  'strengthweakness': strengthweakness,
  'filter':filter,
  'statebenchmarking': statebenchmarking,
  'financedashboard': financedashboard
})
const store = configureStore({
  reducer,
})
export default store;