import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import Actions from 'schema/actions';
import MyForm from 'components/MyForm';
import Spinner from 'components/AntSpin';
import Spin from 'components/AntSpin';
import FormContent from '../FormContent';
import get from 'lodash.get';
import LoadOne from "schema/Container/LoadOne";
import {toast} from "react-toastify";

const Create = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();
    function join(t, a, s) {
        function format(m) {
            let f = new Intl.DateTimeFormat('en', m);
            return f.format(t);
        }

        return a.map(format).join(s);
    }

    let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
    let s = join(new Date(), a, '-');

    return (
        <>
            <LoadOne
                url={"/category/" + id + ".json"}
                name={"UpdateCategory"}
                asData
            >
                {({isFetched, data = {}}) => {
                    return <>
                        <Spin
                            isSpinning={!isFetched}
                        >
                            {
                                get(data, 'category_data', '').length
                                    ? get(data, 'category_data', '').map((key, index) => (
                                        <MyForm
                                            className="pt-4"
                                            key={index}
                                            fields={[
                                                {
                                                    name: 'lang',
                                                    value: 'uz'
                                                },
                                                {
                                                    name: 'title_uz',
                                                    value: get(key, 'title_uz', '') ?? '',
                                                    required: true,
                                                },
                                                {
                                                    name: 'title_ru',
                                                    value: get(key, 'title_ru', '') ?? '',
                                                },
                                                {
                                                    name: 'title_en',
                                                    value: get(key, 'title_en', '') ?? '',
                                                },
                                                {
                                                    name: 'description_uz',
                                                    value: get(key, 'description_uz', '') ?? '',
                                                    required: true,
                                                },
                                                {
                                                    name: 'description_ru',
                                                    value: get(key, 'description_ru', '') ?? '',
                                                },
                                                {
                                                    name: 'description_en',
                                                    value: get(key, 'description_en', '') ?? '',
                                                },
                                                {
                                                    name: 'category_id',
                                                    value: get(data, 'category_id', '') ?? '',
                                                    required: true,
                                                },
                                                {
                                                    name: 'time',
                                                    value: s,
                                                },
                                                {
                                                    name: 'photo',
                                                    value: get(key, 'photo', '') ?? '',
                                                    type: 'array',
                                                    required: true
                                                },
                                                {
                                                    name: '_method',
                                                    value: 'put'
                                                }
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

                                                dispatch(Actions.UPDATE.request({
                                                    url: '/category/' + id + ".json",
                                                    values,
                                                    cb: {
                                                        success: () => {
                                                            toast.success("O'zgartirildi");
                                                            resetForm();
                                                            history.push("/admin/category");
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
                                            {({values, setFieldValue, errors, touched, isSubmitting}) => (
                                                <Spinner isSpinning={isSubmitting || !isFetched}>
                                                    <FormContent {...{
                                                        values,
                                                        setFieldValue,
                                                        errors,
                                                        touched,
                                                        isSubmitting,
                                                        isUpdate: true,
                                                        history,
                                                        t
                                                    }}/>
                                                </Spinner>
                                            )}
                                        </MyForm>
                                    ))
                                : null
                                }
                        </Spin>
                    </>
                }}

            </LoadOne>
        </>
    );
};

export default Create;