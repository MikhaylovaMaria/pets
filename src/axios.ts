import axios from "axios";
import { messageSend } from "./components/chatBox/chatBox";
import { paramsCreate } from "./redux/slices/articles";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export const userChats = (id: string | undefined) =>
  instance.get(`/chat/${id}`);

// Пользователи

export const getUser = (userId: string) => instance.get(`/auth/me/${userId}`);

export const getUserInfo = (userId: string) => instance.get(`users/${userId}`);

export const getAllUsers = () => instance.get("/users");

export const getUsersFriends = (userId: string) =>
  instance.get(`users/${userId}/friends`);

//Сообщения
export const getMessages = (id: string) => instance.get(`/message/${id}`);

export const addMessage = (data: messageSend) =>
  instance.post(`/message/`, data);

// Объявления
export const getAnnoncements = (
  userId?: string,
  southWest?: number[],
  northEast?: number[]
) =>
  instance.get(`/announcement`, {
    params: { userId, southWest, northEast },
  });

export const getAnnoncementTypes = () => instance.get("/types");
export const createAnnocement = (params: any) =>
  instance.post("/announcement", params);

// Статьи
export const getArticles = (userId?: string) =>
  instance.get(`/articles`, { params: { userId } });

export const postNewArticle = (params: paramsCreate) =>
  instance.post("/articles", params);

export const removeArticle = (articleId: string) =>
  instance.delete(`/articles/${articleId}`);

export default instance;
