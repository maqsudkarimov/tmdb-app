import {api, storage} from '../services';

export const LOAD_MOVIES_REQUEST = 'LOAD_MOVIES_REQUEST';
export const LOAD_MOVIES_SUCCESS = 'LOAD_MOVIES_SUCCESS';
export const LOAD_MOVIES_ERROR   = 'LOAD_MOVIES_ERROR';

export const LOAD_SEARCH_MOVIES_REQUEST = 'LOAD_SEARCH_MOVIES_REQUEST';
export const LOAD_SEARCH_MOVIES_SUCCESS = 'LOAD_SEARCH_MOVIES_SUCCESS';
export const LOAD_SEARCH_MOVIES_ERROR   = 'LOAD_SEARCH_MOVIES_ERROR';

export const CHANGE_MOVIES_FILTER = 'CHANGE_MOVIES_FILTER';

export const CLEAR_SEARCH_TEXT = 'CLEAR_SEARCH_TEXT';

export const LoadMovies = (pageNumber = 1, filter = 'popular') => {
	return (dispatch) => {
		dispatch(onLoadMovies.request());
		return onLoadMovies.fetch(pageNumber, filter)
			.then(({ data }) => {
				dispatch(onLoadMovies.success(data));
			})
			.catch((error) => {
				dispatch(onLoadMovies.error(error))
			});
	}
};

const onLoadMovies = {
	request: () => ({
		type: LOAD_MOVIES_REQUEST
	}),
	fetch: (pageNumber, filter) => {
		return api.request.get(`/movie/${filter}?page=${pageNumber}`);
	},
	success: (payload) => {
		return {
			type: LOAD_MOVIES_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_MOVIES_ERROR,
		errors: payload
	})
};

export const LoadSearchMovies = (query, page = 1) => {
	return (dispatch) => {
		dispatch(onLoadSearchMovies.request(query));
		return onLoadSearchMovies.fetch(query, page)
			.then(({ data }) => {
				dispatch(onLoadSearchMovies.success(data));
			})
			.catch((error) => {
				dispatch(onLoadSearchMovies.error(error))
			});
	}
};

const onLoadSearchMovies = {
	request: (query) => ({
		type: LOAD_SEARCH_MOVIES_REQUEST,
		searchText: query
	}),
	fetch: (query, page) => {
		return api.request.get(`/search/movie?query=${query}&page=${page}`);
	},
	success: (payload) => {
		return {
			type: LOAD_SEARCH_MOVIES_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_SEARCH_MOVIES_ERROR,
		errors: payload
	})
};

export const ChangeFilter = (filter = 'popular') => {
	return (dispatch) => {
		dispatch(onChangeFilter.request(filter));
	}
};

const onChangeFilter = {
	request: (filter) => {
		storage.set('filter', filter);
		return ({
			type: CHANGE_MOVIES_FILTER,
			payload: filter
		})
	}
};

export const ClearSearchText = () => {
	return (dispatch) => {
		dispatch(onClearSearchText.request());
	}
};

const onClearSearchText = {
	request: () => {
		return ({
			type: CLEAR_SEARCH_TEXT
		})
	}
};