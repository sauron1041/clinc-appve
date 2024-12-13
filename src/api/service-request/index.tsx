import { CustomAxiosResponse } from '../axiosConfig'
import AxiosService from '../axios';

const apiVersion = '/api/v1';

export const updateServiceRequest = async (id: number, data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    console.log("Data:", data);
    console.log("ID:", id);


    const res = await AxiosService.patch(`${apiVersion}/service-request/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const findAllServiceRequestBegingServed = async (data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await AxiosService.get(`${apiVersion}/service-request/find-all-service-request-being-served`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const findAllServiceRequestOfCustomer = async (data: any): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await AxiosService.get(`${apiVersion}/service-request/find-all-service-request-customer-booking`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};


