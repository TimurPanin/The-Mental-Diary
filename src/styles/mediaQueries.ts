import { css } from 'styled-components'

export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px'
} as const

export const media = {
  mobile: (...args: Parameters<typeof css>) => css`
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: Parameters<typeof css>) => css`
    @media (max-width: ${BREAKPOINTS.TABLET}) {
      ${css(...args)}
    }
  `,
  desktop: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${BREAKPOINTS.DESKTOP}) {
      ${css(...args)}
    }
  `
}

export const responsiveFontSizes = {
  title: {
    desktop: '2.5rem',
    tablet: '2rem',
    mobile: '1.5rem'
  },
  subtitle: {
    desktop: '1.1rem',
    tablet: '1rem',
    mobile: '0.9rem'
  },
  body: {
    desktop: '1rem',
    tablet: '0.9rem',
    mobile: '0.8rem'
  }
}





