import axios from 'axios';
import config from '../../config';
import store from '../../store';

let state = store.getState();

axios.defaults.params = {};
axios.defaults.params['api_key'] = config.API_KEY;

store.subscribe(() => {
	let languages = config.API_LANGUAGES;
	let lang_id = languages.filter(language => language.id === Number(state.system.currentLangID));

	state = store.getState();

	axios.defaults.params['language'] = lang_id.length > 0 ? lang_id.shift().code : languages.shift().code;
});

export default {
	request: axios.create({
		baseURL: config.API_ROOT
	}),
	requestWOL: axios.create({
		baseURL: config.API_ROOT,
		params: {
			language: 'null',
			api_key: config.API_KEY
		}
	})
};