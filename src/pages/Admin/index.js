import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import add from "../../assets/images/add.png";
import LoadOne from "../../schema/Container/LoadOne";
import Modal from "components/Modal";
import get from "lodash.get";
import {useSelector, useDispatch} from "react-redux";
import Actions from "schema/actions";
import {toast} from "react-toastify";


const AdminHome = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [isOpen, setOpen] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {system: {language}} = useSelector(state => state);

    const handleRemove = () => {
        setLoading(true);
        setOpen(null);
        dispatch(Actions.DELETE.request({
            url: '/posts/' + isOpen[1] + ".json",
            id: isOpen[0],
            name: 'verification-lists',
            cb: {
                success: () => {
                    toast.success("O'chirildi");
                },
                error: () => {
                    toast.error("Xatolik yuz berdi");
                },
                finally: () => {
                    setLoading(false);
                }
            }
        }))
    };


    return (
        <>
            <div className="col-12 mt-5">
                <div className="row">

                    <LoadOne
                        url={`/posts.json`}
                        name={'posts.json'}
                        asData
                    >
                        {({isFetched, data = {}}) => {
                            return <>
                                {
                                    isFetched && Object.keys(data).length
                                        ? Object.keys(data).map((key, index) => (
                                            <div className="col-md-3" key={index}>
                                                <NavLink to={`/admin/slider/${key}`}
                                                         className="card text-decoration-none text-body">
                                                    <img src={get(data[key], "photo")} className="card-img-top"
                                                         alt="slider"/>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{get(data[key], `title_${language}`)}</h5>
                                                        <p className="card-text">{get(data[key], `description_${language}`)}</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <small className="text-muted">{get(data[key], 'time')}</small>
                                                    </div>
                                                </NavLink>

                                                <button
                                                    className="btn btn-danger text-white font-size-22 w-100"
                                                    onClick={() => setOpen([get(data[key], `title_${language}`), key, 'delete'])}>
                                                    <i className="fas fa-trash"/>
                                                </button>
                                            </div>
                                        ))
                                        : null
                                }
                            </>
                        }}

                    </LoadOne>

                    <Modal
                        isOpen={!!isOpen}
                        onClose={() => setOpen(null)}
                        width={900}
                        position={"center"}
                    >
                        <div className="d-flex flex-wrap p-4 position-relative">
                            <div className="w-100 text-center border-bottom py-3">
                                {
                                    isOpen === null
                                        ? null
                                        : isOpen.map(item => item).indexOf('delete') > -1
                                        ? <h5>{t("create.delete")} <b>ID</b>: {isOpen[0]} ?</h5>
                                        : null
                                }

                            </div>

                            <div
                                className="d-flex justify-content-between align-items-center w-100 my-3">
                                <button className="btn btn-warning text-white"
                                        onClick={() => setOpen(null)}>
                                    {t("create.ask-no")} <i className={"fal fa-times ml-2"}/>
                                </button>
                                {
                                    isOpen === null
                                        ? null
                                        : isOpen.map(item => item).indexOf('delete') > -1
                                        ? <button className="btn btn-success text-white"
                                                  onClick={handleRemove}>
                                            {t("create.ask-yes")} <i className={"fal fa-check ml-2"}/>
                                        </button>
                                        : null
                                }

                            </div>
                        </div>
                    </Modal>


                    <div className="col-md-3">
                        <NavLink to={`/admin/slider-add`}
                                 className="border rounded d-flex align-items-center justify-content-center">
                            <img src={add} style={{width: 150}} alt="icon-add"/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;