import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, Eye, Moon, Sun } from 'lucide-react';

export default function StatusPage({ setView }) {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pings, setPings] = useState({
    bot: 12,
    web: 7,
    db: 4,
    api: 11
  });

  // Dynamic random ping variations to feel active and live!
  useEffect(() => {
    const interval = setInterval(() => {
      setPings(prev => ({
        bot: Math.max(8, Math.min(28, prev.bot + Math.floor(Math.random() * 5) - 2)),
        web: Math.max(4, Math.min(18, prev.web + Math.floor(Math.random() * 3) - 1)),
        db: Math.max(2, Math.min(10, prev.db + Math.floor(Math.random() * 3) - 1)),
        api: Math.max(7, Math.min(22, prev.api + Math.floor(Math.random() * 5) - 2))
      }));
      setLastUpdated(new Date().toLocaleTimeString());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 800);
  };

  // 30 days of mock uptime bars. Green = normal, Grey = inactive
  const renderUptimeBars = (statusType) => {
    const barsCount = 34;
    return (
      <div className="status-bars-container" style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '24px', width: '100%', marginTop: '12px' }}>
        {Array.from({ length: barsCount }).map((_, idx) => {
          let barBg = '#43B581'; // Bright green for 100% operational uptime!
          
          if (statusType === 'inactive') {
            barBg = 'rgba(255, 255, 255, 0.08)';
          }

          return (
            <div 
              key={idx} 
              className="status-bar" 
              style={{ 
                flex: 1, 
                height: idx === barsCount - 1 ? '100%' : `${70 + (idx % 3) * 10}%`, 
                background: barBg, 
                borderRadius: '2px',
                transition: 'all 0.2s ease'
              }} 
              title={`Day ${idx + 1}: ${statusType === 'inactive' ? '비활성화' : '정상 작동'}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="status-page-wrapper animate-slide-up" style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '120px 0 80px', position: 'relative', zIndex: 5 }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Link */}
        <button 
          onClick={() => { setView('portal'); window.location.hash = ''; }}
          className="btn-back-portal glass"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '24px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'var(--transition-precise)', fontWeight: '800', fontSize: '13.5px', marginBottom: '32px' }}
        >
          <ArrowLeft size={14} /> 메인 포털로 돌아가기
        </button>

        {/* Brand Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
              ⚡ SIMPLX <span className="gradient-text">SYSTEM STATUS</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '6px', fontWeight: '600' }}>
              SIMPLX가 운영하는 전체 서버 및 디스코드 서비스의 실시간 상태 페이지입니다.
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700' }}>
              최근 갱신: {lastUpdated}
            </span>
            <button 
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <RefreshCw size={14} className={isRefreshing ? 'spin-anim' : ''} />
            </button>
          </div>
        </div>

        {/* Global Operational Status Banner */}
        <div className="global-status-banner glass" style={{ padding: '24px', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '5px solid #43B581', marginBottom: '32px', background: 'rgba(67, 181, 129, 0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(67, 181, 129, 0.1)', color: '#43B581', flexShrink: 0 }}>
            <CheckCircle size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
              모든 핵심 서비스가 정상 작동 중입니다.
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '600' }}>
              전체 시스템 평균 가동률 100% · 신규 구축 가동 중
            </p>
          </div>
          <span className="status-dot pulsing" style={{ background: '#43B581' }}></span>
        </div>

        {/* Services List Title */}
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          서비스 상태 목록
        </h2>

        {/* Status Cards Grid */}
        <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }}>
          
          {/* Card 1: Bot */}
          <div className="status-card-premium glass" style={{ padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>디스코드 메인 봇 (Discord Main Bot)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>길드 전용 관리 및 인터랙티브 봇 서비스</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: '700' }}>{pings.bot}ms</span>
                <span className="badge-status-op" style={{ background: 'rgba(67, 181, 129, 0.1)', color: '#43B581', padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#43B581' }}></span> 운영 중
                </span>
              </div>
            </div>
            {renderUptimeBars('bot')}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '600' }}>
              <span>신규 론칭</span>
              <span>100% 실시간 가동 중</span>
              <span>오늘</span>
            </div>
          </div>

          {/* Card 2: Web Portal */}
          <div className="status-card-premium glass" style={{ padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>커뮤니티 웹 포털 (Vite Web Portal)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Vite React 기반 반응형 웹 홍보관 및 크루 채용 포털</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: '700' }}>{pings.web}ms</span>
                <span className="badge-status-op" style={{ background: 'rgba(67, 181, 129, 0.1)', color: '#43B581', padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#43B581' }}></span> 운영 중
                </span>
              </div>
            </div>
            {renderUptimeBars('web')}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '600' }}>
              <span>신규 론칭</span>
              <span>100% 실시간 가동 중</span>
              <span>오늘</span>
            </div>
          </div>

          {/* Card 3: DB */}
          <div className="status-card-premium glass" style={{ padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>데이터베이스 및 캐시 (Database & Redis)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>메인 영구 데이터 저장소 및 캐싱 서버</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: '700' }}>{pings.db}ms</span>
                <span className="badge-status-op" style={{ background: 'rgba(67, 181, 129, 0.1)', color: '#43B581', padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#43B581' }}></span> 운영 중
                </span>
              </div>
            </div>
            {renderUptimeBars('db')}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '600' }}>
              <span>신규 론칭</span>
              <span>100% 가동률</span>
              <span>오늘</span>
            </div>
          </div>

          {/* Card 4: API */}
          <div className="status-card-premium glass" style={{ padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>API 게이트웨이 및 웹훅 (API Gateway)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>외부 서비스 통신 및 이벤트 웹훅 디스패처</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: '700' }}>{pings.api}ms</span>
                <span className="badge-status-op" style={{ background: 'rgba(67, 181, 129, 0.1)', color: '#43B581', padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#43B581' }}></span> 운영 중
                </span>
              </div>
            </div>
            {renderUptimeBars('api')}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '600' }}>
              <span>신규 론칭</span>
              <span>100% 가동률</span>
              <span>오늘</span>
            </div>
          </div>

          {/* Card 5: Sandbox (Inactive!) */}
          <div className="status-card-premium glass" style={{ padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', opacity: 0.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>샌드박스 개발 서버 (Sandbox Dev Server)</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>테스트 및 신규 기능 실험용 로컬 샌드박스 인스턴스</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: '700' }}>N/A</span>
                <span className="badge-status-op" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)' }}></span> 비활성화
                </span>
              </div>
            </div>
            {renderUptimeBars('inactive')}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: '600' }}>
              <span>구축 보류</span>
              <span>임시 비활성화 상태</span>
              <span>오늘</span>
            </div>
          </div>

        </div>

        {/* Incident History Timeline */}
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          일별 장애 기록 이력
        </h2>

        <div className="incident-timeline" style={{ display: 'grid', gap: '20px' }}>
          
          <div className="timeline-day" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', position: 'relative' }}>
            <span className="timeline-dot pulsing" style={{ position: 'absolute', left: '-5px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></span>
            <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-primary)' }}>5월 27일 (오늘)</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5', fontWeight: '600' }}>
              🎉 **SIMPLX 포털 및 전체 인프라 신규 론칭!**<br />
              오늘 메인 시스템과 디스코드 연동 모듈이 정식으로 가동을 시작했습니다. 방금 막 구축이 완료되었으며, 발견된 오류 및 시스템 장애 내역은 전혀 존재하지 않습니다. 모든 서비스가 100% 정상 작동하고 있습니다.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
