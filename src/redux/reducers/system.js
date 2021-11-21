import Actions from '../actions';
import { storage } from 'services';

const initialState = {
  language: storage.get('language'),
  regions: [],
  jobs: [],
};

const Language = (state=initialState, action) => {

  switch(action.type) {
    case Actions.CHANGE_LANG.SUCCESS:
      storage.set("language", action.payload);
      return {
        ...state,
        language: action.payload
      };
    default:
      return state
  }
};

export default Language;