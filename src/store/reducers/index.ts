import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'


// 引入reducer函数
import USER from './user';

// 合并reducer函数
const rootReducer = combineReducers({
  USER,
  routing: routerReducer
});

export default rootReducer
