'use client';
import { DinoType, Expression } from '@/lib/types';

interface Props {
  type: DinoType;
  expression?: Expression;
  size?: number;
  animated?: boolean;
}

function getEyes(expr: Expression) {
  switch (expr) {
    case 'happy': return { ly: 10, ry: 10, lh: 4, rh: 4, mouth: 'smile' };
    case 'tired': return { ly: 11, ry: 11, lh: 2, rh: 2, mouth: 'flat' };
    case 'hungry': return { ly: 10, ry: 10, lh: 3, rh: 3, mouth: 'open' };
    case 'sad': return { ly: 11, ry: 11, lh: 3, rh: 3, mouth: 'frown' };
    default: return { ly: 10, ry: 10, lh: 3, rh: 3, mouth: 'flat' };
  }
}

export default function DinoSprite({ type, expression = 'neutral', size = 120, animated = true }: Props) {
  const eyes = getEyes(expression);

  const colors: Record<DinoType, { body: string; belly: string; accent: string }> = {
    aqua: { body: '#4fc3f7', belly: '#b3e5fc', accent: '#0288d1' },
    ignis: { body: '#ff7043', belly: '#ffccbc', accent: '#e64a19' },
    terra: { body: '#66bb6a', belly: '#c8e6c9', accent: '#2e7d32' },
  };
  const c = colors[type];

  const mouthPath = eyes.mouth === 'smile'
    ? 'M12,18 Q16,22 20,18'
    : eyes.mouth === 'open'
    ? 'M13,18 L19,18 L19,21 L13,21 Z'
    : eyes.mouth === 'frown'
    ? 'M12,20 Q16,17 20,20'
    : 'M13,18 L19,18';

  return (
    <svg
      width={size} height={size} viewBox="0 0 32 32"
      className={animated ? 'dino-sprite' : ''}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Body */}
      <rect x="8" y="6" width="16" height="18" rx="3" fill={c.body} />
      {/* Belly */}
      <rect x="11" y="12" width="10" height="9" rx="2" fill={c.belly} />
      {/* Head bumps */}
      {type === 'ignis' && <>
        <rect x="10" y="4" width="3" height="3" fill={c.accent} />
        <rect x="15" y="3" width="3" height="4" fill={c.accent} />
        <rect x="20" y="4" width="3" height="3" fill={c.accent} />
      </>}
      {type === 'aqua' && <>
        <circle cx="10" cy="5" r="2" fill={c.accent} opacity="0.6" />
        <circle cx="22" cy="7" r="1.5" fill={c.accent} opacity="0.4" />
      </>}
      {type === 'terra' && <>
        <polygon points="12,4 14,1 16,4" fill="#4caf50" />
        <polygon points="17,3 19,0 21,3" fill="#388e3c" />
      </>}
      {/* Eyes */}
      <rect x="11" y={eyes.ly} width="3" height={eyes.lh} rx="1" fill="#1a1a2e" />
      <rect x="18" y={eyes.ry} width="3" height={eyes.rh} rx="1" fill="#1a1a2e" />
      {/* Eye shine */}
      {expression === 'happy' && <>
        <rect x="12" y={eyes.ly} width="1" height="1" fill="white" />
        <rect x="19" y={eyes.ry} width="1" height="1" fill="white" />
      </>}
      {/* Mouth */}
      <path d={mouthPath} stroke="#1a1a2e" strokeWidth="0.8" fill={eyes.mouth === 'open' ? c.accent : 'none'} />
      {/* Legs */}
      <rect x="10" y="23" width="4" height="4" rx="1" fill={c.accent} />
      <rect x="18" y="23" width="4" height="4" rx="1" fill={c.accent} />
      {/* Tail */}
      <rect x="4" y="16" width="5" height="3" rx="1" fill={c.body} />
      <rect x="2" y="15" width="3" height="3" rx="1" fill={c.accent} />
      {/* Arms */}
      <rect x="6" y="12" width="3" height="2" rx="1" fill={c.body} />
      <rect x="23" y="12" width="3" height="2" rx="1" fill={c.body} />
    </svg>
  );
}
