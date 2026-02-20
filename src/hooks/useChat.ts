'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, RegenmonData } from '@/lib/types';
import { loadMessages, saveMessages } from '@/lib/storage';
import { STAT_CHAT_EFFECTS, MAX_MESSAGES } from '@/lib/constants';

export function useChat(
  regenmon: RegenmonData | null,
  updateRegenmon: (fn: (r: RegenmonData) => RegenmonData) => void,
  addActivity: (action: string, coins: number) => void,
) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [chatFloat, setChatFloat] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => { setMessages(loadMessages()); }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const showChatFloat = (t: string) => { setChatFloat(t); setTimeout(() => setChatFloat(null), 1500); };

  const sendMessage = useCallback(async (text: string) => {
    if (!regenmon || !text.trim() || typing) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now() };
    const next = [...messages, userMsg].slice(-MAX_MESSAGES);
    setMessages(next);
    saveMessages(next);

    // Update stats for sending a message
    const consecutive = regenmon.consecutiveMessages + 1;
    const energyCost = STAT_CHAT_EFFECTS.energia + (consecutive > STAT_CHAT_EFFECTS.consecutiveThreshold ? STAT_CHAT_EFFECTS.energiaExtra : 0);
    updateRegenmon(r => ({
      ...r,
      stats: {
        ...r.stats,
        felicidad: Math.min(100, r.stats.felicidad + STAT_CHAT_EFFECTS.felicidad),
        energia: Math.max(0, r.stats.energia + energyCost),
      },
      consecutiveMessages: consecutive,
    }));
    showChatFloat('+5 💚');

    setTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(m => ({ role: m.role, content: m.content })),
          stats: regenmon.stats,
          type: regenmon.type,
          name: regenmon.name,
        }),
      });
      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: data.message || '...', timestamp: Date.now(),
      };
      const updated = [...next, assistantMsg].slice(-MAX_MESSAGES);
      setMessages(updated);
      saveMessages(updated);

      // Earn fruta from chatting
      const earn = regenmon.fruta >= 90 ? 2 : regenmon.fruta >= 50 ? 3 : 5;
      updateRegenmon(r => ({ ...r, fruta: Math.min(999, r.fruta + earn) }));
      addActivity('💬 Chat', earn);
      showChatFloat(`+${earn} 🍊`);

      // Save memory
      if (text.toLowerCase().includes('me llamo') || text.toLowerCase().includes('mi nombre')) {
        updateRegenmon(r => ({
          ...r,
          memories: Array.from(new Set([...r.memories, text])).slice(-10),
        }));
      }
    } catch {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: '💤 No puedo responder ahora...', timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errMsg].slice(-MAX_MESSAGES));
    } finally {
      setTyping(false);
    }
  }, [regenmon, messages, typing, updateRegenmon, addActivity]);

  return { messages, typing, chatFloat, scrollRef, sendMessage };
}
