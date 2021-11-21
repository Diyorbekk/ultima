import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";
import { i18n } from "services";
import App from "./App";
import { api } from 'services';
import configureStore from './redux/store';
import { Spinner } from 'components';

const store = configureStore();

store.subscribe(() => {
	api.subscribe(store);
});

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner/>}>
        <I18nextProvider i18n={i18n}>
          <App/>
        </I18nextProvider>
      </Suspense>
    </Provider>,
    document.getElementById('root')
);