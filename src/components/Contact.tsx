import { useState } from "react";
import "./Contact.css";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form submitted:", formData);
        setSubmitted(true);
        setIsSubmitting(false);

        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "",
                budget: "",
                message: ""
            });
        }, 3000);
    };

    return (
        <section id="contact" className="contact">
            <div className="contact__container">
                <div className="contact__header">
                    <h2 className="contact__title">Start a Project</h2>
                    <p className="contact__subtitle">
                        Ready to bring your vision to life? Let's discuss how we can help you achieve your goals
                    </p>
                </div>

                <div className="contact__content">
                    <div className="contact__info">
                        <div className="contact__info-item">
                            <h3>Email</h3>
                            <p>hello@cre8tivesync.online</p>
                        </div>
                        <div className="contact__info-item">
                            <h3>Location</h3>
                            <p>Working remotely worldwide</p>
                        </div>
                        <div className="contact__info-item">
                            <h3>Response Time</h3>
                            <p>Within 24 hours</p>
                        </div>
                    </div>

                    <form className="contact__form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Your Company Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="projectType">Project Type *</label>
                                <select
                                    id="projectType"
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    <option value="web">Web Development</option>
                                    <option value="mobile">Mobile App</option>
                                    <option value="ai">AI/ML Solution</option>
                                    <option value="ar">AR Experience</option>
                                    <option value="cloud">Cloud Infrastructure</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="budget">Budget Range</label>
                            <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                            >
                                <option value="">Select a range</option>
                                <option value="10k-25k">$10,000 - $25,000</option>
                                <option value="25k-50k">$25,000 - $50,000</option>
                                <option value="50k-100k">$50,000 - $100,000</option>
                                <option value="100k+">$100,000+</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Project Details *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Tell us about your project, goals, and timeline..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="contact__submit"
                            disabled={isSubmitting || submitted}
                        >
                            {submitted ? "Message Sent!" : isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;