import axios, { CustomAxiosResponse } from '../axiosConfig';
// import AxiosService from '../axios';

export const addFeeback = async (data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.post('/api/v1/feedbacks', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
