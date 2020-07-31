import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { actions, RootState, selectTodoList, Todo } from '../features'

const TodoEditor = () => {
  const dispatch = useDispatch();
  const [inputText,setInputText] = useState<string>('');

  const handleText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  },[])

  const handleEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if(inputText && e.keyCode ===13){
      dispatch(actions.addTodos({
        text:inputText,
        isDone: false
      }));
      setInputText('');
    }
  },[dispatch,inputText])

  return (
    <div>
      <input
      type='text'
      onChange={handleText}
      onKeyDown={handleEnter}
      value={inputText}
      className='txt-input'
      placeholder='써라'/>
    </div>
  )
}

const TodoList = () => {
  const dispatch = useDispatch()
  const todoList = useSelector<RootState,Todo[]>(state => selectTodoList(state.todos));
  const handleCheckbox =useCallback((item:Todo) => {
    dispatch(actions.toggleTodos(item));
  },[dispatch])

  console.log(todoList);
  return (
    <ul>
      {todoList.map((item: Todo) => (
        <li key={item.id}>
          <label>

            <li key={item.id}>
              <input
                type="checkbox"
                checked={ item.isDone }
                onChange={ handleCheckbox.bind({}, item) }
                className='chk-input'
              />

          <span className={item.isDone ? 'txt-complete' : ''}>
            {item.text}
          </span>


          </label>
        </li>
      ))}
    </ul>
  )
}


const App = () => {
  return(
    <div className='container'>
      <h1 className='title'>Todo List</h1>
      <TodoEditor />
      <TodoList />
    </div>
  )
}

export default App;
