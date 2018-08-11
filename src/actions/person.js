import {api} from '../services';

export const LOAD_PERSON_REQUEST = 'LOAD_PERSON_REQUEST';
export const LOAD_PERSON_SUCCESS = 'LOAD_PERSON_SUCCESS';
export const LOAD_PERSON_ERROR   = 'LOAD_PERSON_ERROR';

export const LoadPerson = (person_id) => {
	return (dispatch) => {
		dispatch(onLoadPerson.request());
		return onLoadPerson.fetch(person_id)
			.then(({ data }) => {
				dispatch(onLoadPerson.success(data));
			})
			.catch((error) => {
				dispatch(onLoadPerson.error(error))
			});
	}
};

const onLoadPerson = {
	request: () => ({
		type: LOAD_PERSON_REQUEST
	}),
	fetch: (movie_id) => {
		return api.request.get(`/person/${movie_id}`);
	},
	success: (payload) => {
		return {
			type: LOAD_PERSON_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_PERSON_ERROR,
		errors: payload
	})
};