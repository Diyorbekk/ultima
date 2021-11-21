import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../actions';
import { createSelector } from 'reselect';
import useDeepEffect   from './customHook'

const LoadAll = (
  {
    children,
    url='',
    name='',
    params={},
    appendData,
    prependData,
    asData,
    dataKey,
    metaKey,
    onSuccess,
    onError,
    onFinally
  }
) => {
  const dispatch = useDispatch();
  const selectSchema = state => state.schema;
  const state = useSelector(createSelector(selectSchema, (state) => state[name]));

  useDeepEffect(() => {
    dispatch(Actions.LoadAll.request({
      url,
      name,
      params,
      asData,
      dataKey,
      metaKey,
      appendData,
      prependData,
      cb: {
        success: (data) => {
          onSuccess(data);
        },
        error: (error) => {
          onError(error)
        },
        finally: () => {
          onFinally()
        },
      }
    }));
  }, [dispatch, url, name, params]);

  return children({...state})
};

LoadAll.propTypes = {
  children: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  params: PropTypes.object,
  appendData: PropTypes.bool,
  prependData: PropTypes.bool,
  asData: PropTypes.bool,
  dataKey: PropTypes.string,
  metaKey: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFinally: PropTypes.func,
};

LoadAll.defaultProps = {
  children: () => {},
  url: '',
  name: '',
  params: {},
  append: false,
  prepend: false,
  asData: false,
  dataKey: 'data',
  metaKey: 'meta',
  onSuccess: () => {},
  onError: () => {},
  onFinally: () => {},
};

export default LoadAll;