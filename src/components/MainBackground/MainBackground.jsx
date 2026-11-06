import "./MainBackground.scss";
import sliderItems from "./MainBackgroundData";
import MainBackgroundItem from "./MainBackgroundItem";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const MainBackground = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
	};

	return (
		<header className="mainBackground">
			<button
				type="button"
				className="mainBackground__arrow"
				aria-label="Previous slide"
				onClick={prevSlide}
			>
				<AiOutlineArrowLeft className="mainBackground__arrows" />
			</button>
			<div className="mainBackground__container">
				{sliderItems.map((item, index) => (
					<MainBackgroundItem
						key={item.id}
						item={item}
						index={index}
						isActive={index === currentSlide}
						currentSlide={currentSlide}
					/>
				))}
			</div>
			<button
				type="button"
				className="mainBackground__arrow mainBackground__arrow-right"
				aria-label="Next slide"
				onClick={nextSlide}
			>
				<AiOutlineArrowRight className="mainBackground__arrows" />
			</button>
		</header>
	);
};

export default MainBackground;
