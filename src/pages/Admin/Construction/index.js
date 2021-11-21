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
            <div className={"mb-3"}>Категория сложности объекта:</div>
            <div>{get(selectedObject,'name_uz')}</div>
          </div>
          <div className={"text-end"}>
            <button className={"btn btn-primary text-white focus-none"} onClick={() => setObject(null)}>Закрыт</button>
          </div>
        </div>
      </Modal>
      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Вид строительно-монтажных работ</h1>
        {/*<Link className="btn btn-primary text-white focus-none" to="/admin/construction-control/objects/create">Добавить</Link>*/}
      </div>

      <LoadAll
        url={'admin/oc/kind-of-construction'}
        name={"objectConstruction"}
        params={{
          page,
          perPage: 10,
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
            <Empty />
            {/*<Spin*/}
            {/*  isSpinning={!isFetched}*/}
            {/*>*/}
            {/*  {*/}
            {/*    data.length*/}
            {/*      ? <div className="table-responsive">*/}
            {/*        <table className="table table-borderless table-separate spaceY-1 rounded-bottom">*/}
            {/*          <thead className="bg-primary text-white">*/}
            {/*          <tr>*/}
            {/*            <th className="px-lg-4 p-3 fw-normal">#ID</th>*/}
            {/*            <th className="p-3 fw-normal">Наименование</th>*/}
            {/*            <th className="p-3 fw-normal">Тип строительства</th>*/}
            {/*            <th className="p-3 fw-normal" />*/}
            {/*          </tr>*/}
            {/*          </thead>*/}
            {/*          <tbody className="row-bg-white">*/}
            {/*          {*/}
            {/*            data.length*/}
            {/*              ? data.map((item, key) => (*/}
            {/*                <tr key={key}>*/}
            {/*                  <td className="fw-medium p-3 p-lg-4" style={{ width: 50}}>*/}
            {/*                    <span className={"pr-3"}>{get(item,'id')}</span>*/}
            {/*                  </td>*/}
            {/*                  <td className="fw-medium p-3 p-lg-4">{get(item,'name_uz')}</td>*/}
            {/*                  <td className="fw-medium p-3 p-lg-4 text-secondary font-size-14">{get(item,'name_ru')}</td>*/}
            {/*                  <td className="fw-medium p-3 p-lg-4 align-middle" style={{ width: 200}}>*/}
            {/*                    <div className={"d-flex align-items-center justify-content-around"}>*/}
            {/*                      <span className={"cursor-pointer text-secondary mx-2 text-primary-hover"}>*/}
            {/*                        <i className={"fas fa-pen"} />*/}
            {/*                      </span>*/}
            {/*                      <span onClick={() => setObject(item)} className="cursor-pointer text-secondary mx-2 text-primary-hover">*/}
            {/*                        <i className="fas fa-eye"/>*/}
            {/*                      </span>*/}
            {/*                      <span*/}
            {/*                        // onClick={() => setObject(item)}*/}
            {/*                        className="cursor-pointer text-secondary mx-2 text-danger-hover"*/}
            {/*                      >*/}
            {/*                        <i className="fas fa-trash"/>*/}
            {/*                      </span>*/}
            {/*                    </div>*/}
            {/*                  </td>*/}
            {/*                </tr>*/}
            {/*              ))*/}
            {/*              : null*/}
            {/*          }*/}
            {/*          </tbody>*/}
            {/*        </table>*/}
            {/*      </div>*/}
            {/*      : null*/}
            {/*  }*/}
            {/*</Spin>*/}
            {/*{*/}
            {/*  isFetched && !data.length*/}
            {/*    ? <Empty />*/}
            {/*    : null*/}
            {/*}*/}
            {/*<Pagination*/}
            {/*  className={'justify-content-end pt-3'}*/}
            {/*  initialPage={1}*/}
            {/*  pageCount={Math.ceil(get(meta,'total',1) / 10)}*/}
            {/*  onChange={n => setPage(n)}*/}
            {/*/>*/}
          </>
        }}
      </LoadAll>
    </>
  );
};

export default CompanyType;