import React, {Component} from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import apiMovies from "../../services/api";

class Movie extends Component {
	state = {
		loading: true
	};

	async componentWillMount() {
		try {
			const response = await apiMovies.get(
				`/movie/${this.props.match.params.id}`
			);

			console.log(response);
		} catch (error) {
			this.setState({
				errorMessage:
					"Não foi possível carregar os filmes, tente novamente mais tarde."
			});
		}
	}

	componentWillUnmount() {
		this.setState({loading: true});
	}

	render() {
		return (
			<main>
				<Sidebar className={!this.state.loading ? "loaded" : ""} />

				<section />

				{this.state.loading && (
					<Loading visible={this.state.loading} page={true} />
				)}
			</main>
		);
	}
}

export default Movie;
