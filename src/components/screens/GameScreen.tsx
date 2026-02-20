'use client';
import { useState } from 'react';
import { RegenmonData, Expression, ActivityEntry } from '@/lib/types';
import { ChatMessage } from '@/lib/types';
import { DINO_INFO } from '@/lib/constants';
import DinoSprite from '@/components/ui/DinoSprite';
import StatBar from '@/components/ui/StatBar';
import FrutaCounter from '@/components/ui/FrutaCounter';
import ActionButtons from '@/components/ui/ActionButtons';
import ActivityHistory from '@/components/ui/ActivityHistory';
import ChatBox from '@/components/chat/ChatBox';
import LoginButton from '@/components/auth/LoginButton';

interface Props {
  regenmon: RegenmonData;
  expression: Expression;
  activity: ActivityEntry[];
  floatingText: string | null;
  feeding: boolean;
  onFeed: () => void;
  onPlay: () => void;
  onRest: () => void;
  onReset: () => void;
  messages: ChatMessage[];
  typing: boolean;
  chatFloat: string | null;
  scrollRef: React.RefObject<HTMLDivElement>;
  sendMessage: (text: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function GameScreen({
  regenmon, expression, activity, floatingText, feeding,
  onFeed, onPlay, onRest, onReset,
  messages, typing, chatFloat, scrollRef, sendMessage,
  theme, onToggleTheme,
}: Props) {
  const info = DINO_INFO[regenmon.type];
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="game-screen" style={{ '--dino-bg': info.bgColor } as React.CSSProperties}>
      {/* Header */}
      <header className="game-header">
        <LoginButton />
        <FrutaCounter fruta={regenmon.fruta} />
        <div className="settings-btns">
          <button className="nes-btn" onClick={onToggleTheme} style={{ fontSize: '10px', padding: '4px 8px' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="nes-btn is-error" onClick={() => setShowResetConfirm(true)} style={{ fontSize: '8px', padding: '4px 8px' }}>
            ⚙️
          </button>
        </div>
      </header>

      {showResetConfirm && (
        <div className="nes-container is-dark reset-modal">
          <p>¿Resetear tu Regenmon? 😢</p>
          <button className="nes-btn is-error" onClick={() => { onReset(); setShowResetConfirm(false); }}>Sí, resetear</button>
          <button className="nes-btn" onClick={() => setShowResetConfirm(false)}>No</button>
        </div>
      )}

      {/* Dino display */}
      <div className="dino-display" style={{ backgroundColor: info.bgColor }}>
        <h2 className="dino-name">{info.emoji} {regenmon.name}</h2>
        <DinoSprite type={regenmon.type} expression={expression} size={160} animated />
        {floatingText && <span className="floating-text">{floatingText}</span>}
        {regenmon.fruta === 0 && <p className="no-fruta-msg">💬 Hablemos y mejora conmigo</p>}
      </div>

      {/* Stats */}
      <div className="stats-section">
        <StatBar label="Felicidad" emoji="💚" value={regenmon.stats.felicidad} color="success" />
        <StatBar label="Energía" emoji="⚡" value={regenmon.stats.energia} color="warning" />
        <StatBar label="Hambre" emoji="🍎" value={regenmon.stats.hambre} color="error" />
      </div>

      {/* Actions */}
      <ActionButtons
        onFeed={onFeed} onPlay={onPlay} onRest={onRest}
        feeding={feeding}
        canFeed={regenmon.fruta >= 10 && regenmon.stats.hambre > 5}
        canPlay={regenmon.stats.energia >= 15}
      />

      {/* Chat */}
      <ChatBox
        messages={messages} typing={typing} chatFloat={chatFloat}
        scrollRef={scrollRef} sendMessage={sendMessage} regenmon={regenmon}
      />

      {/* Activity */}
      <ActivityHistory activity={activity} />
    </div>
  );
}
