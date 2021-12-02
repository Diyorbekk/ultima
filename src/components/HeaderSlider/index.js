import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, EffectFade, Lazy, Navigation} from 'swiper/core';
import LoadOne from "../../schema/Container/LoadOne";
import Spin from "../AntSpin";
import get from "lodash.get";
import htmlParser from "react-html-parser";
import image from "assets/images/placeholder.png"
import {useSelector} from "react-redux";
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
const navigation = {
    nextEl: ".owl-next",
    prevEl: ".owl-prev "
};
const HeaderClients = () => {
    const {system: {language}} = useSelector(state => state);
    SwiperCore.use([EffectFade, Navigation, Lazy, Autoplay]);


    const sliderChange = (index) => {
        window.$(document).ready(function () {
            if (index.params.slideActiveClass || index.params.slideDuplicateActiveClass) {
                window.$("." + index.params.slideActiveClass).find('h1').removeClass('d-none animated fadeOutDown');
                window.$("." + index.params.slideActiveClass).find('h4').removeClass('d-none animated fadeOutDown');


                window.$("." + index.params.slideActiveClass).find('h1').addClass('animated fadeInUp');
                window.$("." + index.params.slideActiveClass).find('h4').addClass('animated fadeInUp');


                window.$("." + index.params.slideNextClass).find('h1').removeClass('animated fadeInUp');
                window.$("." + index.params.slideNextClass).find('h4').removeClass('animated fadeInUp');
                window.$("." +  index.params.slidePrevClass).find('h1').addClass('animated fadeOutDown');
                window.$("." +  index.params.slidePrevClass).find('h4').addClass('animated fadeOutDown');
            }
        })
    };

    return (
        <>
            <header id="home" className="header_main slider-fade" data-scroll-index="0">
                <div className="header_main slider-fade">


                    <LoadOne
                        url={"/slider.json"}
                        name={'header'}

                        asData
                    >
                        {({isFetched, data = {}}) => {
                            return <>
                                <Spin
                                    isSpinning={!isFetched}
                                >
                                    <Swiper
                                        navigation={navigation}
                                        effect={'fade'}
                                        lazy={true}
                                        loop={true}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false
                                        }}
                                        grabCursor={true}
                                        onSlideChange={(e) => sliderChange(e)}
                                        className="header-slider">
                                        {
                                            isFetched && data !== null
                                                ? Object.keys(data).length
                                                ? Object.keys(data).map((key, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className="text-left item bg-img swiper-lazy"
                                                             style={{backgroundImage: `url(${get(data[key], "photo") || image})`}}
                                                             data-overlay-dark="3">
                                                            <div className="v-bottom caption">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-xl-8">
                                                                            <div className="o-hidden">
                                                                                <h1 className="animated fadeInUp">{get(data[key], `title_${language}`)}</h1>
                                                                                <hr/>
                                                                                <h4 className="animated fadeInUp text-left"
                                                                                >{htmlParser(get(data[key], `description_${language}`, ''))}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="swiper-lazy-preloader"/>
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                                : null
                                                : null
                                        }
                                    </Swiper>
                                </Spin>
                            </>
                        }}
                    </LoadOne>

                    <div className="owl-nav">
                        <div className="owl-prev"><i className="ti-angle-left" aria-hidden="true"/>
                        </div>
                        <div className="owl-next"><i className="ti-angle-right" aria-hidden="true"/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderClients