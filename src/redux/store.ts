import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { articleReducer } from "./slices/articles";
import { userReducer } from "./slices/user";
import { defaultReducer } from "./slices/defaultValues";
import { announmentsReducer } from "./slices/announcements";

const rootReducer = combineReducers({
  articles: articleReducer,
  user: userReducer,
  defaultValues: defaultReducer,
  announments: announmentsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
