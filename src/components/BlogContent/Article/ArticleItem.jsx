const ArticleItem = (props) => {
	return (
		<div className="article__container">
			<img className="article__img" src={props.img} alt={props.alt} width="640" height="427" />
			<div className="article__content">
				<h1 className="article__title">{props.title}</h1>
				<p className="article__text">{props.text}</p>
				<p className="article__text-highlight">{props.highlight}</p>
				<p className="article__text">{props.text2}</p>
			</div>
		</div>
	);
};

export default ArticleItem;
