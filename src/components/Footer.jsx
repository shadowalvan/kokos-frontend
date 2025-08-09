import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import ScrollLink from './ScrollLink';

export default function Footer() {
  const location = useLocation();
  const [form, setForm] = useState({ email: '' });
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const links = [
    { href: '/#hero', id: 'hero', label: 'Home' },
    { href: '/#why', id: 'why', label: 'Why AI Education?' },
    { href: '/#offer', id: 'offer', label: 'What We Offer' },
    { href: '/#how', id: 'how', label: 'How It Works' },
    { href: '/#team', id: 'team', label: 'Our Team' },
  ];

  const contactInfo = [
    { icon: 'location_on', text: 'ERF Academy, Windhoek, Namibia' },
    { icon: 'phone', text: '+264 81 716 4769' },
    { icon: 'phone', text: '+43 660 9177324' },
    { icon: 'phone', text: '+264 81 465 1384' },
    { icon: 'email', text: 'contact@futuretechafrica.com', isEmail: true },
    { icon: 'schedule', text: 'Mon-Fri: 8:00 AM - 5:00 PM' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!form.email) {
      setEmailError('Please enter your email address.');
      setTimeout(() => setEmailError(''), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setEmailError('Please enter a valid email address.');
      setTimeout(() => setEmailError(''), 3000);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/movlkvke', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          message: 'KOKOS Newsletter Signup',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setForm({ email: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setEmailError(result?.errors?.[0]?.message || 'There was an error.');
      }
    } catch (error) {
      setEmailError('Network error. Please try again.', error);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <ScrollLink id="hero" className="footer-logo center">
              <img src="/images/logo11.svg" alt="KOKOS Logo" className="logo-img" />
            </ScrollLink>
            <p className="footer-description">
              Transforming education in Namibia through innovative AI and coding programs for the next generation.
            </p>
            <a
              href="https://www.facebook.com/Africafuturetech"
              className="social-link-wrapper"
              target="_blank"
              rel="noopener"
            >
              <span className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </span>
              <p className="social-text">Follow us on Facebook!</p>
            </a>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-menu">
              {links.map((link) => (
                <li key={link.href}>
                  <ScrollLink
                    id={link.id}
                    className={`footer-link ${location.hash === `#${link.id}` ? 'selected' : ''}`}
                  >
                    <span className="material-symbols-outlined">arrow_right</span>
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading">Contact Info</h3>
            <ul className="contact-info">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.isEmail ? (
                    <a href={`mailto:${item.text}`} className="contact-link">
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest updates on AI education.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ email: e.target.value })}
                required
                placeholder="Your email address"
                className={`newsletter-input ${emailError ? 'input-error' : ''}`}
              />
              {emailError && <p className="form-error">{emailError}</p>}
              <button type="submit" className="btn btn-primary f-7 f-bigest">Subscribe</button>
              {success && <p className="newsletter-success">🎉 Thank you for subscribing!</p>}
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} KOKOS Namibia. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}