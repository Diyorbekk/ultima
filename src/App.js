import React, {useEffect} from 'react';
import Routes from './routes';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './assets/style/skeleton.scss';
import './assets/style/style.css';
import './assets/style/custom.scss';
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/lazy/lazy.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import {withTranslation} from "react-i18next";
import {ToastContainer} from 'react-toastify';
import {storage} from 'services';
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import Helmet from 'react-helmet';
import dayjs from 'dayjs';

const JQUERY = "/js/jquery.js";
const PACE = "/js/pace.js";
const SCROLL_IT = '/js/scrollit.js';
const MAGNIFIC = '/js/magnific-popup.js';
const BOOTSTRAP= '/js/bootstrap.js';
const POPPER = '/js/popper.js';
const WAY_POINTS = '/js/waypoints.js';
const STELLAR = '/js/stellar.js';
const MIGRATE = '/js/migrate.js';
const CUSTOM = '/js/custom.js';


const App = ({i18n}) => {

    const dispatch = useDispatch();
    const {system: {language}} = useSelector(state => state);

    useEffect(() => {
        return ()=>{
            const scriptTag1 = document.querySelector('#jquery-url');
            const scriptTag2 = document.querySelector('#pace');
            const scriptTag3 = document.querySelector('#scroll_it');
            const scriptTag4 = document.querySelector('#bootstrap');
            const scriptTag5 = document.querySelector('#way-points');
            const scriptTag6 = document.querySelector('#stellar');
            const scriptTag7 = document.querySelector('#magnific');
            const scriptTag8 = document.querySelector('#popper');
            const scriptTag9 = document.querySelector('#migrate');
            const scriptTag10 = document.querySelector('#custom');
            if (scriptTag1) {
                scriptTag1.remove();
            }
            if (scriptTag2) {
                scriptTag2.remove();
            }
            if (scriptTag3) {
                scriptTag3.remove();
            }
            if(scriptTag4){
                scriptTag4.remove();
            }
            if(scriptTag5){
                scriptTag5.remove();
            }
            if(scriptTag6){
                scriptTag6.remove();
            }
            if(scriptTag7) {
                scriptTag7.remove();
            }
            if(scriptTag8){
                scriptTag8.remove();
            }
            if(scriptTag9){
                scriptTag9.remove();
            }
            if(scriptTag10){
                scriptTag10.remove();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PACE]);

    useEffect(() => {
        if (!storage.get('language')) {
            dispatch(Actions.CHANGE_LANG.success('uz'));
            dayjs.locale('uz');
        }
    }, [dispatch]);
    useEffect(() => {
        i18n.changeLanguage(language).then(r => r);
        dayjs.locale(language);
    }, [i18n, language]);
    return (
        <>
            <Helmet>
                <script type="text/javascript" id={"jquery-url"} async src={JQUERY} />
                <script type="text/javascript" id={"pace"} async src={PACE} />
                <script type="text/javascript" id={'scroll_it'} async src={SCROLL_IT} />
                <script type="text/javascript" id={'magnific'} async src={MAGNIFIC} />
                <script type="text/javascript" id={'bootstrap'} async src={BOOTSTRAP} />
                <script type="text/javascript" id={'popper'} async src={POPPER} />
                <script type="text/javascript" id={'way-points'} async src={WAY_POINTS} />
                <script type="text/javascript" id={'stellar'} async src={STELLAR} />
                <script type="text/javascript" id={'migrate'} async src={MIGRATE} />
                <script type="text/javascript" id={'custom'} async src={CUSTOM} />
            </Helmet>
            <Routes/>
            <ToastContainer autoClose={3000}/>
        </>
    );
};


export default withTranslation()(App);