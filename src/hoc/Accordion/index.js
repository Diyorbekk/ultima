import React from "react";

const Accordion = (props) => {
    let classNameActive = "active"
    let ParentElement = props.target.offsetParent
    let panel = ParentElement.previousElementSibling
    ParentElement.classList.toggle(classNameActive)
    if (panel.style.height === panel.scrollHeight + "px")
        panel.style.height = 0;
    else
        panel.style.height = panel.scrollHeight + "px";
}

export default Accordion