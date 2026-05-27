import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import ContentSections from './components/ContentSections';
import HiringSection from './components/HiringSection';
import SocialGateway from './components/SocialGateway';
import ContactSection from './components/ContactSection';
import StatusPage from './components/StatusPage';
import { MessageSquare, AlertCircle, ArrowUp } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('dark');
  const [toasts, setToasts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [view, setView] = useState('portal'); // 'portal' or 'status'

  useEffect(() => {
    const savedTheme = localStorage.getItem('simplx_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      setTheme('dark');
      document.body.className = 'dark';
    }
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('simplx_theme', nextTheme);
    document.body.className = nextTheme;
    addToast(nextTheme === 'dark' ? '다크 모드로 전환되었습니다.' : '라이트 모드로 전환되었습니다.', 'success');
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = (elementRect - bodyRect) - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Watch URL hash changes for native-feeling status route
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#status') {
        setView('status');
        window.scrollTo({ top: 0 });
      } else {
        setView('portal');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (view === 'status') return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowScrollTop(scrollTop > 500);

      // Scroll Spy
      const sections = ['hero', 'info', 'features', 'hiring', 'playground', 'faq', 'contact'];
      const scrollPosition = scrollTop + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  return (
    <>
      {/* Scroll Progress Bar */}
      {view === 'portal' && <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />}

      {/* Background Ambient Glows */}
      <div className="ambient-glows">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      {/* Floating fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onSectionChange={(id) => {
          if (view === 'status') {
            setView('portal');
            window.location.hash = id === 'hero' ? '' : id;
            setTimeout(() => scrollToSection(id), 50);
          } else {
            scrollToSection(id);
          }
        }}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      {/* Core sections assembly */}
      {view === 'status' ? (
        <StatusPage setView={setView} />
      ) : (
        <main>
          {/* Hero — dramatic opening */}
          <HeroSection onSectionChange={scrollToSection} />

          {/* Info & Pillars */}
          <InfoSection />

          {/* Features + Stats + FAQ */}
          <ContentSections onSectionChange={scrollToSection} />

          {/* Guild Careers CRUD list */}
          <HiringSection addToast={addToast} />

          {/* Social Gateway */}
          <SocialGateway />

          {/* Sleek Contact sheet */}
          <ContactSection addToast={addToast} />
        </main>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <div className="footer-logo">⚡ SIMPLX</div>
              <p className="footer-tagline">
                함께 공부하고 자극받으며 성장하는 끈끈한 개발자들의 소통 및 지식 공유 커뮤니티 허브입니다.
              </p>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col">
                <span className="footer-col-title">플랫폼</span>
                <a href="#info" onClick={(e) => { e.preventDefault(); setView('portal'); window.location.hash = ''; setTimeout(() => scrollToSection('info'), 50); }}>커뮤니티 소개</a>
                <a href="#features" onClick={(e) => { e.preventDefault(); setView('portal'); window.location.hash = ''; setTimeout(() => scrollToSection('features'), 50); }}>특징 & 혜택</a>
                <a href="#hiring" onClick={(e) => { e.preventDefault(); setView('portal'); window.location.hash = ''; setTimeout(() => scrollToSection('hiring'), 50); }}>스태프 모집</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); setView('portal'); window.location.hash = ''; setTimeout(() => scrollToSection('faq'), 50); }}>자주 묻는 질문</a>
              </div>
              <div className="footer-col">
                <span className="footer-col-title">생태계</span>
                <a href="https://discord.gg/simplx" target="_blank" rel="noreferrer">디스코드 채널</a>
                <a href="https://x.com/simplx" target="_blank" rel="noreferrer">공식 트위터</a>
              </div>
              <div className="footer-col">
                <span className="footer-col-title">서버 현황</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="status-dot pulsing" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#43B581' }}></span>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>메인 서버: 운영 중</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.6 }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)' }}></span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>개발 서버: 비활성화</span>
                  </div>
                  <a href="#status" onClick={(e) => { e.preventDefault(); setView('status'); window.location.hash = 'status'; window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '12.5px', marginTop: '4px', textDecoration: 'underline' }}>
                    실시간 상태 페이지 ›
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} SIMPLX. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <span className="footer-link" style={{ cursor: 'pointer' }}>개인정보처리방침</span>
              <span>•</span>
              <span className="footer-link" style={{ cursor: 'pointer' }}>이용약관</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast glass">
            {toast.type === 'success'
              ? <MessageSquare size={14} style={{ color: 'var(--accent)' }} />
              : <AlertCircle size={14} style={{ color: '#ef4444' }} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Scroll Top Button */}
      {showScrollTop && view === 'portal' && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-btn"
          title="맨 위로 스크롤"
          aria-label="맨 위로 스크롤"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </>
  );
}
