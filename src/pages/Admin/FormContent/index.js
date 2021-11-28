import React, {useState} from 'react';
import {ErrorMessage, Field} from "formik";
import MyEditor from 'components/SunEditor';
import FileUploader from 'components/FileUploader';
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

const FormContent = ({values, setFieldValue, resetForm, errors, touched, isSubmitting, isUpdate = false, history, t}) => {
    const [progress, setProgress] = useState(0)
    const [errorImg, setErrorImg] = useState(null)
    const [url, setUrl] = useState(null)


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
                        setUrl(url)
                        setFieldValue("photo", url)
                    });
            }
        );
    }

    const clearForm = () => {
        resetForm()
    }

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
            <label className={'d-block font-size-14 color-28366D font-weight-500 text-left'}
                   htmlFor="description">{t('create.description')}</label>
            <Field
                className={`description-box resize-none form-control w-100 ${errors[`description_${values.lang}`] && touched[`description_${values.lang}`] ? 'is-invalid' : (touched[`description_${values.lang}`] && !errors[`description_${values.lang}`]) ? 'is-valid' : ''}`}
                as={'textarea'}
                name={`description_${values.lang}`}
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

            <button
                className="btn btn-primary focus-none"
                type={"button"}
                disabled={!values.photo}
                onClick={imageUpload}
            >
                Image upload
            </button>

            <div className="progress mt-4">
                <div className="progress-bar"
                     aria-valuenow="0"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={{width: progress + "%"}}
                >{progress} %
                </div>

            </div>
        </div>

        <div
            className="d-flex added-tender-box-form-box align-items-center justify-content-end my-4 col-12 flex-wrap">
            {
                values + `title_${values.lang}` === ""
                    ? <button
                        className='btn btn-warning text-white focus-none mr-3'
                        onClick={clearForm}
                    >
                        {t('create.clear')}
                    </button>
                    : null
            }

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