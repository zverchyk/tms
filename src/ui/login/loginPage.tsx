'use client';
import { useState } from 'react';
import styles from './loginPage.module.scss';
import Link from 'next/link';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        // Simulate Google login process
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to main page after successful login
            window.location.href = '/main';
        }, 2000);
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate email login process
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = '/main';
        }, 1500);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🎨</span>
                        <h1 className={styles.logoText}>TattooMS</h1>
                    </div>
                    <p className={styles.subtitle}>Welcome back! Please sign in to continue.</p>
                </div>

                <div className={styles.loginForm}>
                    {/* Google Login Button */}
                    <button 
                        className={`${styles.googleButton} ${isLoading ? styles.loading : ''}`}
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <div className={styles.googleIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        </div>
                        {isLoading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <span className={styles.dividerLine}></span>
                        <span className={styles.dividerText}>or</span>
                        <span className={styles.dividerLine}></span>
                    </div>

                    {/* Email Login Form */}
                    <form onSubmit={handleEmailLogin} className={styles.emailForm}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Email</label>
                            <input 
                                type="email" 
                                className={styles.inputField}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Password</label>
                            <input 
                                type="password" 
                                className={styles.inputField}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className={styles.formOptions}>
                            <label className={styles.checkboxGroup}>
                                <input type="checkbox" className={styles.checkbox} />
                                <span className={styles.checkboxLabel}>Remember me</span>
                            </label>
                            <Link href="/forgot-password" className={styles.forgotLink}>
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className={styles.signupPrompt}>
                        <span>Don't have an account? </span>
                        <Link href="/signup" className={styles.signupLink}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}