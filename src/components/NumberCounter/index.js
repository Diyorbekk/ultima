import { useCountUp } from 'use-count-up';
import PropTypes from 'prop-types';

const NumberCount = ({ isCounting, start, end, duration, separator}) => {
  const { value } = useCountUp({
    isCounting,
    start,
    end,
    duration,
    thousandsSeparator: separator
  });

  return value
};

NumberCount.defaultProps = {
  isCounting: false,
  start: 0,
  end: 10,
  duration: 3,
  separator: " "
};

NumberCount.propTypes = {
  isCounting: PropTypes.bool.isRequired,
  start: PropTypes.number,
  end: PropTypes.number.isRequired,
  duration: PropTypes.number
};

export default NumberCount;