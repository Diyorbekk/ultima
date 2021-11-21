import { createRoutine } from 'redux-saga-routines'


//Schema Actions
const LoadAll = createRoutine('LOAD_ALL');
const LoadOne = createRoutine('LOAD_ONE');
const CREATE = createRoutine('CREATE_REQUEST');
const UPDATE = createRoutine('UPDATE_REQUEST');
const DELETE = createRoutine('DELETE_REQUEST');
const METHOD = createRoutine('METHOD_REQUEST');

const actions = {
  LoadAll,
  LoadOne,
  CREATE,
  UPDATE,
  DELETE,
  METHOD
};

export default actions;