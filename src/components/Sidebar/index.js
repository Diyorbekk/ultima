import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import './sidebar.scss';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Avatar from 'assets/images/sidebar-avatar.jpg';
import SidebarLogo from 'assets/images/sidebar.svg';
import {useDispatch, useSelector} from "react-redux";
import Actions from 'redux/actions';
import { toast } from "react-toastify";
import get from "lodash.get";
import { Scrollbars } from "react-custom-scrollbars";
import {useTranslation} from "react-i18next";



const Sidebar = () =>  {
  const { t } = useTranslation();

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector(state => state);
  const [activeMenu, setActiveMenu] = useState(0);
  const [isCollapsed, setCollapse] = useState(false);
  const [] = useState();


  const sidebarMenus = {
    "admin": [
      {
        id: 1,
        title: t('side_bar_admin.Title'),
        path: '/admin',
        icon: 'font-size-20 fas fa-home-lg-alt mr-2'
      },
    ],
    "inspector": [
      {
        id: 1,
        title: 'Главная',
        path: '/main',
        icon: 'font-size-20 fas fa-home-lg-alt mr-2'
      },
      {
        id: 2,
        title: 'Контроль строительства',
        path: '/object',
        icon: 'font-size-22 fad fa-building mr-2',
      },
      {
        id: 3,
        title: 'Пользователи',
        path: '/users',
        icon: 'font-size-22 fas fa-user mr-2'
      },
      {
        id: 4,
        title: 'Уведомление',
        path: '/notification',
        icon: 'font-size-22 fas fa-bell mr-2'
      },
      {
        id: 5,
        title: 'Настройки',
        path: '/settings',
        icon: 'font-size-22 fad fa-cog mr-2',
      }
    ]
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
          className={`${activeMenu === menu.id || menu.path === location.pathname ? 'active-menu' : ''} py-1`}
          prefix={<i className={menu.icon}/>}
        >
          {menu.title}
          <Link to={menu.path} />
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
          width={300}
          // collapsedWidth={57}
          collapsed={isCollapsed}
        >
          <SidebarHeader className={"border-bottom-0"}>
            <div className="d-flex justify-content-between align-items-center px-4 py-3">
              <Link to="/admin" className="sidebar-logo d-inline-block">
                <img width="170px" src={SidebarLogo} alt="Sidebar Logo" />
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
                        toast.success("Bajarildi");
                        history.push("/login");
                      },
                      error: () => {
                        toast.error("Xatolik yuz berdi");
                      }
                    }
                  }));
                }}
                className={"pl-1 py-1"}
                prefix={<i className={"font-size-22 fas fa-sign-out-alt mr-2"}/>}
              >
                Выход
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter className={"border-top-0"}>
            <div className="sidebar-support">
              <a href="#!" className="sidebar-block">
                <div className="sidebar-avatar">
                  <img src={Avatar} className="rounded-circle" alt="" />
                </div>
                <div className="sidebar-block_text">
                  <p className="sidebar-support__text">Проблемы?</p>
                  <span className="sidebar-support__text">Тех-поддержка</span>
                </div>
              </a>
            </div>
          </SidebarFooter>
        </ProSidebar>
      {/*</Scrollbars>*/}
    </>
  );
};

export default Sidebar;