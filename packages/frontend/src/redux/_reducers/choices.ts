import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Choice } from '../../types/Choice';

interface DataState {
  choicesArray: Choice[];
}

const initialState: DataState = {
  choicesArray: [],
};

export const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {
    selectChoice: (state, action: PayloadAction<Choice>) => {
      const existingChoice = state.choicesArray.find(
        (choice) => choice.questionIndex === action.payload.questionIndex,
      );

      if (existingChoice) {
        // 이미 선택된 Choice가 있다면 해당 객체의 answer,choiceIndex를 갱신
        existingChoice.answer = action.payload.answer;
        existingChoice.choiceIndex = action.payload.choiceIndex;
      } else {
        // 없으면 기존 state에 새로운 Choice를 추가
        state.choicesArray = [...state.choicesArray, action.payload];
      }
    },
  },
});

export const { selectChoice } = choicesSlice.actions;
export default choicesSlice.reducer;
