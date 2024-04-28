import { useDispatch } from "react-redux";
import ArticlePage from "./views/Articles/arcticlesPage";
import AnnouncementNew from "./views/announcement/AnnouncementNew";

import { Login } from "./views/login/login";
import { Register } from "./views/register/register";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/slices/user";
import { fetchCities } from "./redux/slices/defaultValues";
import ArticlePageCreate from "./views/Articles/arcticleCreatePage";
import { fetchAnnouncementsTypes } from "./redux/slices/announcements";
import AnnouncementMap from "./views/announcement/announcementInMap";
import AllUsersPage from "./views/home/allUsersPage";
import UserPage from "./views/home/userPage";
import UserChats from "./views/home/userChats";
import { AppDispatch } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1>ERROR</h1>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: ":userId",
        children: [
          {
            index: true,
            element: <UserPage />,
          },
        ],
      },
      {
        path: "announcements",
        element: <AnnouncementMap />,
      },
      {
        path: "createAnnouncement",
        element: <AnnouncementNew />,
        errorElement: <h1>Errr</h1>,
      },
      {
        path: "articles",
        element: <ArticlePage />,
        children: [
          {
            path: ":articleId",
            element: <h1>ARTICLE</h1>,
          },
        ],
      },
      {
        path: "createArticle",
        element: <ArticlePageCreate />,
        errorElement: <h1>Errr</h1>,
      },

      {
        path: "chats",
        element: <UserChats />,
      },
      {
        path: "allUsers",
        element: <AllUsersPage />,
      },
    ],
  },
]);

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchCities());
    dispatch(fetchAnnouncementsTypes());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
