import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import genres from './genres';
import credits from './credits';
import recommendations from './recommendations';
import system from './system';
import images from './images';
import movie from './movie';
import person from './person';
import person_credits from './person_credits';
import person_images from './person_images';
import movies from './movies';

export default combineReducers({
	routing: routerReducer,
	genres,
	credits,
	recommendations,
	system,
	movie,
	images,
	person,
	person_credits,
	person_images,
	movies
});