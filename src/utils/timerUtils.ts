import CryptoJS from 'crypto-js';
import { format, formatDistanceToNow, startOfDay, endOfDay, eachDayOfInterval } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  JournalEntry, 
  AnalyticsData, 
  MoodTrendPoint, 
  AIAnalysis, 
  EmotionAnalysis,
  MonthlyTheme,
  MicroExercise,
  MoodBoosterTask,
  ExportOptions,
  BackupData
} from '../types';
import { 
  AI_EMOTION_KEYWORDS, 
  AI_RECOMMENDATIONS,
  MONTHLY_THEMES,
  MICRO_EXERCISES,
  MOOD_BOOSTER_TASKS
} from '../constants';

// Шифрование и дешифрование данных
const ENCRYPTION_KEY = 'mental-health-journal-secure-key-2024';

export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Ошибка дешифрования:', error);
    return null;
  }
};

// Форматирование дат
export const formatDate = (date: Date | string): string => {
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'Неизвестная дата';
  }
  return format(dateObj, 'dd MMMM yyyy', { locale: ru });
};

export const formatTime = (date: Date | string): string => {
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    return '--:--';
  }
  return format(dateObj, 'HH:mm', { locale: ru });
};

export const formatRelativeTime = (date: Date | string): string => {
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'неизвестно когда';
  }
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ru });
};

export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};

// Генерация ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Валидация записей
export const validateEntry = (entry: Partial<JournalEntry>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!entry.content || entry.content.trim().length === 0) {
    errors.push('Содержание записи обязательно');
  }

  if (entry.content && entry.content.length > 2000) {
    errors.push('Содержание записи не должно превышать 2000 символов');
  }

  if (!entry.mood) {
    errors.push('Выберите настроение');
  }

  if (entry.energyLevel && (entry.energyLevel < 1 || entry.energyLevel > 10)) {
    errors.push('Уровень энергии должен быть от 1 до 10');
  }

  if (entry.stressLevel && (entry.stressLevel < 1 || entry.stressLevel > 10)) {
    errors.push('Уровень стресса должен быть от 1 до 10');
  }

  if (entry.tags && entry.tags.length > 5) {
    errors.push('Максимум 5 тегов на запись');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Аналитика
export const calculateAnalytics = (entries: JournalEntry[]): AnalyticsData => {
  if (entries.length === 0) {
    return {
      averageMood: 0,
      averageEnergy: 0,
      averageStress: 0,
      totalEntries: 0,
      streakDays: 0,
      moodTrend: []
    };
  }

  // Сортируем записи по дате
  const sortedEntries = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Вычисляем средние значения
  const moodValues = sortedEntries.map(entry => {
    const moodIndex = ['😊', '😄', '😌', '😐', '😔', '😢', '😡', '😰', '😴', '🤗'].indexOf(entry.mood);
    return moodIndex >= 0 ? moodIndex + 1 : 5;
  });

  const averageMood = moodValues.reduce((sum, value) => sum + value, 0) / moodValues.length;
  const averageEnergy = sortedEntries.reduce((sum, entry) => sum + entry.energyLevel, 0) / entries.length;
  const averageStress = sortedEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / entries.length;

  // Вычисляем серию дней
  let streakDays = 0;
  const today = new Date();
  const todayStart = startOfDay(today);

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(todayStart);
    checkDate.setDate(checkDate.getDate() - i);
    
    const hasEntry = entries.some(entry => 
      startOfDay(entry.date).getTime() === checkDate.getTime()
    );

    if (hasEntry) {
      streakDays++;
    } else {
      break;
    }
  }

  // Создаем тренд настроения (последние 30 дней)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentEntries = entries.filter(entry => entry.date >= thirtyDaysAgo);
  const moodTrend: MoodTrendPoint[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo);
    date.setDate(date.getDate() + i);
    
    const dayEntries = recentEntries.filter(entry => 
      startOfDay(entry.date).getTime() === startOfDay(date).getTime()
    );

    if (dayEntries.length > 0) {
      const dayMood = dayEntries.map(entry => {
        const moodIndex = ['😊', '😄', '😌', '😐', '😔', '😢', '😡', '😰', '😴', '🤗'].indexOf(entry.mood);
        return moodIndex >= 0 ? moodIndex + 1 : 5;
      }).reduce((sum, value) => sum + value, 0) / dayEntries.length;

      const dayEnergy = dayEntries.reduce((sum, entry) => sum + entry.energyLevel, 0) / dayEntries.length;
      const dayStress = dayEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / dayEntries.length;

      moodTrend.push({
        date: format(date, 'yyyy-MM-dd'),
        mood: Math.round(dayMood * 10) / 10,
        energy: Math.round(dayEnergy * 10) / 10,
        stress: Math.round(dayStress * 10) / 10
      });
    }
  }

  return {
    averageMood: Math.round(averageMood * 10) / 10,
    averageEnergy: Math.round(averageEnergy * 10) / 10,
    averageStress: Math.round(averageStress * 10) / 10,
    totalEntries: entries.length,
    streakDays,
    moodTrend
  };
};

// AI анализ текста
export const analyzeText = (text: string): AIAnalysis => {
  const lowerText = text.toLowerCase();
  const emotions: { emotion: string; score: number }[] = [];
  
  // Анализируем эмоции по ключевым словам
  Object.entries(AI_EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    let score = 0;
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        score += 1;
      }
    });
    if (score > 0) {
      emotions.push({ emotion, score: Math.min(score / keywords.length, 1) });
    }
  });

  // Определяем общий сентимент
  const positiveScore = emotions.find(e => e.emotion === 'positive')?.score || 0;
  const negativeScore = emotions.find(e => e.emotion === 'negative')?.score || 0;
  const anxietyScore = emotions.find(e => e.emotion === 'anxiety')?.score || 0;
  const gratitudeScore = emotions.find(e => e.emotion === 'gratitude')?.score || 0;

  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (positiveScore > negativeScore + 0.2) sentiment = 'positive';
  else if (negativeScore > positiveScore + 0.2) sentiment = 'negative';

  // Извлекаем ключевые слова
  const keywords = text.split(/\s+/)
    .filter(word => word.length > 3)
    .slice(0, 5);

  // Генерируем предложения
  const suggestions: string[] = [];
  if (anxietyScore > 0.3) {
    suggestions.push(...AI_RECOMMENDATIONS.anxiety.slice(0, 2));
  }
  if (negativeScore > 0.3) {
    suggestions.push(...AI_RECOMMENDATIONS.depression.slice(0, 2));
  }
  if (gratitudeScore > 0.3) {
    suggestions.push(...AI_RECOMMENDATIONS.gratitude.slice(0, 1));
  }

  return {
    emotions: emotions.map(e => ({
      emotion: e.emotion,
      score: e.score,
      intensity: e.score > 0.7 ? 'high' : e.score > 0.3 ? 'medium' : 'low'
    })),
    sentiment,
    keywords,
    suggestions,
    stressLevel: anxietyScore,
    anxietyLevel: anxietyScore,
    gratitudeLevel: gratitudeScore
  };
};

// Анализ эмоциональных паттернов
export const analyzeEmotionalPatterns = (entries: JournalEntry[]): EmotionAnalysis => {
  if (entries.length < 5) {
    return {
      dominantEmotions: [],
      emotionalTrend: 'stable',
      recommendations: [],
      patterns: []
    };
  }

  const recentEntries = entries.slice(-10);
  const allAnalyses = recentEntries
    .filter(entry => entry.aiAnalysis)
    .map(entry => entry.aiAnalysis!);

  const dominantEmotions = allAnalyses
    .flatMap(analysis => analysis.emotions)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(e => e.emotion);

  // Определяем тренд
  const firstHalf = allAnalyses.slice(0, Math.floor(allAnalyses.length / 2));
  const secondHalf = allAnalyses.slice(Math.floor(allAnalyses.length / 2));

  const firstAvgMood = firstHalf.reduce((sum, analysis) => {
    const positive = analysis.emotions.find(e => e.emotion === 'positive')?.score || 0;
    const negative = analysis.emotions.find(e => e.emotion === 'negative')?.score || 0;
    return sum + (positive - negative);
  }, 0) / firstHalf.length;

  const secondAvgMood = secondHalf.reduce((sum, analysis) => {
    const positive = analysis.emotions.find(e => e.emotion === 'positive')?.score || 0;
    const negative = analysis.emotions.find(e => e.emotion === 'negative')?.score || 0;
    return sum + (positive - negative);
  }, 0) / secondHalf.length;

  let emotionalTrend: 'improving' | 'declining' | 'stable' = 'stable';
  if (secondAvgMood > firstAvgMood + 0.2) emotionalTrend = 'improving';
  else if (secondAvgMood < firstAvgMood - 0.2) emotionalTrend = 'declining';

  // Генерируем рекомендации
  const recommendations: string[] = [];
  const anxietyCount = allAnalyses.filter(a => a.anxietyLevel > 0.3).length;
  const stressCount = allAnalyses.filter(a => a.stressLevel > 0.5).length;

  if (anxietyCount > allAnalyses.length * 0.5) {
    recommendations.push('У вас часто встречается тревога — попробуйте дыхательные упражнения');
  }
  if (stressCount > allAnalyses.length * 0.6) {
    recommendations.push('Высокий уровень стресса — рекомендуется больше отдыха и физической активности');
  }
  if (emotionalTrend === 'declining') {
    recommendations.push('Наблюдается ухудшение настроения — рассмотрите возможность обращения к специалисту');
  }

  return {
    dominantEmotions,
    emotionalTrend,
    recommendations,
    patterns: []
  };
};

// Работа с темами месяца
export const createMonthlyTheme = (themeData: Omit<MonthlyTheme, 'id' | 'startDate'>): MonthlyTheme => {
  return {
    ...themeData,
    id: generateId(),
    startDate: new Date()
  };
};

export const getAvailableThemes = (): Omit<MonthlyTheme, 'id' | 'startDate'>[] => {
  return MONTHLY_THEMES;
};

// Работа с упражнениями
export const createMicroExercise = (exerciseData: Omit<MicroExercise, 'id' | 'completed' | 'completedDate'>): MicroExercise => {
  return {
    ...exerciseData,
    id: generateId(),
    completed: false
  };
};

export const getAvailableExercises = (): Omit<MicroExercise, 'id' | 'completed' | 'completedDate'>[] => {
  return MICRO_EXERCISES;
};

// Работа с задачами для поднятия настроения
export const createMoodBoosterTask = (taskData: Omit<MoodBoosterTask, 'id' | 'completed' | 'completedDate'>): MoodBoosterTask => {
  return {
    ...taskData,
    id: generateId(),
    completed: false
  };
};

export const getAvailableMoodBoosters = (): Omit<MoodBoosterTask, 'id' | 'completed' | 'completedDate'>[] => {
  return MOOD_BOOSTER_TASKS;
};

// Экспорт данных
export const exportData = (data: any, options: ExportOptions): string => {
  const { format, includeAnalytics, includeAI, includeExercises } = options;
  
  let exportData = { ...data };
  
  if (!includeAnalytics) {
    delete exportData.analytics;
  }
  
  if (!includeAI) {
    exportData.entries = exportData.entries.map((entry: JournalEntry) => {
      const { aiAnalysis, ...entryWithoutAI } = entry;
      return entryWithoutAI;
    });
  }
  
  if (!includeExercises) {
    delete exportData.exercises;
    delete exportData.moodBoosters;
  }

  switch (format) {
    case 'json':
      return JSON.stringify(exportData, null, 2);
    
    case 'markdown':
      return generateMarkdownExport(exportData);
    
    case 'pdf':
      return generatePDFExport(exportData);
    
    default:
      return JSON.stringify(exportData, null, 2);
  }
};

const generateMarkdownExport = (data: any): string => {
  let markdown = `# Ментальный дневник - Экспорт данных\n\n`;
  markdown += `Дата экспорта: ${formatDate(new Date())}\n\n`;
  
  if (data.entries && data.entries.length > 0) {
    markdown += `## Записи в дневнике\n\n`;
    data.entries.forEach((entry: JournalEntry) => {
      markdown += `### ${formatDate(entry.date)}\n\n`;
      markdown += `**Настроение:** ${entry.mood}\n\n`;
      markdown += `**Энергия:** ${entry.energyLevel}/10\n\n`;
      markdown += `**Стресс:** ${entry.stressLevel}/10\n\n`;
      markdown += `${entry.content}\n\n`;
      if (entry.tags.length > 0) {
        markdown += `**Теги:** ${entry.tags.join(', ')}\n\n`;
      }
      markdown += `---\n\n`;
    });
  }
  
  return markdown;
};

const generatePDFExport = (data: any): string => {
  // Простая реализация - возвращаем HTML для конвертации в PDF
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Ментальный дневник - Экспорт</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .entry { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; }
        .header { background: #f0f0f0; padding: 10px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Ментальный дневник - Экспорт данных</h1>
        <p>Дата экспорта: ${formatDate(new Date())}</p>
      </div>
  `;
  
  if (data.entries && data.entries.length > 0) {
    data.entries.forEach((entry: JournalEntry) => {
      html += `
        <div class="entry">
          <h3>${formatDate(entry.date)}</h3>
          <p><strong>Настроение:</strong> ${entry.mood}</p>
          <p><strong>Энергия:</strong> ${entry.energyLevel}/10</p>
          <p><strong>Стресс:</strong> ${entry.stressLevel}/10</p>
          <p>${entry.content}</p>
          ${entry.tags.length > 0 ? `<p><strong>Теги:</strong> ${entry.tags.join(', ')}</p>` : ''}
        </div>
      `;
    });
  }
  
  html += `</body></html>`;
  return html;
};

// Создание резервной копии
export const createBackup = (data: any): BackupData => {
  return {
    version: '1.0.0',
    exportDate: new Date(),
    user: data.user,
    entries: data.entries || [],
    analytics: data.analytics,
    themes: data.monthlyThemes || [],
    exercises: data.exercises || [],
    tasks: data.moodBoosters || [],
    reminders: data.reminders || []
  };
};

// Восстановление из резервной копии
export const restoreFromBackup = (backupData: BackupData): any => {
  return {
    user: backupData.user,
    entries: backupData.entries,
    analytics: backupData.analytics,
    monthlyThemes: backupData.themes,
    exercises: backupData.exercises,
    moodBoosters: backupData.tasks,
    reminders: backupData.reminders
  };
};

// Локальное хранилище
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      return decryptData(encryptedData);
    }
    return null;
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
    return null;
  }
};

// Уведомления
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Этот браузер не поддерживает уведомления');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendNotification = (title: string, options?: NotificationOptions): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
};

