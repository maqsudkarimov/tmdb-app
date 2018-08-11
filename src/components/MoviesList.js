import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';
import Pagination from "react-js-pagination";

import {LoadGenres} from '../actions/genres';
import {LoadMovies, LoadSearchMovies} from '../actions/movies';

import MovieItem from '../components/MovieItem';

class MoviesList extends Component {

	componentDidMount(){
		const { match, LoadGenres, LoadMovies, filter } = this.props;
		LoadGenres();
		LoadMovies(match.params.page, filter);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadGenres, LoadMovies, LoadSearchMovies, currentLangID, filter, searchText } = this.props;
		if(Number(nextProps.currentLangID) !== Number(currentLangID) || nextProps.filter !== filter || nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadGenres();
			if(searchText.length === 0){
				LoadMovies(nextProps.match.params.page, nextProps.filter);
			} else {
				LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
			}

		}
	}

	handlePageChange = (pageNumber) => {
		const { history, LoadMovies, filter, searchText } = this.props;
		LoadMovies(pageNumber, filter);
		pageNumber = pageNumber > 1 ? `/${pageNumber}` : '';
		if (searchText.length === 0) {
			history.push(`${pageNumber}`);
		} else {
			history.push(`/search/${searchText}${pageNumber}`);
		}
	};

	render(){
		const { movies, isFetched } = this.props;

		if(!isFetched)
			return (
				<div className="movies-list-container">
					<div className="loading-box"></div>
				</div>
			);

		return (
			<div className="movies-inner">
				{movies.results && movies.results.map(movie => (
					<MovieItem key={movie.id} movie={movie}/>
				))}
				<div className="pagination-container">
					<Pagination
						activePage={movies.page}
						itemsCountPerPage={20}
						totalItemsCount={movies.total_results}
						pageRangeDisplayed={5}
						onChange={this.handlePageChange}
						prevPageText={``}
						nextPageText={``}
						firstPageText={``}
						lastPageText={``}
					/>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadGenres,
		LoadMovies,
		LoadSearchMovies
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movies: state.movies.all,
		searchText: state.movies.searchText,
		isFetched: state.movies.isFetched,
		filter: state.movies.filter,
		currentLangID: state.system.currentLangID
	};
};

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList)));