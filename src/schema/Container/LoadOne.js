import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../actions';
import { createSelector } from 'reselect';
import useDeepEffect   from './customHook'

const LoadOne = (
  {
    children,
    url='',
    name='',
    params={},
    asData,
    dataKey,
    onSuccess,
    onError,
    onFinally
  }
) => {
  const dispatch = useDispatch();
  const myState = state => state.schema;
  const state = useSelector(createSelector(myState, (state) => state[name]));

  useDeepEffect(() => {
    dispatch(Actions.LoadOne.request({
      url,
      name,
      params,
      asData,
      dataKey,
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

LoadOne.propTypes = {
  children: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  params: PropTypes.object,
  asData: PropTypes.bool,
  dataKey: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onFinally: PropTypes.func,
};

LoadOne.defaultProps = {
  children: () => {},
  url: '',
  name: '',
  params: {},
  asData: false,
  dataKey: 'data',
  onSuccess: () => {},
  onError: () => {},
  onFinally: () => {},
};

export default LoadOne;