import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'AQI Prediction', href: paths.dashboard.AQIPrediction, icon: 'chart-pie' },
] satisfies NavItemConfig[];
