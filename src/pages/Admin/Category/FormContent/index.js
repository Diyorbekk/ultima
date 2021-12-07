import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field} from "formik";
import FilePondUploader from 'components/FilePondUploader';
import MyEditor from 'components/SunEditor';
import storageFirebase from 'firebaseGet/storageFirebase'
import get from "lodash.get";

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

const createErrorClass = (errors, touched, name) => `${errors[name] && touched[name] ? 'is-invalid' : (touched[name] && !errors[name]) ? 'is-valid' : ''}`;

const FormContent = ({values, setFieldValue, errors, touched, history, isSubmitting, isUpdate = false, t}) => {
        const [progress, setProgress] = useState(0)
        const [errorImg, setErrorImg] = useState(null)
        const [img, setImg] = useState(false)


        const imageUpload = (e) => {
            e.preventDefault()
            const promises = []
            const imagesUrl = []
            values.photo.forEach(file => {
                let nameFile = file.name

                function encode(name) {
                    return window.btoa(name);
                }

                let inputFileName = file.name,
                    encoded = encode(inputFileName)

                let lowerCaseEncoded = encoded.toLowerCase();

                let nameList = lowerCaseEncoded.slice(5);

                let ext = nameFile.substr(nameFile.lastIndexOf('.') + 0);


                let filenames = nameList + ext

                let uploadTask = storageFirebase.ref(`category/${filenames}`).put(file);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    async (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress)
                    },
                    async (error) => {
                        // eslint-disable-next-line default-case
                        switch (error.code) {
                            case 'storage/unauthorized':
                                setErrorImg(error.code)
                                break;
                            case 'storage/canceled':
                                setErrorImg(error.code)
                                break;
                            case 'storage/unknown':
                                setErrorImg(error.code)
                                break;
                        }
                    },
                    async () => {
                        storageFirebase
                            .ref("category")
                            .child(filenames)
                            .getDownloadURL()
                            .then(url => {
                                imagesUrl.push(url)
                            });
                    }
                )
            })
            Promise.all(promises)
                .then(() => {
                    setTimeout(() => {
                        setFieldValue("photo", imagesUrl)
                        setImg(true)
                        setProgress(0)
                    }, 5000)

                })
                .catch(err => setErrorImg(err.code));
        }

        useEffect(() => {
            if (isSubmitting) {
                setProgress(0)
                setImg(false)
            }
            if (isUpdate || values.photo === null) {
                if (values.photo === null || values.photo.length === 0) {
                    setImg(false)
                } else {
                    setImg(true)
                }
            }

        }, [isSubmitting, values.photo])

        return <>
            <button type={"button"} onClick={() => history.goBack()} className='btn btn-primary btn-sm font-size-18 mb-3'>
                <i className={'fa fa-angle-left font-weight-light mt-1'}/> Orqaga
            </button>

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
                <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                       htmlFor={`title_${values.lang}`}>{t('create.title')}</label>
                <Field
                    className={`form-control w-100 ${errors[`title_${values.lang}`] && touched[`title_${values.lang}`] ? 'is-invalid' : (touched[`title_${values.lang}`] && !errors[`title_${values.lang}`]) ? 'is-valid' : ''}`}
                    id={`title_${values.lang}`}
                    name={`title_${values.lang}`}
                />
                <ErrorMessage
                    name={`title_${values.lang}`}
                    render={err => <span className={'text-danger font-size-12'}>{err}</span>}
                />
            </div>
            <div className="form-group">
                <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                       htmlFor={`category_id`}>{t('create.category')}</label>

                <Field
                    as={"select"}
                    id={`category_id`}
                    className={`form-control focus-none ${createErrorClass(errors, touched, `category_id`)}`}
                    onChange={(event) => {
                        values.category_id === ''
                            ? setFieldValue("category_id", event.nativeEvent.target.selectedIndex)
                            : setFieldValue("category_id", event.nativeEvent.target.selectedIndex)
                    }}
                    value={values.category_id}
                    name={`category_id`}
                >
                    <option value={''} disabled hidden selected>
                        {t("category.Choose")}
                    </option>
                    <option value={1}>
                        {t("category.Electric")}
                    </option>
                    <option value={2}>
                        {t("category.Industry")}
                    </option>
                    <option value={3}>
                        {t("category.Construction")}
                    </option>
                    <option value={4}>
                        {t("category.Furniture")}
                    </option>
                    <option value={5}>
                        {t("category.Automotive")}
                    </option>
                    <option value={6}>
                        {t("category.Custom")}
                    </option>
                </Field>


                <ErrorMessage
                    name={`category_id`}
                    render={err => <span className={'text-danger font-size-12'}>{err}</span>}
                />
            </div>

            <div className="form-group">
                <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                       htmlFor={`suneditor_${values.lang}`}>{t('create.description')}</label>

                {
                    values.lang === 'uz'
                        ? <Field
                            name={`description_uz`}
                            id="suneditor_uz"
                            component={MyEditor}
                            className={'form-control'}
                        />
                        : null
                }
                {
                    values.lang === 'ru'
                        ? <Field
                            name={`description_ru`}
                            id="suneditor_ru"
                            component={MyEditor}
                            className={'form-control'}
                        />
                        : null
                }
                {
                    values.lang === 'en'
                        ? <Field
                            name={`description_en`}
                            id="suneditor_en"
                            component={MyEditor}
                            className={'form-control'}
                        />
                        : null
                }
                <ErrorMessage
                    name={`description_${values.lang}`}
                    render={err => <span className={'text-danger font-size-12'}>{err}</span>}
                />
            </div>

            <div className={'form-group'}>
                <label
                    className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                    htmlFor="photo">{t('create.images')}</label>
                <Field
                    id={'photo'}
                    name={'photo'}
                    component={FilePondUploader}
                />
                <ErrorMessage
                    name={'photo'}
                    render={err => <span className={'text-danger d-block mb-2 font-size-12'}>{err}</span>}
                />

                {
                    errorImg === null
                        ? null
                        : <p className="text-danger">{errorImg}</p>
                }

                {
                    !isUpdate
                        ? <button
                            className="btn btn-primary focus-none"
                            type={"button"}
                            disabled={values.photo === null || values.photo.length === 0 || img}
                            onClick={imageUpload}
                        >
                            Image upload
                        </button>
                        : !img
                        ? <button
                            className="btn btn-primary focus-none"
                            type={"button"}
                            disabled={values.photo === null || values.photo.length === 0 || img}
                            onClick={imageUpload}
                        >

                            Image upload
                        </button>
                        : null
                }

                {
                    !isUpdate
                        ? <div className="progress mt-4">
                            <div className="progress-bar"
                                 aria-valuenow="0"
                                 aria-valuemin="0"
                                 aria-valuemax="100"
                                 style={{width: progress + "%"}}
                            >{progress} %
                            </div>

                        </div>
                        : !img
                        ? <div className="progress mt-4">
                            <div className="progress-bar"
                                 aria-valuenow="0"
                                 aria-valuemin="0"
                                 aria-valuemax="100"
                                 style={{width: progress + "%"}}
                            >{progress} %
                            </div>

                        </div>
                        : null
                }
            </div>

            <div className="row mt-4">
                <div className="col-12 my-3 text-center">
                    {
                        img
                            ? <><h3>Все изображения загружены успешно ✔</h3></>
                            : null
                    }
                </div>

                <div className="col-md-6">
                    {
                        values.title_uz === ''
                            ? <p className="text-danger">UZ {t("errors.title")}</p>
                            : <p className="text-success">UZ {t("success.title")} <b>{values.title_uz}</b></p>
                    }
                    {
                        values.title_ru === ''
                            ? <p className="text-danger">RU {t("errors.title")}</p>
                            : <p className="text-success">RU {t("success.title")} <b>{values.title_ru}</b></p>
                    }
                    {
                        values.title_en === ''
                            ? <p className="text-danger">EN {t("errors.title")}</p>
                            : <p className="text-success">EN {t("success.title")} <b>{values.title_en}</b></p>
                    }
                </div>

                <div className="col-md-6">
                    {
                        values.description_uz === ''
                            ? <p className="text-danger">UZ {t("errors.description")}</p>
                            :
                            <p className="text-success">UZ {t("success.description")} <b>{values.description_uz}</b>
                            </p>
                    }
                    {
                        values.description_ru === ''
                            ? <p className="text-danger">RU {t("errors.description")}</p>
                            :
                            <p className="text-success">RU {t("success.description")} <b>{values.description_ru}</b>
                            </p>
                    }
                    {
                        values.description_en === ''
                            ? <p className="text-danger">EN {t("errors.description")}</p>
                            :
                            <p className="text-success">EN {t("success.description")} <b>{values.description_en}</b>
                            </p>
                    }
                </div>

                <div className="col-md-6">
                    {
                        values.category_id === ""
                            ? <p className="text-danger">{t("errors.category")}</p>
                            : <p className="text-success">{t("success.category")} <b>{
                                values.category_id === 1
                                    ? <>{t("category.Electric")}</>
                                    : values.category_id === 2
                                    ? <>{t("category.Industry")}</>
                                    : values.category_id === 3
                                        ? <>{t("category.Construction")}</>
                                        : values.category_id === 4
                                            ? <>{t("category.Furniture")}</>
                                            : values.category_id === 5
                                                ? <>{t("category.Automotive")}</>
                                                : values.category_id === 6
                                                    ? <>{t("category.Custom")}</>
                                                    : null
                            }</b></p>
                    }
                </div>
            </div>


            <div
                className="d-flex added-tender-box-form-box align-items-center justify-content-end my-4 col-12 flex-wrap">
                <button
                    type={'submit'}
                    className="btn btn-primary px-md-4 my-lg-2 col-auto"
                    disabled={isSubmitting || !img}
                >
                    {
                        isSubmitting
                            ? <span className="spinner-border spinner-border-sm" role="status"/>
                            : isUpdate ? t('create.change') : t('create.save')
                    }
                </button>
            </div>
        </>
    }
;

export default FormContent;