import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useHistory} from "react-router-dom";
import noConnect from "assets/images/Ooops.jpg"


const Offline = (props) => {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const history = useHistory();

    const [onlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });
        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });

        return () => {
            window.removeEventListener("offline", () => {
                setOnlineStatus(false);
            });
            window.removeEventListener("online", () => {
                setOnlineStatus(true);
            });
        };
    }, [onlineStatus]);

    const Refresh = () => {
        history.push(pathname)
    }
    return (
        <>
            {
                onlineStatus
                    ? <>{props.children}</>
                    : <div className="error-body">
                        <img src={noConnect} id="tableBanner" className="error-img" alt="No Internet"/>
                        <h3 className="error-title">{t('modalsTexts.text1')}</h3>
                        <p className="error-text mb-0">
                            {t('modalsTexts.text4')}
                        </p>
                        <p className="error-text ">
                            {t('modalsTexts.text5')}
                        </p>
                        <div className="d-flex justify-content-center align-content-center">
                            <button onClick={Refresh} className="btn btn-dark">
                                {t('modalsTexts.text6')}
                            </button>
                        </div>
                    </div>
            }
        </>

    )
}

export default Offline