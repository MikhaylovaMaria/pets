import axios from "axios";
import { messageSend } from "./components/chatBox/chatBox";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export const userChats = (id: string | undefined) =>
  instance.get(`/chat/${id}`);

export const getUser = (userId: string) => instance.get(`/auth/me/${userId}`);

//Сообщения
export const getMessages = (id: string) => instance.get(`/message/${id}`);

export const addMessage = (data: messageSend) =>
  instance.post(`/message/`, data);

export default instance;
