import axios, { CustomAxiosResponse } from '../axiosConfig';



export const notificationGetAll = async (params: any | undefined): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.get('/api/v1/notification', { params });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const notificationCreate = async (data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.post('/api/v1/notification/send-notify', data);
    return res;
  } catch (error) {
    console.log(error);
  }
}



export const notificationUpdate = async (id: number, data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.patch(`/api/v1/notification/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const notificationGetById = async (id: number | any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.get(`/api/v1/notification/find-by-id/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};