import * as Actions from '../actions/genres';

const initialState = {
	all: [],
	isFetched: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_GENRES_REQUEST:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case Actions.LOAD_GENRES_SUCCESS:
			return {
				...state,
				all: action.payload.genres,
				isFetched: true
			};
		default:
			return state;
	}
};