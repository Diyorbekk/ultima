import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import add from "../../../assets/images/add.png";
import LoadOne from "../../../schema/Container/LoadOne";
import Modal from "components/Modal";
import get from "lodash.get";
import {useDispatch, useSelector} from "react-redux";
import Actions from "schema/actions";
import {toast} from "react-toastify";
import Spin from "../../../components/AntSpin";
import htmlParser from 'react-html-parser';
import storageFirebase from 'firebaseGet/storageFirebase'


const Category = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [isOpen, setOpen] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {system: {language}} = useSelector(state => state);

    const handleRemove = () => {
        setLoading(true);
        setOpen(null);
        dispatch(Actions.DELETE.request({
            url: '/category/' + isOpen[1] + ".json",
            name: "category.json",
            cb: {
                success: () => {
                    isOpen[2].forEach(file => {
                        const desertRef = storageFirebase.refFromURL(file)
                        desertRef.delete().then(function () {
                        }).catch(function (error) {
                            toast.error("Xatolik yuz berdi");
                        });
                    })

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

                    {
                        !isLoading
                            ? <LoadOne
                                url={`/category.json`}
                                name={'category.json'}
                                asData
                            >
                                {({isFetched, data = {}}) => {
                                    return <>
                                        <Spin
                                            isSpinning={!isFetched}
                                            style={{display: "contents"}}
                                        >


                                            {
                                                isFetched && data !== null
                                                    ? Object.keys(data).length
                                                    ? Object.keys(data).map((key, index) => (
                                                        <div className="col-md-3" key={index}>
                                                            {
                                                                get(data[key], `category_data`).map((res, i) => (
                                                                    <React.Fragment key={i}>
                                                                        <NavLink to={`/category/view/${key}`}
                                                                                 className="card text-decoration-none text-body d-flex">
                                                                            <img src={get(res, "photo")}
                                                                                 className="card-img-top" alt="category"/>

                                                                            <div className="card-body">
                                                                                <h4 className="card-title two-line-text">
                                                                                    {
                                                                                        get(data[key], `category_id`) === 1
                                                                                            ? <>{t("category.Electric")}</>
                                                                                            : get(data[key], `category_id`) === 2
                                                                                            ? <>{t("category.Industry")}</>
                                                                                            : get(data[key], `category_id`) === 3
                                                                                                ? <>{t("category.Construction")}</>
                                                                                                : get(data[key], `category_id`) === 4
                                                                                                    ? <>{t("category.Furniture")}</>
                                                                                                    : get(data[key], `category_id`) === 5
                                                                                                        ? <>{t("category.Automotive")}</>
                                                                                                        : get(data[key], `category_id`) === 6
                                                                                                            ? <>{t("category.Custom")}</>
                                                                                                            : null
                                                                                    }
                                                                                </h4>
                                                                                <h5 className="card-title two-line-text">{get(res, `title_${language}`)}</h5>
                                                                                <div
                                                                                    className="card-text three-line-text">{htmlParser(get(res, `description_${language}`, ''))}</div>
                                                                            </div>
                                                                            <div className="card-footer">
                                                                                <small
                                                                                    className="text-muted">{get(data[key], 'time')}</small>
                                                                            </div>
                                                                        </NavLink>
                                                                        <div className="d-flex">
                                                                            <button
                                                                                className="btn btn-danger text-white w-100"
                                                                                onClick={() => setOpen([get(res, `title_${language}`), key, get(res, "photo"), 'delete'])}>
                                                                                {t("create.delete-btn")}<i
                                                                                className="fas fa-trash font-size-22 ml-2"/>
                                                                            </button>
                                                                            <NavLink
                                                                                className="btn btn-warning text-white w-100"
                                                                                to={`/category/update/${key}`}
                                                                            >
                                                                                {t("create.update-btn")}<i
                                                                                className="fas fa-edit font-size-22 ml-2"/>
                                                                            </NavLink>
                                                                        </div>
                                                                    </React.Fragment>
                                                                ))
                                                            }
                                                        </div>
                                                    ))
                                                    : null
                                                    : null
                                            }


                                        </Spin>
                                    </>
                                }}

                            </LoadOne>
                            : <Spin
                                isSpinning={true}
                                style={{display: "contents"}}
                            >
                            </Spin>
                    }
                    <div className="col-md-3">
                        <NavLink to={`/category/category-add`}
                                 className="border rounded d-flex align-items-center justify-content-center">
                            <img src={add} style={{width: 150}} alt="icon-add"/>
                        </NavLink>
                    </div>
                </div>
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


            </div>
        </>
    );
};

export default Category;