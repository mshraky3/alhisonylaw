export const translations = {
  ar: {
    // Company Name
    companyName: 'شركة صالح الحيسوني للمحاماة',
    // Common
    common: {
      expand: 'توسيع',
      officeLocation: 'موقع المكتب',
      justice: 'العدالة',
      switchToEnglish: 'التبديل إلى الإنجليزية'
    },
    // Navigation
    nav: {
      home: 'الرئيسية',
      specializations: 'التخصصات',
      services: 'الخدمات',
      about: 'من نحن',
      contact: 'اتصل بنا'
    },
    // Hero Section
    hero: {
      badge: 'شركة قانونية معتمدة',
      title: 'العدالة والتميز في الخدمة القانونية',
      titleHighlight: 'العدالة',
      titleRest: 'والتميز في الخدمة القانونية',
      subtitle: 'نقدم خدمات قانونية متميزة في المملكة العربية السعودية',
      description: 'نحن فريق من المحامين المتمرسين ملتزمون بتقديم أفضل الخدمات القانونية والاستشارات القانونية لعملائنا الكرام في مختلف المجالات القانونية',
      ctaButton: 'احجز استشارة',
      whatsappMessage: 'السلام عليكم، أرغب في حجز استشارة قانونية',
      stats: {
        cases: 'قضية منجزة',
        experience: 'سنة خبرة',
        allTypes: 'أنواع القضايا',
        all: 'جميع'
      }
    },
    // Specializations
    specializations: {
      badge: 'قطاعات التخصص',
      title: 'مجالات الممارسة القانونية',
      description: 'نختص في مختلف المجالات القانونية لتلبية احتياجاتك',
      items: {
        personal: {
          title: 'الأفراد والأحوال الشخصية',
          preview: 'قضايا الأحوال الشخصية والمدنية',
          details: [
            { label: 'قضايا الأحوال الشخصية:', text: 'الطلاق، الخلع، فسخ النكاح، الحضانة والزيارة، النفقات، وتقسيم الميراث.' },
            { label: 'القضايا المدنية والحقوقية:', text: 'المطالبات المالية، التعويضات عن الأضرار، ونزاعات الأراضي.' }
          ]
        },
        criminal: {
          title: 'القضايا الجنائية',
          preview: 'الدفاع في مختلف أنواع الجرائم',
          details: [
            { label: 'الجرائم المعلوماتية والإلكترونية:', text: 'الاحتيال الإلكتروني، الابتزاز الإلكتروني، اختراق الأنظمة، والتشهير الإلكتروني.' },
            { label: 'جرائم الاعتداء:', text: 'قضايا الاعتداء البدني، الاعتداء على النفس، التهديد، والتحرش.' },
            { label: 'جرائم الأموال:', text: 'السرقة، النصب والاحتيال، خيانة الأمانة، والاختلاس.' },
            { label: 'جرائم المخدرات:', text: 'الدفاع في قضايا الاتجار والحيازة والاستخدام.' },
            { label: 'جرائم الفساد المالي:', text: 'الرشوة، غسيل الأموال، التهرب الضريبي، والاستغلال الوظيفي.' },
            { label: 'جرائم الأمن:', text: 'قضايا الأمن الوطني، الإرهاب، والتحريض على الفتنة.' }
          ]
        },
        business: {
          title: 'قطاع الأعمال والشركات',
          preview: 'القضايا التجارية والمالية',
          details: [
            { label: 'القضايا التجارية:', text: 'المنازعات بين الشركاء، قضايا الإفلاس والتصفية، الأوراق التجارية، والمنافسة غير المشروعة.' },
            { label: 'القضايا المالية والمصرفية:', text: 'المنازعات مع البنوك وشركات التمويل، منازعات الأسهم والسوق المالية.' },
            { label: 'القضايا العمالية:', text: 'صياغة لوائح تنظيم العمل، المنازعات العمالية (فصل تعسفي، أجور، مكافأة نهاية الخدمة).' },
            { label: 'الملكية الفكرية:', text: 'حماية العلامات التجارية، براءات الاختراع، حقوق المؤلف والنشر، والأسرار التجارية.' }
          ]
        },
        realEstate: {
          title: 'العقارات والمقاولات',
          preview: 'نزاعات العقارات والإنشاءات',
          details: [
            { label: 'القضايا العقارية:', text: 'نزاعات الملكية، دعاوى الإخلاء، منازعات الإيجار، والمساهمات العقارية.' },
            { label: 'قضايا المقاولات والإنشاءات:', text: 'النزاعات الفنية والهندسية، عقود "فيديك"، ومنازعات المطورين العقاريين.' }
          ]
        },
        administrative: {
          title: 'القضاء الإداري والحكومي',
          preview: 'الترافع أمام الديوان واللجان',
          details: [
            { label: 'القضايا الإدارية:', text: 'الترافع أمام ديوان المظالم، إلغاء القرارات الإدارية، والتعويض من الجهات الحكومية.' },
            { label: 'الزكاة والضريبة:', text: 'الاعتراضات أمام لجان الزكاة والضريبة والجمارك.' }
          ]
        },
        insurance: {
          title: 'قضايا التأمين',
          preview: 'منازعات التأمين والمطالبات',
          details: [
            { label: 'منازعات التأمين:', text: 'المنازعات مع شركات التأمين (تأمين طبي، تأمين مركبات، تأمين أضرار، تأمين حياة).' },
            { label: 'المطالبات التأمينية:', text: 'متابعة مطالبات التأمين ورفض المطالبات غير المبررة.' },
            { label: 'التأمين التجاري:', text: 'منازعات التأمين على الممتلكات والمسؤولية المدنية للشركات.' }
          ]
        },
        medical: {
          title: 'القانون الطبي والمسؤولية الطبية',
          preview: 'قضايا الأخطاء الطبية وحقوق المرضى',
          details: [
            { label: 'قضايا الأخطاء الطبية:', text: 'الدفاع عن الأطباء والمراكز الطبية في قضايا الأخطاء الطبية.' },
            { label: 'حقوق المرضى:', text: 'تمثيل المرضى في قضايا التعويض عن الأضرار الطبية.' },
            { label: 'التراخيص الطبية:', text: 'استخراج التراخيص الطبية والاعتراض على قرارات الهيئة السعودية للتخصصات الصحية.' }
          ]
        },
        consumer: {
          title: 'قضايا المستهلك وحماية المستهلك',
          preview: 'حماية حقوق المستهلكين',
          details: [
            { label: 'منازعات المستهلكين:', text: 'تمثيل المستهلكين في منازعاتهم مع التجار والشركات.' },
            { label: 'قضايا الجودة والضمان:', text: 'المطالبة بحقوق الضمان وضمان الجودة للمنتجات والخدمات.' },
            { label: 'الإعلانات المضللة:', text: 'قضايا الإعلانات الكاذبة والممارسات التجارية غير العادلة.' }
          ]
        },
        cyber: {
          title: 'الأمن السيبراني وحماية البيانات',
          preview: 'الجرائم الإلكترونية وحماية البيانات',
          details: [
            { label: 'قضايا الجرائم الإلكترونية:', text: 'الدفاع في قضايا الجرائم المعلوماتية والاحتيال الإلكتروني.' },
            { label: 'حماية البيانات:', text: 'الامتثال لنظام حماية البيانات الشخصية والخصوصية.' },
            { label: 'الابتزاز الإلكتروني:', text: 'معالجة قضايا الابتزاز والتهديد الإلكتروني.' }
          ]
        },
        transport: {
          title: 'قضايا النقل والمواصلات',
          preview: 'حوادث المركبات والنقل',
          details: [
            { label: 'حوادث المركبات:', text: 'قضايا الحوادث المرورية والتعويضات.' },
            { label: 'النقل الجوي:', text: 'منازعات شركات الطيران والركاب.' },
            { label: 'النقل البحري:', text: 'قضايا الشحن البحري والمنازعات التجارية البحرية.' }
          ]
        }
      }
    },
    // Services
    services: {
      badge: 'الخدمات القانونية',
      title: 'طبيعة العمل والخدمات المقدمة',
      description: 'نقدم خدمات قانونية متكاملة بأساليب احترافية',
      askButton: 'اسألنا عن هذا',
      items: {
        litigation: {
          title: 'الترافع والتمثيل القضائي',
          items: [
            'تمثيل الموكلين أمام كافة المحاكم (العامة، التجارية، العمالية، الجزائية، الأحوال الشخصية)',
            'التمثيل أمام اللجان شبه القضائية (لجان المصرفية، التأمين، الأوراق المالية، الضرائب)',
            'حضور جلسات التحقيق أمام النيابة العامة ومراكز الشرطة',
            'إعداد اللوائح الاعتراضية، مذكرات الجواب، والتماس إعادة النظر'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة الترافع والتمثيل القضائي'
        },
        consultation: {
          title: 'الاستشارات والدراسات القانونية',
          items: [
            'تقديم الرأي القانوني المكتوب والشفهي في كافة المجالات',
            'دراسات الجدوى القانونية للمشاريع الجديدة',
            'خدمة "المستشار القانوني الخارجي" للشركات (عقود سنوية)',
            '<strong>الحوكمة والامتثال:</strong> ضمان التزام الشركات بالأنظمة السعودية الجديدة ولوائح حوكمة الشركات'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة الاستشارات والدراسات القانونية'
        },
        contracts: {
          title: 'العقود والاتفاقيات',
          items: [
            'صياغة العقود التجارية (الفرنشايز، التوزيع، التوريد، الشراكة)',
            'صياغة عقود العمل واللوائح الداخلية للمنشآت',
            'مراجعة العقود وتدقيقها لضمان حماية حقوق الموكل وتقليل المخاطر',
            'إدارة العقود ومتابعة تجديدها وتنفيذ بنودها'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة العقود والاتفاقيات'
        },
        arbitration: {
          title: 'التحكيم وتسوية المنازعات',
          items: [
            'الوساطة العقارية والتجارية للوصول لحلول ودية',
            'التمثيل في قضايا التحكيم التجاري المحلي والدولي',
            'صياغة مشارط التحكيم في العقود'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة التحكيم وتسوية المنازعات'
        },
        company: {
          title: 'خدمات تأسيس ودعم الشركات',
          items: [
            '<strong>تأسيس الشركات:</strong> (مساهمة، محدودة، تضامنية) وإصدار السجلات التجارية',
            '<strong>الاستثمار الأجنبي:</strong> استخراج تراخيص وزارة الاستثمار (MISA) وتأسيس شركات المستثمر الأجنبي',
            '<strong>الاندماج والاستحواذ:</strong> الفحص النافي للجهالة (Due Diligence)، وعقود الاستحواذ',
            '<strong>تسجيل العلامات التجارية:</strong> والنماذج الصناعية لدى الهيئة السعودية للملكية الفكرية'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة تأسيس ودعم الشركات'
        },
        documentation: {
          title: 'خدمات التوثيق',
          items: [
            '<strong>العقارات:</strong> إفراغ الصكوك العقارية، توثيق الرهن وفكه',
            '<strong>الشركات:</strong> توثيق عقود التأسيس وقرارات الشركاء وملاحق التعديل',
            '<strong>الوكالات:</strong> إصدار وفسخ الوكالات للأفراد والشركات',
            '<strong>الإقرارات:</strong> توثيق الإقرارات بالديون المالية وسدادها',
            '<strong>الأحوال الشخصية:</strong> توثيق عقود الزواج والطلاق والخلع والرجعة (للمرخصين)'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة التوثيق'
        },
        execution: {
          title: 'خدمات التنفيذ والتحصيل',
          items: [
            'تنفيذ الأحكام القضائية المحلية والأجنبية وأحكام المحكمين',
            'تنفيذ الأوراق التجارية (الشيكات، السندات لأمر، الكمبيالات) عبر محكمة التنفيذ',
            'متابعة إجراءات الحجز على الأموال والمنع من السفر والإفصاح عن الأصول',
            'تحصيل الديون المتعثرة للشركات والأفراد (تسوية أو قضاءً)'
          ],
          whatsapp: 'السلام عليكم، أرغب في الاستفسار عن خدمة التنفيذ والتحصيل'
        }
      }
    },
    // About
    about: {
      badge: 'من نحن',
      title: 'شركة قانونية رائدة في المملكة',
      description1: 'شركة صالح الحيسوني للمحاماة هي شركة قانونية رائدة في المملكة العربية السعودية، يتمتع بخبرة تزيد عن 10 سنوات في مختلف المجالات القانونية. نحن ملتزمون بتقديم خدمات قانونية عالية الجودة تتماشى مع أفضل المعايير المهنية.',
      description2: 'فريقنا من المحامين المتمرسين يعمل بجد لضمان حماية حقوق عملائنا وتحقيق أفضل النتائج في قضاياهم. نؤمن بالشفافية والالتزام والتميز في كل ما نقدمه.',
      description3: 'نخدم عملائنا من مكتبين استراتيجيين: مكتبنا في الرياض ومكتبنا في القصيم، مما يمكننا من تقديم خدماتنا القانونية في مختلف أنحاء المملكة بكفاءة عالية.',
      officesTitle: 'نخدم عملائنا من مكتبين استراتيجيين:',
      officesText: 'مكتبنا في الرياض ومكتبنا في القصيم، مما يمكننا من تقديم خدماتنا القانونية في مختلف أنحاء المملكة بكفاءة عالية.',
      features: {
        experience: 'خبرة واسعة في القانون السعودي',
        team: 'فريق محترف ومتمرس',
        service: 'خدمة عملاء متميزة'
      },
      visualTitle: 'العدالة أولاً'
    },
    // Contact
    contact: {
      badge: 'اتصل بنا',
      title: 'نحن هنا لمساعدتك',
      description: 'تواصل معنا اليوم واحصل على استشارة قانونية',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      location: 'الموقع',
      locationText: 'الرياض | القصيم  المملكة العربية السعودية',
      whatsappButton: 'تواصل عبر واتساب',
      emailButton: 'أرسل بريد إلكتروني',
      copyPhone: 'تم نسخ رقم الهاتف',
      copyEmail: 'تم نسخ البريد الإلكتروني',
      whatsappMessage: 'السلام عليكم، أرغب في الاستفسار عن خدماتكم القانونية',
      emailSubject: 'استفسار عن الخدمات القانونية'
    },
    // Footer
    footer: {
      phone: 'الهاتف:',
      email: 'البريد الإلكتروني:',
      copyright: 'جميع الحقوق محفوظة'
    }
  },
  en: {
    // Company Name
    companyName: 'Al-Haysoni Law Firm',
    // Common
    common: {
      expand: 'Expand',
      officeLocation: 'Office Location',
      justice: 'Justice',
      switchToEnglish: 'Switch to English'
    },
    // Navigation
    nav: {
      home: 'Home',
      specializations: 'Specializations',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact'
    },
    // Hero Section
    hero: {
      badge: 'Certified Law Firm',
      title: 'Justice and Excellence in Legal Services',
      titleHighlight: 'Justice',
      titleRest: 'and Excellence in Legal Services',
      subtitle: 'We provide distinguished legal services in the Kingdom of Saudi Arabia',
      description: 'We are a team of experienced lawyers committed to providing the best legal services and legal consultations to our valued clients in various legal fields',
      ctaButton: 'Book a Consultation',
      whatsappMessage: 'Hello, I would like to book a legal consultation',
      stats: {
        cases: 'Cases Completed',
        experience: 'Years of Experience',
        allTypes: 'All Case Types',
        all: 'All'
      }
    },
    // Specializations
    specializations: {
      badge: 'Specialization Sectors',
      title: 'Legal Practice Areas',
      description: 'We specialize in various legal fields to meet your needs',
      items: {
        personal: {
          title: 'Individuals and Personal Status',
          preview: 'Personal status and civil cases',
          details: [
            { label: 'Personal Status Cases:', text: 'Divorce, khula, annulment of marriage, custody and visitation, alimony, and inheritance division.' },
            { label: 'Civil and Rights Cases:', text: 'Financial claims, compensation for damages, and land disputes.' }
          ]
        },
        criminal: {
          title: 'Criminal Cases',
          preview: 'Defense in various types of crimes',
          details: [
            { label: 'Cyber and Electronic Crimes:', text: 'Electronic fraud, electronic extortion, system hacking, and electronic defamation.' },
            { label: 'Assault Crimes:', text: 'Physical assault cases, assault on persons, threats, and harassment.' },
            { label: 'Financial Crimes:', text: 'Theft, fraud and deception, breach of trust, and embezzlement.' },
            { label: 'Drug Crimes:', text: 'Defense in cases of trafficking, possession, and use.' },
            { label: 'Financial Corruption Crimes:', text: 'Bribery, money laundering, tax evasion, and job exploitation.' },
            { label: 'Security Crimes:', text: 'National security cases, terrorism, and incitement to sedition.' }
          ]
        },
        business: {
          title: 'Business and Corporate Sector',
          preview: 'Commercial and financial cases',
          details: [
            { label: 'Commercial Cases:', text: 'Disputes between partners, bankruptcy and liquidation cases, commercial papers, and unfair competition.' },
            { label: 'Financial and Banking Cases:', text: 'Disputes with banks and financing companies, stock and financial market disputes.' },
            { label: 'Labor Cases:', text: 'Drafting labor regulations, labor disputes (unfair dismissal, wages, end-of-service benefits).' },
            { label: 'Intellectual Property:', text: 'Protection of trademarks, patents, copyrights, and trade secrets.' }
          ]
        },
        realEstate: {
          title: 'Real Estate and Construction',
          preview: 'Real estate and construction disputes',
          details: [
            { label: 'Real Estate Cases:', text: 'Ownership disputes, eviction lawsuits, rental disputes, and real estate contributions.' },
            { label: 'Construction and Engineering Cases:', text: 'Technical and engineering disputes, FIDIC contracts, and real estate developer disputes.' }
          ]
        },
        administrative: {
          title: 'Administrative and Governmental Judiciary',
          preview: 'Litigation before the Board and committees',
          details: [
            { label: 'Administrative Cases:', text: 'Litigation before the Board of Grievances, cancellation of administrative decisions, and compensation from government agencies.' },
            { label: 'Zakat and Tax:', text: 'Appeals before Zakat, Tax and Customs committees.' }
          ]
        },
        insurance: {
          title: 'Insurance Cases',
          preview: 'Insurance disputes and claims',
          details: [
            { label: 'Insurance Disputes:', text: 'Disputes with insurance companies (medical insurance, vehicle insurance, damage insurance, life insurance).' },
            { label: 'Insurance Claims:', text: 'Following up on insurance claims and rejecting unjustified claims.' },
            { label: 'Commercial Insurance:', text: 'Disputes over property insurance and corporate civil liability.' }
          ]
        },
        medical: {
          title: 'Medical Law and Medical Liability',
          preview: 'Medical malpractice cases and patient rights',
          details: [
            { label: 'Medical Malpractice Cases:', text: 'Defense of doctors and medical centers in medical malpractice cases.' },
            { label: 'Patient Rights:', text: 'Representation of patients in compensation cases for medical damages.' },
            { label: 'Medical Licenses:', text: 'Obtaining medical licenses and appealing decisions of the Saudi Commission for Health Specialties.' }
          ]
        },
        consumer: {
          title: 'Consumer Cases and Consumer Protection',
          preview: 'Protection of consumer rights',
          details: [
            { label: 'Consumer Disputes:', text: 'Representation of consumers in their disputes with merchants and companies.' },
            { label: 'Quality and Warranty Cases:', text: 'Claiming warranty rights and quality assurance for products and services.' },
            { label: 'Misleading Advertisements:', text: 'Cases of false advertisements and unfair commercial practices.' }
          ]
        },
        cyber: {
          title: 'Cybersecurity and Data Protection',
          preview: 'Electronic crimes and data protection',
          details: [
            { label: 'Electronic Crime Cases:', text: 'Defense in cases of cybercrimes and electronic fraud.' },
            { label: 'Data Protection:', text: 'Compliance with the Personal Data Protection Law and privacy.' },
            { label: 'Electronic Extortion:', text: 'Handling cases of extortion and electronic threats.' }
          ]
        },
        transport: {
          title: 'Transportation and Traffic Cases',
          preview: 'Vehicle accidents and transportation',
          details: [
            { label: 'Vehicle Accidents:', text: 'Traffic accident cases and compensation.' },
            { label: 'Air Transport:', text: 'Disputes between airlines and passengers.' },
            { label: 'Maritime Transport:', text: 'Maritime shipping cases and commercial maritime disputes.' }
          ]
        }
      }
    },
    // Services
    services: {
      badge: 'Legal Services',
      title: 'Nature of Work and Services Provided',
      description: 'We provide integrated legal services with professional methods',
      askButton: 'Ask Us About This',
      items: {
        litigation: {
          title: 'Litigation and Judicial Representation',
          items: [
            'Representation of clients before all courts (general, commercial, labor, criminal, personal status)',
            'Representation before quasi-judicial committees (banking, insurance, securities, tax committees)',
            'Attendance at investigation sessions before the Public Prosecution and police centers',
            'Preparation of objection memoranda, response memoranda, and requests for reconsideration'
          ],
          whatsapp: 'Hello, I would like to inquire about litigation and judicial representation services'
        },
        consultation: {
          title: 'Legal Consultations and Studies',
          items: [
            'Providing written and oral legal opinions in all fields',
            'Legal feasibility studies for new projects',
            '"External Legal Advisor" service for companies (annual contracts)',
            '<strong>Governance and Compliance:</strong> Ensuring companies\' compliance with new Saudi regulations and corporate governance bylaws'
          ],
          whatsapp: 'Hello, I would like to inquire about legal consultations and studies services'
        },
        contracts: {
          title: 'Contracts and Agreements',
          items: [
            'Drafting commercial contracts (franchise, distribution, supply, partnership)',
            'Drafting employment contracts and internal regulations for establishments',
            'Reviewing and auditing contracts to ensure protection of client rights and risk reduction',
            'Contract management and follow-up on renewal and implementation of terms'
          ],
          whatsapp: 'Hello, I would like to inquire about contracts and agreements services'
        },
        arbitration: {
          title: 'Arbitration and Dispute Resolution',
          items: [
            'Real estate and commercial mediation to reach amicable solutions',
            'Representation in local and international commercial arbitration cases',
            'Drafting arbitration clauses in contracts'
          ],
          whatsapp: 'Hello, I would like to inquire about arbitration and dispute resolution services'
        },
        company: {
          title: 'Company Formation and Support Services',
          items: [
            '<strong>Company Formation:</strong> (joint stock, limited, partnership) and issuance of commercial registrations',
            '<strong>Foreign Investment:</strong> Obtaining Ministry of Investment licenses (MISA) and establishing foreign investor companies',
            '<strong>Mergers and Acquisitions:</strong> Due Diligence and acquisition contracts',
            '<strong>Trademark Registration:</strong> and industrial designs with the Saudi Authority for Intellectual Property'
          ],
          whatsapp: 'Hello, I would like to inquire about company formation and support services'
        },
        documentation: {
          title: 'Documentation Services',
          items: [
            '<strong>Real Estate:</strong> Real estate deed transfers, mortgage documentation and release',
            '<strong>Companies:</strong> Documentation of incorporation contracts, partner decisions and amendment annexes',
            '<strong>Powers of Attorney:</strong> Issuance and revocation of powers of attorney for individuals and companies',
            '<strong>Declarations:</strong> Documentation of financial debt declarations and payment',
            '<strong>Personal Status:</strong> Documentation of marriage, divorce, khula and reconciliation contracts (for licensed persons)'
          ],
          whatsapp: 'Hello, I would like to inquire about documentation services'
        },
        execution: {
          title: 'Execution and Collection Services',
          items: [
            'Execution of local and foreign judicial rulings and arbitral awards',
            'Execution of commercial papers (checks, promissory notes, bills of exchange) through the Execution Court',
            'Follow-up on procedures for asset seizure, travel bans and asset disclosure',
            'Collection of overdue debts for companies and individuals (settlement or litigation)'
          ],
          whatsapp: 'Hello, I would like to inquire about execution and collection services'
        }
      }
    },
    // About
    about: {
      badge: 'About Us',
      title: 'A Leading Law Firm in the Kingdom',
      description1: 'Al-Haysoni Law Firm is a leading law firm in the Kingdom of Saudi Arabia, with over 10 years of experience in various legal fields. We are committed to providing high-quality legal services that align with the best professional standards.',
      description2: 'Our team of experienced lawyers works hard to ensure the protection of our clients\' rights and achieve the best results in their cases. We believe in transparency, commitment, and excellence in everything we offer.',
      description3: 'We serve our clients from two strategic offices: our office in Riyadh and our office in Qassim, enabling us to provide our legal services throughout the Kingdom with high efficiency.',
      officesTitle: 'We serve our clients from two strategic offices:',
      officesText: 'Our office in Riyadh and our office in Qassim, enabling us to provide our legal services throughout the Kingdom with high efficiency.',
      features: {
        experience: 'Extensive experience in Saudi law',
        team: 'Professional and experienced team',
        service: 'Distinguished customer service'
      },
      visualTitle: 'Justice First'
    },
    // Contact
    contact: {
      badge: 'Contact Us',
      title: 'We Are Here to Help You',
      description: 'Contact us today and get a legal consultation',
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      locationText: 'Riyadh | Qassim, Kingdom of Saudi Arabia',
      whatsappButton: 'Contact via WhatsApp',
      emailButton: 'Send Email',
      copyPhone: 'Phone number copied',
      copyEmail: 'Email copied',
      whatsappMessage: 'Hello, I would like to inquire about your legal services',
      emailSubject: 'Inquiry about legal services'
    },
    // Footer
    footer: {
      phone: 'Phone:',
      email: 'Email:',
      copyright: 'All rights reserved'
    }
  }
}
