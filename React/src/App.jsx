import './App.css'

function App() {
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
              <div className="stat-number">+500</div>
              <div className="stat-label">قضية منجزة</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10</div>
              <div className="stat-label">سنة خبرة</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">رضا العملاء</div>
            </div>
          </div>
      </section>

      {/* Specializations Section */}
      <section id="specializations" className="services">
        <div className="section-header">
            <span className="section-badge">قطاعات التخصص</span>
            <h2 className="section-title">مجالات الممارسة القانونية</h2>
            <p className="section-description">نختص في مختلف المجالات القانونية لتلبية احتياجاتك</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=qEK2pqenBa22&format=png&color=000000" alt="الأفراد والأحوال الشخصية" className="service-icon" />
              </div>
              <h3>الأفراد والأحوال الشخصية</h3>
              <p>
                <strong>قضايا الأحوال الشخصية:</strong> الطلاق، الخلع، فسخ النكاح، الحضانة والزيارة، النفقات، وتقسيم الميراث.<br/><br/>
                <strong>القضايا المدنية والحقوقية:</strong> المطالبات المالية، التعويضات عن الأضرار، ونزاعات الأراضي.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/scales.png" alt="القضايا الجنائية" className="service-icon" />
              </div>
              <h3>القضايا الجنائية</h3>
              <p>
                <strong>الجرائم المعلوماتية والإلكترونية:</strong> الاحتيال الإلكتروني، الابتزاز الإلكتروني، اختراق الأنظمة، والتشهير الإلكتروني.<br/><br/>
                <strong>جرائم الاعتداء:</strong> قضايا الاعتداء البدني، الاعتداء على النفس، التهديد، والتحرش.<br/><br/>
                <strong>جرائم الأموال:</strong> السرقة، النصب والاحتيال، خيانة الأمانة، والاختلاس.<br/><br/>
                <strong>جرائم المخدرات:</strong> الدفاع في قضايا الاتجار والحيازة والاستخدام.<br/><br/>
                <strong>جرائم الفساد المالي:</strong> الرشوة، غسيل الأموال، التهرب الضريبي، والاستغلال الوظيفي.<br/><br/>
                <strong>جرائم الأمن:</strong> قضايا الأمن الوطني، الإرهاب، والتحريض على الفتنة.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=fNBnDhvTtPhD&format=png&color=000000" alt="قطاع الأعمال والشركات" className="service-icon" />
              </div>
              <h3>قطاع الأعمال والشركات</h3>
              <p>
                <strong>القضايا التجارية:</strong> المنازعات بين الشركاء، قضايا الإفلاس والتصفية، الأوراق التجارية، والمنافسة غير المشروعة.<br/><br/>
                <strong>القضايا المالية والمصرفية:</strong> المنازعات مع البنوك وشركات التمويل، منازعات الأسهم والسوق المالية.<br/><br/>
                <strong>القضايا العمالية:</strong> صياغة لوائح تنظيم العمل، المنازعات العمالية (فصل تعسفي، أجور، مكافأة نهاية الخدمة).<br/><br/>
                <strong>الملكية الفكرية:</strong> حماية العلامات التجارية، براءات الاختراع، حقوق المؤلف والنشر، والأسرار التجارية.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=49636&format=png&color=000000" alt="العقارات والمقاولات" className="service-icon" />
              </div>
              <h3>العقارات والمقاولات</h3>
              <p>
                <strong>القضايا العقارية:</strong> نزاعات الملكية، دعاوى الإخلاء، منازعات الإيجار، والمساهمات العقارية.<br/><br/>
                <strong>قضايا المقاولات والإنشاءات:</strong> النزاعات الفنية والهندسية، عقود "فيديك"، ومنازعات المطورين العقاريين.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=17855&format=png&color=000000" alt="القضاء الإداري والحكومي" className="service-icon" />
              </div>
              <h3>القضاء الإداري والحكومي</h3>
              <p>
                <strong>القضايا الإدارية:</strong> الترافع أمام ديوان المظالم، إلغاء القرارات الإدارية، والتعويض من الجهات الحكومية.<br/><br/>
                <strong>الزكاة والضريبة:</strong> الاعتراضات أمام لجان الزكاة والضريبة والجمارك.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=hwWsopzNm7N2&format=png&color=000000" alt="قضايا التأمين" className="service-icon" />
              </div>
              <h3>قضايا التأمين</h3>
              <p>
                <strong>منازعات التأمين:</strong> المنازعات مع شركات التأمين (تأمين طبي، تأمين مركبات، تأمين أضرار، تأمين حياة).<br/><br/>
                <strong>المطالبات التأمينية:</strong> متابعة مطالبات التأمين ورفض المطالبات غير المبررة.<br/><br/>
                <strong>التأمين التجاري:</strong> منازعات التأمين على الممتلكات والمسؤولية المدنية للشركات.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/1a4d3a/hospital.png" alt="القانون الطبي والمسؤولية الطبية" className="service-icon" />
              </div>
              <h3>القانون الطبي والمسؤولية الطبية</h3>
              <p>
                <strong>قضايا الأخطاء الطبية:</strong> الدفاع عن الأطباء والمراكز الطبية في قضايا الأخطاء الطبية.<br/><br/>
                <strong>حقوق المرضى:</strong> تمثيل المرضى في قضايا التعويض عن الأضرار الطبية.<br/><br/>
                <strong>التراخيص الطبية:</strong> استخراج التراخيص الطبية والاعتراض على قرارات الهيئة السعودية للتخصصات الصحية.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=02L7uHUVDizl&format=png&color=000000" alt="قضايا المستهلك وحماية المستهلك" className="service-icon" />
              </div>
              <h3>قضايا المستهلك وحماية المستهلك</h3>
              <p>
                <strong>منازعات المستهلكين:</strong> تمثيل المستهلكين في منازعاتهم مع التجار والشركات.<br/><br/>
                <strong>قضايا الجودة والضمان:</strong> المطالبة بحقوق الضمان وضمان الجودة للمنتجات والخدمات.<br/><br/>
                <strong>الإعلانات المضللة:</strong> قضايا الإعلانات الكاذبة والممارسات التجارية غير العادلة.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/1a4d3a/lock.png" alt="الأمن السيبراني وحماية البيانات" className="service-icon" />
              </div>
              <h3>الأمن السيبراني وحماية البيانات</h3>
              <p>
                <strong>قضايا الجرائم الإلكترونية:</strong> الدفاع في قضايا الجرائم المعلوماتية والاحتيال الإلكتروني.<br/><br/>
                <strong>حماية البيانات:</strong> الامتثال لنظام حماية البيانات الشخصية والخصوصية.<br/><br/>
                <strong>الابتزاز الإلكتروني:</strong> معالجة قضايا الابتزاز والتهديد الإلكتروني.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=JhJh1oz0GRY9&format=png&color=000000" alt="قضايا النقل والمواصلات" className="service-icon" />
              </div>
              <h3>قضايا النقل والمواصلات</h3>
              <p>
                <strong>حوادث المركبات:</strong> قضايا الحوادث المرورية والتعويضات.<br/><br/>
                <strong>النقل الجوي:</strong> منازعات شركات الطيران والركاب.<br/><br/>
                <strong>النقل البحري:</strong> قضايا الشحن البحري والمنازعات التجارية البحرية.
              </p>
            </div>
          </div>
      </section>

      {/* Legal Services Section */}
      <section id="services" className="services">
        <div className="section-header">
            <span className="section-badge">الخدمات القانونية</span>
            <h2 className="section-title">طبيعة العمل والخدمات المقدمة</h2>
            <p className="section-description">نقدم خدمات قانونية متكاملة بأساليب احترافية</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/scales.png" alt="الترافع والتمثيل القضائي" className="service-icon" />
              </div>
              <h3>الترافع والتمثيل القضائي</h3>
              <p>
                تمثيل الموكلين أمام كافة المحاكم (العامة، التجارية، العمالية، الجزائية، الأحوال الشخصية).<br/><br/>
                التمثيل أمام اللجان شبه القضائية (لجان المصرفية، التأمين، الأوراق المالية، الضرائب).<br/><br/>
                حضور جلسات التحقيق أمام النيابة العامة ومراكز الشرطة.<br/><br/>
                إعداد اللوائح الاعتراضية، مذكرات الجواب، والتماس إعادة النظر.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/consultation.png" alt="الاستشارات والدراسات القانونية" className="service-icon" />
              </div>
              <h3>الاستشارات والدراسات القانونية</h3>
              <p>
                تقديم الرأي القانوني المكتوب والشفهي في كافة المجالات.<br/><br/>
                دراسات الجدوى القانونية للمشاريع الجديدة.<br/><br/>
                خدمة "المستشار القانوني الخارجي" للشركات (عقود سنوية).<br/><br/>
                <strong>الحوكمة والامتثال:</strong> ضمان التزام الشركات بالأنظمة السعودية الجديدة ولوائح حوكمة الشركات.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/contract.png" alt="العقود والاتفاقيات" className="service-icon" />
              </div>
              <h3>العقود والاتفاقيات</h3>
              <p>
                صياغة العقود التجارية (الفرنشايز، التوزيع، التوريد، الشراكة).<br/><br/>
                صياغة عقود العمل واللوائح الداخلية للمنشآت.<br/><br/>
                مراجعة العقود وتدقيقها لضمان حماية حقوق الموكل وتقليل المخاطر.<br/><br/>
                إدارة العقود ومتابعة تجديدها وتنفيذ بنودها.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/handshake.png" alt="التحكيم وتسوية المنازعات" className="service-icon" />
              </div>
              <h3>التحكيم وتسوية المنازعات</h3>
              <p>
                الوساطة العقارية والتجارية للوصول لحلول ودية.<br/><br/>
                التمثيل في قضايا التحكيم التجاري المحلي والدولي.<br/><br/>
                صياغة مشارط التحكيم في العقود.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/company.png" alt="خدمات تأسيس ودعم الشركات" className="service-icon" />
              </div>
              <h3>خدمات تأسيس ودعم الشركات</h3>
              <p>
                <strong>تأسيس الشركات:</strong> (مساهمة، محدودة، تضامنية) وإصدار السجلات التجارية.<br/><br/>
                <strong>الاستثمار الأجنبي:</strong> استخراج تراخيص وزارة الاستثمار (MISA) وتأسيس شركات المستثمر الأجنبي.<br/><br/>
                <strong>الاندماج والاستحواذ:</strong> الفحص النافي للجهالة (Due Diligence)، وعقود الاستحواذ.<br/><br/>
                <strong>تسجيل العلامات التجارية:</strong> والنماذج الصناعية لدى الهيئة السعودية للملكية الفكرية.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/document.png" alt="خدمات التوثيق" className="service-icon" />
              </div>
              <h3>خدمات التوثيق</h3>
              <p>
                <strong>العقارات:</strong> إفراغ الصكوك العقارية، توثيق الرهن وفكه.<br/><br/>
                <strong>الشركات:</strong> توثيق عقود التأسيس وقرارات الشركاء وملاحق التعديل.<br/><br/>
                <strong>الوكالات:</strong> إصدار وفسخ الوكالات للأفراد والشركات.<br/><br/>
                <strong>الإقرارات:</strong> توثيق الإقرارات بالديون المالية وسدادها.<br/><br/>
                <strong>الأحوال الشخصية:</strong> توثيق عقود الزواج والطلاق والخلع والرجعة (للمرخصين).
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <img src="https://img.icons8.com/ios-filled/100/000000/money-bag.png" alt="خدمات التنفيذ والتحصيل" className="service-icon" />
              </div>
              <h3>خدمات التنفيذ والتحصيل</h3>
              <p>
                تنفيذ الأحكام القضائية المحلية والأجنبية وأحكام المحكمين.<br/><br/>
                تنفيذ الأوراق التجارية (الشيكات، السندات لأمر، الكمبيالات) عبر محكمة التنفيذ.<br/><br/>
                متابعة إجراءات الحجز على الأموال والمنع من السفر والإفصاح عن الأصول.<br/><br/>
                تحصيل الديون المتعثرة للشركات والأفراد (تسوية أو قضاءً).
              </p>
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

