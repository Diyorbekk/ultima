import React from 'react';

const ObjectItem = () => {
  return (
    <div className={`mb-2 bg-white p-3 rounded-3`} style={{minHeight: 100}}>

        <div className="mb-3">
          <span className={"d-inline-block skeleton px-5"}/>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <div className="w-50 skeleton"/>
          </div>
          <div className="col-md-9">
            <div className={"w-75 skeleton"} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <div className="w-75 skeleton"/>
          </div>
          <div className="col-md-9">
            <div className="w-50 skeleton"/>
          </div>
        </div>
    </div>
  );
};

export default ObjectItem;