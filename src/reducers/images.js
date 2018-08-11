import * as Actions from '../actions/images';

const initialState = {
	all: [],
	isFetched: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_IMAGES_REQUEST:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case Actions.LOAD_IMAGES_SUCCESS:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};