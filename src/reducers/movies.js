import * as Actions from '../actions/movies';

const initialState = {
	all: [],
	filter: 'popular',
	isFetched: false,
	searchText: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_MOVIES_REQUEST:
			return {
				...state,
				all: [],
				isFetched: false
			};
		case Actions.LOAD_MOVIES_SUCCESS:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		case Actions.LOAD_SEARCH_MOVIES_REQUEST:
			return {
				...state,
				all: [],
				searchText: action.searchText,
				isFetched: false
			};
		case Actions.LOAD_SEARCH_MOVIES_SUCCESS:
			return {
				...state,
				all: action.payload,
				isFetched: true
			};
		case Actions.CHANGE_MOVIES_FILTER:
			return {
				...state,
				filter: action.payload
			};
		case Actions.CLEAR_SEARCH_TEXT:
			return {
				...state,
				searchText: ''
			};
		default:
			return state;
	}
};