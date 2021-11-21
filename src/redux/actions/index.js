import { createRoutine } from 'redux-saga-routines';

//System Actions
const LOGIN = createRoutine('LOGIN');
const LOGIN_WITH_SIGNATURE = createRoutine('LOGIN_WITH_SIGNATURE');
const LOGOUT = createRoutine('LOGOUT');
const CHANGE_LANG = createRoutine('LANGUAGE');




const actions = {
    LOGIN,
    LOGIN_WITH_SIGNATURE,
    LOGOUT,
    CHANGE_LANG,
};

export default actions;