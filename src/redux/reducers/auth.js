import Actions from '../actions';
import { storage } from 'services';

const initialState = {
  isFetched: true,
  isAuthenticated: storage.get('token'),
  data: {},
  token: storage.get('token')
};

const Auth = (state=initialState, action) => {
  switch(action.type){
    case Actions.LOGIN.REQUEST:
      return {
        ...state,
        isFetched: false,
        isAuthenticated: false,
        token: '',
        data: {}
      };
    case Actions.LOGIN.SUCCESS:
      return {
        isFetched: true,
        isAuthenticated: true,
        token: action.payload.idToken,
        data: action.payload
      };
    case Actions.LOGOUT.SUCCESS:
    case Actions.LOGIN.FAILURE:
    case Actions.LOGOUT.FAILURE:
      return {
        ...state,
        isFetched: true,
        isAuthenticated: false,
        token: '',
        data: {}
      };
    default:
      return state
  }
};

export default Auth;