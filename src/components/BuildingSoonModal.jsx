import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

/**
 * Full-screen playful “shipping soon” overlay. Handles Esc, backdrop click, scroll lock.
 */
export default function BuildingSoonModal({
  open,
  onClose,
  title,
  eyebrow,
  description,
  accentColor = '#C75B39',
  IconComponent = Sparkles,
  confirmLabel = "Sounds good — I'll wait",
  secondarySlot = null,
  titleId = 'building-soon-title',
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const body =
    typeof description === 'string' ? (
      <p className="font-inter text-base text-white/75 leading-relaxed mb-8">{description}</p>
    ) : (
      <div className="font-inter text-base text-white/75 leading-relaxed mb-8">{description}</div>
    );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <style>{`
        @keyframes bss-overlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bss-card { from { opacity: 0; transform: scale(0.92) translateY(14px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
      <button
        type="button"
        className="absolute inset-0 bg-[#050510]/85 backdrop-blur-md z-0"
        style={{ animation: 'bss-overlay 0.35s ease-out forwards' }}
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className="relative z-[1] max-w-md w-full rounded-3xl glass-light shadow-[0_0_60px_rgba(0,0,0,0.2),0_25px_50px_rgba(0,0,0,0.45)] overflow-hidden border"
        style={{
          animation: 'bss-card 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) forwards',
          borderColor: `${accentColor}55`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent opacity-90 to-transparent"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}CC, transparent)`,
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${accentColor}26` }}
        />
        <div className="relative p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-12 h-12 shrink-0 rounded-2xl border flex items-center justify-center shadow-inner"
                style={{
                  backgroundColor: `${accentColor}22`,
                  borderColor: `${accentColor}44`,
                  color: accentColor,
                }}
              >
                <IconComponent className="w-6 h-6" aria-hidden />
              </div>
              <div className="min-w-0">
                {eyebrow ? (
                  <p className="font-mono text-[0.62rem] opacity-95 tracking-[0.25em] uppercase mb-1" style={{ color: accentColor }}>
                    {eyebrow}
                  </p>
                ) : null}
                <h2 id={titleId} className="font-display font-bold text-2xl md:text-[1.65rem] text-white leading-tight tracking-tight">
                  {title}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 shrink-0 rounded-full border border-white/15 bg-white/[0.04] text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {body}

          {secondarySlot ? (
            <div className="mb-6 font-inter text-sm text-white/60 leading-relaxed space-y-2">{secondarySlot}</div>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="btn-glow w-full inline-flex justify-center py-4 text-sm font-semibold tracking-wide"
            style={{ '--glow-color': accentColor }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
