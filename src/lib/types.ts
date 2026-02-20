export type DinoType = 'aqua' | 'ignis' | 'terra';
export type Expression = 'happy' | 'neutral' | 'tired' | 'hungry' | 'sad';
export type Theme = 'dark' | 'light';

export interface RegenmonStats {
  felicidad: number;
  energia: number;
  hambre: number;
}

export interface RegenmonData {
  name: string;
  type: DinoType;
  stats: RegenmonStats;
  fruta: number;
  createdAt: string;
  memories: string[];
  consecutiveMessages: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ActivityEntry {
  action: string;
  coins: number;
  date: string;
}

export interface GameState {
  regenmon: RegenmonData | null;
  messages: ChatMessage[];
  activity: ActivityEntry[];
  theme: Theme;
}
