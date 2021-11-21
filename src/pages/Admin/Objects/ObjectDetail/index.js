import React from 'react';
import {
  useParams,
  Link,
  NavLink,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LoadOne } from 'schema/Container';
import ObjectInfo from '../components/ObjectInfo';
import Documents from '../components/Documents';
import Monitoring from '../components/Monitoring';
import History from '../components/History';
import Users from '../components/Users';
import Empty from 'components/Empty';


const ObjectView = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (<>
      <div id="homepage2" className="px-lg-4 px-3 flex-fill">
        <div className="pt-4 pb-5">
          <Link className="text-black-50 cursor-pointer" to={"/admin/construction-control/objects/list"}>
            <span className="mr-2"><i className="fa fa-arrow-left" /></span>
            <span>Список объектов</span>
          </Link>
        </div>

        <div className="d-flex align-items-center mb-5">
          <NavLink
            className="info-buttons btn btn-lg focus-none px-lg-5 mr-4 fw-medium py-lg-3 font-size-18"
            to={`/admin/construction-control/objects/${id}/detail`}
            isActive={(match,params) => params.pathname === `/admin/construction-control/objects/${id}/detail`}
          >Главный</NavLink>
          <NavLink
            className="info-buttons btn btn-lg focus-none px-lg-5 mr-4 fw-medium py-lg-3 font-size-18"
            to={`/admin/construction-control/objects/${id}/detail/documents`}
          >Документы</NavLink>
          <NavLink
            className="info-buttons btn btn-lg focus-none px-lg-5 mr-4 fw-medium py-lg-3 font-size-18"
            to={`/admin/construction-control/objects/${id}/detail/monitoring`}
          >Мониторинг</NavLink>
          <NavLink
            className="info-buttons btn btn-lg focus-none px-lg-5 mr-4 fw-medium py-lg-3 font-size-18"
            to={`/admin/construction-control/objects/${id}/detail/users`}
          >Участники</NavLink>
          <NavLink
            className="info-buttons btn btn-lg focus-none px-lg-5 mr-4 fw-medium py-lg-3 font-size-18"
            to={`/admin/construction-control/objects/${id}/detail/history`}
          >История</NavLink>
        </div>

        <div className="mb-3">
          <LoadOne
            url={`/object-control/object/${id}`}
            name={"objectView"}
            asData
          >
            {({ isFetched, data={}}) => {

              return <>
                <Switch>
                  <Route
                    exact
                    path={`/admin/construction-control/objects/${id}/detail`}
                    render={params => <ObjectInfo {...params} {...{isFetched, data, empty: <Empty />}} />}
                  />
                  <Route
                    exact
                    path={`/admin/construction-control/objects/${id}/detail/documents`}
                    render={params => <Documents {...params} {...{isFetched, data, empty: <Empty />}} />}
                  />
                  <Route
                    exact
                    path={`/admin/construction-control/objects/${id}/detail/monitoring`}
                    render={params => <Monitoring {...params} {...{isFetched, id, empty: <Empty />}} />}
                  />
                  <Route
                    exact
                    path={`/admin/construction-control/objects/${id}/detail/users`}
                    render={params => <Users {...params} {...{isFetched, data, empty: <Empty />}} />}
                  />
                  <Route
                    exact
                    path={`/admin/construction-control/objects/${id}/detail/history`}
                    render={params => <History {...params} {...{isFetched, data, empty: <Empty />}} />}
                  />
                  <Redirect to={`/admin/construction-control/objects/${id}/detail`} />
                </Switch>
              </>
            }}
          </LoadOne>
        </div>
      </div>
    </>
  )
};

export default ObjectView;