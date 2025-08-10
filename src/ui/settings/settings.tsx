'use client';
import { useState } from 'react';
import styles from './settings.module.scss';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');
    const [formData, setFormData] = useState({
        calendarSync: true,
        reminders: false,
        autoTimezone: true,
        defaultTitle: 'Tattoo with [Client Name]',
        theme: 'light',
        accentColor: 'blue',
        tokenWarnings: true,
        clearCache: false
    });

    const handleInputChange = (key: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'integrations', label: 'Integrations', icon: '🔗' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'appearance', label: 'Appearance', icon: '🎨' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'advanced', label: 'Advanced', icon: '⚙️' }
    ];

    return (
        <div className={styles.settingsContainer}>
            {/* Header */}
            <div className={styles.settingsHeader}>
                <h1>Settings</h1>
                <p>Manage your account settings and preferences</p>
            </div>

            <div className={styles.settingsLayout}>
                {/* Sidebar Navigation */}
                <nav className={styles.settingsNav}>
                    <div className={styles.navSection}>
                        <h3>Personal settings</h3>
                        <ul>
                            {tabs.map(tab => (
                                <li key={tab.id}>
                                    <button
                                        className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <span className={styles.navIcon}>{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className={styles.settingsMain}>
                    {activeTab === 'account' && (
                        <div className={styles.settingsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Public profile</h2>
                                <p>This information will be displayed publicly so be careful what you share.</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Name</label>
                                <input 
                                    type="text" 
                                    className={styles.formInput}
                                    defaultValue="John Smith"
                                    placeholder="Your display name"
                                />
                                <p className={styles.formHelp}>Your name may appear around the app where you contribute or are mentioned.</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Bio</label>
                                <textarea 
                                    className={styles.formTextarea}
                                    placeholder="Tell us a little bit about yourself"
                                    rows={3}
                                    defaultValue="Professional tattoo artist with 10+ years of experience"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Profile picture</label>
                                <div className={styles.avatarUpload}>
                                    <div className={styles.currentAvatar}>👤</div>
                                    <div className={styles.uploadActions}>
                                        <button type="button" className={styles.btnSecondary}>Upload a picture...</button>
                                        <button type="button" className={styles.btnDanger}>Remove</button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.dangerZone}>
                                <div className={styles.dangerHeader}>
                                    <h3>Danger Zone</h3>
                                </div>
                                <div className={styles.dangerContent}>
                                    <div className={styles.dangerItem}>
                                        <div>
                                            <strong>Delete this account</strong>
                                            <p>Once you delete your account, there is no going back. Please be certain.</p>
                                        </div>
                                        <button className={styles.btnDanger}>Delete account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className={styles.settingsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Integrations</h2>
                                <p>Connect your account with external services to enhance your workflow.</p>
                            </div>

                            <div className={styles.integrationsList}>
                                <div className={styles.integrationItem}>
                                    <div className={styles.integrationInfo}>
                                        <div className={styles.integrationIcon}>🟢</div>
                                        <div>
                                            <h4>Google Integration</h4>
                                            <p>Connected as artist.email@gmail.com</p>
                                            <span className={styles.statusConnected}>Connected</span>
                                        </div>
                                    </div>
                                    <div className={styles.integrationActions}>
                                        <button className={styles.btnSecondary}>Configure</button>
                                        <button className={styles.btnDanger}>Disconnect</button>
                                    </div>
                                </div>

                                <div className={styles.integrationItem}>
                                    <div className={styles.integrationInfo}>
                                        <div className={styles.integrationIcon}>📁</div>
                                        <div>
                                            <h4>Google Drive Storage</h4>
                                            <p>Automatically sync your session files</p>
                                            <span className={styles.statusConnected}>Connected</span>
                                        </div>
                                    </div>
                                    <div className={styles.integrationActions}>
                                        <button className={styles.btnSecondary}>Manage</button>
                                    </div>
                                </div>

                                <div className={styles.integrationItem}>
                                    <div className={styles.integrationInfo}>
                                        <div className={styles.integrationIcon}>📅</div>
                                        <div>
                                            <h4>Calendar Integration</h4>
                                            <p>Sync appointments with Google Calendar</p>
                                            <span className={styles.statusDisconnected}>Not connected</span>
                                        </div>
                                    </div>
                                    <div className={styles.integrationActions}>
                                        <button className={styles.btnPrimary}>Connect</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className={styles.settingsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Notifications</h2>
                                <p>Choose what you want to be notified about.</p>
                            </div>

                            <div className={styles.notificationGroup}>
                                <h3>Email notifications</h3>
                                <div className={styles.checkboxGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            checked={formData.reminders}
                                            onChange={(e) => handleInputChange('reminders', e.target.checked)}
                                        />
                                        <span className={styles.checkboxCustom}></span>
                                        <div>
                                            <strong>Session reminders</strong>
                                            <p>Get notified 1 hour before scheduled sessions</p>
                                        </div>
                                    </label>

                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" defaultChecked />
                                        <span className={styles.checkboxCustom}></span>
                                        <div>
                                            <strong>Client messages</strong>
                                            <p>Receive notifications when clients send messages</p>
                                        </div>
                                    </label>

                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" />
                                        <span className={styles.checkboxCustom}></span>
                                        <div>
                                            <strong>Weekly reports</strong>
                                            <p>Get a summary of your week&apos;s activities</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.notificationGroup}>
                                <h3>Push notifications</h3>
                                <div className={styles.checkboxGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input type="checkbox" defaultChecked />
                                        <span className={styles.checkboxCustom}></span>
                                        <div>
                                            <strong>Everything</strong>
                                            <p>Get push notifications for all activities</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className={styles.settingsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Appearance</h2>
                                <p>Customize how the app looks and feels.</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Theme</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input 
                                            type="radio" 
                                            name="theme" 
                                            value="light" 
                                            checked={formData.theme === 'light'}
                                            onChange={(e) => handleInputChange('theme', e.target.value)}
                                        />
                                        <span className={styles.radioCustom}></span>
                                        <div className={styles.themeOption}>
                                            <div className={styles.themePreview}>☀️</div>
                                            <div>
                                                <strong>Light</strong>
                                                <p>Clean and bright</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={styles.radioLabel}>
                                        <input 
                                            type="radio" 
                                            name="theme" 
                                            value="dark"
                                            checked={formData.theme === 'dark'}
                                            onChange={(e) => handleInputChange('theme', e.target.value)}
                                        />
                                        <span className={styles.radioCustom}></span>
                                        <div className={styles.themeOption}>
                                            <div className={styles.themePreview}>🌙</div>
                                            <div>
                                                <strong>Dark</strong>
                                                <p>Easy on the eyes</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="theme" value="auto" />
                                        <span className={styles.radioCustom}></span>
                                        <div className={styles.themeOption}>
                                            <div className={styles.themePreview}>🌓</div>
                                            <div>
                                                <strong>Auto</strong>
                                                <p>Match system</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Accent color</label>
                                <div className={styles.colorOptions}>
                                    {['blue', 'purple', 'green', 'orange', 'red', 'pink'].map(color => (
                                        <button
                                            key={color}
                                            className={`${styles.colorOption} ${styles[color]} ${formData.accentColor === color ? styles.selected : ''}`}
                                            onClick={() => handleInputChange('accentColor', color)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className={styles.settingsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Security</h2>
                                <p>Manage your account security and privacy settings.</p>
                            </div>

                            <div className={styles.securityItem}>
                                <div className={styles.securityInfo}>
                                    <h4>Password</h4>
                                    <p>Last changed 3 months ago</p>
                                </div>
                                <button className={styles.btnSecondary}>Change password</button>
                            </div>

                            <div className={styles.securityItem}>
                                <div className={styles.securityInfo}>
                                    <h4>Two-factor authentication</h4>
                                    <p>Add an extra layer of security to your account</p>
                                    <span className={styles.statusDisconnected}>Not enabled</span>
                                </div>
                                <button className={styles.btnPrimary}>Enable 2FA</button>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.checkboxGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            checked={formData.tokenWarnings}
                                            onChange={(e) => handleInputChange('tokenWarnings', e.target.checked)}
                                        />
                                        <span className={styles.checkboxCustom}></span>
                                        <div>
                                            <strong>Show token exit warnings</strong>
                                            <p>Warn me when leaving pages with unsaved changes</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.sessionInfo}>
                                <h4>Active sessions</h4>
                                <div className={styles.sessionItem}>
                                    <div>
                                        <strong>Current session</strong>
                                        <p>Windows • Chrome • Your current session</p>
                                        <span className={styles.sessionTime}>Last activity: 2 minutes ago</span>
                                    </div>
                                    <button className={styles.btnDanger}>Revoke</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div className={styles.settingsSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Advanced</h2>
                                <p>Advanced settings for power users.</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>App folder location</label>
                                <div className={styles.inputGroup}>
                                    <input 
                                        type="text" 
                                        className={styles.formInput}
                                        value="/TattooApp Sessions/"
                                        readOnly
                                    />
                                    <button className={styles.btnSecondary}>Change</button>
                                </div>
                                <p className={styles.formHelp}>Choose where your app data is stored</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Default session title</label>
                                <input 
                                    type="text" 
                                    className={styles.formInput}
                                    value={formData.defaultTitle}
                                    onChange={(e) => handleInputChange('defaultTitle', e.target.value)}
                                />
                            </div>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.clearCache}
                                        onChange={(e) => handleInputChange('clearCache', e.target.checked)}
                                    />
                                    <span className={styles.checkboxCustom}></span>
                                    <div>
                                        <strong>Clear session cache on exit</strong>
                                        <p>Automatically clear temporary files when closing the app</p>
                                    </div>
                                </label>
                            </div>

                            <div className={styles.dangerZone}>
                                <div className={styles.dangerHeader}>
                                    <h3>Danger Zone</h3>
                                </div>
                                <div className={styles.dangerContent}>
                                    <div className={styles.dangerItem}>
                                        <div>
                                            <strong>Delete all app files</strong>
                                            <p>Permanently delete all sessions, settings, and cached data.</p>
                                        </div>
                                        <button className={styles.btnDanger}>Delete all data</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Actions */}
                    <div className={styles.saveActions}>
                        <button type="button" className={styles.btnPrimary}>Save changes</button>
                        <button type="button" className={styles.btnSecondary}>Cancel</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
