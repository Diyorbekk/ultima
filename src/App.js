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
import {withTranslation} from "react-i18next";
import {ToastContainer} from 'react-toastify';
import Helmet from 'react-helmet';

const PACE = "https://diyorbekk.github.io/js/pace.js";
const JQUERY = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
const BOOTSTRAP= 'https://diyorbekk.github.io/js/bootstrap.min.js';
const POPPER = 'https://diyorbekk.github.io/js/popper.min.js';
const WAY_POINTS = 'https://diyorbekk.github.io/js/jquery.waypoints.min.js';
const SCROLL_IT = 'https://diyorbekk.github.io/js/scrollIt.min.js';
const STELLAR = 'https://diyorbekk.github.io/js/jquery.stellar.min.js';
const MIGRATE = 'https://diyorbekk.github.io/js/jquery-migrate-3.0.0.min.js';
const MAGNIFIC = 'https://diyorbekk.github.io/js/jquery.magnific-popup.js';
const CUSTOM = 'https://diyorbekk.github.io/js/custom.js';


const App = ({i18n}) => {

    useEffect(() => {

        return ()=>{
            const scriptTag1 = document.querySelector('#bootstrap');
            const scriptTag2 = document.querySelector('#popper');
            const scriptTag3 = document.querySelector('#way-points');
            const scriptTag4 = document.querySelector('#jquery-url');
            const scriptTag5 = document.querySelector('#scroll_it');
            const scriptTag6 = document.querySelector('#stellar');
            const scriptTag7 = document.querySelector('#custom');
            const scriptTag8 = document.querySelector('#pace');
            const scriptTag9 = document.querySelector('#migrate');
            const scriptTag10 = document.querySelector('#magnific');
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
        <div className="body-main">
            <Helmet>
                <script id="jquery-url" async defer src={JQUERY} />
                <script id="pace" async defer data-pace-options='{ "ajax": false }' src={PACE} />
                <script id={'bootstrap'} async defer src={BOOTSTRAP}  />
                <script id={'popper'} async defer src={POPPER}  />
                <script id={'way-points'} async defer src={WAY_POINTS} />
                <script id={'scroll_it'} async defer src={SCROLL_IT} />
                <script id={'stellar'} async defer src={STELLAR} />
                <script id={'migrate'} async defer src={MIGRATE} />
                <script id={'magnific'} async defer src={MAGNIFIC} />
                <script id={'custom'} async defer src={CUSTOM} />
            </Helmet>
            <Routes/>
            <ToastContainer autoClose={3000}/>
        </div>
    );
};


export default withTranslation()(App);