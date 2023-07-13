import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer social-icons">
        <div className="footer-section">
          <p>Nicholas Murphy</p>
          <div>
            <a
              className="social-icon"
              href="https://www.linkedin.com/in/nicholas-murphy-dev/"
              target="_blank"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="social-icon" target="_blank" href="https://github.com/Murphyn5">
              <i className="fab fa-github"></i>
            </a>
            <a className="social-icon" target="_blank" href="https://murphyn5.github.io/">
              <i className="fas fa-user-circle"></i>
            </a>
            <a className="social-icon" target="_blank" href="mailto:nlimurphy@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <p>Zakariya Beg</p>
          <div>
            <a
              className="social-icon"
              href="https://www.linkedin.com/in/zakariya-beg-74919a201/"
              target="_blank"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="social-icon" target="_blank" href="https://github.com/zakariya23/">
              <i className="fab fa-github"></i>
            </a>
            <a className="social-icon" target="_blank" href="YOUR-PORTFOLIO-LINK-HERE">
              <i className="fas fa-user-circle"></i>
            </a>
            <a className="social-icon" target="_blank" href="mailto:commanderzee455@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <p>Hamilton Truong</p>
          <div>
            <a
              className="social-icon"
              href="https://www.linkedin.com/in/hamiltontruong/"
              target="_blank"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="social-icon" target="_blank" href="https://github.com/truham">
              <i className="fab fa-github"></i>
            </a>
            <a className="social-icon" target="_blank" href="https://truham.github.io/">
              <i className="fas fa-user-circle"></i>
            </a>
            <a className="social-icon" target="_blank" href="mailto:hamiltontruong@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
