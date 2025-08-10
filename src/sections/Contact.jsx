import { useState, useRef } from 'react';
import FormField from '../components/FormField';
import { submitForm } from '../utilities/submitForm';
import { scrollToElement } from '../utilities/scrollToElement';

export default function Contact({ id }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    schoolName: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const formTopRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm({
      // endpoint: 'https://formspree.io/f/xkgbkdar',
      endpoint: 'http://localhost:8080/contacts',
      formData: form,
      setIsSubmitting,
      setSuccess,
      showToast: (toastState) => {
        setToast(toastState);
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
      },
    });
    if (success) {
      scrollToElement(formTopRef);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id={id} className="contact-section">
      <div className="container">
        <div className="section-header center">
          <h2 className="f-xl f-bold">Get In Touch</h2>
          <p className="f-normal">Ready to transform education at your school? Send us a message today.</p>
        </div>

        <div className={`toast ${toast.type} ${toast.show ? 'fade-enter-active' : ''}`}>
          {toast.message}
        </div>

        <div className="contact-content" ref={formTopRef}>
          {!success && (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <FormField
                  id="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  id="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <FormField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                required
              />

              <FormField
                id="schoolName"
                label="School Name"
                value={form.schoolName}
                onChange={handleInputChange}
                required
              />

              <FormField
                id="message"
                label="Message"
                type="textarea"
                value={form.message}
                onChange={handleInputChange}
                required
                rows={5}
              />

              <button type="submit" className="btn primaryBtn f-7 f-big" disabled={isSubmitting || success}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}