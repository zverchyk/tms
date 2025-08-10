'use client';

import { useState, useRef, useMemo } from 'react';
import styles from './earningsChart.module.scss';
import type { EarningsData, ChartConfig } from './MoneyDashboard';
import { useCanvasChart } from '@/lib/chart/useCanvasChart';
import type { Metric } from '@/lib/chart/utils';
import { formatValue as formatNumber } from '@/lib/chart/utils';

type Point = { date: Date; value: number };
type Config = { metric: Metric; chartType: 'line' | 'area' | 'bar' };

interface EarningsChartProps {
    data: EarningsData[];
    config: ChartConfig;
}

export default function EarningsChart({ data, config }: EarningsChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, data: EarningsData } | null>(null);

    const chartPoints = useMemo(
        () => data.map(d => ({
            date: new Date(d.date),
            value:
                config.metric === 'earnings' ? d.earnings :
                config.metric === 'profit' ? d.earnings - d.expenses :
                config.metric === 'expenses' ? d.expenses :
                d.sessions
        })),
        [data, config.metric]
    );

    useCanvasChart(canvasRef, chartPoints, {
        metric: config.metric as Metric,
        chartType: config.chartType
    });

    const renderCurrency = (n: number) => `$${formatNumber(n)}`;

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || data.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const padding = { top: 40, right: 40, bottom: 60, left: 80 };
        const chartWidth = rect.width - padding.left - padding.right;

        if (x >= padding.left && x <= padding.left + chartWidth && 
            y >= padding.top && y <= padding.top + (rect.height - padding.top - padding.bottom)) {
            
            const dataIndex = Math.round(((x - padding.left) / chartWidth) * (data.length - 1));
            const clampedIndex = Math.max(0, Math.min(dataIndex, data.length - 1));
            
            setHoveredPoint({
                x: e.clientX,
                y: e.clientY,
                data: data[clampedIndex]
            });
        } else {
            setHoveredPoint(null);
        }
    };

    const handleMouseLeave = () => {
        setHoveredPoint(null);
    };

    return (
        <div className={styles.chartWrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            
            {hoveredPoint && (
                <div 
                    className={styles.tooltip}
                    style={{ 
                        left: hoveredPoint.x + 10,
                        top: hoveredPoint.y - 10
                    }}
                >
                    <div className={styles.tooltipDate}>
                        {new Date(hoveredPoint.data.date).toLocaleDateString()}
                    </div>
                    <div className={styles.tooltipValue}>
                        {config.metric === 'earnings' && `Earnings: ${renderCurrency(hoveredPoint.data.earnings)}`}
                        {config.metric === 'profit' && `Profit: ${renderCurrency(hoveredPoint.data.earnings - hoveredPoint.data.expenses)}`}
                        {config.metric === 'expenses' && `Expenses: ${renderCurrency(hoveredPoint.data.expenses)}`}
                        {config.metric === 'sessions' && `Sessions: ${hoveredPoint.data.sessions}`}
                    </div>
                    {config.metric !== 'sessions' && (
                        <div className={styles.tooltipExtra}>
                            Sessions: {hoveredPoint.data.sessions}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}