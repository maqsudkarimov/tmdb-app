import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {translate} from 'react-i18next';
import Helmet from 'react-helmet';
import ym from 'react-yandex-metrika';

import config from '../config';

import { LoadMovie } from '../actions/movie';
import { LoadMovieCredits } from '../actions/credits';
import { LoadGenres } from '../actions/genres';

import CreditList from '../components/CreditList';
import ImagesList from '../components/ImagesList';
import RecommendationsList from '../components/RecommendationsList';

class Movie extends Component {

	static path = '/movie/:movie_id(\\d+)/:cast?';

	componentDidMount(){
		const { match, LoadMovie, LoadGenres } = this.props;
		LoadGenres();
		LoadMovie(match.params.movie_id);
		ym('hit', this.props.location.pathname);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadMovie, currentLangID } = this.props;
		if(match.params.movie_id !== nextProps.match.params.movie_id || Number(nextProps.currentLangID) !== Number(currentLangID)){
			LoadMovie(nextProps.match.params.movie_id);
		}
	}

	convertMinsToHrsMins = (mins) => {
		let h = Math.floor(mins / 60);
		let m = mins % 60;
		h = h < 10 ? h : h;
		m = m < 10 ? '0' + m : m;
		return `${h}:${m}`;
	};

	moneySpace = (money) => {
		let parts = money.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return parts.join(".");
	};

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){

		const { movie, isFetched, t } = this.props;

		if(!isFetched)
			return (
				<div className="loading-box"></div>
			);

		return (
			<div>
				<Helmet>
					<title>{movie.title} | {t('The Movies')}</title>
				</Helmet>
				<div className="movie-single">
					<div className="movie-single-inner">
						<div className={`movie-rating ${movie.vote_average >= 7 && 'movie-rating-positive'}`}>{movie.vote_average}</div>
						<div className="movie-poster">
							<img src={`${config.API_IMAGE.medium}/${movie.poster_path}`} onLoad={this.imageLoaded}/>
						</div>
						<div className="movie-details">
							<div className="movie-title">
								<span>{t('Title')}:</span>
								{movie.title}
							</div>
							{movie.overview ? (
								<div className="movie-description">
									<span>{t('Overview')}:</span>
									{movie.overview}
								</div>
							) : ''}
							{movie.release_date ? (
								<div className="movie-item">
									<span>{t('Release date')}:</span>
									{movie.release_date}
								</div>
							) : ''}
							{movie.budget ? (
								<div className="movie-item">
									<span>{t('Budget')}:</span>
									$ {this.moneySpace(movie.budget)}
								</div>
							) : ''}
							{movie.revenue ? (
								<div className="movie-item">
									<span>{t('Revenue')}:</span>
									$ {this.moneySpace(movie.revenue)}
								</div>
							) : ''}
							<div className="movie-item">
								<span>{t('Duration')}:</span>
								{this.convertMinsToHrsMins(movie.runtime)}
							</div>
							<ul className="movie-genres">
								{movie.genres && movie.genres.map(item => {
									return (
										<li key={item.id}>{item.name}</li>
									)
								})}
							</ul>
							<CreditList/>
							<ImagesList/>
						</div>
					</div>
				</div>
				<RecommendationsList/>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadMovie,
		LoadGenres,
		LoadMovieCredits
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movie: state.movie.data,
		isFetched: state.movie.isFetched,
		currentLangID: state.system.currentLangID
	};
};

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Movie));