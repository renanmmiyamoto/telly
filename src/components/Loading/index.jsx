import React from "react";
import loading from "../../images/loading.svg";
import "./style.scss";

const Loading = props => (
	<div
		className={`loading ${props.visible ? "is-visible" : ""} ${
			props.page ? "is-page" : ""
		}`}
	>
		<img src={loading} alt="" />
	</div>
);

export default Loading;
