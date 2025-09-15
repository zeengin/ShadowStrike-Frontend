import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section bg-dark">
      <div className="social-items">
        <ul className="d-flex justify-content-around">
          <li className="box-style box-second justify-content-center">
            <a href="https://www.facebook.com/" className="d-center gap-2">
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
          </li>
          <li className="box-style box-second justify-content-center">
            <a href="https://www.instagram.com/" className="d-center gap-2">
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </li>
          <li className="box-style box-second justify-content-center">
            <a href="https://www.linkedin.com/" className="d-center gap-2">
              <i className="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </a>
          </li>
          <li className="box-style box-second justify-content-center">
            <a href="https://twitter.com/" className="d-center gap-2">
              <i className="fab fa-twitter"></i>
              <span>Twitter</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container-fluid">
        <div className="row py-8 mt-3">
          {/* Column 1 */}
          <div className="col-md-3 col-lg-4 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Shadowstrike</h6>
            <p>
              Shadowstrike games are typically action-packed, stealth-based
              video games that focus on strategy, combat, and survival, often
              featuring dark themes, secret missions, and immersive storytelling.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
            <p className="mb-3">
              <NavLink to="/" className="text-reset">Home</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/about-us" className="text-reset">About us</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">Our Services</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/technology" className="text-reset">Technology</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/entertainment" className="text-reset">Entertainment</NavLink>
            </p>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Our Services</h6>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">Mobile App Development</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">Web Development</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">Software Development</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">Game Development</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">IoT Development</NavLink>
            </p>
            <p className="mb-3">
              <NavLink to="/services" className="text-reset">Custom Web Design</NavLink>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom py-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="copyright">
                <p>
                  Copyright © 2025{" "}
                  <a href="index.html">Shadowstrike</a> - All Right Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
