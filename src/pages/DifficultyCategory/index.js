import React from "react";

const DifficultyCategory = (props) => {
    return (
        <div className="content">

            <div className="content-navigation">
                <p className="content-navigation_title">Title</p>

                <div className="d-flex align-items-center">
                    <button className="btn content-navigation_add focus-none">Добавить</button>

                    <div className="dropdown">
                        <button className="btn content-navigation_filter focus-none" type="button" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false"><i className="fal fa-sliders-h"/></button>
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
                <table className="content-table table">
                    <thead className="content-table_thead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Категория сложности объекта</th>
                        <th scope="col" className="w-5"/>
                        <th scope="col" className="w-5"/>
                        <th scope="col" className="w-5"/>
                    </tr>
                    </thead>
                    <tbody className="content-table_tbody">
                    <tr>
                        <th scope="row" className="content-table_tbody__numbers">1</th>
                        <td className="content-table_tbody__text">1</td>
                        <td className="content-table_tbody__icons">
                            <button className="btn focus-none p-0"><i className="fas fa-pen"/></button>
                        </td>
                        <td className="content-table_tbody__icons">
                            <button className="btn focus-none p-0"><i className="far fa-eye"/></button>
                        </td>
                        <td className="content-table_tbody__icons">
                            <button className="btn focus-none p-0"><i className="fas fa-trash"/></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default DifficultyCategory