import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {translate} from 'react-i18next';
import ym from 'react-yandex-metrika';

class Error extends Component {

	componentDidMount() {
		ym('hit', `ERROR - ${this.props.location.pathname}`);
	}

	render(){

		const { t } = this.props;

		return (
			<div>
				<Helmet>
					<title>{t('Error')}</title>
				</Helmet>
				<div>Error</div>
			</div>
		)
	}
}

export default translate('translations')(Error);