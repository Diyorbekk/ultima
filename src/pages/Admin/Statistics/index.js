import React, { useState, useEffect } from 'react';
import get from "lodash.get";
import Circle from 'components/CircularProgress';
import { LoadOne } from 'schema/Container';
import {Link, useLocation, useHistory} from "react-router-dom";
import Empty from 'components/Empty';
import qs from 'qs';
import NumberFormat from "react-number-format";

const calculateSum = (arr, key) => {
  return arr.reduce((acc, curr) => {
    if(typeof parseFloat(curr[key]) === 'number'){
      return acc + parseFloat(curr[key])
    }else{
      return acc;
    }
  }, 0);
};

const getPercentage = (value, overall=100000) => {
  if(typeof value === 'number' || typeof parseInt(value) === 'number'){
    return (parseInt(value) / overall)*100;
  }else{
    return 0
  }
};

const Statistics = () => {
  const location = useLocation();
  const { pathname, search } = location;
  const history = useHistory();
  const { replace } = history;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [status, setStatus] = useState(get(query,'filter_by_status') ? get(query,'filter_by_status') : '');
  const [year, setYear] = useState(get(query,'filter_by_year') ? get(query,'filter_by_year') : '');
  const [isOpen, setOpen] = useState(false);


  const handleStatsFilter = (statusName='') => {
    const search = {...query, filter_by_status: statusName};
    history.replace({
      search: qs.stringify(search)
    });
    setStatus(statusName);
  };



  return <>
    <div>
      <div className="d-flex justify-content-between align-items-center py-4">
        <Link
          className="d-inline-block text-black-50 fw-medium cursor-pointer"
          to={`/admin?filter_by_year=${year}`}
        >
          <span className="mr-2"><i className="fa fa-arrow-left" /></span>
          <span>Главная</span>
        </Link>
        {/*  <span*/}
        {/*    className={"font-size-20 cursor-pointer"}*/}
        {/*    onClick={() => setOpen(prev => !prev)}*/}
        {/*  >*/}
        {/*  {*/}
        {/*    isOpen*/}
        {/*      ? <i className="far fa-times text-primary"/>*/}
        {/*      : <i className="far fa-sliders-h text-primary"/>*/}
        {/*  }*/}
        {/*</span>*/}
      </div>
      <LoadOne
        url={"/admin/statistic"}
        name={"allStatistics"}
        asData
        params={{
          extra: {
            filter_by_year: year
          }
        }}
      >
        {({ isFetched, data}) => {
          return <>
          {
            isFetched && Object.keys(data)
            ? <div className="row g-2 mb-4">
                <div className="col-md-2">
                  <div
                    className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100 circle-box cursor-pointer`}
                    onClick={() => handleStatsFilter('')}
                    style={{
                      borderColor: status === '' ? '#61B8E4' : ''
                    }}
                  >
                    <div
                      className={"m-auto w-100 rounded-circle"}
                      style={{
                        maxWidth: 150,
                        background: status === '' ? '#61B8E4' : '#ffffff'
                      }}
                    >
                      <Circle
                        value={getPercentage(get(data,'total.objects', 0))}
                        text={
                          !!get(data,'total.objects')
                            ? <NumberFormat
                                value={get(data,'total.objects')}
                                thousandSeparator={" "}
                                renderText={value => value}
                                displayType={"text"}
                              />
                            : "0"
                        }
                        strokeColor="#61B8E4"
                        trailColor={status === '' ? '#61B8E4' : "#B8E7FF"}
                        textColor={status === '' ? "#ffffff" : "#61B8E4"}
                      />
                    </div>
                    <div className="text-center fw-medium font-size-14 mt-3">Общее количество</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100 circle-box cursor-pointer `}
                       onClick={() => handleStatsFilter("active_verifications")}
                       style={{
                         borderColor: status === 'active_verifications' ? '#6969CB' : ''
                       }}
                  >
                    <div className={"m-auto w-100 rounded-circle"}
                         style={{
                           maxWidth: 150,
                           background: status === 'active_verifications' ? '#6969CB' : '#ffffff'
                         }}>
                      <Circle
                        value={getPercentage(get(data,'total.active_verifications', 0))}
                        text={
                          !!get(data,'total.active_verifications')
                            ? <NumberFormat
                              value={get(data,'total.active_verifications')}
                              thousandSeparator={" "}
                              renderText={value => value}
                              displayType={"text"}
                            />
                            : "0"
                        }
                        strokeColor="#6969CB"
                        trailColor={status === 'active_verifications' ? '#6969CB' : "#D1D1FF"}
                        textColor={status === 'active_verifications' ? "#ffffff" : "#6969CB"}
                      />
                    </div>
                    <div className="text-center fw-medium font-size-14 mt-3">Предписания</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100 circle-box cursor-pointer `}
                       onClick={() => handleStatsFilter("closed_verifications")}
                       style={{
                         borderColor: status === 'closed_verifications' ? '#40DD74' : ''
                       }}
                  >
                    <div className={"m-auto w-100 rounded-circle"} style={{ maxWidth: 150, background: status === 'closed_verifications' ? '#40DD74' : '#ffffff' }}>
                      <Circle
                        value={getPercentage(get(data,'total.closed_verifications', 0))}
                        text={
                          !!get(data,'total.closed_verifications')
                            ? <NumberFormat
                              value={get(data,'total.closed_verifications')}
                              thousandSeparator={" "}
                              renderText={value => value}
                              displayType={"text"}
                            />
                            : "0"
                        }
                        strokeColor="#40DD74"
                        trailColor={status === 'closed_verifications' ? '#40DD74' : "#B8F6CD"}
                        textColor={status === 'closed_verifications' ? "#ffffff" : "#40DD74"}
                      />
                    </div>
                    <div className="text-center fw-medium font-size-14 mt-3">Закрытые</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100 circle-box cursor-pointer`}
                       onClick={() => handleStatsFilter("active_remarks")}
                       style={{
                         borderColor: status === 'active_remarks' ? '#EF986B' : ''
                       }}
                  >
                    <div className={"m-auto w-100 rounded-circle"} style={{ maxWidth: 150, background: status === 'active_remarks' ? '#EF986B' : '#ffffff' }}>
                      <Circle
                        value={getPercentage(get(data,'total.active_remarks', 0))}
                        text={
                          !!get(data,'total.active_remarks')
                            ? <NumberFormat
                              value={get(data,'total.active_remarks')}
                              thousandSeparator={" "}
                              renderText={value => value}
                              displayType={"text"}
                            />
                            : "0"
                        }
                        strokeColor="#EF986B"
                        trailColor={status === 'active_remarks' ? '#EF986B' : "#FFD1B9"}
                        textColor={status === 'active_remarks' ? "#ffffff" : "#EF986B"}
                      />
                    </div>
                    <div className="text-center fw-medium font-size-14 mt-3">Правонарущения</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100 circle-box cursor-pointer `}
                       onClick={() => handleStatsFilter("closed_remarks")}
                       style={{
                         borderColor: status === 'closed_remarks' ? '#40DD74' : ''
                       }}
                  >
                    <div className={"m-auto w-100 rounded-circle"} style={{ maxWidth: 150, background: status === 'closed_remarks' ? '#61B8E4' : '#ffffff' }}>
                      <Circle
                        value={getPercentage(get(data,'total.closed_remarks', 0))}
                        text={
                          !!get(data,'total.closed_remarks')
                            ? <NumberFormat
                              value={get(data,'total.closed_remarks')}
                              thousandSeparator={" "}
                              renderText={value => value}
                              displayType={"text"}
                            />
                            : "0"
                        }
                        strokeColor="#61B8E4"
                        trailColor={status === 'closed_remarks' ? '#61B8E4' : "#B8E7FF"}
                        textColor={status === 'closed_remarks' ? "#ffffff" : "#61B8E4"}
                      />
                    </div>
                    <div className="text-center fw-medium font-size-14 mt-3">Устраненные</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100 circle-box cursor-pointer `}
                       onClick={() => handleStatsFilter("closed_objects")}
                       style={{
                         borderColor: status === 'closed_objects' ? '#61B8E4' : ''
                       }}
                  >
                    <div className={"m-auto w-100 rounded-circle"} style={{ maxWidth: 150, background: status === 'closed_objects' ? '#61B8E4' : '#ffffff' }}>
                      <Circle
                        value={getPercentage(get(data,'total.closed_objects', 0))}
                        text={
                          !!get(data,'total.closed_objects')
                            ? <NumberFormat
                              value={get(data,'total.closed_objects')}
                              thousandSeparator={" "}
                              renderText={value => value}
                              displayType={"text"}
                            />
                            : "0"
                        }
                        strokeColor="#61B8E4"
                        trailColor={status === 'closed_objects' ? '#61B8E4' : "#B8E7FF"}
                        textColor={status === 'closed_objects' ? "#ffffff" : "#61B8E4"}
                      />
                    </div>
                    <div className="text-center fw-medium font-size-14 mt-3">Введеные в эксплуатацию</div>
                  </div>
                </div>
              </div>
              : null
            }
            {
              !isFetched
              ? <div className="row g-2 mb-4">
                  {
                    [...Array(6).keys()].map((_, key) => (
                      <div className="col-md-2" key={key}>
                        <div className={`bg-white rounded-3 shadow-sm py-3 px-5 h-100`} >
                          <div className={"m-auto rounded-circle skeleton"} style={{ width: 150, height: 150 }} />
                          <div className="text-center mt-3 skeleton"/>
                        </div>
                      </div>
                    ))
                  }
                </div>
              : null
            }
          </>
        }}
      </LoadOne>
      <LoadOne
        url={"/admin/statistic"}
        name={"statisticsBy"}
        asData
        params={{
          extra: {
            filter_by_status: status,
            filter_by_year: year
          }
        }}
      >
        {({ isFetched, data}) => {
          return <>

            {
              isFetched && get(data, "statistic") && get(data, "statistic").length
              ? <div className="table-responsive">
                  <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-lg-4 p-3 fw-medium font-size-14 align-top" style={{ width: 100 }}>№</th>
                        <th className="px-lg-4 p-3 fw-medium font-size-14 align-top">Наименование</th>
                        <th className="px-lg-4 p-3 fw-medium font-size-14 align-top text-center">Объекты</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Предписаний</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Активные</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Закрытые</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Правонарущения</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Активные</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Устранённые</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Объекты введенные в эксплуатацию</th>
                      </tr>
                    </thead>
                    <tbody className="row-bg-white">
                    {
                      get(data,'statistic').map((item, key) => (
                        <tr key={key}>
                          <td className="fw-medium p-3 px-lg-4">{key+1}</td>
                          <td className="fw-medium p-3 px-lg-4">
                            <Link
                              to={{
                                pathname: "/admin/statistics/region-statistic/"+item.id,
                                search: `filter_by_status=${status}&filter_by_year=${year}`,
                                state: { region: item}
                              }}
                              className={"d-block font-size-14"}
                            >
                              {get(item,'name','')}
                            </Link>
                          </td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'objects', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'verifications', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'active_verifications', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'closed_verifications', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'remarks', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'active_remarks', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'closed_remarks', '0')}</td>
                          <td className="fw-medium p-3 font-size-14 text-center">{get(item,'closed_objects', '0')}</td>
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
                        <th className="px-lg-4 p-3 fw-medium font-size-14 align-top" style={{ width: 100 }}>№</th>
                        <th className="px-lg-4 p-3 fw-medium font-size-14 align-top">Наименование</th>
                        <th className="px-lg-4 p-3 fw-medium font-size-14 align-top text-center">Объекты</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Предписаний</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Активные</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Закрытые</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Правонарущения</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Активные</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Устранённые</th>
                        <th className="p-3 fw-medium font-size-14 align-top text-center">Объекты введенные в эксплуатацию</th>
                      </tr>
                      </thead>
                      <tbody className="row-bg-white">
                      {
                        [...Array(15).keys()].map((item, key) => (
                          <tr key={key}>
                            <td className="fw-medium p-3 px-lg-4">
                              <div className={"skeleton rounded-circle"} style={{ width: 25, height: 25}}/>
                            </td>
                            <td className="fw-medium p-4 px-lg-4">
                              <div className={"skeleton rounded-2"}/>
                            </td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
                            <td className="fw-medium p-4 font-size-14 text-center"><div className={"skeleton rounded-2"}/></td>
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