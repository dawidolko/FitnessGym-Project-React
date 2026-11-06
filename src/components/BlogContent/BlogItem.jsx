import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  return (
    <div className="blog__box">
      <div className="blog__overflow">
        <img src={props.img} alt={props.alt} className="blog__img" width="640" height="427" loading="lazy" />
      </div>
      <div className="blog__content">
        <div className="blog__icons">
          <span className="blog__span">
            <FaUser className="blog__icon" /> By FitnessGym Team
          </span>
          <span className="blog__span">
            <FaCalendarAlt className="blog__icon" /> {props.month} 2023
          </span>
        </div>
        <hr className="blog__line" />
        <h3 className="blog__title">{props.title}</h3>
        <p className="blog__text">{props.text}</p>
        <Link className="blog__link" to={`/blog/${props.id}/`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
