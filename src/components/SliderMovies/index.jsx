import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight, FaStar} from "react-icons/fa";
import apiMovies from "../../services/api";
import "./style.scss";

class SliderMovies extends Component {
	state = {
		listMovies: [],
		errorMessage: "",
		translateNav: 0,
		widthActions: 0,
		leftLayer: 0
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

			let widthActions =
				parseInt((window.outerWidth * 0.8) / 205) * 205 - 5;
			let leftLayer =
				parseInt((window.outerWidth * 0.8) / 205) * 205 + 30;

			this.setState({
				widthActions,
				leftLayer
			});
		} catch (error) {
			this.setState({
				errorMessage:
					"Não foi possível carregar os filmes, tente novamente mais tarde."
			});
		}
	}

	componentWillUnmount() {
		document.querySelector(".slider-movies").classList.add("unmount");
	}

	prevMovie = e => {
		const {translateNav} = this.state;

		const newTranslate = translateNav + 205;

		if (newTranslate <= 0) {
			if (e.target.closest("button").classList.contains("disabled")) {
				e.target.closest("button").classList.remove("disabled");
			}

			this.setState({translateNav: newTranslate});
		} else {
			e.target.closest("button").add("disabled");
		}
	};

	nextMovie = e => {
		const {translateNav} = this.state;

		const newTranslate = translateNav - 205;

		const maxTranslate =
			205 *
			(this.state.listMovies.length -
				parseInt((window.outerWidth * 0.8) / 205)) *
			-1;

		if (newTranslate >= maxTranslate) {
			if (e.target.closest("button").classList.contains("disabled")) {
				e.target.closest("button").classList.remove("disabled");
			}
			this.setState({translateNav: newTranslate});
		} else {
			e.target.closest("button").classList.add("disabled");
		}
	};

	render() {
		return (
			<article className={`slider-movies ${this.props.className}`}>
				<h2>{this.props.title}</h2>

				<div
					className="actions"
					style={{
						width: `${this.state.widthActions}px`
					}}
				>
					<button
						className="btn-prev disabled"
						onClick={e => {
							e.persist();
							this.prevMovie(e);
						}}
					>
						<FaAngleLeft />
					</button>

					<button
						className="btn-next"
						onClick={e => {
							e.persist();
							this.nextMovie(e);
						}}
					>
						<FaAngleRight />
					</button>
				</div>

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

				<div
					className="layer"
					style={{
						left: `${this.state.leftLayer}px`
					}}
				/>

				{this.state.errorMessage && <p>{this.state.errorMessage}</p>}
			</article>
		);
	}
}

export default SliderMovies;
