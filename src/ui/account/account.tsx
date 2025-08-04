'use client';
import { useState } from 'react';
import styles from './account.module.scss';

interface GoalMetric {
    id: string;
    label: string;
    current: number;
    goal: number;
    icon: string;
}

export default function AccountPage() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [metrics, setMetrics] = useState<GoalMetric[]>([
        { id: 'clients', label: 'Clients', current: 23, goal: 30, icon: '👥' },
        { id: 'earnings', label: 'Earnings', current: 4800, goal: 6000, icon: '💰' },
        { id: 'requests', label: 'Requests', current: 18, goal: 25, icon: '📋' }
    ]);

    const handleSaveChanges = (newMetrics: GoalMetric[]) => {
        setMetrics(newMetrics);
        setIsEditMode(false);
    };

    const getProgressPercentage = (current: number, goal: number) => {
        return Math.min((current / goal) * 100, 100);
    };

    const formatValue = (value: number, type: string) => {
        if (type === 'earnings') {
            return `$${value.toLocaleString()}`;
        }
        return value.toString();
    };

    return (
        <div className={styles.accountContainer}>
            {/* Animated Background Elements */}
            <div className={styles.backgroundElements}>
                <div className={styles.floatingShape1}></div>
                <div className={styles.floatingShape2}></div>
                <div className={styles.floatingShape3}></div>
            </div>

            {/* Modern Header */}
            <div className={styles.header}>
                <div className={styles.profileSection}>
                    <div className={styles.profileWrapper}>
                        <div className={styles.profileIcon}>
                            <div className={styles.profileGlow}></div>
                            👤
                        </div>
                        <div className={styles.statusIndicator}></div>
                    </div>
                    <div className={styles.userInfo}>
                        <h2 className={styles.username}>
                            John Smith
                            <span className={styles.verifiedBadge}>✓</span>
                        </h2>
                        <p className={styles.userRole}>
                            <span className={styles.roleIcon}>🎨</span>
                            Tattoo Artist
                        </p>
                        <div className={styles.userStats}>
                            <span className={styles.statItem}>
                                <span className={styles.statValue}>4.9</span>
                                <span className={styles.statLabel}>Rating</span>
                            </span>
                            <span className={styles.statItem}>
                                <span className={styles.statValue}>127</span>
                                <span className={styles.statLabel}>Works</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.notificationButton}>
                        <span className={styles.notificationIcon}>🔔</span>
                        <span className={styles.notificationBadge}>3</span>
                    </button>
                    <button 
                        className={styles.editButton}
                        onClick={() => setIsEditMode(true)}
                    >
                        <span className={styles.editIcon}>⚙️</span>
                        <span>Edit Goals</span>
                        <div className={styles.buttonGlow}></div>
                    </button>
                </div>
            </div>

            {/* Modern Goal Cards */}
            <div className={styles.goalsSection}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>
                        Monthly Progress
                        <span className={styles.titleAccent}></span>
                    </h3>
                    <p className={styles.sectionSubtitle}>Track your performance and reach your goals</p>
                </div>
                
                <div className={styles.circlesContainer}>
                    {metrics.map((metric, index) => {
                        const progress = getProgressPercentage(metric.current, metric.goal);
                        return (
                            <div 
                                key={metric.id} 
                                className={styles.goalCircle}
                                style={{ '--animation-delay': `${index * 0.1}s` } as React.CSSProperties}
                            >
                                <div className={styles.cardGlow}></div>
                                <div className={styles.circleWrapper}>
                                    <svg className={styles.progressRing} width="140" height="140">
                                        <defs>
                                            <linearGradient id={`progressGradient-${metric.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#667eea" />
                                                <stop offset="50%" stopColor="#764ba2" />
                                                <stop offset="100%" stopColor="#f093fb" />
                                            </linearGradient>
                                            <filter id={`glow-${metric.id}`}>
                                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                                <feMerge> 
                                                    <feMergeNode in="coloredBlur"/>
                                                    <feMergeNode in="SourceGraphic"/>
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <circle
                                            className={styles.progressRingBackground}
                                            cx="70"
                                            cy="70"
                                            r="55"
                                        />
                                        <circle
                                            className={styles.progressRingFill}
                                            cx="70"
                                            cy="70"
                                            r="55"
                                            stroke={`url(#progressGradient-${metric.id})`}
                                            filter={`url(#glow-${metric.id})`}
                                            style={{
                                                strokeDasharray: `${2 * Math.PI * 55}`,
                                                strokeDashoffset: `${2 * Math.PI * 55 * (1 - progress / 100)}`,
                                                '--progress': progress / 100
                                            } as React.CSSProperties}
                                        />
                                    </svg>
                                    <div className={styles.circleContent}>
                                        <div className={styles.metricIconWrapper}>
                                            <div className={styles.metricIcon}>{metric.icon}</div>
                                        </div>
                                        <div className={styles.metricValue}>
                                            {formatValue(metric.current, metric.id)}
                                        </div>
                                        <div className={styles.metricGoal}>
                                            of {formatValue(metric.goal, metric.id)}
                                        </div>
                                        <div className={styles.progressPercent}>
                                            {progress.toFixed(0)}%
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.goalInfo}>
                                    <h4 className={styles.metricLabel}>{metric.label}</h4>
                                    <div className={styles.progressBar}>
                                        <div 
                                            className={styles.progressBarFill}
                                            style={{ '--progress': progress / 100 } as React.CSSProperties}
                                        ></div>
                                    </div>
                                    <div className={styles.goalStatus}>
                                        <span className={styles.statusText}>
                                            {progress >= 100 ? '🎉 Completed' : 
                                             progress >= 75 ? '🔥 Almost there' :
                                             progress >= 50 ? '📈 On track' : '🚀 Getting started'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modern Edit Modal */}
            {isEditMode && (
                <EditGoalsModal 
                    metrics={metrics}
                    onSave={handleSaveChanges}
                    onCancel={() => setIsEditMode(false)}
                />
            )}
        </div>
    );
}

interface EditGoalsModalProps {
    metrics: GoalMetric[];
    onSave: (metrics: GoalMetric[]) => void;
    onCancel: () => void;
}

function EditGoalsModal({ metrics, onSave, onCancel }: EditGoalsModalProps) {
    const [editMetrics, setEditMetrics] = useState<GoalMetric[]>([...metrics]);

    const updateMetric = (id: string, field: 'label' | 'goal', value: string | number) => {
        setEditMetrics(prev => prev.map(metric => 
            metric.id === id ? { ...metric, [field]: value } : metric
        ));
    };

    const handleSave = () => {
        onSave(editMetrics);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3>Edit Monthly Goals</h3>
                    <button className={styles.closeButton} onClick={onCancel}>×</button>
                </div>
                
                <div className={styles.modalBody}>
                    {editMetrics.map((metric) => (
                        <div key={metric.id} className={styles.metricEditor}>
                            <div className={styles.metricPreview}>
                                <span className={styles.metricIconSmall}>{metric.icon}</span>
                                <span>{metric.label}</span>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Goal Name:</label>
                                <input
                                    type="text"
                                    value={metric.label}
                                    onChange={(e) => updateMetric(metric.id, 'label', e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Monthly Goal:</label>
                                <input
                                    type="number"
                                    value={metric.goal}
                                    onChange={(e) => updateMetric(metric.id, 'goal', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
