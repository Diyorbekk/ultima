import React from 'react';
import Nodata from "assets/images/nodata.svg";
import PropTypes from 'prop-types';

function Empty({ text, img}) {
  return (
    <>
      <div className={"w-100 d-flex flex-column justify-content-center align-items-center py-5 bg-white"}>
        <img className={"mb-1"} src={img} alt="Nodata"/>
        <div className={"text-black-50"}>{text}</div>
      </div>
    </>
  );
}

Empty.propTypes = {
  text: PropTypes.string,
  img: PropTypes.elementType
};

Empty.defaultProps = {
  text: "Ma'lumot yo'q",
  img: Nodata
};

export default Empty;