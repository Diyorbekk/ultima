import React from 'react';
import get from 'lodash.get';
import Spin from 'components/AntSpin';

const Documents = ({ isFetched, data, empty}) => {
  return (
    <Spin isSpinning={!isFetched}>
      <div className="document-group">
        {
          isFetched && get(data,'files', []).length
            ? get(data,'files').map((item, key) => (
              <div key={key} className="document-item d-flex align-items-center justify-content-between bg-white p-lg-4 p-3 pr-lg-5 rounded-3 mb-2">
                <div className="d-flex align-items-center">
                  <span className="text-secondary mr-4"><i className="fas fa-file-download fa-2x"/></span>
                  <span className="font-size-20 fw-medium">{get(item,'description') ? get(item,'description') : "File"}</span>
                </div>
                <a href={get(item,'file')}  download={get(item,'description','')} className="text-primary"><i className="fal fa-arrow-to-bottom fa-2x"/></a>
              </div>
            ))
            : null
        }
        {
          isFetched && !get(data,'files', []).length
            ? empty
            : null
        }
      </div>
    </Spin>
  );
};

export default Documents;