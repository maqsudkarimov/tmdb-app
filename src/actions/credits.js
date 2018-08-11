import {api} from '../services';

export const LOAD_CREDITS_REQUEST = 'LOAD_CREDITS_REQUEST';
export const LOAD_CREDITS_SUCCESS = 'LOAD_CREDITS_SUCCESS';
export const LOAD_CREDITS_ERROR   = 'LOAD_CREDITS_ERROR';

export const LoadMovieCredits = (movie_id) => {
	return (dispatch) => {
		dispatch(onLoadMovieCredits.request());
		return onLoadMovieCredits.fetch(movie_id)
			.then(({ data }) => {
				dispatch(onLoadMovieCredits.success(data));
			})
			.catch((error) => {
				dispatch(onLoadMovieCredits.error(error))
			});
	}
};

const onLoadMovieCredits = {
	request: () => ({
		type: LOAD_CREDITS_REQUEST
	}),
	fetch: (movie_id) => {
		return api.request.get(`/movie/${movie_id}/credits`);
	},
	success: (payload) => {
		return {
			type: LOAD_CREDITS_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_CREDITS_ERROR,
		errors: payload
	})
};