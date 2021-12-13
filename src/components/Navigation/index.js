import React from "react";
import {NavLink, useLocation} from "react-router-dom"
import {NavHashLink} from "react-router-hash-link";
import logo from "assets/images/logo.svg"
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import {useTranslation} from "react-i18next";
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

const Navigation = () => {
    const {system: {language}} = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let location = useLocation();
    let nav

    const scrollWidthOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -880;
        window.scrollTo({top: yCoordinate + yOffset, behavior: 'smooth'});
    }


    const handleLangChange = evt => {
        const lang = evt.target.value;
        dispatch(Actions.CHANGE_LANG.success(lang))
    };



    if (location.pathname === '/') {
        nav = (
            <React.Fragment>
                <li className="nav-item">
                    <p className="nav-link active mb-0" data-scroll-nav="0">{t("nav.Home")}</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="1">{t("nav.About")}</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="2">{t("nav.Products")}</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="3">{t("nav.Objects")}</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="5">{t("nav.Certificate")}</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="5">{t("nav.Contacts")}</p>
                </li>
                <div className="d-flex-center">
                    <label htmlFor={"language"} className="nav-language mb-0">{t("nav.language")} </label>
                    <select onChange={handleLangChange} id={"language"} value={language}
                            className="nav-item border-0 nav-link select-navigation bg-transparent focus-none py-0 pl-0 ml-0 mb-0">
                        <option value={"uz"}>UZB</option>
                        <option value={"ru"}>RUS</option>
                        <option value={"en"}>ENG</option>
                    </select>
                </div>
            </React.Fragment>
        )
    } else {
        window.$(document).ready(function () {
            window.$('.nav-color').each(function () {
                let el = window.$(this);
                let effect = el.data( "active");
                window.$(this).removeClass('active');
                // eslint-disable-next-line
                if (location.pathname.indexOf(effect) == 0) {
                    window.$(this).addClass('active');
                }
            });
        })


        nav = (
            <React.Fragment>
                <li className="nav-item">
                    <NavLink
                        className="nav-link nav-color"
                        data-active="/home" to="/"
                    >
                        {t("nav.Home")}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/about" to="/#about">{t("nav.About")}</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/category"
                                 to="/#projects">{t("nav.Products")}</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/services" to="/#services"
                                 scroll={el => scrollWidthOffset(el)}>{t("nav.Objects")}</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/contact" to="/#contact"
                                 scroll={el => scrollWidthOffset(el)}>{t("nav.Certificate")}</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/contact" to="/#contact"
                                 scroll={el => scrollWidthOffset(el)}>{t("nav.Contacts")}</NavHashLink>
                </li>
                <div className="d-flex-center">
                    <label htmlFor={"language"} className="nav-language nav-color">{t("nav.language")} </label>
                    <select onChange={handleLangChange} id={"language"} value={language}
                            className="nav-item nav-color border-0 nav-link select-navigation bg-transparent focus-none py-0 pl-0 ml-0">
                        <option value={"uz"}>UZB</option>
                        <option value={"ru"}>RUS</option>
                        <option value={"en"}>ENG</option>
                    </select>
                </div>
            </React.Fragment>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink className="logo" to="/">
                    <img src={logo} alt="logo"/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar">
                            <i className="ti-line-double"/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {nav}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navigation