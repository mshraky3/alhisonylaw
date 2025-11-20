import './App.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Check if mobile device (shared for both sections)
    const checkMobile = () => window.innerWidth <= 768 || 'ontouchstart' in window
    let isMobile = checkMobile()
    
    // Services accordion functionality
    const serviceItems = document.querySelectorAll('.service-modern')
    
    // Intersection Observer for services auto-expand on mobile when centered
    let servicesObserver = null
    
    const setupServicesObserver = () => {
      // Cleanup existing observer
      if (servicesObserver) {
        servicesObserver.disconnect()
        servicesObserver = null
      }
      
      const currentIsMobile = checkMobile()
      
      if (currentIsMobile) {
        servicesObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const item = entry.target
            const rect = entry.boundingClientRect
            const viewportHeight = window.innerHeight
            const cardCenter = rect.top + rect.height / 2
            const viewportCenter = viewportHeight / 2
            const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
            const threshold = viewportHeight * 0.25 // 25% of viewport height from center
            
            // If card is centered in viewport (within threshold)
            if (entry.isIntersecting && distanceFromCenter < threshold) {
              // Close all other items
              serviceItems.forEach(i => {
                if (i !== item) {
                  i.classList.remove('active')
                }
              })
              // Expand this card
              item.classList.add('active')
            }
          })
        }, {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-15% 0px -15% 0px' // Focus on center 70% of viewport
        })
        
        // Observe all service items
        serviceItems.forEach(item => {
          servicesObserver.observe(item)
        })
      }
    }
    
    // Initial setup
    setupServicesObserver()
    
    // Handle window resize for services
    let servicesResizeTimeout
    const handleServicesResize = () => {
      clearTimeout(servicesResizeTimeout)
      servicesResizeTimeout = setTimeout(() => {
        setupServicesObserver()
      }, 250)
    }
    window.addEventListener('resize', handleServicesResize)
    
    // Click handler for services (desktop and mobile fallback)
    serviceItems.forEach(item => {
      const header = item.querySelector('.service-modern-header')
      if (header) {
        header.addEventListener('click', (e) => {
          e.stopPropagation()
          const isActive = item.classList.contains('active')
          // Toggle active state
          if (isActive) {
            item.classList.remove('active')
          } else {
            // Close all other items
            serviceItems.forEach(i => {
              if (i !== item) {
                i.classList.remove('active')
              }
            })
            item.classList.add('active')
            // On mobile, scroll to center the card
            const currentIsMobile = checkMobile()
            if (currentIsMobile) {
              setTimeout(() => {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 100)
            }
          }
        })
      }
    })
    
    // Close expanded services when clicking outside (desktop only)
    const handleServicesOutsideClick = (e) => {
      const currentIsMobile = checkMobile()
      if (!currentIsMobile && !e.target.closest('.service-modern')) {
        serviceItems.forEach(item => item.classList.remove('active'))
      }
    }
    document.addEventListener('click', handleServicesOutsideClick)
    
    // Specializations functionality
    const specItems = document.querySelectorAll('.spec-item')
    
    // Intersection Observer for auto-expand on mobile when card is centered
    let intersectionObserver = null
    
    const setupIntersectionObserver = () => {
      // Cleanup existing observer
      if (intersectionObserver) {
        intersectionObserver.disconnect()
        intersectionObserver = null
      }
      
      const currentIsMobile = checkMobile()
      
      if (currentIsMobile) {
        intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const item = entry.target
            const rect = entry.boundingClientRect
            const viewportHeight = window.innerHeight
            const cardCenter = rect.top + rect.height / 2
            const viewportCenter = viewportHeight / 2
            const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
            const threshold = viewportHeight * 0.25 // 25% of viewport height from center
            
            // If card is centered in viewport (within threshold)
            if (entry.isIntersecting && distanceFromCenter < threshold) {
              // Close all other items
              specItems.forEach(i => {
                if (i !== item) {
                  i.classList.remove('active')
                }
              })
              // Expand this card
              item.classList.add('active')
            }
          })
        }, {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-15% 0px -15% 0px' // Focus on center 70% of viewport
        })
        
        // Observe all spec items
        specItems.forEach(item => {
          intersectionObserver.observe(item)
        })
      }
    }
    
    // Initial setup
    setupIntersectionObserver()
    
    // Handle window resize
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setupIntersectionObserver()
      }, 250)
    }
    window.addEventListener('resize', handleResize)
    
    // Click handler for desktop (and as fallback for mobile)
    specItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        const isActive = item.classList.contains('active')
        // Toggle active state
        if (isActive) {
          item.classList.remove('active')
        } else {
          // Close all other items
          specItems.forEach(i => {
            if (i !== item) {
              i.classList.remove('active')
            }
          })
          item.classList.add('active')
          // On mobile, scroll to center the card
          const currentIsMobile = checkMobile()
          if (currentIsMobile) {
            setTimeout(() => {
              item.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 100)
          }
        }
      })
    })

    // Close expanded items when clicking outside (desktop only)
    const handleOutsideClick = (e) => {
      const currentIsMobile = checkMobile()
      if (!currentIsMobile && !e.target.closest('.spec-item')) {
        specItems.forEach(item => item.classList.remove('active'))
      }
    }
    document.addEventListener('click', handleOutsideClick)
    
    // Cleanup
    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
      if (servicesObserver) {
        servicesObserver.disconnect()
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', handleServicesResize)
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('click', handleServicesOutsideClick)
    }
  }, [])

  return (
    <div className="app" dir="rtl">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img src="/logo_without_bg.png" alt="شركة صالح الحيسوني للمحاماة" className="logo" />
            <h1 className="company-name">شركة صالح الحيسوني للمحاماة</h1>
          </div>
          <nav className="nav">
            <a href="#home">الرئيسية</a>
            <a href="#specializations">التخصصات</a>
            <a href="#services">الخدمات</a>
            <a href="#about">من نحن</a>
            <a href="#contact">اتصل بنا</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-content">
            <div className="hero-badge">شركة قانونية معتمدة</div>
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
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">+500</div>
                <div className="stat-label">قضية منجزة</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">10</div>
                <div className="stat-label">سنة خبرة</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">جميع</div>
                <div className="stat-label">أنواع القضايا</div>
              </div>
            </div>
          </div>
      </section>

      {/* Specializations Section */}
      <section id="specializations" className="specializations-modern">
        <div className="section-header">
            <span className="section-badge">قطاعات التخصص</span>
            <h2 className="section-title">مجالات الممارسة القانونية</h2>
            <p className="section-description">نختص في مختلف المجالات القانونية لتلبية احتياجاتك</p>
          </div>
          <div className="specializations-masonry">
            <div className="spec-item" data-category="personal">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=qEK2pqenBa22&format=png&color=000000" alt="الأفراد والأحوال الشخصية" className="spec-icon" />
                <div className="spec-number">01</div>
              </div>
              <div className="spec-content">
                <h3>الأفراد والأحوال الشخصية</h3>
                <div className="spec-preview">قضايا الأحوال الشخصية والمدنية</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>قضايا الأحوال الشخصية:</strong> الطلاق، الخلع، فسخ النكاح، الحضانة والزيارة، النفقات، وتقسيم الميراث.</div>
                  <div className="spec-detail-item"><strong>القضايا المدنية والحقوقية:</strong> المطالبات المالية، التعويضات عن الأضرار، ونزاعات الأراضي.</div>
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="criminal">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/ios-filled/100/000000/scales.png" alt="القضايا الجنائية" className="spec-icon" />
                <div className="spec-number">02</div>
              </div>
              <div className="spec-content">
                <h3>القضايا الجنائية</h3>
                <div className="spec-preview">الدفاع في مختلف أنواع الجرائم</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>الجرائم المعلوماتية والإلكترونية:</strong> الاحتيال الإلكتروني، الابتزاز الإلكتروني، اختراق الأنظمة، والتشهير الإلكتروني.</div>
                  <div className="spec-detail-item"><strong>جرائم الاعتداء:</strong> قضايا الاعتداء البدني، الاعتداء على النفس، التهديد، والتحرش.</div>
                  <div className="spec-detail-item"><strong>جرائم الأموال:</strong> السرقة، النصب والاحتيال، خيانة الأمانة، والاختلاس.</div>
                  <div className="spec-detail-item"><strong>جرائم المخدرات:</strong> الدفاع في قضايا الاتجار والحيازة والاستخدام.</div>
                  <div className="spec-detail-item"><strong>جرائم الفساد المالي:</strong> الرشوة، غسيل الأموال، التهرب الضريبي، والاستغلال الوظيفي.</div>
                  <div className="spec-detail-item"><strong>جرائم الأمن:</strong> قضايا الأمن الوطني، الإرهاب، والتحريض على الفتنة.</div>
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="business">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=fNBnDhvTtPhD&format=png&color=000000" alt="قطاع الأعمال والشركات" className="spec-icon" />
                <div className="spec-number">03</div>
              </div>
              <div className="spec-content">
                <h3>قطاع الأعمال والشركات</h3>
                <div className="spec-preview">القضايا التجارية والمالية</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>القضايا التجارية:</strong> المنازعات بين الشركاء، قضايا الإفلاس والتصفية، الأوراق التجارية، والمنافسة غير المشروعة.</div>
                  <div className="spec-detail-item"><strong>القضايا المالية والمصرفية:</strong> المنازعات مع البنوك وشركات التمويل، منازعات الأسهم والسوق المالية.</div>
                  <div className="spec-detail-item"><strong>القضايا العمالية:</strong> صياغة لوائح تنظيم العمل، المنازعات العمالية (فصل تعسفي، أجور، مكافأة نهاية الخدمة).</div>
                  <div className="spec-detail-item"><strong>الملكية الفكرية:</strong> حماية العلامات التجارية، براءات الاختراع، حقوق المؤلف والنشر، والأسرار التجارية.</div>
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="real-estate">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=49636&format=png&color=000000" alt="العقارات والمقاولات" className="spec-icon" />
                <div className="spec-number">04</div>
              </div>
              <div className="spec-content">
                <h3>العقارات والمقاولات</h3>
                <div className="spec-preview">نزاعات العقارات والإنشاءات</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>القضايا العقارية:</strong> نزاعات الملكية، دعاوى الإخلاء، منازعات الإيجار، والمساهمات العقارية.</div>
                  <div className="spec-detail-item"><strong>قضايا المقاولات والإنشاءات:</strong> النزاعات الفنية والهندسية، عقود "فيديك"، ومنازعات المطورين العقاريين.</div>
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="administrative">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=17855&format=png&color=000000" alt="القضاء الإداري والحكومي" className="spec-icon" />
                <div className="spec-number">05</div>
              </div>
              <div className="spec-content">
                <h3>القضاء الإداري والحكومي</h3>
                <div className="spec-preview">الترافع أمام الديوان واللجان</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>القضايا الإدارية:</strong> الترافع أمام ديوان المظالم، إلغاء القرارات الإدارية، والتعويض من الجهات الحكومية.</div>
                  <div className="spec-detail-item"><strong>الزكاة والضريبة:</strong> الاعتراضات أمام لجان الزكاة والضريبة والجمارك.</div>
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="insurance">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=hwWsopzNm7N2&format=png&color=000000" alt="قضايا التأمين" className="spec-icon" />
                <div className="spec-number">06</div>
              </div>
              <div className="spec-content">
                <h3>قضايا التأمين</h3>
                <div className="spec-preview">منازعات التأمين والمطالبات</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>منازعات التأمين:</strong> المنازعات مع شركات التأمين (تأمين طبي، تأمين مركبات، تأمين أضرار، تأمين حياة).</div>
                  <div className="spec-detail-item"><strong>المطالبات التأمينية:</strong> متابعة مطالبات التأمين ورفض المطالبات غير المبررة.</div>
                  <div className="spec-detail-item"><strong>التأمين التجاري:</strong> منازعات التأمين على الممتلكات والمسؤولية المدنية للشركات.</div>
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="medical">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/ios-filled/100/1a4d3a/hospital.png" alt="القانون الطبي والمسؤولية الطبية" className="spec-icon" />
                <div className="spec-number">07</div>
              </div>
              <div className="spec-content">
                <h3>القانون الطبي والمسؤولية الطبية</h3>
                <div className="spec-preview">قضايا الأخطاء الطبية وحقوق المرضى</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>قضايا الأخطاء الطبية:</strong> الدفاع عن الأطباء والمراكز الطبية في قضايا الأخطاء الطبية.</div>
                  <div className="spec-detail-item"><strong>حقوق المرضى:</strong> تمثيل المرضى في قضايا التعويض عن الأضرار الطبية.</div>
                  <div className="spec-detail-item"><strong>التراخيص الطبية:</strong> استخراج التراخيص الطبية والاعتراض على قرارات الهيئة السعودية للتخصصات الصحية.</div>
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="consumer">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=02L7uHUVDizl&format=png&color=000000" alt="قضايا المستهلك وحماية المستهلك" className="spec-icon" />
                <div className="spec-number">08</div>
              </div>
              <div className="spec-content">
                <h3>قضايا المستهلك وحماية المستهلك</h3>
                <div className="spec-preview">حماية حقوق المستهلكين</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>منازعات المستهلكين:</strong> تمثيل المستهلكين في منازعاتهم مع التجار والشركات.</div>
                  <div className="spec-detail-item"><strong>قضايا الجودة والضمان:</strong> المطالبة بحقوق الضمان وضمان الجودة للمنتجات والخدمات.</div>
                  <div className="spec-detail-item"><strong>الإعلانات المضللة:</strong> قضايا الإعلانات الكاذبة والممارسات التجارية غير العادلة.</div>
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="cyber">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/ios-filled/100/1a4d3a/lock.png" alt="الأمن السيبراني وحماية البيانات" className="spec-icon" />
                <div className="spec-number">09</div>
              </div>
              <div className="spec-content">
                <h3>الأمن السيبراني وحماية البيانات</h3>
                <div className="spec-preview">الجرائم الإلكترونية وحماية البيانات</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>قضايا الجرائم الإلكترونية:</strong> الدفاع في قضايا الجرائم المعلوماتية والاحتيال الإلكتروني.</div>
                  <div className="spec-detail-item"><strong>حماية البيانات:</strong> الامتثال لنظام حماية البيانات الشخصية والخصوصية.</div>
                  <div className="spec-detail-item"><strong>الابتزاز الإلكتروني:</strong> معالجة قضايا الابتزاز والتهديد الإلكتروني.</div>
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="transport">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=JhJh1oz0GRY9&format=png&color=000000" alt="قضايا النقل والمواصلات" className="spec-icon" />
                <div className="spec-number">10</div>
              </div>
              <div className="spec-content">
                <h3>قضايا النقل والمواصلات</h3>
                <div className="spec-preview">حوادث المركبات والنقل</div>
                <div className="spec-details">
                  <div className="spec-detail-item"><strong>حوادث المركبات:</strong> قضايا الحوادث المرورية والتعويضات.</div>
                  <div className="spec-detail-item"><strong>النقل الجوي:</strong> منازعات شركات الطيران والركاب.</div>
                  <div className="spec-detail-item"><strong>النقل البحري:</strong> قضايا الشحن البحري والمنازعات التجارية البحرية.</div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Legal Services Section */}
      <section id="services" className="services-modern">
        <div className="section-header">
            <span className="section-badge">الخدمات القانونية</span>
            <h2 className="section-title">طبيعة العمل والخدمات المقدمة</h2>
            <p className="section-description">نقدم خدمات قانونية متكاملة بأساليب احترافية</p>
          </div>
          <div className="services-showcase">
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/scales.png" alt="الترافع والتمثيل القضائي" className="service-modern-icon" />
                </div>
                <h3>الترافع والتمثيل القضائي</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">تمثيل الموكلين أمام كافة المحاكم (العامة، التجارية، العمالية، الجزائية، الأحوال الشخصية)</div>
                  <div className="service-modern-item">التمثيل أمام اللجان شبه القضائية (لجان المصرفية، التأمين، الأوراق المالية، الضرائب)</div>
                  <div className="service-modern-item">حضور جلسات التحقيق أمام النيابة العامة ومراكز الشرطة</div>
                  <div className="service-modern-item">إعداد اللوائح الاعتراضية، مذكرات الجواب، والتماس إعادة النظر</div>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/consultation.png" alt="الاستشارات والدراسات القانونية" className="service-modern-icon" />
                </div>
                <h3>الاستشارات والدراسات القانونية</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">تقديم الرأي القانوني المكتوب والشفهي في كافة المجالات</div>
                  <div className="service-modern-item">دراسات الجدوى القانونية للمشاريع الجديدة</div>
                  <div className="service-modern-item">خدمة "المستشار القانوني الخارجي" للشركات (عقود سنوية)</div>
                  <div className="service-modern-item"><strong>الحوكمة والامتثال:</strong> ضمان التزام الشركات بالأنظمة السعودية الجديدة ولوائح حوكمة الشركات</div>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/contract.png" alt="العقود والاتفاقيات" className="service-modern-icon" />
                </div>
                <h3>العقود والاتفاقيات</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">صياغة العقود التجارية (الفرنشايز، التوزيع، التوريد، الشراكة)</div>
                  <div className="service-modern-item">صياغة عقود العمل واللوائح الداخلية للمنشآت</div>
                  <div className="service-modern-item">مراجعة العقود وتدقيقها لضمان حماية حقوق الموكل وتقليل المخاطر</div>
                  <div className="service-modern-item">إدارة العقود ومتابعة تجديدها وتنفيذ بنودها</div>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/handshake.png" alt="التحكيم وتسوية المنازعات" className="service-modern-icon" />
                </div>
                <h3>التحكيم وتسوية المنازعات</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">الوساطة العقارية والتجارية للوصول لحلول ودية</div>
                  <div className="service-modern-item">التمثيل في قضايا التحكيم التجاري المحلي والدولي</div>
                  <div className="service-modern-item">صياغة مشارط التحكيم في العقود</div>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/company.png" alt="خدمات تأسيس ودعم الشركات" className="service-modern-icon" />
                </div>
                <h3>خدمات تأسيس ودعم الشركات</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item"><strong>تأسيس الشركات:</strong> (مساهمة، محدودة، تضامنية) وإصدار السجلات التجارية</div>
                  <div className="service-modern-item"><strong>الاستثمار الأجنبي:</strong> استخراج تراخيص وزارة الاستثمار (MISA) وتأسيس شركات المستثمر الأجنبي</div>
                  <div className="service-modern-item"><strong>الاندماج والاستحواذ:</strong> الفحص النافي للجهالة (Due Diligence)، وعقود الاستحواذ</div>
                  <div className="service-modern-item"><strong>تسجيل العلامات التجارية:</strong> والنماذج الصناعية لدى الهيئة السعودية للملكية الفكرية</div>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/document.png" alt="خدمات التوثيق" className="service-modern-icon" />
                </div>
                <h3>خدمات التوثيق</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item"><strong>العقارات:</strong> إفراغ الصكوك العقارية، توثيق الرهن وفكه</div>
                  <div className="service-modern-item"><strong>الشركات:</strong> توثيق عقود التأسيس وقرارات الشركاء وملاحق التعديل</div>
                  <div className="service-modern-item"><strong>الوكالات:</strong> إصدار وفسخ الوكالات للأفراد والشركات</div>
                  <div className="service-modern-item"><strong>الإقرارات:</strong> توثيق الإقرارات بالديون المالية وسدادها</div>
                  <div className="service-modern-item"><strong>الأحوال الشخصية:</strong> توثيق عقود الزواج والطلاق والخلع والرجعة (للمرخصين)</div>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/money-bag.png" alt="خدمات التنفيذ والتحصيل" className="service-modern-icon" />
                </div>
                <h3>خدمات التنفيذ والتحصيل</h3>
                <span className="service-toggle">+</span>
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">تنفيذ الأحكام القضائية المحلية والأجنبية وأحكام المحكمين</div>
                  <div className="service-modern-item">تنفيذ الأوراق التجارية (الشيكات، السندات لأمر، الكمبيالات) عبر محكمة التنفيذ</div>
                  <div className="service-modern-item">متابعة إجراءات الحجز على الأموال والمنع من السفر والإفصاح عن الأصول</div>
                  <div className="service-modern-item">تحصيل الديون المتعثرة للشركات والأفراد (تسوية أو قضاءً)</div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
            <div className="about-text">
              <span className="section-badge">من نحن</span>
              <h2 className="section-title">شركة قانونية رائدة في المملكة</h2>
              <p>
                شركة صالح الحيسوني للمحاماة هي شركة قانونية رائدة في المملكة العربية السعودية، 
                يتمتع بخبرة تزيد عن 10 سنوات في مختلف المجالات القانونية. نحن ملتزمون بتقديم خدمات قانونية 
                عالية الجودة تتماشى مع أفضل المعايير المهنية.
              </p>
              <p>
                فريقنا من المحامين المتمرسين يعمل بجد لضمان حماية حقوق عملائنا وتحقيق أفضل النتائج 
                في قضاياهم. نؤمن بالشفافية والالتزام والتميز في كل ما نقدمه.
              </p>
              <p>
                <strong>نخدم عملائنا من مكتبين استراتيجيين:</strong> مكتبنا في الرياض ومكتبنا في القصيم، 
                مما يمكننا من تقديم خدماتنا القانونية في مختلف أنحاء المملكة بكفاءة عالية.
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
                <img src="/logo_without_bg.png" alt="العدالة" className="visual-icon" />
                <h3>العدالة أولاً</h3>
              </div>
            </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-header">
            <span className="section-badge">اتصل بنا</span>
            <h2 className="section-title">نحن هنا لمساعدتك</h2>
            <p className="section-description">تواصل معنا اليوم واحصل على استشارة قانونية مجانية</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <img src="https://img.icons8.com/ios-filled/100/1a4d3a/phone.png" alt="الهاتف" className="contact-icon" />
              <h3>مكتب الرياض</h3>
              <p>الرياض، المملكة العربية السعودية</p>
            </div>
            <div className="contact-card">
              <img src="https://img.icons8.com/ios-filled/100/1a4d3a/marker.png" alt="الموقع" className="contact-icon" />
              <h3>مكتب القصيم</h3>
              <p>القصيم، المملكة العربية السعودية</p>
            </div>
            <div className="contact-card">
              <img src="https://img.icons8.com/ios-filled/100/1a4d3a/email.png" alt="البريد الإلكتروني" className="contact-icon" />
              <h3>البريد الإلكتروني</h3>
              <p>info@alhisonylaw.com</p>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
            <h3 className="footer-title">شركة صالح الحيسوني للمحاماة</h3>
            <p className="footer-copyright">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة</p>
          </div>
      </footer>
    </div>
  )
}

export default App

