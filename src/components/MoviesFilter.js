import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {translate} from 'react-i18next';

import {storage} from '../services';
import {ChangeFilter} from '../actions/movies';

class MoviesFilter extends Component {

	componentWillMount(){
		const filterStorage = storage.get('filter');
		if(filterStorage !== null)
			this.props.ChangeFilter(filterStorage);
	}

	ChangeFilter = (filter) => {
		this.props.ChangeFilter(filter);
	};

	render(){
		const { filter, t } = this.props;

		const filters = [
			{
				title: t('Popular'),
				slug: 'popular',
			},
			{
				title: t('Top rated'),
				slug: 'top_rated'
			},
			{
				title: t('Upcoming'),
				slug: 'upcoming',
			}
		];
		return (
			<div className="movies-filter">
				<ul>
					{filters.map(item => (
						<li key={item.slug} className={item.slug === filter  ? 'active' : ''} onClick={() => this.ChangeFilter(item.slug)}>{item.title}</li>
					))}
				</ul>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		ChangeFilter
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		filter: state.movies.filter
	};
};
export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(MoviesFilter));