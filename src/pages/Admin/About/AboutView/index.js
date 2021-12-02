import React from "react";
import Spin from "../../../../components/AntSpin";
import get from "lodash.get";
import htmlParser from "react-html-parser";
import about from "../../../../assets/images/about.jpg";
import LoadOne from "../../../../schema/Container/LoadOne";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const AboutView = () => {
    const {t} = useTranslation();
    const {system: {language}} = useSelector(state => state);
    return (
        <>
            <div className="col-12 mt-6">
                <div className="row">
                    <LoadOne
                        url={"/about.json"}
                        name={'about'}
                        asData
                    >
                        {({isFetched, data = {}}) => {
                            return <>
                                <Spin
                                    isSpinning={!isFetched}
                                    style={{display: "contents"}}
                                >


                                    {
                                        isFetched && data !== null
                                            ? Object.keys(data).length
                                            ? Object.keys(data).map((key, index) => (
                                                <React.Fragment key={index}>
                                                    <div className="col-md-6 mb-30 animate-box" data-animate-effect="1">
                                                        <h2 className="section-title">{get(data[key], `title_${language}`, "")}</h2>
                                                        {htmlParser(get(data[key], `description_${language}`, ''))}
                                                    </div>
                                                    <div className="col-md-6 animate-box" data-animate-effect="1">
                                                        <div className="about-img">
                                                            <div className="img">
                                                                <img src={get(data[key], "photo") || about}
                                                                     className="img-fluid" alt=""/>
                                                            </div>
                                                            <div
                                                                className="about-img-2 about-buro">{get(data[key], `location_${language}`)}</div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>

                                            ))
                                            : null
                                            : null
                                    }


                                </Spin>
                            </>
                        }}

                    </LoadOne>
                </div>
            </div>
        </>
    )
}

export default AboutView