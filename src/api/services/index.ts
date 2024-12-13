import axios, {CustomAxiosResponse} from '../axiosConfig';

export const getServicesAll = async (page?: number, limit?: number): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.get(`/api/v1/services${page && limit ? `?page=${page}&limit=${limit}` : ''}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getServicesByServicePackageId = async (
  categoryId: string
): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.get('/api/v1/services?categoryId=' + categoryId);
    return res;
  } catch (error) {
    console.log(error);
  }
};
