/* ========================================
   SARGUZASHT — Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---- Mobile navigation ----
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    mobileNavClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Pricing toggle (monthly / yearly) ----
  const pricingToggle = document.getElementById('pricingToggle');
  const toggleMonthly = document.getElementById('toggleMonthly');
  const toggleYearly = document.getElementById('toggleYearly');
  let isYearly = false;

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      isYearly = !isYearly;
      pricingToggle.classList.toggle('active', isYearly);
      toggleMonthly.classList.toggle('active', !isYearly);
      toggleYearly.classList.toggle('active', isYearly);

      // Update prices
      document.querySelectorAll('.pricing-amount').forEach(el => {
        const monthly = el.dataset.monthly;
        const yearly = el.dataset.yearly;
        if (monthly && yearly) {
          const priceValue = el.querySelector('.price-value');
          if (priceValue) {
            // Animate price change
            priceValue.style.transform = 'translateY(-10px)';
            priceValue.style.opacity = '0';
            setTimeout(() => {
              priceValue.textContent = isYearly ? yearly : monthly;
              priceValue.style.transform = 'translateY(10px)';
              setTimeout(() => {
                priceValue.style.transform = 'translateY(0)';
                priceValue.style.opacity = '1';
              }, 50);
            }, 150);
          }
        }
      });
    });

    // Transition styles for price values
    document.querySelectorAll('.price-value').forEach(el => {
      el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.display = 'inline-block';
    });
  }

  // ---- Scroll reveal animations ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Animated counter for hero stats ----
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * (end - start) + start);
      
      if (end >= 1000) {
        element.textContent = (current / 1000).toFixed(0) + 'K+';
      } else {
        element.textContent = current + '+';
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValues = entry.target.querySelectorAll('.hero-stat-value');
        const targets = [150, 1000, 50000];
        statValues.forEach((el, i) => {
          setTimeout(() => {
            animateValue(el, 0, targets[i], 2000);
          }, i * 200);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // ---- Map pin hover tooltips ----
  const mapPins = document.querySelectorAll('.map-pin');
  mapPins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      pin.style.zIndex = '10';
    });
    pin.addEventListener('mouseleave', () => {
      pin.style.zIndex = '2';
    });
  });

  // ---- Parallax effect on hero orbs ----
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll('.hero-orb').forEach((orb, i) => {
      const speed = (i + 1) * 10;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ---- Language switch ----
  const langSwitch = document.getElementById('langSwitch');
  const languages = ['UZ', 'RU', 'EN'];
  let currentLangIndex = 0;

  const translations = {
    RU: {
      nav_how: 'Как это работает',
      nav_features: 'Возможности',
      nav_rewards: 'Награды',
      nav_pricing: 'Подписка',
      nav_partners: 'Партнёры',
      nav_start: 'Начать',
      hero_badge: 'Первая геймифицированная платформа в Центральной Азии',
      hero_title: 'Преобразите каждый день в <span class="text-gradient">приключение</span>',
      hero_desc: 'Не тратьте время зря. Откройте город, выполняйте задания, зарабатывайте баллы и выигрывайте реальные награды — от бесплатной еды до поездки в другой город!',
      hero_cta: '🚀 Начать приключение',
      hero_cta2: 'Как это работает?',
      stat_cities: 'Города и локации',
      stat_quests: 'Заданий',
      stat_users: 'Приключенцев',
      phone_greeting: 'Здравствуйте 👋',
      quest1_title: 'Попробовать национальную кухню',
      quest1_city: 'Бухара',
      quest2_title: 'Открыть новый город',
      quest2_city: 'Самарканд',
      quest3_title: 'Посещение музея',
      quest3_place: 'Музей Амир Темура, Ташкент',
      float_winner: 'Победитель недели!',
      float_lunch: 'Бесплатный обед!',
      float_reward: 'Награда открыта',
      float_quests: '3 задания',
      float_done: 'Выполнено сегодня',
      how_label: 'Как это работает',
      how_title: '4 простых шага, чтобы начать <span class="text-gradient">ваше приключение</span>',
      how_subtitle: 'Зарегистрируйтесь, выполните задания, наберите баллы и получите настоящие призы.',
      step1_title: 'Зарегистрируйтесь',
      step1_desc: 'Создайте профиль и выберите интересы — еда, путешествия, культура или спорт.',
      step2_title: 'Получайте задания',
      step2_desc: 'Получайте ежедневные приключения и задания на основе местоположения и интересов.',
      step3_title: 'Зарабатывайте баллы',
      step3_desc: 'Выполняйте задачи на локациях и собирайте XP.',
      step4_title: 'Получайте награды',
      step4_desc: 'Обменивайте очки на бесплатную еду, поездки и специальные предложения.',
      feat_label: 'Возможности',
      feat_title: 'Для каждого <span class="text-gradient-warm">приключенца</span>',
      feat_subtitle: 'От простых пользователей до туристов — платформа для всех.',
      f1_title: 'Умное планирование',
      f1_desc: 'AI создаёт ежедневный план с учётом времени, местоположения и интересов.',
      f2_title: 'Система геймификации',
      f2_desc: 'XP, уровни, достижения и рейтинги. Каждый шаг приближает к награде.',
      f3_title: 'Реальные награды',
      f3_desc: 'Бесплатная еда, скидки, поездки на 1-2 дня — не виртуально, а по-настоящему!',
      f4_title: 'Путешествия и интеграции',
      f4_desc: 'Интеграция с Aviasales и iTicket — бронируйте билеты прямо в приложении.',
      f5_title: 'Интерактивная карта',
      f5_desc: 'Все приключенческие точки, рестораны, музеи и достопримечательности Центральной Азии.',
      f6_title: 'Командные приключения',
      f6_desc: 'Проходите задания с друзьями и получайте групповые награды.',
      map_label: 'Карта приключений',
      map_title: 'Откройте Центральную Азию <span class="text-gradient">по-новому</span>',
      map_subtitle: 'Сотни приключенческих точек ждут вас в Узбекистане и соседних странах.',
      city_tashkent: 'Ташкент',
      city_samarkand: 'Самарканд',
      city_bukhara: 'Бухара',
      city_fergana: 'Фергана',
      city_bishkek: 'Бишкек',
      city_dushanbe: 'Душанбе',
      city_almaty: 'Алматы',
      city_khiva: 'Хива',
      rew_label: 'Система наград',
      rew_title: 'Больше приключений = <span class="text-gradient-warm">больше наград</span>',
      rew_subtitle: 'Чем больше заданий вы выполните, тем крупнее призы получите.',
      lvl_bronze: 'Бронзовый уровень — 0-500 XP',
      lvl_bronze_desc: 'Скидки в кафе, бесплатные напитки и специальные промокоды.',
      lvl_silver: 'Серебряный уровень — 500-2000 XP',
      lvl_silver_desc: 'Бесплатный обед, специальные предложения в ресторанах и премиум-задания.',
      lvl_gold: 'Золотой уровень — 2000-5000 XP',
      lvl_gold_desc: 'Бесплатная 1-2 дневная поездка и VIP-события.',
      lvl_diamond: 'Алмазный уровень — 5000+ XP',
      lvl_diamond_desc: 'Международные поездки, эксклюзивные события и статус посла.',
      price_label: 'Планы подписки',
      price_title: 'Выберите своё <span class="text-gradient">приключение</span>',
      price_subtitle: 'План для каждого приключенца. Чем выше подписка, тем крупнее награды!',
      toggle_monthly: 'Ежемесячно',
      toggle_yearly: 'Ежегодно',
      toggle_save: '-25% экономия',
      plan1_name: 'Начальный',
      plan1_desc: 'Для пробного приключения',
      plan1_price: 'Бесплатно',
      plan1_f1: '2 задания в день',
      plan1_f2: 'Основная карта',
      plan1_f3: 'Награды до бронзового уровня',
      plan1_f4: 'Командная система',
      plan1_btn: 'Начать бесплатно',
      plan_popular: 'Самый популярный',
      plan2_name: 'Pro Приключенец',
      plan2_desc: 'Для серьёзных приключенцев',
      price_per_month: '/мес',
      plan2_f1: 'Безлимитные задания',
      plan2_f2: 'Премиальная карта и маршруты',
      plan2_f3: 'Награды до золотого уровня',
      plan2_f4: 'Интеграция Aviasales/iTicket',
      plan2_f5: 'Приоритетная поддержка',
      plan2_btn: 'Выбрать Pro подписку',
      plan3_desc: 'Максимальный опыт приключений',
      plan3_f1: 'Все возможности Pro',
      plan3_f2: 'Награды до алмазного уровня',
      plan3_f3: 'VIP-события и экскурсии',
      plan3_f4: 'Личный приключенческий консультант',
      plan3_f5: 'Возможность международных поездок',
      plan3_btn: 'Выбрать Elite',
      test_label: 'Отзывы',
      test_title: 'Что говорят <span class="text-gradient">приключенцы</span>',
      test1_text: '«Раньше я не знал, как провести выходные. Теперь каждую неделю открываю новое место и даже выиграл бесплатный обед!»',
      test1_name: 'Сардор Каримов',
      test1_role: 'Ташкент, разработчик',
      test2_text: '«Когда путешествовал в Самарканд, использовал это приложение. Это было гораздо интереснее обычного тура, и я открыл много новых мест!»',
      test2_name: 'Мария Петрова',
      test2_role: 'Москва, турист',
      test3_text: '«Отличная реклама для ресторанов. Наши клиенты выросли на 40%. Сотрудничество очень выгодное!»',
      test3_name: 'Азиз Рахимов',
      test3_role: 'Бухара, владелец ресторана',
      part_label: 'Партнёры',
      part_title: 'С надёжными <span class="text-gradient">партнёрами</span>',
      part_subtitle: 'Интеграция с лучшими туристическими сервисами — бронируйте билеты легко.',
      part_avia: 'Авиабилеты',
      part_ticket: 'События и билеты',
      part_hotels: 'Отели',
      part_hotels_type: 'Жильё',
      part_rest: 'Рестораны',
      part_rest_type: 'Точки питания',
      part_desc_html: 'Наша модель партнёрства — ежемесячная или годовая реклама для владельцев локаций. Ваше место будут открывать и посещать тысячи приключенцев. <strong>Хотите стать партнёром?</strong>',
      cta_title: 'Начните своё первое приключение сегодня! 🚀',
      cta_desc: 'Присоединяйтесь к 50 000+ приключенцам и делайте каждый день интересным, полезным и наградным.',
      cta_btn1: 'Бесплатная регистрация',
      cta_btn2: 'Узнать больше',
      footer_desc: 'Пусть каждый день станет приключением. Платформа путешествий и открытий с геймификацией по Узбекистану и Центральной Азии.',
      footer_platform: 'Платформа',
      footer_prices: 'Цены',
      footer_partnership: 'Партнёрство',
      footer_rest_owners: 'Владельцам ресторанов',
      footer_hotels: 'Отели',
      footer_agencies: 'Туристические агентства',
      footer_advertisers: 'Рекламодателям',
      footer_support: 'Поддержка',
      footer_help: 'Центр помощи',
      footer_contact: 'Контакты',
      footer_privacy: 'Политика конфиденциальности',
      footer_terms: 'Условия использования',
      footer_copy: '© 2026 Sarguzasht. Все права защищены.',
      footer_priv_short: 'Конфиденциальность',
      footer_terms_short: 'Условия'
    },
    EN: {
      nav_how: 'How it works',
      nav_features: 'Features',
      nav_rewards: 'Rewards',
      nav_pricing: 'Pricing',
      nav_partners: 'Partners',
      nav_start: 'Start',
      hero_badge: 'The first gamified platform in Central Asia',
      hero_title: 'Turn every day into an <span class="text-gradient">adventure</span>',
      hero_desc: 'Don’t waste time. Explore your city, complete quests, earn points and win real rewards — from free meals to city trips!',
      hero_cta: '🚀 Start adventure',
      hero_cta2: 'How it works?',
      stat_cities: 'Cities & locations',
      stat_quests: 'Quests',
      stat_users: 'Adventurers',
      phone_greeting: 'Hello 👋',
      quest1_title: 'Try local cuisine',
      quest1_city: 'Bukhara',
      quest2_title: 'Discover a new city',
      quest2_city: 'Samarkand',
      quest3_title: 'Museum visit',
      quest3_place: 'Amir Temur Museum, Tashkent',
      float_winner: 'Weekly winner!',
      float_lunch: 'Free lunch!',
      float_reward: 'Reward unlocked',
      float_quests: '3 quests',
      float_done: 'Done today',
      how_label: 'How it works',
      how_title: '4 easy steps to start your <span class="text-gradient">adventure</span>',
      how_subtitle: 'Sign up, complete quests, earn points and claim real rewards.',
      step1_title: 'Sign up',
      step1_desc: 'Create your profile and choose interests — food, travel, culture or sports.',
      step2_title: 'Get quests',
      step2_desc: 'Receive daily adventures and quests based on your location and interests.',
      step3_title: 'Earn points',
      step3_desc: 'Complete tasks at locations and collect XP.',
      step4_title: 'Claim rewards',
      step4_desc: 'Redeem points for free meals, travels and special offers.',
      feat_label: 'Features',
      feat_title: 'For every <span class="text-gradient-warm">adventurer</span>',
      feat_subtitle: 'From locals to tourists — a platform for everyone.',
      f1_title: 'Smart planning',
      f1_desc: 'AI builds your daily plan based on time, location and interests.',
      f2_title: 'Gamification system',
      f2_desc: 'XP points, levels, achievements and rankings. Every step brings you closer to rewards.',
      f3_title: 'Real rewards',
      f3_desc: 'Free meals, discounts, 1-2 day city trips — real rewards, not virtual!',
      f4_title: 'Travel integration',
      f4_desc: 'Integration with Aviasales and iTicket — book tickets directly in-app.',
      f5_title: 'Interactive map',
      f5_desc: 'All adventure spots, restaurants, museums and attractions across Central Asia.',
      f6_title: 'Team adventures',
      f6_desc: 'Complete quests with friends and earn team rewards.',
      map_label: 'Adventure map',
      map_title: 'Discover Central Asia <span class="text-gradient">your way</span>',
      map_subtitle: 'Hundreds of adventure spots await across Uzbekistan and neighboring countries.',
      city_tashkent: 'Tashkent',
      city_samarkand: 'Samarkand',
      city_bukhara: 'Bukhara',
      city_fergana: 'Fergana',
      city_bishkek: 'Bishkek',
      city_dushanbe: 'Dushanbe',
      city_almaty: 'Almaty',
      city_khiva: 'Khiva',
      rew_label: 'Rewards system',
      rew_title: 'More adventures = <span class="text-gradient-warm">bigger rewards</span>',
      rew_subtitle: 'The more quests you complete, the bigger the rewards.',
      lvl_bronze: 'Bronze level — 0-500 XP',
      lvl_bronze_desc: 'Café discounts, free drinks and special promo codes.',
      lvl_silver: 'Silver level — 500-2000 XP',
      lvl_silver_desc: 'Free lunch, special restaurant offers and premium quests.',
      lvl_gold: 'Gold level — 2000-5000 XP',
      lvl_gold_desc: 'Free 1-2 day city trips and VIP events.',
      lvl_diamond: 'Diamond level — 5000+ XP',
      lvl_diamond_desc: 'International travel, exclusive events and Ambassador status.',
      price_label: 'Subscription plans',
      price_title: 'Choose your <span class="text-gradient">adventure</span>',
      price_subtitle: 'A plan for every adventurer. Higher tier, bigger rewards!',
      toggle_monthly: 'Monthly',
      toggle_yearly: 'Yearly',
      toggle_save: '-25% save',
      plan1_name: 'Starter',
      plan1_desc: 'For trying the adventure',
      plan1_price: 'Free',
      plan1_f1: '2 quests per day',
      plan1_f2: 'Basic map',
      plan1_f3: 'Rewards up to Bronze',
      plan1_f4: 'Team system',
      plan1_btn: 'Start free',
      plan_popular: 'Most popular',
      plan2_name: 'Pro Adventurer',
      plan2_desc: 'For serious adventurers',
      price_per_month: '/mo',
      plan2_f1: 'Unlimited quests',
      plan2_f2: 'Premium map and routes',
      plan2_f3: 'Rewards up to Gold',
      plan2_f4: 'Aviasales/iTicket integration',
      plan2_f5: 'Priority support',
      plan2_btn: 'Choose Pro plan',
      plan3_desc: 'The ultimate adventure experience',
      plan3_f1: 'All Pro features',
      plan3_f2: 'Rewards up to Diamond',
      plan3_f3: 'VIP events and excursions',
      plan3_f4: 'Personal adventure coach',
      plan3_f5: 'International travel options',
      plan3_btn: 'Choose Elite',
      test_label: 'Testimonials',
      test_title: 'What adventurers <span class="text-gradient">say</span>',
      test1_text: '"I used to not know how to spend weekends. Now I discover a new place every week and even won a free lunch!"',
      test1_name: 'Sardor Karimov',
      test1_role: 'Tashkent, developer',
      test2_text: '"I used this app on a trip to Samarkand. It was much more exciting than a normal tour and I discovered many new spots!"',
      test2_name: 'Maria Petrova',
      test2_role: 'Moscow, tourist',
      test3_text: '"Great promo for restaurants. Our customers increased by 40%. The partnership is very profitable!"',
      test3_name: 'Aziz Rahimov',
      test3_role: 'Bukhara, restaurant owner',
      part_label: 'Partners',
      part_title: 'With trusted <span class="text-gradient">partners</span>',
      part_subtitle: 'Integration with top travel services — book tickets easily.',
      part_avia: 'Flights',
      part_ticket: 'Events & tickets',
      part_hotels: 'Hotels',
      part_hotels_type: 'Accommodation',
      part_rest: 'Restaurants',
      part_rest_type: 'Dining spots',
      part_desc_html: 'Our partnership model is a monthly or yearly advertising subscription for location owners. Your place will be discovered and visited by thousands of adventurers. <strong>Want to become a partner?</strong>',
      cta_title: 'Start your first adventure today! 🚀',
      cta_desc: 'Join 50,000+ adventurers and make every day exciting, rewarding and fun.',
      cta_btn1: 'Free sign up',
      cta_btn2: 'Learn more',
      footer_desc: 'Make every day an adventure. A gamified travel and discovery platform across Uzbekistan and Central Asia.',
      footer_platform: 'Platform',
      footer_prices: 'Pricing',
      footer_partnership: 'Partnership',
      footer_rest_owners: 'Restaurant owners',
      footer_hotels: 'Hotels',
      footer_agencies: 'Travel agencies',
      footer_advertisers: 'Advertisers',
      footer_support: 'Support',
      footer_help: 'Help center',
      footer_contact: 'Contact',
      footer_privacy: 'Privacy policy',
      footer_terms: 'Terms of service',
      footer_copy: '© 2026 Sarguzasht. All rights reserved.',
      footer_priv_short: 'Privacy',
      footer_terms_short: 'Terms'
    }
  };

  function applyTranslations(lang) {
    const translationData = translations[lang];
    if (!translationData) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = translationData[key];
      if (!value) return;

      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.documentElement.lang = lang.toLowerCase();
  }

  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      currentLangIndex = (currentLangIndex + 1) % languages.length;
      const newLang = languages[currentLangIndex];
      langSwitch.textContent = '🌐 ' + newLang;
      applyTranslations(newLang);

      // Add a subtle animation
      langSwitch.style.transform = 'scale(0.9)';
      setTimeout(() => {
        langSwitch.style.transform = 'scale(1)';
      }, 150);
    });
    langSwitch.style.transition = 'transform 0.15s ease';
  }

  // ---- Typing effect for hero title ----
  // (already handled by CSS animation, but we add a subtle glow effect)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
      heroTitle.style.textShadow = '0 0 40px rgba(76,110,245,0.3)';
    });
    heroTitle.addEventListener('mouseleave', () => {
      heroTitle.style.textShadow = 'none';
    });
    heroTitle.style.transition = 'text-shadow 0.5s ease';
  }

  // ---- Reward level hover glow ----
  document.querySelectorAll('.reward-level').forEach(level => {
    level.addEventListener('mouseenter', () => {
      const icon = level.querySelector('.reward-level-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(5deg)';
      }
    });
    level.addEventListener('mouseleave', () => {
      const icon = level.querySelector('.reward-level-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  document.querySelectorAll('.reward-level-icon').forEach(icon => {
    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });

  // ---- Feature card tilt effect ----
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });

    card.style.transition = 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  });

  // ---- Quest card animation in phone mockup ----
  const questCards = document.querySelectorAll('.phone-quest-card');
  let currentQuest = 0;

  function highlightQuest() {
    questCards.forEach((card, i) => {
      if (i === currentQuest) {
        card.style.background = 'rgba(76,110,245,0.12)';
        card.style.borderColor = 'rgba(76,110,245,0.25)';
      } else {
        card.style.background = 'rgba(255,255,255,0.06)';
        card.style.borderColor = 'rgba(255,255,255,0.1)';
      }
    });
    currentQuest = (currentQuest + 1) % questCards.length;
  }

  questCards.forEach(card => {
    card.style.transition = 'background 0.5s ease, border-color 0.5s ease';
  });

  setInterval(highlightQuest, 3000);

  // ---- Particle dots background for CTA ----
  const ctaBox = document.querySelector('.cta-box');
  if (ctaBox) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(255,255,255,${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: ctaParticle ${Math.random() * 4 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
        pointer-events: none;
      `;
      ctaBox.appendChild(particle);
    }

    // Add keyframe for particles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ctaParticle {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        50% { transform: translateY(-40px) translateX(-5px); opacity: 0.5; }
        75% { transform: translateY(-20px) translateX(15px); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }

  console.log('🧭 Sarguzasht — Har kuningizni sarguzashtga aylantiring!');
});
