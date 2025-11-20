import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [notification, setNotification] = useState({ show: false, message: '' })

  const showNotification = (message) => {
    setNotification({ show: true, message })
    setTimeout(() => {
      setNotification({ show: false, message: '' })
    }, 2000)
  }

  const copyToClipboard = async (text, message) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotification(message)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        showNotification(message)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
      document.body.removeChild(textArea)
    }
  }

  useEffect(() => {
    try {
      // Check if mobile device (shared for both sections)
      const checkMobile = () => window.innerWidth <= 768 || 'ontouchstart' in window
      
      // Services accordion - click to expand/collapse (works on ALL screen sizes)
      const handleServiceClick = (e) => {
        const item = e.currentTarget
        if (!item) return
        // Don't toggle if clicking on links or buttons
        if (e.target.closest('a') || e.target.closest('button')) return
        
        const isActive = item.classList.contains('active')
        const allItems = document.querySelectorAll('.service-modern')
        
        if (isActive) {
          item.classList.remove('active')
        } else {
          // Close all other items first
          allItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('active')
            }
          })
          // Then open the clicked item
          item.classList.add('active')
        }
      }
      
      // Wait for DOM
      setTimeout(() => {
        const serviceItems = document.querySelectorAll('.service-modern')
        serviceItems.forEach(item => {
          item.addEventListener('click', handleServiceClick)
        })
      }, 100)
      
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
          try {
            if (!entries || !Array.isArray(entries)) return
            entries.forEach(entry => {
              try {
                const item = entry?.target
                if (!item) return
                
                const rect = entry.boundingClientRect
                const viewportHeight = window.innerHeight
                const cardCenter = rect.top + rect.height / 2
                const viewportCenter = viewportHeight / 2
                const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
                const threshold = viewportHeight * 0.3 // 30% of viewport height from center
                
                // If card is centered in viewport (within threshold) and intersecting
                if (entry.isIntersecting && distanceFromCenter < threshold) {
                  // Close all other items first
                  if (specItems && specItems.length > 0) {
                    specItems.forEach(i => {
                      if (i && i !== item) {
                        i.classList.remove('active')
                      }
                    })
                  }
                  // Expand this card - keep it expanded even when scrolling
                  item.classList.add('active')
                }
                // Don't remove active class when card leaves viewport - let it stay expanded
                // Cards will only collapse when another card becomes active or user clicks
              } catch (err) {
                console.warn('Error in IntersectionObserver entry:', err)
              }
            })
          } catch (err) {
            console.warn('Error in IntersectionObserver:', err)
          }
        }, {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-10% 0px -10% 0px' // Focus on center 80% of viewport for better detection
        })
        
        // Observe all spec items
        if (specItems && specItems.length > 0) {
          specItems.forEach(item => {
            if (item) intersectionObserver.observe(item)
          })
        }
      }
    }
    
    // Initial setup
    setupIntersectionObserver()
    
    // Handle window resize
    let resizeTimeout
    const handleResize = () => {
      try {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          setupIntersectionObserver()
        }, 250)
      } catch (err) {
        console.warn('Error in handleResize:', err)
      }
    }
    window.addEventListener('resize', handleResize)
    
    // Click handler for desktop (and as fallback for mobile)
    if (specItems && specItems.length > 0) {
      specItems.forEach(item => {
        if (item) {
          item.addEventListener('click', (e) => {
            try {
              e.stopPropagation()
              const isActive = item.classList.contains('active')
              // Toggle active state
              if (isActive) {
                item.classList.remove('active')
              } else {
                // Close all other items
                if (specItems && specItems.length > 0) {
                  specItems.forEach(i => {
                    if (i && i !== item) {
                      i.classList.remove('active')
                    }
                  })
                }
                item.classList.add('active')
                // On mobile, scroll to center the card
                const currentIsMobile = checkMobile()
                if (currentIsMobile) {
                  setTimeout(() => {
                    if (item) item.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }, 100)
                }
              }
            } catch (err) {
              console.warn('Error in spec item click handler:', err)
            }
          })
        }
      })
    }

    // Close expanded items when clicking outside (desktop only)
    const handleOutsideClick = (e) => {
      try {
        const currentIsMobile = checkMobile()
        if (!currentIsMobile && e?.target && specItems && specItems.length > 0) {
          if (!e.target.closest('.spec-item')) {
            specItems.forEach(item => {
              if (item) item.classList.remove('active')
            })
          }
        }
      } catch (err) {
        console.warn('Error in handleOutsideClick:', err)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    
    // Cleanup
    return () => {
      try {
        if (intersectionObserver) {
          intersectionObserver.disconnect()
        }
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('click', handleOutsideClick)
      } catch (err) {
        console.warn('Error in cleanup:', err)
      }
    }
    } catch (err) {
      console.error('Error in App useEffect:', err)
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
              <a 
                href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20حجز%20استشارة%20قانونية%20" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button primary hero-cta"
              >

                احجز استشارة  
              </a>
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
                <img src="https://img.icons8.com/?size=100&id=4011&format=png&color=000000" alt="القانون الطبي والمسؤولية الطبية" className="spec-icon" />
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
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">تمثيل الموكلين أمام كافة المحاكم (العامة، التجارية، العمالية، الجزائية، الأحوال الشخصية)</div>
                  <div className="service-modern-item">التمثيل أمام اللجان شبه القضائية (لجان المصرفية، التأمين، الأوراق المالية، الضرائب)</div>
                  <div className="service-modern-item">حضور جلسات التحقيق أمام النيابة العامة ومراكز الشرطة</div>
                  <div className="service-modern-item">إعداد اللوائح الاعتراضية، مذكرات الجواب، والتماس إعادة النظر</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20الترافع%20والتمثيل%20القضائي" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/consultation.png" alt="الاستشارات والدراسات القانونية" className="service-modern-icon" />
                </div>
                <h3>الاستشارات والدراسات القانونية</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">تقديم الرأي القانوني المكتوب والشفهي في كافة المجالات</div>
                  <div className="service-modern-item">دراسات الجدوى القانونية للمشاريع الجديدة</div>
                  <div className="service-modern-item">خدمة "المستشار القانوني الخارجي" للشركات (عقود سنوية)</div>
                  <div className="service-modern-item"><strong>الحوكمة والامتثال:</strong> ضمان التزام الشركات بالأنظمة السعودية الجديدة ولوائح حوكمة الشركات</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20الاستشارات%20والدراسات%20القانونية" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/contract.png" alt="العقود والاتفاقيات" className="service-modern-icon" />
                </div>
                <h3>العقود والاتفاقيات</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">صياغة العقود التجارية (الفرنشايز، التوزيع، التوريد، الشراكة)</div>
                  <div className="service-modern-item">صياغة عقود العمل واللوائح الداخلية للمنشآت</div>
                  <div className="service-modern-item">مراجعة العقود وتدقيقها لضمان حماية حقوق الموكل وتقليل المخاطر</div>
                  <div className="service-modern-item">إدارة العقود ومتابعة تجديدها وتنفيذ بنودها</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20العقود%20والاتفاقيات" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/handshake.png" alt="التحكيم وتسوية المنازعات" className="service-modern-icon" />
                </div>
                <h3>التحكيم وتسوية المنازعات</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">الوساطة العقارية والتجارية للوصول لحلول ودية</div>
                  <div className="service-modern-item">التمثيل في قضايا التحكيم التجاري المحلي والدولي</div>
                  <div className="service-modern-item">صياغة مشارط التحكيم في العقود</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20التحكيم%20وتسوية%20المنازعات" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/company.png" alt="خدمات تأسيس ودعم الشركات" className="service-modern-icon" />
                </div>
                <h3>خدمات تأسيس ودعم الشركات</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item"><strong>تأسيس الشركات:</strong> (مساهمة، محدودة، تضامنية) وإصدار السجلات التجارية</div>
                  <div className="service-modern-item"><strong>الاستثمار الأجنبي:</strong> استخراج تراخيص وزارة الاستثمار (MISA) وتأسيس شركات المستثمر الأجنبي</div>
                  <div className="service-modern-item"><strong>الاندماج والاستحواذ:</strong> الفحص النافي للجهالة (Due Diligence)، وعقود الاستحواذ</div>
                  <div className="service-modern-item"><strong>تسجيل العلامات التجارية:</strong> والنماذج الصناعية لدى الهيئة السعودية للملكية الفكرية</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20تأسيس%20ودعم%20الشركات" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/document.png" alt="خدمات التوثيق" className="service-modern-icon" />
                </div>
                <h3>خدمات التوثيق</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item"><strong>العقارات:</strong> إفراغ الصكوك العقارية، توثيق الرهن وفكه</div>
                  <div className="service-modern-item"><strong>الشركات:</strong> توثيق عقود التأسيس وقرارات الشركاء وملاحق التعديل</div>
                  <div className="service-modern-item"><strong>الوكالات:</strong> إصدار وفسخ الوكالات للأفراد والشركات</div>
                  <div className="service-modern-item"><strong>الإقرارات:</strong> توثيق الإقرارات بالديون المالية وسدادها</div>
                  <div className="service-modern-item"><strong>الأحوال الشخصية:</strong> توثيق عقود الزواج والطلاق والخلع والرجعة (للمرخصين)</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20التوثيق" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/money-bag.png" alt="خدمات التنفيذ والتحصيل" className="service-modern-icon" />
                </div>
                <h3>خدمات التنفيذ والتحصيل</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt="expand" className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  <div className="service-modern-item">تنفيذ الأحكام القضائية المحلية والأجنبية وأحكام المحكمين</div>
                  <div className="service-modern-item">تنفيذ الأوراق التجارية (الشيكات، السندات لأمر، الكمبيالات) عبر محكمة التنفيذ</div>
                  <div className="service-modern-item">متابعة إجراءات الحجز على الأموال والمنع من السفر والإفصاح عن الأصول</div>
                  <div className="service-modern-item">تحصيل الديون المتعثرة للشركات والأفراد (تسوية أو قضاءً)</div>
                  <a href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدمة%20التنفيذ%20والتحصيل" target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    اسألنا عن هذا
                  </a>
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
            <p className="section-description">تواصل معنا اليوم واحصل على استشارة قانونية  </p>
          </div>
          
          <div className="contact-container">
            {/* Contact Info Cards */}
            <div className="contact-info-section">
              <div className="contact-card" onClick={() => copyToClipboard('0558508881', 'تم نسخ رقم الهاتف')} style={{ cursor: 'pointer' }}>
                <div className="contact-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/1a4d3a/phone.png" alt="الهاتف" className="contact-icon" />
                </div>
                <h3>الهاتف</h3>
                <p><span dir="ltr">055 8508 881</span></p>
              </div>
              
              <div className="contact-card" onClick={() => copyToClipboard('info@alhisonylaw.com', 'تم نسخ البريد الإلكتروني')} style={{ cursor: 'pointer' }}>
                <div className="contact-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/1a4d3a/email.png" alt="البريد الإلكتروني" className="contact-icon" />
                </div>
                <h3>البريد الإلكتروني</h3>
                <p>info@alhisonylaw.com</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/1a4d3a/marker.png" alt="الموقع" className="contact-icon" />
                </div>
                <h3>الموقع</h3>
                <p>الرياض | القصيم  المملكة العربية السعودية</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="contact-actions">
              <a 
                href="https://wa.me/966558508881?text=السلام%20عليكم،%20أرغب%20في%20الاستفسار%20عن%20خدماتكم%20القانونية" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-button whatsapp-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                تواصل عبر واتساب
              </a>
              
              <a 
                href="mailto:info@alhisonylaw.com?subject=استفسار%20عن%20الخدمات%20القانونية" 
                className="contact-button email-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                أرسل بريد إلكتروني
              </a>
            </div>
            
            {/* Google Maps */}
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3575.4562870555224!2d43.97568868496715!3d26.34409998337582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDIwJzM4LjgiTiA0M8KwNTgnMjQuNiJF!5e0!3m2!1sar!2ssa!4v1763621775099!5m2!1sar!2ssa" 
                width="100%" 
                height="450" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع المكتب"
              ></iframe>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
            <h3 className="footer-title">شركة صالح الحيسوني للمحاماة</h3>
            <div className="footer-info">
              <p className="footer-phone">الهاتف: <span dir="ltr">055 8508 881</span></p>
              <p className="footer-email">البريد الإلكتروني: <span dir="ltr">info@alhisonylaw.com</span></p>
              <p className="footer-copyright">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة</p>
            </div>
          </div>
      </footer>

      {/* Notification Toast */}
      {notification.show && (
        <div className="notification-toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}

export default App

