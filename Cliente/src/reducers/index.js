import { combineReducers } from 'redux';
import authReducer from './users/index'; // Importa el reducer de autenticación

const rootReducer = combineReducers({
  auth: authReducer // Agrega el reducer de autenticación al estado global
  // ...otros reducers si los tienes
});

export default rootReducer;
