import React, { useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import get from 'lodash.get';
import { useTranslation } from "react-i18next";
import DocumentUploader from 'components/DocumentUploader';
import { LoadOne } from 'schema/Container';
import MyForm from 'components/MyForm';
import Spin from 'components/AntSpin';
import { Field, FieldArray, ErrorMessage } from "formik";
import { serialize } from "object-to-formdata";
import { useDispatch } from "react-redux";
import Actions from 'schema/actions';
import {toast} from "react-toastify";


const ObjectView = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  return (<>
      <div id="homepage2" className="px-lg-4 px-3 flex-fill">
        <div className="pt-4 pb-5">
          <Link className="text-black-50 cursor-pointer" to={"/admin/construction-control/objects/list"}>
            <span className="mr-2"><i className="fa fa-arrow-left" /></span>
            <span>Список объектов</span>
          </Link>
        </div>

        <div className="row">
          <div className="col-xxl-8">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
              <LoadOne
                url={`/object-control/object/${id}`}
                name={"objectView"}
                asData
              >
                {({ isFetched, data={}}) => {

                  return <>
                    <Spin isSpinning={!isFetched || isLoading}>
                      <div>
                        <h1 className="font-size-xxl-16 font-size-14 mb-4 text-primary">Отправить в Регион</h1>
                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Наименование:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,'name_building','-')}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Местоположение:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,'location_building','-')}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Язык:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">
                              {
                                parseInt(get(data,'language')) === 1
                                  ? "ru"
                                  : parseInt(get(data,'language')) === 2
                                  ? "uz"
                                  : "-"
                              }
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Дата регистрации:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,'registration_date','-')}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Номер регистрации:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,'registration_number', "-")}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Дата договора за надзорные функции и
                              оплата:
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,"contract_date") ? get(data,"contract_date") : "-"}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Стоимость строительно-монтажных работ:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data, "contract_amount", 0)} сўм</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Основание для строительство:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,'governor_decision','-')}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Статус:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">
                              {
                                get(data, 'status') === 0
                                  ? <button
                                    className="btn btn-primary btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                    Активно
                                  </button>
                                  : get(data, 'status') === 1
                                  ? <button
                                    className="btn btn-danger btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                    Закрыто
                                  </button>
                                  : get(data, 'status') === 2
                                  ? <button
                                    className="btn btn-warning btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                    Мерорприятия
                                  </button>
                                  : get(data, 'status') === 3
                                  ? <button
                                    className="btn btn-success btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                    Аст
                                  </button>
                                  : get(data, 'status') === 4
                                  ? <button
                                    className="btn btn-secondary btn-sm text-white fw-medium focus-none" style={{width: '140px'}}>
                                    Время истекло
                                  </button>
                                  : null
                              }
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Заключение экспертизы:</div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,'expertise_report','-')}</div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <div className="font-size-14 font-size-xxl-16 fw-medium">Протокол градостроительного совета или
                              соглас. ген.плана:
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="font-size-14 fw-medium">{get(data,"number_date_protocol", "-")}</div>
                          </div>
                        </div>
                        <div className="row mb-5">
                          <div className="">
                            <div className="font-size-14 font-size-xxl-16 fw-medium mb-2">Файлы:</div>
                            <div className="font-size-14 fw-medium">
                              {
                                get(data,"files") && get(data,"files").length
                                ? <div className="">
                                    {
                                      get(data,"files").map((item, key) => (
                                        <div key={key} className={"file-tem d-flex align-items-center rounded-3 p-3 bg-white mb-1 shadow-sm border"}>
                                          <div className={'file-number px-3'}>{key + 1}</div>
                                          <div className={'px-3 flex-fill file-content border-start border-end'}>
                                            <div>{get(item,'description') ? get(item,'description') : "File"}</div>
                                          </div>
                                          <div className={'text-center px-3 file-icon'}>
                                            <a href={get(item,'file')} target={"_blank"} download rel={"noopener noreferrer"} className={'py-1 px-2 font-size-18'}>
                                              <i className="fal fa-arrow-to-bottom" />
                                            </a>
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                                : null
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      {
                        !get(data,'closed_at')
                        ? <MyForm
                            t={t}
                            fields={[
                              {
                                name: 'act',
                                value: [],
                                required: true,
                                min: 1,
                                type: 'array',
                                onSubmitValue: data => data[0]
                              },
                              {
                                name: 'passport',
                                value: [],
                                required: true,
                                min: 1,
                                type: 'array',
                                onSubmitValue: data => data[0]
                              },
                              {
                                name: 'photos',
                                value: [],
                                required: true,
                                type: 'array',
                                min: 15
                              }
                            ]}
                            onSubmit={({ values}) => {
                              setLoading(true);
                              dispatch(Actions.CREATE.request({
                                url: `/admin/oc/object-close/${id}`,
                                name: 'objectFiles',
                                values: serialize(values),
                                cb: {
                                  success: () => {
                                    toast.success("Fayllar yuklandi");
                                    dispatch(Actions.LoadOne.request({
                                      url: `/object-control/object/${id}`,
                                      name: "objectView",
                                      asData: true,
                                      params: {},
                                      dataKey: 'data',
                                      cb: {
                                        success: () => {},
                                        error: () => {},
                                        finally: () => {},
                                      },
                                    }))
                                  },
                                  error: () => {
                                    toast.error("Xatolik yuz berdi");
                                  },
                                  finally: () => {
                                    setLoading(false);
                                  }
                                }
                              }));
                            }}
                          >
                            {({ values, setFieldValue}) => {
                              return <>
                                <h2 className="font-size-18 fw-medium mb-4">Завершить строительство</h2>
                                <div className="mb-4">
                                  <div className="">
                                    <div className="font-size-14 font-size-xxl-16 fw-medium mb-2">АКТ</div>
                                    <Field
                                      id={"act"}
                                      component={DocumentUploader}
                                      inputName={"act"}
                                      values={values}
                                      onChange={files => setFieldValue("act", files)}
                                      formats={[".pdf"]}
                                      icon={<i className="fal fa-file-pdf" />}
                                    />
                                    <ErrorMessage
                                      name={"act"}
                                      render={() => <span className={"text-danger font-size-12"}>Pdf fayl yuklanishi shart</span>}
                                    />
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="">
                                    <div className="font-size-14 font-size-xxl-16 fw-medium mb-2">Янги қурилган бино ва иншоотнинг техник паспорти</div>
                                    <Field
                                      id={"passport"}
                                      component={DocumentUploader}
                                      inputName={"passport"}
                                      values={values}
                                      onChange={files => setFieldValue("passport", files)}
                                      formats={[".pdf"]}
                                      icon={<i className="fal fa-file-pdf" />}
                                    />
                                    <ErrorMessage
                                      name={"passport"}
                                      render={() => <span className={"text-danger font-size-12"}>Pdf fayl yuklanishi shart</span>}
                                    />
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="">
                                    <div className="font-size-14 font-size-xxl-16 fw-medium mb-2">Фотографии</div>
                                    <Field
                                      id={"photos"}
                                      component={DocumentUploader}
                                      text={"Загрузить фото"}
                                      inputName={"photos"}
                                      values={values}
                                      onChange={files => setFieldValue("photos", files)}
                                      formats={[".jpg", ".jpeg", ".png"]}
                                      icon={<i className="fal fa-file-image" />}
                                      showPreview={false}
                                      isMulti
                                    />
                                    <FieldArray
                                      name={"photos"}
                                      render={(helpers) => (
                                        <div className={"d-flex flex-wrap"}>
                                          {
                                            values["photos"].length
                                              ? values["photos"].map((item,key) => {
                                                const img = URL.createObjectURL(item);
                                                return <div key={key} className={"preview-item position-relative img-thumbnail mr-2 has-bg mb-2"} style={{ backgroundImage: `url(${img})`, height: 100, width: 100}}>
                                                  <div className={"preview-wrapper position-absolute top-0 start-0 d-inline-flex align-items-center justify-content-around  h-100 w-100"}>
                                                    <a className={"text-white font-size-22"} href={img} target={"_blank"} rel={"noopener noreferrer"}><i className={"fal fa-eye"}/></a>
                                                    <span onClick={() => helpers.remove(key)} className={"text-white cursor-pointer font-size-22"}><i className={"fal fa-times"} /></span>
                                                  </div>
                                                </div>
                                              })
                                              : null
                                          }
                                        </div>
                                      )}
                                    />
                                    <ErrorMessage
                                      name={"photos"}
                                      render={() => <span className={"text-danger font-size-12"}>15tadan kam bo'lmagan rasm yuklanishi shart</span>}
                                    />
                                  </div>
                                </div>

                                <button className="btn btn-primary focus-none text-white" type="submit">Сохранить</button>
                              </>
                            }}
                          </MyForm>
                        : null
                      }
                    </Spin>
                  </>
                }}
              </LoadOne>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ObjectView;