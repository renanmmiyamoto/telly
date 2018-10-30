import React, {Component} from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";

class Home extends Component {
	state = {
		loading: false
	};

	render() {
		return (
			<main>
				<Sidebar />

				{this.state.loading && (
					<Loading visible={this.state.loading} page={true} />
				)}
			</main>
		);
	}
}

export default Home;
