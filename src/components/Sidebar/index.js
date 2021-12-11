import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import './sidebar.scss';
import { Link, useLocation, useHistory } from 'react-router-dom';
import SidebarLogo from 'assets/images/logo.svg';
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import { toast } from "react-toastify";
import get from "lodash.get";
import {useTranslation} from "react-i18next";



const Sidebar = () =>  {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector(state => state);
  const [activeMenu, setActiveMenu] = useState(0);
  const [isCollapsed, setCollapse] = useState(false);


  const sidebarMenus = {
    "admin": [
      {
        id: 1,
        title: t('side_bar_admin.Slider'),
        path: ['/admin', "/admin/slider-add"],
        icon: 'font-size-20 fal fa-sliders-h mr-2',
      },
      {
        id: 2,
        title: t('side_bar_admin.About'),
        path: ['/about', "/about/about-add"],
        icon: 'font-size-20 fal fa-address-card mr-2',
      },
      {
        id: 3,
        title: t('side_bar_admin.Categories'),
        path: ['/category', "/category/about-add"],
        icon: 'font-size-20 fal fa-images mr-2',
      },
    ],
  };

  if(!get(auth, 'isAuthenticated') && location.pathname === '/login'){
    return null
  }


  const handleSidebar = menu => {

    if(!get(menu, 'children')){
      return (
        <MenuItem

          key={menu.id}
          onClick={() => setActiveMenu(menu.id)}
          className={`${menu.path[0] === location.pathname || menu.path[1] === location.pathname ? 'active-menu' : ''} py-1`}
          prefix={<i className={menu.icon}/>}
        >
          {menu.title}
          <Link to={menu.path[0]} />
        </MenuItem>
      )
    }

    return <SubMenu
      key={menu.id}
      className={"py-1"}
      title={menu.title}
      prefix={<i className={menu.icon}/>}
      defaultOpen={menu.isOpen(location.pathname)}
    >
      {get(menu,'children').map(item => handleSidebar(item))}
    </SubMenu>
  };


  return (
    <>
      {/*<Scrollbars*/}
      {/*  style={{*/}
      {/*    width: 300*/}
      {/*  }}*/}
      {/*  autoHide*/}
      {/*>*/}
        <ProSidebar
          // collapsedWidth={57}
            className="sidebar shadow"
          collapsed={isCollapsed}
        >
          <SidebarHeader className={"border-bottom-0"}>
            <div className="d-flex justify-content-between align-items-center px-4 py-3">
              <Link to="/admin" className="sidebar-logo d-inline-block">
                <img src={SidebarLogo} className="w-100 px-4"/>
              </Link>
              {/*<span onClick={() => setCollapse(prev => !prev)} className={"font-size-24"}><i className="fal fa-caret-square-left"/></span>*/}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {
                sidebarMenus["admin"].map((item) => handleSidebar(item))
              }
              <MenuItem
                onClick={() => {
                  dispatch(Actions.LOGOUT.request({
                    url: '/logout',
                    cb: {
                      success: () => {
                        toast.success(t("login.out"));
                        history.push("/");
                      },
                      error: () => {
                        toast.error(t("login.error"));
                      }
                    }
                  }));
                }}
                className={"pl-1 py-1"}
                prefix={<i className={"font-size-22 fas fa-sign-out-alt mr-2"}/>}
              >
                {t("side_bar_admin.Logout")}
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      {/*</Scrollbars>*/}
    </>
  );
};

export default Sidebar;