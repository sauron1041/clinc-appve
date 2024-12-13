import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IToastNotify {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | null;
  duration: number;
}

const initialState: IToastNotify = {
  message: '',
  type: null,
  duration: 0,
};

const toastNotifySlice = createSlice({
  name: 'toastNotifySlice',
  initialState: initialState,
  reducers: {
    setToastNotify: (state, action: PayloadAction<IToastNotify>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration;
    },
    clearToastNotify: (state) => {
      state.message = '';
      state.type = null;
      state.duration = 0;
    },
  },
});

export const {setToastNotify, clearToastNotify} = toastNotifySlice.actions;
export default toastNotifySlice;
