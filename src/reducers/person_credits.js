import * as Actions from '../actions/person_credits';

const initialState = {
	movies: [],
	isFetched: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_PERSON_MOVIE_CREDITS_REQUEST:
			return {
				...state,
				movies: [],
				isFetched: false
			};
		case Actions.LOAD_PERSON_MOVIE_CREDITS_SUCCESS:
			return {
				...state,
				movies: action.payload.cast,
				isFetched: true
			};
		default:
			return state;
	}
};