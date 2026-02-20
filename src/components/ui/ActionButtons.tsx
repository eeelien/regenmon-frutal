'use client';

interface Props {
  onFeed: () => void;
  onPlay: () => void;
  onRest: () => void;
  feeding: boolean;
  canFeed: boolean;
  canPlay: boolean;
}

export default function ActionButtons({ onFeed, onPlay, onRest, feeding, canFeed, canPlay }: Props) {
  return (
    <div className="action-buttons">
      <button
        className={`nes-btn ${canFeed ? 'is-warning' : 'is-disabled'}`}
        onClick={onFeed}
        disabled={!canFeed || feeding}
      >
        {feeding ? '⏳...' : '🍎 Alimentar (10🍊)'}
      </button>
      <button
        className={`nes-btn ${canPlay ? 'is-primary' : 'is-disabled'}`}
        onClick={onPlay}
        disabled={!canPlay}
      >
        🎮 Jugar
      </button>
      <button className="nes-btn is-normal" onClick={onRest}>
        😴 Descansar
      </button>
    </div>
  );
}
