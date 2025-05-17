import axios, { AxiosResponse } from "axios";

const mockURL = window.location.origin;

const axiosMockInstance = axios.create({
  baseURL: mockURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const successHandler = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

export const getMockRequest = async <T>(url: string, params?: any) => {
  return axiosMockInstance.get<T>(url, { params }).then(successHandler);
};

export const postMockRequest = async <T>(
  url: string,
  payload: any,
  options?: any
) => {
  return axiosMockInstance.post<T>(url, payload, options).then(successHandler);
};

export const putMockRequest = async <T>(
  url: string,
  payload: any,
  options?: any
) => {
  return axiosMockInstance.put<T>(url, payload, options).then(successHandler);
};

export const patchMockRequest = async <T>(
  url: string,
  payload: any,
  options?: any
) => {
  return axiosMockInstance.patch<T>(url, payload, options).then(successHandler);
};

export const deleteMockRequest = async <T>(url: string, params?: any) => {
  return axiosMockInstance.delete<T>(url, { params }).then(successHandler);
};
