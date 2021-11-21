import { combineReducers } from 'redux';
import requireContext from 'require-context.macro';
import { importAll } from 'services/utils';

import schema from 'schema/reducer';
const reducersArray = importAll(requireContext('.', false, /^\.\/(?!index)\w+$/));

export default combineReducers({
  ...reducersArray,
  schema
});