import React, {Component} from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import ListMovies from "../../components/ListMovies";
import apiMovies from "../../services/api";

class Genres extends Component {
	state = {
		loading: true,
		title: "",
		idGenre: Number(this.props.match.params.id)
	};

	componentWillMount() {
		this.getTitleGenre();

		window.onload = () => this.setState({loading: false});

		setTimeout(() => {
			this.setState({loading: false});
		}, 3000);
	}

	getTitleGenre = async () => {
		try {
			const response = await apiMovies.get("/genre/movie/list");

			response.data.genres.forEach(genre => {
				if (genre.id === this.state.idGenre) {
					this.setState({
						title: genre.name,
						loading: false
					});
				}
			});
		} catch (res) {
			this.setState({errorMessage: res.data.error});
		}
	};

	componentWillUnmount() {
		this.setState({loading: true});
	}

	componentWillReceiveProps(newProps) {
		this.setState({idGenre: newProps.match.params.id});
	}

	render() {
		return this.state.title === "" ? (
			<Loading visible={this.state.loading} page={true} />
		) : (
			<main>
				<Sidebar className={!this.state.loading ? "loaded" : ""} />

				<section>
					<ListMovies
						pathUrl="/discover/movie"
						paramsDiscover={{
							language: "en-US",
							sort_by: "popularity.desc",
							include_adult: "false",
							include_video: "false",
							page: "1",
							with_genres: this.state.idGenre
						}}
						title={this.state.title}
						className={!this.state.loading ? "loaded" : ""}
					/>
				</section>

				{this.state.loading && (
					<Loading visible={this.state.loading} page={true} />
				)}
			</main>
		);
	}
}

export default Genres;
