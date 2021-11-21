import React from "react";
import MyForm from "../../../../components/MyForm";
import {useTranslation} from "react-i18next";
import {Field} from "formik";
import DocumentUploader from "../../../../components/DocumentUploader";
import {Link} from "react-router-dom";

const ObjectMonitoringCreate = ({id}) => {
    const {t} = useTranslation();
    return (
        <>
            <MyForm
                className={""}
                t={t}
                fields={[
                    {
                        name: 'note',
                        value: '',
                        required: true
                    },
                    {
                        name: 'file',
                        value: [],
                        required: true
                    }
                ]}
            >
                {({values, setFieldValue}) => {
                    return <>
                        <div className="contents">
                            <div className="content-form">
                                <div className="mb-3">
                                    <label htmlFor="first" className="form-label content-form_label">Примечание <span
                                        className="text-danger">*</span></label>
                                    <Field
                                        as="textarea"
                                        className="form-control form-control-lg font-size-16 focus-none w-md-90 resize-none"
                                        type="text"
                                        id="first"
                                        name={"note"}
                                        rows="8"
                                        placeholder="Печать"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="second" className="form-label content-form_label">Фотографии <span
                                        className="text-danger">*</span></label>
                                    <div className="w-md-90">
                                        <Field
                                            id="second"
                                            component={DocumentUploader}
                                            inputName={"file"}
                                            name={"file"}
                                            values={values}
                                            onChange={files => setFieldValue("file", files)}
                                        />
                                    </div>
                                </div>

                                <button className="btn content-form_submit" type="submit">Сохранить</button>
                            </div>
                        </div>
                    </>
                }}
            </MyForm>

        </>
    )
}

export default ObjectMonitoringCreate