import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {LoadOne} from "../../../../schema/Container";
import Spin from "../../../../components/AntSpin";
import get from "lodash.get";
import MyForm from "../../../../components/MyForm";
import Actions from "../../../../schema/actions";
import {serialize} from "object-to-formdata";
import {toast} from "react-toastify";
import {Field,} from "formik";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import Fancybox from "../../../../components/Fancybox";


const RemarkView = ({url}) => {
    const [remark, setRemark] = useState(localStorage.getItem("by"))
    const {t} = useTranslation();
    const [isLoading, setLoading] = useState(false);





    return (
        <>
            <div className="bg-white rounded-3 shadow-sm p-4 mb-3 w-100">
                <LoadOne
                    url={`/object-control/remark/${remark}`}
                    name={"objectView"}
                    asData
                >
                    {({isFetched, data = {}}) => {

                        return <>
                            <Spin isSpinning={!isFetched || isLoading}>
                                <div>
                                    <h4 className="fw-semibold mb-4">Aniqlangan qoida buzarlik № {remark}</h4>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="font-size-14 font-size-xxl-16 fw-medium">Создан : <span
                                                className="fw-semibold">{get(data, 'created_at', '-')}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="font-size-14 font-size-xxl-16 fw-medium">Срок исполнения
                                                : <span className="fw-semibold">{get(data, 'date_to', '-')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <p className="font-size-14 font-size-xxl-16 fw-medium mb-0">Обнаружено нарушение
                                            правил: <b>{get(data, 'norm', '-')} {get(data, 'revealed', '')}</b></p>
                                    </div>
                                    <div className="row mb-3">
                                        <p className="font-size-14 font-size-xxl-16 fw-medium mb-0">Инструкции по
                                            утилизации: <b>{get(data, 'prescribed', '-')}</b></p>
                                    </div>
                                    <div className="row mb-3">
                                        <p className="font-size-14 font-size-xxl-16 fw-medium mb-0">Отметка о
                                            выполнения: <b>{get(data, 'agreed_description', '-')}</b></p>
                                    </div>
                                    <div className="row mb-3">
                                        <p className="font-size-14 font-size-xxl-16 fw-medium mb-0">Ответсвенный: <i
                                            className="fas fa-pen ml-2"/></p>
                                    </div>
                                    <div className="row mb-3">
                                        {
                                            get(data, 'active_responsibles_info', []).length
                                                ? get(data, "active_responsibles_info", []).map((item, index) => (
                                                    <p key={index}>
                                                        {item.role} : <b>{item.info}</b>
                                                    </p>
                                                ))
                                                : null

                                        }
                                    </div>
                                    <div className="border-bottom border-gray mb-4"/>

                                    <div className="row mb-3">
                                        <div className="d-flex align-items-center mb-5"><i
                                            className="fal fa-images font-size-34 mr-4"/> <h5
                                            className="fw-semibold mb-0">Фотографии</h5></div>


                                        <p className="mb-0 font-size-18 text-info">Фотографии нарушения</p>



                                        <div className="gallery mt-5">
                                            {
                                                get(data, 'files', []).length
                                                    ? get(data, 'files', []).map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <Fancybox>
                                                                {
                                                                    index === 0
                                                                    ? <a data-fancybox="gallery" className="ml-0"
                                                                         href={item.original}>
                                                                            <img alt="thumb" src={item.thumb}/>
                                                                        </a>
                                                                        : <a data-fancybox="gallery" className="ml-3"
                                                                             href={item.original}>
                                                                            <img alt="thumb" src={item.thumb}/>
                                                                        </a>
                                                                }

                                                            </Fancybox>
                                                        </React.Fragment>
                                                    ))
                                                    : null

                                            }


                                        </div>

                                    </div>

                                </div>
                            </Spin>
                        </>
                    }}
                </LoadOne>
            </div>
        </>
    )
}

export default RemarkView