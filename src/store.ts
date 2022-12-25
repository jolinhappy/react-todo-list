import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todo';

const store = configureStore({
  reducer: {
    // todoReducer: todoReducer
    todoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
