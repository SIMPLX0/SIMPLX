import React from 'react';

export default function InfoSection() {
  const activeStations = [
    { name: "#개발-잡담" },
    { name: "#코드-리뷰" },
    { name: "#자료-공유" },
    { name: "#팀원-모집" },
    { name: "#질문-답변" },
    { name: "#사이드-프로젝트" },
  ];

  const roadmapPhases = [
    {
      step: "1단계",
      title: "크루 결집 & 소통 채널 정비",
      desc: "커뮤니티 운영 방향을 함께 논의하고, 소통이 잘 되는 채널 구조를 다듬습니다. 초기 멤버들과의 신뢰를 쌓는 것이 첫 번째입니다."
    },
    {
      step: "2단계",
      title: "오픈소스 및 협업 프로젝트 빌딩",
      desc: "다양한 관심사를 가진 크루들과 소규모 토이 프로젝트나 유용한 디스코드 봇, 라이브러리를 자유롭게 기획하고 함께 개발하기 시작합니다."
    },
    {
      step: "3단계",
      title: "지식 아카이브 & 자료실 구축",
      desc: "멤버들이 공유한 유용한 코드 스니펫, 툴, 참고 자료를 정돈된 형태로 쌓아갑니다. 언제든 찾아볼 수 있는 커뮤니티 자산이 됩니다."
    },
    {
      step: "4단계",
      title: "함께 만드는 사이드 프로젝트",
      desc: "신뢰가 쌓인 멤버들끼리 자유롭게 팀을 꾸려 토이 프로젝트나 오픈소스를 시작합니다. 강요 없이 흥미와 역량이 맞는 사람들끼리 자연스럽게."
    }
  ];

  return (
    <section id="info" className="section-wrapper" style={{ paddingTop: '40px' }}>
      <div className="container">

        {/* 채널 마퀴 */}
        <div className="partner-marquee-container glass" style={{ borderRadius: 'var(--border-radius-sm)', marginBottom: '60px' }}>
          <span className="partner-marquee-title">활성 채널</span>
          <div className="partner-marquee-wrapper">
            <div className="partner-marquee-track">
              {[...activeStations, ...activeStations].map((station, idx) => (
                <span key={idx} className="marquee-node">
                  <span style={{ display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginRight: '8px' }}></span>
                  {station.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 섹션 타이틀 */}
        <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', textAlign: 'left', marginBottom: '48px' }}>
          <span className="section-tag">개발자 커뮤니티 허브</span>
          <h2 className="section-title">같이 코딩하고, 서로 배우고, 천천히 성장하는 개발자 모임.</h2>
          <p className="section-desc" style={{ marginLeft: 0 }}>
            거창한 목표보다 지속 가능한 루틴을 먼저 생각합니다. 혼자 하다 막힌 부분을 편하게 물어볼 수 있고, 관심사가 비슷한 동료를 만날 수 있는 디스코드 기반 커뮤니티입니다.
          </p>
        </div>

        {/* 히어로 박스 */}
        <div className="hero-box">
          <span className="section-tag" style={{ color: 'var(--accent)', fontWeight: 800, marginBottom: '8px' }}>⚡ 지금 멤버 모집 중</span>
          <h1 className="hero-title" style={{ fontSize: '32px', lineHeight: '1.25' }}>
            혼자보다 같이가 낫다는 걸<br />
            <span className="gradient-text">직접 경험하게 되는 개발 커뮤니티</span>.
          </h1>
          <p className="hero-subtitle">
            깊은 대화가 오가는 채널, 활발한 팀 협업 프로젝트, 공유가 쌓이는 자료실. 아직 작지만 진심 있는 개발자들이 모이고 있습니다.
          </p>

          <div className="hero-ctas">
            <a href="https://discord.gg/simplx" target="_blank" rel="noopener noreferrer" className="btn-hero-primary">
              ⚡ 디스코드 서버 입장하기 ›
            </a>
          </div>
        </div>

        {/* 핵심 3가지 */}
        <div className="pillars-grid" style={{ marginTop: '56px' }}>

          <div className="pillar-card">
            <span className="pillar-num">01 / 협업 프로젝트</span>
            <h3>자유롭고 역동적인 팀 빌딩</h3>
            <p style={{ marginTop: 8 }}>
              서로 다른 백그라운드를 가진 개발자, 기획자가 한데 모여 참신한 프로젝트 팀을 빌딩하고 실제 프로덕트를 기획 및 배포해 봅니다.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">02 / 질문 & 디버깅</span>
            <h3>막히면 그냥 올리세요</h3>
            <p style={{ marginTop: 8 }}>
              에러 메시지, 이상한 동작, 설계 고민 모두 환영합니다. 혼자 몇 시간 싸우던 문제가 다른 시각 하나로 해결되는 경험을 합니다.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">03 / 자료 공유</span>
            <h3>알게 된 것을 나누는 문화</h3>
            <p style={{ marginTop: 8 }}>
              쓸만한 라이브러리, 유용한 블로그 글, 직접 만든 스니펫. 작은 공유가 쌓이면 커뮤니티 전체의 자산이 됩니다.
            </p>
          </div>

        </div>

        {/* 운영 계획 */}
        <div style={{ marginTop: '80px' }}>
          <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <span className="section-tag">운영 방향</span>
            <h3 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.03em' }}>
              급하지 않게, 그러나 꾸준하게
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              처음부터 완벽한 커뮤니티를 만들려 하지 않습니다. 작게 시작해서 멤버들과 함께 방향을 잡아가는 방식으로 운영합니다.
            </p>
          </div>

          <div className="alliance-carousel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {roadmapPhases.map((phase, idx) => (
              <div key={idx} className="pillar-card" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', padding: '24px' }}>
                <span className="pillar-num" style={{ fontWeight: '800' }}>{phase.step}</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>{phase.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
