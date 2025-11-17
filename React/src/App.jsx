import './App.css'

function App() {
  return (
    <div className="app" dir="rtl">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <div className="logo-wrapper">
              <svg className="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* Scales of Justice */}
                <g transform="translate(100, 100)">
                  {/* Base */}
                  <rect x="-15" y="60" width="30" height="8" fill="#8B6914" rx="2"/>
                  {/* Left Scale */}
                  <ellipse cx="-40" cy="50" rx="25" ry="8" fill="#D4AF37" stroke="#8B6914" strokeWidth="2"/>
                  <line x1="-40" y1="50" x2="-40" y2="68" stroke="#8B6914" strokeWidth="3"/>
                  {/* Right Scale */}
                  <ellipse cx="40" cy="50" rx="25" ry="8" fill="#D4AF37" stroke="#8B6914" strokeWidth="2"/>
                  <line x1="40" y1="50" x2="40" y2="68" stroke="#8B6914" strokeWidth="3"/>
                  {/* Center Column */}
                  <line x1="0" y1="-50" x2="0" y2="60" stroke="#8B6914" strokeWidth="4"/>
                  {/* Top Triangle */}
                  <path d="M 0 -50 L -15 -30 L 15 -30 Z" fill="#D4AF37" stroke="#8B6914" strokeWidth="2"/>
                </g>
              </svg>
            </div>
            <h1 className="company-name">مكتب صالح الحيسوني للمحاماة</h1>
          </div>
          <nav className="nav">
            <a href="#home">الرئيسية</a>
            <a href="#services">الخدمات</a>
            <a href="#about">من نحن</a>
            <a href="#contact">اتصل بنا</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">مكتب قانوني معتمد</div>
            <h2 className="hero-title">
              <span className="title-highlight">العدالة</span> والتميز في الخدمة القانونية
            </h2>
            <p className="hero-subtitle">نقدم خدمات قانونية متميزة في المملكة العربية السعودية</p>
            <p className="hero-description">
              نحن فريق من المحامين المتمرسين ملتزمون بتقديم أفضل الخدمات القانونية 
              والاستشارات القانونية لعملائنا الكرام في مختلف المجالات القانونية
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary">احجز استشارة مجانية</button>
              <button className="cta-button secondary">اعرف المزيد</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">+500</div>
              <div className="stat-label">قضية منجزة</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">سنة خبرة</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">رضا العملاء</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">خدماتنا</span>
            <h2 className="section-title">نقدم حلولاً قانونية شاملة</h2>
            <p className="section-description">نوفر مجموعة واسعة من الخدمات القانونية لتلبية جميع احتياجاتك</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">⚖️</div>
              </div>
              <h3>القضايا المدنية</h3>
              <p>نقوم بتمثيل عملائنا في القضايا المدنية والتجارية بكفاءة عالية واحترافية</p>
              <a href="#" className="service-link">اعرف المزيد →</a>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">📋</div>
              </div>
              <h3>الاستشارات القانونية</h3>
              <p>نوفر استشارات قانونية شاملة في مختلف المجالات القانونية</p>
              <a href="#" className="service-link">اعرف المزيد →</a>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">📄</div>
              </div>
              <h3>صياغة العقود</h3>
              <p>نقوم بصياغة ومراجعة العقود والاتفاقيات باحترافية عالية</p>
              <a href="#" className="service-link">اعرف المزيد →</a>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">🏢</div>
              </div>
              <h3>القانون التجاري</h3>
              <p>خدمات قانونية متخصصة للشركات والمؤسسات التجارية</p>
              <a href="#" className="service-link">اعرف المزيد →</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-badge">من نحن</span>
              <h2 className="section-title">مكتب قانوني رائد في المملكة</h2>
              <p>
                مكتب صالح الحيسوني للمحاماة هو مكتب قانوني رائد في المملكة العربية السعودية، 
                يتمتع بخبرة واسعة في مختلف المجالات القانونية. نحن ملتزمون بتقديم خدمات قانونية 
                عالية الجودة تتماشى مع أفضل المعايير المهنية.
              </p>
              <p>
                فريقنا من المحامين المتمرسين يعمل بجد لضمان حماية حقوق عملائنا وتحقيق أفضل النتائج 
                في قضاياهم. نؤمن بالشفافية والالتزام والتميز في كل ما نقدمه.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>خبرة واسعة في القانون السعودي</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>فريق محترف ومتمرس</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>خدمة عملاء متميزة</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="visual-card">
                <div className="visual-icon">⚖️</div>
                <h3>العدالة أولاً</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">اتصل بنا</span>
            <h2 className="section-title">نحن هنا لمساعدتك</h2>
            <p className="section-description">تواصل معنا اليوم واحصل على استشارة قانونية مجانية</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>الهاتف</h3>
              <p>+966 XX XXX XXXX</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>البريد الإلكتروني</h3>
              <p>info@alhisonylaw.com</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>العنوان</h3>
              <p>المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <svg className="logo-small" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(100, 100)">
                  <rect x="-15" y="60" width="30" height="8" fill="#D4AF37" rx="2"/>
                  <ellipse cx="-40" cy="50" rx="25" ry="8" fill="#D4AF37" stroke="#8B6914" strokeWidth="2"/>
                  <line x1="-40" y1="50" x2="-40" y2="68" stroke="#8B6914" strokeWidth="3"/>
                  <ellipse cx="40" cy="50" rx="25" ry="8" fill="#D4AF37" stroke="#8B6914" strokeWidth="2"/>
                  <line x1="40" y1="50" x2="40" y2="68" stroke="#8B6914" strokeWidth="3"/>
                  <line x1="0" y1="-50" x2="0" y2="60" stroke="#8B6914" strokeWidth="4"/>
                  <path d="M 0 -50 L -15 -30 L 15 -30 Z" fill="#D4AF37" stroke="#8B6914" strokeWidth="2"/>
                </g>
              </svg>
              <h3>مكتب صالح الحيسوني للمحاماة</h3>
            </div>
            <p className="footer-copyright">&copy; 2024 جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

