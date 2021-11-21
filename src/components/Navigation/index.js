import React from "react";
import download from "assets/images/feather_download.svg"

const Navigation = (props) => {
    return (
        <div className="content-navigation">
            <div className="d-flex align-items-center">
                <i className="content-navigation_back far fa-long-arrow-left"/>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item active" aria-current="page">Name</li>
                    </ol>
                </nav>
            </div>

            <div className="d-flex align-items-center">
                <button className="btn content-navigation_archive focus-none">Архив</button>
                <button className="btn content-navigation_download focus-none">
                    <img src={download} alt="download"/></button>
                <button className="btn content-navigation_add focus-none">Добавить</button>
                <button className="btn content-navigation_filter focus-none"><i className="fal fa-sliders-h"/>
                </button>
            </div>
        </div>
    )
}

export default Navigation