import React from 'react';

export default function SocialGateway() {
  const socials = [
    {
      name: "디스코드 커뮤니티",
      desc: "실시간 질답, 분야별 기술 토론, 그리고 다양한 개발 및 기획 프로젝트가 활발히 진행되는 메인 아지트입니다.",
      badge: "120+ ONLINE",
      url: "https://discord.gg/simplx",
      icon: (
         <svg viewBox="0 0 127.14 96.36" width="20" height="20" fill="currentColor">
           <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c2.06-1.51,4.07-3.12,5.95-4.83a73.2,73.2,0,0,0,66.16,0c1.88,1.71,3.89,3.32,5.95,4.83a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,50.7,122.92,27.84,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
         </svg>
      ),
      type: "discord"
    },
    {
      name: "공식 소셜 미디어",
      desc: "기술 트렌드, 커뮤니티의 오픈소스 론칭 소식, 그리고 새로운 스터디 및 크루 모집 공고를 빠르게 공유합니다.",
      badge: "FOLLOW",
      url: "https://x.com/simplx",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      type: "twitter"
    },
    {
      name: "지식 위키 & 아카이브",
      desc: "공동의 가이드라인과 규칙, 그리고 멤버들이 지식 공유 채널에 정리해 둔 개발 백과사전 및 튜토리얼 문서입니다.",
      badge: "DOCS",
      url: "https://docs.simplx-hub.org",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      type: "docs"
    }
  ];

  return (
    <section id="playground" className="section-wrapper">
      <div className="container">

        {/* Section title */}
        <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px', marginBottom: '36px' }}>
          <span className="section-tag">소통 채널</span>
          <h2 className="section-title" style={{ fontWeight: '800' }}>우리가 소통하고 활동하는 공간들</h2>
          <p className="section-desc">자유로운 실시간 소통부터 정제된 기술 문서까지, 언제든 원하는 채널에서 교류해 보세요.</p>
        </div>

        <div className="gateway-layout">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card glass"
            >
              <div className="channel-left">
                <div className="channel-icon">
                  {social.icon}
                </div>
                <div className="channel-info">
                  <h4 style={{ fontWeight: '800', fontSize: '18px' }}>{social.name}</h4>
                  <p style={{ marginTop: 6, fontSize: '13.5px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>{social.desc}</p>
                </div>
              </div>
              <span className={`channel-badge ${social.type === 'docs' ? 'docs' : ''}`} style={{ fontWeight: '800' }}>
                {social.badge}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
