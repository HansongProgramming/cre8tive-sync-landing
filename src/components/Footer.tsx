import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Footer.css";

const Footer: React.FC = () => {
    const contentRef = useScrollReveal<HTMLDivElement>(0.05);

    return (
        <footer className="footer">
            <div className="footer__container">
                <div ref={contentRef} className="footer__content scroll-reveal">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <img src="/Cre8tiveSyncLogo.svg" alt="Cre8tive Sync Logo" />
                            <span>Cre8tive Sync</span>
                        </div>
                        <p className="footer__tagline">
                            Bridging Imagination, Technology, and the future. One Innovation at a Time.
                        </p>
                        <div className="footer__social">
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="GitHub">GitHub</a>
                        </div>
                    </div>

                    <div className="footer__links">
                        <div className="footer__column">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#projects">Web Development</a></li>
                                <li><a href="#projects">AI Solutions</a></li>
                                <li><a href="#projects">AR Experiences</a></li>
                            </ul>
                        </div>

                        <div className="footer__column">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#values">About Us</a></li>
                                <li><a href="#values">Our Values</a></li>
                                <li><a href="#projects">Portfolio</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer__column">
                            <h3>Legal</h3>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} Cre8tive Sync. All rights reserved.
                    </p>
                    <p className="footer__credits">
                        Powered By Innovation
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
