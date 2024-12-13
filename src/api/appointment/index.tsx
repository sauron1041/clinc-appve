import axios, { CustomAxiosResponse } from '../axiosConfig';
import { IAppointmentRequest } from './interface';
import AxiosService from '../axios';

export const addAppointment = async (data: IAppointmentRequest): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.post('/api/v1/appointments', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const appointmentGetHistory = async (data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await AxiosService.get('/api/v1/appointments/get-history', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const appointmentGetHistoryWithFeedback = async (data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await AxiosService.get('/api/v1/appointments/get-booking-history-with-feedback', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};