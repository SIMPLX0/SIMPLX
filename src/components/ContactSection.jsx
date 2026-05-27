import React, { useState } from 'react';

export default function ContactSection({ addToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'project',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('필수 입력란을 채워 주십시오.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(`성공적으로 제출되었습니다! ${formData.name}님께 회신 이메일을 전송해 드리겠습니다.`, 'success');
      setFormData({
        name: '',
        email: '',
        subject: 'project',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="contact" className="section-wrapper" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        
        {/* Section title */}
        <div className="section-title-container" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px', textAlign: 'left', marginBottom: 32 }}>
          <span className="section-tag">문의 및 제안</span>
          <h2 className="section-title" style={{ fontWeight: '800' }}>커뮤니티와 함께하기</h2>
          <p className="section-desc" style={{ fontSize: '15px', lineHeight: '1.65', fontWeight: '700' }}>
            사이드 프로젝트 파트너십, 스터디 개설 제안, 또는 크루 합류 등 다양한 대화와 문의를 언제나 환영합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-grid-corp" style={{ marginTop: 24 }}>
          <div className="form-group-corp">
            <label style={{ fontWeight: '800', fontSize: '13px' }}>성함 또는 디스코드 닉네임 *</label>
            <input
              type="text"
              name="name"
              className="form-input-corp"
              placeholder="예: 홍길동 (simplx_id)"
              value={formData.name}
              onChange={handleInputChange}
              style={{ fontWeight: '700', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginTop: '4px' }}
              required
            />
          </div>

          <div className="form-group-corp" style={{ marginTop: 16 }}>
            <label style={{ fontWeight: '800', fontSize: '13px' }}>회신받으실 이메일 주소 *</label>
            <input
              type="email"
              name="email"
              className="form-input-corp"
              placeholder="예: contact@domain.com"
              value={formData.email}
              onChange={handleInputChange}
              style={{ fontWeight: '700', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginTop: '4px' }}
              required
            />
          </div>

          <div className="form-group-corp" style={{ marginTop: 16 }}>
            <label style={{ fontWeight: '800', fontSize: '13px' }}>문의 분류</label>
            <select name="subject" className="form-input-corp" value={formData.subject} onChange={handleInputChange}
              style={{ fontWeight: '700', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginTop: '4px' }}>
              <option value="project">사이드 프로젝트 제안 / 협업</option>
              <option value="alliance">커뮤니티 연대 / 후원 제안</option>
              <option value="recruit">운영지원 / 기술지원 크루 지원</option>
              <option value="other">기타 문의사항</option>
            </select>
          </div>

          <div className="form-group-corp" style={{ marginTop: 16 }}>
            <label style={{ fontWeight: '800', fontSize: '13px' }}>상세 내용 *</label>
            <textarea
              name="message"
              className="form-input-corp form-textarea-corp"
              placeholder="협업 제안서 링크, 스터디 기획안, 혹은 건의 사항 등을 입력해 주세요..."
              value={formData.message}
              onChange={handleInputChange}
              style={{ fontWeight: '700', padding: '12px 14px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginTop: '4px', resize: 'vertical', minHeight: '120px', fontFamily: 'inherit' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-submit-corp"
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 24, padding: '14px', fontSize: '14.5px', fontWeight: '800', borderRadius: '4px', cursor: 'pointer' }}
          >
            {isSubmitting ? '전송 처리 중...' : '문의 제출 완료'}
          </button>
        </form>

      </div>
    </section>
  );
}
