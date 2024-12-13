import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  faceService: null,
};

const faceServiceSlice = createSlice({
  name: 'faceServiceSlice',
  initialState: initialState,
  reducers: {
    setFaceService: (state, action) => {
      state.faceService = action.payload;
    },
  },
});

export const {setFaceService} = faceServiceSlice.actions;
export default faceServiceSlice;
