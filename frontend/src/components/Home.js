import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import bookImg from '../assets/book.png';
import Footer from './Footer';

const testimonials = [
  { id: 1, author: 'Aryan Dey', text: 'YourBooks makes organizing my library a breeze! Now I always know what I’ve read and what’s next.' },
  { id: 2, author: 'Meera Gupta', text: 'Stylish, simple, and very intuitive. The book notes feature helps track my reviews and ideas.' },
  { id: 3, author: 'Kabir Sharma', text: 'Never thought managing a reading list could be so much fun. Loving the dark mode and clean UI.' },
  { id: 4, author: 'Sonal Sen', text: 'Highly recommend to every book lover! Personalized dashboard and quick add functions are spot on.' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section
        style={{
          minHeight: '72vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--bg-color)',
          padding: '50px 0 0 0',
          textAlign: 'center',
        }}
      >
        {/* Logo at top left */}
        <div style={{ position: 'absolute', left: 36, top: 32 }}>
          <img src={logo} alt="YourBooks Logo" style={{ width: 58, borderRadius: '50%' }} />
        </div>
        {/* Modern headline with colored keyword */}
        <h1 style={{
          fontSize: '3.25rem',
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: '16px',
          letterSpacing: '-1px',
        }}>
          YourBooks for <span style={{ color: 'var(--primary-color)', fontWeight: 900 }}>Modern Readers</span>
        </h1>
        <p style={{
          margin: '20px auto',
          fontSize: '1.32rem',
          color: '#cfd2d6',
          maxWidth: '570px',
          textAlign: 'center'
        }}>
          Revolutionize your reading and book tracking experience.<br />
          YourBooks delivers ultra-fast book management, personal notes, direct links, and real-time organization.
        </p>
        <div style={{
          marginTop: "32px",
          display: "flex",
          gap: "18px",
          justifyContent: "center"
        }}>
          <button style={{
            padding: "18px 42px",
            background: "var(--primary-color)",
            color: "white",
            fontWeight: 700,
            fontSize: "1.35rem",
            border: "none",
            borderRadius: "14px",
            boxShadow: "0 2px 20px rgb(74 144 226 / 0.24)",
            cursor: "pointer",
            letterSpacing: ".4px"
          }}
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
          <button style={{
            padding: "18px 42px",
            background: "transparent",
            color: "var(--primary-color)",
            fontWeight: 700,
            fontSize: "1.35rem",
            border: "2px solid var(--primary-color)",
            borderRadius: "14px",
            cursor: "pointer"
          }}
            onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
          >
            Learn More
          </button>
        </div>
        <div style={{ marginTop: "38px" }}>
          <img src={bookImg} alt="Books" style={{ width: "180px", borderRadius: "14px", boxShadow: "0 4px 30px rgb(74 144 226 / .11)" }} />
        </div>
        {/* Features row like the reference site */}
        <div style={{
          display: "flex",
          gap: "56px",
          justifyContent: "center",
          marginTop: "38px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#33ee99" }}>
            <span style={{ fontSize: "1.5rem" }}>✔</span>
            <span style={{ fontWeight: 600, fontSize: "1.08rem" }}>Secure Storage</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#49e2e2" }}>
            <span style={{ fontSize: "1.5rem" }}>✔</span>
            <span style={{ fontWeight: 600, fontSize: "1.08rem" }}>Real-time Access</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--primary-color)" }}>
            <span style={{ fontSize: "1.5rem" }}>✔</span>
            <span style={{ fontWeight: 600, fontSize: "1.08rem" }}>Notes & Links</span>
          </div>
        </div>
      </section>
      {/* Testimonials section unchanged */}
      <section style={{
        backgroundColor: 'var(--card-bg)',
        padding: '2rem',
        maxWidth: 960,
        margin: '0 auto 3rem',
        borderRadius: 12,
        boxShadow: '0 4px 14px rgb(0 0 0 / 0.07)',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30, fontFamily: "'Poppins', sans-serif", fontSize: "2rem" }}>Testimonials</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
          {testimonials.map(({ id, author, text }) => (
            <div key={id} style={{
              flex: '1 1 230px',
              backgroundColor: 'var(--bg-color)',
              padding: 24,
              borderRadius: 10,
              boxShadow: '0 2px 10px rgb(0 0 0 / 0.12)',
              fontStyle: 'italic',
              minWidth: 220,
              alignSelf: "center",
              textAlign: "center"
            }}>
              <p style={{ fontSize: "1.07rem" }}>"{text}"</p>
              <p style={{ textAlign: 'center', fontWeight: 700, marginTop: 12 }}>— {author}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
