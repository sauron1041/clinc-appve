import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  otherService: null,
};

const otherServiceSlice = createSlice({
  name: 'otherServiceSlice',
  initialState: initialState,
  reducers: {
    setOtherService: (state, action) => {
      state.otherService = action.payload;
    },
  },
});

export const {setOtherService} = otherServiceSlice.actions;
export default otherServiceSlice;
