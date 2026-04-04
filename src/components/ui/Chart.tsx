'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

// ─── DS colour hook ───────────────────────────────────────────────────────────
// Reads CSS custom properties at render time → theme-aware (brand + dark mode)

function cssVar(name: string, fallback = '#000'): string {
  if (typeof window === 'undefined') return fallback;
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim() || fallback
  );
}

function useDSColors() {
  return useMemo(() => ({
    brand:     cssVar('--ds-brand-600',     '#2563eb'),
    brand100:  cssVar('--ds-brand-100',     '#dbeafe'),
    success:   cssVar('--ds-success-icon',  '#16a34a'),
    warning:   cssVar('--ds-warning-icon',  '#d97706'),
    danger:    cssVar('--ds-danger-icon',   '#dc2626'),
    info:      cssVar('--ds-info-icon',     '#0284c7'),
    muted:     cssVar('--ds-text-muted',    '#94a3b8'),
    secondary: cssVar('--ds-text-secondary','#475569'),
    primary:   cssVar('--ds-text-primary',  '#0f172a'),
    bgBase:    cssVar('--ds-bg-base',       '#f8fafc'),
    bgSurface: cssVar('--ds-bg-surface',    '#ffffff'),
    bgSubtle:  cssVar('--ds-bg-subtle',     '#f1f5f9'),
    border:    cssVar('--ds-border-base',   '#e2e8f0'),
    // Multi-series palette — brand-driven
    palette: [
      cssVar('--ds-brand-600',    '#2563eb'),
      cssVar('--ds-success-icon', '#16a34a'),
      cssVar('--ds-warning-icon', '#d97706'),
      cssVar('--ds-danger-icon',  '#dc2626'),
      cssVar('--ds-info-icon',    '#0284c7'),
      '#8b5cf6', // violet — not in every theme, hardcoded fallback
      '#f59e0b',
    ],
  }), []);
}

// ─── Shared ECharts option defaults ──────────────────────────────────────────

function baseOption(c: ReturnType<typeof useDSColors>): Partial<EChartsOption> {
  return {
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', color: c.secondary },
    tooltip: {
      trigger:        'axis' as const,
      backgroundColor: c.bgSurface,
      borderColor:    c.border,
      borderWidth:    1,
      textStyle:      { color: c.primary, fontSize: 12 },
      axisPointer:    { lineStyle: { color: c.border } },
      padding:        [8, 12],
      extraCssText:   'border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.12)',
    },
    legend: {
      textStyle:    { color: c.secondary, fontSize: 12 },
      itemHeight:   10,
      itemWidth:    16,
      icon:         'roundRect',
      pageIconColor: c.brand,
      pageTextStyle: { color: c.secondary },
    },
    grid: {
      left: '0%', right: '2%', top: '12%', bottom: '4%',
      containLabel: true,
    },
    color: c.palette,
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChartSeries {
  name:   string;
  data:   number[];
  color?: string;
  /** Fill area below line (for area charts) */
  area?:  boolean;
}

export interface TimeSeriesPoint {
  date:  string;
  value: number;
}

export interface TimeSeries {
  name:   string;
  data:   TimeSeriesPoint[];
  color?: string;
  area?:  boolean;
}

export interface DonutSlice {
  name:  string;
  value: number;
  color?: string;
}

export interface HeatmapCell {
  x:     number; // column index
  y:     number; // row index
  value: number;
}

// ─── Base Chart wrapper ───────────────────────────────────────────────────────

export interface ChartProps {
  option:     EChartsOption;
  height?:    number | string;
  loading?:   boolean;
  className?: string;
}

export function Chart({ option, height = 300, loading = false, className = '' }: ChartProps) {
  return (
    <ReactECharts
      option={option}
      style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
      showLoading={loading}
      loadingOption={{ text: '', color: '#2563eb', maskColor: 'transparent' }}
      notMerge={true}
      lazyUpdate={true}
      className={className}
    />
  );
}

// ─── LineChart ────────────────────────────────────────────────────────────────

export interface LineChartProps {
  series:      ChartSeries[];
  categories:  string[];
  height?:     number;
  smooth?:     boolean;
  showArea?:   boolean;
  yAxisLabel?: string;
  loading?:    boolean;
  /** Show data zoom slider at bottom */
  zoom?:       boolean;
  className?:  string;
}

export function LineChart({
  series, categories, height = 300, smooth = true,
  showArea = false, yAxisLabel, loading, zoom, className,
}: LineChartProps) {
  const c = useDSColors();

  const option: EChartsOption = {
    ...baseOption(c),
    xAxis: {
      type: 'category',
      data: categories,
      axisLine:  { lineStyle: { color: c.border } },
      axisTick:  { show: false },
      axisLabel: { color: c.muted, fontSize: 11 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: yAxisLabel,
      nameTextStyle: { color: c.muted, fontSize: 11 },
      axisLabel:  { color: c.muted, fontSize: 11 },
      axisLine:   { show: false },
      axisTick:   { show: false },
      splitLine:  { lineStyle: { color: c.border, type: 'dashed' } },
    },
    ...(zoom ? {
      dataZoom: [
        { type: 'inside', start: 0, end: 100 },
        { type: 'slider', height: 20, bottom: 0, borderColor: c.border,
          handleStyle: { color: c.brand }, fillerColor: c.brand100 },
      ],
      grid: { left: '0%', right: '2%', top: '12%', bottom: '16%', containLabel: true },
    } : {}),
    series: series.map((s, i) => ({
      name:   s.name,
      type:   'line',
      data:   s.data,
      smooth,
      color:  s.color ?? c.palette[i % c.palette.length],
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      emphasis: { focus: 'series', scale: true },
      lineStyle: { width: 2 },
      ...(showArea || s.area ? {
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: (s.color ?? c.palette[i % c.palette.length]) + '30' },
              { offset: 1, color: (s.color ?? c.palette[i % c.palette.length]) + '00' },
            ],
          },
        },
      } : {}),
    })),
  };

  return <Chart option={option} height={height} loading={loading} className={className} />;
}

// ─── BarChart ─────────────────────────────────────────────────────────────────

export interface BarChartProps {
  series:        ChartSeries[];
  categories:    string[];
  height?:       number;
  horizontal?:   boolean;
  stacked?:      boolean;
  /** Show value label on each bar */
  showLabels?:   boolean;
  yAxisLabel?:   string;
  loading?:      boolean;
  className?:    string;
}

export function BarChart({
  series, categories, height = 300, horizontal = false,
  stacked = false, showLabels = false, yAxisLabel, loading, className,
}: BarChartProps) {
  const c = useDSColors();

  const catAxis = {
    type: 'category' as const,
    data: categories,
    axisLine:  { lineStyle: { color: c.border } },
    axisTick:  { show: false },
    axisLabel: { color: c.muted, fontSize: 11 },
    splitLine: { show: false },
  };

  const valAxis = {
    type: 'value' as const,
    name: yAxisLabel,
    nameTextStyle: { color: c.muted, fontSize: 11 },
    axisLabel: { color: c.muted, fontSize: 11 },
    axisLine:  { show: false },
    axisTick:  { show: false },
    splitLine: { lineStyle: { color: c.border, type: 'dashed' as const } },
  };

  const option: EChartsOption = {
    ...baseOption(c),
    xAxis: horizontal ? valAxis : catAxis,
    yAxis: horizontal ? catAxis : valAxis,
    series: series.map((s, i) => ({
      name:  s.name,
      type:  'bar',
      data:  s.data,
      stack: stacked ? 'total' : undefined,
      color: s.color ?? c.palette[i % c.palette.length],
      barMaxWidth: 40,
      borderRadius: stacked ? 0 : 4,
      emphasis: { focus: 'series' },
      label: showLabels ? {
        show: true,
        position: horizontal ? 'right' : 'top',
        color: c.secondary,
        fontSize: 10,
      } : { show: false },
    })),
  };

  return <Chart option={option} height={height} loading={loading} className={className} />;
}

// ─── AreaChart ────────────────────────────────────────────────────────────────

export function AreaChart(props: Omit<LineChartProps, 'showArea'>) {
  return <LineChart {...props} showArea smooth />;
}

// ─── DonutChart ───────────────────────────────────────────────────────────────

export interface DonutChartProps {
  data:          DonutSlice[];
  height?:       number;
  /** Text shown in the centre hole */
  centerLabel?:  string;
  centerValue?:  string;
  /** Inner radius as percent string e.g. "55%" */
  innerRadius?:  string;
  loading?:      boolean;
  className?:    string;
}

export function DonutChart({
  data, height = 300, centerLabel, centerValue,
  innerRadius = '60%', loading, className,
}: DonutChartProps) {
  const c = useDSColors();

  const option: EChartsOption = {
    ...baseOption(c),
    tooltip: {
      ...(baseOption(c).tooltip as object),
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      ...(baseOption(c).legend as object),
      orient: 'vertical',
      right: '5%',
      top: 'center',
    },
    series: [{
      type:        'pie',
      radius:      [innerRadius, '80%'],
      center:      ['40%', '50%'],
      avoidLabelOverlap: true,
      padAngle:    2,
      itemStyle:   { borderRadius: 4, borderColor: c.bgSurface, borderWidth: 2 },
      label:       { show: false },
      emphasis: {
        label:    { show: false },
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,.15)' },
      },
      data: data.map((d, i) => ({
        name:  d.name,
        value: d.value,
        itemStyle: { color: d.color ?? c.palette[i % c.palette.length] },
      })),
    }],
    ...(centerLabel || centerValue ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      graphic: [{
        type: 'group',
        left: '40%',
        top:  'center',
        children: [
          ...(centerValue ? [{
            type:  'text',
            style: {
              text:      centerValue,
              font:      'bold 22px Inter, sans-serif',
              fill:      c.primary,
              textAlign: 'center',
            } as Record<string, unknown>,
            top: centerLabel ? -14 : 0,
          }] : []),
          ...(centerLabel ? [{
            type:  'text',
            style: {
              text:      centerLabel,
              font:      '12px Inter, sans-serif',
              fill:      c.muted,
              textAlign: 'center',
            } as Record<string, unknown>,
            top: centerValue ? 16 : 0,
          }] : []),
        ],
      }] as EChartsOption['graphic'],
    } : {}),
  };

  return <Chart option={option} height={height} loading={loading} className={className} />;
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

export interface SparklineProps {
  data:      number[];
  color?:    string;
  /** 'positive' = green, 'negative' = red, undefined = brand */
  trend?:    'positive' | 'negative' | 'neutral';
  height?:   number;
  width?:    number | string;
  className?: string;
}

export function Sparkline({ data, color, trend, height = 48, width = 120, className }: SparklineProps) {
  const c = useDSColors();

  const resolvedColor = color ?? (
    trend === 'positive' ? c.success :
    trend === 'negative' ? c.danger  : c.brand
  );

  const option: EChartsOption = {
    backgroundColor: 'transparent',
    grid:   { left: 0, right: 0, top: 2, bottom: 2 },
    xAxis:  { type: 'category', show: false },
    yAxis:  { type: 'value',    show: false },
    tooltip: { show: false },
    series: [{
      type:       'line',
      data,
      smooth:     true,
      symbol:     'none',
      lineStyle:  { color: resolvedColor, width: 1.5 },
      areaStyle:  {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: resolvedColor + '40' },
            { offset: 1, color: resolvedColor + '00' },
          ],
        },
      },
    }],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: typeof width === 'number' ? `${width}px` : width }}
      notMerge
      lazyUpdate
      className={className}
    />
  );
}

// ─── HeatmapChart ─────────────────────────────────────────────────────────────

export interface HeatmapChartProps {
  data:       HeatmapCell[];
  xLabels:    string[];
  yLabels:    string[];
  height?:    number;
  /** Low → High colour range */
  colorRange?: [string, string];
  loading?:   boolean;
  className?: string;
}

export function HeatmapChart({
  data, xLabels, yLabels, height = 280,
  colorRange, loading, className,
}: HeatmapChartProps) {
  const c = useDSColors();
  const [colorLow, colorHigh] = colorRange ?? [c.brand100, c.brand];

  const option: EChartsOption = {
    ...baseOption(c),
    grid: { left: '0%', right: '4%', top: '8%', bottom: '12%', containLabel: true },
    tooltip: {
      ...(baseOption(c).tooltip as object),
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { value: number[] };
        return `${yLabels[p.value[1]]} / ${xLabels[p.value[0]]}<br/><b>${p.value[2]}</b>`;
      },
    },
    xAxis: {
      type: 'category', data: xLabels, splitArea: { show: true },
      axisLabel: { color: c.muted, fontSize: 10, rotate: xLabels.length > 8 ? 30 : 0 },
      axisLine:  { lineStyle: { color: c.border } },
      axisTick:  { show: false },
    },
    yAxis: {
      type: 'category', data: yLabels, splitArea: { show: true },
      axisLabel: { color: c.muted, fontSize: 11 },
      axisLine:  { lineStyle: { color: c.border } },
      axisTick:  { show: false },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map(d => d.value), 1),
      calculable: true,
      orient:     'horizontal',
      left:       'center',
      bottom:     0,
      itemHeight: 120,
      text:       ['High', 'Low'],
      textStyle:  { color: c.muted, fontSize: 10 },
      inRange:    { color: [colorLow, colorHigh] },
    },
    series: [{
      type:       'heatmap',
      data:       data.map(d => [d.x, d.y, d.value]),
      label:      { show: true, color: c.primary, fontSize: 10 },
      emphasis:   { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,.2)' } },
      itemStyle:  { borderColor: c.bgSurface, borderWidth: 2, borderRadius: 3 },
    }],
  };

  return <Chart option={option} height={height} loading={loading} className={className} />;
}

// ─── ScatterChart ─────────────────────────────────────────────────────────────

export interface ScatterPoint {
  x:      number;
  y:      number;
  name?:  string;
  size?:  number;
}

export interface ScatterSeries {
  name:   string;
  data:   ScatterPoint[];
  color?: string;
}

export interface ScatterChartProps {
  series:     ScatterSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?:    number;
  loading?:   boolean;
  className?: string;
}

export function ScatterChart({
  series, xAxisLabel, yAxisLabel, height = 300, loading, className,
}: ScatterChartProps) {
  const c = useDSColors();

  const option: EChartsOption = {
    ...baseOption(c),
    tooltip: {
      ...(baseOption(c).tooltip as object),
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { seriesName?: string; data: { name?: string; value: number[] } };
        return `<b>${p.data.name ?? p.seriesName ?? ''}</b><br/>X: ${p.data.value[0]}<br/>Y: ${p.data.value[1]}`;
      },
    },
    xAxis: {
      type:  'value',
      name:  xAxisLabel,
      nameLocation: 'middle',
      nameGap: 28,
      nameTextStyle: { color: c.muted, fontSize: 11 },
      axisLabel: { color: c.muted, fontSize: 11 },
      axisLine:  { lineStyle: { color: c.border } },
      axisTick:  { show: false },
      splitLine: { lineStyle: { color: c.border, type: 'dashed' } },
    },
    yAxis: {
      type:  'value',
      name:  yAxisLabel,
      nameTextStyle: { color: c.muted, fontSize: 11 },
      axisLabel: { color: c.muted, fontSize: 11 },
      axisLine:  { show: false },
      axisTick:  { show: false },
      splitLine: { lineStyle: { color: c.border, type: 'dashed' } },
    },
    series: series.map((s, i) => ({
      name:  s.name,
      type:  'scatter',
      color: s.color ?? c.palette[i % c.palette.length],
      data:  s.data.map(p => ({
        name:  p.name,
        value: [p.x, p.y],
        symbolSize: p.size ?? 10,
      })),
      emphasis: { focus: 'series', scale: 1.3 },
    })),
  };

  return <Chart option={option} height={height} loading={loading} className={className} />;
}
