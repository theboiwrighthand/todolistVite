import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  languageDefault : 'en'
}
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.languageDefault = action.payload; 
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;