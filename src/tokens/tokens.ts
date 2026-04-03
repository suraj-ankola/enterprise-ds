// Enterprise Design System — Design Tokens
// Single source of truth for all visual decisions

export const colors = {
  brand: {
    50:  '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', // primary action
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  neutral: {
    0:   '#ffffff',
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    light: '#dcfce7',
    base:  '#16a34a',
    dark:  '#14532d',
  },
  warning: {
    light: '#fef3c7',
    base:  '#d97706',
    dark:  '#78350f',
  },
  danger: {
    light: '#fee2e2',
    base:  '#dc2626',
    dark:  '#7f1d1d',
  },
  info: {
    light: '#e0f2fe',
    base:  '#0284c7',
    dark:  '#0c4a6e',
  },
} as const;

export const spacing = {
  0:   '0px',
  1:   '4px',
  2:   '8px',
  3:   '12px',
  4:   '16px',
  5:   '20px',
  6:   '24px',
  8:   '32px',
  10:  '40px',
  12:  '48px',
  16:  '64px',
} as const;

export const typography = {
  fontFamily: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, monospace',
  },
  fontSize: {
    xs:   ['12px', { lineHeight: '16px' }],
    sm:   ['14px', { lineHeight: '20px' }],
    base: ['16px', { lineHeight: '24px' }],
    lg:   ['18px', { lineHeight: '28px' }],
    xl:   ['20px', { lineHeight: '28px' }],
    '2xl':['24px', { lineHeight: '32px' }],
    '3xl':['30px', { lineHeight: '36px' }],
  },
  fontWeight: {
    regular:  '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
  },
} as const;

export const borderRadius = {
  none: '0px',
  sm:   '4px',
  md:   '6px',
  lg:   '8px',
  xl:   '12px',
  full: '9999px',
} as const;

export const shadow = {
  sm:  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md:  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg:  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;
