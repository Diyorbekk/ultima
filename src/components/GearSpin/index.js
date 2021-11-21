import React from 'react';
import './style.scss';
import Gear from 'assets/images/gear.png';
import Gear3 from 'assets/images/gear3.png';

const GearSpin = ({ children, skipBg=false, style={}, isSpinning=false }) => {

  if (!isSpinning){
    return children
  }

  return (
    <div className={'gear-wrapper'} style={style}>
      {children}
      <div className='gear-holder'
        style={{
          background: skipBg ? 'transparent' : "rgba(255,255,255, 0.8)"
        }}
      >
        <div className="gear-group">
          <img className={"gear gear1"} src={Gear} alt="Gear"/>
          <img className={"gear gear2"} src={Gear} alt="Gear"/>
          <img className={"gear gear3"} src={Gear3} alt="Gear"/>
        </div>
      </div>
    </div>
  );
};

export default GearSpin;