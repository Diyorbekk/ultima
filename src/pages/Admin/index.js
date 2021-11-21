import React  from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const AdminHome = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();


  return (
    <>
      {t("side_bar_admin.Title")}
    </>
  );
};

export default AdminHome;