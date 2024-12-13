import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allServices: null,
};

const allServiceSlice = createSlice({
  name: 'allServiceSlice',
  initialState: initialState,
  reducers: {
    setAllService: (state, action) => {
      state.allServices = action.payload;
    },
  },
});

export const {setAllService} = allServiceSlice.actions;
export default allServiceSlice;
