import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './containers/Home';
import Movie from './containers/Movie';
import Error from './containers/Error';
import Search from './containers/Search';
import Person from './containers/Person';

export default (
	<Switch>
		<Route exact path={Home.path} component={Home} />
		<Route exact path={Movie.path} component={Movie} />
		<Route exact path={Person.path} component={Person} />
		<Route exact path={Search.path} component={Search} />

		<Route component={Error}/>
	</Switch>
);