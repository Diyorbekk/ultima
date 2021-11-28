import React from 'react';
import {useTranslation} from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import MyForm from 'components/MyForm';
import Actions from 'redux/actions';
import Spinner from 'components/AntSpin';
import FormContent from '../FormContent';
import { toast } from 'react-toastify';
import {Field} from "formik";

const createErrorClass = (errors, touched, name) => `${errors[name] && touched[name] ? 'is-invalid' : (touched[name] && !errors[name]) ? 'is-valid' : ''}`;

const Create = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();


    return (
        <>
            <div className="added-tender-box bg-F1F6FB pt-5">
                <div className="container pb-5 px-4">
                    <button onClick={() => history.goBack()} className={'btn btn-primary btn-sm font-size-18 mb-3'}>
                      <i className={'fa fa-angle-left font-weight-light'}/> Orqaga
                    </button>
                    <div className="mb-4 px-md-0">
                        <p className="font-size-24 font-weight-500">{t('cabinetTexts.moder-tenders-text4')}</p>
                    </div>
                    <div className="added-tender-box-body bg-white shadow rounded px-lg-5 py-lg-3 py-3 px-3">
                        <MyForm
                          className="pt-4"
                          fields={[
                            {
                              name: 'comment',
                              value: ''
                            },
                          ]}
                          onSubmit={({ values, setSubmitting, resetForm})=>{
                              values = {
                                  "comment": values.comment,
                              };
                            dispatch(Actions.CREATE.request({
                              url: '/posts',
                                name: 'comment',
                              values,
                              cb: {
                                success: () => {
                                  resetForm();
                                  history.push('/cabinet/news');
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
                            {({errors, touched, isSubmitting}) => {
                                return <>
                                    <Field
                                        as="textarea"
                                        className={`form-control form-control-lg font-size-16 focus-none resize-none mb-4 ${createErrorClass(errors, touched, 'category_id')}`}
                                        type="text"
                                        name="comment"
                                        placeholder="Печать"
                                        cols="50"
                                        rows="10"
                                    />
                                    <button
                                        className="btn btn-primary focus-none text-white"
                                        type={"submit"}
                                        disabled={isSubmitting}
                                    >
                                        {
                                            isSubmitting
                                                ? <span className={"mr-2"}><i
                                                    className="fal fa-spinner-third fa-spin"/></span>
                                                : null
                                        }
                                        Отправить сообщение
                                    </button>
                                </>
                            }}
                            {/*{({ values, setFieldValue, errors, touched, isSubmitting }) => (
                              <Spinner isSpinning={isSubmitting}>
                                <FormContent {...{values, setFieldValue, errors, touched, isSubmitting, history, t}}/>
                              </Spinner>
                            )}*/}
                        </MyForm>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;