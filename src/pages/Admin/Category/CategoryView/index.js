import React from "react";
import Banner from "assets/images/banner.png"
import LoadOne from "../../../../schema/Container/LoadOne";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Spin from "../../../../components/AntSpin";
import get from "lodash.get";
import htmlParser from "react-html-parser";
import {GalleryItem, LightBoxGallery} from "@sekmet/react-magnific-popup";

const CategoryView = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {system: {language}} = useSelector(state => state);

    const config = {
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by ULTIMA ENERGY</small>';
            }
        }
    }

    return (
        <>
            <section className="banner-header banner-img valign bg-img bg-fixed" data-overlay-light="3"
                     style={{
                         backgroundImage: `url(${Banner})`
                     }}>
            </section>
            <LoadOne
                url={"/category/" + id + ".json"}
                name={'CategoryView'}
                asData
            >
                {({isFetched, data = {}}) => {
                    return <>
                        <Spin
                            isSpinning={!isFetched}
                            style={{display: "contents"}}
                        >
                            <div className="section-padding2">
                                <div className="container">

                                    {
                                        Object.keys(data).length
                                            ? get(data, 'category_data').map((url, number) => {
                                                return (

                                                    <React.Fragment key={number}>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                {
                                                                    get(data, 'category_id') === ""
                                                                        ? null
                                                                        : <h2 className="section-title2">{
                                                                            get(data, 'category_id') === 1
                                                                                ? <>{t("category.Electric")}</>
                                                                                : get(data, 'category_id') === 2
                                                                                ? <>{t("category.Industry")}</>
                                                                                : get(data, 'category_id') === 3
                                                                                    ? <>{t("category.Construction")}</>
                                                                                    : get(data, 'category_id') === 4
                                                                                        ? <>{t("category.Furniture")}</>
                                                                                        : get(data, 'category_id') === 5
                                                                                            ? <>{t("category.Automotive")}</>
                                                                                            : get(data, 'category_id') === 6
                                                                                                ? <>{t("category.Custom")}</>
                                                                                                : null
                                                                        }</h2>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                {htmlParser(get(url, `description_${language}`, ''))}
                                                            </div>
                                                            <div className="col-md-4">
                                                                <p><b>Category : </b> {get(url, `title_${language}`)}</p>
                                                            </div>
                                                        </div>
                                                        <LightBoxGallery
                                                            className="popup-gallery"
                                                            config={config}
                                                        >
                                                            {
                                                                get(url, 'photo').length
                                                                    ? get(url, 'photo').map((item, key) => {
                                                                        return <div className="col-md-6" key={key}>
                                                                            <GalleryItem
                                                                                className="gallery-item"
                                                                                href={item}
                                                                                title={get(data, 'category_id') === "" ? null : get(data, 'category_id') === 1 ? t("category.Electric") : get(data, 'category_id') === 2 ? t("category.Industry")
                                                                                            : get(data, 'category_id') === 3
                                                                                                ? t("category.Construction")
                                                                                                : get(data, 'category_id') === 4
                                                                                                    ? t("category.Furniture")
                                                                                                    : get(data, 'category_id') === 5
                                                                                                        ? t("category.Automotive")
                                                                                                        : get(data, 'category_id') === 6
                                                                                                            ? t("category.Custom")
                                                                                                            : null
                                                                                    }
                                                                            >
                                                                                <div className="gallery-box">
                                                                                    <div className="gallery-img">
                                                                                        <img src={item}
                                                                                             className="img-fluid mx-auto d-block"
                                                                                             loading={"lazy"}
                                                                                             alt="work-img"/>
                                                                                    </div>
                                                                                </div>
                                                                            </GalleryItem>
                                                                        </div>
                                                                    })
                                                                    : null
                                                            }
                                                        </LightBoxGallery>

                                                    </React.Fragment>
                                                )
                                            })
                                            : null
                                    }

                                </div>
                            </div>
                        </Spin>
                    </>
                }}

            </LoadOne>

            {/*{
                this.props.loading || !this.props.newsPageSingle
                    ? <Loader/>
                    : <React.Fragment>{
                        this.props.newsPageSingle.map((single, index) => {
                            return (
                                <section className="pb-90" key={index}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <img src={single.projectImgUrl} className="mb-30" alt=""/>
                                                <h2 className="section-title2">{single.projectTitle}</h2>
                                                <p dangerouslySetInnerHTML={{__html: single.projectText}}/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )
                        })}
                    </React.Fragment>
            }*/}

            {/*<section className="projects-prev-next">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-sm-flex align-items-center justify-content-between">
                                {
                                    !this.props.newsPageSingle
                                        ? <Loader/>
                                        : <React.Fragment>
                                            <div className="projects-prev-next-left">
                                                {
                                                    this.props.previous === null

                                                        ? <NavLink to={"/project"} className="invisible"> <i
                                                            className="ti-arrow-left"/> Previous
                                                            Project</NavLink>
                                                        : <NavLink to={this.props.previous}> <i
                                                            className="ti-arrow-left"/> Previous
                                                            Project</NavLink>
                                                }

                                            </div>
                                            <NavLink to={"/news-blog"}><i className="ti-layout-grid3-alt"/></NavLink>
                                            <div className="projects-prev-next-right">
                                                {
                                                    this.props.nextProps === null

                                                        ? <NavLink to={"/project"} className="invisible">Next Project <i
                                                            className="ti-arrow-right"/></NavLink>
                                                        : <NavLink to={this.props.nextProps}>Next Project <i
                                                            className="ti-arrow-right"/></NavLink>
                                                }
                                            </div>
                                        </React.Fragment>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>*/}
        </>
    )
}

export default CategoryView