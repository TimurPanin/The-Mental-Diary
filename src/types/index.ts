export { TimeLeft } from '../utils/timerUtils'
export { Theme } from '../styles/theme'

export interface TimerState {
  isRunning: boolean
  isPaused: boolean
  timeLeft: TimeLeft
  totalSeconds: number
}

export interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  reminderTime: string;
  reminderFrequency: 'daily' | 'weekly' | 'custom';
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  currentMonthlyTheme?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  content: string;
  mood: MoodType;
  energyLevel: number; // 1-10
  stressLevel: number; // 1-10
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  aiAnalysis?: AIAnalysis;
  monthlyTheme?: string;
}

export type MoodType = 
  | '😊' | '😄' | '😌' | '😐' | '😔' | '😢' | '😡' | '😰' | '😴' | '🤗';

export interface MoodData {
  mood: MoodType;
  label: string;
  color: string;
  description: string;
}

export interface AnalyticsData {
  averageMood: number;
  averageEnergy: number;
  averageStress: number;
  totalEntries: number;
  streakDays: number;
  moodTrend: MoodTrendPoint[];
  emotionAnalysis?: EmotionAnalysis;
}

export interface MoodTrendPoint {
  date: string;
  mood: number;
  energy: number;
  stress: number;
}

export interface AISuggestion {
  id: string;
  type: 'support' | 'question' | 'insight' | 'exercise' | 'theme_task';
  content: string;
  timestamp: Date;
  relatedTheme?: string;
}

export interface Reminder {
  id: string;
  userId: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'custom';
  isActive: boolean;
  message: string;
}

// Новые типы для дополнительных функций

export interface MonthlyTheme {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  tasks: ThemeTask[];
  duration: 'week' | 'month';
  startDate: Date;
}

export interface ThemeTask {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'one_time';
  completed: boolean;
  completedDate?: Date;
}

export interface AIAnalysis {
  emotions: EmotionScore[];
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  suggestions: string[];
  stressLevel: number;
  anxietyLevel: number;
  gratitudeLevel: number;
}

export interface EmotionScore {
  emotion: string;
  score: number; // 0-1
  intensity: 'low' | 'medium' | 'high';
}

export interface EmotionAnalysis {
  dominantEmotions: string[];
  emotionalTrend: 'improving' | 'declining' | 'stable';
  recommendations: string[];
  patterns: EmotionPattern[];
}

export interface EmotionPattern {
  pattern: string;
  frequency: number;
  description: string;
  suggestion: string;
}

export interface MicroExercise {
  id: string;
  title: string;
  description: string;
  type: 'breathing' | 'meditation' | 'physical' | 'mindfulness';
  duration: number; // в минутах
  difficulty: 'easy' | 'medium' | 'hard';
  videoUrl?: string;
  instructions: string[];
  benefits: string[];
  completed: boolean;
  completedDate?: Date;
}

export interface BreathingExercise extends MicroExercise {
  type: 'breathing';
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  cycles: number;
}

export interface MoodBoosterTask {
  id: string;
  title: string;
  description: string;
  category: 'social' | 'physical' | 'creative' | 'self_care' | 'learning';
  estimatedTime: number; // в минутах
  energyLevel: 'low' | 'medium' | 'high';
  completed: boolean;
  completedDate?: Date;
}

export interface ExportOptions {
  format: 'pdf' | 'markdown' | 'json';
  dateRange: {
    start: Date;
    end: Date;
  };
  includeAnalytics: boolean;
  includeAI: boolean;
  includeExercises: boolean;
}

export interface BackupData {
  version: string;
  exportDate: Date;
  user: User;
  entries: JournalEntry[];
  analytics: AnalyticsData;
  themes: MonthlyTheme[];
  exercises: MicroExercise[];
  tasks: MoodBoosterTask[];
  reminders: Reminder[];
}

export interface AppState {
  user: User | null;
  entries: JournalEntry[];
  analytics: AnalyticsData | null;
  suggestions: AISuggestion[];
  reminders: Reminder[];
  monthlyThemes: MonthlyTheme[];
  currentTheme: MonthlyTheme | null;
  exercises: MicroExercise[];
  moodBoosters: MoodBoosterTask[];
  isLoading: boolean;
  error: string | null;
}
