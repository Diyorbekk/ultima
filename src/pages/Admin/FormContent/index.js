import React from 'react';
import {ErrorMessage, Field} from "formik";
import MyEditor from 'components/SunEditor';
import FileUploader from 'components/FileUploader';

const langs = [
  {
    name: "O'zbek tili",
    value: 'uz'
  },
  {
    name: "Rus tilii",
    value: 'ru'
  },
  {
    name: "Ingliz tili",
    value: 'en'
  },
];

const FormContent = ({ values, setFieldValue, errors, touched, isSubmitting, isUpdate=false, history, t }) => {

  return <>
    <div className="added-tender-box-form-box form-group">
      <div className={'d-flex btn-group mb-4'}>
        {
          langs.map(item => (
            <div
              key={item.value}
              className={`col btn text-center ${item.value === values['lang'] ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFieldValue('lang', item.value)}
            >{item.name}</div>
          ))
        }
      </div>
    </div>

    <div className="form-group">
      <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'} htmlFor="title">{t('cabinetNewsListTexts.text1')}</label>
      <Field
        className={`form-control w-100 ${errors[`title_${values.lang}`] && touched[`title_${values.lang}`] ? 'is-invalid' : (touched[`title_${values.lang}`] && !errors[`title_${values.lang}`]) ? 'is-valid' : ''}`}
        name={`title_${values.lang}`}
      />
    </div>
    <div className="form-group">
      <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'} htmlFor="description">{t('cabinetNewsListTexts.text20')}</label>
      <Field
        className={`description-box resize-none form-control w-100 ${errors[`description_${values.lang}`] && touched[`description_${values.lang}`] ? 'is-invalid' : (touched[`description_${values.lang}`] && !errors[`description_${values.lang}`]) ? 'is-valid' : ''}`}
        as={'textarea'}
        name={`description_${values.lang}`}
      />
    </div>

    <div className="form-group">
      <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'} htmlFor="suneditor">{t('cabinetNewsListTexts.text19')}</label>

      {
        values.lang === 'uz'
          ? <Field
            name={`content_uz`}
            component={MyEditor}
            className={'form-control'}
          />
          : null
      }
      {
        values.lang === 'ru'
          ? <Field
            name={`content_ru`}
            component={MyEditor}
            className={'form-control'}
          />
          : null
      }
      {
        values.lang === 'en'
          ? <Field
            name={`content_en`}
            component={MyEditor}
            className={'form-control'}
          />
          : null
      }
      <ErrorMessage
        name={`content_${values.lang}`}
        render={err => <span className={'text-danger font-size-12'}>{err}</span>}
      />
    </div>

    <div className={'form-group'}>
      <label htmlFor="photo">{t('cabinetNewsListTexts.text3')}</label>
      <Field
        id={'photo'}
        name={'photo'}
        component={FileUploader}
      />
      <ErrorMessage
        name={'photo'}
        render={err => <span className={'text-danger font-size-12'}>{err}</span>}
      />
    </div>

    <div
      className="d-flex added-tender-box-form-box align-items-center justify-content-end my-4 col-12 flex-wrap">
      <button
        className={'btn white-button focus-none mr-3'}
        onClick={() => history.goBack()}
      >Bekor qilish</button>
      <button
        type={'submit'}
        className="btn btn-primary px-md-4 my-lg-2 col-auto"
        disabled={isSubmitting}
      >
        {
          isSubmitting
            ? <span className="spinner-border spinner-border-sm" role="status"/>
            : isUpdate ? t('cabinetNewsListTexts.text4') : t('cabinetNewsListTexts.text15')
        }
      </button>
    </div>
  </>
};

export default FormContent;