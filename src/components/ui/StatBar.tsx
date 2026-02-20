'use client';

interface Props {
  label: string;
  emoji: string;
  value: number;
  color: string;
}

export default function StatBar({ label, emoji, value, color }: Props) {
  return (
    <div className="stat-bar-container">
      <span className="stat-label">{emoji} {label}</span>
      <div className="nes-progress is-pattern" style={{ height: '20px' }}>
        <progress
          className={`nes-progress is-${color}`}
          value={value}
          max={100}
          style={{ height: '20px' }}
        />
      </div>
      <span className="stat-value">{value}/100</span>
    </div>
  );
}
