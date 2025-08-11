import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User, 
  JournalEntry, 
  AnalyticsData, 
  AISuggestion, 
  Reminder,
  MonthlyTheme,
  MicroExercise,
  MoodBoosterTask,
  AIAnalysis,
  EmotionAnalysis,
  ExportOptions,
  BackupData
} from '../types';
import { 
  generateId, 
  calculateAnalytics, 
  validateEntry, 
  saveToLocalStorage, 
  loadFromLocalStorage,
  analyzeText,
  analyzeEmotionalPatterns,
  createMonthlyTheme,
  getAvailableThemes,
  createMicroExercise,
  getAvailableExercises,
  createMoodBoosterTask,
  getAvailableMoodBoosters,
  exportData,
  createBackup,
  restoreFromBackup
} from '../utils/timerUtils';
import { 
  AI_SUPPORT_MESSAGES, 
  REFLECTION_QUESTIONS,
  MONTHLY_THEMES,
  MICRO_EXERCISES,
  MOOD_BOOSTER_TASKS
} from '../constants';

interface JournalStore {
  // Состояние
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

  // Действия пользователя
  login: (email?: string) => void;
  logout: () => void;
  updateUserSettings: (settings: Partial<User['settings']>) => void;

  // Действия с записями
  addEntry: (entry: Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;

  // AI и аналитика
  generateSuggestion: () => void;
  dismissSuggestion: (id: string) => void;
  analyzeEntry: (entryId: string) => void;
  updateAnalytics: () => void;

  // Напоминания
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;

  // Темы месяца
  selectTheme: (themeId: string) => void;
  completeThemeTask: (themeId: string, taskId: string) => void;
  resetTheme: () => void;

  // Упражнения
  addExercise: (exercise: Omit<MicroExercise, 'id' | 'completed' | 'completedDate'>) => void;
  completeExercise: (exerciseId: string) => void;
  removeExercise: (exerciseId: string) => void;

  // Задачи для поднятия настроения
  addMoodBooster: (task: Omit<MoodBoosterTask, 'id' | 'completed' | 'completedDate'>) => void;
  completeMoodBooster: (taskId: string) => void;
  removeMoodBooster: (taskId: string) => void;

  // Экспорт и резервное копирование
  exportData: (options: ExportOptions) => string;
  createBackup: () => BackupData;
  restoreFromBackup: (backup: BackupData) => void;
  clearAllData: () => void;

  // Утилиты
  loadInitialData: () => void;
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      user: null,
      entries: [],
      analytics: null,
      suggestions: [],
      reminders: [],
      monthlyThemes: [],
      currentTheme: null,
      exercises: [],
      moodBoosters: [],
      isLoading: false,
      error: null,

      // Действия пользователя
      login: (email?: string) => {
        const user: User = {
          id: generateId(),
          email,
          isAnonymous: !email,
          createdAt: new Date(),
          settings: {
            reminderTime: '20:00',
            reminderFrequency: 'daily',
            theme: 'auto',
            notifications: true
          }
        };

        set({ user });
        get().loadInitialData();
      },

      logout: () => {
        set({ 
          user: null, 
          entries: [], 
          analytics: null, 
          suggestions: [], 
          reminders: [],
          monthlyThemes: [],
          currentTheme: null,
          exercises: [],
          moodBoosters: []
        });
      },

      updateUserSettings: (settings) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              settings: { ...user.settings, ...settings }
            }
          });
        }
      },

      // Действия с записями
      addEntry: (entryData) => {
        const { user } = get();
        if (!user) {
          set({ error: 'Пользователь не авторизован' });
          return;
        }

        const validation = validateEntry(entryData);
        if (!validation.isValid) {
          set({ error: validation.errors.join(', ') });
          return;
        }

        try {
          const newEntry: JournalEntry = {
            ...entryData,
            id: generateId(),
            userId: user.id,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          };

          // Анализируем текст с помощью AI
          const aiAnalysis = analyzeText(entryData.content);
          newEntry.aiAnalysis = aiAnalysis;

          set(state => ({
            entries: [newEntry, ...state.entries],
            error: null
          }));

          get().updateAnalytics();
          get().generateSuggestion();
        } catch (error) {
          console.error('Ошибка при добавлении записи:', error);
          set({ error: 'Ошибка при добавлении записи' });
        }
      },

      updateEntry: (id, updates) => {
        set(state => ({
          entries: state.entries.map(entry =>
            entry.id === id
              ? { 
                  ...entry, 
                  ...updates, 
                  updatedAt: new Date(),
                  aiAnalysis: updates.content ? analyzeText(updates.content) : entry.aiAnalysis
                }
              : entry
          )
        }));

        get().updateAnalytics();
      },

      deleteEntry: (id) => {
        set(state => ({
          entries: state.entries.filter(entry => entry.id !== id)
        }));

        get().updateAnalytics();
      },

      // AI и аналитика
      generateSuggestion: () => {
        const { entries, currentTheme } = get();
        
        if (entries.length === 0) return;

        const suggestionTypes = ['support', 'question', 'insight'] as const;
        const randomType = suggestionTypes[Math.floor(Math.random() * suggestionTypes.length)];
        
        let content = '';
        let relatedTheme = undefined;

        switch (randomType) {
          case 'support':
            content = AI_SUPPORT_MESSAGES[Math.floor(Math.random() * AI_SUPPORT_MESSAGES.length)];
            break;
          case 'question':
            content = REFLECTION_QUESTIONS[Math.floor(Math.random() * REFLECTION_QUESTIONS.length)];
            break;
          case 'insight':
            if (currentTheme) {
              content = `Продолжайте работу над темой "${currentTheme.title}". ${currentTheme.description}`;
              relatedTheme = currentTheme.id;
            } else {
              content = 'Попробуйте записать свои мысли о сегодняшнем дне. Что вас больше всего впечатлило?';
            }
            break;
        }

        const suggestion: AISuggestion = {
          id: generateId(),
          type: randomType,
          content,
          timestamp: new Date(),
          relatedTheme
        };

        set(state => ({
          suggestions: [suggestion, ...state.suggestions.slice(0, 4)] // Максимум 5 предложений
        }));
      },

      dismissSuggestion: (id) => {
        set(state => ({
          suggestions: state.suggestions.filter(suggestion => suggestion.id !== id)
        }));
      },

      analyzeEntry: (entryId) => {
        const { entries } = get();
        const entry = entries.find(e => e.id === entryId);
        
        if (entry && !entry.aiAnalysis) {
          const aiAnalysis = analyzeText(entry.content);
          get().updateEntry(entryId, { aiAnalysis });
        }
      },

      updateAnalytics: () => {
        const { entries } = get();
        const analytics = calculateAnalytics(entries);
        
        // Добавляем анализ эмоциональных паттернов
        if (entries.length >= 5) {
          analytics.emotionAnalysis = analyzeEmotionalPatterns(entries);
        }

        set({ analytics });
      },

      // Напоминания
      addReminder: (reminderData) => {
        const reminder: Reminder = {
          ...reminderData,
          id: generateId()
        };

        set(state => ({
          reminders: [...state.reminders, reminder]
        }));
      },

      updateReminder: (id, updates) => {
        set(state => ({
          reminders: state.reminders.map(reminder =>
            reminder.id === id ? { ...reminder, ...updates } : reminder
          )
        }));
      },

      deleteReminder: (id) => {
        set(state => ({
          reminders: state.reminders.filter(reminder => reminder.id !== id)
        }));
      },

      // Темы месяца
      selectTheme: (themeId) => {
        const availableThemes = getAvailableThemes();
        const themeData = availableThemes.find(t => t.title === themeId);
        
        if (themeData) {
          const theme = createMonthlyTheme(themeData);
          set({ 
            currentTheme: theme,
            monthlyThemes: [...get().monthlyThemes, theme]
          });
        }
      },

      completeThemeTask: (themeId, taskId) => {
        set(state => ({
          monthlyThemes: state.monthlyThemes.map(theme =>
            theme.id === themeId
              ? {
                  ...theme,
                  tasks: theme.tasks.map(task =>
                    task.id === taskId
                      ? { ...task, completed: true, completedDate: new Date() }
                      : task
                  )
                }
              : theme
          )
        }));
      },

      resetTheme: () => {
        set({ currentTheme: null });
      },

      // Упражнения
      addExercise: (exerciseData) => {
        const exercise = createMicroExercise(exerciseData);
        set(state => ({
          exercises: [...state.exercises, exercise]
        }));
      },

      completeExercise: (exerciseId) => {
        set(state => ({
          exercises: state.exercises.map(exercise =>
            exercise.id === exerciseId
              ? { ...exercise, completed: true, completedDate: new Date() }
              : exercise
          )
        }));
      },

      removeExercise: (exerciseId) => {
        set(state => ({
          exercises: state.exercises.filter(exercise => exercise.id !== exerciseId)
        }));
      },

      // Задачи для поднятия настроения
      addMoodBooster: (taskData) => {
        const task = createMoodBoosterTask(taskData);
        set(state => ({
          moodBoosters: [...state.moodBoosters, task]
        }));
      },

      completeMoodBooster: (taskId) => {
        set(state => ({
          moodBoosters: state.moodBoosters.map(task =>
            task.id === taskId
              ? { ...task, completed: true, completedDate: new Date() }
              : task
          )
        }));
      },

      removeMoodBooster: (taskId) => {
        set(state => ({
          moodBoosters: state.moodBoosters.filter(task => task.id !== taskId)
        }));
      },

      // Экспорт и резервное копирование
      exportData: (options) => {
        const state = get();
        const data = {
          user: state.user,
          entries: state.entries,
          analytics: state.analytics,
          monthlyThemes: state.monthlyThemes,
          exercises: state.exercises,
          moodBoosters: state.moodBoosters,
          reminders: state.reminders
        };

        return exportData(data, options);
      },

      createBackup: () => {
        const state = get();
        return createBackup({
          user: state.user,
          entries: state.entries,
          analytics: state.analytics,
          monthlyThemes: state.monthlyThemes,
          exercises: state.exercises,
          moodBoosters: state.moodBoosters,
          reminders: state.reminders
        });
      },

      restoreFromBackup: (backup) => {
        const restoredData = restoreFromBackup(backup);
        
        // Преобразуем строки дат обратно в объекты Date
        const entriesWithDates = restoredData.entries?.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt)
        })) || [];
        
        set({
          user: restoredData.user,
          entries: entriesWithDates,
          analytics: restoredData.analytics,
          monthlyThemes: restoredData.monthlyThemes,
          exercises: restoredData.exercises,
          moodBoosters: restoredData.moodBoosters,
          reminders: restoredData.reminders
        });
      },

      clearAllData: () => {
        set({
          entries: [],
          analytics: null,
          suggestions: [],
          reminders: [],
          monthlyThemes: [],
          currentTheme: null,
          exercises: [],
          moodBoosters: []
        });
      },

      // Утилиты
      loadInitialData: () => {
        const { user } = get();
        if (!user) return;

        // Загружаем данные из localStorage
        const savedEntries = loadFromLocalStorage(`entries_${user.id}`);
        const savedAnalytics = loadFromLocalStorage(`analytics_${user.id}`);
        const savedReminders = loadFromLocalStorage(`reminders_${user.id}`);
        const savedThemes = loadFromLocalStorage(`themes_${user.id}`);
        const savedExercises = loadFromLocalStorage(`exercises_${user.id}`);
        const savedMoodBoosters = loadFromLocalStorage(`moodBoosters_${user.id}`);

        if (savedEntries) {
          // Преобразуем строки дат обратно в объекты Date
          const entriesWithDates = savedEntries.map((entry: any) => ({
            ...entry,
            date: new Date(entry.date),
            createdAt: new Date(entry.createdAt),
            updatedAt: new Date(entry.updatedAt)
          }));
          set({ entries: entriesWithDates });
        }

        if (savedAnalytics) {
          set({ analytics: savedAnalytics });
        }

        if (savedReminders) {
          set({ reminders: savedReminders });
        }

        if (savedThemes) {
          set({ monthlyThemes: savedThemes });
        }

        if (savedExercises) {
          set({ exercises: savedExercises });
        }

        if (savedMoodBoosters) {
          set({ moodBoosters: savedMoodBoosters });
        }

        // Обновляем аналитику если нужно
        if (savedEntries && !savedAnalytics) {
          get().updateAnalytics();
        }

        // Генерируем первое предложение
        if (savedEntries && savedEntries.length > 0) {
          get().generateSuggestion();
        }
      }
    }),
    {
      name: 'mental-health-journal-storage',
      partialize: (state) => ({
        user: state.user,
        entries: state.entries,
        analytics: state.analytics,
        reminders: state.reminders,
        monthlyThemes: state.monthlyThemes,
        exercises: state.exercises,
        moodBoosters: state.moodBoosters
      })
    }
  )
);

