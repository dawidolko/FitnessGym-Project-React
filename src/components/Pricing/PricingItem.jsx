import { Link } from "react-router-dom";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const PricingItem = ({ title, price, yoga, fashion, swimming, bestOffer }) => {
  const items = [
    { label: "Gym & Fitness Access", included: true },
    { label: "Boxing Classes", included: true },
    { label: "Yoga Sessions", included: yoga },
    { label: "Fashion Yoga & Gym", included: fashion },
    { label: "Swimming Pool Access", included: swimming },
  ];

  return (
    <div
      className="pricing__box"
      style={{ backgroundColor: bestOffer ? "#222" : "" }}>
      {bestOffer && <span className="pricing__best-offer">Top Pick</span>}
      <h3 className="pricing__box-title">{title}</h3>
      <p className="pricing__price">
        ${price} <span className="pricing__month">/month</span>
      </p>
      <hr className="pricing__line" />
      <ul className="pricing__list">
        {items.map((item, index) => (
          <li className="pricing__item" key={index}>
            <span>
              {item.included ? (
                <AiOutlineCheck className="pricing__icon " />
              ) : (
                <AiOutlineClose className="pricing__icon pricing__icon--close" />
              )}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
      <Link className="pricing__link" to="/contact/">
        Join Now
      </Link>
    </div>
  );
};

export default PricingItem;
