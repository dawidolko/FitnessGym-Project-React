import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AnimationVariants from "../AnimationVariants/AnimationVariants";
import { useRef } from "react";

/*
   Every slide used to render its title as <h1>, so the home page shipped three
   first level headings. Only the first slide keeps the h1; the rest are h2, and
   the inactive slides are hidden from assistive technology so a screen reader
   is not read three competing page titles.
*/
const MainBackgroundItem = ({ item, currentSlide, index = 0, isActive = true }) => {
	const ref = useRef();
	const isInView = useInView(ref, { once: true });

	// motion.h1 / motion.h2 are distinct components, so the level is chosen here
	// rather than through an `as` prop, which framer-motion does not accept.
	const Heading = index === 0 ? motion.h1 : motion.h2;

	return (
		<div
			className="mainBackground__slider"
			style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
		>
			<div className="mainBackground__img">
				<img className="mainBackground__image" src={item.img} alt={item.alt} />
			</div>
			<div className="mainBackground__content" aria-hidden={!isActive}>
				<Heading
					variants={AnimationVariants.fadeIn}
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					ref={ref}
					className="mainBackground__title"
				>
					{item.title}
				</Heading>
				<motion.p
					variants={AnimationVariants.fadeIn2}
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					ref={ref}
					className="mainBackground__text"
				>
					{item.text}
				</motion.p>
				<motion.div
					variants={AnimationVariants.fadeIn2}
					initial="initial"
					animate={isInView ? "animate" : "initial"}
					ref={ref}
				>
					<Link className="mainBackground__link" to="/StrongZone/contact">
						Join Us
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default MainBackgroundItem;
