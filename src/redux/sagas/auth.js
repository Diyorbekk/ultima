import { all, call, put, takeLatest } from 'redux-saga/effects';
import Actions from '../actions';
import { storage, api } from 'services';
import get from 'lodash.get';

function* Login(action) {
  const {
    url,
    values,
    cb
  } = action.payload;
  try{
    const { data } = yield call(api.requestLogin.post, api.queryBuilderLogin(url, {}), {...values});
    yield call(storage.set, "token", data.idToken);
    yield put(Actions.LOGIN.success({...data}));
    yield call(cb.success, data);
  }
  catch(err){
    yield put(Actions.LOGIN.failure(get(err,'response.data','')));
    yield call(cb.error, get(err, 'response.data'));
  }
  finally {
    yield call(cb.finally)
  }
}

function* Logout({ payload }){
  const { cb } = payload;
  try{
    yield call(storage.remove, 'token');
    yield call(storage.remove, 'user');
    yield put(Actions.LOGOUT.success());
    yield call(cb.success);
  }
  catch(err){
    yield put(Actions.LOGOUT.failure(get(err,'response.data','')));
    yield call(cb.error, get(err, 'response.data'));
  }
}

export default function* AuthSaga(){
  yield all([
    takeLatest(Actions.LOGIN.REQUEST, Login),
    takeLatest(Actions.LOGOUT.REQUEST, Logout)
  ])
}