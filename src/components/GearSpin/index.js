import React from 'react';
import './style.scss';

const GearSpin = ({ children, skipBg=false, style={}, isSpinning=false }) => {

  if (!isSpinning){
    return children
  }

  return (
    <div className={'gear-wrapper'} style={style}>
      {children}
        <div id="preloader"/>
    </div>
  );
};

export default GearSpin;