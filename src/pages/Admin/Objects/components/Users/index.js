import React from 'react';
import get from 'lodash.get';
import Spin from 'components/AntSpin';


const Users = ({ isFetched, data, empty }) => {

  return (
    <>
      <Spin isSpinning={!isFetched}>
        <div className="table-responsive">
          <table className="table table-borderless table-separate spaceY-1">
            <tbody className="row-bg-white">
              {
                get(data,'responsibles.customers', []).length
                ? get(data,'responsibles.customers').map((item,key) => (
                    <tr className="rounded-2" key={key}>
                      <td className="fw-medium p-3 p-lg-4 align-middle rounded-start">
                        <span className="font-size-16 text-secondary">{get(item,'info')}</span>
                      </td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">{get(item,'login')}</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">Заказчик</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle text-end rounded-end text-primary">
                        {
                          get(item,'phone', '')
                            ? <div className={"text-end"}>
                              <a className="fw-medium font-size-14" href={`tel:${get(item,'phone')}`}>
                                {get(item,'phone')}
                                <i className="ml-3 fa fa-phone-alt" />
                              </a>
                            </div>
                            : <div className={"font-size-24 text-start"}>-</div>
                        }
                      </td>
                    </tr>
                  ))
                : null
              }
              {
                get(data,'responsibles.contractors', []).length
                  ? get(data,'responsibles.contractors').map((item,key) => (
                    <tr className="rounded-2" key={key}>
                      <td className="fw-medium p-3 p-lg-4 align-middle rounded-start">
                        <span className="font-size-16 text-secondary">{get(item,'info')}</span>
                      </td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">{get(item,'login')}</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">Подрядчик</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle text-end rounded-end text-primary">
                        {
                          get(item,'phone', '')
                            ? <div className={"text-end"}>
                              <a className="fw-medium font-size-14" href={`tel:${get(item,'phone')}`}>
                                {get(item,'phone')}
                                <i className="ml-3 fa fa-phone-alt" />
                              </a>
                            </div>
                            : <div className={"font-size-24 text-start"}>-</div>
                        }
                      </td>
                    </tr>
                  ))
                  : null
              }
              {
                get(data,'responsibles.planners', []).length
                  ? get(data,'responsibles.planners').map((item,key) => (
                    <tr className="rounded-2" key={key}>
                      <td className="fw-medium p-3 p-lg-4 align-middle rounded-start">
                        <span className="font-size-16 text-secondary">{get(item,'info')}</span>
                      </td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">{get(item,'login')}</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">Проектировшик</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle rounded-end text-primary">
                        {
                          get(item,'phone', '')
                          ? <div className={"text-end"}>
                              <a className="fw-medium font-size-14" href={`tel:${get(item,'phone')}`}>
                                {get(item,'phone')}
                                <i className="ml-3 fa fa-phone-alt" />
                              </a>
                            </div>
                          : <div className={"font-size-24 text-start"}>-</div>
                        }
                      </td>
                    </tr>
                  ))
                  : null
              }
              {
                get(data,'responsibles.inspectors', []).length
                  ? get(data,'responsibles.inspectors').map((item,key) => (
                    <tr className="rounded-2" key={key}>
                      <td className="fw-medium p-3 p-lg-4 align-middle rounded-start">
                        <span className="font-size-16 text-secondary">{get(item,'info')}</span>
                      </td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">{get(item,'login')}</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle"><span className="text-black-50 font-size-14">Инспектор</span></td>
                      <td className="fw-medium p-3 p-lg-4 align-middle rounded-end text-primary">
                        {
                          get(item,'phone', '')
                            ? <div className={"text-end"}>
                              <a className="fw-medium font-size-14" href={`tel:${get(item,'phone')}`}>
                                {get(item,'phone')}
                                <i className="ml-3 fa fa-phone-alt" />
                              </a>
                            </div>
                            : <div className={"font-size-24 text-start"}>-</div>
                        }
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
        isFetched && Object.keys(data) &&
        !get(data,'responsibles.customers', []).length &&
        !get(data,'responsibles.contractors', []).length &&
        !get(data,'responsibles.planners', []).length
        ? empty
        : null
      }
    </>
  );
};

export default Users;