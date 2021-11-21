import React, { useState } from 'react';
import get from 'lodash.get';
import Spin from 'components/AntSpin';
import { LoadAll } from 'schema/Container';
import Pagination from 'components/Pagination';
import Modal from 'components/Modal';
import { useDispatch } from "react-redux";
import Actions from 'schema/actions';
import { toast } from 'react-toastify';

const Monitoring = ({ id, empty}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedItem, setItem] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    setItem(null);
    dispatch(Actions.DELETE.request({
      url: '/object-control/verification/'+selectedItem,
      id: selectedItem,
      name: 'objectMonitoring',
      cb: {
        success: () => {
          toast.success("O'chirildi");
        },
        error: () => {
          toast.error("Xatolik yuz berdi");
        },
        finally: () => {
          setLoading(false);
        }
      }
    }))
  };

  return (
    <div className={""}>
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setItem(null)}
        position={"center"}
        width={500}
      >
        <div className={"p-3"}>
          <h4>O'chirishni xohlaysizmi?</h4>
          <div className={"text-end pt-5"}>
            <button className={"btn btn-primary focus-none text-white ml-2"} onClick={() => setItem(null)}>Отмена</button>
            <button className={"btn btn-danger focus-none ml-2"} onClick={handleRemove}>Удалит</button>
          </div>
        </div>
      </Modal>
      <div className={"pb-3"}>
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
        url={"/object-control/verification-lists/"+id}
        name={"objectMonitoring"}
        params={{
          page,
          perPage
        }}
      >
        {({ isFetched, data=[], meta={}}) => {
          return <>
            <Spin isSpinning={!isFetched || isLoading}>
              {
                data.length
                ? <div className="table-responsive">
                    <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                      <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-lg-4 p-3 fw-normal">ID</th>
                        <th className="p-3 fw-normal text-center">Создан</th>
                        <th className="p-3 fw-normal text-center">Замечании</th>
                        <th className="p-3 fw-normal text-center">Открыто</th>
                        <th className="p-3 fw-normal text-center">Закрыто</th>
                        <th className="p-3 fw-normal text-center">Устранено</th>
                        <th className="p-3 fw-normal text-center">Статус</th>
                        <th className="p-3 fw-normal">Скачать</th>
                      </tr>
                      </thead>
                      <tbody className="row-bg-white">
                        {
                          data.length
                          ? data.map((item, key) => (
                              <tr key={key}>
                                <td className="fw-medium p-3 px-lg-4">{get(item,'id')}</td>
                                <td className="fw-medium p-3 text-center">{get(item,'created_at')}</td>
                                <td className="fw-medium p-3 text-center">{get(item,'remarks')}</td>
                                <td className="fw-medium p-3 text-center">{get(item, 'active_remarks')}</td>
                                <td className="fw-medium p-3 text-center">{get(item,'closed_remarks_by_responsible')}</td>
                                <td className="fw-medium p-3 text-center">{get(item,'closed_remarks')}</td>
                                <td className="fw-medium p-3 text-center">
                                  {
                                    get(item, 'status') === 0
                                    ? <button
                                        className="btn btn-primary btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                        Активно
                                      </button>
                                    : get(item, 'status') === 1
                                    ? <button
                                        className="btn btn-danger btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                        Закрыто
                                      </button>
                                    : get(item, 'status') === 2
                                    ? <button
                                        className="btn btn-warning btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                        Мерорприятия
                                      </button>
                                    : get(item, 'status') === 3
                                    ? <button
                                        className="btn btn-success btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                        Аст
                                      </button>
                                    : get(item, 'status') === 4
                                    ? <button
                                        className="btn btn-secondary btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                        Время истекло
                                      </button>
                                    : get(item, 'status') === 5
                                    ? <button
                                        className="btn btn-danger btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                        Закрыто
                                      </button>
                                    : null
                                  }
                                </td>
                                <td className="fw-medium p-3">
                                  <div className="d-flex justify-content-around align-items-center">
                                    {
                                      get(item,'remarks') > 0
                                      ? <a href={`https://nazorat.mc.uz/object-control/verification/download-pdf/${get(item,'id')}`} target={"_blank"} download className="cursor-pointer text-secondary mx-2 font-size-22">
                                          <i className="far fa-arrow-to-bottom"/>
                                        </a>
                                      : <span className={"px-3"} />
                                    }
                                    <span onClick={() => setItem(item.id)} className="cursor-pointer text-secondary mx-2 font-size-18">
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
            </Spin>
            {
              isFetched && !data.length
              ? empty
              : null
            }

            <Pagination
              className={'justify-content-end pt-3'}
              initialPage={1}
              pageCount={Math.ceil(get(meta,'total',1) / perPage)}
              onChange={n => setPage(n)}
            />

          </>
        }}
      </LoadAll>
    </div>
  );
};

export default Monitoring;
