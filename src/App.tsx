import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { addTodoItem } from './slices/todo';
import { useAppSelector, useAppDispatch } from './hooks';

const Main = styled.div `
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  background-color: #ffe3e9;
`
const Container = styled.div `
  max-width: 550px;
  height: calc(100% - 60px);
  margin: auto;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`
const Header = styled.div `
  height: 70px;
  width: 100%;
  background-color: #3A4F7A;
  text-align: center;
  color: #E98EAD;
  font-weight: 600;
  font-size: 28px;
  line-height: 60px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`
const Body = styled.div `
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const Input = styled.input `
  height: 35px;
  font-size: 28px;
  border: 2px solid #E98EAD;
  border-radius: 3px;
  padding: 5px 10px;
  color: #3A4F7A;
  &:focus {
    border-color: #3A4F7A;
  }
`
const AddButton = styled.button `
  width: 100%;
  height: 55px;
  border: none;
  margin-top: 15px;
  background-color: #E98EAD;
  font-size: 20px;
  color: #3A4F7A;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    /* color: #E98EAD; */
    background-color: #FFC6D3;
  }
`
const TodoListContainer = styled.ul `
  margin-top: 15px;
  width: 100%;
  height: calc(100% - 250px);
  overflow-y: scroll;
  display: block;
`
const ListItem = styled.li `
  font-size: 20px;
  color: #E98EAD;
  /* line-height: 28px; */
  font-weight: 500;
  & + li {
    margin-top: 18px;
  }
`

function App() {
  const { todoList } = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();
  const [ todoListItem, setTodoListItem ] = useState<string>('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoListItem(e.target.value)
  };
  const onSubmitTodoItem = () => {
    if (todoListItem === '') {
      alert('尚未填寫待辦事項！');
      return;
    }
    dispatch(addTodoItem(todoListItem));
    setTodoListItem('');
  };
  return (
    <Main>
      <Container>
        <Header>Todo List</Header>
        <Body>
          <Input type="text" value={ todoListItem } onChange={ onInputChange }></Input>
          <AddButton onClick={ onSubmitTodoItem }>Add Todo</AddButton>
          <TodoListContainer>
            {
              todoList.map((item) => (
                <ListItem key={item}>- { item }</ListItem>
              ))
            }
          </TodoListContainer>
        </Body>
      </Container>
    </Main>
  );
}

export default App;
