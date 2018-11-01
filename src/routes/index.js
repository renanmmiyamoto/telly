import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";

import {publicRoutes} from "../routes/routes";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			{publicRoutes.map((route, key) => (
				<Route
					exact
					key={key}
					path={route.path}
					children={({match, ...rest}) => (
						<TransitionGroup>
							{match && <route.component {...rest} />}
						</TransitionGroup>
					)}
				/>
			))}
		</Switch>
	</BrowserRouter>
);

export default Routes;
