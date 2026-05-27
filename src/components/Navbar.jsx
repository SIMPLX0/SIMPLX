import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection, onSectionChange, theme, onThemeToggle }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'info', label: '소개' },
    { id: 'features', label: '특징' },
    { id: 'hiring', label: '크루 모집' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: '제안 및 문의' },
  ];

  const handleNav = (id) => {
    onSectionChange(id);
    setMobileOpen(false);
  };

  return (
    <header className="header-nav container animate-slide-up">
      <nav className="nav-container glass">
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); handleNav('hero'); }}>
          <span>⚡</span> SIMPLX
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            onClick={onThemeToggle}
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            aria-label="테마 전환"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button className="nav-cta" onClick={() => handleNav('contact')}>
            <Sparkles size={12} /> 크루 합류하기
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mobile-nav-dropdown glass">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="mobile-nav-divider" />
          <button className="mobile-nav-cta" onClick={() => handleNav('contact')}>
            <Sparkles size={13} /> 크루 합류하기
          </button>
        </div>
      )}
    </header>
  );
}
