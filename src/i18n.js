import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

const options = {
	fallbackLng: 'ru',
	ns: ['translations'],
	defaultNS: 'translations',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
		formatSeparator: ','
	},
	react: {
		wait: true
	}
};

options.backend = {
	loadPath: '/locales/{{lng}}/{{ns}}.json?2',
};
//
//options.resources = {
//	en: {
//		translations: {
//			'Title': 'Title',
//			'Overview': 'Overview',
//			'Revenue': 'Revenue',
//			'Top Billed Cast': 'Top Billed Cast',
//			'Recommendations': 'Recommendations',
//			'Movies, person, movie theaters': 'Movies, person, movie theaters'
//		}
//	},
//	ru: {
//		translations: {
//			'Title': 'Название',
//			'Overview': 'Обзор',
//			'Revenue': 'Сборы',
//			'Top Billed Cast': 'В главных ролях',
//			'Recommendations': 'Вам понравится',
//			'Movies, person, movie theaters': 'Фильмы, персоны, кинотеатры'
//		}
//	}
//};
export default () => {
	i18n
		.use(XHR)
		.init(options);
	return i18n;
};