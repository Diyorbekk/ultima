import React from 'react';
import Logo from 'assets/images/login2.png';
import MyForm from 'components/MyForm';
import { Field } from 'formik';
import {useTranslation} from "react-i18next";
import Actions from 'redux/actions';
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";


const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const createErrorClass = (errors, touched, name) => `${errors[name] && touched[name] ? 'is-invalid' : (touched[name] && !errors[name]) ? 'is-valid' : ''}`;

  return (
    <>
      <div className="login d-flex row-cols-md-2 row-cols-1">
        <div className="login-left pt-5">
          <div className="h-100 row justify-content-center">
            <div className="col-10 col-sm-10 col-md-12 col-xxl-6 col-xl-9">
              <div className="h-100  d-flex flex-column align-items-center p-xxl-5 p-xl-4">
                <img src={Logo} alt="Shaffof Qurilish"/>
                  <div className="text-primary fw-semibold text-center px-md-3 mt-3">Информационная система контроля
                    качества строительства
                  </div>

                  <MyForm
                    className="w-100 px-md-5 pt-5 pb-4"
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
                            toast.success("Tizimga kririldi");
                            resetForm();
                            if(data.registered === true){
                              history.push("/admin");
                            }
                          },
                          error: () => {
                            toast.error("Login yoki parol noto'g'ri");
                          },
                          finally: () => {
                            setSubmitting(false);
                          },
                        }
                      }))
                    }}
                  >
                    {({ touched, errors, isSubmitting }) => {
                      return <>
                        <div className="form-group mb-4">
                          <label
                            className="d-block text-secondary mb-2 font-size-14 text-left"
                            htmlFor="login"
                          >Login</label>
                          <Field
                            className={`form-control form-control-sm w-100 bg-pink focus-none p-md-3 ${createErrorClass(errors, touched, 'login')}`}
                            type="text"
                            id="login"
                            name={"email"}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <label className="d-block text-secondary mb-2 font-size-14" htmlFor="password">Password</label>
                          <Field
                            name={"password"}
                            className={`form-control form-control-sm w-100 bg-pink focus-none p-md-3 ${createErrorClass(errors, touched, 'password')}`}
                            id="password"
                            type="password"
                          />
                        </div>
                        <button type={"submit"} className="btn btn-primary btn-md focus-none w-100 fw-semibold text-white pt-12 pb-12">
                          {
                            isSubmitting
                            ? <i className="far fa-spinner fa-spin mr-2"/>
                            : null
                          }
                          Кириш
                        </button>
                      </>
                    }}
                  </MyForm>

                  <a className="text-dark fw-semibold login-forgot text-decoration-underline" href="#!">Забыли
                    пароль?</a>
                  <div className="flex-fill"/>
                  <div className="pt-5 pb-3 text-center">
                    <p className="login-support">Служба технической поддержки:</p>
                    <a className="login-phone fw-medium" href="tel:+99872036090">+998 7 203 60 90</a>
                    <a className="login-mail fw-medium" href="mailto:support@it.mc.uz">support@it.mc.uz</a>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className="has-bg login-bg"/>
      </div>
    </>
  );
};

export default Login;