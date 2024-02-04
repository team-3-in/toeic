import { httpClientForCredentials } from '../BaseUrl';
import { LoginData } from '../../types/LoginData';
import { AxiosError, AxiosResponse } from 'axios';

export const onLogInSuccess = async (response: AxiosResponse) => {
  const { accessToken, expiresIn } = await response.data.data;

  httpClientForCredentials.defaults.headers.common['Authorization'] =
    `Bearer ${accessToken}`;

  const currentTime = new Date(Date.now());
  const tokenExpirationTime = new Date(Date.now() + expiresIn * 1000);
  const refreshTime = tokenExpirationTime.getTime() - currentTime.getTime();
  console.log('accessToken', response.data.message);

  setTimeout(() => {
    FetchRefreshToken();
  }, refreshTime);
};

export const FetchRefreshToken = async () => {
  try {
    const res = await httpClientForCredentials.get('/auth/refresh');

    if (res.status === 200) {
      onLogInSuccess(res);
      console.log('refresh', res.data.message);
    }
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 401) {
      alert('로그인 해주세요');
    }

    throw new Error();
  }
};

export const FetchLogIn = async (data: LoginData) => {
  try {
    const response = await httpClientForCredentials.post('/auth/login', data);

    if (response.status === 200) {
      onLogInSuccess(response);
    }
  } catch (err) {
    console.log('로그인 에러 발생', err);
    throw new Error();
  }
};
