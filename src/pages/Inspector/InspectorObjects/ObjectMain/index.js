import React from "react";
import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark,
    SearchControl,
    YMaps,
    ZoomControl
} from "react-yandex-maps";

const ObjectMain = ({name_building, customers, contractors, planners, map_lt, map_ln}) => {

    return (
        <>
            <div className="bg-white rounded-3 p-lg-4 p-3 mb-3">
                <h1 className="mb-4 font-size-26">Информация об объекте</h1>
                <div className="row mb-3">
                    <div className="col-md-2">
                        <span className="fw-medium">Наименование:</span>
                    </div>
                    <div className="col-md-9">
                        <p className="m-0 text-primary fw-medium">
                            {name_building}
                        </p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-2">
                        <span className="fw-medium">Заказчик:</span>
                    </div>
                    <div className="col-md-9">
                        <p className="m-0 fw-medium">
                            {customers}
                        </p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-2">
                        <span className="fw-medium">Подрядчик:</span>
                    </div>
                    <div className="col-md-9">
                        <p className="m-0 fw-medium">
                            {contractors}
                        </p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-2">
                        <span className="fw-medium">Проектировшик:</span>
                    </div>
                    <div className="col-md-9">
                        <p className="m-0 fw-medium">
                            {planners}
                        </p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-2">
                        <span className="fw-medium">Площадь земле:</span>
                    </div>
                    <div className="col-md-9">
                        <p className="m-0 fw-medium">-</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-2">
                        <span className="fw-medium">Площадь строительства:</span>
                    </div>
                    <div className="col-md-9">
                        <p className="m-0 fw-medium">-</p>
                    </div>
                </div>
            </div>

            <div className="info-map has-bg">
                <YMaps>
                    <Map
                        width={"100%"}
                        height={600}
                        defaultState={{
                            center: [map_lt, map_ln],
                            zoom: 12,
                        }}
                    >
                        <Placemark geometry={[map_lt, map_ln]}/>
                        <ZoomControl/>
                        <FullscreenControl/>
                        <SearchControl/>
                        <GeolocationControl/>
                    </Map>
                </YMaps>
            </div>
        </>
    )
}

export default ObjectMain