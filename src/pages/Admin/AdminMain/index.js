import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import Actions from 'redux/actions';
import MyForm from 'components/MyForm';
import Spinner from 'components/AntSpin';
import FormContent from '../FormContent';
import { toast } from 'react-toastify';

const AdminMain = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <MyForm
                className="pt-4"
                sendAsFormData
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

        </>
    )
}

export default AdminMain