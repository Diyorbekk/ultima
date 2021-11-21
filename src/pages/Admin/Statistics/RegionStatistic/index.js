import React, {useState} from 'react';
import get from "lodash.get";
import { LoadOne } from 'schema/Container';
import {Link, useParams, useLocation} from "react-router-dom";
import Empty from 'components/Empty';
import qs from "qs";

const calculateSum = (arr, key) => {
  return arr.reduce((acc, curr) => {
    if(typeof parseFloat(curr[key]) === 'number'){
      return acc + parseFloat(curr[key])
    }else{
      return acc;
    }
  }, 0);
};

const Statistics = () => {
  const { id } = useParams();
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [status, setStatus] = useState(get(query,'filter_by_status') ? get(query,'filter_by_status') : '');
  const [year, setYear] = useState(get(query,'filter_by_year') ? get(query,'filter_by_year') : '');


  return <>
    <div>
      <div className="py-4">
        <Link className="text-black-50 fw-medium" to={`/admin/statistics?filter_by_status=${status}&filter_by_year=${year}`}>
          <span className="mr-2"><i className="fa fa-arrow-left" /></span>
          <span>Назад</span>
        </Link>
      </div>
      {
        get(location,'state.region')
        ? <div className={"mb-4"}>
            <h1 className="font-size-24 text-dark-blue fw-semibold">{get(location,'state.region.name')}</h1>
          </div>
        : null
      }
      <LoadOne
        url={`/admin/region-statistic`}
        name={"regionStatistic"}
        asData
        params={{
          extra: {
            filter_by_status: status,
            region: id,
          }
        }}
      >
        {({ isFetched, data=[]}) => {

          return <>
            {
              isFetched && get(data, "statistic") && get(data, "statistic").length
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
                      get(data,'statistic').map((item, key) => (
                        <tr key={key}>
                          <td className="fw-medium p-3">{key+1}</td>
                          <td className="fw-medium p-3">
                            <Link to={{
                              pathname: `/admin/statistics/object-statistic/${id}/${item.id}`,
                              search: `filter_by_status=${status}&filter_by_year=${year}`,
                              state: { region: item}}
                            } className={"d-block font-size-14"}>
                              {get(item,'name','')}
                            </Link>
                          </td>
                          <td className="fw-medium p-3 text-center">{get(item,'objects', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'verifications', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'active_verifications', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'closed_verifications', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'remarks', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'active_remarks', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'closed_remarks', '0')}</td>
                          <td className="fw-medium p-3 text-center">{get(item,'closed_objects', '0')}</td>
                        </tr>
                      ))
                    }
                    <tr>
                      <td className="fw-medium p-3 px-lg-4">{get(data,'statistic').length + 1}</td>
                      <td className="fw-medium p-3 px-lg-4 text-primary">Итого</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'objects')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'verifications')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'active_verifications')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'closed_verifications')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'remarks')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'active_remarks')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'closed_remarks')}</td>
                      <td className="fw-medium p-3 font-size-14 text-center">{calculateSum(get(data,'statistic'),'closed_objects')}</td>
                    </tr>
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
                    [...Array(15).keys()].map((item, key) => (
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
          </>
        }}
      </LoadOne>
    </div>
  </>
};

export default Statistics;