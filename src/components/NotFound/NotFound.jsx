import "./NotFound.scss";
import { FaRegFaceFrown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<section className="notFound">
			<FaRegFaceFrown className="notFound__icon" />
			<p className="notFound__error">404</p>
			<h1 className="notFound__title">Page not found</h1>
			<p className="notFound__text">
				We're sorry, the page you requested could not be found.
			</p>
			<Link className="notFound__link" to="/">
				Back to the home page
			</Link>
		</section>
	);
};

export default NotFound;
