import React, { useState } from 'react';
import { LoadAll } from 'schema/Container';
import get from 'lodash.get';
import { Link, useHistory } from 'react-router-dom';
import Pagination from 'components/Pagination';
import Empty from 'components/Empty';
import Spin from 'components/AntSpin';
import Collapse from 'components/Collapse';
import Clamp from 'react-clamp-lines';
import Skeleton from 'components/Skeleton';
import Filter from '../components/Filter';
import qs from 'qs';

const CompanyType = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [isObject, setObject] = useState(null);
  const [filterState, setFilterState] = useState({});

  const handleFilter = obj => {
    obj = Object.keys(obj).reduce((acc, curr) => obj[curr] ? {...acc, [curr]: obj[curr]} : acc, {});
    setFilterState({...obj});
    history.push({
      search: qs.stringify({...obj})
    });
  };

  const clearFilter = () => {
    history.push({
      search: ''
    });
    setFilterState(() => ({}));
    setPerPage(() => 10);
    setPage(() => 1);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Список компании</h1>
        <div>
          <a
            className={"btn btn-primary focus-none text-white"}
            href={"https://nazorat.mc.uz/admin/construction-control/object-excel"}
            download={"objects.xlsx"}
            rel={"noopener noreffer"}
            target={"_blank"}
          >
            <i className={"fa fa-download"}/>
          </a>
          <Link className="btn btn-primary text-white focus-none ml-3" to="/admin/construction-control/objects/create">Добавить</Link>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between py-2">
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
        <span
          className={"font-size-20 cursor-pointer"}
          onClick={() => setOpen(prev => !prev)}
        >
        {
          isOpen
            ? <i className="far fa-times text-primary"/>
            : <i className="far fa-sliders-h text-primary"/>
        }
      </span>
      </div>

      <Collapse
        isOpen={isOpen}
        className={"mb-3"}
      >
        <Filter
          onChange={state => handleFilter(state)}
          onClear={clearFilter}
        />
      </Collapse>

      <LoadAll
        url={'/admin/oc/objects'}
        name={"govObjects"}
        params={{
          page,
          perPage,
          filter: {
            my_gov: 1,
            ...filterState
          }
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

            <Spin
              isSpinning={!isFetched && data.length}
            >
              <div className="info-group">
                {
                  data.length
                    ? data.map((item,key) => (
                      <div key={key} className={`info-item mb-2 ${get(item,'my_gov') ? 'info-item-green' : 'bg-white'} p-3 rounded-3 ${isObject === item.id ? 'active' : ''}`}>
                        <Collapse
                          isOpen={item.id === isObject}
                          defaultHeight={80}
                        >
                          <div className="mb-3 font-size-14">№ <span className="fw-medium text-primary font-size-14">{get(item, 'id', '')}</span></div>
                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Наименование:</span>
                            </div>
                            <div className="col-md-9">
                              <Link className={"d-inline-block text-secondary"} to={`/admin/construction-control/objects/${item.id}/detail`}>
                                <Clamp
                                  text={get(item,'name_building','')}
                                  id={"news_item"}
                                  lines={2}
                                  ellipsis={'...'}
                                  buttons={false}
                                  className={"font-size-14 m-0 info-title fw-medium"}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Количество мониторингов:</span>
                            </div>
                            <div className="col-md-9">
                              <p className="m-0 fw-medium font-size-14">{get(item, "verifications_count", "")}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Выявленные правонарушения:</span>
                            </div>
                            <div className="col-md-9">
                              <p className="m-0 fw-medium font-size-14">{get(item, "remarks_count", 0)}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Выявленные правонарушения(%):</span>
                            </div>
                            <div className="col-md-9">
                              <p className="m-0 fw-medium font-size-14">{get(item, "percent_readiness", 0)}%</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Тех. надзор / Заказчик:</span>
                            </div>
                            <div className="col-md-9">
                              <p className="m-0 fw-medium font-size-14">{get(item, 'customer_info', '')}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Инспекторы:</span>
                            </div>
                            <div className="col-md-9">
                              <p className="m-0 fw-medium font-size-14">{get(item, 'inspectors_count',0)}</p>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-2">
                              <span className="fw-medium font-size-14">Статус:</span>
                            </div>
                            <div className="col-md-9">
                              <p className="m-0 fw-medium font-size-14">{get(item, 'status', '')}</p>
                            </div>
                          </div>
                        </Collapse>
                        <div className="d-flex justify-content-end">
                            <span onClick={() => setObject(prev => prev === item.id ? null : item.id)} className="position-relative text-primary cursor-pointer lh-sm">
                              <i className="fal fa-circle fa-2x"/>
                              <i className={`position-absolute top-50 start-50 translate-middle fal fa-${isObject === item.id ? 'angle-up' : 'plus'} font-size-24`}/>
                            </span>
                        </div>
                      </div>
                    ))
                    : null
                }
              </div>
            </Spin>
            {
              !isFetched && !data.length
                ? [...Array(perPage).keys()].map((_, key) => (
                  <Skeleton.ObjectItem key={key} />
                ))
                : null
            }
            {
              isFetched && !data.length
                ? <Empty />
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
    </>
  );
};

export default CompanyType;