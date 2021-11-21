import React, { useState } from 'react';
import { LoadAll } from 'schema/Container';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination';
import Empty from 'components/Empty';
import Spin from 'components/AntSpin';

const CompanyType = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Список компании</h1>
        <a className="btn btn-primary text-white focus-none" href="#!">Добавить</a>
      </div>

      <LoadAll
        url={'/admin/company-type'}
        name={"companyType"}
        params={{
          page,
          perPage: 20
        }}
      >
        {({ isFetched, data=[], meta={}}) => {

          return <>
            <Spin isSpinning={!isFetched}>
              <div className="table-responsive">
                <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                  <thead className="bg-primary text-white">
                  <tr>
                    <th className={"p-3"} style={{ width: 30}}>№</th>
                    <th className="px-lg-4 p-3 fw-normal">Наименование</th>
                    <th className="p-3 fw-normal">Название</th>
                    <th className="p-3"/>
                  </tr>
                  </thead>
                  <tbody className="row-bg-white">
                    {
                      data.length
                        ? data.map((item,key) => (
                          <tr key={key}>
                            <td className="fw-medium align-middle py-3 p-3">
                              <div>
                                {get(item, 'id', '')}
                              </div>
                            </td>
                            <td className="fw-medium align-middle p-4 px-lg-4">{get(item, 'name_uz', '')}</td>
                            <td className="fw-medium align-middle p-4 text-black-50">{get(item, 'name_ru', '')}</td>
                            <td className="fw-medium align-middle p-4" style={{ width: 300}}>
                              <div className="d-flex align-items-center justify-content-around">
                                <Link to={"#!"} className="mx-2 text-secondary cursor-pointer text-primary-hover"><i className="fas fa-pen"/></Link>
                                <Link to={"#!"} className="mx-2 text-secondary cursor-pointer text-primary-hover"><i className="far fa-eye"/></Link>
                                <span className="mx-2 text-secondary cursor-pointer text-danger-hover p-1"><i className="fas fa-trash"/></span>
                              </div>
                            </td>
                          </tr>
                        ))
                        : null
                    }
                  </tbody>
                </table>
              </div>
            </Spin>
            {
              isFetched && !data.length
                ? <Empty />
                : null
            }
            <Pagination
              className={'justify-content-end pt-3'}
              initialPage={1}
              pageCount={Math.ceil(get(meta,'total',1) / 10)}
              onChange={n => setPage(n)}
            />
          </>
        }}
      </LoadAll>
    </>
  );
};

export default CompanyType;