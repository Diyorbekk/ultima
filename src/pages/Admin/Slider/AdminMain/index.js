import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import Actions from 'schema/actions';
import MyForm from 'components/MyForm';
import Spinner from 'components/AntSpin';
import FormContent from '../FormContent';
import {toast} from 'react-toastify';

const AdminMain = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    function join(t, a, s) {
        function format(m) {
            let f = new Intl.DateTimeFormat('en', m);
            return f.format(t);
        }

        return a.map(format).join(s);
    }

    let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
    let s = join(new Date, a, '-');
    return (
        <>
            <MyForm
                className="pt-4"
                t={t}
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
                        required: true,
                    },
                    {
                        name: 'title_en',
                        value: '',
                        required: true,
                    },
                    {
                        name: 'description_uz',
                        value: '',
                        required: true,
                    },
                    {
                        name: 'description_ru',
                        value: '',
                        required: true,
                    },
                    {
                        name: 'description_en',
                        value: '',
                        required: true,
                    },
                    {
                        name: 'time',
                        value: s,
                    },
                    {
                        name: 'photo',
                        value: null,
                        required: true,
                    },
                ]}
                onSubmit={({values, setSubmitting, resetForm}) => {
                    values = {
                        "title_uz": values.title_uz,
                        "title_ru": values.title_ru,
                        "title_en": values.title_en,
                        "description_uz": values.description_uz,
                        "description_ru": values.description_ru,
                        "description_en": values.description_en,
                        "time": values.time,
                        "photo": values.photo,

                    };
                    dispatch(Actions.CREATE.request({
                        url: '/posts.json',
                        name: 'NewSlider',
                        values,
                        cb: {
                            success: () => {
                                toast.success("Qo'shildi");
                                resetForm();
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
                {({values, setFieldValue, resetForm, errors, touched, isSubmitting}) => (
                    <Spinner isSpinning={isSubmitting}>
                        <FormContent {...{
                            values,
                            setFieldValue,
                            resetForm,
                            errors,
                            touched,
                            isSubmitting,
                            history,
                            t
                        }}/>
                    </Spinner>
                )}
            </MyForm>

        </>
    )
}

export default AdminMain