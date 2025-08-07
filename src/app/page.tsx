import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.landingPage}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎨</span>
            <span className={styles.logoText}>TattooMS</span>
          </div>
          <div className={styles.navLinks}>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/login" className={styles.signupBtn}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Streamline Your Tattoo Business
              <span className={styles.heroAccent}>Like Never Before</span>
            </h1>
            <p className={styles.heroSubtitle}>
              The complete management system designed specifically for tattoo artists. 
              Track sessions, manage equipment, handle client communications, and grow your business - all in one place.
            </p>
            <div className={styles.heroCTA}>
              <Link href="/login" className={styles.primaryBtn}>
                Start Free Trial
              </Link>
              <Link href="#features" className={styles.secondaryBtn}>
                Learn More
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.mockupContainer}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen}>
                  <div className={styles.appPreview}>
                    <div className={styles.previewHeader}>
                      <div className={styles.previewDot}></div>
                      <div className={styles.previewDot}></div>
                      <div className={styles.previewDot}></div>
                    </div>
                    <div className={styles.previewContent}>
                      <div className={styles.previewCard}>
                        <div className={styles.cardIcon}>📅</div>
                        <div className={styles.cardText}>Session Today</div>
                      </div>
                      <div className={styles.previewCard}>
                        <div className={styles.cardIcon}>💬</div>
                        <div className={styles.cardText}>3 New Messages</div>
                      </div>
                      <div className={styles.previewCard}>
                        <div className={styles.cardIcon}>⚡</div>
                        <div className={styles.cardText}>Equipment Check</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Everything You Need to Manage Your Art</h2>
            <p className={styles.sectionSubtitle}>
              Focus on creating amazing tattoos while we handle the business side
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📋</div>
              <h3 className={styles.featureTitle}>Session Management</h3>
              <p className={styles.featureDescription}>
                Schedule, track, and manage all your tattoo sessions with detailed client information and progress notes.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3 className={styles.featureTitle}>Client Communication</h3>
              <p className={styles.featureDescription}>
                Built-in messaging system to communicate with clients, share updates, and manage appointments seamlessly.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Equipment Tracking</h3>
              <p className={styles.featureDescription}>
                Monitor your tattoo supplies, track usage, manage inventory, and never run out of essential equipment.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3 className={styles.featureTitle}>Financial Overview</h3>
              <p className={styles.featureDescription}>
                Track earnings, analyze performance, and get insights into your business growth with detailed reports.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⭐</div>
              <h3 className={styles.featureTitle}>Feedback System</h3>
              <p className={styles.featureDescription}>
                Collect client feedback, track satisfaction, and continuously improve your services and techniques.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Mobile Optimized</h3>
              <p className={styles.featureDescription}>
                Access your business on the go with our fully responsive design that works perfectly on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <div className={styles.benefitsContent}>
            <h2 className={styles.benefitsTitle}>
              Why Tattoo Artists Choose TattooMS
            </h2>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✅</div>
                <div className={styles.benefitText}>
                  <strong>Save 10+ Hours Per Week</strong> - Automate administrative tasks and focus on your art
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✅</div>
                <div className={styles.benefitText}>
                  <strong>Increase Client Satisfaction</strong> - Better communication and professional service
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✅</div>
                <div className={styles.benefitText}>
                  <strong>Boost Your Revenue</strong> - Efficient scheduling and better business insights
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✅</div>
                <div className={styles.benefitText}>
                  <strong>Professional Image</strong> - Impress clients with organized, modern management
                </div>
              </div>
            </div>
          </div>
          <div className={styles.benefitsStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Active Artists</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>10k+</div>
              <div className={styles.statLabel}>Sessions Managed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Tattoo Business?</h2>
          <p className={styles.ctaSubtitle}>
            Join hundreds of artists who are already streamlining their workflow and growing their business with TattooMS
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/login" className={styles.ctaPrimary}>
              Start Your Free Trial
            </Link>
            <Link href="/main" className={styles.ctaSecondary}>
              View Demo
            </Link>
          </div>
          <p className={styles.ctaNote}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <span className={styles.logoIcon}>🎨</span>
              <span className={styles.logoText}>TattooMS</span>
            </div>
            <p className={styles.footerText}>
              Empowering tattoo artists with professional management tools.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/login" className={styles.footerLink}>Login</Link>
            <Link href="/main" className={styles.footerLink}>Demo</Link>
            <a href="mailto:support@tattooms.com" className={styles.footerLink}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
