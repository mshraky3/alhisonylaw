import './App.css'
import { useEffect, useState } from 'react'
import { translations } from './translations'

function App() {
  const [notification, setNotification] = useState({ show: false, message: '' })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState('ar') // Default is Arabic
  
  const t = translations[language]

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
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ar' ? 'en' : 'ar')
  }

  // Update document title and meta tags based on language
  useEffect(() => {
    document.title = language === 'ar' 
      ? 'شركة صالح الحيسوني للمحاماة | خدمات قانونية متميزة في السعودية'
      : 'Al-Haysoni Law Firm | Distinguished Legal Services in Saudi Arabia'
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'ar'
        ? 'شركة صالح الحيسوني للمحاماة - شركة قانونية رائدة في المملكة العربية السعودية. نقدم خدمات قانونية متكاملة: الترافع القضائي، الاستشارات القانونية، العقود، التحكيم، تأسيس الشركات، التوثيق، والتنفيذ. خبرة تزيد عن 10 سنوات في مختلف المجالات القانونية.'
        : 'Al-Haysoni Law Firm - A leading law firm in the Kingdom of Saudi Arabia. We provide integrated legal services: litigation, legal consultations, contracts, arbitration, company formation, documentation, and execution. Over 10 years of experience in various legal fields.'
      )
    }
    
    // Update HTML lang and dir attributes
    document.documentElement.setAttribute('lang', language === 'ar' ? 'ar' : 'en')
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
  }, [language])

  useEffect(() => {
    try {
      // Check if mobile device (shared for both sections)
      const checkMobile = () => window.innerWidth <= 768 || 'ontouchstart' in window
      
      // Services accordion - click to expand/collapse (works on ALL screen sizes)
      // Use event delegation to avoid breaking React's virtual DOM
      let handleServiceClick = null
      
      handleServiceClick = (e) => {
        const item = e.target.closest('.service-modern')
        if (!item) return
        
        // Only prevent toggle if clicking directly on the WhatsApp button link
        // Check if the clicked element is inside the service-modern-body and is a link
        const clickedElement = e.target
        const body = item.querySelector('.service-modern-body')
        const isWhatsAppLink = clickedElement.closest('a.service-whatsapp-button')
        
        // If clicking on WhatsApp link inside the body, let it work normally
        if (isWhatsAppLink && body && body.contains(clickedElement)) {
          return
        }
        
        // Prevent event bubbling
        e.preventDefault()
        e.stopPropagation()
        
        const isActive = item.classList.contains('active')
        const allItems = document.querySelectorAll('.service-modern')
        
        if (isActive) {
          // Collapse this item
          item.classList.remove('active')
        } else {
          // Close all other items first
          allItems.forEach(other => {
            if (other && other !== item) {
              other.classList.remove('active')
            }
          })
          // Then expand the clicked item
          item.classList.add('active')
          
          // Scroll to item if needed (smooth scroll)
          setTimeout(() => {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }, 100)
        }
      }
      
      // Setup service items click handlers using event delegation
      const setupServiceHandlers = () => {
        const servicesShowcase = document.querySelector('.services-showcase')
        if (servicesShowcase && handleServiceClick) {
          // Remove existing listener if any (use a named function for proper cleanup)
          const oldHandler = servicesShowcase._serviceClickHandler
          if (oldHandler) {
            servicesShowcase.removeEventListener('click', oldHandler)
          }
          // Store reference for cleanup
          servicesShowcase._serviceClickHandler = handleServiceClick
          // Add event listener using delegation
          servicesShowcase.addEventListener('click', handleServiceClick)
        }
      }
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupServiceHandlers)
      } else {
        // DOM already loaded
        setTimeout(setupServiceHandlers, 100)
      }
      
      // Also setup on React render (in case items are added dynamically)
      setTimeout(setupServiceHandlers, 300)
      
      // Specializations functionality
      // MOBILE: Auto-expand on scroll | DESKTOP: Expand on hover only
      const specItems = document.querySelectorAll('.spec-item')
      let intersectionObserver = null
      
      const setupIntersectionObserver = () => {
        // Cleanup existing observer
        if (intersectionObserver) {
          intersectionObserver.disconnect()
          intersectionObserver = null
        }
        
        const currentIsMobile = checkMobile()
      
        // Only set up IntersectionObserver on mobile devices
        if (currentIsMobile && specItems && specItems.length > 0) {
          intersectionObserver = new IntersectionObserver((entries) => {
            try {
              entries.forEach(entry => {
                try {
                  const item = entry?.target
                  if (!item) return
                  
                  const rect = entry.boundingClientRect
                  const viewportHeight = window.innerHeight
                  const cardCenter = rect.top + rect.height / 2
                  const viewportCenter = viewportHeight / 2
                  const distanceFromCenter = Math.abs(cardCenter - viewportCenter)
                  const threshold = viewportHeight * 0.25
                  
                  // Auto-expand card when centered in viewport
                  if (entry.isIntersecting && distanceFromCenter < threshold) {
                    // Close all other items
                    specItems.forEach(i => {
                      if (i && i !== item) {
                        i.classList.remove('active')
                      }
                    })
                    // Expand this card
                    item.classList.add('active')
                  }
                } catch (err) {
                  console.warn('Error in IntersectionObserver entry:', err)
                }
              })
            } catch (err) {
              console.warn('Error in IntersectionObserver:', err)
            }
          }, {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-15% 0px -15% 0px'
          })
          
          // Observe all spec items on mobile
          specItems.forEach(item => {
            if (item) intersectionObserver.observe(item)
          })
        }
      }
    
      // Desktop/Tablet: Ensure only one card expands on hover
      const ensureSingleActiveCard = () => {
        const currentIsMobile = checkMobile()
        if (!currentIsMobile && specItems && specItems.length > 0) {
          // Remove active class from all cards first
          specItems.forEach(item => {
            if (item) item.classList.remove('active')
          })
        }
      }
      
      // Handle hover on desktop/tablet to ensure only one card expands
      if (specItems && specItems.length > 0) {
        specItems.forEach(item => {
          if (item) {
            // Mouse enter - expand this card, close all others
            item.addEventListener('mouseenter', () => {
              const currentIsMobile = checkMobile()
              if (!currentIsMobile) {
                // Close all other cards first
                specItems.forEach(i => {
                  if (i && i !== item) {
                    i.classList.remove('active')
                  }
                })
                // Then activate this card
                item.classList.add('active')
              }
            })
            
            // Mouse leave - close this card
            item.addEventListener('mouseleave', () => {
              const currentIsMobile = checkMobile()
              if (!currentIsMobile) {
                item.classList.remove('active')
              }
            })
          }
        })
      }
      
      // Initial setup
      setupIntersectionObserver()
      
      // Handle window resize
      let resizeTimeout
      const handleResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          // Ensure only one card is active after resize
          ensureSingleActiveCard()
          setupIntersectionObserver()
        }, 250)
      }
      window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      try {
        if (intersectionObserver) {
          intersectionObserver.disconnect()
        }
        window.removeEventListener('resize', handleResize)
        // Cleanup service handlers
        const servicesShowcase = document.querySelector('.services-showcase')
        if (servicesShowcase) {
          servicesShowcase.removeEventListener('click', handleServiceClick)
        }
      } catch (err) {
        console.warn('Error in cleanup:', err)
      }
    }
    } catch (err) {
      console.error('Error in App useEffect:', err)
    }
  }, [language])

  // Update document title, meta tags, and HTML attributes based on language
  useEffect(() => {
    document.title = language === 'ar' 
      ? 'شركة صالح الحيسوني للمحاماة | خدمات قانونية متميزة في السعودية'
      : 'Al-Haysoni Law Firm | Distinguished Legal Services in Saudi Arabia'
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', language === 'ar'
      ? 'شركة صالح الحيسوني للمحاماة - شركة قانونية رائدة في المملكة العربية السعودية. نقدم خدمات قانونية متكاملة: الترافع القضائي، الاستشارات القانونية، العقود، التحكيم، تأسيس الشركات، التوثيق، والتنفيذ. خبرة تزيد عن 10 سنوات في مختلف المجالات القانونية.'
      : 'Al-Haysoni Law Firm - A leading law firm in the Kingdom of Saudi Arabia. We provide integrated legal services: litigation, legal consultations, contracts, arbitration, company formation, documentation, and execution. Over 10 years of experience in various legal fields.'
    )
    
    // Update HTML lang and dir attributes
    document.documentElement.setAttribute('lang', language === 'ar' ? 'ar' : 'en')
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    
    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    
    updateOGTag('og:title', document.title)
    updateOGTag('og:description', metaDescription.getAttribute('content'))
    updateOGTag('og:locale', language === 'ar' ? 'ar_SA' : 'en_US')
  }, [language])

  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.header')) {
        setMobileMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false)
      }
    }

    // Prevent body scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('resize', handleResize)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileMenuOpen])

  return (
    <div className="app" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="header" role="banner">
        <div className="header-content">
          <div className="logo-container">
            <img src="/logo_without_bg.png" alt={t.companyName} className="logo" />
            <h1 className="company-name">{t.companyName}</h1>
          </div>
          <nav className="nav">
            <a href="#home">{t.nav.home}</a>
            <a href="#specializations">{t.nav.specializations}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
            <button 
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={language === 'ar' ? t.common.switchToEnglish : t.common.switchToEnglish}
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
          </nav>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={mobileMenuOpen ? 'active' : ''}></span>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
          </button>
        </div>
        {/* Mobile Menu */}
        <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
          <a href="#specializations" onClick={() => setMobileMenuOpen(false)}>{t.nav.specializations}</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>{t.nav.services}</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>
          <button 
            className="language-toggle mobile"
            onClick={() => {
              toggleLanguage()
              setMobileMenuOpen(false)
            }}
            aria-label="Toggle language"
          >
            {language === 'ar' ? 'EN' : 'AR'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero" role="main">
        <div className="hero-pattern"></div>
        <div className="hero-content">
            <div className="hero-badge">{t.hero.badge}</div>
            <h2 className="hero-title">
              <span className="title-highlight">{t.hero.titleHighlight}</span> {t.hero.titleRest}
            </h2>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <p className="hero-description">
              {t.hero.description}
            </p>
            <div className="hero-buttons">
              <a 
                href={`https://wa.me/966558508881?text=${encodeURIComponent(t.hero.whatsappMessage)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button primary hero-cta"
              >
                {t.hero.ctaButton}
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
                <div className="stat-label">{t.hero.stats.cases}</div>
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
                <div className="stat-label">{t.hero.stats.experience}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-number">{t.hero.stats.all}</div>
                <div className="stat-label">{t.hero.stats.allTypes}</div>
              </div>
            </div>
          </div>
      </section>

      {/* Specializations Section */}
      <section id="specializations" className="specializations-modern" aria-labelledby="specializations-heading">
        <div className="section-header">
            <span className="section-badge">{t.specializations.badge}</span>
            <h2 id="specializations-heading" className="section-title">{t.specializations.title}</h2>
            <p className="section-description">{t.specializations.description}</p>
          </div>
          <div className="specializations-masonry">
            <div className="spec-item" data-category="personal">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=qEK2pqenBa22&format=png&color=000000" alt={t.specializations.items.personal.title} className="spec-icon" />
                <div className="spec-number">01</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.personal.title}</h3>
                <div className="spec-preview">{t.specializations.items.personal.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.personal.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="criminal">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/ios-filled/100/000000/scales.png" alt={t.specializations.items.criminal.title} className="spec-icon" />
                <div className="spec-number">02</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.criminal.title}</h3>
                <div className="spec-preview">{t.specializations.items.criminal.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.criminal.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="business">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=fNBnDhvTtPhD&format=png&color=000000" alt={t.specializations.items.business.title} className="spec-icon" />
                <div className="spec-number">03</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.business.title}</h3>
                <div className="spec-preview">{t.specializations.items.business.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.business.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="real-estate">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=49636&format=png&color=000000" alt={t.specializations.items.realEstate.title} className="spec-icon" />
                <div className="spec-number">04</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.realEstate.title}</h3>
                <div className="spec-preview">{t.specializations.items.realEstate.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.realEstate.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="administrative">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=17855&format=png&color=000000" alt={t.specializations.items.administrative.title} className="spec-icon" />
                <div className="spec-number">05</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.administrative.title}</h3>
                <div className="spec-preview">{t.specializations.items.administrative.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.administrative.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="insurance">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=hwWsopzNm7N2&format=png&color=000000" alt={t.specializations.items.insurance.title} className="spec-icon" />
                <div className="spec-number">06</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.insurance.title}</h3>
                <div className="spec-preview">{t.specializations.items.insurance.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.insurance.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="medical">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=4011&format=png&color=000000" alt={t.specializations.items.medical.title} className="spec-icon" />
                <div className="spec-number">07</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.medical.title}</h3>
                <div className="spec-preview">{t.specializations.items.medical.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.medical.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="consumer">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=02L7uHUVDizl&format=png&color=000000" alt={t.specializations.items.consumer.title} className="spec-icon" />
                <div className="spec-number">08</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.consumer.title}</h3>
                <div className="spec-preview">{t.specializations.items.consumer.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.consumer.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item" data-category="cyber">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/ios-filled/100/1a4d3a/lock.png" alt={t.specializations.items.cyber.title} className="spec-icon" />
                <div className="spec-number">09</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.cyber.title}</h3>
                <div className="spec-preview">{t.specializations.items.cyber.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.cyber.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="spec-item spec-large" data-category="transport">
              <div className="spec-visual">
                <div className="spec-icon-bg"></div>
                <img src="https://img.icons8.com/?size=100&id=JhJh1oz0GRY9&format=png&color=000000" alt={t.specializations.items.transport.title} className="spec-icon" />
                <div className="spec-number">10</div>
              </div>
              <div className="spec-content">
                <h3>{t.specializations.items.transport.title}</h3>
                <div className="spec-preview">{t.specializations.items.transport.preview}</div>
                <div className="spec-details">
                  {t.specializations.items.transport.details.map((detail, idx) => (
                    <div key={idx} className="spec-detail-item"><strong>{detail.label}</strong> {detail.text}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Legal Services Section */}
      <section id="services" className="services-modern" aria-labelledby="services-heading">
        <div className="section-header">
            <span className="section-badge">{t.services.badge}</span>
            <h2 id="services-heading" className="section-title">{t.services.title}</h2>
            <p className="section-description">{t.services.description}</p>
          </div>
          <div className="services-showcase">
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/scales.png" alt={t.services.items.litigation.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.litigation.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.litigation.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item">{item}</div>
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.litigation.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/consultation.png" alt={t.services.items.consultation.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.consultation.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.consultation.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item" dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.consultation.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/contract.png" alt={t.services.items.contracts.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.contracts.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.contracts.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item">{item}</div>
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.contracts.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/handshake.png" alt={t.services.items.arbitration.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.arbitration.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.arbitration.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item">{item}</div>
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.arbitration.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/company.png" alt={t.services.items.company.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.company.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.company.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item" dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.company.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/document.png" alt={t.services.items.documentation.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.documentation.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.documentation.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item" dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.documentation.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
            <div className="service-modern">
              <div className="service-modern-header">
                <div className="service-modern-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/000000/money-bag.png" alt={t.services.items.execution.title} className="service-modern-icon" />
                </div>
                <h3>{t.services.items.execution.title}</h3>
                <img src="https://img.icons8.com/?size=100&id=23540&format=png&color=000000" alt={t.common.expand} className="service-toggle-icon" />
              </div>
              <div className="service-modern-body">
                <div className="service-modern-content">
                  {t.services.items.execution.items.map((item, idx) => (
                    <div key={idx} className="service-modern-item">{item}</div>
                  ))}
                  <a href={`https://wa.me/966558508881?text=${encodeURIComponent(t.services.items.execution.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="service-whatsapp-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t.services.askButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="about" aria-labelledby="about-heading">
        <div className="about-content">
            <div className="about-text">
              <span className="section-badge">{t.about.badge}</span>
              <h2 id="about-heading" className="section-title">{t.about.title}</h2>
              <p>
                {t.about.description1}
              </p>
              <p>
                {t.about.description2}
              </p>
              <p>
                <strong>{t.about.officesTitle}</strong> {t.about.officesText}
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>{t.about.features.experience}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>{t.about.features.team}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>{t.about.features.service}</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="visual-card">
                <img src="/logo_without_bg.png" alt={t.common.justice} className="visual-icon" />
                <h3>{t.about.visualTitle}</h3>
              </div>
            </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact" aria-labelledby="contact-heading">
        <div className="section-header">
            <span className="section-badge">{t.contact.badge}</span>
            <h2 id="contact-heading" className="section-title">{t.contact.title}</h2>
            <p className="section-description">{t.contact.description}</p>
          </div>
          
          <div className="contact-container">
            {/* Contact Info Cards */}
            <div className="contact-info-section">
              <div className="contact-card" onClick={() => copyToClipboard('0558508881', t.contact.copyPhone)} style={{ cursor: 'pointer' }}>
                <div className="contact-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/1a4d3a/phone.png" alt={t.contact.phone} className="contact-icon" />
                </div>
                <h3>{t.contact.phone}</h3>
                <p><span dir="ltr">055 8508 881</span></p>
              </div>
              
              <div className="contact-card" onClick={() => copyToClipboard('info@alhisonylaw.com', t.contact.copyEmail)} style={{ cursor: 'pointer' }}>
                <div className="contact-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/1a4d3a/email.png" alt={t.contact.email} className="contact-icon" />
                </div>
                <h3>{t.contact.email}</h3>
                <p>info@alhisonylaw.com</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <img src="https://img.icons8.com/ios-filled/100/1a4d3a/marker.png" alt={t.contact.location} className="contact-icon" />
                </div>
                <h3>{t.contact.location}</h3>
                <p>{t.contact.locationText}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="contact-actions">
              <a 
                href={`https://wa.me/966558508881?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-button whatsapp-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {t.contact.whatsappButton}
              </a>
              
              <a 
                href={`mailto:info@alhisonylaw.com?subject=${encodeURIComponent(t.contact.emailSubject)}`}
                className="contact-button email-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {t.contact.emailButton}
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
                title={t.common.officeLocation}
              ></iframe>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer-content">
            <h3 className="footer-title">{t.companyName}</h3>
            <div className="footer-info">
              <p className="footer-phone">{t.footer.phone} <span dir="ltr">055 8508 881</span></p>
              <p className="footer-email">{t.footer.email} <span dir="ltr">info@alhisonylaw.com</span></p>
              <p className="footer-copyright">&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
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

