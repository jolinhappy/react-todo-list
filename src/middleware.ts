import { Middleware } from 'redux';
import { RootState } from './store';

// 把action丟進去dispatch, dispatch return出丟進去的action
export const loggerMiddleware: Middleware<{}, RootState> = store => nextDispatch => action => {
  console.log('dispatching', action);
  console.log('dispa', nextDispatch);
  let result = nextDispatch(action)
  console.log('next state', store.getState());
  return result;
}

