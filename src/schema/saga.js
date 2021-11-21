import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import Actions from './actions';
import{ api } from 'services';
import get from 'lodash.get';

function* LoadAll({ payload }) {
  const {
    url,
    name,
    params,
    append,
    prepend,
    asData,
    dataKey,
    metaKey,
    cb
  } = payload;
  try{
    const { data: { data } } = yield call(api.request.get, api.queryBuilder(url, {...params}));
    yield put(Actions.LoadAll.success({
      name,
      append,
      prepend,
      data: asData ? data : get(data, dataKey),
      meta: get(data, metaKey)
    }));

    yield call(cb.success, asData ? data : get(data, dataKey));
  }
  catch(error){
    yield put(Actions.LoadAll.failure({
      name,
      error: get(error, 'response.data', '')
    }));

    yield call(cb.error, get(error, 'response.data', ''))
  }
  finally {
    yield call(cb.finally)
  }
}

function* LoadOne({ payload }) {
  const {
    url,
    name,
    params,
    cb,
    asData,
    dataKey,
  } = payload;
  try{
    const { data: { data } } = yield call(api.request.get, api.queryBuilder(url, {...params}));

    yield put(Actions.LoadOne.success({
      name,
      data: asData ? data : get(data, dataKey)
    }));
    yield call(cb.success, asData ? data : get(data, dataKey));
  }
  catch(error){
    yield put(Actions.LoadOne.failure({
      name,
      error: get(error, 'response.data', '')
    }));
    yield call(cb.error, get(error, 'response.data', ''))
  }
  finally {
    yield call(cb.finally)
  }
}

function* Create({ payload }) {
  const {
    url,
    name,
    params,
    values,
    prepend=false,
    append=false,
    cb
  } = payload;
  try{
    const { data: { data  } } = yield call(api.request.post, api.queryBuilder(url, {...params}), values);
    yield put(Actions.CREATE.success({
      name,
      data,
      prepend,
      append
    }));

    yield call(cb.success, data);
  }
  catch(error){
    yield put(Actions.CREATE.failure({
      name,
      error: get(error, 'response.data', '')
    }));

    yield call(cb.error, get(error, 'response.data', ''))
  }
  finally {
    yield call(cb.finally);
  }
}

function* Update({ payload }) {
  const {
    id,
    url,
    name,
    params,
    values,
    cb
  } = payload;
  try{
    const { data: { result  } } = yield call(api.request.put, api.queryBuilder(url, {...params}), values);
    yield put(Actions.UPDATE.success({
      id,
      name,
      data: result,
    }));

    yield call(cb.success, result);
  }
  catch(error){
    yield put(Actions.UPDATE.failure({
      name,
      error: get(error, 'response.data', '')
    }));

    yield call(cb.error, get(error, 'response.data', ''))
  }
  finally {
    yield call(cb.finally);
  }
}

function* Delete({ payload }) {
  const {
    id,
    url,
    name,
    params,
    cb={
      success: () => {},
      error: () => {},
      finally: () => {}
    }
  } = payload;
  try{
    const { data } = yield call(api.request.delete, api.queryBuilder(url, {...params}));

    yield put(Actions.DELETE.success({
      id,
      name,
    }));

    yield call(cb.success, id);
  }
  catch(error){
    yield put(Actions.DELETE.failure({
      name,
      error: get(error, 'response.data', '')
    }));

    yield call(cb.error, get(error, 'response.data', ''))
  }
  finally {
    yield call(cb.finally);
  }
}

function* ByMethod({ payload }) {
  const {
    method='POST',
    status='update',
    url,
    name,
    id,
    params,
    values,
    cb
  } = payload;
  try{
    const { data: { data  } } = yield call(api.request.post, api.queryBuilder(url, {...params}), values);

    if(status === 'update'){
      yield put(Actions.UPDATE.success({
        id,
        name,
        data,
      }));
    }

    yield call(cb.success, data);
  }
  catch(error){
    yield put(Actions.CREATE.failure({
      name,
      error: get(error, 'response.data', '')
    }));

    yield call(cb.error, get(error, 'response.data', ''))
  }
  finally {
    yield call(cb.finally);
  }
}


export default function* schemaSaga() {
  yield all([
    takeEvery(Actions.LoadAll.REQUEST, LoadAll),
    takeEvery(Actions.LoadOne.REQUEST, LoadOne),
    takeLatest(Actions.DELETE.REQUEST, Delete),
    takeLatest(Actions.CREATE.REQUEST, Create),
    takeLatest(Actions.UPDATE.REQUEST, Update),
    takeLatest(Actions.METHOD.REQUEST, ByMethod),
  ])
}