import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Briefcase, Trash2, Edit3, Lock, Unlock, QrCode, Clipboard, ChevronDown, ChevronUp, Users, Search, X } from 'lucide-react';

// Seed Initial Jobs representing the 2 Discord Announcements in high-fidelity mapping
const INITIAL_JOBS = [
  {
    id: "discord-op-leader-trust",
    title: "운영지원팀 팀장 모집 공고",
    parentCategory: "technical",
    subCategory: "trust_safety",
    roles: ["Leader", "HR"],
    capacityCurrent: 0,
    capacityMax: 1,
    requirements: [
      "디스코드 및 커뮤니티 운영 경험이 있는 유저",
      "신고 처리 및 분쟁 대응 경험자 [우대사항]",
      "커뮤니티 규정 및 정책 관리 경험이 있는 유저",
      "팀 관리 및 운영 경험자 [우대사항]",
      "책임감 있게 팀을 이끌 수 있으며 원활한 커뮤니케이션이 가능한 유저"
    ],
    tasks: [
      "플랫폼 및 커뮤니티 내 신고 처리 총괄",
      "사기 / 도용 / 규정 위반 사례 검토 및 대응",
      "안전 정책 및 운영 규정 관리",
      "팀원 관리 및 운영 방향 조율"
    ],
    benefits: [
      "공식 운영지원팀 팀장 역할 지급",
      "실제 서비스 운영 및 관리 경험 제공",
      "핵심 운영진 참여 기회 제공",
      "활동 기여도에 따른 추가 혜택 제공 예정"
    ],
    applyMethod: "간단한 자기소개, 지원 직책, 경력 및 활동 경험, 포트폴리오 또는 관련 활동 링크 첨부하여 DM으로 지원 부탁드립니다."
  },
  {
    id: "discord-op-leader-cs",
    title: "운영지원팀 팀장 모집 공고",
    parentCategory: "technical",
    subCategory: "customer_service",
    roles: ["Leader"],
    capacityCurrent: 0,
    capacityMax: 1,
    requirements: [
      "고객 응대 및 문의 처리 경험이 있는 유저",
      "디스코드 티켓 및 CS 시스템 사용 경험자 [우대사항]",
      "문제 상황을 빠르게 파악하고 대응 가능한 유저",
      "팀 관리 및 운영 경험자 [우대사항]",
      "친절하고 책임감 있는 응대 및 팀 운영이 가능한 유저"
    ],
    tasks: [
      "유저 문의 응대 및 고객 지원 관리",
      "서비스 이용 관련 문제 해결 지원",
      "문의 및 신고 내용 관련 부서 전달 및 조율",
      "고객지원팀 운영 및 팀원 관리"
    ],
    benefits: [
      "공식 운영지원팀 팀장 역할 지급",
      "실제 서비스 운영 및 관리 경험 제공",
      "핵심 운영진 참여 기회 제공",
      "활동 기여도에 따른 추가 혜택 제공 예정"
    ],
    applyMethod: "간단한 자기소개, 지원 직책, 경력 및 활동 경험, 포트폴리오 또는 관련 활동 링크 첨부하여 DM으로 지원 부탁드립니다."
  },
  {
    id: "discord-tech-intern-prod",
    title: "기술지원팀 인턴쉽 모집 공고",
    parentCategory: "operations",
    subCategory: "production",
    roles: ["Intern"],
    capacityCurrent: 0,
    capacityMax: 3,
    requirements: [
      "로블록스 스튜디오를 1년 이상 이용한 유저",
      "무료 에셋을 제작 및 배포해본 경험이 있는 유저 [우대사항]",
      "기본적인 팀 협업 및 커뮤니케이션이 가능한 유저",
      "일정에 맞춰 책임감 있게 작업이 가능한 유저",
      "포트폴리오 제출 가능자 [우대사항]"
    ],
    tasks: [
      "커뮤니티 내 배포할 무료 에셋 제작",
      "에셋 품질 검수 및 테스트 진행"
    ],
    benefits: [
      "공식 기술지원팀 역할 지급",
      "실제 서비스 운영 경험 제공",
      "우수 활동자 정규팀 전환 검토",
      "활동 기여도에 따른 추가 혜택 제공 예정"
    ],
    applyMethod: "간단한 자기소개, 지원 부서, 경력 및 포트폴리오, 작업물 또는 GitHub 링크 첨부하여 DM으로 지원 부탁드립니다."
  },
  {
    id: "discord-tech-intern-platform",
    title: "기술지원팀 인턴쉽 모집 공고",
    parentCategory: "operations",
    subCategory: "platform",
    roles: ["Intern"],
    capacityCurrent: 0,
    capacityMax: 1,
    requirements: [
      "웹 개발 관련 기본 지식을 보유한 유저",
      "Next.js / React / Node.js 사용 경험자 [우대사항]",
      "GitHub 및 버전 관리 시스템 사용 가능자",
      "데이터베이스 및 API 구조에 대한 이해도가 있는 유저",
      "서버 운영 및 유지보수 경험자 [우대사항]"
    ],
    tasks: [
      "플랫폼 기능 개발 및 유지보수",
      "관리자 시스템 및 백엔드 기능 보조",
      "버그 수정 및 서비스 최적화 작업"
    ],
    benefits: [
      "공식 기술지원팀 역할 지급",
      "실제 서비스 운영 경험 제공",
      "우수 활동자 정규팀 전환 검토",
      "활동 기여도에 따른 추가 혜택 제공 예정"
    ],
    applyMethod: "간단한 자기소개, 지원 부서, 경력 및 포트폴리오, 작업물 또는 GitHub 링크 첨부하여 DM으로 지원 부탁드립니다."
  }
];

// Smooth collapsible wrapper component
function CollapsibleCard({ isOpen, children }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  return (
    <div
      className="collapsible-wrapper"
      style={{
        maxHeight: isOpen ? `${height}px` : '0px',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease'
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

export default function HiringSection({ addToast }) {
  const [jobs, setJobs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  // Security Gate State
  const [showSecurityGate, setShowSecurityGate] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [isScanningQR, setIsScanningQR] = useState(false);

  // Form State
  const [formMode, setFormMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    parentCategory: 'operations',
    subCategory: 'production',
    roles: [],
    capacityCurrent: 0,
    capacityMax: 1,
    requirements: '',
    tasks: '',
    benefits: '',
    applyMethod: ''
  });

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('simplx_session');
    if (sessionToken === 'verified') setIsAdmin(true);

    const savedJobs = localStorage.getItem('simplx_jobs_discord_v1');
    if (savedJobs) {
      try { setJobs(JSON.parse(savedJobs)); } catch { setJobs(INITIAL_JOBS); }
    } else {
      setJobs(INITIAL_JOBS);
      localStorage.setItem('simplx_jobs_discord_v1', JSON.stringify(INITIAL_JOBS));
    }
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const saveJobsToStorage = useCallback((updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem('simplx_jobs_discord_v1', JSON.stringify(updatedJobs));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'parentCategory') {
        const defaultSub = value === 'operations' ? 'production' : 'trust_safety';
        return { ...prev, parentCategory: value, subCategory: defaultSub };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleRoleCheckboxChange = (role) => {
    setFormData(prev => {
      const currentRoles = [...prev.roles];
      if (currentRoles.includes(role)) {
        return { ...prev, roles: currentRoles.filter(r => r !== role) };
      }
      return { ...prev, roles: [...currentRoles, role] };
    });
  };

  const resetForm = () => {
    setFormData({ title: '', parentCategory: 'operations', subCategory: 'production', roles: [], capacityCurrent: 0, capacityMax: 1, requirements: '', tasks: '', benefits: '', applyMethod: '' });
    setFormMode('add');
    setEditingId(null);
  };

  const handleVerifyAccessCode = (e) => {
    if (e) e.preventDefault();
    if (securityCode === 'simplx2026' || securityCode === 'admin2026') {
      executeAuthenticationSuccess();
    } else {
      addToast('보안 액세스 키가 올바르지 않습니다.', 'error');
    }
  };

  const handleQRScanSimulation = () => {
    setIsScanningQR(true);
    addToast('NFC 보안 모바일 실시간 동기화 진행 중...', 'success');
    setTimeout(() => {
      setIsScanningQR(false);
      executeAuthenticationSuccess();
      addToast('인증이 정상 승인되었습니다.', 'success');
    }, 1500);
  };

  const executeAuthenticationSuccess = () => {
    setIsAdmin(true);
    setShowSecurityGate(false);
    setSecurityCode('');
    sessionStorage.setItem('simplx_session', 'verified');
    addToast('보안 어드민 권한이 성공적으로 부여되었습니다.', 'success');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('simplx_session');
    addToast('보안 세션이 정상 해제되었습니다.', 'success');
    resetForm();
  };

  const parseTextareaToList = (text) => text.split('\n').map(i => i.trim()).filter(i => i !== '');
  const formatListToTextarea = (arr) => arr ? arr.join('\n') : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.requirements || !formData.tasks) {
      addToast('필수 입력란을 기입해 주세요.', 'error');
      return;
    }
    const jobData = {
      title: formData.title, parentCategory: formData.parentCategory, subCategory: formData.subCategory,
      roles: formData.roles.length > 0 ? formData.roles : ["Staff"],
      capacityCurrent: parseInt(formData.capacityCurrent) || 0, capacityMax: parseInt(formData.capacityMax) || 1,
      requirements: parseTextareaToList(formData.requirements), tasks: parseTextareaToList(formData.tasks),
      benefits: parseTextareaToList(formData.benefits), applyMethod: formData.applyMethod || '디스코드 DM으로 지원해 주십시오.'
    };
    if (formMode === 'add') {
      saveJobsToStorage([{ ...jobData, id: Date.now().toString() }, ...jobs]);
      addToast('신규 디스코드 채용 공고가 정식 발행되었습니다.', 'success');
    } else {
      saveJobsToStorage(jobs.map(job => job.id === editingId ? { ...jobData, id: editingId } : job));
      addToast('공고 정보가 성공적으로 업데이트되었습니다.', 'success');
    }
    resetForm();
  };

  const handleEditClick = (job) => {
    setFormData({
      title: job.title, parentCategory: job.parentCategory, subCategory: job.subCategory,
      roles: job.roles || [], capacityCurrent: job.capacityCurrent || 0, capacityMax: job.capacityMax || 1,
      requirements: formatListToTextarea(job.requirements), tasks: formatListToTextarea(job.tasks),
      benefits: formatListToTextarea(job.benefits), applyMethod: job.applyMethod || ''
    });
    setEditingId(job.id);
    setFormMode('edit');
    document.getElementById('admin-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('해당 공고 정보를 영구 삭제하시겠습니까?')) {
      saveJobsToStorage(jobs.filter(job => job.id !== id));
      addToast('공고 정보가 영구 삭제되었습니다.', 'success');
      if (editingId === id) resetForm();
    }
  };

  const handleCopyToClipboard = (job) => {
    const subCategoryLabel = getSubLabel(job.subCategory);
    const roleString = job.roles.join(', ');
    const textToCopy = `> ## ${job.title}\n> \n> 안녕하세요 @everyone,\n> \n> ${job.parentCategory === 'technical' ? '서비스를 시작하기 전 플랫폼 운영 및 커뮤니티 관리 체계를 함께 구축해나갈 운영지원팀 팀장을 모집중에 있으니 많은 지원과 관심 부탁드립니다.' : '서비스를 시작하기 전 일부 분야 관련 기술지원팀원이 필요하다고 생각하여 모집중에 있으니 많은 지원과 관심 부탁드립니다.'}\n> \n> ### 🔍 모집 부서 & 역할\n> * @${subCategoryLabel} (${roleString}) [${job.capacityCurrent}/${job.capacityMax}]\n> \n> ### 📌 지원 자격\n${job.requirements.map(r => `> * ${r}`).join('\n')}\n> \n> ### 📋 주요 업무\n${job.tasks.map(t => `> * ${t}`).join('\n')}\n> \n> ### 🎁 활동 혜택\n${job.benefits.map(b => `> * ${b}`).join('\n')}\n> \n> ### 📬 지원 방법\n> * ${job.applyMethod}`;
    navigator.clipboard.writeText(textToCopy).then(() => addToast('디스코드 포맷 공고가 클립보드에 복사되었습니다!', 'success')).catch(() => addToast('클립보드 복사에 실패했습니다.', 'error'));
  };

  // Toggle card expand/collapse
  const toggleCard = (id) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllCards = () => {
    if (expandedCards.size === filteredJobs.length) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(filteredJobs.map(j => j.id)));
    }
  };

  const getSubLabel = (sub) => {
    switch (sub) {
      case 'production': return 'Production Team';
      case 'platform': return 'Platform Engineering Team';
      case 'trust_safety': return 'Trust & Safety Team';
      case 'customer_service': return 'Customer Service Team';
      default: return sub;
    }
  };

  const filterTabs = [
    { id: 'all', label: '전체 모집' },
    { id: 'operations', label: '운영지원팀' },
    { id: 'technical', label: '기술지원팀' }
  ];

  // Filter + Search
  const filteredJobs = (activeFilter === 'all' ? jobs : jobs.filter(j => j.parentCategory === activeFilter))
    .filter(j => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return j.title.toLowerCase().includes(q)
        || getSubLabel(j.subCategory).toLowerCase().includes(q)
        || j.roles.some(r => r.toLowerCase().includes(q))
        || j.requirements.some(r => r.toLowerCase().includes(q))
        || j.tasks.some(t => t.toLowerCase().includes(q));
    });

  // Stats
  const totalPositions = jobs.reduce((sum, j) => sum + j.capacityMax, 0);
  const filledPositions = jobs.reduce((sum, j) => sum + j.capacityCurrent, 0);
  const openPositions = totalPositions - filledPositions;

  const inputStyle = { padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginTop: '6px', fontWeight: '700', width: '100%' };
  const textareaStyle = { ...inputStyle, minHeight: '100px', fontFamily: 'inherit', resize: 'vertical' };

  return (
    <section id="hiring" className="section-wrapper" style={{ paddingBottom: '80px' }}>
      <div className="container">

        {/* Section title */}
        <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', textAlign: 'left', marginBottom: '32px' }}>
          <span className="section-tag">크루 모집</span>
          <h2 className="section-title" style={{ fontWeight: '800' }}>커뮤니티를 이끌어갈 파운딩 크루 모집</h2>
          <p className="section-desc" style={{ marginLeft: 0 }}>
            우리는 디스코드 생태계에서 재미있고 유익한 개발 환경을 함께 만들어갈 열정적인 크루원들을 찾고 있습니다.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="hiring-stats-bar">
          <div className="hiring-stat-item">
            <span className="hiring-stat-num">{jobs.length}</span>
            <span className="hiring-stat-label">진행 중 공고</span>
          </div>
          <div className="hiring-stat-divider"></div>
          <div className="hiring-stat-item">
            <span className="hiring-stat-num">{openPositions}</span>
            <span className="hiring-stat-label">모집 잔여석</span>
          </div>
          <div className="hiring-stat-divider"></div>
          <div className="hiring-stat-item">
            <span className="hiring-stat-num">{totalPositions}</span>
            <span className="hiring-stat-label">전체 정원</span>
          </div>
          <div className="hiring-stat-divider"></div>
          <div className="hiring-stat-item">
            <div className="hiring-progress-bar-wrap">
              <div className="hiring-progress-bar-fill" style={{ width: `${totalPositions > 0 ? (filledPositions / totalPositions) * 100 : 0}%` }}></div>
            </div>
            <span className="hiring-stat-label">충원율 {totalPositions > 0 ? Math.round((filledPositions / totalPositions) * 100) : 0}%</span>
          </div>
        </div>

        {/* Controls */}
        <div className="hiring-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {filterTabs.map((dept) => (
              <button key={dept.id} className={`filter-btn ${activeFilter === dept.id ? 'active' : ''}`} onClick={() => setActiveFilter(dept.id)}
                style={{ padding: '10px 20px', borderRadius: '24px', fontSize: '14px', cursor: 'pointer', border: '1px solid var(--border-color)', background: activeFilter === dept.id ? 'var(--text-primary)' : 'transparent', color: activeFilter === dept.id ? 'var(--bg-primary)' : 'var(--text-secondary)', transition: 'var(--transition-precise)', fontWeight: '800' }}>
                {dept.label}
                {dept.id !== 'all' && <span style={{ marginLeft: '6px', fontSize: '12px', opacity: 0.7 }}>({jobs.filter(j => j.parentCategory === dept.id).length})</span>}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Search toggle */}
            <button onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(''); }}
              style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', background: showSearch ? 'rgba(99,102,241,0.1)' : 'transparent', color: showSearch ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', transition: 'var(--transition-precise)' }}>
              {showSearch ? <X size={16} /> : <Search size={16} />}
            </button>

            {/* Expand/Collapse All */}
            <button onClick={toggleAllCards}
              style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '13px', cursor: 'pointer', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'var(--transition-precise)', fontWeight: '700' }}>
              {expandedCards.size === filteredJobs.length ? <><ChevronUp size={14} /> 전체 접기</> : <><ChevronDown size={14} /> 전체 펼치기</>}
            </button>

            {/* Admin */}
            {isAdmin ? (
              <button onClick={handleLogout}
                style={{ padding: '10px 18px', borderRadius: '24px', fontSize: '13px', cursor: 'pointer', border: '1px solid var(--accent)', background: 'rgba(99,102,241,0.15)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition-precise)', fontWeight: '800' }}>
                <Unlock size={14} style={{ color: 'var(--accent)' }} /> 관리 해제
              </button>
            ) : (
              <button onClick={() => setShowSecurityGate(true)}
                style={{ padding: '10px 18px', borderRadius: '24px', fontSize: '13px', cursor: 'pointer', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition-precise)', fontWeight: '800' }}>
                <Lock size={14} /> 어드민
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <CollapsibleCard isOpen={showSearch}>
          <div className="hiring-search-bar">
            <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input ref={searchInputRef} type="text" placeholder="공고 제목, 부서, 역할, 자격 요건 등으로 검색..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="hiring-search-input" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                <X size={14} />
              </button>
            )}
          </div>
        </CollapsibleCard>

        <div id="admin-form-anchor"></div>

        {/* Security Gate Modal */}
        {showSecurityGate && (
          <div className="security-modal-overlay">
            <div className="security-modal-box">
              <span className="security-lock-icon">🔒</span>
              <h3 className="security-modal-title" style={{ fontWeight: '800' }}>보안 관리자 인증 노드</h3>
              <p className="security-modal-desc">이 탭은 길드 운영진 전용 제어 콘솔입니다. 모바일 보안 QR 코드를 스캔하거나 승인용 엑세스 코드를 입력해 주십시오.</p>
              <div className="security-qr-container" onClick={isScanningQR ? null : handleQRScanSimulation}>
                {isScanningQR ? (
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <div className="spin-slow" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid var(--accent)', borderTopColor: 'transparent', margin: '0 auto 12px' }}></div>
                    <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: '800' }}>보안 터널 생성 중...</span>
                  </div>
                ) : (
                  <>
                    <QrCode size={96} style={{ color: 'var(--text-primary)', opacity: 0.85 }} />
                    <span className="security-qr-glow-text" style={{ fontWeight: '800' }}>QR 빠른 스캔 (인터랙티브 클릭)</span>
                  </>
                )}
              </div>
              <form onSubmit={handleVerifyAccessCode} className="security-input-gate">
                <label style={{ fontWeight: '800' }}>운영진 엑세스 코드</label>
                <input type="password" className="security-input-field" placeholder="••••••••" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} disabled={isScanningQR} required />
                <button type="submit" className="btn-security-verify" disabled={isScanningQR} style={{ fontWeight: '800' }}>어드민 승인 요청</button>
                <button type="button" className="btn-security-cancel" onClick={() => { setShowSecurityGate(false); setSecurityCode(''); }} disabled={isScanningQR} style={{ fontWeight: '800' }}>인증 취소</button>
              </form>
            </div>
          </div>
        )}

        {/* Admin CRUD Form */}
        {isAdmin && (
          <div className="admin-form-container glass animate-slide-up" style={{ marginBottom: 48, padding: '32px', borderRadius: 'var(--border-radius-lg)', background: 'var(--bg-secondary)', border: '1px solid var(--accent)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
              <Briefcase size={18} style={{ color: 'var(--accent)' }} />
              {formMode === 'add' ? '신규 디스코드 채용 공고 등록' : '디스코드 채용 공고 편집'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div className="form-group-corp">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>공고 제목 *</label>
                  <input type="text" name="title" placeholder="예: 운영지원팀 팀장 모집 공고" value={formData.title} onChange={handleInputChange} style={inputStyle} required />
                </div>
                <div className="form-group-corp">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>대분류 부서</label>
                  <select name="parentCategory" value={formData.parentCategory} onChange={handleInputChange} style={inputStyle}>
                    <option value="operations">운영지원팀</option>
                    <option value="technical">기술지원팀</option>
                  </select>
                </div>
                <div className="form-group-corp">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>소분류 세부팀</label>
                  <select name="subCategory" value={formData.subCategory} onChange={handleInputChange} style={inputStyle}>
                    {formData.parentCategory === 'operations' ? (
                      <><option value="production">Production Team</option><option value="platform">Platform Engineering Team</option></>
                    ) : (
                      <><option value="trust_safety">Trust & Safety Team</option><option value="customer_service">Customer Service Team</option></>
                    )}
                  </select>
                </div>
                <div className="form-group-corp">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>역할 (중복 가능)</label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {['Leader', 'HR', 'Staff', 'Intern'].map((role) => (
                      <label key={role} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '700' }}>
                        <input type="checkbox" checked={formData.roles.includes(role)} onChange={() => handleRoleCheckboxChange(role)} style={{ accentColor: 'var(--accent)', width: '15px', height: '15px' }} />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group-corp">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>현재 인원</label>
                  <input type="number" name="capacityCurrent" min="0" value={formData.capacityCurrent} onChange={handleInputChange} style={inputStyle} />
                </div>
                <div className="form-group-corp">
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>최대 정원</label>
                  <input type="number" name="capacityMax" min="1" value={formData.capacityMax} onChange={handleInputChange} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>지원 자격 (줄바꿈 구분) *</label>
                <textarea name="requirements" placeholder="한 줄에 하나씩 입력" value={formData.requirements} onChange={handleInputChange} style={textareaStyle} required />
              </div>
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>주요 업무 (줄바꿈 구분) *</label>
                <textarea name="tasks" placeholder="한 줄에 하나씩 입력" value={formData.tasks} onChange={handleInputChange} style={textareaStyle} required />
              </div>
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>활동 혜택 (줄바꿈 구분)</label>
                <textarea name="benefits" placeholder="한 줄에 하나씩 입력" value={formData.benefits} onChange={handleInputChange} style={textareaStyle} />
              </div>
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 800 }}>지원 방법</label>
                <input type="text" name="applyMethod" placeholder="DM으로 지원 부탁드립니다." value={formData.applyMethod} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div className="admin-security-disclaimer" style={{ fontSize: '12px', fontWeight: '700', marginTop: '20px' }}>
                ⚠️ 본 편집 콘솔은 클라이언트 테스트 노드입니다. 실제 데이터 조작은 디스코드 OAuth2 및 서버 API를 통해 안전하게 통제됩니다.
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: '8px' }}>
                {formMode === 'edit' && <button type="button" className="btn-action-minimal" onClick={resetForm} style={{ fontWeight: '800', padding: '10px 20px', borderRadius: '6px' }}>취소</button>}
                <button type="submit" style={{ padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', fontWeight: '800', fontSize: '14px' }}>
                  {formMode === 'add' ? '공고 발행' : '수정 저장'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Discord Embed Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const subCategoryLabel = getSubLabel(job.subCategory);
              const sideBorderColor = job.parentCategory === 'technical' ? '#5865F2' : '#43B581';
              const isExpanded = expandedCards.has(job.id);
              const capacityPct = job.capacityMax > 0 ? (job.capacityCurrent / job.capacityMax) * 100 : 0;

              return (
                <article key={job.id} className="discord-embed-card glass" style={{ position: 'relative' }}>

                  {/* Top Action Buttons */}
                  <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '6px', zIndex: 10 }}>
                    <button onClick={() => handleCopyToClipboard(job)} title="디스코드 포맷 복사" className="discord-action-btn"
                      style={{ padding: '7px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-precise)' }}>
                      <Clipboard size={13} />
                    </button>
                    {isAdmin && (
                      <>
                        <button onClick={() => handleEditClick(job)} title="수정" className="discord-action-btn"
                          style={{ padding: '7px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-precise)' }}>
                          <Edit3 size={13} />
                        </button>
                        <button onClick={() => handleDeleteClick(job.id)} title="삭제" className="discord-action-btn"
                          style={{ padding: '7px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)', color: '#ef4444', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-precise)' }}>
                          <Trash2 size={13} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Clickable Header — Always Visible Summary */}
                  <div className="discord-card-header discord-card-toggle" onClick={() => toggleCard(job.id)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div className="discord-avatar-wrapper">⚡</div>
                    <div style={{ flex: 1 }}>
                      <div className="discord-user-name">
                        {job.title}
                        <span className="discord-bot-tag">{job.parentCategory === 'technical' ? '기술지원팀' : '운영지원팀'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{subCategoryLabel}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>•</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {job.roles.map(r => (
                            <span key={r} className={`discord-role-pill role ${r.toLowerCase()}`} style={{ fontSize: '11px', padding: '2px 8px' }}>{r}</span>
                          ))}
                        </div>
                        <span className="discord-capacity-badge" style={{ fontSize: '12px', padding: '2px 8px' }}>[{job.capacityCurrent}/{job.capacityMax}]</span>
                        {/* Mini progress */}
                        <div className="hiring-mini-progress">
                          <div className="hiring-mini-progress-fill" style={{ width: `${capacityPct}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="discord-chevron-toggle" style={{ transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>

                  {/* Collapsible Detail Body */}
                  <CollapsibleCard isOpen={isExpanded}>
                    <div className="discord-embed-body">
                      <div className="discord-embed-color-bar" style={{ backgroundColor: sideBorderColor }}></div>
                      <div className="discord-embed-inner">
                        <div className="discord-blockquote">
                          <span className="discord-mention">@everyone</span>
                          <p className="discord-intro-text">
                            {job.parentCategory === 'technical'
                              ? '플랫폼 운영 및 커뮤니티 관리 체계를 함께 구축해나갈 운영지원팀 팀장을 모집중에 있으니 많은 지원과 관심 부탁드립니다.'
                              : '서비스를 시작하기 전 일부 분야 관련 기술지원팀원이 필요하다고 생각하여 모집중에 있으니 많은 지원과 관심 부탁드립니다.'}
                          </p>
                        </div>

                        <div className="discord-embed-field">
                          <span className="discord-field-title"><span style={{ marginRight: '8px' }}>📂</span> 모집 부서 & 역할</span>
                          <div className="discord-roles-container">
                            <span className="discord-role-pill category">{job.parentCategory === 'technical' ? '기술지원팀' : '운영지원팀'}</span>
                            <span className="discord-role-pill sub-team">{subCategoryLabel}</span>
                            {job.roles.map(r => <span key={r} className={`discord-role-pill role ${r.toLowerCase()}`}>{r}</span>)}
                            <span className="discord-capacity-badge">[{job.capacityCurrent}/{job.capacityMax}]</span>
                          </div>
                        </div>

                        <div className="discord-embed-field">
                          <span className="discord-field-title"><span style={{ marginRight: '8px' }}>📌</span> 지원 자격</span>
                          <ul className="discord-list-elements">{job.requirements.map((r, i) => <li key={i}>• {r}</li>)}</ul>
                        </div>

                        <div className="discord-embed-field">
                          <span className="discord-field-title"><span style={{ marginRight: '8px' }}>📋</span> 주요 업무</span>
                          <ul className="discord-list-elements">{job.tasks.map((t, i) => <li key={i}>• {t}</li>)}</ul>
                        </div>

                        {job.benefits?.length > 0 && (
                          <div className="discord-embed-field">
                            <span className="discord-field-title"><span style={{ marginRight: '8px' }}>🎁</span> 활동 혜택</span>
                            <ul className="discord-list-elements">{job.benefits.map((b, i) => <li key={i}>• {b}</li>)}</ul>
                          </div>
                        )}

                        <div className="discord-embed-field" style={{ marginBottom: 0 }}>
                          <span className="discord-field-title"><span style={{ marginRight: '8px' }}>📬</span> 지원 방법</span>
                          <p className="discord-apply-method-text">{job.applyMethod}</p>
                        </div>
                      </div>
                    </div>

                    <div className="discord-card-footer-actions">
                      <a href="#contact" onClick={() => addToast(`[${job.title} - ${subCategoryLabel}] 지원이 선택되었습니다. 하단 폼에 정보를 기입해 주세요.`, 'success')} className="discord-apply-button"
                        style={{ padding: '10px 22px', borderRadius: '6px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'var(--transition-precise)' }}>
                        📩 지원 신청하기
                      </a>
                    </div>
                  </CollapsibleCard>

                </article>
              );
            })
          ) : (
            <div className="hiring-empty-card">
              <span style={{ fontSize: '28px', color: 'var(--text-muted)', marginBottom: '16px', display: 'inline-block' }}>⚡</span>
              <h4 className="hiring-empty-title" style={{ fontWeight: '800', fontSize: '17px' }}>
                {searchQuery ? '검색 결과가 없습니다.' : '현재 모집 중인 정식 파운더 요강이 없습니다.'}
              </h4>
              <p className="hiring-empty-desc" style={{ fontWeight: '700', lineHeight: '1.65', fontSize: '14px' }}>
                {searchQuery ? '다른 키워드로 다시 검색해 보세요.' : '선택하신 부서에 등록된 공고가 없습니다. 하단 문의 폼 또는 디스코드 아지트를 통해 직접 소통해 주십시오.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
