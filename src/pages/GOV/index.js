import React from "react";
import Navigation from "../../components/Navigation";
import {Accordion} from "../../hoc"

const GOV = (props) => {


    return (
        <div className="content">

            <Navigation />

            <div className="contents">
                <div className="content-frame">
                    <p className="content-frame_number">
                        <span>№ </span>1
                    </p>
                    <div className="d-flex align-items-start flex-wrap mt-2">
                        <p className="col-xl-2 col-lg-3 content-frame_title">Наименование:</p>
                        <p className="col-xl-9 col-lg-6 content-frame_text">Buloqboshi tumani 4p-251 avtomobil yo`li
                            M.Ismoilov ko`chasi 4p-137 Xo`jaobod Buloqboshi Kulla
                            uychi avtomobil yo`ldagi Mustaqillik ko`chalarini obodonlashtirish ( yangi modeldagi avtobus
                            yo`lagi uchun kengaytirish tungi yoritish chiroqlarini o`rnatish piyodalar va velosiped
                            yo`laklarini qurish)</p>
                    </div>
                    <div className="d-flex align-items-start flex-wrap mt-2">
                        <p className="col-xl-2 col-lg-3 content-frame_status">Статус:</p>
                        <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                    </div>
                    <div className="content-frame_hidden">
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_title">Мониторинг:</p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_title">Правонарушения:</p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_title">Правонарушения %:</p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_title">Тех.надзор/Заказчик: </p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">Arena Jizzax Stroy Servis</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_title">Инспекторы: </p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="col-xl-2 col-lg-3">
                            <i className="content-frame_icons fas fa-pen"/>
                            <i className="content-frame_icons far fa-eye"/>
                            <i className="content-frame_icons fas fa-trash"/>
                        </div>
                    </div>
                    <button className="btn content-frame_toggle p-0 focus-none">
                        <i className="fal fa-plus-circle" onClick={Accordion}/>
                    </button>
                </div>
                <div className="content-frame success">
                    <p className="content-frame_number">
                        <span>№ </span>2
                    </p>
                    <div className="d-flex align-items-start flex-wrap">
                        <p className="col-xl-2 col-lg-3 content-frame_title">Наименование:</p>
                        <p className="col-xl-9 col-lg-6 content-frame_text">Buloqboshi tumani 4p-251 avtomobil yo`li
                            M.Ismoilov ko`chasi 4p-137 Xo`jaobod Buloqboshi Kulla
                            uychi avtomobil yo`ldagi Mustaqillik ko`chalarini obodonlashtirish ( yangi modeldagi avtobus
                            yo`lagi uchun kengaytirish tungi yoritish chiroqlarini o`rnatish piyodalar va velosiped
                            yo`laklarini qurish)</p>
                    </div>
                    <div className="d-flex align-items-start flex-wrap mt-2">
                        <p className="col-xl-2 col-lg-3 content-frame_status">Статус:</p>
                        <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                    </div>
                    <div className="content-frame_hidden">
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_status">Мониторинг:</p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_status">Правонарушения:</p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_status">Правонарушения %:</p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_status">Тех.надзор/Заказчик: </p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">Arena Jizzax Stroy Servis</p>
                        </div>
                        <div className="d-flex align-items-start flex-wrap mt-2 ">
                            <p className="col-xl-2 col-lg-3 content-frame_status">Инспекторы: </p>
                            <p className="col-xl-9 col-lg-6 content-frame_info">0</p>
                        </div>
                        <div className="col-xl-2 col-lg-3">
                            <i className="content-frame_icons fas fa-pen"/>
                            <i className="content-frame_icons far fa-eye"/>
                            <i className="content-frame_icons fas fa-trash"/>
                        </div>
                    </div>
                    <button className="btn content-frame_toggle p-0 focus-none">
                        <i className="fal fa-plus-circle" onClick={Accordion}/>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default GOV