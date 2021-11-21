import React, {useState} from "react";
import CircularProgressbar from "../../../../components/CircularProgress";
import Pagination from "../../../../components/Pagination";
import get from "lodash.get";
import Spin from "../../../../components/AntSpin";
import Skeleton from "../../../../components/Skeleton";
import Empty from "../../../../components/Empty";
import Modal from "../../../../components/Modal";
import {useDispatch} from "react-redux";
import Actions from "../../../../schema/actions";
import {toast} from "react-toastify";
import LoadOne from "../../../../schema/Container/LoadOne";
import {Link, NavLink} from "react-router-dom";
import NumberCounter from "../../../../components/NumberCounter";
import LoadAll from "../../../../schema/Container/LoadAll";

const ObjectMonitoring = ({url}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(localStorage.getItem("page") !== null ? parseInt(localStorage.getItem("page")) : 1);
    const [perPage, setPerPage] = useState(localStorage.getItem("perPage") !== null ? localStorage.getItem("perPage") : "10");
    const [monitoringData, setMonitoringData] = useState(null);
    const [valueBar, setValueBar] = useState(0);
    const [isOpen, setOpen] = useState(null);
    const [isLoading, setLoading] = useState(false);
    localStorage.removeItem('url')
    localStorage.removeItem('id')

    const handleClick = (event) => {
        localStorage.setItem('url', event.target.name)
        localStorage.setItem('id', event.target.id)
    }

    const handleRemove = () => {
        setLoading(true);
        setOpen(null);
        dispatch(Actions.DELETE.request({
            url: '/object-control/verification/' + isOpen[0],
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
            <LoadOne
                url={`/object-control/verification-lists/${url}`}
                name={'verification-list'}
                asData
            >
                {({isFetched, data = {}}) => {
                    return <>
                        {
                            setMonitoringData(get(data, 'monitoring', ''))
                        }
                    </>
                }}

            </LoadOne>
            <LoadAll
                url={`/object-control/verification-lists/${url}`}
                name={'verification-lists'}
                params={{
                    page,
                    perPage
                }}
                onSuccess={() => {
                    setTimeout(() => {
                        setValueBar(100)
                    }, 100)

                    localStorage.setItem("page", page)
                    localStorage.setItem("perPage", perPage)

                    document.querySelector(".wrapper-block").scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }}
            >
                {({isFetched, data = [], meta = {}}) => {
                    return <>
                        <div className="d-flex align-items-center justify-content-between pb-2">
                            <div>
                                <Link className="btn btn-primary btn-md px-4 text-white fw-medium mr-3"
                                      to={`/object/verification-destroyed/${url}`}>Архив</Link>

                                <select
                                    className={"d-inline-block w-auto border-0 form-select form-select-sm focus-none"}
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


                            </div>

                            {
                                monitoringData === true
                                    ? <Link className="btn btn-primary btn-md px-4 text-white fw-medium"
                                            to={`/object/verification/${url}`}>Добавить новое предписание</Link>
                                    : <Link className="btn btn-primary btn-md px-4 text-white fw-medium"
                                            to={`/object/monitoring-create/${url}`}>Добавить новое
                                        мониторинг</Link>
                            }
                        </div>
                        <div className="table-responsive">
                            <Spin
                                isSpinning={!isFetched || isLoading}
                                style={{display: "contents"}}
                            >
                                <table
                                    className="table table-borderless table-separate spaceY-1 rounded-bottom">
                                    <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="px-lg-4 p-3 fw-normal">№</th>
                                        <th className="px-lg-4 p-3 fw-normal">ID</th>
                                        <th className="p-3 fw-normal text-center">Создан</th>
                                        <th className="p-3 fw-normal text-center">Замечании</th>
                                        <th className="p-3 fw-normal text-center">Открыто</th>
                                        <th className="p-3 fw-normal text-center">Закрыто</th>
                                        <th className="p-3 fw-normal text-center">Устранено</th>
                                        <th className="p-3 fw-normal text-center">Статус</th>
                                        <th className="p-3 fw-normal text-center">Скачать</th>
                                        <th className="p-3 fw-normal text-center">Действие</th>
                                    </tr>
                                    </thead>

                                    <tbody className="row-bg-white">
                                    {

                                        data.length
                                            ? data.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="fw-medium p-3 px-lg-4">{++index}</td>
                                                    <td className="fw-medium p-3 px-lg-4">{get(item, 'id', '')}</td>
                                                    <td className="fw-medium p-3 text-center w-20">{get(item, 'created_at', '')}</td>
                                                    <td className="fw-medium p-3 text-center">
                                                        <CircularProgressbar
                                                            height={60}
                                                            strokeColor={"#4790FF"}
                                                            trailColor={"rgba(71,144,255,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={
                                                                !!get(item, 'remarks')
                                                                    ? <NumberCounter
                                                                        isCounting={!!get(item, 'remarks')}
                                                                        end={get(item, 'remarks')}/>
                                                                    : "0"
                                                            }/>
                                                    </td>
                                                    <td className="fw-medium p-3 text-center">
                                                        <CircularProgressbar
                                                            height={60}
                                                            strokeColor={"#5cb85c"}
                                                            trailColor={"rgba(92,184,92,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={
                                                                !!get(item, 'active_remarks')
                                                                    ? <NumberCounter
                                                                        isCounting={!!get(item, 'active_remarks')}
                                                                        end={get(item, 'active_remarks')}/>
                                                                    : "0"
                                                            }/>
                                                    </td>
                                                    <td className="fw-medium p-3 text-center">
                                                        <CircularProgressbar
                                                            height={60}
                                                            strokeColor={"#FFAA00"}
                                                            trailColor={"rgba(255,170,0,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={
                                                                !!get(item, 'closed_remarks_by_responsible')
                                                                    ? <NumberCounter
                                                                        isCounting={!!get(item, 'closed_remarks_by_responsible')}
                                                                        end={get(item, 'closed_remarks_by_responsible')}/>
                                                                    : "0"
                                                            }/>
                                                    </td>
                                                    <td className="fw-medium p-3 text-center">
                                                        <CircularProgressbar
                                                            height={60}
                                                            strokeColor={"#d9534f"}
                                                            trailColor={"rgba(217,83,79,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={
                                                                !!get(item, 'closed_remarks')
                                                                    ? <NumberCounter
                                                                        isCounting={!!get(item, 'closed_remarks')}
                                                                        end={get(item, 'closed_remarks')}/>
                                                                    : "0"
                                                            }/>
                                                    </td>
                                                    <td className="fw-medium p-3 text-center">
                                                        {
                                                            get(item, 'status') === 0
                                                                ? <NavLink
                                                                    name={get(item, 'id', '')}
                                                                    id={get(item, 'status')}
                                                                    to={`/object/remark-list/${url}`}
                                                                    onClick={handleClick}
                                                                    className="btn btn-primary btn-sm text-white fw-medium">
                                                                    Активно
                                                                </NavLink>
                                                                : get(item, 'status') === 1
                                                                ? <button
                                                                    id={get(item, 'status')}
                                                                    className="btn btn-primary btn-sm text-white fw-medium">
                                                                    Закрыто
                                                                </button>
                                                                : get(item, 'status') === 2
                                                                    ? <button
                                                                        id={get(item, 'status')}
                                                                        className="btn btn-warning btn-sm text-white fw-medium">
                                                                        Мерорприятия
                                                                    </button>
                                                                    : get(item, 'status') === 3
                                                                        ? <button
                                                                            className="btn btn-success btn-sm text-white fw-medium">
                                                                            АСТ
                                                                        </button>
                                                                        : get(item, 'status') === 4
                                                                            ? <NavLink
                                                                                name={get(item, 'id', '')}
                                                                                id={get(item, 'status')}
                                                                                to={`/object/remark-list/${url}`}
                                                                                onClick={handleClick}
                                                                                className="btn btn-secondary btn-sm text-white fw-medium">
                                                                                Время истекло
                                                                            </NavLink>
                                                                            : get(item, 'status') === 5
                                                                                ? <button
                                                                                    className="btn btn-primary btn-sm text-white fw-medium">
                                                                                    Закрыто
                                                                                </button>
                                                                                : null
                                                        }
                                                    </td>
                                                    <td className="fw-medium p-3 text-center">
                                                        {
                                                            get(item, 'remarks') !== 0
                                                                ?
                                                                <a href={`https://nazorat.mc.uz/object-control/verification/download-pdf/${get(item, 'id')}`}
                                                                   target={"_blank"} rel="noopener noreferrer"
                                                                   download={`https://nazorat.mc.uz/object-control/verification/download-pdf/${get(item, 'id')}`}
                                                                   className="text-secondary mx-2 font-size-22">
                                                                    <i className="far fa-arrow-to-bottom"/>
                                                                </a>
                                                                : null

                                                        }
                                                    </td>
                                                    <td className="fw-medium p-3">
                                                            <span
                                                                className="d-flex align-items-center justify-content-center">
                                                                <span
                                                                    className="cursor-pointer text-secondary mx-3 font-size-22"
                                                                    onClick={() => setOpen([get(item, 'id', ''), get(item, 'created_at', ''), 'delete'])}>
                                                                    <i className="fas fa-trash"/>
                                                                </span>
                                                                {
                                                                    get(item, 'owner') === true
                                                                        ? <span
                                                                            className="cursor-pointer text-secondary mx-3 font-size-22"
                                                                            onClick={() => setOpen([get(item, 'id', ''), get(item, 'created_at', ''), 'owner'])}>
                                                                        <i className="fal fa-check-circle"/>
                                                                    </span>
                                                                        : null
                                                                }
                                                                {
                                                                    get(item, 'can_start_event') === true
                                                                        ?
                                                                        <span
                                                                            className="cursor-pointer text-secondary mx-3 font-size-22 position-relative"
                                                                            onClick={() => setOpen([get(item, 'id', ''), get(item, 'created_at', ''), 'can_start_event'])}>
                                                                        <i className="fal fa-clock"/>
                                                                        <i className="fas fa-plus font-size-10 position-absolute"/>
                                                                    </span>
                                                                        : null
                                                                }
                                                            </span>
                                                    </td>
                                                </tr>

                                            ))
                                            : null
                                    }


                                    </tbody>
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
                                                        : isOpen.map(item => item).indexOf('owner') > -1
                                                            ? <h5>
                                                                Хотите завершить
                                                                проверку <b>ID</b>: {isOpen[0]} {isOpen[1]} ?
                                                            </h5>
                                                            : isOpen.map(item => item).indexOf('can_start_event') > -1
                                                                ? <h5>
                                                                    Kechirasiz bu imkoniyat hozrda mavjud emas.
                                                                    Coming
                                                                    soon...
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
                                                                  onClick={handleRemove}>
                                                            Да <i className={"fal fa-check ml-2"}/>
                                                        </button>
                                                        : isOpen.map(item => item).indexOf('owner') > -1
                                                            ? <button className="btn btn-success text-white"
                                                                      onClick={() => 'aaa'}>
                                                                Да <i className={"fal fa-check ml-2"}/>
                                                            </button>
                                                            : isOpen.map(item => item).indexOf('can_start_event') > -1
                                                                ? <button className="btn btn-success text-white"
                                                                          onClick={() => 'aaa'}>
                                                                    Да <i className={"fal fa-check ml-2"}/>
                                                                </button>
                                                                : null
                                                }

                                            </div>
                                        </div>
                                    </Modal>

                                    {
                                        !isFetched && !data.length
                                            ? [...Array(perPage).keys()].map((_, key) => (
                                                <Skeleton.InspectorMonitoring key={key}/>
                                            ))
                                            : null
                                    }

                                </table>
                            </Spin>
                            {
                                isFetched && !data.length
                                    ? <Empty/>
                                    : null
                            }
                        </div>
                        <Pagination
                            className={'justify-content-end pt-3'}
                            initialPage={page}
                            pageCount={Math.ceil(get(meta, 'total', 1) / parseInt(perPage))}
                            onChange={n => setPage(n)}
                        />
                    </>
                }}
            </LoadAll>
        </>
    )
}

export default ObjectMonitoring