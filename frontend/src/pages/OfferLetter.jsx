import React, { forwardRef } from 'react';

/**
 * OfferLetter Component
 * Renders a pixel-perfect corporate internship offer letter.
 * Accepts `candidate` object and `offerDetails` config.
 * forwardRef allows parent to get a ref for print/PDF export.
 */
const OfferLetter = forwardRef(({ candidate, offerDetails = {} }, ref) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const {
    role = candidate?.roleApplied || 'Software Development Intern',
    duration = '3 Months',
    startDate = 'To be communicated',
    mode = 'Remote',
    stipend = 'Unpaid (Learning-Based)',
    founderName = 'Harshit Tripathi',
    founderDesignation = 'Founder & CEO, WaveMind Solutions',
    gstNo = '09AXXXXX1234Z1',
    udyamNo = 'UDYAM-UP-XX-XXXXXXX',
  } = offerDetails;

  return (
    <div
      ref={ref}
      id="offer-letter-document"
      style={{
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        background: '#ffffff',
        color: '#1a1a2e',
        width: '794px',       // A4 width in px at 96dpi
        minHeight: '1123px',  // A4 height
        margin: '0 auto',
        padding: '56px 64px',
        boxSizing: 'border-box',
        fontSize: '13px',
        lineHeight: '1.7',
        position: 'relative',
        boxShadow: '0 4px 40px rgba(0,0,0,0.10)',
      }}
    >
      {/* ── TOP ACCENT LINE ───────────────────────────────────────────────── */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #1a1a2e 0%, #4f46e5 60%, #818cf8 100%)', marginBottom: '36px', borderRadius: '2px' }} />

      {/* ── HEADER: Company + Metadata ────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        {/* Left: Branding */}
        <div>
          <div style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '0.04em', color: '#0f0f23', lineHeight: '1.2' }}>
            WAVEMIND
          </div>
          <div style={{ fontSize: '22px', fontWeight: '300', letterSpacing: '0.18em', color: '#4f46e5', lineHeight: '1.2' }}>
            SOLUTIONS
          </div>
          <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.12em', marginTop: '4px', fontWeight: '500' }}>
            TECHNOLOGY · INNOVATION · GROWTH
          </div>
        </div>

        {/* Right: Metadata */}
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#374151', lineHeight: '1.9' }}>
          <div><span style={{ color: '#6b7280', fontWeight: '600' }}>GST No.&nbsp;&nbsp;</span>{gstNo}</div>
          <div><span style={{ color: '#6b7280', fontWeight: '600' }}>UDYAM Reg.&nbsp;&nbsp;</span>{udyamNo}</div>
          <div><span style={{ color: '#6b7280', fontWeight: '600' }}>Date&nbsp;&nbsp;</span>{formattedDate}</div>
        </div>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '28px' }} />

      {/* ── DOCUMENT TITLE ───────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '16px',
          fontWeight: '800',
          letterSpacing: '0.22em',
          color: '#0f0f23',
          textTransform: 'uppercase',
          borderBottom: '2px solid #4f46e5',
          paddingBottom: '6px',
        }}>
          Internship Offer Letter
        </div>
      </div>

      {/* ── RECIPIENT BLOCK ───────────────────────────────────────────────── */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', letterSpacing: '0.12em', marginBottom: '8px' }}>TO</div>
        <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f0f23' }}>{candidate?.name || 'Candidate Name'}</div>
        <div style={{ color: '#4b5563', fontSize: '12px' }}>{candidate?.email || 'candidate@email.com'}</div>
        {candidate?.phone && (
          <div style={{ color: '#4b5563', fontSize: '12px' }}>{candidate.phone}</div>
        )}
      </div>

      {/* ── SALUTATION & BODY ─────────────────────────────────────────────── */}
      <p style={{ marginBottom: '14px' }}>
        <strong>Dear {candidate?.name?.split(' ')[0] || 'Candidate'},</strong>
      </p>
      <p style={{ marginBottom: '18px', color: '#374151', textAlign: 'justify' }}>
        We are pleased to inform you that after a careful review of your application and evaluation process,
        WaveMind Solutions is delighted to extend this <strong>Internship Offer</strong> to you. We were
        impressed by your skills, enthusiasm, and potential, and we believe you will be a valuable contributor
        to our team.
      </p>
      <p style={{ marginBottom: '28px', color: '#374151' }}>
        Please review the following terms of your internship engagement:
      </p>

      {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '24px' }} />

      {/* ── INTERNSHIP DETAILS ────────────────────────────────────────────── */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em',
          color: '#4f46e5', textTransform: 'uppercase', marginBottom: '16px',
        }}>
          01 &nbsp;·&nbsp; Internship Details
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {[
            ['Designation / Role', role],
            ['Internship Duration', duration],
            ['Commencement Date', startDate],
            ['Mode of Work', mode],
            ['Stipend', stipend],
            ['Reporting To', 'Founder & CEO'],
          ].map(([label, value], i) => (
            <div
              key={label}
              style={{
                padding: '12px 18px',
                background: i % 2 === 0 ? '#fafafa' : '#ffffff',
                borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontWeight: '700', color: '#111827', fontSize: '13px' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '24px' }} />

      {/* ── ROLES & RESPONSIBILITIES ──────────────────────────────────────── */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em',
          color: '#4f46e5', textTransform: 'uppercase', marginBottom: '14px',
        }}>
          02 &nbsp;·&nbsp; Roles &amp; Responsibilities
        </div>
        <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', color: '#374151' }}>
          {[
            'Collaborate with the core development team on live projects and product features.',
            'Contribute to designing, building, and maintaining software solutions as per project requirements.',
            'Participate in team meetings, code reviews, and knowledge-sharing sessions.',
            'Document technical processes, learnings, and project updates regularly.',
            'Adhere to company coding standards, deadlines, and professional conduct guidelines.',
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#4f46e5', fontWeight: '800', minWidth: '16px', marginTop: '1px', fontSize: '11px' }}>›</span>
              <span style={{ fontSize: '12.5px' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '24px' }} />

      {/* ── PERKS & BENEFITS ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          fontSize: '10px', fontWeight: '700', letterSpacing: '0.16em',
          color: '#4f46e5', textTransform: 'uppercase', marginBottom: '14px',
        }}>
          03 &nbsp;·&nbsp; Perks &amp; Benefits
        </div>
        <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', color: '#374151' }}>
          {[
            'Official Internship Certificate from WaveMind Solutions upon successful completion.',
            'Letter of Recommendation based on performance and contribution.',
            'Hands-on experience with real-world enterprise-grade products.',
            'Mentorship directly from industry-experienced professionals.',
            'Pre-placement opportunity for top performers based on business requirements.',
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#10b981', fontWeight: '800', minWidth: '16px', marginTop: '1px', fontSize: '11px' }}>✓</span>
              <span style={{ fontSize: '12.5px' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '24px' }} />

      {/* ── CLOSING PARAGRAPH ─────────────────────────────────────────────── */}
      <p style={{ color: '#374151', marginBottom: '32px', textAlign: 'justify' }}>
        We trust that this internship will be a mutually rewarding experience. Please confirm your acceptance
        by signing and returning this letter within <strong>3 working days</strong>. Failure to respond within
        the stipulated time may result in the offer being withdrawn. We look forward to welcoming you to the
        WaveMind family.
      </p>

      {/* ── SIGNATURE SECTION ─────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '40px' }}>
        {/* Left: Authorized Signatory */}
        <div>
          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', color: '#6b7280', textTransform: 'uppercase', marginBottom: '40px' }}>
            Authorized Signatory
          </div>
          {/* Signature placeholder */}
          <div style={{
            width: '130px', height: '42px',
            border: '1px dashed #d1d5db', borderRadius: '6px',
            marginBottom: '10px', display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.06em' }}>Digital Signature</span>
          </div>
          <div style={{ height: '1px', background: '#374151', width: '180px', marginBottom: '6px' }} />
          <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f0f23' }}>{founderName}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>{founderDesignation}</div>
        </div>

        {/* Right: Candidate Acceptance */}
        <div>
          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px' }}>
            Candidate Acceptance
          </div>
          {[
            ['Signature', ''],
            ['Full Name', ''],
            ['Date', ''],
          ].map(([label]) => (
            <div key={label} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
              <div style={{ height: '1px', background: '#d1d5db', width: '200px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM ACCENT LINE ────────────────────────────────────────────── */}
      <div style={{ height: '1px', background: '#e5e7eb', marginBottom: '16px' }} />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: '10px', color: '#9ca3af', lineHeight: '1.6',
      }}>
        <div>
          <strong style={{ color: '#6b7280' }}>WaveMind Solutions</strong><br />
          Lucknow, Uttar Pradesh, India — 226001
        </div>
        <div style={{ textAlign: 'right' }}>
          wavemindsolutions@gmail.com<br />
          www.wavemind.in
        </div>
      </div>

      {/* ── FINAL ACCENT LINE ─────────────────────────────────────────────── */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #818cf8 0%, #4f46e5 40%, #1a1a2e 100%)', marginTop: '16px', borderRadius: '2px' }} />
    </div>
  );
});

OfferLetter.displayName = 'OfferLetter';

export default OfferLetter;
