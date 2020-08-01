import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { generate as generateRandomStr } from 'random-string';

//id,text,isdone이라는 속성들이 있어
export interface Todo {
  id:string;
  text: string;
  isDone: boolean;
}

//Todo가 들어잇는 배열 , list 속성이 있어.

export interface TodoList {
  list: Todo[];
}
const initialState: TodoList = {
  list: [],
};

//createAction을 이용하여  addTodos라는 액션함수 생성.
//createAction은 type을 인자로 받아 액션 함수를 만든다.
//액션함수에 특정 값을 인자로 넣어 실행하면 그 값이 payload라는 것으로 포함된 액션 객체가 생성된다.

const actionPrefix = 'TODOS';
const addTodos = createAction<object>(`${actionPrefix}/add`);
const toggleTodos = createAction<object>(`${actionPrefix}/toggle`);

//addTodos({  id:'abc1', text:'hello',})   {types:'TODOS/add', payload:{id:'abc1'. text:'hello'}} addTodos함수를 실행하면 이와 같은 객체가 리턴된다.

const reducers = {
  add: ({ list }: TodoList, { payload: { text, isDone } }: PayloadAction<Todo>) => {
    const newTodo: Todo = {
      id: generateRandomStr(5),
      text: text.toString(),
      isDone
    };
    list.push(newTodo);
  },
  toggle: ({ list }: TodoList, { payload: { id, isDone } }: PayloadAction<Todo>) => {
    const targetIndex = list.findIndex((item: Todo) => item.id === id);
    list[targetIndex].isDone = !isDone;
  },
};

const todoSlice = createSlice({
  reducers,  //각 action type 별로 바뀔 상태값을 정의할 reducer객체
  initialState, //초기상태
  name:actionPrefix, //name:은 위와 actionPrefix값이 들어감. reducers 객체에 add라는 속성이 존재하면, 자동으로 actionType 생성
})

//createSelector 함수는 selector를 생성하는 함수로 memoizaation을 활용해 state 값을 효율적으로 가져올 수 있도록 한다.
export const selectTodoList = createSelector(
  (state: TodoList) => state.list,
  (list:Todo[]) => list,
)

export const actions = {
  addTodos,
  toggleTodos
};

export const rootReducer = combineReducers({
  todos: todoSlice.reducer,
})

console.log(todoSlice)

export type RootState = ReturnType<typeof rootReducer>
