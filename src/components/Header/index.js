import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import User from 'assets/images/user.png';
import get from 'lodash.get';
import {toast} from "react-toastify";
import {useHistory} from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {system: {language}, auth} = useSelector(state => state);

    const handleLanguage = lang => {
        dispatch(Actions.CHANGE_LANG.success(lang));
    };

    const handleLangChange = evt => {
        const lang = evt.target.value;
        console.log(lang);
        dispatch(Actions.CHANGE_LANG.success(lang))
    };


    return (
        <header className="header shadow-sm bg-white py-2 position-fixed start-0 top-0 w-100">
            <div className="container-fluid">
                <div
                    className={`d-flex align-items-center justify-content-end`}>


                    <div className="d-flex align-items-center user-info">
                        <span className="user-name text-secondary">{get(auth, 'data.user', '')}</span>
                        <div
                            className="user-avatar rounded-circle has-bg ml-2"
                            style={{
                                backgroundImage: `url(${get(auth, 'data.img', User)})`
                            }}
                        />
                        <select onChange={handleLangChange} value={language} className="form-control w-auto border-0 text-secondary focus-none">
                            <option value={"uz"}>UZB</option>
                            <option value={"ru"}>RUS</option>
                            <option value={"en"}>ENG</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;