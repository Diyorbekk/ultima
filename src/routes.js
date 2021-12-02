import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Footer, Header, HeaderSlider} from 'components';
import GearSpin from 'components/GearSpin';
import Sidebar from "./components/Sidebar";
import Offline from "./components/Offline";
import Navigation from "./components/Navigation";
import ToTop from "./components/ToTop";

const Client = lazy(() => import('./pages/Clients'));

//Login page
const Login = lazy(() => import('./pages/Login'));


//Admin pages
/* Slider */
const AdminMain = lazy(() => import('./pages/Admin/Slider'));
const AdminSliderAdd = lazy(() => import('./pages/Admin/Slider/AdminMain'));
const AdminSliderUpdate = lazy(() => import('./pages/Admin/Slider/Update'));
const AdminSliderView = lazy(() => import('./pages/Admin/Slider/SliderView'));
/* About Us */
const AdminAbout = lazy(() => import('./pages/Admin/About'))
const AdminAboutAdd = lazy(() => import('./pages/Admin/About/AboutMain'))
const AdminAboutUpdate = lazy(() => import('./pages/Admin/About/Update'));
const AdminAboutView = lazy(() => import('./pages/Admin/About/AboutView'));

const publicRoutes = [
    {path: '/', exact: true, component: <Client/>},
];


const adminRoutes = [
    {path: '/admin', exact: true, component: <AdminMain/>},
    {path: '/admin/slider-add', exact: true, component: <AdminSliderAdd/>},
    {path: '/admin/slider/update/:id', exact: true, component: <AdminSliderUpdate/>},
    {path: '/admin/slider/view/:id', exact: true, component: <AdminSliderView/>},
    {path: '/about', exact: true, component: <AdminAbout/>},
    {path: '/about/about-add', exact: true, component: <AdminAboutAdd/>},
    {path: '/about/update/:id', exact: true, component: <AdminAboutUpdate/>},
    {path: '/about/view/:id', exact: true, component: <AdminAboutView/>},
];


const Routes = () => {
    const {auth} = useSelector(state => state);

    return (
        <Router>
            <Offline>
                <div className={"flex-fill flex-grow-1"}>
                    <Suspense fallback={<GearSpin isSpinning style={{height: '100vh', width: "100%"}}/>}>
                        <>
                            <Switch>
                                <Route exact path="/login" component={Login}/>
                                {
                                    publicRoutes.map((route, key) => (
                                        <Route
                                            key={key}
                                            path={route.path}
                                            exact={route.exact}
                                            render={() => {
                                                return (
                                                    <>
                                                        <div>
                                                            <ToTop/>
                                                            <Navigation/>
                                                            <HeaderSlider/>
                                                            {route.component}
                                                            <Footer/>
                                                        </div>
                                                    </>
                                                )
                                            }}
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
            </Offline>
        </Router>
    )
};

export default Routes;