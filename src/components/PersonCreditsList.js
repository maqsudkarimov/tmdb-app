import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';

import MovieItem from '../components/MovieItem';
import {LoadPersonMovieCredits} from '../actions/person_credits';

class PersonCreditsList extends Component {

	componentDidMount(){
		const { match, LoadPersonMovieCredits } = this.props;
		LoadPersonMovieCredits(match.params.person_id);
	}

	render(){
		const { movies, isFetched, t } = this.props;

		if(!isFetched)
			return (
				<div className="person-credits">
					<div className="title">{t('Known by')}</div>
					<div className="loading-box"></div>
				</div>
			);

		return (
			<div className="person-credits">
				<div className="title">{t('Known by')}</div>
				<div className="movies">
					<div className="movies-inner">
						{movies.map(movie => (
							<MovieItem key={movie.id} movie={movie}/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadPersonMovieCredits
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movies: state.person_credits.movies,
		isFetched: state.person_credits.isFetched
	};
};

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonCreditsList)));