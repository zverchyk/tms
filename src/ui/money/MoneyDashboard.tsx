'use client';

import { useState, useEffect } from 'react';
import styles from './moneyDashboard.module.scss';
import EarningsChart from './EarningsChart';

export interface EarningsData {
    date: string;
    earnings: number;
    sessions: number;
    expenses: number;
}

export interface ChartConfig {
    timeRange: 'week' | 'month' | 'quarter' | 'year';
    metric: 'earnings' | 'profit' | 'sessions' | 'expenses';
    chartType: 'line' | 'bar' | 'area';
}

const FILTER_PRESETS = [
    { id: 'week-earnings', label: 'Week Earnings', config: { timeRange: 'week' as const, metric: 'earnings' as const, chartType: 'line' as const } },
    { id: 'month-profit', label: 'Month Profit', config: { timeRange: 'month' as const, metric: 'profit' as const, chartType: 'area' as const } },
    { id: 'month-expenses', label: 'Month Expenses', config: { timeRange: 'month' as const, metric: 'expenses' as const, chartType: 'bar' as const } },
    { id: 'quarter-sessions', label: 'Quarter Sessions', config: { timeRange: 'quarter' as const, metric: 'sessions' as const, chartType: 'bar' as const } },
    { id: 'year-overview', label: 'Year Overview', config: { timeRange: 'year' as const, metric: 'earnings' as const, chartType: 'area' as const } },
];

// Mock data generator
const generateMockData = (timeRange: string): EarningsData[] => {
    const data: EarningsData[] = [];
    const now = new Date();
    let days = 7;
    
    switch (timeRange) {
        case 'week': days = 7; break;
        case 'month': days = 30; break;
        case 'quarter': days = 90; break;
        case 'year': days = 365; break;
    }
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const baseEarnings = 200 + Math.random() * 800;
        const sessions = Math.floor(2 + Math.random() * 8);
        const expenses = baseEarnings * (0.2 + Math.random() * 0.3);
        
        data.push({
            date: date.toISOString().split('T')[0],
            earnings: Math.round(baseEarnings),
            sessions,
            expenses: Math.round(expenses),
        });
    }
    
    return data;
};

export default function MoneyDashboard() {
    const [chartConfig, setChartConfig] = useState<ChartConfig>({
        timeRange: 'month',
        metric: 'earnings',
        chartType: 'area'
    });
    
    const [data, setData] = useState<EarningsData[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setData(generateMockData(chartConfig.timeRange));
    }, [chartConfig.timeRange]);

    const handlePresetSelect = (preset: typeof FILTER_PRESETS[0]) => {
        setChartConfig(preset.config);
        setIsFilterOpen(false);
    };

    const getTotalEarnings = () => {
        return data.reduce((sum, item) => sum + item.earnings, 0);
    };

    const getTotalProfit = () => {
        return data.reduce((sum, item) => sum + (item.earnings - item.expenses), 0);
    };

    const getTotalSessions = () => {
        return data.reduce((sum, item) => sum + item.sessions, 0);
    };

    const getTotalExpenses = () => {
        return data.reduce((sum, item) => sum + item.expenses, 0);
    };

    const getAveragePerSession = () => {
        const totalSessions = getTotalSessions();
        return totalSessions > 0 ? getTotalEarnings() / totalSessions : 0;
    };

    return (
        <div className={styles.dashboard}>
            {/* Header with Filter */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>Money Analytics</h1>
                    <p className={styles.subtitle}>Track your earnings and business performance</p>
                </div>
                
                <div className={styles.filterContainer}>
                    <button 
                        className={styles.filterButton}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        📊 {FILTER_PRESETS.find(p => 
                            p.config.timeRange === chartConfig.timeRange && 
                            p.config.metric === chartConfig.metric
                        )?.label || 'Custom'}
                        <span className={styles.chevron}>▼</span>
                    </button>
                    
                    {isFilterOpen && (
                        <div className={styles.filterDropdown}>
                            <div className={styles.filterHeader}>Chart Presets</div>
                            {FILTER_PRESETS.map(preset => (
                                <button
                                    key={preset.id}
                                    className={styles.filterOption}
                                    onClick={() => handlePresetSelect(preset)}
                                >
                                    {preset.label}
                                </button>
                            ))}
                            
                            <div className={styles.filterDivider}></div>
                            
                            <div className={styles.customControls}>
                                <div className={styles.controlGroup}>
                                    <label>Time Range:</label>
                                    <select 
                                        value={chartConfig.timeRange}
                                        onChange={(e) => setChartConfig(prev => ({ 
                                            ...prev, 
                                            timeRange: e.target.value as ChartConfig['timeRange']
                                        }))}
                                    >
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                        <option value="quarter">Quarter</option>
                                        <option value="year">Year</option>
                                    </select>
                                </div>
                                
                                <div className={styles.controlGroup}>
                                    <label>Metric:</label>
                                    <select 
                                        value={chartConfig.metric}
                                        onChange={(e) => setChartConfig(prev => ({ 
                                            ...prev, 
                                            metric: e.target.value as ChartConfig['metric']
                                        }))}
                                    >
                                        <option value="earnings">Earnings</option>
                                        <option value="profit">Profit</option>
                                        <option value="expenses">Expenses</option>
                                        <option value="sessions">Sessions</option>
                                    </select>
                                </div>
                                
                                <div className={styles.controlGroup}>
                                    <label>Chart Type:</label>
                                    <select 
                                        value={chartConfig.chartType}
                                        onChange={(e) => setChartConfig(prev => ({ 
                                            ...prev, 
                                            chartType: e.target.value as ChartConfig['chartType']
                                        }))}
                                    >
                                        <option value="line">Line</option>
                                        <option value="bar">Bar</option>
                                        <option value="area">Area</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>${getTotalEarnings().toLocaleString()}</div>
                        <div className={styles.statLabel}>Total Earnings</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📉</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>${getTotalExpenses().toLocaleString()}</div>
                        <div className={styles.statLabel}>Total Expenses</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>${getTotalProfit().toLocaleString()}</div>
                        <div className={styles.statLabel}>Net Profit</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🎯</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>{getTotalSessions()}</div>
                        <div className={styles.statLabel}>Total Sessions</div>
                    </div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💎</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>${getAveragePerSession().toFixed(0)}</div>
                        <div className={styles.statLabel}>Avg per Session</div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className={styles.chartContainer}>
                <EarningsChart 
                    data={data}
                    config={chartConfig}
                />
            </div>
        </div>
    );
}