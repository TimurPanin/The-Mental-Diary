import { MoodData, MonthlyTheme, MicroExercise, MoodBoosterTask } from '../types';

export const APP_TITLE = 'Таймер Обратного Отсчета'
export const APP_SUBTITLE = 'От 365 лет до 0 дней'

export const TIME_UNITS = [
  { key: 'years', label: 'Лет' },
  { key: 'days', label: 'Дней' },
  { key: 'hours', label: 'Часов' },
  { key: 'minutes', label: 'Минут' },
  { key: 'seconds', label: 'Секунд' }
] as const

export const BUTTON_LABELS = {
  START: 'Запустить',
  PAUSE: 'Пауза',
  RESUME: 'Продолжить',
  RESET: 'Сброс',
  FAST_FORWARD: 'Ускорить'
} as const

export const TIMER_COMPLETE_MESSAGE = 'Таймер завершен! Время истекло.'

export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px'
} as const

export const MOOD_OPTIONS: MoodData[] = [
  {
    mood: '😊',
    label: 'Счастливый',
    color: '#4CAF50',
    description: 'Отличное настроение'
  },
  {
    mood: '😄',
    label: 'Радостный',
    color: '#8BC34A',
    description: 'Очень хорошее настроение'
  },
  {
    mood: '😌',
    label: 'Спокойный',
    color: '#CDDC39',
    description: 'Умиротворённое состояние'
  },
  {
    mood: '😐',
    label: 'Нейтральный',
    color: '#FFC107',
    description: 'Обычное настроение'
  },
  {
    mood: '😔',
    label: 'Грустный',
    color: '#FF9800',
    description: 'Не очень хорошее настроение'
  },
  {
    mood: '😢',
    label: 'Печальный',
    color: '#F44336',
    description: 'Плохое настроение'
  },
  {
    mood: '😡',
    label: 'Раздражённый',
    color: '#D32F2F',
    description: 'Злой, раздражённый'
  },
  {
    mood: '😰',
    label: 'Тревожный',
    color: '#9C27B0',
    description: 'Тревога, беспокойство'
  },
  {
    mood: '😴',
    label: 'Уставший',
    color: '#607D8B',
    description: 'Усталость, истощение'
  },
  {
    mood: '🤗',
    label: 'Благодарный',
    color: '#2196F3',
    description: 'Благодарность, признательность'
  }
];

export const ENERGY_LEVELS = [
  { value: 1, label: 'Полное истощение', color: '#f44336' },
  { value: 2, label: 'Очень устал', color: '#ff5722' },
  { value: 3, label: 'Устал', color: '#ff9800' },
  { value: 4, label: 'Низкая энергия', color: '#ffc107' },
  { value: 5, label: 'Нейтрально', color: '#cddc39' },
  { value: 6, label: 'Нормально', color: '#8bc34a' },
  { value: 7, label: 'Хорошо', color: '#4caf50' },
  { value: 8, label: 'Отлично', color: '#2e7d32' },
  { value: 9, label: 'Полон энергии', color: '#1b5e20' },
  { value: 10, label: 'Супер энергичен', color: '#0d47a1' }
];

export const STRESS_LEVELS = [
  { value: 1, label: 'Полное спокойствие', color: '#4caf50' },
  { value: 2, label: 'Очень спокоен', color: '#8bc34a' },
  { value: 3, label: 'Спокоен', color: '#cddc39' },
  { value: 4, label: 'Лёгкое напряжение', color: '#ffc107' },
  { value: 5, label: 'Нейтрально', color: '#ff9800' },
  { value: 6, label: 'Немного напряжён', color: '#ff5722' },
  { value: 7, label: 'Напряжён', color: '#f44336' },
  { value: 8, label: 'Очень напряжён', color: '#d32f2f' },
  { value: 9, label: 'Сильный стресс', color: '#c62828' },
  { value: 10, label: 'Критический стресс', color: '#b71c1c' }
];

export const AI_SUPPORT_MESSAGES = [
  'Ты делаешь важную работу, заботясь о своём психическом здоровье. Это достойно уважения.',
  'Каждый день — это новая возможность для роста и исцеления.',
  'Твои чувства важны и заслуживают внимания.',
  'Помни, что трудные времена временны. Ты справишься.',
  'Благодарность за маленькие радости может изменить твоё восприятие дня.',
  'Ты не одинок в своих переживаниях. Многие проходят через подобное.',
  'Забота о себе — это не эгоизм, а необходимость.',
  'Каждый шаг вперёд, даже маленький, — это прогресс.'
];

export const REFLECTION_QUESTIONS = [
  'Что сегодня тебя порадовало?',
  'За что ты благодарен сегодня?',
  'Что было самым сложным сегодня?',
  'Как ты справился с трудностями?',
  'Что ты узнал о себе сегодня?',
  'Что бы ты хотел изменить завтра?',
  'Кто или что поддержал тебя сегодня?',
  'Какой момент дня был самым значимым?',
  'Что ты сделал для себя сегодня?',
  'О чём ты мечтаешь?'
];

// Новые константы для дополнительных функций

export const MONTHLY_THEMES: Omit<MonthlyTheme, 'id' | 'startDate'>[] = [
  {
    title: 'Благодарность',
    description: 'Фокусируемся на том, за что мы благодарны в жизни',
    color: '#4CAF50',
    icon: '🙏',
    duration: 'month',
    tasks: [
      {
        id: '1',
        title: 'Дневник благодарности',
        description: 'Записывайте 3 вещи, за которые вы благодарны каждый день',
        type: 'daily',
        completed: false
      },
      {
        id: '2',
        title: 'Благодарственное письмо',
        description: 'Напишите письмо человеку, которому вы благодарны',
        type: 'one_time',
        completed: false
      },
      {
        id: '3',
        title: 'Медитация благодарности',
        description: 'Практикуйте 5-минутную медитацию благодарности',
        type: 'weekly',
        completed: false
      }
    ]
  },
  {
    title: 'Стресс-менеджмент',
    description: 'Изучаем техники управления стрессом и тревогой',
    color: '#FF9800',
    icon: '🧘',
    duration: 'month',
    tasks: [
      {
        id: '1',
        title: 'Дыхательные упражнения',
        description: 'Практикуйте глубокое дыхание 2 раза в день',
        type: 'daily',
        completed: false
      },
      {
        id: '2',
        title: 'Прогрессивная релаксация',
        description: 'Изучите технику прогрессивной мышечной релаксации',
        type: 'weekly',
        completed: false
      },
      {
        id: '3',
        title: 'Анализ триггеров',
        description: 'Определите основные источники стресса в вашей жизни',
        type: 'one_time',
        completed: false
      }
    ]
  },
  {
    title: 'Осознанность',
    description: 'Развиваем навыки осознанности и присутствия в моменте',
    color: '#2196F3',
    icon: '🌿',
    duration: 'month',
    tasks: [
      {
        id: '1',
        title: 'Медитация осознанности',
        description: 'Практикуйте медитацию 10 минут каждый день',
        type: 'daily',
        completed: false
      },
      {
        id: '2',
        title: 'Осознанное питание',
        description: 'Ешьте медленно, обращая внимание на вкус и текстуру',
        type: 'daily',
        completed: false
      },
      {
        id: '3',
        title: 'Прогулка осознанности',
        description: 'Совершите 20-минутную прогулку, обращая внимание на окружение',
        type: 'weekly',
        completed: false
      }
    ]
  },
  {
    title: 'Самооценка',
    description: 'Работаем над укреплением самооценки и уверенности в себе',
    color: '#9C27B0',
    icon: '💪',
    duration: 'month',
    tasks: [
      {
        id: '1',
        title: 'Аффирмации',
        description: 'Повторяйте позитивные аффирмации каждое утро',
        type: 'daily',
        completed: false
      },
      {
        id: '2',
        title: 'Список достижений',
        description: 'Составьте список ваших достижений и успехов',
        type: 'one_time',
        completed: false
      },
      {
        id: '3',
        title: 'Самообслуживание',
        description: 'Выделите время для деятельности, которая вас радует',
        type: 'weekly',
        completed: false
      }
    ]
  }
];

export const MICRO_EXERCISES: Omit<MicroExercise, 'id' | 'completed' | 'completedDate'>[] = [
  {
    title: '4-7-8 Дыхание',
    description: 'Техника дыхания для быстрого успокоения',
    type: 'breathing',
    duration: 5,
    difficulty: 'easy',
    instructions: [
      'Сядьте удобно и закройте глаза',
      'Вдохните через нос на 4 счета',
      'Задержите дыхание на 7 счетов',
      'Выдохните через рот на 8 счетов',
      'Повторите 4 цикла'
    ],
    benefits: [
      'Снижает стресс и тревогу',
      'Улучшает концентрацию',
      'Помогает заснуть'
    ]
  },
  {
    title: 'Сканирование тела',
    description: 'Медитация для расслабления всего тела',
    type: 'meditation',
    duration: 10,
    difficulty: 'easy',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    instructions: [
      'Лягте на спину в удобном положении',
      'Закройте глаза и расслабьтесь',
      'Обратите внимание на каждую часть тела',
      'От пальцев ног до макушки головы',
      'Отпустите любое напряжение'
    ],
    benefits: [
      'Снимает мышечное напряжение',
      'Улучшает осознанность тела',
      'Помогает расслабиться'
    ]
  },
  {
    title: 'Мини-растяжка',
    description: 'Быстрая растяжка для снятия напряжения',
    type: 'physical',
    duration: 3,
    difficulty: 'easy',
    instructions: [
      'Встаньте и потянитесь вверх',
      'Наклонитесь вперед и коснитесь пальцев ног',
      'Повернитесь влево и вправо',
      'Сделайте круговые движения плечами'
    ],
    benefits: [
      'Снимает мышечное напряжение',
      'Улучшает кровообращение',
      'Повышает энергию'
    ]
  }
];

export const MOOD_BOOSTER_TASKS: Omit<MoodBoosterTask, 'id' | 'completed' | 'completedDate'>[] = [
  {
    title: 'Позвоните другу',
    description: 'Свяжитесь с близким человеком',
    category: 'social',
    estimatedTime: 10,
    energyLevel: 'low'
  },
  {
    title: 'Сделайте 10 приседаний',
    description: 'Быстрая физическая активность',
    category: 'physical',
    estimatedTime: 2,
    energyLevel: 'medium'
  },
  {
    title: 'Нарисуйте что-то',
    description: 'Выразите себя через творчество',
    category: 'creative',
    estimatedTime: 15,
    energyLevel: 'medium'
  },
  {
    title: 'Примите теплый душ',
    description: 'Расслабляющая процедура',
    category: 'self_care',
    estimatedTime: 10,
    energyLevel: 'low'
  },
  {
    title: 'Выучите новое слово',
    description: 'Интеллектуальная стимуляция',
    category: 'learning',
    estimatedTime: 5,
    energyLevel: 'low'
  },
  {
    title: 'Сделайте комплимент',
    description: 'Поделитесь позитивом с другим',
    category: 'social',
    estimatedTime: 1,
    energyLevel: 'low'
  },
  {
    title: 'Потанцуйте под любимую песню',
    description: 'Выпустите энергию через движение',
    category: 'physical',
    estimatedTime: 5,
    energyLevel: 'high'
  },
  {
    title: 'Напишите стихотворение',
    description: 'Творческое самовыражение',
    category: 'creative',
    estimatedTime: 20,
    energyLevel: 'medium'
  }
];

export const AI_EMOTION_KEYWORDS = {
  positive: ['радость', 'счастье', 'восторг', 'удовольствие', 'веселье', 'улыбка', 'смех', 'успех', 'победа', 'достижение'],
  negative: ['грусть', 'печаль', 'тоска', 'отчаяние', 'безнадежность', 'одиночество', 'потеря', 'неудача', 'разочарование'],
  anxiety: ['тревога', 'беспокойство', 'волнение', 'страх', 'паника', 'нервозность', 'стресс', 'напряжение', 'давление'],
  anger: ['злость', 'гнев', 'раздражение', 'ярость', 'негодование', 'возмущение', 'обида', 'недовольство'],
  gratitude: ['благодарность', 'спасибо', 'признательность', 'благодарен', 'ценю', 'дорожу', 'люблю', 'радуюсь']
};

export const AI_RECOMMENDATIONS = {
  anxiety: [
    'Попробуйте технику 4-7-8 дыхания для успокоения',
    'Сделайте перерыв и прогуляйтесь на свежем воздухе',
    'Практикуйте прогрессивную мышечную релаксацию',
    'Ограничьте потребление кофеина и новостей'
  ],
  depression: [
    'Попробуйте легкую физическую активность',
    'Свяжитесь с близким человеком',
    'Запланируйте что-то приятное на завтра',
    'Практикуйте самосострадание'
  ],
  stress: [
    'Сделайте глубокий вдох и медленный выдох',
    'Попробуйте технику "5-4-3-2-1" для заземления',
    'Выделите время для отдыха и восстановления',
    'Разбейте большие задачи на маленькие'
  ],
  gratitude: [
    'Продолжайте практиковать благодарность',
    'Поделитесь своей благодарностью с другими',
    'Ведите дневник благодарности',
    'Выражайте благодарность через действия'
  ]
};

export const APP_CONFIG = {
  name: 'Ментальный дневник',
  version: '1.0.0',
  description: 'Онлайн-дневник для отслеживания психического здоровья',
  maxEntryLength: 2000,
  maxTagsPerEntry: 5,
  reminderTimes: [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ]
};

export const ROUTES = {
  HOME: '/',
  JOURNAL: '/journal',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
  THEMES: '/themes',
  EXERCISES: '/exercises',
  EXPORT: '/export'
};

