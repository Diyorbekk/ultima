import React, {useState} from "react";
import {LoadAll} from "../../schema/Container";
import CircularProgressbar from "components/CircularProgress";
import {Link} from "react-router-dom";
import get from "lodash.get";
import NumberCounter from "../../components/NumberCounter";
import Spin from "../../components/AntSpin";
import Empty from "../../components/Empty";
import Pagination from "../../components/Pagination";


const Inspector = () => {
    const [valueBar, setValueBar] = useState(0);
    const [page, setPage] = useState(1);
    localStorage.removeItem("page")
    localStorage.removeItem("perPage")

    return (
        <div className="content mt-5">

            <div className="content-navigation">
                <p className="content-navigation_title text-primary">Контроль строительство
                </p>

                <div className="d-flex align-items-center">
                    <button className="btn content-navigation_add focus-none">Добавить</button>

                    <div className="dropdown">
                        <button className="btn content-navigation_filter focus-none" type="button"
                                id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fal fa-sliders-h"/></button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <li><a className="dropdown-item" href="#">Главный Администратор</a></li>
                            <li><a className="dropdown-item active" href="#">Администратор (только для чтения)</a></li>
                            <li><a className="dropdown-item" href="#">СМР</a></li>
                            <li><a className="dropdown-item" href="#">Shaffof Администратор</a></li>
                            <li><a className="dropdown-item" href="#">Руководители (область)</a></li>
                            <li><a className="dropdown-item" href="#">Отдел регистрации</a></li>
                            <li><a className="dropdown-item" href="#">Инспектор</a></li>
                            <li><a className="dropdown-item" href="#">Тех. надзор / Заказчик</a></li>
                            <li><a className="dropdown-item" href="#">ГИП / Проектировщик</a></li>
                            <li><a className="dropdown-item" href="#">Прораб / Подрядчик</a></li>
                            <li><a className="dropdown-item" href="#">Начальник</a></li>
                            <li><a className="dropdown-item" href="#">Прокуротура</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="contents table-responsive">
                <LoadAll
                    url={`/object-control/object`}
                    name={'objects'}
                    params={{
                        page,
                        perPage: 20
                    }}
                    onSuccess={() => {
                        setTimeout(() => {
                            setValueBar(100)
                        }, 100)
                    }}
                >
                    {({isFetched, data = [], meta = {}}) => {
                        return <>
                            <Spin isSpinning={!isFetched} style={{display: "contents"}}>
                                <table className="content-table table">
                                    <thead className="content-table_thead">
                                    <tr>
                                        <th scope="col" className="align-middle">#</th>
                                        <th scope="col" className="align-middle w-80">Название объекта</th>
                                        <th scope="col" className="align-middle text-center">Количество проверок</th>
                                        <th scope="col" className="align-middle text-center">Количество замечаний</th>
                                        <th scope="col" className="align-middle text-center">Количество замечаний</th>
                                    </tr>
                                    </thead>
                                    <tbody className="content-table_tbody">

                                    {
                                        isFetched && data.length
                                            ? data.length
                                            ? data.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row"
                                                        className="content-table_tbody__numbers">{index + 1}</th>
                                                    <td className="content-table_tbody__text">
                                                        <Link to={`/object/main/${get(item, 'id', '')}`}
                                                              className="text-decoration-none text-reset">
                                                            <p><b>Название</b>: {get(item, 'name_building', '')}</p>
                                                            <p><b>Адрес</b>: {get(item, 'location_building', '')}</p>
                                                            <p><b>Дата
                                                                построения</b>: {get(item, 'construction_date_range')}
                                                            </p>
                                                            <p><b>Заказчик</b>: {get(item, 'customer_info')}</p>
                                                        </Link>
                                                    </td>
                                                    <td className="content-table_tbody__text text-center">
                                                        <CircularProgressbar
                                                            height={65}
                                                            strokeColor={"#4790FF"}
                                                            trailColor={"rgba(71,144,255,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={
                                                                !!get(item, 'verifications_count')
                                                                    ? <NumberCounter
                                                                        isCounting={!!get(item, 'verifications_count')}
                                                                        end={get(item, 'verifications_count')}/>
                                                                    : "0"
                                                            }/>
                                                    </td>
                                                    <td className="content-table_tbody__text text-center">
                                                        <CircularProgressbar
                                                            height={65}
                                                            strokeColor={"#5cb85c"}
                                                            trailColor={"rgba(92,184,92,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={!!get(item, 'remarks_count')
                                                                ? <NumberCounter
                                                                    isCounting={!!get(item, 'remarks_count')}
                                                                    end={get(item, 'remarks_count')}/>
                                                                : "0"
                                                            }/>
                                                    </td>
                                                    <td className="content-table_tbody__text text-center">
                                                        <CircularProgressbar
                                                            height={65}
                                                            strokeColor={"#FFAA00"}
                                                            trailColor={"rgba(255,170,0,0.5)"}
                                                            textSize={30}
                                                            textColor={"#000"}
                                                            value={valueBar}
                                                            text={!!get(item, 'percent_readiness')
                                                                ? <NumberCounter
                                                                    isCounting={!!get(item, 'percent_readiness')}
                                                                    end={get(item, 'percent_readiness')}/>
                                                                : "0"
                                                            }/>
                                                    </td>
                                                </tr>
                                            ))
                                            : null
                                            : null
                                    }

                                    </tbody>
                                </table>
                            </Spin>
                            {
                                isFetched && !data.length
                                    ? <Empty/>
                                    : null
                            }
                            <Pagination
                                className={'justify-content-end pt-3'}
                                initialPage={1}
                                pageCount={Math.ceil(get(meta, 'total', 1) / 10)}
                                onChange={n => setPage(n)}
                            />
                        </>

                    }}

                </LoadAll>

            </div>
        </div>
    )
}

export default Inspector