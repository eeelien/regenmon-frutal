import { GameState, RegenmonData, ChatMessage, ActivityEntry, Theme } from './types';

const STORAGE_KEY = 'regenmon_state';

function getState(): GameState {
  if (typeof window === 'undefined') return { regenmon: null, messages: [], activity: [], theme: 'dark' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { regenmon: null, messages: [], activity: [], theme: 'dark' };
    return JSON.parse(raw);
  } catch {
    return { regenmon: null, messages: [], activity: [], theme: 'dark' };
  }
}

function setState(state: GameState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadRegenmon(): RegenmonData | null {
  return getState().regenmon;
}

export function saveRegenmon(data: RegenmonData) {
  const state = getState();
  state.regenmon = data;
  setState(state);
}

export function loadMessages(): ChatMessage[] {
  return getState().messages;
}

export function saveMessages(messages: ChatMessage[]) {
  const state = getState();
  state.messages = messages.slice(-20);
  setState(state);
}

export function loadActivity(): ActivityEntry[] {
  return getState().activity;
}

export function saveActivity(activity: ActivityEntry[]) {
  const state = getState();
  state.activity = activity.slice(-10);
  setState(state);
}

export function loadTheme(): Theme {
  return getState().theme;
}

export function saveTheme(theme: Theme) {
  const state = getState();
  state.theme = theme;
  setState(state);
}

export function clearAll() {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
}
