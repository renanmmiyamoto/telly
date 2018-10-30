import React, {Component} from "react";
import {FaAngleLeft, FaAngleRight, FaStar} from "react-icons/fa";
import apiMovies from "../../services/api";
import "./style.scss";

class SliderMovies extends Component {
	state = {
		listMovies: [],
		errorMessage: ""
	};

	async componentWillMount() {
		try {
			const response = await apiMovies.get(this.props.pathUrl, {
				...this.props.paramsDiscover
			});

			const genresList = await apiMovies.get("/genre/movie/list");
			const {genres} = genresList.data;

			const listMovies = response.data.results.map(result => ({
				...result,
				genre_name: genres.find(item => item.id === result.genre_ids[0])
			}));

			this.setState({listMovies});
		} catch (error) {
			this.setState({
				errorMessage:
					"Não foi possível carregar os filmes, tente novamente mais tarde."
			});
		}
	}

	render() {
		return (
			<section className="slider-movies">
				<h2>{this.props.title}</h2>

				<nav>
					<div>
						<button className="btn-prev">
							<FaAngleLeft />
						</button>
						<button className="btn-next">
							<FaAngleRight />
						</button>
					</div>

					{this.state.listMovies.map(movie => (
						<article>
							<div
								className="image"
								style={{
									backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
										movie.poster_path
									})`
								}}
							/>

							<h3>{movie.original_title}</h3>

							<div className="desc">
								<p>
									{movie.genre_name.name} .{" "}
									{movie.release_date.split("-")[0]}
								</p>

								<span className="vote">
									<FaStar />
									{movie.vote_average}
								</span>
							</div>
						</article>
					))}
				</nav>

				{this.state.errorMessage && <p>{this.state.errorMessage}</p>}
			</section>
		);
	}
}

export default SliderMovies;
