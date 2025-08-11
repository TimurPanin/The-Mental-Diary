# Техническая документация

## Архитектура приложения

### Структура проекта
```
src/
├── components/          # React компоненты
│   ├── CountdownTimer.tsx    # LoginScreen - экран входа
│   ├── ProgressRing.tsx      # JournalEntryForm - форма записи
│   ├── TimeDisplay.tsx       # JournalEntryList - список записей
│   └── TimerControls.tsx     # Analytics - аналитика
├── hooks/              # Пользовательские хуки
│   └── useTimer.ts           # useJournalStore - управление состоянием
├── styles/             # Стили и темы
│   ├── GlobalStyles.ts       # Глобальные стили
│   └── theme.ts              # Тема приложения
├── types/              # TypeScript типы
│   └── index.ts              # Интерфейсы и типы
├── utils/              # Утилиты
│   └── timerUtils.ts         # Функции для работы с данными
├── constants/          # Константы
│   └── index.ts              # Конфигурация и константы
├── App.tsx             # Главный компонент
└── main.tsx            # Точка входа
```

## Технологический стек

### Frontend
- **React 18** - основная библиотека
- **TypeScript** - типизация
- **Vite** - сборщик и dev-сервер

### Стилизация
- **Styled Components** - CSS-in-JS
- **Framer Motion** - анимации
- **Lucide React** - иконки

### Управление состоянием
- **Zustand** - легковесный store
- **React Hook Form** - формы (планируется)

### Визуализация данных
- **Recharts** - графики и диаграммы
- **date-fns** - работа с датами

### Безопасность
- **CryptoJS** - шифрование данных
- **localStorage** - локальное хранение

## Основные компоненты

### LoginScreen (CountdownTimer.tsx)
```typescript
interface LoginScreenProps {
  // Компонент экрана входа
  // Обрабатывает анонимный вход и вход с email
}
```

**Функции:**
- Анонимная регистрация
- Вход с email
- Отображение преимуществ приложения

### JournalEntryForm (ProgressRing.tsx)
```typescript
interface JournalEntryFormProps {
  onSubmit: (entry: JournalEntryData) => void;
  onCancel?: () => void;
  initialData?: Partial<JournalEntry>;
}
```

**Функции:**
- Создание новых записей
- Редактирование существующих записей
- Валидация данных
- Выбор настроения, энергии, стресса
- Управление тегами

### JournalEntryList (TimeDisplay.tsx)
```typescript
interface JournalEntryListProps {
  entries: JournalEntry[];
  onEdit?: (entry: JournalEntry) => void;
  onDelete?: (id: string) => void;
}
```

**Функции:**
- Отображение списка записей
- Редактирование и удаление
- Сортировка по дате
- Пустое состояние

### Analytics (TimerControls.tsx)
```typescript
interface AnalyticsProps {
  data: AnalyticsData | null;
}
```

**Функции:**
- Отображение статистики
- Графики трендов
- Метрики пользователя

## Управление состоянием

### Zustand Store
```typescript
interface JournalStore extends AppState {
  // Пользователь
  login: (email?: string) => void;
  logout: () => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  
  // Записи
  addEntry: (entry: Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  
  // AI подсказки
  generateSuggestion: () => void;
  dismissSuggestion: (id: string) => void;
  
  // Утилиты
  clearAllData: () => void;
  exportData: () => string;
  importData: (data: string) => void;
}
```

### Персистентность
- Используется Zustand persist middleware
- Данные сохраняются в localStorage
- Автоматическое восстановление при перезагрузке

## Типы данных

### Основные интерфейсы
```typescript
interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  createdAt: Date;
  settings: UserSettings;
}

interface JournalEntry {
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
}

interface AnalyticsData {
  averageMood: number;
  averageEnergy: number;
  averageStress: number;
  totalEntries: number;
  streakDays: number;
  moodTrend: MoodTrendPoint[];
}
```

## Безопасность

### Шифрование данных
```typescript
const ENCRYPTION_KEY = 'mental-health-journal-2024';

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
```

### Локальное хранение
- Все данные хранятся в браузере
- Никакая информация не передается на серверы
- Автоматическое шифрование при сохранении

## Стилизация

### Тема
```typescript
export const theme = {
  colors: {
    primary: { 50: '#f0f9ff', /* ... */ },
    secondary: { 50: '#fdf4ff', /* ... */ },
    // ...
  },
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  // ...
};
```

### Адаптивность
- Mobile-first подход
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Гибкая сетка с CSS Grid и Flexbox

## Утилиты

### Работа с датами
```typescript
export const formatDate = (date: Date): string => {
  return format(date, 'dd MMMM yyyy', { locale: ru });
};

export const getDateRange = (days: number): { start: Date; end: Date } => {
  const end = endOfDay(new Date());
  const start = startOfDay(subDays(new Date(), days - 1));
  return { start, end };
};
```

### Аналитика
```typescript
export const calculateAnalytics = (entries: JournalEntry[]): AnalyticsData => {
  // Расчет средних значений
  // Подсчет дней подряд
  // Генерация трендов
};
```

## Производительность

### Оптимизации
- React.memo для компонентов
- useMemo для тяжелых вычислений
- useCallback для функций
- Lazy loading для графиков

### Бандл анализ
```bash
npm run build
npx vite-bundle-analyzer dist
```

## Тестирование

### Jest + React Testing Library
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { JournalEntryForm } from './JournalEntryForm';

test('should submit form with valid data', () => {
  const mockOnSubmit = jest.fn();
  render(<JournalEntryForm onSubmit={mockOnSubmit} />);
  
  // Тест логика
});
```

### Команды тестирования
```bash
# npm test              # Запуск тестов (отключено)
npm run test:watch    # Режим наблюдения
npm run test:coverage # Покрытие тестами
```

## Развертывание

### Сборка
```bash
npm run build
```

### Статический хостинг
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

### PWA
- Service Worker для офлайн работы
- Web App Manifest
- Push уведомления

## Мониторинг

### Ошибки
- Error boundaries
- Логирование в console
- Пользовательские уведомления

### Производительность
- Lighthouse аудит
- Core Web Vitals
- Bundle size мониторинг

## Планы развития

### Версия 2.0
- [ ] Напоминания и уведомления
- [ ] Экспорт/импорт данных
- [ ] Темная тема
- [ ] PWA функциональность

### Версия 3.0
- [ ] Бэкенд API
- [ ] Синхронизация между устройствами
- [ ] Социальные функции
- [ ] Расширенная аналитика

## Контрибьюция

### Настройка окружения
1. Форкните репозиторий
2. Клонируйте локально
3. Установите зависимости: `npm install`
4. Запустите dev сервер: `npm run dev`

### Стиль кода
- Prettier для форматирования
- ESLint для линтинга
- TypeScript strict mode
- Conventional commits

### Pull Request процесс
1. Создайте feature branch
2. Внесите изменения
3. Добавьте тесты
4. Обновите документацию
5. Создайте PR с описанием изменений
