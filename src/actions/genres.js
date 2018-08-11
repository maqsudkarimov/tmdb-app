import {api} from '../services';

export const LOAD_GENRES_REQUEST = 'LOAD_GENRES_REQUEST';
export const LOAD_GENRES_SUCCESS = 'LOAD_GENRES_SUCCESS';
export const LOAD_GENRES_ERROR   = 'LOAD_GENRES_ERROR';

export const LoadGenres = () => {
	return (dispatch) => {
		dispatch(onLoadGenres.request());
		return onLoadGenres.fetch()
			.then(({ data }) => {
				dispatch(onLoadGenres.success(data));
			})
			.catch((error) => {
				dispatch(onLoadGenres.error(error))
			});
	}
};

const onLoadGenres = {
	request: () => ({
		type: LOAD_GENRES_REQUEST
	}),
	fetch: () => {
		return api.request.get('/genre/movie/list');
	},
	success: (payload) => {
		return {
			type: LOAD_GENRES_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_GENRES_ERROR,
		errors: payload
	})
};