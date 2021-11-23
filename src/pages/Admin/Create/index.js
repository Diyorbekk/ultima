import React from 'react';
import {useTranslation} from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Actions from 'redux/actions';
import MyForm from 'components/MyForm';
import Spinner from 'components/AntSpin';
import FormContent from '../FormContent';
import { toast } from 'react-toastify';

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
                              name: 'lang',
                              value: 'uz'
                            },
                            {
                              name: 'title_uz',
                              value: '',
                              required: true,
                            },
                            {
                              name: 'title_ru',
                              value: '',
                            },
                            {
                              name: 'title_en',
                              value: '',
                            },
                            {
                              name: 'description_uz',
                              value: '',
                              required: true,
                            },
                            {
                              name: 'description_ru',
                              value: '',
                            },
                            {
                              name: 'description_en',
                              value: '',
                            },
                            {
                              name: 'content_uz',
                              value: '',
                              required: true,
                            },
                            {
                              name: 'content_ru',
                              value: '',
                            },
                            {
                              name: 'content_en',
                              value: '',
                            },
                            {
                              name: 'photo',
                              value: null,
                              required: true,
                            },
                          ]}
                          onSubmit={({ values, setSubmitting, resetForm})=>{

                            dispatch(Actions.CREATE_NEWS.request({
                              url: '/posts',
                              params: {},
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
                            {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                              <Spinner isSpinning={isSubmitting}>
                                <FormContent {...{values, setFieldValue, errors, touched, isSubmitting, history, t}}/>
                              </Spinner>
                            )}
                        </MyForm>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;