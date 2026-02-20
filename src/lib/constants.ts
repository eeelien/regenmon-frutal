import { DinoType } from './types';

export const PRIVY_APP_ID = 'cmkyyrsbj04bck40bidlscndo';

export const INITIAL_FRUTA = 100;
export const FEED_COST = 10;
export const INITIAL_STATS = { felicidad: 50, energia: 50, hambre: 50 };
export const MAX_STAT = 100;
export const MIN_STAT = 0;
export const MAX_MESSAGES = 20;
export const MAX_ACTIVITIES = 10;

export const DINO_INFO: Record<DinoType, { emoji: string; name: string; desc: string; color: string; bgColor: string }> = {
  aqua: { emoji: '🦕', name: 'Aqua', desc: 'Calmado y sabio, un dino de agua', color: '#4fc3f7', bgColor: '#1a237e' },
  ignis: { emoji: '🦖', name: 'Ignis', desc: 'Energético y ardiente, un dino de fuego', color: '#ff7043', bgColor: '#4e1a00' },
  terra: { emoji: '🐊', name: 'Terra', desc: 'Tranquilo y firme, un dino de tierra', color: '#66bb6a', bgColor: '#1b3a1b' },
};

export const STAT_CHAT_EFFECTS = {
  felicidad: 5,
  energia: -3,
  energiaExtra: -5,
  consecutiveThreshold: 5,
};
