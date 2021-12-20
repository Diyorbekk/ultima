import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Footer, Header} from 'components';
import GearSpin from 'components/GearSpin';
import Sidebar from "./components/Sidebar";
import Offline from "./components/Offline";
import Navigation from "./components/Navigation";
import ToTop from "./components/ToTop";

const Client = lazy(() => import('./pages/Clients'));
const About = lazy(() => import('./pages/Admin/About/AboutView'));
const ClientCategoryView = lazy(() => import('./pages/Admin/Category/CategoryView'));

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
/* Category */
const AdminCategory = lazy(() => import('./pages/Admin/Category'))
const AdminCategoryAdd = lazy(() => import('./pages/Admin/Category/CategoryMain'))
const AdminCategoryUpdate = lazy(() => import('./pages/Admin/Category/Update'))
const AdminCategoryView = lazy(() => import('./pages/Admin/Category/CategoryView'))
/* Objects */
const AdminObjects = lazy(() => import('./pages/Admin/Objects'))
const AdminObjectsAdd = lazy(() => import('./pages/Admin/Objects/ObjectsMain'))

const publicRoutes = [
    {path: '/', exact: true, component: <Client/>},
    {path: '/about', exact: true, component: <About/>},
    {path: '/category/view/:id', exact: true, component: <ClientCategoryView/>},
];


const adminRoutes = [
    {path: '/admin', exact: true, component: <AdminMain/>},
    {path: '/admin/slider-add', exact: true, component: <AdminSliderAdd/>},
    {path: '/admin/slider/update/:id', exact: true, component: <AdminSliderUpdate/>},
    {path: '/admin/slider/view/:id', exact: true, component: <AdminSliderView/>},
    {path: '/admin/about', exact: true, component: <AdminAbout/>},
    {path: '/admin/about/about-add', exact: true, component: <AdminAboutAdd/>},
    {path: '/admin/about/update/:id', exact: true, component: <AdminAboutUpdate/>},
    {path: '/admin/about/view/:id', exact: true, component: <AdminAboutView/>},
    {path: '/admin/category', exact: true, component: <AdminCategory/>},
    {path: '/admin/category/category-add', exact: true, component: <AdminCategoryAdd/>},
    {path: '/admin/category/update/:id', exact: true, component: <AdminCategoryUpdate/>},
    {path: '/admin/category/view/:id', exact: true, component: <AdminCategoryView/>},
    {path: '/admin/objects', exact: true, component: <AdminObjects/>},
    {path: '/admin/objects/objects-add', exact: true, component: <AdminObjectsAdd/>},
];


const Routes = () => {
    const {auth} = useSelector(state => state);

    return (
        <Router>
            <Offline>
                <div className={"flex-fill flex-grow-1 position-relative"}>
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
                                                        <ToTop/>
                                                        <Navigation/>
                                                        {route.component}
                                                        <Footer/>
                                                    </>
                                                )
                                            }}
                                        />
                                    ))
                                }
                                {
                                    !auth.isAuthenticated
                                        ? null
                                        : <>
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
                                        </>
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