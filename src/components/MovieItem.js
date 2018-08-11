import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config';

import { LoadGenres } from '../actions/genres';

class MovieItem extends Component {

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){
		const { movie, genres, isFetched } = this.props;
		return (
			<div className="movie">
				<div className={`movie-rating ${movie.vote_average >= 7 && 'movie-rating-positive'}`}>{movie.vote_average}</div>
				<Link to={`/movie/${movie.id}`} className="movie-poster">
					{movie.poster_path && (
						<img src={`${config.API_IMAGE.small}/${movie.poster_path}`} onLoad={this.imageLoaded}/>
					)}
				</Link>
				<Link to={`/movie/${movie.id}`} className="movie-title">
					{movie.title}
				</Link>
				<div className="movie-genres">
					<ul className="movie-genres">
						{isFetched && movie.genre_ids.map((id, index) => {
							const item = genres.filter(genre => genre.id === id);
							if(item.length)
								return (
									<li key={id}>{isFetched && item.shift().name}{index + 1 !== movie.genre_ids.length && ', '} </li>
								)
						})}
					</ul>
				</div>
			</div>
		)
	}
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadGenres
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		genres: state.genres.all,
		isFetched: state.genres.isFetched
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);