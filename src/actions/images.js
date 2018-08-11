import {api} from '../services';

export const LOAD_IMAGES_REQUEST = 'LOAD_IMAGES_REQUEST';
export const LOAD_IMAGES_SUCCESS = 'LOAD_IMAGES_SUCCESS';
export const LOAD_IMAGES_ERROR   = 'LOAD_IMAGES_ERROR';

export const LoadMovieImages = (movie_id) => {
	return (dispatch) => {
		dispatch(onLoadMovieImages.request());
		return onLoadMovieImages.fetch(movie_id)
			.then(({ data }) => {
				dispatch(onLoadMovieImages.success(data));
			})
			.catch((error) => {
				dispatch(onLoadMovieImages.error(error))
			});
	}
};

const onLoadMovieImages = {
	request: () => ({
		type: LOAD_IMAGES_REQUEST
	}),
	fetch: (movie_id) => {
		return api.requestWOL.get(`/movie/${movie_id}/images`);
	},
	success: (payload) => {
		return {
			type: LOAD_IMAGES_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_IMAGES_ERROR,
		errors: payload
	})
};