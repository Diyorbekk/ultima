import React, { useState } from 'react';
import get from "lodash.get";
import { LoadAll } from 'schema/Container';
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import Empty from 'components/Empty';
import Pagination from 'components/Pagination';
import qs from "qs";

const Statistics = () => {
  const history = useHistory();
  const location = useLocation();
  const { region, district } = useParams();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [status, setStatus] = useState(get(query,'filter_by_status') ? get(query,'filter_by_status') : '');
  const [year, setYear] = useState(get(query,'filter_by_year') ? get(query,'filter_by_year') : '');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState("20");

  return <>
    <div>
      <div className="py-4">
        <div className="d-inline-block text-black-50 fw-medium cursor-pointer" onClick={() => history.goBack()}>
          <span className="mr-2"><i className="fa fa-arrow-left" /></span>
          <span>Назад</span>
        </div>
      </div>

      <div className={`${get(location,'state.region') ? "d-flex align-items-center justify-content-between" : ''} pb-3`}>
        {
          get(location,'state.region')
            ? <h1 className="font-size-24 text-dark-blue fw-semibold">{get(location,'state.region.name')}</h1>
            : null
        }
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
      url={`/admin/object-statistic`}
      name={"objectStatistic"}
      params={{
        page,
        perPage,
        extra: {
          region,
          district,
          filter_by_status: status,
          filter_by_year: year,
        }
      }}
      onSuccess={() => {
        document.querySelector(".wrapper-block").scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }}
    >
      {({ isFetched, data=[], meta={} }) => {

        return <>
          {
            isFetched && data.length
            ? <div className="table-responsive">
                <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                  <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3 fw-medium" style={{ width: 100 }}>№</th>
                    <th className="p-3 fw-medium font-size-14">Наименование</th>
                    <th className="p-3 fw-medium font-size-14">Предписаний</th>
                    <th className="p-3 fw-medium font-size-14">Активные</th>
                    <th className="p-3 fw-medium font-size-14">Закрытые</th>
                    <th className="p-3 fw-medium font-size-14">Правонарущения</th>
                    <th className="p-3 fw-medium font-size-14">Активные</th>
                    <th className="p-3 fw-medium font-size-14">Устраненные</th>
                  </tr>
                  </thead>
                  <tbody className="row-bg-white">
                  {
                    data.length
                      ? data.map((item, key) => (
                        <tr key={key}>
                          <td className="fw-medium p-3 px-lg-4">{key+1}</td>
                          <td className="fw-medium p-3 px-lg-4">
                            <Link to={`/admin/construction-control/objects/${item.id}/detail`} className={"d-block font-size-14"}>
                              {get(item,'name_building','')}
                            </Link>
                          </td>
                          <td className="fw-medium p-3">{get(item,'verifications', '0')}</td>
                          <td className="fw-medium p-3">{get(item,'active_verifications', '0')}</td>
                          <td className="fw-medium p-3">{get(item,'closed_verifications', '0')}</td>
                          <td className="fw-medium p-3">{get(item,'remarks', '0')}</td>
                          <td className="fw-medium p-3">{get(item,'active_remarks', '0')}</td>
                          <td className="fw-medium p-3">{get(item,'closed_remarks', '0')}</td>
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
                  <th className="p-3 fw-medium" style={{ width: 100 }}>№</th>
                  <th className="p-3 fw-medium font-size-14">Наименование</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Объекты</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Предписаний</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Активные</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Закрытые</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Правонарущения</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Активные</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Устранённые</th>
                  <th className="p-3 fw-medium font-size-14 text-center">Объекты введенные в эксплуатацию</th>
                </tr>
                </thead>
                <tbody className="row-bg-white">
                {
                  [...Array(parseInt(perPage)).keys()].map((item, key) => (
                    <tr key={key}>
                      <td className="p-3"><div className={"skeleton rounded-circle"} style={{ width: 25, height: 25}}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                      <td className="p-4"><div className={"skeleton rounded-2"}/></td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
            : null
          }
          {
            isFetched && !Object.keys(data).length
            ? <Empty />
            : null
          }

          {
            get(meta, 'total') > parseInt(perPage)
            ? <div className={"text-end"}>
                <Pagination
                  className={"justify-content-end"}
                  initialPage={page}
                  pageCount={Math.ceil(get(meta,'total') / parseInt(perPage))}
                  onChange={n => setPage(n)}
                />
              </div>
            : null
          }
          </>
        }}
      </LoadAll>
    </div>
  </>
};

export default Statistics;