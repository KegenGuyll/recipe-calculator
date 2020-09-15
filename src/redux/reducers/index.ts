import { combineReducers } from 'redux';
import userSlice from '../slice/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
