import React from 'react';
import type { Preview, StoryFn } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Color Mode',
      description: 'Light or dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
    product: {
      name: 'Product Theme',
      description: 'Brand theme per product',
      defaultValue: 'compliance',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'compliance', title: '🔵 Compliance' },
          { value: 'itops',      title: '🟣 IT Ops'     },
          { value: 'analytics',  title: '🩵 Analytics'  },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story: StoryFn, context) => {
      const isDark   = context.globals['theme']   === 'dark';
      const product  = (context.globals['product'] as string) ?? 'compliance';

      // Apply dark mode class and product theme attribute to <html>
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.setAttribute('data-theme', product);

      // Sync canvas background — use CSS token so it follows the active theme
      document.body.style.backgroundColor = 'var(--ds-bg-base)';
      document.body.style.padding = '24px';

      return React.createElement(Story as React.ComponentType);
    },
  ],

  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
