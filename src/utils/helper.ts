import { redirect } from "react-router-dom";

export const isUserLogged = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId && !token) {
    return null;
  }
  return userId;
};

export const checkAuthLoader = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (!token || !userId) {
    return redirect("/");
  }
  return null;
};

export const isAuthLoader = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (token && userId) {
    return redirect(`/${userId}`);
  }
  return null;
};
