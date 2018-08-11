import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {translate} from 'react-i18next';
import ym from 'react-yandex-metrika';

import MoviesList from '../components/MoviesList';
import MoviesFilter from '../components/MoviesFilter';

class Home extends Component {

	static path = '/:page(\\d+)?';

	componentDidMount() {
		ym('hit', this.props.location.pathname);
	}

	render(){
		const { t } = this.props;

		return (
			<div className="movies">
				<Helmet>
					<title>{t('The Movies')}</title>
				</Helmet>
				<MoviesFilter/>
				<MoviesList/>
			</div>
		)
	}
}
export default translate('translations')(Home);