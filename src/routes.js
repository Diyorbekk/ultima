import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import get from 'lodash.get';

import {Header} from 'components';
import GearSpin from 'components/GearSpin';
import Sidebar from "./components/Sidebar";

//Login page
const Login = lazy(() => import('./pages/Login'));


//Admin pages
const AdminMain = lazy(() => import('./pages/Admin'));
const AdminSliderAdd = lazy(() => import('./pages/Admin/AdminMain'));


const adminRoutes = [
    {path: '/admin', exact: true, component: <AdminMain/>},
    {path: '/admin/slider-add', exact: true, component: <AdminSliderAdd/>},
];


const Routes = () => {
    const {auth} = useSelector(state => state);

    const redirectByRole = role => {
        switch (role) {
            case true:
                return 'admin';
            default:
                return "login"
        }
    };

    return (
        <Router>
            <div className={"flex-fill flex-grow-1"}>
            <Suspense fallback={<GearSpin isSpinning skipBg style={{height: '100vh'}}/>}>
                <>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={`/${redirectByRole(get(auth, 'data.registered'))}`}/>
                        </Route>
                        <Route exact path="/login" component={Login}/>

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
                                            return <Redirect to={'/login'}/>
                                        }
                                    }}
                                />
                            ))
                        }


                        <Redirect from="*" to="/login"/>
                    </Switch>
                </>
            </Suspense>
            </div>
        </Router>
    )
};

export default Routes;