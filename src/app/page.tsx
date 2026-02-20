'use client';
import { useState, useEffect } from 'react';
import { useRegenmon } from '@/hooks/useRegenmon';
import { useChat } from '@/hooks/useChat';
import { loadTheme, saveTheme } from '@/lib/storage';
import { Theme } from '@/lib/types';
import CreationScreen from '@/components/screens/CreationScreen';
import GameScreen from '@/components/screens/GameScreen';

export default function Home() {
  const {
    regenmon, activity, loaded, floatingText, feeding,
    create, feed, play, rest, getExpression, updateRegenmon, addActivity, reset,
  } = useRegenmon();

  const { messages, typing, chatFloat, scrollRef, sendMessage } = useChat(regenmon, updateRegenmon, addActivity);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light' : '';
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveTheme(next);
  };

  if (!loaded) return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando...</div>;

  if (!regenmon) return <CreationScreen onCreate={create} />;

  return (
    <GameScreen
      regenmon={regenmon}
      expression={getExpression()}
      activity={activity}
      floatingText={floatingText}
      feeding={feeding}
      onFeed={feed}
      onPlay={play}
      onRest={rest}
      onReset={reset}
      messages={messages}
      typing={typing}
      chatFloat={chatFloat}
      scrollRef={scrollRef}
      sendMessage={sendMessage}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}
