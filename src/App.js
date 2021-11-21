import React, {useEffect} from 'react';
import Routes from './routes';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './assets/style/skeleton.scss';
import './assets/style/style.css';
import './assets/style/custom.scss';
import {storage} from 'services';
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import {withTranslation} from "react-i18next";
import dayjs from 'dayjs';
import {ToastContainer} from 'react-toastify';

require('assets/js/uz-latn');
require('assets/js/ru');

const App = ({i18n}) => {

    const dispatch = useDispatch();
    const {system: {language}} = useSelector(state => state);


    useEffect(() => {
        if (!storage.get('language')) {
            dispatch(Actions.CHANGE_LANG.success('uz'));
            dayjs.locale('uz');
        }
    }, [dispatch]);

    useEffect(() => {
        i18n.changeLanguage(language);
        dayjs.locale(language);
    }, [i18n, language]);

    return (
        <div className='d-flex vh-100'>
            <Routes/>
            <ToastContainer autoClose={3000}/>
        </div>
    );
};


export default withTranslation()(App);