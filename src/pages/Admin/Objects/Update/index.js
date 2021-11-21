import React, {useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyForm from 'components/MyForm';
import DatePicker  from '@hassanmojab/react-modern-calendar-datepicker';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import YandexMap from 'components/YandexMap';
import { useTranslation } from "react-i18next";
import {ErrorMessage, Field} from 'formik';
import Fields from 'components/Fields';
import DocumentUploader from 'components/DocumentUploader';
import Modal from 'components/Modal';
import { useDispatch } from 'react-redux';
import Actions from 'schema/actions';
import {toast} from "react-toastify";
import { serialize } from "object-to-formdata";
import { LoadOne } from 'schema/Container';
import Spin from 'components/AntSpin';
import get from 'lodash.get';

const createErrorClass = (errors, touched, name) => `${errors[name] && touched[name] ? 'is-invalid' : (touched[name] && !errors[name]) ? 'is-valid' : ''}`;

const Create = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [marker, setMarker] = useState([41.311151, 69.279737]);
  const [isOpen, setOpen] = useState(null);

  return (<>
      <Modal
        isOpen={!!isOpen}
        onClose={() => setOpen(null)}
        width={900}
      >
        <div className="p-4">
          <div className={"d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom"}>
            <div className={"font-size-18 fw-semibold"}>
              {
                isOpen === "customer"
                  ? "Добавить клиента"
                  : isOpen === "contractor"
                  ? "Добавить подрядчика"
                  : isOpen === "planner"
                    ? "Добавить планировщика"
                    : ''
              }
            </div>
            <span className={"px-2 cursor-pointer"} onClick={() => setOpen(null)}>
              <i className={"fal fa-times"}/>
            </span>
          </div>
          <MyForm
            t={t}
            fields={[
              {
                name: 'region_id',
                value: '',
                required: true,
              },
              {
                name: 'l_name',
                value: '',
                required: true
              },
              {
                name: 'f_name',
                value: '',
                required: true
              },
              {
                name: 's_name',
                value: '',
                required: true
              },
              {
                name: 'login',
                value: '',
                required: true,
                type: 'email'
              },
              {
                name: 'passport_serial',
                value: '',
                required: true,
                min: 2,
                max: 2
              },
              {
                name: 'passport_number',
                value: '',
                required: true,
                min: 7,
                max: 7
              },
              {
                name: 'company_id',
                value: '',
                required: true,
                type: 'array',
                min: 1,
                max: 2,
                onSubmitValue: data => data.map(item => item.id)
              },
              {
                name: 'phone',
                value: '',
                min: 9,
                max: 9,
                required: true,
                onSubmitValue: val => `998${val}`
              },
              {
                name: 'specialization',
                value: '',
                required: true
              }

            ]}
            onSubmit={({ values, resetForm, setSubmitting}) => {
              dispatch(Actions.CREATE.request({
                url: '/admin/user/'+isOpen,
                name: 'addNewUser',
                values,
                cb: {
                  success: () => {
                    toast.success("Qo'shildi");
                    setOpen(null);
                  },
                  error: () => {
                    toast.error("Xatolik yuz berdi");
                  },
                  finally: () => {
                    setSubmitting(false);
                  }
                }
              }))
            }}
          >
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting}) => {

              return <>
                <div className="row gx-3 gy-4">
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Фамилия</label>
                    <Field
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "l_name")}`}
                      name="l_name"
                      type="text"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Имя</label>
                    <Field
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "f_name")}`}
                      name="f_name"
                      type="text"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Отчество</label>
                    <Field
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "s_name")}`}
                      name="s_name"
                      type="text"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Логин</label>
                    <Field
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "login")}`}
                      name="login"
                      type="text"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Серия паспорта</label>
                    <Field
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "passport_serial")}`}
                      name="passport_serial"
                      type="text"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Номер паспорта</label>
                    <Field
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "passport_number")}`}
                      name="passport_number"
                      type="text"
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFieldValue('passport_number', value);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className={"d-block mb-1 font-size-15"}>Телефон</label>
                    <Fields.InputPhone
                      className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "phone")}`}
                      name="phone"
                      type="text"
                      format="+998 ## ###-####"
                      placeholder="+998 ## ###-####"
                      mask={"_"}
                      allowEmptyFormatting
                      onBlur={() => {
                        setFieldTouched('phone', true)
                      }}
                      value={values.phone}
                      onValueChange ={data => {
                        setFieldValue('phone', data.value)
                      }}
                      isNumericString
                    />
                  </div>
                  <div className="form-group col-md-8">
                    <label className={"d-block mb-1 font-size-15"} htmlFor={"region_id"}>Область</label>
                    <Fields.Select2
                      value={values.region_id}
                      url={"/object-control/region-list"}
                      isActive
                      className={`focus-none form-select font-size-15 ${createErrorClass(errors, touched, "region_id")}`}
                      id="region_id"
                      name="region_id"
                      placeholder={"Выберите регион"}
                      onChange={e => {
                        setFieldValue("region_id", Number(e.target.value));
                      }}
                      onBlur={() => {
                        setFieldTouched('region_id', true);
                      }}
                    />
                  </div>
                  <div className="form-group col-12">
                    <label className={"d-block mb-1 font-size-15"}>Компания</label>
                    <Fields.AsyncSelect2
                      url={"/admin/company"}
                      name={"company_id"}
                      value={values.company_id}
                      filterParams={(search) => {
                        let extra = {};
                        if(search){
                          extra = {
                            ...extra,
                            search
                          }
                        }
                        return {
                          extra: {...extra}
                        }
                      }}
                      perPage={20}
                      placeholder={"Выберите комранию"}
                      optionLabel={"name"}
                      optionValue={"id"}
                      onChange={data => setFieldValue('company_id', data)}
                      onBlur={() => {
                        setFieldTouched("company_id", true);
                      }}
                    />
                    <ErrorMessage
                      name={'company_id'}
                      render={() => <span className={"text-danger font-size-12"}>Выберите регион (не может быть больше 2)</span>}
                    />
                  </div>

                  <div className="form-group col-12 mb-3">
                    <label className={"d-block mb-1 font-size-15"}>Название вуза, специализация, номер и дата диплома</label>
                    <Field
                      className={`form-control w-100 resize-none font-size-15 focus-none ${createErrorClass(errors, touched, "specialization")}`}
                      name="specialization"
                      type="text"
                      rows="5"
                      as={"textarea"}
                    />
                  </div>
                  <div className="text-end">
                    <button disabled={isSubmitting} className="btn btn-primary text-white focus-none" type="submit">
                      {
                        isSubmitting
                          ? <span className={"mr-2"}><i className="fal fa-spinner-third fa-spin"/></span>
                          : null
                      }
                      Сохранить
                    </button>
                  </div>
                </div>
              </>
            }}
          </MyForm>
        </div>
      </Modal>
      <div id="homepage2" className="px-lg-4 px-3 flex-fill">
        <div className="pt-4 pb-5">
        <span className="text-black-50 cursor-pointer" onClick={() => history.replace("/admin/construction-control/objects/list")}>
          <span className="mr-2"><i className="fa fa-arrow-left" /></span>
          <span>Список объектов</span>
        </span>
        </div>

        <div className="">
          <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
            <h1 className="font-size-18 mb-4">Редактирование объекта</h1>
            <LoadOne
              url={"/admin/oc/object/"+id}
              name={"singleObject"}
              asData
              onSuccess={data => {
                if(get(data,'map_lt') && get(data,'map_ln')){
                  setMarker([get(data,'map_lt'), get(data,'map_ln')]);
                }
              }}
            >
              {({ isFetched, data={}}) => {

                return <>
                  <Spin
                    isSpinning={!isFetched}
                  >
                    <MyForm
                      className={""}
                      t={t}
                      fields={[
                        {
                          name: '_method',
                          value: "PUT",
                        },
                        {
                          name: 'language',
                          value: parseInt(get(data,'language',1)),
                        },
                        {
                          name: 'name_building',
                          value: get(data,'name_building') ? get(data,'name_building') : '',
                          min: 3,
                          required: true
                        },
                        {
                          name: 'region_id',
                          value: get(data,'region_id') ? get(data,'region_id') : '',
                          required: true,
                          onSubmitValue: id => parseInt(id)
                        },
                        {
                          name: 'district_id',
                          value: get(data,'district_id') ? get(data,'district_id') : '',
                          required: true,
                          onSubmitValue: id => parseInt(id)
                        },
                        {
                          name: 'contract_amount',
                          value: get(data,'contract_amount') ? get(data,'contract_amount') : '',
                          required: true
                        },
                        {
                          name: 'registration_date',
                          value: get(data,'registration_date') ? get(data,'registration_date').slice(0,10) : '',
                          type: 'object',
                          onSubmitValue: () => get(data,'registration_date')
                        },
                        {
                          name: 'registration_number',
                          value: get(data,'registration_number'),
                          required: true,
                          min: 1
                        },
                        {
                          name: 'number_date_protocol',
                          value: get(data,'number_date_protocol') ? get(data,'number_date_protocol') : '',
                          required: true,
                          min: 2
                        },
                        {
                          name: 'governor_decision',
                          value: get(data,'governor_decision') ? get(data,'governor_decision') : '',
                          required: true,
                          min: 2
                        },
                        {
                          name: 'expertise_report',
                          value: get(data,'expertise_report') ? get(data,'expertise_report') : '',
                          required: true,
                          min: 3
                        },
                        {
                          name: 'parallel_designobjc',
                          value: get(data,'parallel_designobjc') ? get(data,'parallel_designobjc') : '',
                          required: true,
                          min: 3
                        },
                        {
                          name: 'expire',
                          value: get(data,'expire') ? get(data,'expire') : '',
                          required: true,
                        },
                        {
                          name: 'type',
                          value: get(data,'types') ? get(data,'types') : {},
                          required: true,
                          type: 'object',
                          onSubmitValue: data => data.id
                        },
                        {
                          name: 'source_of_financing',
                          value: get(data,'source_of_financing') ? get(data,'source_of_financing') : '',
                          required: true
                        },
                        {
                          name: 'construction_status',
                          value: get(data,'construction_status') ? get(data,'construction_status') : '',
                          required: true
                        },
                        {
                          name: 'customer_id',
                          value: get(data,'responsibles.customers') ? get(data,'responsibles.customers') : [],
                          required: true,
                          type: 'array',
                          min: 1,
                          onSubmitValue: data => data.map(item => item.id)
                        },
                        {
                          name: 'contractor_id',
                          value: get(data,'responsibles.contractors') ? get(data,'responsibles.contractors') : [],
                          required: true,
                          type: 'array',
                          min: 1,
                          onSubmitValue: data => data.map(item => item.id)
                        },
                        {
                          name: 'planner_id',
                          value: get(data,'responsibles.planners') ? get(data,'responsibles.planners') : [],
                          required: true,
                          type: 'array',
                          min: 1,
                          onSubmitValue: data => data.map(item => item.id)
                        },
                        {
                          name: "location_building",
                          value: get(data,'location_building') ? get(data,'location_building') : '',
                        },
                        {
                          name: 'file',
                          value: get(data,'files', []),
                          required: true,
                          type: 'array',
                          min: 1
                        },
                      ]}
                      onSubmit={({ values, setSubmitting}) => {
                        const descriptions = values.file.map((item) => item.name);
                        values = {...values, descriptions, map_lt: marker[0], map_ln: marker[1]};
                        dispatch(Actions.CREATE.request({
                          url: '/admin/oc/object/'+id,
                          id,
                          name: 'objectList',
                          values: serialize(values),
                          cb: {
                            success: () => {
                              toast.success("Obyekt o'zgartirildi");
                              history.push("/admin/construction-control/objects/list");
                            },
                            error: () => {
                              toast.error("Xatolik yuz berdi");
                            },
                            finally: () => {
                              setSubmitting(false);
                            },
                          }
                        }))
                      }}
                    >
                      {({ values, errors, touched, isSubmitting, setFieldValue, setFieldTouched }) => {

                        return <>
                          <div className="btn-group d-flex mb-4">
                            <button className="btn btn-primary text-white focus-none">UZ</button>
                            <button className="btn btn-outline-primary text-white-hover focus-none">RU</button>
                            <button className="btn btn-outline-primary text-white-hover focus-none">EN</button>
                          </div>

                          <div className="row mb-5">
                            <div className="col-12 col-xxl-4 col-lg-6">
                              <div className="mb-4">
                                <label
                                  className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                  htmlFor="name"
                                >Название объекта</label>
                                <Field
                                  className={`form-control font-size-16 focus-none ${createErrorClass(errors, touched, 'name_building')}`}
                                  name={"name_building"}
                                  type="text"
                                  id="name"
                                  placeholder="Печать..."
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label
                                  className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                  htmlFor="region"
                                >Область</label>
                                <Fields.Select2
                                  value={values.region_id}
                                  url={"/object-control/region-list"}
                                  isActive={!!get(data,'region_id','')}
                                  className={`focus-none form-select font-size-16 ${createErrorClass(errors, touched, 'region_id')}`}
                                  id="region"
                                  name="region_id"
                                  placeholder={"Выберите регион"}
                                  onChange={e => {
                                    // setFieldValue('district_id', '');
                                    setFieldValue("region_id", e.target.value)
                                  }}
                                  onBlur={() => {
                                    setFieldTouched('region_id')
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label
                                  className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                  htmlFor="city"
                                >Город/Район</label>
                                <Fields.Select2
                                  value={values.district_id}
                                  isActive={!!get(values, 'region_id','')}
                                  url={"/object-control/district-list/"+values.region_id}
                                  className={`form-select focus-none font-size-16 ${createErrorClass(errors, touched, 'district_id')}`}
                                  id="district"
                                  name="district_id"
                                  disabled={!values.region_id}
                                  placeholder={"Выберите район"}
                                  onChange={e => {
                                    setFieldValue("district_id", e.target.value)
                                  }}
                                  onBlur={() => {
                                    setFieldTouched('district_id', true);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="contract_amount">Стоимость строительно-монтажных работ</label>
                                <Fields.InputPhone
                                  className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "contract_amount")}`}
                                  name="contract_amount"
                                  type="text"
                                  id="contract_amount"
                                  placeholder="00.0 сўм"
                                  allowEmptyFormatting
                                  thousandSeparator={" "}
                                  onBlur={() => {
                                    setFieldTouched('contract_amount', true)
                                  }}
                                  value={values.contract_amount}
                                  onValueChange ={data => {
                                    setFieldValue('contract_amount', data.value)
                                  }}
                                  isNumericString
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="date">Дата регистрации</label>
                                <Field
                                  readOnly
                                  className={`form-control font-size-15 focus-none text-start ${createErrorClass(errors, touched, "registration_date")}`}
                                  type="text"
                                  id="date"
                                  name={"registration_date"}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="number">Номер регистрации</label>
                                <Fields.InputPhone
                                  className={`form-control font-size-15 focus-none ${createErrorClass(errors, touched, "registration_number")}`}
                                  name="registration_number"
                                  type="text"
                                  id="registration_number"
                                  allowEmptyFormatting
                                  onBlur={() => {
                                    setFieldTouched('registration_number', true)
                                  }}
                                  value={values.registration_number}
                                  onValueChange ={data => {
                                    setFieldValue('registration_number', data.value)
                                  }}
                                  isNumericString
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="protocol">Протокол градостроительного совета или соглас.ген.плана</label>
                                <Field
                                  className={`form-control font-size-16 focus-none ${createErrorClass(errors, touched, 'number_date_protocol')}`}
                                  type="text"
                                  name={"number_date_protocol"}
                                  id="protocol"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="decision">Оснавание для строительства</label>
                                <Field className={`form-control font-size-16 focus-none ${createErrorClass(errors, touched, 'governor_decision')}`} type="text" name={"governor_decision"} id="decision"/>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="conclusion">Заключение экспертизы</label>
                                <Field className={`form-control font-size-16 focus-none ${createErrorClass(errors, touched, 'expertise_report')}`} type="text" name={"expertise_report"} id="conclusion"
                                       placeholder="N-111 / 11.11.2021"/>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="parallel">Решение на паралельное проектирование</label>
                                <Field className={`form-control font-size-16 focus-none ${createErrorClass(errors, touched, 'parallel_designobjc')}`} type="text" name={"parallel_designobjc"} id="parallel"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="expire">Срок реализации</label>
                                <Field
                                  className={`form-select custom-select font-size-16 focus-none ${createErrorClass(errors, touched, 'expire')}`}
                                  type="text"
                                  name={"expire"}
                                  id="expire"
                                  as={"select"}
                                >
                                  <option value={""} disabled>Выберите</option>
                                  {
                                    [0,1,2,3,4].map((key) => {
                                      const year = (new Date()).getFullYear() + key;
                                      return (
                                        <option key={key} value={year}>{year}</option>
                                      )
                                    })
                                  }
                                </Field>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="type">Тип</label>
                                <Fields.AsyncSelect2
                                  value={values.type}
                                  name={"type"}
                                  id={"type"}
                                  url={"/admin/oc/object-type"}
                                  filterParams={(search) => {
                                    let extra = {};
                                    if(search){
                                      extra = {
                                        ...extra,
                                        name: search
                                      }
                                    }
                                    return {
                                      extra: {...extra}
                                    }
                                  }}
                                  placeholder={"Выберите тип"}
                                  optionLabel={"name_ru"}
                                  isMulti={false}
                                  hideSelectedOptions={false}
                                  onChange={data => setFieldValue('type', data)}
                                  onBlur={() => {
                                    setFieldTouched("type", true);
                                  }}
                                  isClearable
                                />
                                <ErrorMessage
                                  name={'type'}
                                  render={() => <span className={"text-danger font-size-10"}>Выберите тип</span>}
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="mb-4">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <label className="text-black-50 fw-medium text-secondary font-size-12 font-size-xxl-16"
                                         htmlFor="customer_id">Тех.надзор/Заказчик</label>
                                  <span className="cursor-pointer text-primary fw-medium font-size-12 font-size-xxl-16" onClick={() => setOpen("customer")}>Добавить новый</span>
                                </div>
                                <Fields.AsyncSelect2
                                  name={"customer_id"}
                                  id={"customer_id"}
                                  value={values.customer_id}
                                  defaultValue={values.customer_id}
                                  url={"/admin/user/find"}
                                  filterParams={(search) => {
                                    let extra = {
                                      type: 8,
                                      _type: 'query'
                                    };
                                    if(search){
                                      extra = {
                                        ...extra,
                                        text: search
                                      }
                                    }
                                    return {
                                      extra: {...extra}
                                    }
                                  }}
                                  placeholder={"Выберите заказчик"}
                                  optionLabel={option => option['text'] ? option['text'] : option['info']}
                                  onChange={data => setFieldValue('customer_id', data)}
                                  onBlur={() => {
                                    setFieldTouched("customer_id", true);
                                  }}
                                />
                                <ErrorMessage
                                  name={'customer_id'}
                                  render={() => <span className={"text-danger font-size-12"}>Выберите заказчик</span>}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mb-4">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <label className="text-black-50 fw-medium text-secondary font-size-12 font-size-xxl-16"
                                         htmlFor="contractor_id">Прораб/Подрядчик</label>
                                  <span className="cursor-pointer text-primary fw-medium font-size-12 font-size-xxl-16" onClick={() => setOpen("contractor")}>Добавить новый</span>
                                </div>
                                <Fields.AsyncSelect2
                                  url={"/admin/user/find"}
                                  name={"contractor_id"}
                                  id={"contractor_id"}
                                  value={values.contractor_id}
                                  defaultValue={values.contractor_id}
                                  onChange={data => setFieldValue('contractor_id', data)}
                                  onBlur={() => {
                                    setFieldTouched("contractor_id", true);
                                  }}
                                  filterParams={(search) => {
                                    let extra = {
                                      type: 7,
                                      _type: 'query'
                                    };
                                    if(search){
                                      extra = {
                                        ...extra,
                                        text: search
                                      }
                                    }
                                    return {
                                      extra
                                    }
                                  }}
                                  placeholder={"Выберите подрядчик"}
                                  optionLabel={option => option['text'] ? option['text'] : option['info']}
                                />
                                <ErrorMessage
                                  name={'contractor_id'}
                                  render={() => <span className={"text-danger font-size-12"}>Выберите подрядчик</span>}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mb-4">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <label className="text-black-50 fw-medium text-secondary font-size-12 font-size-xxl-16"
                                         htmlFor="planner_id">ГИП/Проектировщик</label>
                                  <span className="cursor-pointer text-primary fw-medium font-size-12 font-size-xxl-16" onClick={() => setOpen("planner")}>Добавить новый</span>
                                </div>
                                <Fields.AsyncSelect2
                                  url={"/admin/user/find"}
                                  name={"planner_id"}
                                  id={"planner_id"}
                                  defaultValue={values.planner_id}
                                  value={values.planner_id}
                                  onChange={data => setFieldValue('planner_id', data)}
                                  onBlur={() => {
                                    setFieldTouched("planner_id", true);
                                  }}
                                  filterParams={(search) => {
                                    let extra = {
                                      type: 6,
                                      _type: 'query'
                                    };
                                    if(search){
                                      extra = {
                                        ...extra,
                                        text: search
                                      }
                                    }
                                    return {
                                      extra
                                    }
                                  }}
                                  placeholder={"Выберите проектировщик"}
                                  optionLabel={option => option['text'] ? option['text'] : option['info']}
                                />
                                <ErrorMessage
                                  name={'planner_id'}
                                  render={() => <span className={"text-danger font-size-12"}>Выберите проектировщик</span>}
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="construction_status">Стадия строительства</label>
                                <Field as={"select"} className={`focus-none form-select  font-size-16 ${createErrorClass(errors, touched, 'construction_status')}`} name="construction_status" id="construction_status" >
                                  <option value="" disabled>Выберите этап строительства</option>
                                  <option value="1">Стадия проектирования</option>
                                  <option value="2">Строится</option>
                                </Field>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-4 col-md-6">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                       htmlFor="source_of_financing">Источник финансирования</label>
                                <Field as={"select"} className={`focus-none form-select  font-size-16 ${createErrorClass(errors, touched, 'source_of_financing')}`} name="source_of_financing" id="source_of_financing">
                                  <option value="" disabled>Выберите источник финансирования</option>
                                  <option value="1">Бюджет</option>
                                  <option value="2">Не бюджет</option>
                                </Field>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mb-4">
                                <label
                                  className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16"
                                  htmlFor="location_building"
                                >Местоположение объекта</label>
                                <Field
                                  as={"textarea"}
                                  className="form-control  font-size-16 focus-none resize-none"
                                  name={"location_building"}
                                  type="text"
                                  id="location_building"
                                  placeholder="Печать..."
                                  rows={8}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mb-4">
                                <label className="text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16">Файлы</label>
                                <Field
                                  component={DocumentUploader}
                                  inputName={"file"}
                                  name={"file"}
                                  values={values}
                                  displayName={"description"}
                                  onChange={files => setFieldValue("file", files)}
                                  isMulti
                                />
                                <ErrorMessage
                                  name={'file'}
                                  render={() => <span className={"text-danger font-size-10"}>Выберите файл</span>}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={"text-black-50 fw-medium text-secondary mb-2 font-size-12 font-size-xxl-16 mb-3"}>Выберите место</div>
                          <div className="info-map has-bg rounded-3 mb-4 border overflow-hidden" style={{ height: '40rem' }}>
                            <YandexMap
                              height='100%'
                              onClick={coords => setMarker(coords)}
                              placeMarkCord={marker}
                            />
                          </div>
                          <button className="btn btn-primary focus-none text-white" type="submit">
                            {
                              isSubmitting
                                ? <span className={"mr-2"}><i className="fal fa-spinner-third fa-spin"/></span>
                                : null
                            }
                            Сохранить
                          </button>
                        </>
                      }}
                    </MyForm>
                  </Spin>
                </>
              }}
            </LoadOne>
          </div>
        </div>
      </div>
    </>
  )
};

export default Create;