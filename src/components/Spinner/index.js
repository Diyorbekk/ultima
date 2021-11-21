import React from 'react';
import './index.css';

const Spinner = ({fixed}) => {
    return (
        <div className="d-flex w-100 text-center">
            <div className="vh-100 d-flex-center">
                <div className="lds-roller">
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