import Actions from './actions';
import get from 'lodash/get';

const initialState = {
  all: {
    isFetched: true,
    data: [],
    error: null
  }
};

const schemaReducer = (state=initialState, action) => {
  switch(action.type){
    case Actions.LoadAll.REQUEST: {
      const { name } = action.payload;
      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
          isFetched: false,
        }
      };
    }
    case Actions.LoadAll.SUCCESS: {
      const {
        name,
        data,
        meta,
        append,
        prepend
      } = action.payload;

      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
          isFetched: true,
          data: append ? [...get(state, `${name}.data`), ...data] : prepend ? [...data, ...get(state, `${name}.data`)] : [...data],
          meta: {...meta},
          error: null,
        }
      };
    }

    case Actions.LoadOne.REQUEST: {
      const { name } = action.payload;
      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
          isFetched: false,
        }
      };
    }
    case Actions.LoadOne.SUCCESS: {
      const { name, data } = action.payload;
      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
          isFetched: true,
          data,
          error: null
        }
      };
    }
    case Actions.LoadAll.FAILURE:
    case Actions.LoadOne.FAILURE: {
      const { name, error } = action.payload;
      return {
        ...state,
        [name]: {
          isFetched: true,
          error
        }
      };
    }

    case Actions.CREATE.REQUEST:
    case Actions.UPDATE.REQUEST: {
      const { name } = action.payload;
      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
        }
      };
    }

    case Actions.CREATE.SUCCESS: {
      const { name, data, append, prepend } = action.payload;
      let result =
        append
          ? [...get(state, `[${name}].data`, []), data]
          :
        prepend
          ? [data, ...get(state, `[${name}].data`, [])]
          : [...get(state, `[${name}].data`, [])];

      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
          isFetched: true,
          data: result,
          error: null
        }
      };
    }

    case Actions.UPDATE.SUCCESS: {
      const { name, data } = action.payload;

      return {
        ...state,
        [name]: {
          ...get(state, `[${name}]`, {}),
          isFetched: true,
          data: [...get(state, `[${name}].data`, []), data],
          error: null
        }
      };
    }

    case Actions.DELETE.SUCCESS: {
      const { id, name } = action.payload;
      return {
        ...state,
        [name]: {
          ...get(state, `${name}`, {}),
          isFetched: true,
          data: [...get(state, `${name}.data`, []).filter(item => item.id !== id)],
          error: null
        }
      };
    }

    default:
      return state
  }
};

export default schemaReducer;