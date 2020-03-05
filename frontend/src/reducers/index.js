import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { churrascoReducer } from './churrasco';

const allReducers = combineReducers({
    authReducer,
    churrascoReducer
});

export default allReducers;