import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      nav: {
        services: 'Услуги',
        portfolio: 'Портфолио',
        about: 'О нас',
        contact: 'Контакты',
        inquiry: 'Запрос',
        backToHome: 'Вернуться на главную'
      },
      hero: {
        est: 'Осн. 2012 — Архитектурная студия',
        title1: 'СОЗДАВАЯ',
        title2: 'ТИШИНУ',
        title3: 'В ПРОСТРАНСТВЕ',
        subtitle: 'Мы проектируем среду, которая выходит за рамки обыденного, сочетая минималистскую эстетику со структурными инновациями.',
        explore: 'Исследовать работы',
        scroll: 'Листайте'
      },
      services: {
        tag: 'Наша экспертиза',
        title: 'Целостные решения для современной жизни.',
        desc: 'От первого эскиза до последнего кирпича мы гарантируем, что каждая деталь соответствует нашему видению совершенства.',
        architecture: {
          title: 'Архитектурное планирование',
          desc: 'Освоение искусства структурной целостности и пространственной гармонии.',
          f1: 'Анализ участка',
          f2: 'Концептуальный дизайн',
          f3: 'Структурное планирование'
        },
        interior: {
          title: 'Дизайн интерьера',
          desc: 'Создание атмосферы, резонирующей с человеческими эмоциями.',
          f1: 'Оптимизация пространства',
          f2: 'Подбор материалов',
          f3: 'Дизайн освещения'
        },
        exterior: {
          title: 'Экстерьерный дизайн',
          desc: 'Определение границы между природой и архитектурой.',
          f1: 'Дизайн фасада',
          f2: 'Ландшафтная архитектура',
          f3: 'Жизнь на открытом воздухе'
        }
      },
      portfolio: {
        tag: 'Портфолио',
        title: 'Избранные работы',
        viewAll: 'Посмотреть все проекты',
        allProjects: 'Все проекты',
        allProjectsDesc: 'Исследуйте нашу полную коллекцию архитектурных чудес, интерьерных святилищ и экстерьерных ландшафтов.',
        categories: {
          architecture: 'Архитектура',
          interior: 'Интерьер',
          exterior: 'Экстерьер'
        }
      },
      steps: {
        phase: 'Фаза',
        step1: {
          title: 'Земляные работы и выемка грунта',
          desc: 'Путешествие начинается с точного анализа участка и тяжелых земляных работ. Мы подготавливаем землю, чтобы выдержать вес инноваций, обеспечивая стабильный фундамент для будущей структуры.'
        },
        step2: {
          title: 'Фундамент и вертикальная структура',
          desc: 'Железобетонные фундаменты и вертикальные колонны образуют скелет здания. Эта фаза фокусируется на структурной целостности и первом видимом подъеме архитектурной формы.'
        },
        step3: {
          title: 'Структурный каркас',
          desc: 'По мере формирования этажей становится очевидной сложность дизайна. Мы используем передовые инженерные методы для создания широких пролетов и уникальных геометрических объемов.'
        },
        step4: {
          title: 'Ограждение и фасад',
          desc: 'Здание герметизируется высокоэффективным остеклением и внешними оболочками. Здесь эстетическое видение встречается с техническими характеристиками, защищая интерьер и определяя характер.'
        },
        step5: {
          title: 'Финальная отделка',
          desc: 'Заключительный этап включает тщательную детализацию интерьера, ландшафтную интеграцию и архитектурное освещение. Мы превращаем структуру в живую, дышащую среду роскоши.'
        }
      },
      interiorSteps: {
        phase: 'Фаза',
        step1: {
          title: 'Концептуализация пространства',
          desc: 'Мы начинаем с глубокого понимания вашего образа жизни, создавая планировочные решения, которые максимизируют потенциал каждого квадратного метра.'
        },
        step2: {
          title: 'Материализация и текстуры',
          desc: 'Подбор тактильных материалов и палитр, которые создают уникальную атмосферу. Мы соединяем натуральный камень, дерево и металл в единую симфонию.'
        },
        step3: {
          title: 'Детализация и освещение',
          desc: 'Финальный штрих — интеграция умного освещения и авторских элементов декора, которые превращают интерьер в произведение искусства.'
        }
      },
      about: {
        tag: 'Наша философия',
        title: 'Мы не просто строим здания; мы создаем впечатления.',
        desc: 'В DEVARC мы верим, что архитектура — это безмолвный язык пространства. Наш подход основан на стремлении к эссенциализму — отсечении шума, чтобы раскрыть душу проекта.',
        innovation: {
          label: 'Инновации',
          desc: 'Раздвигаем границы с помощью экологичных технологий.'
        },
        precision: {
          label: 'Точность',
          desc: 'Тщательное внимание к каждому миллиметру.'
        },
        harmony: {
          label: 'Гармония',
          desc: 'Бесшовная интеграция с окружающей средой.'
        },
        years: 'Определяем будущее архитектурного совершенства с 2012 года.'
      },
      contact: {
        tag: 'Контакты',
        title: 'Готовы начать свое',
        titleAccent: 'путешествие?',
        email: 'Электронная почта',
        phone: 'Телефон',
        form: {
          name: 'Имя',
          email: 'Email',
          message: 'Сообщение',
          submit: 'Отправить запрос'
        }
      },
      footer: {
        rights: '© 2024 Студия DEVARC'
      },
      whyUs: {
        tag: 'Почему мы',
        title: 'Совершенство в каждой детали.',
        precision: {
          title: 'Точное проектирование',
          desc: 'Тщательное внимание к каждому миллиметру, гарантирующее структурное совершенство.'
        },
        sustainable: {
          title: 'Устойчивый дизайн',
          desc: 'Экологичные материалы и энергоэффективные решения для зеленого будущего.'
        },
        innovation: {
          title: 'Инновационные технологии',
          desc: 'Использование VR и продвинутого 3D-моделирования для визуализации вашей мечты.'
        },
        client: {
          title: 'Клиентоориентированность',
          desc: 'Ваше видение — наш чертеж. Мы ставим в приоритет персонализированный подход.'
        }
      }
    }
  },
  en: {
    translation: {
      nav: {
        services: 'Services',
        portfolio: 'Portfolio',
        about: 'About',
        contact: 'Contact',
        inquiry: 'Inquiry',
        backToHome: 'Back to Home'
      },
      hero: {
        est: 'Est. 2012 — Architecture Studio',
        title1: 'CRAFTING',
        title2: 'SILENCE',
        title3: 'IN SPACE',
        subtitle: 'We design environments that transcend the ordinary, blending minimalist aesthetics with structural innovation.',
        explore: 'Explore Works',
        scroll: 'Scroll'
      },
      services: {
        tag: 'Our Expertise',
        title: 'Holistic solutions for modern living.',
        desc: 'From the first sketch to the final brick, we ensure every detail aligns with our vision of perfection.',
        architecture: {
          title: 'Architecture Planning',
          desc: 'Mastering the art of structural integrity and spatial harmony.',
          f1: 'Site Analysis',
          f2: 'Conceptual Design',
          f3: 'Structural Planning'
        },
        interior: {
          title: 'Interior Design',
          desc: 'Curating atmospheres that resonate with human emotion.',
          f1: 'Space Optimization',
          f2: 'Material Selection',
          f3: 'Lighting Design'
        },
        exterior: {
          title: 'Exterior Design',
          desc: 'Defining the boundary between nature and architecture.',
          f1: 'Facade Design',
          f2: 'Landscape Architecture',
          f3: 'Outdoor Living'
        }
      },
      portfolio: {
        tag: 'Portfolio',
        title: 'Selected Works',
        viewAll: 'View All Projects',
        allProjects: 'All Projects',
        allProjectsDesc: 'Explore our complete collection of architectural marvels, interior sanctuaries, and exterior landscapes.',
        categories: {
          architecture: 'Architecture',
          interior: 'Interior',
          exterior: 'Exterior'
        }
      },
      steps: {
        phase: 'Phase',
        step1: {
          title: 'Groundwork & Excavation',
          desc: 'The journey begins with precision site analysis and heavy-duty excavation. We prepare the earth to support the weight of innovation, ensuring a stable foundation for the structure to come.'
        },
        step2: {
          title: 'Foundation & Vertical Structure',
          desc: 'Reinforced concrete footings and vertical columns form the skeleton of the building. This phase focuses on structural integrity and the first visible rise of the architectural form.'
        },
        step3: {
          title: 'Structural Framing',
          desc: 'As the floors take shape, the complexity of the design becomes apparent. We use advanced engineering techniques to create expansive spans and unique geometric volumes.'
        },
        step4: {
          title: 'Enclosure & Facade',
          desc: 'The building is sealed with high-performance glazing and exterior shells. This is where the aesthetic vision meets technical performance, protecting the interior while defining the character.'
        },
        step5: {
          title: 'Final Finishing',
          desc: 'The final touch involves meticulous interior detailing, landscape integration, and architectural lighting. We transform a structure into a living, breathing environment of luxury.'
        }
      },
      interiorSteps: {
        phase: 'Phase',
        step1: {
          title: 'Space Conceptualization',
          desc: 'We begin with a deep understanding of your lifestyle, creating layout solutions that maximize the potential of every square meter.'
        },
        step2: {
          title: 'Materialization & Textures',
          desc: 'Selection of tactile materials and palettes that create a unique atmosphere. We combine natural stone, wood, and metal into a single symphony.'
        },
        step3: {
          title: 'Detailing & Lighting',
          desc: 'The final touch is the integration of smart lighting and custom decor elements that turn the interior into a work of art.'
        }
      },
      about: {
        tag: 'Our Philosophy',
        title: "We don't just build structures; we create experiences.",
        desc: 'At DEVARC, we believe that architecture is the silent language of space. Our approach is rooted in the pursuit of essentialism—stripping away the noise to reveal the soul of a project.',
        innovation: {
          label: 'Innovation',
          desc: 'Pushing boundaries with sustainable tech.'
        },
        precision: {
          label: 'Precision',
          desc: 'Meticulous attention to every millimeter.'
        },
        harmony: {
          label: 'Harmony',
          desc: 'Seamless integration with the environment.'
        },
        years: 'Defining the future of architectural excellence since 2012.'
      },
      contact: {
        tag: 'Contact',
        title: 'Ready to start your',
        titleAccent: 'journey?',
        email: 'Email',
        phone: 'Phone',
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          submit: 'Send Inquiry'
        }
      },
      footer: {
        rights: '© 2024 DEVARC Studio'
      },
      whyUs: {
        tag: 'Why Choose Us',
        title: 'Excellence in every detail.',
        precision: {
          title: 'Precision Engineering',
          desc: 'Meticulous attention to every millimeter, ensuring structural perfection.'
        },
        sustainable: {
          title: 'Sustainable Design',
          desc: 'Eco-friendly materials and energy-efficient solutions for a greener future.'
        },
        innovation: {
          title: 'Innovative Technology',
          desc: 'Utilizing VR and advanced 3D modeling to visualize your dream before it’s built.'
        },
        client: {
          title: 'Client-Centric',
          desc: 'Your vision is our blueprint. We prioritize personalized design journeys.'
        }
      }
    }
  },
  uz: {
    translation: {
      nav: {
        services: 'Xizmatlar',
        portfolio: 'Portfolio',
        about: 'Biz haqimizda',
        contact: 'Aloqa',
        inquiry: 'Soʻrov',
        backToHome: 'Bosh sahifaga qaytish'
      },
      hero: {
        est: 'Asos. 2012 — Arxitektura studiyasi',
        title1: 'FAZODA',
        title2: 'SUKUNAT',
        title3: 'YARATIB',
        subtitle: 'Biz minimalist estetika va tarkibiy innovatsiyalarni birlashtirgan holda, odatdagidan tashqari muhitlarni loyihalashtiramiz.',
        explore: 'Ishlarni koʻrish',
        scroll: 'Varaqlang'
      },
      services: {
        tag: 'Bizning tajribamiz',
        title: 'Zamonaviy hayot uchun yaxlit yechimlar.',
        desc: 'Birinchi eskizdan tortib oxirgi gʻishtgacha, har bir detal bizning mukammallik haqidagi tasavvurimizga mos kelishini taʼminlaymiz.',
        architecture: {
          title: 'Arxitektura rejalashtirish',
          desc: 'Struktura yaxlitligi va fazoviy uygʻunlik sanʼatini egallash.',
          f1: 'Uchastka tahlili',
          f2: 'Kontseptual dizayn',
          f3: 'Struktura rejalashtirish'
        },
        interior: {
          title: 'Interyer dizayni',
          desc: 'Inson tuygʻulari bilan hamohang muhit yaratish.',
          f1: 'Fazoni optimallashtirish',
          f2: 'Materiallar tanlovi',
          f3: 'Yoritish dizayni'
        },
        exterior: {
          title: 'Eksteryer dizayni',
          desc: 'Tabiat va arxitektura oʻrtasidagi chegarani belgilash.',
          f1: 'Fasad dizayni',
          f2: 'Landshaft arxitekturasi',
          f3: 'Ochiq havoda hayot'
        }
      },
      portfolio: {
        tag: 'Portfolio',
        title: 'Tanlangan ishlar',
        viewAll: 'Barcha loyihalarni koʻrish',
        allProjects: 'Barcha loyihalar',
        allProjectsDesc: 'Bizning arxitektura moʻjizalari, interyer maskanlari va eksteryer landshaftlarining toʻliq toʻplamini oʻrganing.',
        categories: {
          architecture: 'Arxitektura',
          interior: 'Interyer',
          exterior: 'Eksteryer'
        }
      },
      steps: {
        phase: 'Bosqich',
        step1: {
          title: 'Yer ishlari va qazish',
          desc: 'Sayohat uchastkani aniq tahlil qilish va ogʻir yer ishlari bilan boshlanadi. Biz innovatsiyalar ogʻirligini koʻtarish uchun yerni tayyorlaymiz va kelajakdagi struktura uchun barqaror poydevorni taʼminlaymiz.'
        },
        step2: {
          title: 'Poydevor va vertikal struktura',
          desc: 'Temir-beton poydevorlar va vertikal ustunlar binoning skeletini hosil qiladi. Ushbu bosqich struktura yaxlitligiga va arxitektura shaklining birinchi koʻrinadigan koʻtarilishiga qaratilgan.'
        },
        step3: {
          title: 'Struktura karkasi',
          desc: 'Qavatlar shakllangani sayin dizaynning murakkabligi ayon boʻladi. Biz keng oraliqlar va noyob geometrik hajmlarni yaratish uchun ilgʻor muhandislik usullaridan foydalanamiz.'
        },
        step4: {
          title: 'Toʻsiq va fasad',
          desc: 'Bino yuqori samarali oynalar va tashqi qobiqlar bilan yopiladi. Bu yerda estetik qarash texnik xususiyatlar bilan uchrashadi, interyerni himoya qiladi va xarakterni belgilaydi.'
        },
        step5: {
          title: 'Yakuniy pardozlash',
          desc: 'Yakuniy bosqich interyerni sinchkovlik bilan detallash, landshaft integratsiyasi va arxitektura yoritishni oʻz ichiga oladi. Biz strukturani hashamatli, jonli muhitga aylantiramiz.'
        }
      },
      interiorSteps: {
        phase: 'Bosqich',
        step1: {
          title: 'Fazo kontseptualizatsiyasi',
          desc: 'Biz sizning turmush tarzingizni chuqur tushunishdan boshlaymiz, har bir kvadrat metrning potentsialini maksimal darajada oshiradigan rejalashtirish yechimlarini yaratamiz.'
        },
        step2: {
          title: 'Materializatsiya va teksturalar',
          desc: 'Noyob muhit yaratadigan taktil materiallar va palitralarni tanlash. Biz tabiiy tosh, yogʻoch va metallni yagona simfoniyaga birlashtiramiz.'
        },
        step3: {
          title: 'Detallashtirish va yoritish',
          desc: 'Yakuniy shtrix — aqlli yoritish va mualliflik dekor elementlarining integratsiyasi boʻlib, ular interyerni sanʼat asariga aylantiradi.'
        }
      },
      about: {
        tag: 'Bizning falsafamiz',
        title: 'Biz shunchaki binolar qurmaymiz; biz taassurotlar yaratamiz.',
        desc: 'DEVARCʼda biz arxitektura fazoning sokin tili ekanligiga ishonamiz. Bizning yondashuvimiz essentsializmga intilishga asoslangan — loyihaning ruhini ochish uchun shovqinni olib tashlash.',
        innovation: {
          label: 'Innovatsiya',
          desc: 'Barqaror texnologiyalar bilan chegaralarni kengaytirish.'
        },
        precision: {
          label: 'Aniqlik',
          desc: 'Har bir millimetrga sinchkovlik bilan eʼtibor.'
        },
        harmony: {
          label: 'Uygʻunlik',
          desc: 'Atrof-muhit bilan uzviy integratsiya.'
        },
        years: '2012-yildan beri arxitektura mukammalligi kelajagini belgilab kelmoqdamiz.'
      },
      contact: {
        tag: 'Aloqa',
        title: 'Sayohatni boshlashga',
        titleAccent: 'tayyormisiz?',
        email: 'Elektron pochta',
        phone: 'Telefon',
        form: {
          name: 'Ism',
          email: 'Email',
          message: 'Xabar',
          submit: 'Soʻrov yuborish'
        }
      },
      footer: {
        rights: '© 2024 DEVARC studiyasi'
      },
      whyUs: {
        tag: 'Nega biz',
        title: 'Har bir detalda mukammallik.',
        precision: {
          title: 'Aniq loyihalash',
          desc: 'Har bir millimetrga sinchkovlik bilan eʼtibor, struktura mukammalligini kafolatlaydi.'
        },
        sustainable: {
          title: 'Barqaror dizayn',
          desc: 'Yashil kelajak uchun ekologik toza materiallar va energiya tejovchi yechimlar.'
        },
        innovation: {
          title: 'Innovatsion texnologiyalar',
          desc: 'Orzuingizni vizuallashtirish uchun VR va ilgʻor 3D modellashtirishdan foydalanish.'
        },
        client: {
          title: 'Mijozga yoʻnaltirilganlik',
          desc: 'Sizning qarashingiz — bizning chizmamiz. Biz shaxsiy yondashuvni birinchi oʻringa qoʻyamiz.'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // Russian by default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
