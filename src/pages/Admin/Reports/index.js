import React from 'react';
import Empty from 'components/Empty';
import {Link} from "react-router-dom";

function Reports() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Обращения</h1>
        <Link className="btn btn-primary text-white focus-none" to="#!">Добавить</Link>
      </div>
      <Empty />
    </div>
  );
}

export default Reports;