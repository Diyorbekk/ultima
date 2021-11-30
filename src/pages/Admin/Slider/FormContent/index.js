import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field} from "formik";
import FileUploader from 'components/FileUploader';
import MyEditor from 'components/SunEditor';
import storageFirebase from 'firebaseGet/storageFirebase'

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

const FormContent = ({values, setFieldValue, errors, touched, isSubmitting, isUpdate = false, t}) => {
    const [progress, setProgress] = useState(0)
    const [errorImg, setErrorImg] = useState(null)
    const [img, setImg] = useState(false)


    const imageUpload = () => {

        let nameFile = values.photo.name

        function encode(name) {
            return window.btoa(name);
        }

        let inputFileName = values.photo.name,
            encoded = encode(inputFileName)

        let lowerCaseEncoded = encoded.toLowerCase();

        let nameList = lowerCaseEncoded.slice(5);

        let ext = nameFile.substr(nameFile.lastIndexOf('.') + 0);


        let filenames = nameList + ext

        const uploadTask = storageFirebase.ref(`images/${filenames}`).put(values.photo);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
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
            () => {
                storageFirebase
                    .ref("images")
                    .child(filenames)
                    .getDownloadURL()
                    .then(url => {
                        setFieldValue("photo", url)
                        setImg(true)
                    });
            }
        );
    }

    useEffect(() => {
        if (isSubmitting) {
            setProgress(0)
            setImg(false)
        }
        if (isUpdate || values.photo === null) {
            if (typeof values.photo === "string" || typeof values.photo === "undefined") {
                setImg(true)
            } else {
                setImg(false)
            }
        }

    }, [isSubmitting,values.photo])

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
            <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                   htmlFor="title">{t('create.title')}</label>
            <Field
                className={`form-control w-100 ${errors[`title_${values.lang}`] && touched[`title_${values.lang}`] ? 'is-invalid' : (touched[`title_${values.lang}`] && !errors[`title_${values.lang}`]) ? 'is-valid' : ''}`}
                name={`title_${values.lang}`}
            />
        </div>
        <div className="form-group">
            <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'} htmlFor="suneditor">{t('create.description')}</label>

            {
                values.lang === 'uz'
                    ? <Field
                        name={`description_uz`}
                        component={MyEditor}
                        className={'form-control'}
                    />
                    : null
            }
            {
                values.lang === 'ru'
                    ? <Field
                        name={`description_ru`}
                        component={MyEditor}
                        className={'form-control'}
                    />
                    : null
            }
            {
                values.lang === 'en'
                    ? <Field
                        name={`description_en`}
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
            <label
                className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                htmlFor="photo">{t('create.images')}</label>
            <Field
                id={'photo'}
                name={'photo'}
                component={FileUploader}
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
                        disabled={!values.photo}
                        onClick={imageUpload}
                    >
                        Image upload
                    </button>
                    : !img
                    ? <button
                        className="btn btn-primary focus-none"
                        type={"button"}
                        disabled={!values.photo}
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



            <div className="row mt-4">
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
                            <p className="text-success">UZ {t("success.description")} <b>{values.description_uz}</b></p>
                    }
                    {
                        values.description_ru === ''
                            ? <p className="text-danger">RU {t("errors.description")}</p>
                            :
                            <p className="text-success">RU {t("success.description")} <b>{values.description_ru}</b></p>
                    }
                    {
                        values.description_en === ''
                            ? <p className="text-danger">EN {t("errors.description")}</p>
                            :
                            <p className="text-success">EN {t("success.description")} <b>{values.description_en}</b></p>
                    }
                </div>

                <div className="col-12 my-3 text-center">
                    {
                        progress === 100
                            ? <img className="w-100" src={values.photo} alt={values.photo}/>
                            : null
                    }
                </div>
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
};

export default FormContent;