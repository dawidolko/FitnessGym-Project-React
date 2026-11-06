import "./FixedBg.scss";
import { Link } from "react-router-dom";

const FixedBg = (props) => {
  return (
    <section className={props.cName}>
      <div className="fixed__content">
        <p className="fixed__text">{props.text}</p>
        <h2 className="fixed__title">{props.title}</h2>
        <Link to="/contact/" className="fixed__link">
          JOIN US
        </Link>
      </div>
    </section>
  );
};

export default FixedBg;
