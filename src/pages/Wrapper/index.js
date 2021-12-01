import React from "react";
import {Footer,HeaderSlider} from "../../components";

const Wrapper = (props) => {
    return (
        <React.Fragment>
            <HeaderSlider/>
            {props.children}
            <Footer/>
        </React.Fragment>
    )
}

export default Wrapper