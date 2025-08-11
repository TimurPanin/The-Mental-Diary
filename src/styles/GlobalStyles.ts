import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${theme.transitions.base}, color ${theme.transitions.base};
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
    font-weight: ${theme.fontWeights.semibold};
    line-height: ${theme.lineHeights.tight};
    margin-bottom: ${theme.spacing[4]};
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: ${theme.fontWeights.bold};
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
  }

  h5 {
    font-size: ${theme.fontSizes.lg};
  }

  h6 {
    font-size: ${theme.fontSizes.base};
  }

  p {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.text.secondary};
  }

  a {
    color: ${theme.colors.primary[600]};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primary[700]};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${theme.colors.primary[400]};
      outline-offset: 2px;
      border-radius: ${theme.borderRadius.sm};
    }
  }

  button {
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:focus {
      outline: 2px solid ${theme.colors.primary[400]};
      outline-offset: 2px;
      border-radius: ${theme.borderRadius.sm};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${theme.colors.border.medium};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    background-color: ${theme.colors.background.primary};
    color: ${theme.colors.text.primary};
    transition: all ${theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
    }

    &::placeholder {
      color: ${theme.colors.text.tertiary};
    }

    &:disabled {
      background-color: ${theme.colors.background.secondary};
      color: ${theme.colors.text.tertiary};
      cursor: not-allowed;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  ul, ol {
    margin-bottom: ${theme.spacing[4]};
    padding-left: ${theme.spacing[6]};
  }

  li {
    margin-bottom: ${theme.spacing[2]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Скроллбар */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border.medium};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.border.dark};
    }
  }

  /* Выделение текста */
  ::selection {
    background-color: ${theme.colors.primary[200]};
    color: ${theme.colors.text.primary};
  }

  /* Утилиты для доступности */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Анимации */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  /* Классы для анимаций */
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .bounce {
    animation: bounce 1s;
  }

  /* Темная тема */
  @media (prefers-color-scheme: dark) {
    body {
      color: ${theme.colors.text.primary};
      background-color: ${theme.colors.background.primary};
    }
  }

  /* Адаптивность */
  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }

    h1 {
      font-size: ${theme.fontSizes['3xl']};
    }

    h2 {
      font-size: ${theme.fontSizes['2xl']};
    }

    h3 {
      font-size: ${theme.fontSizes.xl};
    }
  }

  /* Печать */
  @media print {
    body {
      background: white;
      color: black;
    }

    .no-print {
      display: none !important;
    }
  }
`;

