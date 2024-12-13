import axios, {CustomAxiosResponse} from '../axiosConfig';
import {IUploadImage} from './interface';

export const uploadImageServiceRequest = async (data: IUploadImage): Promise<CustomAxiosResponse<any> | undefined> => {
  try {
    const res = await axios.post('/api/v1/sevice-request-image/upload-image', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
