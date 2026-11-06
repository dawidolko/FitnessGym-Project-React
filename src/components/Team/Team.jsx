import "./Team.scss";
import teamData from "./TeamData";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimationVariants from "../AnimationVariants/AnimationVariants";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Team = () => {
	const ref = useRef();
	const isInView = useInView(ref, { once: true });

	return (
		<motion.section
			className="team"
			variants={AnimationVariants.slideIn}
			initial="initial"
			animate={isInView ? "animate" : "initial"}
			ref={ref}
		>
			<h2 className="team__title">Meet With Expert Trainers</h2>
			<motion.div
				variants={AnimationVariants.slideIn}
				initial="initial"
				animate={isInView ? "animate" : "initial"}
				ref={ref}
				className="team__body container"
			>
				{teamData.map((item) => (
					<div className="team__card" key={item.id}>
						<img className="team__img" src={item.img} alt={item.alt} loading="lazy" />
						<div className="team__text">
							<h3 className="team__name">{item.name}</h3>
							<div className="team__icons">
								<FaFacebookF className="team__icon" />
								<FaTwitter className="team__icon" />
								<FaInstagram className="team__icon" />
							</div>
						</div>
					</div>
				))}
			</motion.div>
		</motion.section>
	);
};

export default Team;
