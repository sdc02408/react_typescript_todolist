import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { generate as generateRandomStr } from 'randomstring';

//id,text,isdone이라는 속성들이 있어
export interface Todo {
  id:string;
  text: string;
  isDone: boolean;
}

//Todo가 들어잇는 배열 , list 속성이 있어.
export interface TodoList  {
  list: Todo[];
}

 const initialState: TodoList ={
  list:[],
}


//createAction을 이용하여  addTodos라는 액션함수 생성.
//createAction은 type을 인자로 받아 액션 함수를 만든다. 액션함수에 특정 값을 인자로 넣어 실행하면 그 값이 payload라는 것으로 포함된 액션 객체가 생성된다.
const actionPrefix = 'TODOS';
const addTodos = createAction<object>(`%{actionPrefix}/add`);

const reducers = {
  add:({list}: TodoList, {payload:{text,isDone}} : PayloadAction<Todo>) => {
    const newTodo: Todo = {
      id:generateRandomStr(5),
      text:text.toString(),
      isDone
    };

    list.push(newTodo);
  }
}

const todoSlice = createSlice({
  reducers,
  initialState,
  name:actionPrefix,
})

export const selectTodoList = createSelector(
  (state: TodoList) => state.list,
  (list:Todo[]) => list,
)

export const actions = {
  addTodos
};

export const rootReducer = combineReducers({
  todos: todoSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
