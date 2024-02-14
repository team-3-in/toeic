import { LoginData } from '../../types/LoginData';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const httpClientForCredentials = axios.create({});

httpClientForCredentials.defaults.baseURL = 'https://api.doit-toeic.xyz';
httpClientForCredentials.defaults.withCredentials = true;

httpClientForCredentials.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      if (error.response.data.message === 'Unauthorized') {
        const originRequest = config;
        try {
          const response = await FetchRefreshToken();

          if (response.status === 200) {
            const newAccessToken = await response.data.data.accessToken;

            httpClientForCredentials.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axios(originRequest);
          }
        } catch (error) {
          window.location.replace('/login');
          alert('로그인해주세요');
        }
      }
    }
    return Promise.reject(error);
  },
);

export const FetchRefreshToken = async () => {
  try {
    const response = await httpClientForCredentials.get('/auth/refresh');
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      alert('로그인 해주세요');
      window.location.replace('/login');
    }
    throw error;
  }
};

export const onLogInSuccess = async (response: AxiosResponse) => {
  try {
    const { accessToken } = await response.data.data;

    httpClientForCredentials.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;
  } catch (error) {
    console.log('onLogInSuccess 실패', error);
    throw error;
  }
};

export const FetchLogIn = async (data: LoginData) => {
  try {
    const response = await httpClientForCredentials.post('/auth/login', data);

    if (response.status === 200) {
      onLogInSuccess(response);
    }
  } catch (error) {
    console.log('FetchLogIn 실패');
    throw error;
  }
};
