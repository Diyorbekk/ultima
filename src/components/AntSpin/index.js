import React from 'react';
import './style.css';

const AntSpin = ({ children, className, style, isSpinning=false }) => {
  return (
    <div className={'ant-spin-wrapper position-relative '} style={style}>
      {children}
      {
        isSpinning
        ? <div className='ant-holder'>
              <div className="lds-ripple">
                <div/>
                <div/>
              </div>
          </div>
        : null
      }
    </div>
  );
};

export default AntSpin;