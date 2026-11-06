const TestimonialsItem = (props) => {
	return (
		<div className="testimonials__box">
			<div className="testimonials__person">
				<img src={props.img} alt={props.alt} className="testimonials__img" loading="lazy" />
				<div className="testimonials__info">
					<p className="testimonials__name">{props.name}</p>
					<p className="testimonials__client">Our Client</p>
				</div>
			</div>
			<p className="testimonials__review">{props.review}</p>
		</div>
	);
};

export default TestimonialsItem;
