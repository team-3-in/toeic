import { FetchGetProblem } from '@/apis/problem/FetchGetProblem';
import { Problem } from '@/types/Problem';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DataState {
  problem: Problem;
  isLoading: boolean;
}

const initialState: DataState = {
  problem: {
    id: 0,
    title: '',
    filename: '',
    created_at: '',
    is_public: false,
    updated_at: null,
    questions: [
      {
        content: '',
        choice: '',
        answer: '',
        created_at: '',
        updated_at: null,
        translation: '',
        id: '',
        question_number: 0,
        toeic_id: 0,
      },
    ],
  },
  isLoading: true,
};

const fetchGetProblem = createAsyncThunk<Problem>(
  'getProblem',
  FetchGetProblem,
);

export const problemSlice = createSlice({
  name: 'problem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problem = action.payload;
    });
  },
});

export { fetchGetProblem };
export default problemSlice.reducer;
