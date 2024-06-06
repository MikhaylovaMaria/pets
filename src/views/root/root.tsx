import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Outlet } from "react-router-dom";
import { isUserLogged } from "../../utils/helper";
import { useEffect } from "react";
import { fetchCurrentUser, fetchUserFriends } from "../../redux/slices/user";
import { fetchAnnouncements } from "../../redux/slices/announcements";
import { fetchUserArticles } from "../../redux/slices/articles";

export const Root = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = isUserLogged();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCurrentUser(userId));
      dispatch(fetchAnnouncements(userId));
      dispatch(fetchUserArticles(userId));
      dispatch(fetchUserFriends(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};
