import React, {Component} from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import SliderMovies from "../../components/SliderMovies";

class Home extends Component {
	state = {
		loading: false
	};

	render() {
		return (
			<main>
				<Sidebar />
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
				/>

				{this.state.loading && (
					<Loading visible={this.state.loading} page={true} />
				)}
			</main>
		);
	}
}

export default Home;
