/**
 * Enterprise Design System — Icons
 *
 * Single import point for all icons across the design system.
 * Source: https://phosphoricons.com  (Apache 2.0 license)
 *
 * Usage:
 *   import { House, MagnifyingGlass, Bell } from '@/components/foundations/Icons'
 *   <House size={20} weight="regular" />
 *
 * Weights: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
 */

// ─── Re-export everything from Phosphor ──────────────────────────────────────
export * from '@phosphor-icons/react';
export type { Icon, IconProps, IconWeight } from '@phosphor-icons/react';

// ─── Design system size scale ────────────────────────────────────────────────
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const iconSizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};
