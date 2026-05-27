import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

function useCountUp(target, duration = 1800, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ number, suffix, label, started }) {
  const count = useCountUp(number, 1600, started);
  return (
    <div className="stat-card">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// Features — 개발자 커뮤니티 성격에 맞는 자연스러운 콘텐츠
const FEATURES = [
  { 
    color: '#5865F2', 
    tag: '소통', 
    title: '실시간 코드 리뷰 및 질답', 
    desc: '혼자 고민하면 하루 걸릴 문제도, 다른 개발자들의 피드백과 집단지성으로 빠르게 풀어낼 수 있습니다.' 
  },
  { 
    color: '#43B581', 
    tag: '성장', 
    title: '정기 스터디 및 기술 세미나', 
    desc: '새로운 기술 트렌드나 CS 기초, 설계 패턴 등 관심 분야 스터디를 개설하여 함께 공부하고 노하우를 나눕니다.' 
  },
  { 
    color: '#FAA61A', 
    tag: '네트워킹', 
    title: '성장을 돕는 커피챗', 
    desc: '주니어부터 시니어까지, 다양한 백그라운드를 가진 개발자들과 커리어, 테크 트렌드를 공유합니다.' 
  },
  { 
    color: '#EB459E', 
    tag: '협업', 
    title: '사이드 프로젝트 빌딩', 
    desc: '마음이 맞는 크루를 만나 아이디어를 기획하고 론칭합니다. 실전 협업 경험과 멋진 포트폴리오를 만드세요.' 
  },
  { 
    color: '#ED4245', 
    tag: '아카이브', 
    title: '엄선된 개발 레퍼런스', 
    desc: '매일 업로드되는 고품질 개발 아티클, 추천 도서, 오픈소스 라이브러리와 유용한 스니펫이 아카이빙됩니다.' 
  },
  { 
    color: '#7289DA', 
    tag: '경험', 
    title: '커뮤니티 전용 봇 개발', 
    desc: '커뮤니티 활동을 돕는 자체 봇과 자동화 툴을 직접 설계하고 기여하며 실무적인 API 활용 역량을 높입니다.' 
  },
];

// FAQ — 자연스러운 개발자 FAQ 내용
const FAQ_ITEMS = [
  { 
    q: '참여하기 위해 특별한 가입 조건이나 비용이 있나요?', 
    a: '아닙니다! 코딩과 개발에 관심이 있는 분이라면 주니어, 시니어, 비전공자 누구나 환영합니다. 별도의 가입비 없이 디스코드 링크를 통해 자유롭게 합류할 수 있습니다.' 
  },
  { 
    q: '비전공자나 초보 개발자도 질문을 올려도 괜찮을까요?', 
    a: '당연히 환영합니다! 초보자 시절의 질문은 커뮤니티 전체의 학습 자산이 됩니다. 사소한 문법 에러부터 설계 원칙까지, 부담 없이 질문 채널에 편하게 올려주시면 됩니다.' 
  },
  { 
    q: '커뮤니티에서 진행되는 스터디는 어떻게 개설하나요?', 
    a: '#스터디-제안 채널에서 공부하고 싶은 기술 스택이나 도서, 혹은 인터넷 강의 관련 스터디를 발제하여 멤버를 모으실 수 있으며, 누구나 참여하여 함께 성취할 수 있습니다.' 
  },
  { 
    q: '커뮤니티 프로젝트에는 어떻게 참여할 수 있나요?', 
    a: '#사이드-프로젝트 채널에서 크루 모집 공고를 보실 수 있습니다. 혹은 자신이 구상한 아이디어를 직접 발제하여 함께 만들어갈 파트너를 적극적으로 구하실 수도 있습니다.' 
  },
  { 
    q: '기술 스택에 제한이 있나요?', 
    a: '제한은 전혀 없습니다! 웹, 앱, 서버, 인프라, 임베디드, AI/데이터 등 분야와 사용 언어에 상관없이 모든 개발 영역의 다양한 기술 교류를 지향합니다.' 
  },
  { 
    q: '커뮤니티 운영이나 관리(Leader/Staff)에 참여하고 싶어요.', 
    a: '커뮤니티가 지속적으로 커짐에 따라 운영지원팀과 기술지원팀 크루를 적극 모집하고 있습니다. 채용공고 섹션을 확인하시거나, 관리자에게 문의해주시면 친절하게 안내해 드리겠습니다.' 
  },
];

export default function ContentSections({ onSectionChange }) {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── FEATURES SECTION ─────────────────────────────────── */}
      <section id="features" className="section-wrapper features-section">
        <div className="container">
          <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', textAlign: 'left', marginBottom: '56px' }}>
            <span className="section-tag">커뮤니티 특징</span>
            <h2 className="section-title" style={{ fontWeight: '800' }}>
              배움과 성장이 <span className="gradient-text">일상의 루틴이 되는 곳</span>
            </h2>
            <p className="section-desc" style={{ marginLeft: 0, maxWidth: '560px' }}>
              단순한 친목을 넘어 서로의 성장을 자극하는 채널 구성과 건강한 협업 규칙을 제공합니다.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card glass" style={{ '--feature-color': f.color }}>
                <div className="feature-icon-wrap" style={{ background: `${f.color}18`, color: f.color }}>
                  <span style={{ fontSize: '20px' }}>◼</span>
                </div>
                <span className="feature-tag" style={{ color: f.color }}>{f.tag}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS SECTION ────────────────────────────────────── */}
      <section id="stats" className="stats-section" ref={statsRef}>
        <div className="stats-bg-grid"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="stats-inner">
            <div className="stats-headline">
              <span className="section-tag" style={{ color: 'var(--accent)' }}>커뮤니티 지표</span>
              <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.04em', marginTop: '8px', lineHeight: '1.2' }}>
                우리가 함께 쌓아가는<br /><span className="gradient-text">성장의 기록들</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '16px', lineHeight: '1.65', fontWeight: '600' }}>
                매일 주고받는 질문과 피드백, 그리고 함께 완성해 나가는 크고 작은 프로젝트들이 우리 커뮤니티의 건강한 성장을 대변합니다.
              </p>
              <button onClick={() => onSectionChange && onSectionChange('contact')} className="stats-cta-btn">
                크루로 참여하기 <ArrowRight size={15} />
              </button>
            </div>

            <div className="stats-cards">
              <StatCard number={120} suffix="+" label="활동 크루원" started={statsStarted} />
              <StatCard number={18} suffix="개" label="진행된 프로젝트" started={statsStarted} />
              <StatCard number={95} suffix="%" label="답변 완료율" started={statsStarted} />
              <StatCard number={2400} suffix="개+" label="월평균 활성 대화량" started={statsStarted} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ──────────────────────────────────────── */}
      <section id="faq" className="section-wrapper faq-section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', textAlign: 'left', marginBottom: '48px' }}>
            <span className="section-tag">자주 묻는 질문</span>
            <h2 className="section-title" style={{ fontWeight: '800' }}>궁금한 점을 확인해 보세요</h2>
            <p className="section-desc" style={{ marginLeft: 0 }}>커뮤니티 가입과 활동 방식에 대해 가장 많이 주시는 질문들을 모았습니다.</p>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFAQ === i;
              return (
                <div key={i} className={`faq-item ${isOpen ? 'faq-open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFAQ(isOpen ? null : i)}>
                    <span>{item.q}</span>
                    <div className={`faq-chevron ${isOpen ? 'rotated' : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>
                  <div className="faq-answer-wrap" style={{ maxHeight: isOpen ? '500px' : '0px' }}>
                    <div className="faq-answer">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-cta-card glass">
            <div>
              <h4 style={{ fontWeight: '800', fontSize: '18px', marginBottom: '6px' }}>원하는 답변을 찾지 못하셨나요?</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>디스코드의 #문의 채널을 통해 실시간으로 안내받으실 수 있습니다.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://discord.gg/simplx" target="_blank" rel="noopener noreferrer" className="faq-btn-discord">
                <svg viewBox="0 0 127.14 96.36" width="16" height="16" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c2.06-1.51,4.07-3.12,5.95-4.83a73.2,73.2,0,0,0,66.16,0c1.88,1.71,3.89,3.32,5.95,4.83a68.43,68.43,0,0,1-10.5,5?77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,50.7,122.92,27.84,107.7,8.07Z"/>
                </svg>
                디스코드 채널 가기
              </a>
              <button onClick={() => onSectionChange && onSectionChange('contact')} className="faq-btn-contact">
                1:1 문의 보내기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
