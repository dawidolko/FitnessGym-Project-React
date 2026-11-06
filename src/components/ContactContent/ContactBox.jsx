const ContactBox = (props) => {
	return (
		<div className="contact__box">
			<a
				href={props.link}
				target={props.target}
				rel={props.target ? "noopener noreferrer" : undefined}
				className="contact__link"
			>
				<span className="contact__icon">{props.icon}</span>
				<h2 className="contact__box-title">{props.boxTitle}</h2>
				<p className="contact__box-details">{props.details}</p>
			</a>
		</div>
	);
};

export default ContactBox;
