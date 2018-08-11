import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {translate} from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MoviesList from '../components/MoviesList';
import {LoadSearchMovies, ClearSearchText} from '../actions/movies';
import ym from 'react-yandex-metrika';

class Search extends Component {

	static path = '/search/:query/:page?';

	componentDidMount(){
		const { match, LoadSearchMovies } = this.props;
		LoadSearchMovies(match.params.query, match.params.page);
		ym('hit', this.props.location.pathname);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadSearchMovies, currentLangID } = this.props;
		if(Number(nextProps.currentLangID) !== Number(currentLangID) || nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
			ym('hit', `${this.props.location.pathname} ${nextProps.match.params.query}`);
		}
	}

	componentWillUnmount(){
		this.props.ClearSearchText();
	}

	render(){
		const { t } = this.props;

		return (
			<div className="movies">
				<Helmet>
					<title>{t('The Movies')}</title>
				</Helmet>
				<MoviesList/>
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadSearchMovies,
		ClearSearchText
	},
	dispatch
);

export default translate('translations')(withRouter(connect(null, mapDispatchToProps)(Search)));