# Mental Diary

[![CI](https://github.com/TimurPanin/The-Mental-Diary/actions/workflows/ci.yml/badge.svg)](https://github.com/TimurPanin/The-Mental-Diary/actions/workflows/ci.yml)

A client-side journaling and mood-tracking prototype built with **React 18**, **TypeScript** and **Vite**.

The project focuses on frontend architecture, local state management, journaling workflows, data visualization, export/backup flows and deterministic text analysis.

> This is a portfolio/learning project, not a medical product. Do not use it as secure storage for sensitive or medical information.

## What is implemented

- Journal entries with text, mood, energy and stress values
- Tags for organizing entries
- Editing and deleting entries
- Local browser persistence with Zustand
- Mood, energy and stress analytics
- 30-day trend visualization with Recharts
- Entry streak tracking
- Reflection prompts and predefined supportive messages
- Keyword-based text analysis and simple emotional-pattern heuristics
- Monthly themes, exercises and mood-booster tasks
- Data export and backup/restore flows
- Responsive interface with Styled Components and Framer Motion
- GitHub Pages deployment workflow

## Text analysis: important clarification

The project does **not** use an LLM, neural network or external AI service.

Text analysis is deterministic and runs locally. It matches predefined keywords, calculates simple scores and selects predefined recommendations or reflection prompts. Some internal identifiers still use the older `AI*` naming, but the current implementation is rule-based rather than machine-learning based.

## Data and privacy model

The application has no backend, cloud account system or server-side database. Application state is persisted in the browser through Zustand/localStorage.

The repository also contains an experimental CryptoJS helper with a static client-side key. A key embedded in frontend source code is **not a meaningful security boundary**, and the active Zustand persistence should not be treated as encrypted secure storage.

For that reason, this project should be treated as a UI/engineering prototype rather than a production system for confidential information.

## Tech stack

- **React 18**
- **TypeScript**
- **Vite**
- **Zustand**
- **Styled Components**
- **Framer Motion**
- **Recharts**
- **date-fns**
- **Lucide React**
- **React Hot Toast**
- **CryptoJS** — experimental local-data helper, not a security boundary

## Project structure

```text
src/
├── components/
│   ├── Analytics.tsx
│   ├── DisclaimerModal.tsx
│   ├── ExportData.tsx
│   ├── JournalEntryForm.tsx
│   ├── JournalEntryList.tsx
│   ├── LoginScreen.tsx
│   ├── MicroExercises.tsx
│   └── MonthlyThemes.tsx
├── constants/
│   └── index.ts
├── hooks/
│   └── useTimer.ts
├── styles/
│   ├── GlobalStyles.ts
│   ├── animations.ts
│   ├── mediaQueries.ts
│   └── theme.ts
├── types/
│   └── index.ts
├── utils/
│   └── timerUtils.ts
├── App.tsx
└── main.tsx
```

## Architecture notes

`useTimer.ts` contains the Zustand store and coordinates journal entries, analytics, local persistence, suggestions, themes, exercises and export/restore operations.

`timerUtils.ts` contains validation, date utilities, analytics calculations, deterministic keyword analysis and data-export helpers.

UI concerns are separated into React components, while reusable styling is centralized under `src/styles`.

## Run locally

### Requirements

- Node.js 20+
- npm

### Install

```bash
npm ci
```

### Development

```bash
npm run dev
```

### Type check

```bash
npm run type-check
```

### Production build

```bash
npm run build
```

## Scope

This repository is useful as an example of:

- React + TypeScript application structure
- Zustand state management
- browser persistence
- chart-based data visualization
- form-heavy UI flows
- local export/backup logic
- rule-based text processing

It intentionally does not claim clinical accuracy, secure storage, machine-learning analysis or professional medical functionality.
