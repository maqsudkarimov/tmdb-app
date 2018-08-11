import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';

import App from './App';
import store from './store';
import i18n from './i18n';

render(
	<Provider store={store}>
		<I18nextProvider i18n={i18n()}>
			<Router>
				<App/>
			</Router>
		</I18nextProvider>
	</Provider>,
	document.getElementById('root')
);