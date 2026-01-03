import "./Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <img src="/Cre8tiveSyncLogo.svg" alt="Creative Sync Logo" />
                            <span>Cre8tive Sync</span>
                        </div>
                        <p className="footer__tagline">
                            Engineering tomorrow's solutions with precision, creativity, and cutting-edge technology.
                        </p>
                        <div className="footer__social">
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="GitHub">GitHub</a>
                            <a href="#" aria-label="Dribbble">Dribbble</a>
                        </div>
                    </div>

                    <div className="footer__links">
                        <div className="footer__column">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#projects">Web Development</a></li>
                                <li><a href="#projects">Mobile Apps</a></li>
                                <li><a href="#projects">AI Solutions</a></li>
                                <li><a href="#projects">AR Experiences</a></li>
                                <li><a href="#projects">Cloud Infrastructure</a></li>
                            </ul>
                        </div>

                        <div className="footer__column">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#values">About Us</a></li>
                                <li><a href="#values">Our Values</a></li>
                                <li><a href="#projects">Portfolio</a></li>
                                <li><a href="#contact">Careers</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer__column">
                            <h3>Resources</h3>
                            <ul>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Case Studies</a></li>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">Support</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="footer__column">
                            <h3>Legal</h3>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Cookie Policy</a></li>
                                <li><a href="#">GDPR</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} Cre8tive Sync. All rights reserved.
                    </p>
                    <p className="footer__credits">
                        Designed & Built with precision
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;