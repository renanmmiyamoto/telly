import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import apiMovies from "../../services/api";
import "./style.scss";

class SliderMovies extends Component {
	state = {
		listMovies: [],
		errorMessage: "",
		idGenre: this.props.paramsDiscover.with_genres
	};

	async componentWillMount() {
		try {
			const response = await apiMovies.get(this.props.pathUrl, {
				...this.props.paramsDiscover,
				with_genres: this.state.idGenre
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

	componentWillUnmount() {
		document.querySelector(".list-movies").classList.add("unmount");
	}

	render() {
		return (
			<article className={`list-movies ${this.props.className}`}>
				<h2>{this.props.title}</h2>

				<nav
					style={{
						transform: `translateX(${this.state.translateNav}px)`
					}}
				>
					{this.state.listMovies.map(movie => (
						<Link
							to={`movie/${movie.id}`}
							className="item-movie"
							key={movie.id}
						>
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
						</Link>
					))}
				</nav>

				{this.state.errorMessage && <p>{this.state.errorMessage}</p>}
			</article>
		);
	}
}

export default SliderMovies;
