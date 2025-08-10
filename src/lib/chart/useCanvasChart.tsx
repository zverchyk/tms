// lib/chart/useCanvasChart.ts
'use client';

import { useEffect } from 'react';
import {
  formatDate, formatValue, getMetricLabel, getYAxisData, getChartColor, Metric
} from '@/lib/chart/utils';

type Point = { date: Date; value: number };
type Config = { metric: Metric; chartType: 'line' | 'area' | 'bar' };

export function useCanvasChart(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  data: Point[],
  config: Config
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // buffer size
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    // clear with device pixels
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // scale to CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 40, right: 40, bottom: 60, left: 80 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const yData = getYAxisData(data);
    const maxY = Math.max(...yData) * 1.1;
    const minY = Math.min(0, Math.min(...yData) * 0.9);

    // grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    for (let i = 0; i <= data.length - 1; i += Math.ceil(data.length / 6)) {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
    }

    // axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Y labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight;
      const value = maxY - (i / 5) * (maxY - minY);
      ctx.fillText(formatValue(value), padding.left - 10, y);
    }

    // X labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < data.length; i += Math.ceil(data.length / 6)) {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      ctx.fillText(formatDate(data[i].date), x, padding.top + chartHeight + 10);
    }

    // axis titles
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, sans-serif';

    ctx.save();
    ctx.translate(20, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(getMetricLabel(config.metric), 0, 0);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Time Period', padding.left + chartWidth / 2, height - 10);

    // points
    const points = data.map((d, i) => ({
      x: padding.left + (i / (data.length - 1)) * chartWidth,
      y: padding.top + ((maxY - d.value) / (maxY - minY)) * chartHeight,
    }));

    const chartColor = getChartColor(config.metric);

    if (config.chartType === 'area' || config.chartType === 'line') {
      if (config.chartType === 'area') {
        const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
        gradient.addColorStop(0, `${chartColor}4D`);
        gradient.addColorStop(1, `${chartColor}0D`);
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(points[0].x, padding.top + chartHeight);
        for (const p of points) ctx.lineTo(p.x, p.y);
        ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = chartColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      // markers
      ctx.fillStyle = chartColor;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = chartColor;
      }
    } else if (config.chartType === 'bar') {
      const barWidth = (chartWidth / data.length) * 0.6;
      ctx.fillStyle = chartColor;
      for (let i = 0; i < points.length; i++) {
        const barH = padding.top + chartHeight - points[i].y;
        ctx.fillRect(points[i].x - barWidth / 2, points[i].y, barWidth, barH);
      }
    }
  }, [canvasRef, data, config]);
}
