import React from 'react';
import './index.css';

const Spinner = ({fixed}) => {
    return (
        <div className="d-flex w-100 vh-100 text-center align-items-center justify-content-center">
            <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
                <div className="lds-roller w-100 vh-100 d-flex align-items-center justify-content-center">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;