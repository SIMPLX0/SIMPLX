import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Eye, Trophy, Percent } from 'lucide-react';

export default function PlaygroundSection() {
  const [designLevel, setDesignLevel] = useState(3);
  const [animLevel, setAnimLevel] = useState(4);
  const [featureLevel, setFeatureLevel] = useState(3);
  
  const [features, setFeatures] = useState({
    mockups: true,
    darkMode: true,
    canvasGraphics: false,
    localDb: false
  });

  const [activeTheme, setActiveTheme] = useState('indigo'); // 'indigo', 'emerald', 'gold', 'ruby'

  // Metric calculation state
  const [metrics, setMetrics] = useState({ brandImpact: 0, conversion: 0, delight: 0 });

  useEffect(() => {
    // Dynamic premium scoring calculations
    let baseImpact = 35 + (designLevel * 7) + (animLevel * 5) + (featureLevel * 4);
    if (features.mockups) baseImpact += 8;
    if (features.canvasGraphics) baseImpact += 12;
    if (features.darkMode) baseImpact += 5;
    baseImpact = Math.min(baseImpact, 99.9);

    let baseConversion = 12 + (designLevel * 6) + (featureLevel * 5);
    if (features.mockups) baseConversion += 10;
    if (features.localDb) baseConversion += 15;
    if (features.darkMode) baseConversion += 4;
    baseConversion = Math.min(baseConversion, 88.5);

    let baseDelight = 40 + (animLevel * 8) + (designLevel * 6);
    if (features.mockups) baseDelight += 12;
    if (features.canvasGraphics) baseDelight += 8;
    baseDelight = Math.min(baseDelight, 99.8);

    setMetrics({
      brandImpact: Number(baseImpact.toFixed(1)),
      conversion: Number(baseConversion.toFixed(1)),
      delight: Number(baseDelight.toFixed(1))
    });

  }, [designLevel, animLevel, featureLevel, features]);

  const handleCheckboxChange = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getThemeColors = () => {
    switch (activeTheme) {
      case 'emerald':
        return { primary: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', text: '그린 클랜 (Emerald)' };
      case 'gold':
        return { primary: '#eab308', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', text: '골드 길드 (Gold)' };
      case 'ruby':
        return { primary: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', text: '루비 가디언즈 (Ruby)' };
      default: // indigo
        return { primary: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', text: '로열 빌더스 (Indigo)' };
    }
  };

  const currentTheme = getThemeColors();

  // Floating speed calculation based on slider
  const floatDuration = `${8 - (animLevel * 1.2)}s`;

  return (
    <section id="playground" className="section-wrapper">
      <div className="container">
        
        {/* Section title */}
        <div className="section-title-container">
          <span className="section-tag">SIMPLX INFLUENCE SIMULATOR</span>
          <h2 className="section-title">자신의 길드 기여도와 혜택을 계산해 보세요.</h2>
          <p className="section-desc">
            디스코드 참여 레벨, 누적 안전 거래량, 프로젝트 기여 옵션을 대입해 보십시오. 실시간 평판 상승률 및 예상 연간 추가 수익 지표가 정밀 산출됩니다.
          </p>
        </div>

        <div className="playground-grid">
          
          {/* Controls Console */}
          <div className="playground-console glass">
            <h3 className="play-title">
              <Sliders size={22} style={{ color: 'var(--accent)' }} />
              길드 시뮬레이터 제어반
            </h3>

            <div className="sliders-container">
              {/* Slider 1: Community Activity */}
              <div className="slider-group">
                <div className="slider-lbl-container">
                  <span>디스코드 서버 활동성 (Activity)</span>
                  <span className="slider-val">Level {designLevel}/5</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={designLevel} 
                  className="play-slider" 
                  onChange={(e) => setDesignLevel(Number(e.target.value))}
                />
              </div>

              {/* Slider 2: Verified Trades */}
              <div className="slider-group">
                <div className="slider-lbl-container">
                  <span>외주 및 템플릿 안전 거래량 (Trades)</span>
                  <span className="slider-val">Level {animLevel}/5</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={animLevel} 
                  className="play-slider" 
                  onChange={(e) => setAnimLevel(Number(e.target.value))}
                />
              </div>

              {/* Slider 3: Code Contributions */}
              <div className="slider-group">
                <div className="slider-lbl-container">
                  <span>오픈소스 및 길드 프로젝트 기여도</span>
                  <span className="slider-val">Level {featureLevel}/5</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={featureLevel} 
                  className="play-slider" 
                  onChange={(e) => setFeatureLevel(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Checkboxes Group */}
            <div className="checkbox-group">
              <label className="custom-cb">
                <input 
                  type="checkbox" 
                  checked={features.mockups} 
                  onChange={() => handleCheckboxChange('mockups')}
                />
                <div className="cb-box">✓</div>
                <span>디스코드 프로필 인증</span>
              </label>

              <label className="custom-cb">
                <input 
                  type="checkbox" 
                  checked={features.darkMode} 
                  onChange={() => handleCheckboxChange('darkMode')}
                />
                <div className="cb-box">✓</div>
                <span>에스크로 안전 거래</span>
              </label>

              <label className="custom-cb">
                <input 
                  type="checkbox" 
                  checked={features.canvasGraphics} 
                  onChange={() => handleCheckboxChange('canvasGraphics')}
                />
                <div className="cb-box">✓</div>
                <span>길드 봇 연동 동기화</span>
              </label>

              <label className="custom-cb">
                <input 
                  type="checkbox" 
                  checked={features.localDb} 
                  onChange={() => handleCheckboxChange('localDb')}
                />
                <div className="cb-box">✓</div>
                <span>개발 신뢰 티어 갱신</span>
              </label>
            </div>

            {/* Dynamic Preset Themes Selector inside Configurator */}
            <div style={{ marginTop: 24 }}>
              <span style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 12 }}>
                적용된 스튜디오 테마: <span style={{ color: currentTheme.primary, textTransform: 'none' }}>{currentTheme.text}</span>
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                {['indigo', 'emerald', 'gold', 'ruby'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTheme(t)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      border: activeTheme === t ? '2px solid var(--text-primary)' : '1px solid var(--border-glass)',
                      background: t === 'emerald' ? '#10b981' : t === 'gold' ? '#eab308' : t === 'ruby' ? '#f43f5e' : '#6366f1',
                      cursor: 'pointer',
                      transform: activeTheme === t ? 'scale(1.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                    title={t}
                    aria-label={`${t} 클랜 테마 선택`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Output & Dynamic Frame Preview */}
          <div className="playground-results">
            
            {/* Dynamic Interactive Mockup Screen */}
            <div className="mockup-preview-screen" style={{ borderColor: currentTheme.primary }}>
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot"></span>
                  <span className="mockup-dot"></span>
                  <span className="mockup-dot"></span>
                </div>
                <span style={{ fontSize: '10px', color: '#64748b', fontStyle: 'monospace' }}>#simplx-verified-trading</span>
                <Eye size={12} style={{ color: '#64748b' }} />
              </div>

              <div className="mockup-body">
                {/* Floating graphic depending on Design level & checkboxes */}
                <div 
                  className={animLevel > 1 ? "animate-float" : ""}
                  style={{ 
                    animationDuration: floatDuration,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 8
                  }}
                >
                  <div 
                    style={{
                      width: 60 + (designLevel * 8),
                      height: 60 + (designLevel * 8),
                      borderRadius: features.canvasGraphics ? '50%' : '16px',
                      background: currentTheme.gradient,
                      boxShadow: features.mockups ? `0 10px 30px rgba(${activeTheme === 'emerald' ? '16,185,129' : activeTheme === 'gold' ? '234,179,8' : activeTheme === 'ruby' ? '244,63,94' : '99,102,241'}, 0.4)` : 'none',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '24px'
                    }}
                  >
                    ⚡
                  </div>
                </div>

                <h4 style={{ textShadow: features.mockups ? `0 0 10px ${currentTheme.primary}` : 'none' }}>
                  {designLevel >= 5 ? '개발 신용: 마스터 빌더 (Master)' : designLevel >= 3 ? '베테랑 코더 (Veteran)' : '일반 개발 멤버 (Newbie)'}
                </h4>
                <p>
                  서버 내에 총 {featureLevel * 4}개의 기여 노드가 성공적으로 활성화되었습니다. 
                  {features.localDb ? ' 개발자 포트폴리오 평판 동기화 작동 중.' : ''}
                </p>
              </div>

              <div className="mockup-stats-strip">
                <div className="mockup-stat-item">
                  <span className="mock-stat-val">{metrics.brandImpact}%</span>
                  <span className="mock-stat-lbl">평판 지수</span>
                </div>
                <div className="mockup-stat-item">
                  <span className="mock-stat-val">{metrics.conversion}%</span>
                  <span className="mock-stat-lbl">수익 상승률</span>
                </div>
                <div className="mockup-stat-item">
                  <span className="mock-stat-val">{metrics.delight}%</span>
                  <span className="mock-stat-lbl">의결권 지분</span>
                </div>
              </div>
            </div>

            {/* Calculations Dashboard */}
            <div className="result-card glass" style={{ borderLeft: `4px solid ${currentTheme.primary}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: currentTheme.primary, marginBottom: 8 }}>
                    <Trophy size={20} />
                  </div>
                  <h4 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {metrics.brandImpact}%
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                    개발 평판 지수
                  </p>
                </div>
                
                <div style={{ height: 40, width: 1, background: 'var(--border-glass)' }}></div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: '#10b981', marginBottom: 8 }}>
                    <Percent size={20} />
                  </div>
                  <h4 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    +{metrics.conversion}%
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                    예상 보상 배분 상승률
                  </p>
                </div>

                <div style={{ height: 40, width: 1, background: 'var(--border-glass)' }}></div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', color: '#ec4899', marginBottom: 8 }}>
                    <Sparkles size={20} />
                  </div>
                  <h4 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {metrics.delight}%
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                    의사결정 의결권 지분
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
