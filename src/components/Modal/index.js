import React, { useEffect } from 'react';
import { CSSTransition } from "react-transition-group";
import './modal.scss';

const Modal = ({ isOpen, closeOnBack, className, onClose, children, width, position }) => {

  // useEffect(() => {
  //   const body = document.querySelector('body');
  //   if(isOpen){
  //     body.style.overflowY = 'hidden';
  //     body.style.paddingRight = "17px";
  //   }else{
  //     body.style.overflowY = 'auto';
  //     body.style.paddingRight = "0px";
  //   }
  //
  //   return () => {
  //     body.style.overflowY = 'auto';
  //     body.style.paddingRight = "0px";
  //   }
  // }, [isOpen]);

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={200}
        unmountOnExit
        classNames="my-modal"
      >
        {(status) => {
          const cls = status === 'entered' && status !== 'exiting' ? 'active' : '';

          return <>
            <div
              className={`my-modal ${className} ${position === 'center' ? 'd-flex align-items-center' : ''}`}
            >
              <div className={`modal-box ${cls}`} style={{
                width: width + 'px',
              }}>
                <div className={'px-2'}>
                  <div className={'bg-white rounded'}>
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <div className={`modal-mask ${cls}`} onClick={() => closeOnBack ? onClose() : null}/>
          </>
        }}
      </CSSTransition>
    </>
  );
};

Modal.defaultProps = {
  width: 900,
  position: 'top',
  className: '',
  closeOnBack: true
};

export default Modal;