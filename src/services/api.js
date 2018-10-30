import {create} from "apisauce";

const apiMovies = create({
	baseURL: "https://api.themoviedb.org/3"
});

apiMovies.addRequestTransform(request => {
	request.params.api_key = "022524892631bd93031206ecc26b589b";
});

apiMovies.addResponseTransform(response => {
	if (!response.ok) throw response;
});

export default apiMovies;
