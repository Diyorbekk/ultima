import React, {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {NavLink, Route, Switch, useParams, useLocation, Link} from 'react-router-dom';
import Spinner from "../../../components/Spinner";
import {LoadOne} from "../../../schema/Container";
import GearSpin from "../../../components/GearSpin";


const ObjectMain = lazy(() => import('./ObjectMain'));
const ObjectDocuments = lazy(() => import('./ObjectDocuments'));
const ObjectVerificationDestroyed = lazy(() => import('./ObjectVerificationDestroyed'));
const ObjectMonitoring = lazy(() => import('./ObjectMonitoring'));
const ObjectParticipants = lazy(() => import('./ObjectParticipants'));
const ObjectMonitoringCreate = lazy(() => import('./ObjectMonitoringCreate'));
const ObjectVerificationCreate = lazy(() => import('./ObjectVerificationCreate'));
const ObjectRemark = lazy(() => import('./ObjectRemark'));
const RemarkView = lazy(() => import('./RemarkView'));

const InspectorObject = () => {
    const {id} = useParams();
    const {pathname} = useLocation();

    return (
        <div className="content mt-5">
            <div className="content-navigation justify-content-start mb-4">
                <i className="fas fa-arrow-left content-navigation_title"/>
                <Link to={`/object`} className="d-flex content-navigation_title">
                    <p className="content-navigation_title ml-3">Объекты</p>
                </Link>

                {
                    pathname === `/object/monitoring-create/${id}` ||
                    pathname === `/object/verification-create/${id}` ||
                    pathname === `/object/remark-list/${id}`
                        ? <><i className="fas fa-chevron-left content-navigation_title ml-3 mr-2"/>
                            <Link to={`/object/monitoring/${id}`} className="d-flex content-navigation_title">
                                <p className="content-navigation_title">Назад</p>
                            </Link></>
                        : pathname === `/object/remark-view/${id}`
                        ? <><i className="fas fa-chevron-left content-navigation_title ml-3 mr-2"/>
                            <Link to={`/object/remark-list/${id}`} className="d-flex content-navigation_title">
                                <p className="content-navigation_title">Назад</p>
                            </Link></>
                        : null
                }
            </div>

            <div className="d-flex align-items-center mb-5 flex-xl-nowrap flex-wrap">
                <NavLink className="info-buttons btn btn-lg focus-none px-lg-5 mr-xl-4 w-xl-auto mt-xl-0 w-100 py-lg-3"
                         to={`/object/main/${id}`} exact>Главный</NavLink>
                <NavLink
                    className="info-buttons btn btn-lg focus-none px-lg-5 mr-xl-4 w-xl-auto mt-xl-0 mt-3 w-100 py-lg-3"
                    to={`/object/documents/${id}`} exact>Документы</NavLink>
                <NavLink
                    className="info-buttons btn btn-lg focus-none px-lg-5 mr-xl-4 w-xl-auto mt-xl-0 mt-3 w-100 py-lg-3"
                    to={`/object/monitoring/${id}`}
                    isActive={() => [
                        `/object/monitoring/${id}`,
                        `/object/monitoring-create/${id}`,
                        `/object/verification-create/${id}`,
                        `/object/verification-destroyed/${id}`,
                        `/object/remark-list/${id}`,
                        `/object/remark-view/${id}`
                    ].includes(pathname)}>Мониторинг</NavLink>
                <NavLink
                    className="info-buttons btn btn-lg focus-none px-lg-5 mr-xl-4 w-xl-auto mt-xl-0 mt-3 w-100 py-lg-3"
                    to={`/object/participants/${id}`} exact>Участники</NavLink>
                <NavLink
                    className="info-buttons btn btn-lg focus-none px-lg-5 mr-xl-4 w-xl-auto mt-xl-0 mt-3 w-100 py-lg-3"
                    to={`/object/history/${id}`} exact>История
                </NavLink>
            </div>
            <LoadOne
                url={`/object-control/object/${id}`}
                name={'object'}
                asData
            >
                {({isFetched, data = {}}) => {

                    return <>
                        {
                            isFetched && Object.keys(data).length
                                ? <>
                                    <Suspense fallback={<GearSpin isSpinning skipBg style={{height: '100%'}}/>}>
                                        <>
                                            <Switch>

                                                <Route
                                                    exact
                                                    path={`/object/main/${id}`}
                                                    children={<ObjectMain
                                                        url={id}
                                                        name_building={data.name_building}
                                                        customers={data.responsibles.customers.map(item => item.info)}
                                                        contractors={data.responsibles.contractors.map(item => item.info)}
                                                        planners={data.responsibles.planners.map(item => item.info)}
                                                        map_lt={data.map_lt}
                                                        map_ln={data.map_ln}
                                                    />}
                                                />

                                                <Route
                                                    exact
                                                    path={`/object/documents/${id}`}
                                                    children={<ObjectDocuments
                                                        files={data.files}
                                                    />}
                                                />
                                                <Route
                                                    exact
                                                    path={`/object/monitoring/${id}`}
                                                    children={
                                                        <ObjectMonitoring
                                                            url={id}
                                                        />
                                                    }
                                                >
                                                </Route>

                                                <Route
                                                    exact
                                                    path={`/object/participants/${id}`}
                                                    children={<ObjectParticipants
                                                        planners={data.responsibles.planners}
                                                        customers={data.responsibles.customers}
                                                        contractors={data.responsibles.contractors}
                                                    />}
                                                />
                                                <Route
                                                    exact
                                                    path={`/object/monitoring-create/${id}`}
                                                    children={<ObjectMonitoringCreate id={id}/>}
                                                />
                                                <Route
                                                    exact
                                                    path={`/object/verification-create/${id}`}
                                                    children={<ObjectVerificationCreate url={id}/>}
                                                />

                                                <Route
                                                    exact
                                                    path={`/object/verification-destroyed/${id}`}
                                                    children={<ObjectVerificationDestroyed url={id}/>}
                                                />
                                                <Route
                                                    exact
                                                    path={`/object/remark-list/${id}`}
                                                    children={<ObjectRemark url={id}/>}
                                                />

                                                <Route
                                                    exact
                                                    path={`/object/remark-view/${id}`}
                                                    children={<RemarkView url={id}/>}
                                                />

                                            </Switch>
                                        </>
                                    </Suspense>
                                </>
                                : null
                        }
                    </>
                }}
            </LoadOne>

        </div>
    )
}

export default InspectorObject