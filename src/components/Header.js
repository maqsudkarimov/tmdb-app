import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';

import config from '../config';
import { ChangeLang } from '../actions/system';
import {LoadSearchMovies} from '../actions/movies';

class Header extends Component {

	changeLang = (e, lang_id) => {
		e.preventDefault();
		const { i18n, ChangeLang } = this.props;
		ChangeLang(lang_id);
		i18n.changeLanguage(config.API_LANGUAGES.filter(lang => lang.id === Number(lang_id)).shift().code);
	};

	searchInputChange = (e) => {
		const { history } = this.props;
		let value = e.target.value;
		if(value.length > 0) {
			history.push(`/search/${value}`);
		} else {
			history.push(`/`);
		}
	};

	render(){
		const { currentLangID, t, searchText } = this.props;
		const languages = config.API_LANGUAGES;
		const currentLang = languages.filter(language => language.id === Number(currentLangID));

		return (
			<header>
				<div className="container">
					<div className="content">
						<Link to={`/`} className="logo">
							<span>{t('The Movies')}</span>
						</Link>
						<div className="header-search-field">
							<input type="text" placeholder={t('Movies, person, movie theaters')} onInput={this.searchInputChange} value={searchText}/>
							<button className="search-btn"></button>
						</div>
						<div className="languages">
							<div>
								<span>{currentLang.length > 0 ? currentLang.shift().title : languages.shift().title}</span>
							</div>
							<ul>
								{languages.map(language => (
									<li key={language.id}>
										<a href="#" className={language.id === Number(currentLangID) ? 'active' : ''} onClick={(e) => this.changeLang(e, language.id)}>{language.title}</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</header>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		ChangeLang,
		LoadSearchMovies
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		searchText: state.movies.searchText,
		currentLangID: state.system.currentLangID
	};
};
export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));