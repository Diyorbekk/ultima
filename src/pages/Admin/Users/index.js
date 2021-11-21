import React, { useState } from 'react';
import { LoadAll, LoadOne } from 'schema/Container';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination';
import Empty from 'components/Empty';
import Modal from 'components/Modal';

const userRoles = [
  {
    name: 'Главный Администратор',
    value: 'admin',
  },
  {
    name: 'Администратор (только для чтения)',
    value: 'supervision',
  },
  {
    name: 'СМР',
    value: 'cmr',
  },
  {
    name: 'Shaffof Администратор',
    value: 'admin-shaffof',
  },
  {
    name: 'Руководители (область)',
    value: 'supervisor',
  },
  {
    name: 'Отдел регистрации',
    value: 'registration-department',
  },
  {
    name: 'Инспектор',
    value: 'inspectors',
  },
  {
    name: 'Тех. надзор / Заказчик',
    value: 'customer',
  },
  {
    name: 'ГИП / Проектировщик',
    value: 'planner',
  },
  {
    name: 'Прораб / Подрядчик',
    value: 'contractor',
  },
  {
    name: 'Начальник',
    value: 'mc-boss',
  },
  {
    name: 'Прокуротура',
    value: 'prosecutor',
  },
];

const CompanyType = () => {

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('20');
  const [selectedObject, setObject] = useState(null);
  const [userModal, setUserModal] = useState(false);
  const [role, setRole] = useState("admin");
  const [menuOpen, setMenu] = useState(false);

  const closeUserModal = () => {
    setUserModal(false);
    setTimeout(() => {
      setObject(null);
    }, 500);
  };

  const openUserModal = obj => {
    setObject(obj);
    setTimeout(() => {
      setUserModal(true);
    }, 10);
  };

  return (
    <>
      <Modal
        isOpen={userModal}
        width={700}
        onClose={closeUserModal}
        position={"center"}
      >
        <div className={"p-4"}>
          <LoadOne
            url={`/admin/user/${role}/${selectedObject?.id}`}
            name={"userView"}
            asData
          >
            {({data={}}) => {
              return <>
                <div className={"mb-5 fw-medium font-size-18"}>
                  <div className={"mb-4"}>Информация о пользователе</div>
                  <div className={"row gy-3"}>
                    <div className="col-5">Имя:</div>
                    <div className="col-7">{get(data,"f_name", "-")}</div>
                    <div className="col-5">Отчество:</div>
                    <div className="col-7">{get(data,"l_name", "-")}</div>
                    <div className="col-5">Фамилия:</div>
                    <div className="col-7">{get(data,"s_name", "-")}</div>
                    <div className="col-5">Логин:</div>
                    <div className="col-7">{get(data,"login", "-")}</div>
                    <div className="col-5">Телефон:</div>
                    <div className="col-7">{get(data,"phone", "-")}</div>
                  </div>
                </div>
              </>
            }}
          </LoadOne>
          <div className={"text-end"}>
            <button className={"btn btn-primary text-white focus-none"} onClick={closeUserModal}>Закрыт</button>
          </div>
        </div>
      </Modal>

      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Пользователи</h1>
        <div className={"d-flex -align-items-center"}>
          <Link className="btn btn-primary text-white focus-none" to="#!">Добавить</Link>
          <div className={"position-relative"}>
            <span
              className={"ml-4 font-size-22 cursor-pointer"}
              onClick={() => setMenu(prev => !prev)}
            >
            <i className="far fa-sliders-h text-primary"/>
          </span>
            <ul className={`users-menu position-absolute end-0 shadow-sm ${menuOpen ? "menu-open" : ''}`}>
              {
                userRoles.map((item, key) => (
                  <li key={key} onClick={() => {
                    setRole(item.value);
                    setTimeout(() => {
                      setMenu(false);
                    }, 100);
                  }}>{item.name}</li>
                ))
              }
              {/*<li data-role={"admin"}>Главный Администратор</li>*/}
              {/*<li data-role={"supervision"}>Администратор (только для чтения)</li>*/}
              {/*<li data-role={"cmr"}>СМР</li>*/}
              {/*<li data-role={"admin-shaffof"}>Shaffof Администратор</li>*/}
              {/*<li data-role={"supervisor"}>Руководители (область)</li>*/}
              {/*<li data-role={"registration-department"}>Отдел регистрации</li>*/}
              {/*<li data-role={"inspector"}>Инспектор</li>*/}
              {/*<li data-role={"customer"}>Тех. надзор / Заказчик</li>*/}
              {/*<li data-role={"planner"}>ГИП / Проектировщик</li>*/}
              {/*<li data-role={"contractor"}>Прораб / Подрядчик</li>*/}
              {/*<li data-role={"ms-boss"}>Начальник</li>*/}
              {/*<li data-role={"prosecutor"}>Прокуротура</li>*/}
            </ul>
          </div>
        </div>
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
        url={`/admin/user/${role}`}
        name={"usersList"}
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
                  <table className="table table-borderless table-separate spaceY-1">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="p-3 fw-normal">#ID</th>
                        <th className="p-3 fw-normal">Ф.И.О</th>
                        <th className="p-3 fw-normal text-center">Создать новый пароль	</th>
                        <th className="p-3 fw-normal" />
                      </tr>
                    </thead>
                    <tbody className="row-bg-white">
                      {
                        data.map((item, key) => (
                          <tr className="rounded-2" key={key}>
                            <td className="fw-medium p-3 p-lg-4 align-middle" style={{ width: 50}}>
                              <span className={"pr-3"}>{get(item,'id')}</span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-start">
                              <span className="font-size-18 text-secondary">{get(item,'full_name','')}</span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-start text-center">
                              <Link to={"#!"} className="font-size-22"><i className={"fal fa-key"}/></Link>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle" style={{ width: 200}}>
                              <div className={"d-flex align-items-center justify-content-around"}>
                                <span className={"cursor-pointer text-secondary mx-2 text-primary-hover"}>
                                  <i className={"fas fa-pen"} />
                                </span>
                                <span onClick={() => openUserModal(item)} className="cursor-pointer text-secondary mx-2 text-primary-hover">
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
                        <th className="p-3 fw-normal">#ID</th>
                        <th className="p-3 fw-normal">Ф.И.О</th>
                        <th className="p-3 fw-normal text-center">Создать новый пароль	</th>
                        <th className="p-3 fw-normal" />
                      </tr>
                    </thead>
                    <tbody className="row-bg-white">
                    {
                      [...Array(parseInt(perPage)).keys()].map((item, key) => (
                        <tr key={key}>
                          <td className="p-lg-4 p-3" style={{ width: 50}}><div className={"skeleton rounded-circle"} style={{ width: 25, height: 25}}/></td>
                          <td className="p-lg-4 p-3"><div className={"skeleton rounded-2"}/></td>
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
            {
              Object.keys(meta) && meta?.total > parseInt(perPage)
              ? <Pagination
                  className={'justify-content-end pt-3'}
                  initialPage={page}
                  pageCount={Math.ceil(get(meta,'total',1) / parseInt(perPage))}
                  onChange={n => setPage(n)}
                />
              : null
            }
          </>
        }}
      </LoadAll>
    </>
  );
};

export default CompanyType;