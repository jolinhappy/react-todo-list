import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { addTodoItem, deleteTodoItem, toggleTodoItemStatus } from './slices/todo';
import { useAppSelector, useAppDispatch } from './hooks';
import { v4 as uuidv4 } from 'uuid';
import { useGetTodosQuery } from './apis/todoApi';

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
  display: flex;
  align-items: center;
  & + li {
    margin-top: 18px;
  }
`
const Checkout = styled.input.attrs({ type: 'checkbox' }) `
  margin-right: 15px;
`
const ItemContent: any = styled.label.attrs({ for: 'check' }) `
  display: inline-block;
  flex-grow: 1;
  text-decoration: ${(props: any) => (props.hadDone ? 'line-through' : 'none')};
`
const DeleteButton = styled.button `
  height: 20px;
  border: none;
  background-color: #3A4F7A;
  font-size: 10px;
  color: #fff;
  border-radius: 5px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    /* color: #E98EAD; */
    background-color: #FFC6D3;
  }
`

function App() {
  const { todoList } = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetTodosQuery('1');
  console.log('dd', data);
  const [ todoListItem, setTodoListItem ] = useState<string>('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoListItem(e.target.value)
  };
  const onSubmitTodoItem = () => {
    if (todoListItem === '') {
      alert('尚未填寫待辦事項！');
      return;
    }
    dispatch(addTodoItem({
      id: uuidv4(),
      todoItemContent: todoListItem
    }));
    setTodoListItem('');
  };
  const deleteTodoListItem = (item: any) => {
    dispatch(deleteTodoItem(item));
  };
  const toggleTodoListItem = (item: any) => {
    dispatch(toggleTodoItemStatus(item));
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
                <ListItem key={item.id}>
                  <Checkout id="check" onClick={() => toggleTodoListItem(item)} />
                  <ItemContent hadDone={item.hadDone}>{ item.todoItemContent }</ItemContent>
                  <DeleteButton onClick={() => deleteTodoListItem(item)}>X</DeleteButton>
                </ListItem>
              ))
            }
          </TodoListContainer>
        </Body>
      </Container>
    </Main>
  );
}

export default App;
