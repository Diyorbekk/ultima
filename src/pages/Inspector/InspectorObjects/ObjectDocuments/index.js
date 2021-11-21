import React from "react";
import get from "lodash.get";


const ObjectDocuments = ({files}) => {
    return (
        <>
            {
                files.map((item, index) => (
                    <div className="document-group" key={index}>
                        <div
                            className="document-item d-flex align-items-center justify-content-between bg-white p-lg-4 p-3 pr-lg-5 rounded-3 mb-2">
                            <div className="d-flex align-items-center">
                                <span className="text-secondary mr-4">
                                    <i className="fas fa-file-download fa-2x"/>
                                    <span className="document-type">
                                        {get(item, 'type', '')}
                                    </span>
                                </span>
                                <span className="font-size-20 fw-medium">
                                {get(item, 'description', '')}
                                </span>
                            </div>

                            <a href={get(item, 'file','')} target={"_blank"} rel="noopener noreferrer"
                               download={get(item, `file`,'')} className="text-primary">
                                <i className="fal fa-arrow-to-bottom fa-2x"/>
                            </a>

                        </div>

                    </div>
                ))
            }
        </>

    )
}

export default ObjectDocuments