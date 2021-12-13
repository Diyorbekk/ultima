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

const PACE = "https://diyorbekk.github.io/js/pace.js";
const MAGNIFIC = 'https://diyorbekk.github.io/js/jquery.magnific-popup.js';
const JQUERY = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
const BOOTSTRAP= 'https://diyorbekk.github.io/js/bootstrap.min.js';
const POPPER = 'https://diyorbekk.github.io/js/popper.min.js';
const WAY_POINTS = 'https://diyorbekk.github.io/js/jquery.waypoints.min.js';
const SCROLL_IT = 'https://diyorbekk.github.io/js/scrollIt.min.js';
const STELLAR = 'https://diyorbekk.github.io/js/jquery.stellar.min.js';
const MIGRATE = 'https://diyorbekk.github.io/js/jquery-migrate-3.0.0.min.js';
const CUSTOM = 'https://diyorbekk.github.io/js/custom.js';


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
        i18n.changeLanguage(language).then(r => r);
        dayjs.locale(language);
    }, [i18n, language]);

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
    }, []);

    return (
        <>
            <Helmet>
                <script id="jquery-url" async src={JQUERY} />
                <script id="pace" async data-pace-options='{ "ajax": false }' src={PACE} />
                <script id={'scroll_it'} async src={SCROLL_IT} />
                <script id={'magnific'} async src={MAGNIFIC} />
                <script id={'bootstrap'} async src={BOOTSTRAP} />
                <script id={'popper'} async src={POPPER} />
                <script id={'way-points'} async src={WAY_POINTS} />
                <script id={'stellar'} async src={STELLAR} />
                <script id={'migrate'} async src={MIGRATE} />
                <script id={'custom'} async src={CUSTOM} />
            </Helmet>
            <Routes/>
            <ToastContainer autoClose={3000}/>
        </>
    );
};


export default withTranslation()(App);