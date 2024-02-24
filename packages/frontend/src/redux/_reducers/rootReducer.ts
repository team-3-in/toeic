import { combineReducers } from '@reduxjs/toolkit';
import choices from './choices';
import problem from './problem';

// reducer를 모아두는 rootreducer
const reducer = combineReducers({
  choices,
  problem,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
