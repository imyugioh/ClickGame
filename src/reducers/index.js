import {combineReducers} from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';

import game from './game';
import routes from './routes';
import auth from './auth';
import setting from './setting';

export const reducers = asyncInitialState.outerReducer(
  combineReducers({auth, game, routes, setting}),
);
