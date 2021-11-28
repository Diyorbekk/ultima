import React from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import add from "../../assets/images/add.png";
import LoadOne from "../../schema/Container/LoadOne";


const AdminHome = () => {
    const {t} = useTranslation();


    return (
        <>
            <div className="col-12 mt-5">
                <div className="row">
                    <div className="col-md-3">
                    </div>

                    <div className="col-md-3">
                        <NavLink to={`/admin/slider-add`}
                                 className="border rounded d-flex align-items-center justify-content-center">
                            <img src={add} style={{width: 150}} alt="icon-add"/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;