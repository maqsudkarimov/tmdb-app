import {api} from '../services';

export const LOAD_RECOMMENDATIONS_REQUEST = 'LOAD_RECOMMENDATIONS_REQUEST';
export const LOAD_RECOMMENDATIONS_SUCCESS = 'LOAD_RECOMMENDATIONS_SUCCESS';
export const LOAD_RECOMMENDATIONS_ERROR   = 'LOAD_RECOMMENDATIONS_ERROR';

export const LoadRecommendations = (movie_id) => {
	return (dispatch) => {
		dispatch(onLoadRecommendations.request());
		return onLoadRecommendations.fetch(movie_id)
			.then(({ data }) => {
				dispatch(onLoadRecommendations.success(data));
			})
			.catch((error) => {
				dispatch(onLoadRecommendations.error(error))
			});
	}
};

const onLoadRecommendations = {
	request: () => ({
		type: LOAD_RECOMMENDATIONS_REQUEST
	}),
	fetch: (movie_id) => {
		return api.request.get(`/movie/${movie_id}/recommendations`);
	},
	success: (payload) => {
		return {
			type: LOAD_RECOMMENDATIONS_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_RECOMMENDATIONS_ERROR,
		errors: payload
	})
};