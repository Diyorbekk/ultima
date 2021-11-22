import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import User from 'assets/images/user.png';
import {useHistory} from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {system: {language}} = useSelector(state => state);


    const handleLangChange = evt => {
        const lang = evt.target.value;
        dispatch(Actions.CHANGE_LANG.success(lang))
    };


    return (
        <header className="header shadow-sm bg-white position-fixed start-0 top-0 w-100">
            <div className="sidebar-position-holder"/>
            <div className="header-block justify-content-between">
                <div className="d-flex-center">
                    <div
                        className="user-avatar rounded-circle has-bg mr-2"
                        style={{
                            backgroundImage: `url(${User})`
                        }}
                    />

                    <span className="user-name text-secondary">Admin</span>
                </div>
                <select onChange={handleLangChange} value={language}
                        className="form-control w-auto border-0 text-secondary focus-none">
                    <option value={"uz"}>UZB</option>
                    <option value={"ru"}>RUS</option>
                    <option value={"en"}>ENG</option>
                </select>
            </div>
        </header>
    );
};

export default Header;