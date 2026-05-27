import React from 'react';

export default function PartnerSection() {
  const commitments = [
    {
      title: "01 / 아비터 검수 신뢰 보증",
      desc: "단순히 자금만을 묶어두는 플랫폼이 아닙니다. 길드가 임명한 경험 많은 시니어 코더가 코드의 구성, 빌드 가능 상태, 기획 부합성을 직접 검수하여 기술 분쟁을 차단합니다.",
      tag: "기술 검수"
    },
    {
      title: "02 / 에스크로 예치 프로세스",
      desc: "의뢰인과 개발자 간의 신뢰 장벽을 허뭅니다. 거래 당사자 양측의 동의 혹은 아비터 중립 서명이 있기 전까지 대금을 공정하게 에스크로 계좌에 예치하여 먹튀 리스크를 원천 봉쇄합니다.",
      tag: "안전 예치"
    },
    {
      title: "03 / 투명한 최소 중개 실비",
      desc: "대형 아웃소싱 매칭 포털들의 10~20% 폭리형 수수료 구조를 지양합니다. 분쟁 조정에 참여한 길드 아비터들의 실질적인 분석 노력에 대한 수당 수준의 최소 수수료만을 적용합니다.",
      tag: "수수료 최적화"
    },
    {
      title: "04 / 기여도 기반 평판 네트워크",
      desc: "신용은 가장 훌륭한 자산입니다. SIMPLX 내 모든 성실한 예치 거래 및 디스코드 기술 기여 이력은 개발자 프로필 평판으로 실시간 축적되어, 서로가 믿고 매칭할 수 있는 기반이 됩니다.",
      tag: "평판 네트워크"
    }
  ];

  return (
    <section id="partner" className="section-wrapper" style={{ background: 'var(--bg-secondary)', borderBlock: '1px solid var(--border-color)' }}>
      <div className="container">
        
        {/* Section title */}
        <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px' }}>
          <span className="section-tag">에스크로 안전 연대</span>
          <h2 className="section-title" style={{ fontWeight: '800' }}>신용과 기술로 연대하는 개발 안전 연대.</h2>
          <p className="section-desc">
            SIMPLX는 분쟁이 끊이지 않는 상업적 프리랜서 마켓을 지양합니다. 우리는 코더들의 끈끈한 기여도 연대와 정직한 기술적 보증 약속을 최우선으로 여깁니다.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="partner-grid-minimal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '32px' }}>
          {commitments.map((item, idx) => (
            <article key={idx} className="partner-card-minimal" style={{ padding: '28px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-lg)', background: 'var(--bg-primary)', transition: 'var(--transition-precise)' }}>
              <span className="section-tag" style={{ color: 'var(--accent)', fontWeight: 800, marginBottom: '12px' }}>
                {item.tag}
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginTop: 8, fontWeight: '700' }}>
                {item.desc}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
