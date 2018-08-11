import * as Actions from '../actions/person_images';

const initialState = {
	all: [],
	isFetched: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_PERSON_IMAGES_REQUEST:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case Actions.LOAD_PERSON_IMAGES_SUCCESS:
			return {
				...state,
				all: action.payload.profiles,
				isFetched: true
			};
		default:
			return state;
	}
};