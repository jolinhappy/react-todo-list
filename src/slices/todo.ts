import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { v4 as uuidv4 } from 'uuid';


interface ITodoItem {
  id: string;
  todoItemContent: string;
  hadDone: boolean;
}

interface IInitialState {
  todoList: ITodoItem[],
};

const initialState: IInitialState = {
  todoList: [
    {
      id: uuidv4(),
      todoItemContent: '大掃除',
      hadDone: false,
    }
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      const { id, todoItemContent } = action.payload;
      state.todoList.push({
        id,
        todoItemContent,
        hadDone: false,
      });
    },
    deleteTodoItem: (state, action) => {
      state.todoList = state.todoList.filter((item) => item.id !== action.payload.id);
    },
    toggleTodoItemStatus: (state, action) => {
      state.todoList.forEach((item) => {
        if (item.id === action.payload.id) {
          item.hadDone = !item.hadDone;
        }
        console.log('res', state.todoList)
      })

    }
  }
});

export const { addTodoItem, deleteTodoItem, toggleTodoItemStatus }  = todoSlice.actions;
export default todoSlice.reducer