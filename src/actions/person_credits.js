import {api} from '../services';

export const LOAD_PERSON_MOVIE_CREDITS_REQUEST = 'LOAD_PERSON_MOVIE_CREDITS_REQUEST';
export const LOAD_PERSON_MOVIE_CREDITS_SUCCESS = 'LOAD_PERSON_MOVIE_CREDITS_SUCCESS';
export const LOAD_PERSON_MOVIE_CREDITS_ERROR   = 'LOAD_PERSON_MOVIE_CREDITS_ERROR';

export const LoadPersonMovieCredits = (person_id) => {
	return (dispatch) => {
		dispatch(onLoadPersonMovieCredits.request());
		return onLoadPersonMovieCredits.fetch(person_id)
			.then(({ data }) => {
				dispatch(onLoadPersonMovieCredits.success(data));
			})
			.catch((error) => {
				dispatch(onLoadPersonMovieCredits.error(error))
			});
	}
};

const onLoadPersonMovieCredits = {
	request: () => ({
		type: LOAD_PERSON_MOVIE_CREDITS_REQUEST
	}),
	fetch: (person_id) => {
		return api.request.get(`/person/${person_id}/movie_credits`);
	},
	success: (payload) => {
		return {
			type: LOAD_PERSON_MOVIE_CREDITS_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_PERSON_MOVIE_CREDITS_ERROR,
		errors: payload
	})
};