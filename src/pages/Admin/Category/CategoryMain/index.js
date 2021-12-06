import React from "react";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import MyForm from "../../../../components/MyForm";
import Actions from "../../../../schema/actions";
import {toast} from "react-toastify";
import Spinner from "../../../../components/AntSpin";
import FormContent from "../FormContent";

const CategoryMain = () => {
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
                        name: 'category_id',
                        value: '',
                        required: true,
                    },
                    {
                        name: 'photo',
                        value: null,
                        type: 'array',
                        required: true
                    },
                ]}
                onSubmit={({values, setSubmitting, resetForm}) => {
                    values = {
                        "category_id": values.category_id,
                        "time": values.time,
                        "category_data": [{
                            "title_uz": values.title_uz,
                            "title_ru": values.title_ru,
                            "title_en": values.title_en,
                            "photo": values.photo,
                            "description_uz": values.description_uz,
                            "description_ru": values.description_ru,
                            "description_en": values.description_en,
                        }],
                    };
                    dispatch(Actions.CREATE.request({
                        url: '/category.json',
                        name: 'NewCategory',
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

export default CategoryMain