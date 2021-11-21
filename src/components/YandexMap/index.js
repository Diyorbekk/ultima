import React, { useRef } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  FullscreenControl,
  GeolocationControl,
  SearchControl,
  TypeSelector
} from "react-yandex-maps";

const YandexMap = ({ onClick, onDragEnd, placeMarkCord, center, zoom, height, width }) => {
  const mapRef = useRef(null);

  return <>
    <YMaps>
      <Map
        style={{
          height,
          width
        }}
        defaultState={{
          center,
          zoom,
          controls: []
        }}
        instanceRef={ins => {
          if(ins){
            mapRef.current = ins;
            ins.events.add('click', e => {
              onClick(e.get('coords'));
            })
          }
        }}
      >
        {/*<FullscreenControl />*/}
        <ZoomControl options={{ float: "right" }} />
        {/*<GeolocationControl*/}
        {/*  options={{ float: "left" }}*/}
        {/*  // instanceRef={ins => {*/}
        {/*  //   if(ins){*/}
        {/*  //     ins.events.add('click', function (event) {*/}
        {/*  //       // console.log(event);*/}
        {/*  //       // const position = event.get('geoObjects');*/}
        {/*  //       // console.log(position);*/}
        {/*  //       // onClick(position);*/}
        {/*  //       // mapRef.current.panTo(position);*/}
        {/*  //*/}
        {/*  //       // ymaps.geolocation.get().then(function (res) {*/}
        {/*  //       //   // Assumes that jQuery is enabled on the page*/}
        {/*  //       //   var $container = $('YMapsID'),*/}
        {/*  //       //     bounds = res.geoObjects.get(0).properties.get('boundedBy'),*/}
        {/*  //       //     mapState = ymaps.util.bounds.getCenterAndZoom(*/}
        {/*  //       //       bounds,*/}
        {/*  //       //       [$container.width(), $container.height()]*/}
        {/*  //       //     ),*/}
        {/*  //       //     map = new ymaps.Map('YMapsID', mapState);*/}
        {/*  //       // }, function (e) {*/}
        {/*  //       //   console.log(e);*/}
        {/*  //       // });*/}
        {/*  //*/}
        {/*  //     });*/}
        {/*  //   }*/}
        {/*  // }}*/}
        {/*/>*/}
        {/*<SearchControl options={{ float: "right" }} />*/}
        {/*<TypeSelector options={{ float: "right" }} />*/}
        <Placemark
          // options={{ useMapMarginInDragging: true, draggable: true }}
          geometry={placeMarkCord}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
          properties={{ hintContent: "Место нахождения" }}
          // onDragEnd={e => {
          //   const coordinates = e.get("target").geometry.getCoordinates();
          //   const [latitude, longitude] = coordinates;
          //   onDragEnd([latitude, longitude]);
          // }}
        />
      </Map>
    </YMaps>
  </>
};

YandexMap.defaultProps = {
  onClick: () => {},
  onDragEnd: () => {},
  center: [41.311151, 69.279737],
  zoom: 6,
  width: "100%",
  height: 270,
};

export default YandexMap;