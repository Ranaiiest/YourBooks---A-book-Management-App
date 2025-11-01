import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const defaultLinks = [
  { href: 'https://github.com/ranaiiest', icon: FaGithub, name: 'GitHub' },
  { href: 'https://www.linkedin.com/in/priyabrata-senapati-94a312258/', icon: FaLinkedin, name: 'LinkedIn' },
  { href: 'https://x.com/its_rana10?t=Ah6puhodc6D-GsKZCJOOHQ&s=35', icon: FaTwitter, name: 'Twitter' },
];

const Footer = ({ links = defaultLinks }) => (
  <footer
    style={{
      backgroundColor: 'var(--nav-bg)',
      padding: '1rem 2rem',
      textAlign: 'center',
      borderTop: '1px solid var(--input-border)',
      fontSize: '0.9rem',
      marginTop: 'auto',
    }}
  >
    {links.map(({ href, icon: Icon, name }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ margin: '0 1.2rem', color: 'inherit' }}
        aria-label={name}
      >
        <Icon />
      </a>
    ))}
    <p style={{ marginTop: 10 }}>© 2025 YourBooks</p>
  </footer>
);

export default Footer;
