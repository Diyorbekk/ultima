import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const Collapse = ({children, isOpen, defaultHeight, className=''}) => {

  const filterRef = useRef(null);

  useEffect(() => {
    if(filterRef){
      filterRef.current.style.overflowY = 'hidden';
      if(!isOpen){
        filterRef.current.style.maxHeight = defaultHeight + 'px';
      }else{
        filterRef.current.style.maxHeight = filterRef.current.scrollHeight + 'px';
      }
    }
  }, [isOpen, defaultHeight]);

  return (
    <div
      ref={filterRef}
      className={`collapse-wrapper ${className}`}
      style={{
        overflowY: 'hidden',
        overflowX: 'hidden',
        transition: 'max-height 0.2s',
        maxHeight: defaultHeight
      }}
    >
      <div>
        {children}
      </div>
    </div>
  );
};

Collapse.defaultProps = {
  defaultHeight: 0
};

Collapse.propTypes = {
  defaultHeight: PropTypes.number
};

export default Collapse;