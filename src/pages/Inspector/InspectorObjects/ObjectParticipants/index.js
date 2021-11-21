import React from "react";

const index = ({planners, customers, contractors}) => {
    return (
        <div className="table-responsive">
            <table className="table table-borderless table-separate spaceY-1">
                <tbody className="row-bg-white">
                {
                    planners.map((item, index) => (
                        <tr key={index} className="rounded-2">
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-start w-50">
                                    <span className="font-size-22 text-secondary">
                                        {item.info}
                                    </span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle w-20"><span
                                className="text-black-50">{item.login}</span></td>
                            <td className="fw-medium p-3 p-lg-4 align-middle w-20"><span
                                className="text-black-50">Проектировшик</span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-end text-primary">
                                    <span className="d-flex align-items-center">
                                        <a className="fw-normal" href={`tel:${item.phone}`}>
                                            {item.phone}
                                        </a>
                                        <i className="ml-3 fa fa-phone-alt"/>
                                    </span>
                            </td>
                        </tr>
                    ))
                }
                {
                    customers.map((item, index) => (
                        <tr key={index} className="rounded-2">
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-start w-50">
                                    <span className="font-size-22 text-secondary">
                                        {item.info}
                                    </span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle w-20"><span
                                className="text-black-50">{item.login}</span></td>
                            <td className="fw-medium p-3 p-lg-4 align-middle w-20"><span
                                className="text-black-50">Проектировшик</span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-end text-primary">
                                    <span className="d-flex align-items-center">
                                        <a className="fw-normal" href={`tel:${item.phone}`}>
                                            {item.phone}
                                        </a>
                                        <i className="ml-3 fa fa-phone-alt"/>
                                    </span>
                            </td>
                        </tr>
                    ))
                }
                {
                    contractors.map((item, index) => (
                        <tr key={index} className="rounded-2">
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-start w-50">
                                    <span className="font-size-22 text-secondary">
                                        {item.info}
                                    </span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle w-20"><span
                                className="text-black-50">{item.login}</span></td>
                            <td className="fw-medium p-3 p-lg-4 align-middle w-20"><span
                                className="text-black-50">Проектировшик</span>
                            </td>
                            <td className="fw-medium p-3 p-lg-4 align-middle rounded-end text-primary">
                                    <span className="d-flex align-items-center">
                                        <a className="fw-normal" href={`tel:${item.phone}`}>
                                            {item.phone}
                                        </a>
                                        <i className="ml-3 fa fa-phone-alt"/>
                                    </span>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default index