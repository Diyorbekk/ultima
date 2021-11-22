import React, {useState} from 'react';
import Logo from 'assets/images/logo-login.svg';
import LogoBg from 'assets/images/login-bg.png';
import MyForm from 'components/MyForm';
import {Field} from 'formik';
import {useTranslation} from "react-i18next";
import Actions from 'redux/actions';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {toast} from "react-toastify";


const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const {system: {language}} = useSelector(state => state);
    console.log(language)

    const handleLangChange = evt => {
        const lang = evt.target.value;
        dispatch(Actions.CHANGE_LANG.success(lang))
    };

    const createErrorClass = (errors, touched, name) => `${errors[name] && touched[name] ? 'is-invalid' : (touched[name] && !errors[name]) ? 'is-valid' : ''}`;

    return (
        <>
            <div className="login">

                <div className="col-lg-6 h-100 has-bg login-bg" style={{backgroundImage: `url(${LogoBg})`}}/>

                <div className="col-lg-6 login-right">
                    <div className="login-right_block position-relative">
                        <select onChange={handleLangChange} value={language} className="form-control login-language w-auto text-secondary focus-none">
                            <option value={"uz"}>UZB</option>
                            <option value={"ru"}>RUS</option>
                            <option value={"en"}>ENG</option>
                        </select>
                        <img src={Logo} alt="Shaffof Qurilish"/>
                        <p className="login-right_block__title">Sign in to Dashboard</p>
                        <MyForm
                            className="w-100"
                            t={t}
                            fields={[
                                {
                                    name: 'email',
                                    value: '',
                                    required: true,
                                    type: 'email'
                                },
                                {
                                    name: 'password',
                                    value: '',
                                    required: true
                                }
                            ]}
                            onSubmit={({values, resetForm, setSubmitting}) => {
                                dispatch(Actions.LOGIN.request({
                                    url: 'accounts:signInWithPassword?key=AIzaSyCgH6DZV7luZ7Ib8ESaUqwHMo8M1R19mH4',
                                    values,
                                    cb: {
                                        success: data => {
                                            toast.success(t("login.entered"));
                                            resetForm();
                                            if (data.registered === true) {
                                                history.push("/admin");
                                            }
                                        },
                                        error: () => {
                                            toast.error(t("login.error-login"));
                                        },
                                        finally: () => {
                                            setSubmitting(false);
                                        },
                                    }
                                }))
                            }}
                        >
                            {({touched, errors, isSubmitting}) => {
                                return <>
                                    <div className="form-group">
                                        <label className="login-right_block__label"
                                               htmlFor="login">Email</label>
                                        <Field
                                            className={`form-control login-right_block__form bg-white focus-none ${createErrorClass(errors, touched, 'email')}`}
                                            type="text"
                                            id="login"
                                            placeholder={t("login.email")}
                                            name={"email"}
                                        />
                                    </div>

                                    <label className="login-right_block__label"
                                           htmlFor="password">Password</label>

                                    <div className={`input-group login-group_input mb-3 ${createErrorClass(errors, touched, 'password')}`}>
                                        <Field
                                            name={"password"}
                                            className={`form-control login-right_block__form focus-none border-right-0`}
                                            id="password"
                                            type={passwordShown ? "text" : "password"}
                                        />
                                        <div className="input-group-append" id="password_eye" onClick={() => setPasswordShown(prevState => !prevState)}>
                                                <span className="input-group-text login-right_block__icon bg-white"
                                                      id="basic-addon2">
                                                    <i className={`fas fa-eye-slash text-black-50 ${passwordShown ? 'fa-eye' : 'fa-eye-slash'}`}/>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button type={"submit"}
                                                className="btn btn-primary bg-primary login-right_block__btn">
                                            {
                                                isSubmitting
                                                    ? <i className="far fa-spinner fa-spin mr-2"/>
                                                    : null
                                            }
                                            {t("login.enter")}
                                        </button>
                                    </div>

                                </>
                            }}
                        </MyForm>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;