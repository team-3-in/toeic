import { combineReducers } from '@reduxjs/toolkit';
import choices from './choices';

// reducer를 모아두는 rootreducer
const reducer = combineReducers({
  choices,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
