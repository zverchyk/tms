'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './earningsChart.module.scss';
import type { EarningsData, ChartConfig } from './MoneyDashboard';

interface EarningsChartProps {
    data: EarningsData[];
    config: ChartConfig;
}

export default function EarningsChart({ data, config }: EarningsChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, data: EarningsData } | null>(null);

    const getYAxisData = () => {
        switch (config.metric) {
            case 'earnings':
                return data.map(d => d.earnings);
            case 'profit':
                return data.map(d => d.earnings - d.expenses);
            case 'expenses':
                return data.map(d => d.expenses);
            case 'sessions':
                return data.map(d => d.sessions);
            default:
                return data.map(d => d.earnings);
        }
    };

    const formatValue = (value: number) => {
        if (config.metric === 'sessions') {
            return value.toString();
        }
        return `$${value.toLocaleString()}`;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        if (config.timeRange === 'week') {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (config.timeRange === 'month') {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else if (config.timeRange === 'quarter') {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short' });
        }
    };

    const getMetricLabel = () => {
        switch (config.metric) {
            case 'earnings': return 'Earnings ($)';
            case 'profit': return 'Profit ($)';
            case 'expenses': return 'Expenses ($)';
            case 'sessions': return 'Sessions';
            default: return 'Value';
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || data.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
        
        const width = rect.width;
        const height = rect.height;
        const padding = { top: 40, right: 40, bottom: 60, left: 80 };
        
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const yData = getYAxisData();
        const maxY = Math.max(...yData) * 1.1;
        const minY = Math.min(0, Math.min(...yData) * 0.9);

        // Draw grid lines
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (i / 5) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + chartWidth, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i <= data.length - 1; i += Math.ceil(data.length / 6)) {
            const x = padding.left + (i / (data.length - 1)) * chartWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, padding.top + chartHeight);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + chartHeight);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top + chartHeight);
        ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
        ctx.stroke();

        // Draw Y-axis labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (i / 5) * chartHeight;
            const value = maxY - (i / 5) * (maxY - minY);
            ctx.fillText(formatValue(value), padding.left - 10, y);
        }

        // Draw X-axis labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        for (let i = 0; i < data.length; i += Math.ceil(data.length / 6)) {
            const x = padding.left + (i / (data.length - 1)) * chartWidth;
            ctx.fillText(formatDate(data[i].date), x, padding.top + chartHeight + 10);
        }

        // Draw axis labels
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, sans-serif';
        
        // Y-axis label
        ctx.save();
        ctx.translate(20, padding.top + chartHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(getMetricLabel(), 0, 0);
        ctx.restore();
        
        // X-axis label
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('Time Period', padding.left + chartWidth / 2, height - 10);

        // Draw chart based on type
        const points: { x: number, y: number }[] = [];
        
        for (let i = 0; i < data.length; i++) {
            const x = padding.left + (i / (data.length - 1)) * chartWidth;
            const y = padding.top + ((maxY - yData[i]) / (maxY - minY)) * chartHeight;
            points.push({ x, y });
        }

        // Get colors based on metric
        const getChartColor = () => {
            switch (config.metric) {
                case 'expenses': return '#ef4444'; // Red for expenses
                case 'profit': return '#10b981'; // Green for profit
                case 'sessions': return '#f59e0b'; // Orange for sessions
                default: return '#3b82f6'; // Blue for earnings
            }
        };

        const chartColor = getChartColor();

        if (config.chartType === 'area' || config.chartType === 'line') {
            if (config.chartType === 'area') {
                // Draw area fill
                const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
                gradient.addColorStop(0, `${chartColor}4D`); // 30% opacity
                gradient.addColorStop(1, `${chartColor}0D`); // 5% opacity
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(points[0].x, padding.top + chartHeight);
                
                for (const point of points) {
                    ctx.lineTo(point.x, point.y);
                }
                
                ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
                ctx.closePath();
                ctx.fill();
            }
            
            // Draw line
            ctx.strokeStyle = chartColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            for (let i = 0; i < points.length; i++) {
                if (i === 0) {
                    ctx.moveTo(points[i].x, points[i].y);
                } else {
                    ctx.lineTo(points[i].x, points[i].y);
                }
            }
            
            ctx.stroke();
            
            // Draw points
            ctx.fillStyle = chartColor;
            for (const point of points) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // White center
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = chartColor;
            }
        } else if (config.chartType === 'bar') {
            const barWidth = chartWidth / data.length * 0.6;
            
            ctx.fillStyle = chartColor;
            
            for (let i = 0; i < points.length; i++) {
                const barHeight = (padding.top + chartHeight) - points[i].y;
                const x = points[i].x - barWidth / 2;
                const y = points[i].y;
                
                ctx.fillRect(x, y, barWidth, barHeight);
            }
        }

    }, [data, config]);

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
                        {config.metric === 'earnings' && `Earnings: ${formatValue(hoveredPoint.data.earnings)}`}
                        {config.metric === 'profit' && `Profit: ${formatValue(hoveredPoint.data.earnings - hoveredPoint.data.expenses)}`}
                        {config.metric === 'expenses' && `Expenses: ${formatValue(hoveredPoint.data.expenses)}`}
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