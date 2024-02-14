import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    selectChoice: (state, action: PayloadAction<Choice>) => {
      const existingChoice = state.choices.find(
        (choice) => choice.questionIndex === action.payload.questionIndex,
      );

      if (existingChoice) {
        // 이미 선택된 Choice가 있다면 해당 객체의 answer를 갱신
        existingChoice.answer = action.payload.answer;
      } else {
        // 없으면 기존 state에 새로운 Choice를 추가
        state.choices = [...state.choices, action.payload];
      }
    },
  },
});

export const { selectChoice } = choicesSlice.actions;
export default choicesSlice.reducer;
