import axios from 'axios';
import buildUrl from 'build-url';
import config from 'config';
import storage from '../storage';
import get from 'lodash.get';
import qs from 'qs';

const request = axios.create({
  baseURL: config.API_ROOT,
  defaults: {
    headers: {
      common: {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${storage.get('token')}`
      }
    }
  }
});

const requestLogin = axios.create({
  baseURL: config.API_ROOT_LOGIN,
});

const requestFireBase = axios.create({
  baseURL: config.API_ROOT,
});

// request.defaults.params = {};
// request.defaults.params['_f'] = 'json';
request.defaults.headers.common["Cache-Control"] = "no-cache";
request.defaults.headers.common['Accept'] = 'application/json';
request.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";


const queryBuilder = (
    url='',
    {
      limit,
      q='',
      page,
      perPage,
      filter={},
      extra={}
    } = {}
  ) => {

  let query = {};

  if(config.API_KEY){
    query['key'] = config.API_KEY
  }

  if(limit > 0){
    query['maxResults'] = limit;
  }
  if(perPage > 0){
    query['per_page'] = perPage;
  }
  if(q){
    query['q'] = q
  }

  if(page > 0){
    query['page'] = page;
  }

  if (Object.keys(filter).length) {
    Object.keys(filter).forEach(item => {
      const normalized = qs.stringify({ filter: { [item]: filter[item] } }, { encode: false }).split("&");
      normalized.forEach(item => {
        const splited = item.split("=");
        if (splited.length === 2 && splited[0] && splited[1]) {
          query[splited[0]] =  splited[1];
        }
      });
    });
  }

  if(Object.keys(extra).length){
    Object.keys(extra).forEach(key => {
      if(key && extra[key]){
        query[key] = extra[key]
      }
    })
  }

  return buildUrl({
    path: url,
    queryParams: query
  })
};

const queryBuilderLogin = (
    url='',
) => {


  return buildUrl({
    path: url,
  })
};




const subscribe = store => {
  let token = storage.get("token");

    let state = store.getState();

    if (state.auth.token){
      token = get(state, "auth.token");
    }
    if (token) {
      request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

const defaultExport = {
  request,
  requestLogin,
  requestFireBase,
  queryBuilder,
  queryBuilderLogin,
  subscribe
};

export default defaultExport;