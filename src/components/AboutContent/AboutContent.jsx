import "./AboutContent.scss";
import { GiCheckMark } from "react-icons/gi";

const AboutContent = (props) => {
  const { img, alt, title, span, text, showIcons = true } = props;

  return (
    <section className="about container">
      <div className="about__container container">
        <div className="about__img-container">
          <img className="about__img" src={img} alt={alt} loading="lazy" />
        </div>
        <div className="about__content ">
          <h2 className="about__title">
            {title}
            <span className="about__span"> {span} </span>
          </h2>
          <p className="about__text">{text}</p>
          {showIcons && (
            <>
              <p className="about__marks">
                <GiCheckMark className="about__mark" />
                Driven to Empower, Motivate, and Achieve Goals
              </p>
              <p className="about__marks">
                <GiCheckMark className="about__mark" />
                Our Mission: Inspire Fitness, Transform Lives
              </p>
              <p className="about__marks">
                <GiCheckMark className="about__mark" />
                Join a Community Built on Growth and Resilience
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
