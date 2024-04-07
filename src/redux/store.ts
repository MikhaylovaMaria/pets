import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { articleReducer } from "./slices/articles";
import { userReducer } from "./slices/user";
import { defaultReducer } from "./slices/defaultValues";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  articles: articleReducer,
  user: userReducer,
  defaultValues: defaultReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
