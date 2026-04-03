import React from 'react';
import type { Preview, StoryFn } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
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
  },

  decorators: [
    (Story: StoryFn, context) => {
      const isDark = context.globals['theme'] === 'dark';

      // Apply / remove .dark on the preview <html> element
      document.documentElement.classList.toggle('dark', isDark);

      // Keep the Storybook canvas background in sync
      document.body.style.backgroundColor = isDark ? '#0f172a' : '#f8fafc';
      document.body.style.padding = '24px';

      return React.createElement(Story as React.ComponentType);
    },
  ],

  parameters: {
    backgrounds: { disable: true }, // replaced by our Theme toolbar toggle
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
