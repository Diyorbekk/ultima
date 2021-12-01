import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, EffectFade, Lazy, Navigation} from "swiper";
import LoadOne from "../../../../schema/Container/LoadOne";
import Spin from "../../../../components/AntSpin";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import get from "lodash.get";
import htmlParser from "react-html-parser";

const navigation = {
    nextEl: ".owl-next",
    prevEl: ".owl-prev "
};
const SliderView = (props) => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {system: {language}} = useSelector(state => state);
    SwiperCore.use([EffectFade, Navigation, Lazy, Autoplay]);

    return (
        <>
            <LoadOne
                url={"/posts/" + id + ".json"}
                name={'SliderView'}
                asData
            >
                {({isFetched, data = {}}) => {
                    return <>
                        <Spin
                            isSpinning={!isFetched}
                            style={{display: "contents"}}
                        >
                            <div className="header_main slider-fade position-relative">
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
                                    className="header-slider">
                                    <SwiperSlide>
                                        <div className="text-left item bg-img swiper-lazy" data-overlay-dark="3"
                                             style={{backgroundImage: `url(${get(data, "photo", '')})`}}>
                                            <div className="v-bottom caption">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-7">
                                                            <div className="o-hidden">
                                                                <h1>{get(data, `title_${language}`, '')}</h1>
                                                                <hr/>
                                                                <React.Fragment>
                                                                    {htmlParser(get(data, `description_${language}`, ''))}
                                                                </React.Fragment>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"/>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="owl-nav">
                                    <div className="owl-prev"><i className="ti-angle-left" aria-hidden="true"/></div>
                                    <div className="owl-next"><i className="ti-angle-right" aria-hidden="true"/></div>
                                </div>
                            </div>
                        </Spin>
                    </>
                }}

            </LoadOne>

        </>
    )
}

export default SliderView