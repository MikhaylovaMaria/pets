import { useDispatch, useSelector } from "react-redux";
import { Paths } from "./path";
import ArticlePage from "./views/Articles/arcticlesPage";
import AnnouncementNew from "./views/announcement/announcement";
import Chats from "./views/chats/chat";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { Register } from "./views/register";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { fetchCurrentUser, selectisAuth } from "./redux/slices/user";
import { fetchCities } from "./redux/slices/defaultValues";
import ArticlePageCreate from "./views/Articles/arcticleCreatePage";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Home />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.announcement,
    element: <AnnouncementNew />,
  },
  { path: Paths.chats, element: <Chats /> },
  { path: Paths.articles, element: <ArticlePage /> },
  { path: Paths.default, element: <Login /> },
  { path: Paths.сreateArticles, element: <ArticlePageCreate /> },
]);
function App() {
  const isAuth = useSelector(selectisAuth);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchCities());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
