import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import {publicRoutes} from "../routes/routes";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			{publicRoutes.map((route, key) => (
				<Route
					exact
					key={key}
					path={route.path}
					component={route.component}
				/>
			))}
		</Switch>
	</BrowserRouter>
);

export default Routes;
