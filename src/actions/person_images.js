import {api} from '../services';

export const LOAD_PERSON_IMAGES_REQUEST = 'LOAD_PERSON_IMAGES_REQUEST';
export const LOAD_PERSON_IMAGES_SUCCESS = 'LOAD_PERSON_IMAGES_SUCCESS';
export const LOAD_PERSON_IMAGES_ERROR   = 'LOAD_PERSON_IMAGES_ERROR';

export const LoadPersonImages = (person_id) => {
	return (dispatch) => {
		dispatch(onLoadPersonImages.request());
		return onLoadPersonImages.fetch(person_id)
			.then(({ data }) => {
				dispatch(onLoadPersonImages.success(data));
			})
			.catch((error) => {
				dispatch(onLoadPersonImages.error(error))
			});
	}
};

const onLoadPersonImages = {
	request: () => ({
		type: LOAD_PERSON_IMAGES_REQUEST
	}),
	fetch: (person_id) => {
		return api.request.get(`/person/${person_id}/images`);
	},
	success: (payload) => {
		return {
			type: LOAD_PERSON_IMAGES_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_PERSON_IMAGES_ERROR,
		errors: payload
	})
};