import "./Hero.scss";

const Hero = (props) => {
	const Heading = props.as || "h1";

	return (
		<section className="hero">
			<div className={props.cName}>
				<Heading className="hero__title">{props.title}</Heading>
			</div>
		</section>
	);
};

export default Hero;
