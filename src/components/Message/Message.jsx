import "./Message.scss";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

const Message = () => {
  return (
    <section className="message">
      <h2 className="message__title">Experience Your First Session for Free</h2>
      <p className="message__text">
        Try our services at no cost and discover the workout that suits you
        best. Let us know your preferences, and we’ll guide you to the perfect
        training plan.
      </p>
      <Link className="message__link" to="/contact/">
        <AiOutlineMail className="message__icon" />
        CONTACT US
      </Link>
    </section>
  );
};

export default Message;
