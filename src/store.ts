import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todo';
import { loggerMiddleware } from "./middleware";
import { combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "./apis/todoApi";

const reducers = combineReducers({
  todoReducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware).concat(todoApi.middleware);
  },
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export default store;
