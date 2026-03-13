import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1008 100%)',
    borderTop: '1px solid #2e2410',
    padding: '48px 24px 24px',
    color: '#8a7a6a',
    fontFamily: 'DM Sans, sans-serif',
  };

  const innerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
    marginBottom: '2.5rem',
  };

  const colTitleStyle = {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#c8860a',
    fontWeight: 700,
    marginBottom: '0.875rem',
  };

  const linkListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const linkStyle = {
    color: '#8a7a6a',
    fontSize: '0.85rem',
    cursor: 'pointer',
  };

  const badgeStyle = {
    background: '#1e1408',
    border: '1px solid #2e2410',
    borderRadius: '99px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    color: '#c8860a',
    fontWeight: 600,
  };

  const dividerStyle = {
    border: 'none',
    borderTop: '1px solid #2e2410',
    margin: '0 0 1.5rem',
  };

  const bottomStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const socialLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: '1px solid #2e2410',
    background: '#1a1008',
    color: '#8a7a6a',
    textDecoration: 'none',
    transition: 'all 0.2s',
  };

  const handleLinkHover = (e, enter) => {
    e.target.style.color = enter ? '#c8860a' : '#8a7a6a';
  };

  const handleSocialHover = (e, enter, type) => {
    if (enter) {
      e.currentTarget.style.background  = type === 'ig' ? '#c8360a' : '#0077b5';
      e.currentTarget.style.borderColor = type === 'ig' ? '#c8360a' : '#0077b5';
      e.currentTarget.style.color       = '#fff';
      e.currentTarget.style.transform   = 'translateY(-2px)';
    } else {
      e.currentTarget.style.background  = '#1a1008';
      e.currentTarget.style.borderColor = '#2e2410';
      e.currentTarget.style.color       = '#8a7a6a';
      e.currentTarget.style.transform   = 'none';
    }
  };

  const InstagramSVG = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );

  const LinkedInSVG = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const quickLinks = ['Browse Books', 'My Orders', 'Cart', 'Sign In', 'Register'];
  const categories = ['Technology', 'Self-Help', 'Fiction', 'Finance', 'History', 'Science'];
  const techStack  = ['⚛️ React JS', '☕ Spring Boot', '🗄️ MySQL', '🔐 JWT Auth', '📦 REST API'];

  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>

        <div style={gridStyle}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 900, color: '#fdf8f0', marginBottom: '0.5rem' }}>
              📚 Book<span style={{ color: '#c8860a' }}>Store</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6b5e4e', lineHeight: 1.6, margin: 0 }}>
              Your premier destination for digital books.
              Read anywhere, anytime — instant PDF delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={colTitleStyle}>Quick Links</div>
            <ul style={linkListStyle}>
              {quickLinks.map(label => (
                <li key={label}>
                  <span
                    style={linkStyle}
                    onMouseEnter={e => handleLinkHover(e, true)}
                    onMouseLeave={e => handleLinkHover(e, false)}
                  >
                    {String.fromCharCode(8594)} {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div style={colTitleStyle}>Categories</div>
            <ul style={linkListStyle}>
              {categories.map(cat => (
                <li key={cat}>
                  <span
                    style={linkStyle}
                    onMouseEnter={e => handleLinkHover(e, true)}
                    onMouseLeave={e => handleLinkHover(e, false)}
                  >
                    {String.fromCharCode(8594)} {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <div style={colTitleStyle}>Built With</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {techStack.map(t => (
                <span key={t} style={badgeStyle}>{t}</span>
              ))}
            </div>
          </div>

        </div>

        <hr style={dividerStyle} />

        <div style={bottomStyle}>

          {/* Copyright */}
          <div style={{ fontSize: '0.8rem', color: '#4a3e30' }}>
            <p style={{ margin: 0 }}>
              📚 Digital Library System &copy; {currentYear} — Soft Copy Reading Platform
            </p>
            <p style={{ marginTop: '4px', color: '#3a2e20', fontSize: '0.75rem' }}>
              Made with ❤️ by AKSHAY PRATAP SINGH
            </p>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#4a3e30', fontWeight: 600 }}>
              Follow us
            </span>
            <a
            
              href="https://www.instagram.com/inexhaustible_glory"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              title="Instagram"
              onMouseEnter={e => handleSocialHover(e, true, 'ig')}
              onMouseLeave={e => handleSocialHover(e, false, 'ig')}
            >
              <InstagramSVG />
            </a>
            <a
            
              href="https://www.linkedin.com/in/pratapakshay"
              target="_blank"
              rel="noopener noreferrer"
              style={socialLinkStyle}
              title="LinkedIn"
              onMouseEnter={e => handleSocialHover(e, true, 'li')}
              onMouseLeave={e => handleSocialHover(e, false, 'li')}
            >
              <LinkedInSVG />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;