import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onSectionChange }) {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Subtle mouse-tracking gradient
  useEffect(() => {
    const handler = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Dot grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const DOT_SPACING = 32;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;
      frame += 0.008;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;
          // Wave effect
          const wave = Math.sin(c * 0.3 + frame) * Math.cos(r * 0.3 + frame * 0.7);
          const alpha = 0.04 + wave * 0.03;
          const radius = 1 + wave * 0.5;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${Math.max(0.02, alpha)})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Animated dot grid */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Mouse-tracking radial glow */}
      <div
        className="hero-mouse-glow"
        style={{
          background: `radial-gradient(ellipse 700px 500px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(99,102,241,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Static center glow */}
      <div className="hero-center-glow" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content">

          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>GLOBAL COMMUNITY</span>
            <span className="hero-badge-sep">·</span>
            <span>ACTIVE NOW</span>
          </div>

          {/* Main headline */}
          <h1 className="hero-headline">
            코딩을 더 즐겁게,<br />
            <span className="gradient-text">함께 성장하는 개발 아지트</span><br />
            에서 만나요.
          </h1>

          {/* Sub headline */}
          <p className="hero-sub">
            자유롭게 질문하고, 매주 함께 코딩하며, 부담 없이 사이드 프로젝트를 시작하는 디스코드 기반의 활발한 개발자 스페이스입니다.
          </p>

          {/* CTAs */}
          <div className="hero-actions">
            <a
              href="https://discord.gg/simplx"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-primary"
            >
              <svg viewBox="0 0 127.14 96.36" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c2.06-1.51,4.07-3.12,5.95-4.83a73.2,73.2,0,0,0,66.16,0c1.88,1.71,3.89,3.32,5.95,4.83a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,50.7,122.92,27.84,107.7,8.07Z"/>
              </svg>
              디스코드 서버 입장
            </a>
            <button
              onClick={() => onSectionChange && onSectionChange('hiring')}
              className="hero-btn-secondary"
            >
              크루 채용 정보 <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade overlay */}
      <div className="hero-fade-bottom" />
    </section>
  );
}
