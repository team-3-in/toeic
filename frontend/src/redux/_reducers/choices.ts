import { createSlice } from '@reduxjs/toolkit';
import { Choice } from '../../types/Choice';

interface DataState {
  choices: Choice[];
}

const initialState: DataState = {
  choices: [],
};

export const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {},
});

export default choicesSlice.reducer;
