import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import apiMovies from "../../services/api";

import logo from "../../images/logo.png";
import "./style.scss";

class Sidebar extends Component {
	state = {
		genres: [],
		errorMessage: ""
	};

	async componentWillMount() {
		try {
			const response = await apiMovies.get("/genre/movie/list");

			const genres = response.data.genres.filter(genre => {
				return (
					genre.id !== 14 &&
					genre.id !== 36 &&
					genre.id !== 10402 &&
					genre.id !== 10770 &&
					genre.id !== 37 &&
					genre.id !== 99 &&
					genre.id !== 10749
				);
			});

			this.setState({genres});
		} catch (error) {
			this.setState({errorMessage: error.data.error});
		}
	}

	render() {
		return (
			<aside className={this.props.className}>
				<img src={logo} alt="Logo Telly" />

				<nav>
					<h2>Browse Telly</h2>

					<NavLink to="/" exact activeClassName="current">
						Discover
					</NavLink>
					<NavLink to="/tv" exact activeClassName="current">
						TV
					</NavLink>
					<NavLink to="/popular" exact activeClassName="current">
						Popular Clips
					</NavLink>
					<NavLink to="/watch-list" exact activeClassName="current">
						Watch Later
					</NavLink>
				</nav>

				<nav>
					<h2>Categories</h2>

					{this.state.genres.map(genre => (
						<NavLink
							key={genre.id}
							to={`/genres/${genre.id}`}
							exact
							activeClassName="current"
						>
							{genre.name}
						</NavLink>
					))}
				</nav>
			</aside>
		);
	}
}

export default Sidebar;
