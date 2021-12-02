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

const Create = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();

    return (
        <>
            <LoadOne
                url={"/about/" + id + ".json"}
                name={"UpdateSlider"}
                asData
            >
                {({isFetched, data = {}}) => {
                    return <>
                        <Spin
                            isSpinning={!isFetched}
                        >
                            <MyForm
                                className="pt-4"
                                fields={[
                                    {
                                        name: 'lang',
                                        value: 'uz'
                                    },
                                    {
                                        name: 'title_uz',
                                        value: get(data, 'title_uz', '') ?? '',
                                        required: true,
                                    },
                                    {
                                        name: 'title_ru',
                                        value: get(data, 'title_ru', '') ?? '',
                                    },
                                    {
                                        name: 'title_en',
                                        value: get(data, 'title_en', '') ?? '',
                                    },
                                    {
                                        name: 'description_uz',
                                        value: get(data, 'description_uz', '') ?? '',
                                        required: true,
                                    },
                                    {
                                        name: 'description_ru',
                                        value: get(data, 'description_ru', '') ?? '',
                                    },
                                    {
                                        name: 'description_en',
                                        value: get(data, 'description_en', '') ?? '',
                                    },
                                    {
                                        name: 'location_uz',
                                        value: get(data, 'location_uz', '') ?? '',
                                        required: true,
                                    },
                                    {
                                        name: 'location_ru',
                                        value: get(data, 'location_ru', '') ?? '',
                                    },
                                    {
                                        name: 'location_en',
                                        value: get(data, 'location_en', '') ?? '',
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
                                onSubmit={({values, setSubmitting, resetForm}) => {
                                    values = {
                                        "title_uz": values.title_uz,
                                        "title_ru": values.title_ru,
                                        "title_en": values.title_en,
                                        "description_uz": values.description_uz,
                                        "description_ru": values.description_ru,
                                        "description_en": values.description_en,
                                        "location_uz": values.location_uz,
                                        "location_ru": values.location_ru,
                                        "location_en": values.location_en,
                                        "time": values.time,
                                        "photo": values.photo,

                                    };

                                    dispatch(Actions.UPDATE.request({
                                        url: '/about/' + id + ".json",
                                        values,
                                        cb: {
                                            success: () => {
                                                resetForm();
                                            },
                                            error: () => {
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
                        </Spin>
                    </>
                }}

            </LoadOne>
        </>
    );
};

export default Create;