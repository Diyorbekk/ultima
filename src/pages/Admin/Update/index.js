import React, { useEffect } from 'react';
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import Actions from 'redux/actions';
import MyForm from 'components/MyForm';
import Spinner from 'components/AntSpin';
import FormContent from '../FormContent';
import get from 'lodash.get';
import { serialize } from 'object-to-formdata';

const Create = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { singleNews: {isFetched, data }} = useSelector(state => state);


    useEffect(() => {
        return () => {}
    }, []);

    useEffect(() => {
      if(id){
        dispatch(Actions.NEWS_ITEM.request({
          url: '/posts/' + id,
          params: {},
        }))
      }
    }, [dispatch, id]);


    return (
      <>
          <div className="added-tender-box bg-F1F6FB pt-5">
              <div className="container pb-5 px-4">
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
                            value: get(data, 'title_uz','') ?? '',
                            required: true,
                          },
                          {
                            name: 'title_ru',
                            value: get(data, 'title_ru','') ?? '',
                          },
                          {
                            name: 'title_en',
                            value: get(data, 'title_en','') ?? '',
                          },
                          {
                            name: 'description_uz',
                            value: get(data, 'description_uz','') ?? '',
                            required: true,
                          },
                          {
                            name: 'description_ru',
                            value: get(data, 'description_ru','') ?? '',
                          },
                          {
                            name: 'description_en',
                            value: get(data, 'description_en','') ?? '',
                          },
                          {
                            name: 'content_uz',
                            value: get(data, 'content_uz','') ?? '',
                            required: true,
                          },
                          {
                            name: 'content_ru',
                            value:  get(data, 'content_ru','') ?? '',
                          },
                          {
                            name: 'content_en',
                            value:  get(data, 'content_en','') ?? '',
                          },
                          {
                              name: 'photo',
                              value: get(data, 'photo'),
                              required: true,
                          },
                          {
                            name: '_method',
                            value: 'put'
                          }
                        ]}
                        onSubmit={({ values, setSubmitting, resetForm})=>{
                          values = {...data, ...values};

                          dispatch(Actions.UPDATE_NEWS.request({
                              url: '/posts/'+id,
                              params: {},
                              values: serialize(values,{allowEmptyArrays: true}),
                              cb: {
                                  success: () => {
                                      resetForm();
                                      history.push('/cabinet/news');
                                  },
                                  error: () => {},
                                  finally: () => {
                                    setSubmitting(false);
                                  },
                              }
                            }))
                        }}
                      >
                        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                          <Spinner isSpinning={isSubmitting || !isFetched}>
                            <FormContent {...{values, setFieldValue, errors, touched, isSubmitting, isUpdate: true, history, t}}/>
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