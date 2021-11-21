import React from "react";

const Notification = (props) => {
    return (
        <div className="content">
            <div className="contents d-flex flex-wrap">
                <div className="col-md-6 col-12 content-col">
                    <div className="content-notification">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                            <div className="d-flex align-items-start">
                                <div>
                                    <span></span>
                                </div>
                                <p className="content-notification_title text-break">
                                    Диққат!
                                </p>
                            </div>

                            <p className="content-notification_date">
                                21/02/2021
                            </p>
                        </div>

                        <p className="content-notification_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, ac convallis sem scelerisque
                            eget. Pulvinar commodo cursus nulla sagittis eget pulvinar sagittis. Ornare eu ut ac feugiat
                            aliquet imperdiet lacus velit quis. Aliquam, porttitor tempus, arcu, vulputate eu. ac
                            convallis sem scelerisque eget. Pulvinar commodo cursus nulla sagittis eget pulvinar
                            sagittis. Ornare eu ut ac feugiat aliquet imperdiet lacus velit quis. Aliquam, porttitor
                            tempus, arcu, vulputate eu. ac convallis sem scelerisque eget. Pulvinar commodo cursus nulla
                            sagittis eget pulvinar sagittis. Ornare eu ut ac feugiat aliquet imperdiet lacus velit quis.
                            Aliquam, porttitor tempus, arcu, vulputate eu.
                        </p>

                    </div>
                </div>

                <div className="col-md-6 col-12 content-col">
                    <div className="content-notification">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                            <div className="d-flex align-items-start">
                                <p className="content-notification_title text-break">
                                    Диққат!
                                </p>
                            </div>

                            <p className="content-notification_date">
                                21/01/2021
                            </p>
                        </div>

                        <p className="content-notification_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, ac convallis sem scelerisque
                            eget. Pulvinar commodo cursus nulla sagittis eget pulvinar sagittis. Ornare eu ut ac feugiat
                            aliquet imperdiet lacus velit quis. Aliquam, porttitor tempus, arcu, vulputate eu. ac
                            convallis sem scelerisque eget. Pulvinar commodo cursus nulla sagittis eget pulvinar
                            sagittis. Ornare eu ut ac feugiat aliquet imperdiet lacus velit quis. Aliquam, porttitor
                            tempus, arcu, vulputate eu. ac convallis sem scelerisque eget. Pulvinar commodo cursus nulla
                            sagittis eget pulvinar sagittis. Ornare eu ut ac feugiat aliquet imperdiet lacus velit quis.
                            Aliquam, porttitor tempus, arcu, vulputate eu.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification