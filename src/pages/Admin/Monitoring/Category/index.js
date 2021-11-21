import React, { useState } from 'react';
import { LoadAll } from 'schema/Container';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination';
import Empty from 'components/Empty';
import Spin from 'components/GearSpin';
import Modal from 'components/Modal';

const CompanyType = () => {

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [selectedObject, setObject] = useState(null);


  return (
    <>
      <Modal
        isOpen={!!selectedObject}
        width={700}
        onClose={() => setObject(null)}
        position={"center"}
      >
        <div className={"p-4"}>
          <div className={"mb-5 fw-medium font-size-18"}>
            <div className={"mb-3"}>Название категории мониторинга:</div>
            <div>{get(selectedObject,'name_uz')}</div>
          </div>
          <div className={"text-end"}>
            <button className={"btn btn-primary text-white focus-none"} onClick={() => setObject(null)}>Закрыт</button>
          </div>
        </div>
      </Modal>
      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Категория мониторингов</h1>
        <Link className="btn btn-primary text-white focus-none" to="#!">Добавить</Link>
      </div>
      <div className={"mb-3"}>
        <select
          className={"d-inline-block w-auto form-select form-select-sm focus-none"}
          name="perPage"
          id="perPage"
          value={perPage}
          onChange={e => {
            setPage(1);
            setPerPage(e.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>

      <LoadAll
        url={'/admin/oc/verification-category'}
        name={"monitoringCategory"}
        params={{
          page,
          perPage,
        }}
        onSuccess={() => {
          document.querySelector(".wrapper-block").scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }}
      >
        {({ isFetched, data=[], meta={}}) => {

          return <>

            {
              isFetched && data.length
                ? <div className="table-responsive">
                  <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                    <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-lg-4 p-3 fw-normal">#ID</th>
                      <th className="px-lg-4 p-3 fw-normal">Название</th>
                      <th className="px-lg-4 p-3 fw-normal" />
                    </tr>
                    </thead>
                    <tbody className="row-bg-white">
                    {
                      data.length
                        ? data.map((item, key) => (
                          <tr key={key}>
                            <td className="fw-medium p-3 p-lg-4" style={{ width: 50}}>
                              <span className={"pr-3"}>{get(item,'id')}</span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4">{get(item,'name_uz')}</td>
                            <td className="fw-medium p-3 p-lg-4 align-middle" style={{ width: 200}}>
                              <div className={"d-flex align-items-center justify-content-around"}>
                                <span className={"cursor-pointer text-secondary mx-2 text-primary-hover"}>
                                  <i className={"fas fa-pen"} />
                                </span>
                                <span onClick={() => setObject(item)} className="cursor-pointer text-secondary mx-2 text-primary-hover">
                                  <i className="fas fa-eye"/>
                                </span>
                                <span
                                  // onClick={() => setObject(item)}
                                  className="cursor-pointer text-secondary mx-2 text-danger-hover"
                                >
                                  <i className="fas fa-trash"/>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                        : null
                    }
                    </tbody>
                  </table>
                </div>
                : null
            }
            {
              !isFetched
              ? <div className="table-responsive">
                <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                  <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-lg-4 p-3 fw-normal">#ID</th>
                    <th className="px-lg-4 p-3 fw-normal">Название</th>
                    <th className="px-lg-4 p-3 fw-normal" />
                  </tr>
                  </thead>
                  <tbody className="row-bg-white">
                  {
                    [...Array(parseInt(perPage)).keys()].map((item, key) => (
                      <tr key={key}>
                        <td className="p-lg-4 p-3" style={{ width: 50}}><div className={"skeleton rounded-circle"} style={{ width: 25, height: 25}}/></td>
                        <td className="p-lg-4 p-3"><div className={"skeleton rounded-2"}/></td>
                        <td className="p-lg-4 p-3" style={{ width: 200}}>
                          <div className={"d-flex align-items-center justify-content-around"}>
                            <span className="skeleton rounded-circle" style={{ width: 25, height: 25}}/>
                            <span className="skeleton rounded-circle" style={{ width: 25, height: 25}}/>
                            <span className="skeleton rounded-circle" style={{ width: 25, height: 25}}/>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
              : null
            }
            {
              isFetched && !data.length
                ? <Empty />
                : null
            }
            <Pagination
              className={'justify-content-end pt-3'}
              initialPage={page}
              pageCount={Math.ceil(get(meta,'total',1) / parseInt(perPage))}
              onChange={n => setPage(n)}
            />
          </>
        }}
      </LoadAll>
    </>
  );
};

export default CompanyType;