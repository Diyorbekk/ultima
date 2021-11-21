import React, { useState } from 'react';
import { LoadAll } from 'schema/Container';
import get from 'lodash.get';
import Pagination from 'components/Pagination';
import Empty from 'components/Empty';
import Modal from 'components/Modal';
import {Field} from "formik";
import MyForm from 'components/MyForm';
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import Actions from 'schema/actions';
import {useDispatch} from "react-redux";
import {serialize} from "object-to-formdata";


const createErrorClass = (errors, touched, name) => `${errors[name] && touched[name] ? 'is-invalid' : (touched[name] && !errors[name]) ? 'is-valid' : ''}`;


const CompanyType = () => {

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedObject, setObject] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [updateObject, setUpdate] = useState(null);
  const [isModalOpen, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);


  const deleteObject = () => {
    setLoading(true);
    dispatch(Actions.DELETE.request({
      method: "POST",
      url: '/admin/oc/object-type/'+objectId,
      name: 'objectType',
      id: objectId,
      cb: {
        success: () => {
          toast.success("Obyekt o'chirildi");
        },
        error: () => {
          toast.error("Xatolik yuz berdi");
        },
        finally: () => {
          setObjectId(null);
          setLoading(false);
        }
      }
    }));
  };

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
      <Modal
        isOpen={!!objectId}
        onClose={() => setObjectId(null)}
        width={500}
        position={"center"}
      >
        <div className={"p-4"}>
          <h5 className={"text-center mb-5"}>Вы хотите удалить этот объект?</h5>
          <div className={"text-center"}>
            <button
              className={"ml-3 btn btn-primary text-white btn-sm focus-none"}
              onClick={() => setObjectId(null)}
              disabled={isLoading}
            >Отмена</button>
            <button
              className={"ml-3 btn btn-danger btn-sm focus-none"}
              onClick={deleteObject}
              disabled={isLoading}
            >
              {
                isLoading
                  ? <span className={"mr-2"}><i className="fal fa-spinner-third fa-spin"/></span>
                  : null
              }
              Удалить
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        width={650}
        onClose={() => setModal(null)}
        className={"pt-5"}
        closeOnBack={false}
      >
        <div className={"p-4"}>
          <div className="mb-4">
            <div className="font-size-20 text-dark-blue fw-semibold">Добавление типа</div>
          </div>
          <MyForm
            t={t}
            fields={[
              {
                name: 'name_uz',
                value: '',
                required: true
              },
              {
                name: 'name_ru',
                value: '',
                required: true
              }
            ]}
            onSubmit={({ values, setSubmitting }) => {
              values = { "name[uz]": values.name_uz, "name[ru]": values.name_ru};
              dispatch(Actions.CREATE.request({
                url: '/admin/oc/object-type',
                name: 'objectType',
                prepend: true,
                values: serialize(values),
                cb: {
                  success: () => {
                    toast.success("Qo'shildi");
                    setModal(false);
                  },
                  error: () => {
                    toast.error("Xatolik yuz berdi");
                  },
                  finally: () => {
                    setSubmitting(false);
                  },
                }
              }));
            }}
          >
            {({ errors, touched, isSubmitting }) => {

              return <>
                <div className="mb-3">
                  <label className={"mb-1"}>Тип объекта(uz)</label>
                  <Field className={`form-control focus-none ${createErrorClass(errors, touched, 'name_uz')}`} name="name_uz" type="text"/>
                </div>
                <div className="mb-3">
                  <label className={"mb-1"}>Тип объекта(ru)</label>
                  <Field className={`form-control focus-none ${createErrorClass(errors, touched, 'name_ru')}`} name="name_ru" type="text"/>
                </div>
                <div className="text-end">
                  <button
                    className="btn btn-primary btn-sm text-white focus-none ml-2"
                    type={"button"}
                    disabled={isSubmitting}
                    onClick={() => setModal(false)}
                  >Отмена</button>
                  <button
                    className="btn btn-primary btn-sm text-white focus-none ml-2"
                    type={"submit"}
                    disabled={isSubmitting}
                  >Сохранить</button>
                </div>
              </>
            }}
          </MyForm>
        </div>
      </Modal>
      <Modal
        isOpen={!!updateObject}
        width={700}
        onClose={() => setUpdate(null)}
        className={"pt-5"}
        closeOnBack={false}
      >
        <div className={"p-4"}>
          <div className="mb-4">
            <div className="font-size-20 text-dark-blue fw-semibold">Обновление типа</div>
          </div>
          <MyForm
            t={t}
            fields={[
              {
                name: 'name_uz',
                value: get(updateObject, 'name_uz') ? get(updateObject, 'name_uz') : '',
                required: true
              },
              {
                name: 'name_ru',
                value: get(updateObject, 'name_ru') ? get(updateObject, 'name_ru') : '',
                required: true
              }
            ]}
            onSubmit={({ values, setSubmitting }) => {
              values = { "_method": "PUT", "name[uz]": values.name_uz, "name[ru]": values.name_ru};
              dispatch(Actions.METHOD.request({
                url: '/admin/oc/object-type/'+updateObject.id,
                name: 'objectType',
                id: updateObject.id,
                values: serialize(values),
                cb: {
                  success: () => {
                    toast.success("O'zgartirildi");
                    setUpdate(false);
                  },
                  error: () => {
                    toast.error("Xatolik yuz berdi");
                  },
                  finally: () => {
                    setSubmitting(false);
                  },
                }
              }));
            }}
          >
            {({ errors, touched, isSubmitting }) => {

              return <>
                <div className="mb-3">
                  <label className={"mb-1"}>Тип объекта(uz)</label>
                  <Field className={`form-control focus-none ${createErrorClass(errors, touched, 'name_uz')}`} name="name_uz" type="text"/>
                </div>
                <div className="mb-3">
                  <label className={"mb-1"}>Тип объекта(ru)</label>
                  <Field className={`form-control focus-none ${createErrorClass(errors, touched, 'name_ru')}`} name="name_ru" type="text"/>
                </div>
                <div className="text-end">
                  <button
                    className="btn btn-primary btn-sm text-white focus-none ml-2"
                    type={"button"}
                    onClick={() => setUpdate(null)}
                    disabled={isSubmitting}
                  >Отмена</button>
                  <button
                    className="btn btn-primary btn-sm text-white focus-none ml-2"
                    type={"submit"}
                    disabled={isSubmitting}
                  >
                    {
                      isSubmitting
                        ? <span className={"mr-2"}><i className="fal fa-spinner-third fa-spin"/></span>
                        : null
                    }
                    Сохранить
                  </button>
                </div>
              </>
            }}
          </MyForm>
        </div>
      </Modal>

      <div className="d-flex align-items-center justify-content-between py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Тип объекта</h1>
        <button className="btn btn-primary text-white focus-none" onClick={() => setModal(true)}>Добавить</button>
      </div>

      <LoadAll
        url={'/admin/oc/object-type'}
        name={"objectType"}
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

            {
              isFetched && data.length
                ? <div className="table-responsive">
                  <table className="table table-borderless table-separate spaceY-1 rounded-bottom">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-lg-4 p-3 fw-normal">#ID</th>
                        <th className="px-lg-4 p-3 fw-normal">Наименование</th>
                        <th className="px-lg-4 p-3 fw-normal">Тип строительства</th>
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
                            <td className="fw-medium p-3 p-lg-4 text-secondary font-size-14">{get(item,'name_ru')}</td>
                            <td className="fw-medium p-3 p-lg-4 align-middle" style={{ width: 200}}>
                              <div className={"d-flex align-items-center justify-content-around"}>
                                <span className={"cursor-pointer text-secondary mx-2 text-primary-hover"} onClick={() => setUpdate(item)}>
                                  <i className={"fas fa-pen"} />
                                </span>
                                <span onClick={() => setObject(item)} className="cursor-pointer text-secondary mx-2 text-primary-hover">
                                  <i className="fas fa-eye"/>
                                </span>
                                <span
                                  onClick={() => setObjectId(item.id)}
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
                      <th className="px-lg-4 p-3 fw-normal">Наименование</th>
                      <th className="px-lg-4 p-3 fw-normal">Тип строительства</th>
                      <th className="px-lg-4 p-3 fw-normal" />
                    </tr>
                  </thead>
                  <tbody className="row-bg-white">
                  {
                    [...Array(10).keys()].map((item, key) => (
                      <tr key={key}>
                        <td className="px-lg-4 p-3" style={{ width: 50}}><div className={"skeleton rounded-circle"} style={{ width: 25, height: 25}}/></td>
                        <td className="px-lg-4 p-3"><div className={"skeleton rounded-2"}/></td>
                        <td className="px-lg-4 p-3"><div className={"skeleton rounded-2"}/></td>
                        <td className="px-lg-4 p-3" style={{ width: 200}}>
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