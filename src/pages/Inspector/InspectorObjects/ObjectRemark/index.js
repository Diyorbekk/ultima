import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import get from "lodash.get";
import Spin from "../../../../components/AntSpin";
import Empty from "../../../../components/Empty";
import Pagination from "../../../../components/Pagination";
import LoadAll from "../../../../schema/Container/LoadAll";
import {useDispatch} from "react-redux";
import Actions from "../../../../schema/actions";
import {toast} from "react-toastify";
import Modal from "../../../../components/Modal";

const ObjectRemark = ({url}) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [id, setId] = useState(null)
    const [rendering, setRendering] = useState(false)
    const [isOpen, setOpen] = useState(null);
    const [status, setStatus] = useState(null)
    const [perPage, setPerPage] = useState("10");
    const [page, setPage] = useState(1);
    localStorage.removeItem('by')

    useEffect(() => {
        let timer
        if (id !== null || status !== null) {
            timer = setTimeout(() => setRendering(true), 1000);
        }
        return () => clearTimeout(timer);
    }, []);


    const handleClick = (event) => {
        localStorage.setItem('by', event.target.name)
    }

    const remarkRemove = () => {
        setLoading(true);
        console.log(isLoading)
        setOpen(null);
        dispatch(Actions.DELETE.request({
            url: "/object-control/remark/" + isOpen[0],
            id: isOpen[0],
            name: 'remark-delete',
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
        console.log(isLoading)
    };

    return (
        <>
            {
                id === null || status === null
                    ? <>{setId(localStorage.getItem("url"))}{setStatus(localStorage.getItem("id"))}</>
                    : null
            }
            <LoadAll
                url={`/object-control/remarks-list/${id}`}
                name={'remarks-list'}
                params={{
                    page,
                    perPage,
                }}
            >
                {({isFetched, data = [], meta = {}}) => {
                    return <>
                        <select
                            className={"d-inline-block w-auto border-0 form-select form-select-sm focus-none mb-4"}
                            name="perPage"
                            id="perPage"
                            value={perPage}
                            onChange={e => {
                                setPage(1);
                                setPerPage(e.target.value);
                            }}

                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>

                        <div className="table-responsive">
                            <Spin
                                isSpinning={!isFetched || isLoading}
                                style={{display: "contents"}}
                            >
                                <table className="content-table table my-0">

                                    <thead className="content-table_thead">
                                    <tr>
                                        <th scope="col" className="w-5">#</th>
                                        <th scope="col">Нарушение</th>
                                        <th scope="col" className="w-10 text-center align-middle">Создан</th>
                                        <th scope="col">Статус</th>
                                        <th scope="col" className="w-5"/>
                                        <th scope="col" className="w-5"/>
                                        <th scope="col" className="w-5"/>
                                    </tr>
                                    </thead>

                                    <tbody className="row-bg-white">
                                    {

                                        rendering === true
                                            ? data.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row"
                                                        className="fw-medium p-3 px-lg-4">{++index}</th>
                                                    <td className="fw-medium p-3 px-lg-4">{get(item, 'revealed', '')}</td>
                                                    <td className="fw-medium p-3 px-lg-4 text-center align-middle">{get(item, 'date_to', '')}</td>
                                                    <td className="fw-medium p-3 px-lg-4 align-middle text-center">
                                                        {
                                                            get(item, 'status', '') === 3
                                                                ? <i className="fas fa-circle text-success"/>
                                                                : get(item, 'status', '') === 2
                                                                ? <i className="fas fa-circle text-primary"/>
                                                                : null
                                                        }

                                                    </td>
                                                    <td className="fw-medium p-3 px-lg-4 content-table_tbody__icons text-center align-middle">
                                                    <span
                                                        className="btn focus-none p-0 d-inline-flex position-relative">
                                                        <i className="fas fa-eye position-relative"
                                                           style={{zIndex: 1}}/>
                                                            <Link
                                                                name={get(item, 'id', '')}
                                                                to={`/object/remark-view/${url}`}
                                                                onClick={handleClick}
                                                                title="watch"
                                                                className="position-absolute w-100 h-100"
                                                                style={{zIndex: 2}}
                                                            >

                                                            </Link>
                                                    </span>
                                                    </td>
                                                    <td className="fw-medium p-3 px-lg-4 content-table_tbody__icons text-center align-middle">
                                                        {
                                                            get(item, 'can_edit') === true
                                                                ? <button className="btn focus-none p-0"><i
                                                                    className="fas fa-edit"/>
                                                                </button>
                                                                : null
                                                        }

                                                    </td>
                                                    <td className="fw-medium p-3 px-lg-4 content-table_tbody__icons text-center align-middle">
                                                        {
                                                            get(item, 'can_delete') === true
                                                                ? <button className="btn focus-none p-0"
                                                                          onClick={() => setOpen([get(item, 'id', ''), get(item, 'created_at', ''), 'delete'])}
                                                                ><i
                                                                    className="fas fa-trash"/>
                                                                </button>
                                                                : null
                                                        }

                                                    </td>
                                                </tr>
                                            ))
                                            : <>
                                                {
                                                    [...Array(parseInt(perPage)).keys()].map((item, key) => (
                                                        <tr key={key}>
                                                            <th className="fw-medium p-3 px-lg-4"><span
                                                                className="skeleton d-block p-3 w-100"/>
                                                            </th>
                                                            <td className="fw-medium p-3 px-lg-4"><span
                                                                className="skeleton d-block p-3 w-100"/>
                                                            </td>
                                                            <td className="fw-medium p-3 px-lg-4 text-center align-middle">
                                                                            <span
                                                                                className="skeleton d-block p-3 w-100"/>
                                                            </td>
                                                            <td className="fw-medium p-3 px-lg-4 text-center align-middle">
                                                                            <span
                                                                                className="skeleton d-block p-3 w-100"/>
                                                            </td>
                                                            <td className="fw-medium content-table_tbody__icons">
                                                                <button
                                                                    className="btn p-4 text-white fw-medium skeleton"/>
                                                            </td>
                                                            <td className="fw-medium content-table_tbody__icons">
                                                                <button
                                                                    className="btn p-4 text-white fw-medium skeleton"/>
                                                            </td>
                                                            <td className="fw-medium content-table_tbody__icons">
                                                                <button
                                                                    className="btn p-4 text-white fw-medium skeleton"/>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </>

                                    }
                                    </tbody>
                                </table>
                                <Modal
                                    isOpen={!!isOpen}
                                    onClose={() => setOpen(null)}
                                    width={900}
                                    position={"center"}
                                >
                                    <div className="d-flex flex-wrap p-4 position-relative">
                                        <button
                                            className="btn focus-none position-absolute end-0 top-0 px-3 font-size-25 cursor-pointer"
                                            onClick={() => setOpen(null)}>
                                            <i className={"fal fa-times-circle"}/>
                                        </button>
                                        <div className="w-100 text-center border-bottom py-3">
                                            {
                                                isOpen === null
                                                    ? null
                                                    : isOpen.map(item => item).indexOf('delete') > -1
                                                    ? <h5>
                                                        Вы хотите
                                                        удалить <b>ID</b>: {isOpen[0]} {isOpen[1]} ?
                                                    </h5>
                                                    : null
                                            }

                                        </div>

                                        <div
                                            className="d-flex justify-content-between align-items-center w-100 my-3">
                                            <button className="btn btn-warning text-white"
                                                    onClick={() => setOpen(null)}>
                                                Отмена <i className={"fal fa-times ml-2"}/>
                                            </button>
                                            {
                                                isOpen === null
                                                    ? null
                                                    : isOpen.map(item => item).indexOf('delete') > -1
                                                    ? <button className="btn btn-success text-white"
                                                              onClick={remarkRemove}>
                                                        Да <i className={"fal fa-check ml-2"}/>
                                                    </button>
                                                    : null
                                            }

                                        </div>
                                    </div>
                                </Modal>
                                {
                                    isFetched && !data.length
                                        ? <Empty/>
                                        : null
                                }
                            </Spin>


                            <Pagination
                                className={'justify-content-end pt-3 mb-5'}
                                initialPage={1}
                                pageCount={Math.ceil(get(meta, 'total', 1) / parseInt(perPage))}
                                onChange={n => setPage(n)}
                            />


                        </div>
                    </>
                }}
            </LoadAll>


        </>
    )
}

export default ObjectRemark