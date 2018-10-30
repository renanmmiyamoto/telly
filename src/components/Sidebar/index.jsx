import React, {Component} from "react";
import {Link} from "react-router-dom";
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
			const {genres} = response.data;

			this.setState({genres});
		} catch (error) {
			this.setState({errorMessage: error.data.error});
		}
	}

	render() {
		return (
			<aside>
				<img src={logo} alt="Logo Telly" />

				<nav>
					<h2>Browse Telly</h2>

					<Link to="/">Discover</Link>
					<Link to="/">TV & Movies</Link>
					<Link to="/">Popular Clips</Link>
					<Link to="/">Watch Later</Link>
				</nav>

				<nav>
					<h2>Categories</h2>

					{this.state.genres.map(genre => (
						<Link key={genre.id} to="">
							{genre.name}
						</Link>
					))}
				</nav>
			</aside>
		);
	}
}

export default Sidebar;
