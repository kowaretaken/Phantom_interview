import { AxiosInstance } from 'axios';

export async function getAxios<T>(api: AxiosInstance, endpoint: string) {
  return await api.get<T>(`${endpoint}`);
}

export async function deleteAxios<T>(
  api: AxiosInstance,
  endpoint: string,
  id: string
) {
  return await api.delete<T>(`${endpoint}/${id}`);
}

export async function postAxios<T>(
  api: AxiosInstance,
  endpoint: string,
  arg: T
) {
  return await api.post<T>(`${endpoint}`, arg);
}

export async function putAxios<QT, BT>(
  api: AxiosInstance,
  endpoint: string,
  id: string,
  arg: BT
) {
  return await api.put<QT>(`${endpoint}/${id}`, arg);
}
