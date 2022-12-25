import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  todoList: string[],
};

const initialState: IInitialState = {
  todoList: ['大掃除'],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      state.todoList.push(action.payload);
    },
  }
});

export const { addTodoItem }  = todoSlice.actions;
export default todoSlice.reducer