# Todo List (React)
![](https://i.imgur.com/bRLRG6v.png)

## Purpose
Learning how to use Redux(Toolkit)

## Learning Note
- Redux Data Flow
UI(event) => eventHandler(dispatch {action}) => Reducer(handle {action}, update state) => UI re-render

- How to use Toolkit
    1. use createSlice to define slice(including initial state, reducers: action )
    createSlice will return the following object:
    ```
    {
     actions(f),
     caseReducer(f),
     getInitialState(f),
     name,
     reducer(f)
    }
    ```

    2. use configureStore to define store(and need to use reducer which is imported from slice)
    3. 
    - use Provider to wrap <App />
    - use store through props
    4. useSeletor: get all store state
    5. useDispatch: to use action
      `  dispatch(deleteTodoItem(item));`

- Middleware
    1. define middleware content
    ```
      export const loggerMiddleware: Middleware<{}, RootState> = store => nextDispatch => action => {
      console.log('dispatching', action);
      console.log('dispa', nextDispatch);
      let result = nextDispatch(action)
      console.log('next state', store.getState());
      return result;
    }
    ```
   2. concat middleware
     ```
        middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(loggerMiddleware).concat(todoApi.middleware);
      },
    ```
- RTK Query
  1. use createAPI to define api
  2. import api, and combineReducer in store.ts
     => can get 'data, error, isLoading'
    ` const { data, error, isLoading } = useGetTodosQuery('1');`
