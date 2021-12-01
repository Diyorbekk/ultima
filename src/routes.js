import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";

import {Header} from 'components';
import GearSpin from 'components/GearSpin';
import Sidebar from "./components/Sidebar";

const Wrapper = lazy(() => import('./pages/Wrapper'));

//Login page
const Login = lazy(() => import('./pages/Login'));


//Admin pages
const AdminMain = lazy(() => import('./pages/Admin'));
const AdminSliderAdd = lazy(() => import('./pages/Admin/Slider/AdminMain'));
const AdminSliderUpdate = lazy(() => import('./pages/Admin/Slider/Update'));
const AdminSliderView = lazy(() => import('./pages/Admin/Slider/SliderView'));

const publicRoutes = [
    {path: '/', exact: true, component: Wrapper},
    {path: '/login-admin', exact: true, component: Login},
];


const adminRoutes = [
    {path: '/admin', exact: true, component: <AdminMain/>},
    {path: '/admin/slider-add', exact: true, component: <AdminSliderAdd/>},
    {path: '/admin/slider/update/:id', exact: true, component: <AdminSliderUpdate/>},
    {path: '/admin/slider/view/:id', exact: true, component: <AdminSliderView/>},
];


const Routes = () => {
    const {auth} = useSelector(state => state);

    return (
        <Router>
            <div className={"flex-fill flex-grow-1"}>
            <Suspense fallback={<GearSpin isSpinning style={{height: '100vh', width: "100%"}}/>}>
                <>
                    <Switch>
                        {
                            publicRoutes.map((route, key) => (
                                <Route
                                    key={key}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))
                        }

                        {
                            adminRoutes.map((route, key) => (
                                <Route
                                    key={key}
                                    path={route.path}
                                    exact={route.exact}
                                    render={() => {
                                        if (auth.isAuthenticated) {
                                            return (
                                                <>
                                                    < Header/>
                                                    <div className={"flex-fill flex-grow-1 d-flex"}>
                                                        <Sidebar/>
                                                        <div
                                                            className={"wrapper-block pt-100 pb-50 w-100 overflowY-auto vh-100 px-lg-4 px-3"}>
                                                            <div className={"device-wrapper"}>
                                                                {route.component}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        } else {
                                            return <Redirect to={'/'}/>
                                        }
                                    }}
                                />
                            ))
                        }



                        <Redirect from="*" to="/"/>
                    </Switch>
                </>
            </Suspense>
            </div>
        </Router>
    )
};

export default Routes;