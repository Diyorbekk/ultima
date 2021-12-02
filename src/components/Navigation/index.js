import React from "react";
import {NavLink, useLocation} from "react-router-dom"
import {NavHashLink} from "react-router-hash-link";
import logo from "assets/images/logo.svg"
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';


const Navigation = () => {
    const {system: {language}} = useSelector(state => state);
    const dispatch = useDispatch();
    let location = useLocation();
    let nav

    const scrollWidthOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -880;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    }



    const handleLangChange = evt => {
        const lang = evt.target.value;
        dispatch(Actions.CHANGE_LANG.success(lang))
    };



    if (location.pathname === '/') {
        nav = (
            <React.Fragment>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="0">Home</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="1">About</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="2">Projects</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="3">Services</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="4">News</p></li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="5">Contact</p>
                </li>
            </React.Fragment>
        )
    } else {
        window.$(document).ready(function () {
            window.$('.nav-color').each(function () {
                let el = window.$(this);
                let effect = el.data('active');
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
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/about"  to="/#about">About</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/project" to="/#projects">Projects</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/services" to="/#services" scroll={el => scrollWidthOffset(el)} >Services</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/news" to="/#blog" scroll={el => scrollWidthOffset(el)}>News</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink  className="nav-link nav-color" data-active="/contact" to="/#contact" scroll={el => scrollWidthOffset(el)}>Contact</NavHashLink>
                </li>

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
                        <select onChange={handleLangChange} value={language}
                                className="nav-item border-0 nav-link bg-transparent focus-none p-0 mb-1">
                            <option value={"uz"}>UZB</option>
                            <option value={"ru"}>RUS</option>
                            <option value={"en"}>ENG</option>
                        </select>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navigation