// import axios, { AxiosResponse } from 'axios';
// import Cookies from 'js-cookie';

// const API_URL = import.meta.env.VITE_API_URL;

// export interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
//   statusCode?: number;
// }

// class AxiosService {
//   private axiosInstance;

//   constructor() {
//     // Khởi tạo axios instance
//     this.axiosInstance = axios.create({
//       baseURL: API_URL,
//       timeout: 600000, // 10 phút
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // Thêm interceptor cho request
//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const accessToken = Cookies.get('accessToken');
//         if (accessToken) {
//           config.headers['Authorization'] = `Bearer ${accessToken}`;
//         } else {
//           console.warn('Không tìm thấy Access Token trong Cookies!');
//         }
//         return config;
//       },
//       (error) => {
//         console.error('Request Interceptor Error:', error);
//         return Promise.reject(error);
//       }
//     );

//     // Thêm interceptor cho response
//     this.axiosInstance.interceptors.response.use(
//       (response) => {
//         if (response.status === 200) {
//           return response.data;
//         }
//         return response;
//       },
//       async (error) => {
//         const originalRequest = error.config;

//         // Nếu lỗi 401 và chưa thử lại làm mới token
//         if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           try {
//             const refreshToken = Cookies.get('refreshToken');
//             const refreshResponse = await axios.post(
//               `${API_URL}/api/v1/auth/refresh-token`,
//               { refreshToken: refreshToken }
//             );

//             const newAccessToken = refreshResponse.data.accessToken;
//             Cookies.set('accessToken', newAccessToken); // Cập nhật accessToken mới vào cookie

//             // Cập nhật Authorization header với accessToken mới
//             this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//             // Thực hiện lại request ban đầu với token mới
//             return this.axiosInstance(originalRequest);
//           } catch (err) {
//             // Nếu làm mới token thất bại, xóa token và điều hướng đến trang login
//             console.error('Làm mới token thất bại:', err);
//             Cookies.remove('accessToken');
//             Cookies.remove('refreshToken');
//             window.location.href = '/login'; // Điều hướng về trang login
//           }
//         }

//         return Promise.reject(error); // Trả về lỗi nếu không phải lỗi 401 hoặc đã xử lý hết
//       }
//     );
//   }

//   // Hàm để gọi API (dễ sử dụng với các phương thức khác nhau)
//   public async request<T>(config: any): Promise<CustomAxiosResponse<T>> {
//     try {
//       const response = await this.axiosInstance.request<T>(config);
//       return response;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
// }

// export default new AxiosService(); // Khởi tạo và xuất AxiosService

import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

export interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  statusCode?: number;
}

// class AxiosService {
//   private axiosInstance;

//   constructor() {
//     // Khởi tạo axios instance
//     this.axiosInstance = axios.create({
//       baseURL: API_URL,
//       timeout: 600000, // 10 phút
//       headers: {
//         'Content-Type': 'application/json', // Đảm bảo header cho API bình thường
//       },
//     });

//     // Thêm interceptor cho request
//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const accessToken = Cookies.get('accessToken');
//         if (accessToken) {
//           config.headers['Authorization'] = `Bearer ${accessToken}`;
//         } else {
//           console.warn('Không tìm thấy Access Token trong Cookies!');
//         }
//         return config;
//       },
//       (error) => {
//         console.error('Request Interceptor Error:', error);
//         return Promise.reject(error);
//       }
//     );

//     // Thêm interceptor cho response
//     this.axiosInstance.interceptors.response.use(
//       (response) => {
//         if (response.data.statusCode == 200) {
//           return response.data;
//         }
//         return response;
//       },
//       async (error) => {
//         const originalRequest = error.config;

//         // Nếu lỗi 401 và chưa thử lại làm mới token
//         if (error.response.status == 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           try {
//             const refreshToken = Cookies.get('refreshToken');
//             const refreshResponse = await axios.post(
//               `${API_URL}/api/v1/auth/refresh-token`,
//               { refreshToken: refreshToken }
//             );

//             const newAccessToken = refreshResponse.data.accessToken;
//             Cookies.set('accessToken', newAccessToken); // Cập nhật accessToken mới vào cookie

//             // Cập nhật Authorization header với accessToken mới
//             this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//             // Thực hiện lại request ban đầu với token mới
//             return this.axiosInstance(originalRequest);
//           } catch (err) {
//             // Nếu làm mới token thất bại, xóa token và điều hướng đến trang login
//             console.error('Làm mới token thất bại:', err);
//             Cookies.remove('accessToken');
//             Cookies.remove('refreshToken');
//             window.location.href = '/login'; // Điều hướng về trang login
//           }
//         }

//         return Promise.reject(error); // Trả về lỗi nếu không phải lỗi 401 hoặc đã xử lý hết
//       }
//     );
//   }

//   // Hàm để gọi API (dễ sử dụng với các phương thức khác nhau)
//   public async request<T>(config: any): Promise<CustomAxiosResponse<T>> {
//     try {
//       const response = await this.axiosInstance.request<T>(config);
//       return response;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   // Phương thức post để upload formData
//   public async postFormData<T>(url: string, formData: FormData): Promise<CustomAxiosResponse<T>> {
//     try {
//       console.log('token', Cookies.get('accessToken'));
      
//       const response = await this.axiosInstance.post<T>(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Cần thiết để upload file
//         },
//       });
//       return response;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
// }

// // Xuất ra instance của AxiosService để có thể sử dụng ở những nơi khác
// export default new AxiosService();



class AxiosService {
  private axiosInstance;

  constructor() {
    // Cấu hình ban đầu của axiosInstance giữ nguyên
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 600000, // 10 phút
      headers: {
        'Content-Type': 'application/json', // Đảm bảo header cho API bình thường
      },
    });

    // Interceptors giữ nguyên
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        } else {
          console.warn('Không tìm thấy Access Token trong Cookies!');
        }
        return config;
      },
      (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data.statusCode == 200) {
          return response.data;
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status == 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = Cookies.get('refreshToken');
            const refreshResponse = await axios.post(
              `${API_URL}/api/v1/auth/refresh-token`,
              { refreshToken: refreshToken }
            );

            const newAccessToken = refreshResponse.data.accessToken;
            Cookies.set('accessToken', newAccessToken);

            this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return this.axiosInstance(originalRequest);
          } catch (err) {
            console.error('Làm mới token thất bại:', err);
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, params?: object): Promise<CustomAxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async post<T>(url: string, data: object): Promise<CustomAxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async put<T>(url: string, data: object): Promise<CustomAxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async patch<T>(url: string, data: object): Promise<CustomAxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete<T>(url: string): Promise<CustomAxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async postFormData<T>(url: string, formData: FormData): Promise<CustomAxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

// Xuất instance
export default new AxiosService();
