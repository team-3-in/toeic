import { httpClientForCredentials } from '../auth/FetchLogIn';

export const FetchGetProblem = async () => {
  const response = await httpClientForCredentials.get('/toeic/7');
  return response.data;
};
