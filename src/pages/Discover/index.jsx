import React, {Component} from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import SliderMovies from "../../components/SliderMovies";

class Discover extends Component {
	state = {
		loading: true
	};

	componentWillMount() {
		window.onload = () => {
			this.setState({loading: false});
		};
	}

	render() {
		return (
			<main>
				<Sidebar className={!this.state.loading ? "loaded" : ""} />

				<section>
					<SliderMovies
						pathUrl="/discover/movie"
						paramsDiscover={{
							language: "en-US",
							sort_by: "popularity.desc",
							include_adult: "false",
							include_video: "false",
							page: "1"
						}}
						title="Recommended For You"
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

export default Discover;
