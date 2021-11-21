import React from 'react';
import {CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

const Circle = ({value, text, strokeWidth, strokeColor, trailColor, height, textColor, textSize, fontWeight, duration, ...rest}) => {

    return (
        <CircularProgressbar
            value={value}
            text={text}
            strokeWidth={strokeWidth}

            styles={{
                root: {
                    height: height
                },
                path: {
                  stroke: strokeColor,
                  transition: 'stroke-dashoffset '+ duration + 's ease 0s',
                },

                trail: {
                    stroke: trailColor,
                    strokeLinecap: 'round',
                },

                text: {
                    fill: textColor,
                    fontSize: textSize,
                    fontWeight: fontWeight,
                },

            }
            }
            {...rest}
        />
    );
};

Circle.defaultProps = {
  strokeWidth: 12,
  value: 0,
  text: "",
  strokeColor: '#61B8E4',
  trailColor: '#B8E7FF',
  textColor: '',
  textSize: '16px',
  fontWeight: '600',
  height: 'auto',
  duration: 3,
};

Circle.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Circle;