import "./Footer.scss";
import { Link } from "react-router-dom";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLocationArrow,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container  container">
        <div className="footer__content">
          <div className="footer__box">
            <Link to="/" className="footer__logo">
              <p className="footer__logo-text">FitnessGym</p>
            </Link>
            <div className="footer__desc">
              Join our gym to strengthen your body, improve fitness, and achieve
              your fitness goals. Get started today!
            </div>
          </div>
          <div className="footer__box">
            <h2 className="footer__title">Useful Links</h2>
            <ul className="footer__links">
              <li>
                <Link to="/about/" className="footer__link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq/" className="footer__link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="footer__link">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="footer__link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__box">
            <h2 className="footer__title">Opening Hours</h2>
            <p>Mon To Fri</p>
            <p>07:00 AM - 11:00 PM</p>
            <p>Sat To Sun</p>
            <p>09:00 AM - 10:00 PM</p>
          </div>
          <div className="footer__box">
            <h2 className="footer__title">Contact</h2>
            <div className="footer__contact">
              <FaLocationArrow className="footer__icon" />
              <a
                className="footer__link"
                href="https://maps.app.goo.gl/jKPN2oKWiUrcJuuD9"
                target="_blank"
                rel="noopener noreferrer">
                38 Park Avenue New York
              </a>
            </div>
            <div className="footer__contact">
              <AiFillMail className="footer__icon" />
              <a className="footer__link" href="mailto:info@example.com">
                FitnessGym@gmail.com
              </a>
            </div>
            <div className="footer__contact">
              <AiFillPhone className="footer__icon" />
              <a className="footer__link" href="tel:+1231234567890">
                (123) 1234 567 890
              </a>
            </div>
          </div>
        </div>
        <hr className="footer__line" />
        <div className="footer__date">
          <p>
            &copy; Copyright {new Date().getFullYear()}
            <span className="footer__logo-name"> FitnessGym </span>
            All Rights Reserved.
          </p>
          <div className="footer__icons">
            <div className="footer__icon-bg">
              <FaFacebookF className="footer__icon" />
            </div>
            <div className="footer__icon-bg">
              <FaTwitter className="footer__icon" />
            </div>
            <div className="footer__icon-bg">
              <FaInstagram className="footer__icon" />
            </div>
            <div className="footer__icon-bg">
              <FaYoutube className="footer__icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
