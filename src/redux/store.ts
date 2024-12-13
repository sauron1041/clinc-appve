import {configureStore} from '@reduxjs/toolkit';
import loadingSlice from './slices/loadingSlice';
import userInfoSlice from './slices/userInfoSlice';
import bodyServiceSlice from './slices/bodyServiceSlice';
import faceServiceSlice from './slices/faceServiceSlice';
import otherServiceSlice from './slices/otherServiceSlice';
import allServiceSlice from './slices/allServicesSlice';
import toastNotifySlice from './slices/toastNotifySlice';

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userInfoSlice.reducer,
    bodyService: bodyServiceSlice.reducer,
    faceService: faceServiceSlice.reducer,
    otherService: otherServiceSlice.reducer,
    allServices: allServiceSlice.reducer,
    toastNotify: toastNotifySlice.reducer,
  },
});

export default store;
