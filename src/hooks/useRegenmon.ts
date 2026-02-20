'use client';
import { useState, useEffect, useCallback } from 'react';
import { RegenmonData, DinoType, Expression, ActivityEntry } from '@/lib/types';
import { INITIAL_FRUTA, INITIAL_STATS, FEED_COST, MAX_STAT, MIN_STAT } from '@/lib/constants';
import { loadRegenmon, saveRegenmon, loadActivity, saveActivity } from '@/lib/storage';

export function useRegenmon() {
  const [regenmon, setRegenmon] = useState<RegenmonData | null>(null);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [floatingText, setFloatingText] = useState<string | null>(null);
  const [feeding, setFeeding] = useState(false);

  useEffect(() => {
    setRegenmon(loadRegenmon());
    setActivity(loadActivity());
    setLoaded(true);
  }, []);

  const showFloat = (text: string) => {
    setFloatingText(text);
    setTimeout(() => setFloatingText(null), 1500);
  };

  const create = useCallback((name: string, type: DinoType) => {
    const data: RegenmonData = {
      name, type, stats: { ...INITIAL_STATS }, fruta: INITIAL_FRUTA,
      createdAt: new Date().toISOString(), memories: [], consecutiveMessages: 0,
    };
    setRegenmon(data);
    saveRegenmon(data);
  }, []);

  const clamp = (v: number) => Math.max(MIN_STAT, Math.min(MAX_STAT, v));

  const addActivity = useCallback((action: string, coins: number) => {
    const entry: ActivityEntry = { action, coins, date: new Date().toISOString() };
    setActivity(prev => {
      const next = [entry, ...prev].slice(0, 10);
      saveActivity(next);
      return next;
    });
  }, []);

  const updateRegenmon = useCallback((updater: (r: RegenmonData) => RegenmonData) => {
    setRegenmon(prev => {
      if (!prev) return prev;
      const next = updater(prev);
      next.stats.felicidad = clamp(next.stats.felicidad);
      next.stats.energia = clamp(next.stats.energia);
      next.stats.hambre = clamp(next.stats.hambre);
      next.fruta = Math.max(0, Math.min(999, next.fruta));
      saveRegenmon(next);
      return next;
    });
  }, []);

  const feed = useCallback(() => {
    if (!regenmon || regenmon.fruta < FEED_COST || feeding || regenmon.stats.hambre <= 5) return;
    setFeeding(true);
    setTimeout(() => {
      updateRegenmon(r => ({
        ...r,
        fruta: r.fruta - FEED_COST,
        stats: { ...r.stats, hambre: clamp(r.stats.hambre - 25), felicidad: clamp(r.stats.felicidad + 5) },
      }));
      addActivity('🍎 Alimentar', -FEED_COST);
      showFloat('-10 🍊');
      setFeeding(false);
    }, 2000);
  }, [regenmon, feeding, updateRegenmon, addActivity]);

  const play = useCallback(() => {
    if (!regenmon || regenmon.stats.energia < 15) return;
    updateRegenmon(r => ({
      ...r,
      stats: { ...r.stats, felicidad: clamp(r.stats.felicidad + 15), energia: clamp(r.stats.energia - 15), hambre: clamp(r.stats.hambre + 5) },
    }));
    addActivity('🎮 Jugar', 0);
    showFloat('+15 💚');
  }, [regenmon, updateRegenmon, addActivity]);

  const rest = useCallback(() => {
    if (!regenmon) return;
    updateRegenmon(r => ({
      ...r,
      stats: { ...r.stats, energia: clamp(r.stats.energia + 25), hambre: clamp(r.stats.hambre + 10) },
    }));
    addActivity('😴 Descansar', 0);
    showFloat('+25 ⚡');
  }, [regenmon, updateRegenmon, addActivity]);

  const getExpression = useCallback((): Expression => {
    if (!regenmon) return 'neutral';
    const { felicidad, energia, hambre } = regenmon.stats;
    if (energia < 30) return 'tired';
    if (hambre > 70) return 'hungry';
    if (felicidad < 30) return 'sad';
    if (felicidad > 70) return 'happy';
    return 'neutral';
  }, [regenmon]);

  const reset = useCallback(() => {
    setRegenmon(null);
    setActivity([]);
    saveActivity([]);
    if (typeof window !== 'undefined') localStorage.removeItem('regenmon_state');
  }, []);

  return { regenmon, activity, loaded, floatingText, feeding, create, feed, play, rest, getExpression, updateRegenmon, addActivity, reset };
}
