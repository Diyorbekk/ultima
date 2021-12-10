import React from "react";
import LoadOne from "../../../schema/Container/LoadOne";
import Spin from "../../../components/AntSpin";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
    Pagination,
    Lazy,
    Autoplay,
    Navigation
} from 'swiper/core';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import get from "lodash.get";
import {useTranslation} from "react-i18next";

const Category = () => {
    const {system: {language}} = useSelector(state => state);
    const {t} = useTranslation();

    SwiperCore.use([Pagination, Navigation, Lazy, Autoplay]);
    return <>
        <section id="projects" className="projects section-padding" data-scroll-index="2">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="section-title">Our <span>Projects</span></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        <LoadOne
                            url={"/category.json"}
                            name={'category'}
                            asData
                        >
                            {({isFetched, data = {}}) => {
                                return <>
                                    <Spin
                                        isSpinning={!isFetched}
                                        style={{display: "contents"}}
                                    >
                                        <Swiper
                                            autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false
                                            }}
                                            lazy={true}
                                            spaceBetween={30}
                                            grabCursor={true}
                                            pagination={true}
                                            slidesPerView={2}
                                            breakpoints={{
                                            "0": {
                                                "slidesPerView": 1,
                                            },
                                            "600": {
                                                "slidesPerView": 2,
                                            },
                                            "1000": {
                                                "slidesPerView": 2,
                                            },
                                            "3840": {
                                                "slidesPerView": 2,
                                            }
                                        }} className="project-slider">
                                            {
                                                isFetched && data !== null
                                                    ? Object.keys(data).length
                                                    ? Object.keys(data).map((key, index) => (
                                                        <SwiperSlide key={index}>
                                                            <div className="item swiper-lazy">
                                                                <NavLink to={`/category/view/${key}`}
                                                                         className="h-100 d-block">
                                                                    {
                                                                        get(data[key], `category_data`).map((res, i) => (
                                                                            <React.Fragment key={i}>
                                                                                <div
                                                                                    className="position-re o-hidden h-100">
                                                                                    <img src={get(res, "photo")}
                                                                                         alt={"category"}
                                                                                         loading={"lazy"}/>
                                                                                </div>
                                                                                <div className="con">
                                                                                    <h6>{
                                                                                        get(data[key], `category_id`) === 1
                                                                                            ? <>{t("category.Electric")}</>
                                                                                            : get(data[key], `category_id`) === 2
                                                                                            ? <>{t("category.Industry")}</>
                                                                                            : get(data[key], `category_id`) === 3
                                                                                                ? <>{t("category.Construction")}</>
                                                                                                : get(data[key], `category_id`) === 4
                                                                                                    ? <>{t("category.Furniture")}</>
                                                                                                    : get(data[key], `category_id`) === 5
                                                                                                        ? <>{t("category.Automotive")}</>
                                                                                                        : get(data[key], `category_id`) === 6
                                                                                                            ? <>{t("category.Custom")}</>
                                                                                                            : null
                                                                                    }</h6>
                                                                                    <h5>{get(res, `title_${language}`)}</h5>
                                                                                    <div className="line"/>
                                                                                    <i className="ti-arrow-right"/>
                                                                                </div>
                                                                                <div className={`swiper-lazy-preloader ${!isFetched ? "" : "d-none"}`}/>

                                                                            </React.Fragment>
                                                                        ))
                                                                    }

                                                                </NavLink>
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

                            {/*{

                                this.props.loading || this.props.categoryList.length === 0
                                    ? <Loader/>
                                    :

                                        {
                                            this.props.categoryList.map((projectsList, index) => {
                                                return (

                                                )
                                            })
                                        }

                                    </Swiper>
                            }*/}
                        </LoadOne>

                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Category