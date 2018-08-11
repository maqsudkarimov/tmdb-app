import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MovieItem from '../components/MovieItem';

import { LoadRecommendations } from '../actions/recommendations';
import {translate} from 'react-i18next';

class RecommendationsList extends Component {

	componentDidMount(){
		const { match, LoadRecommendations } = this.props;
		LoadRecommendations(match.params.movie_id);
	}

	render(){
		const { recommendations, isFetched, t } = this.props;

		if(!isFetched)
			return (
				<div className="recommendations">
					<div className="movie-recommendations">
						<div className="title">{t('Recommendations')}</div>
						<div className="loading-box"></div>
					</div>
				</div>
			);

		return (
			<div className="recommendations">
				{recommendations.results && recommendations.results.length > 0 && (
					<div className="movie-recommendations">
						<div className="title">{t('Recommendations')}</div>
						<div className="movies">
							<div className="movies-inner">
								{recommendations.results && recommendations.results.map(movie => (
									<MovieItem key={movie.id} movie={movie}/>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadRecommendations
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		recommendations: state.recommendations.all,
		isFetched: state.recommendations.isFetched
	};
};

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendationsList)));