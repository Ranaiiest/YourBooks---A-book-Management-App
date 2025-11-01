import React, { useState } from 'react';
import { FaRegHandPeace } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:senapatirana415@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      style={{
        maxWidth: 620,
        margin: '42px auto',
        background: 'var(--card-bg)',
        boxShadow: '0 4px 14px rgb(0 0 0 / 0.05)',
        borderRadius: 14,
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2.8rem',
          fontWeight: '700',
          marginBottom: 18,
          letterSpacing: '.5px',
        }}
      >
        Love to hear from you,
        <br />
        <span>Get in touch </span>
        <FaRegHandPeace
          style={{ fontSize: '2.2rem', verticalAlign: 'middle', marginLeft: '6px' }}
        />
      </h2>
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          marginTop: '18px',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <label>Your name</label>
          <input name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div style={{ width: '100%' }}>
          <label>Your email</label>
          <input name="email" value={formData.email} onChange={onChange} required type="email" />
        </div>
        <div style={{ width: '100%' }}>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            required
            rows={3}
            style={{ resize: 'none' }}
            placeholder="Let us know your project or request..."
          />
        </div>
        <div style={{ width: '100%' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#222',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '1.18rem',
              fontWeight: 600,
              letterSpacing: '.5px',
              marginTop: '8px',
            }}
          >
            Just Send &rarr;
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
