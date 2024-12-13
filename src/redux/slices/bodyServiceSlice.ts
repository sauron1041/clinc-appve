import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bodyService: null,
};

const bodyServiceSlice = createSlice({
  name: 'bodyServiceSlice',
  initialState: initialState,
  reducers: {
    setBodyService: (state, action) => {
      state.bodyService = action.payload;
    },
  },
});

export const {setBodyService} = bodyServiceSlice.actions;
export default bodyServiceSlice;
