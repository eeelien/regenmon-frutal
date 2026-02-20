'use client';
import { useState } from 'react';
import { ChatMessage, RegenmonData } from '@/lib/types';

interface Props {
  messages: ChatMessage[];
  typing: boolean;
  chatFloat: string | null;
  scrollRef: React.RefObject<HTMLDivElement>;
  sendMessage: (text: string) => void;
  regenmon: RegenmonData;
}

export default function ChatBox({ messages, typing, chatFloat, scrollRef, sendMessage, regenmon }: Props) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="chat-section">
      <div className="chat-header">
        <span>💬 Chat con {regenmon.name}</span>
        <span className="memory-indicator">🧠{regenmon.memories.length}</span>
        {chatFloat && <span className="chat-float">{chatFloat}</span>}
      </div>
      <div className="chat-messages" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-msg ${msg.role}`}>
            <div className={`nes-balloon ${msg.role === 'user' ? 'from-right' : 'from-left'}`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="chat-msg assistant">
            <div className="nes-balloon from-left">
              <p className="typing-indicator">Escribiendo<span className="dots">...</span></p>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input-row">
        <input
          className="nes-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Escribe algo..."
          maxLength={200}
        />
        <button className="nes-btn is-primary" onClick={handleSend} disabled={typing || !input.trim()}>
          ▶
        </button>
      </div>
    </div>
  );
}
