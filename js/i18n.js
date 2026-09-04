const translations = {
  pt: {
    meta: {
      title: "Kauan Borges | Portfólio",
      description:
        "Portfólio de Kauan Borges, estudante de Ciência da Computação e desenvolvedor web em formação. Projetos com HTML, CSS, JavaScript, React e Node.js.",
    },
    skip: "Pular para o conteúdo",
    menu: "Abrir menu",
    nav: {
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      contact: "Contato",
      lang: "Idioma",
    },
    hero: {
      tag: "Portfólio de Desenvolvedor",
      role: "Desenvolvedor web em formação",
      text: "Estudante de Ciência da Computação no 5º período. Construo interfaces claras, responsivas e funcionais — e já publico projetos com HTML, CSS, JavaScript, React e Node.js.",
      projects: "Ver projetos",
      contact: "Falar comigo",
      stat1: "5º",
      stat1Label: "período em Ciência da Computação",
      stat2Label: "tecnologias em uso nos projetos",
      stat3Label: "projetos publicados com código aberto",
      photo: "Foto de Kauan Borges",
    },
    about: {
      kicker: "Sobre mim",
      title: "Quem sou eu",
      p1: "Olá, eu sou Kauan Borges. Curso Ciência da Computação e desenvolvo produtos web do layout à lógica: sites institucionais, apps com API e um sistema financeiro com autenticação.",
      p2: 'Meus trabalhos recentes incluem o <a href="#projetos">BgConverter</a>, o <a href="#projetos">BG Finance</a> e o site <a href="#projetos">Pratique + Pilates</a>. Gosto de evoluir em time, receber feedback e entregar interfaces úteis para pessoas reais.',
    },
    skills: {
      kicker: "Skills",
      title: "Tecnologias que utilizo",
      html: "Estrutura semântica, acessibilidade básica e páginas bem organizadas.",
      css: "Layout responsivo, hierarquia visual e componentes reutilizáveis.",
      js: "Interatividade, consumo de APIs e lógica no front-end.",
      react: "Interfaces em componentes e estados para telas dinâmicas.",
      node: "APIs, autenticação e backend para o BG Finance.",
      git: "Versionamento, publicação e histórico aberto dos projetos.",
    },
    projects: {
      kicker: "Projetos",
      title: "Trabalhos em destaque",
      view: "Ver projeto",
      code: "Ver código",
      converter:
        "Conversor de moedas com cotação em tempo real via API. Foco em consumo de dados, layout responsivo e uso simples.",
      converterAlt: "Tela do conversor de moedas BgConverter",
      finance:
        "Controle de receitas e despesas com login, dashboard e fluxo de usuário. Stack de backend + front-end para um produto completo.",
      financeAlt: "Interface do sistema BG Finance",
      pilates:
        "Site institucional para um estúdio: serviços claros, navegação simples e CTAs visíveis para o público entrar em contato.",
      pilatesAlt: "Site do estúdio Pratique + Pilates",
    },
    resume: {
      kicker: "Currículo",
      title: "Formação e experiência",
      text: "Currículo com formação, stack e projetos. Use o PDF em processos seletivos ou para uma leitura rápida do meu perfil.",
      view: "Visualizar currículo",
      download: "Baixar PDF",
      file: "./Curriculo_Kauan_Borges.pdf",
      downloadName: "Curriculo_Kauan_Borges.pdf",
    },
    contact: {
      kicker: "Contato",
      title: "Vamos conversar",
      email: "E-mail",
    },
    footer: "© {year} Kauan Borges. Todos os direitos reservados.",
  },
  en: {
    meta: {
      title: "Kauan Borges | Portfolio",
      description:
        "Portfolio of Kauan Borges, Computer Science student and web developer in training. Projects with HTML, CSS, JavaScript, React, and Node.js.",
    },
    skip: "Skip to content",
    menu: "Open menu",
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      lang: "Language",
    },
    hero: {
      tag: "Developer Portfolio",
      role: "Web developer in training",
      text: "Computer Science student in the 5th semester. I build clear, responsive interfaces — and ship projects with HTML, CSS, JavaScript, React, and Node.js.",
      projects: "View projects",
      contact: "Email me",
      stat1: "5th",
      stat1Label: "semester in Computer Science",
      stat2Label: "technologies used in shipped work",
      stat3Label: "public projects with source code",
      photo: "Photo of Kauan Borges",
    },
    about: {
      kicker: "About me",
      title: "Who I am",
      p1: "I’m Kauan Borges, a Computer Science student building web products from layout to logic: marketing sites, API-driven apps, and a finance system with authentication.",
      p2: 'Recent work includes <a href="#projetos">BgConverter</a>, <a href="#projetos">BG Finance</a>, and <a href="#projetos">Pratique + Pilates</a>. I like growing with a team, getting feedback, and shipping useful interfaces.',
    },
    skills: {
      kicker: "Skills",
      title: "Technologies I use",
      html: "Semantic structure, basic accessibility, and organized pages.",
      css: "Responsive layout, visual hierarchy, and reusable components.",
      js: "Interactivity, API consumption, and front-end logic.",
      react: "Component-based UIs and state for dynamic screens.",
      node: "APIs, authentication, and backend work on BG Finance.",
      git: "Version control, shipping, and public project history.",
    },
    projects: {
      kicker: "Projects",
      title: "Featured work",
      view: "View project",
      code: "View code",
      converter:
        "Currency converter with live rates from an external API. Built for data fetching, responsiveness, and a simple user flow.",
      converterAlt: "BgConverter currency converter screen",
      finance:
        "Income and expense tracking with login, dashboard, and a full user flow. Front-end plus backend for a complete product.",
      financeAlt: "BG Finance app interface",
      pilates:
        "Institutional site for a Pilates studio: clear services, simple navigation, and visible CTAs so visitors can get in touch.",
      pilatesAlt: "Pratique + Pilates studio website",
    },
    resume: {
      kicker: "Resume",
      title: "Education and experience",
      text: "Resume with education, stack, and projects. Use the PDF for applications or a quick overview of my profile.",
      view: "View resume",
      download: "Download PDF",
      file: "./Kauan_Borges_Modern_Resume_EN.pdf",
      downloadName: "Kauan_Borges_Resume_EN.pdf",
    },
    contact: {
      kicker: "Contact",
      title: "Let’s talk",
      email: "Email",
    },
    footer: "© {year} Kauan Borges. All rights reserved.",
  },
};

function getByPath(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

function detectLang() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang");
  if (fromUrl === "en" || fromUrl === "pt") return fromUrl;

  const saved = localStorage.getItem("lang");
  if (saved === "en" || saved === "pt") return saved;

  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "pt";
}

function applyLang(lang) {
  const dictionary = translations[lang] || translations.pt;
  const year = String(new Date().getFullYear());

  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  document.title = dictionary.meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", dictionary.meta.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", dictionary.meta.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", dictionary.meta.description);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getByPath(dictionary, el.dataset.i18n);
    if (typeof value === "string") el.textContent = value.replace("{year}", year);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const value = getByPath(dictionary, el.dataset.i18nHtml);
    if (typeof value === "string") el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const value = getByPath(dictionary, el.dataset.i18nAlt);
    if (typeof value === "string") el.setAttribute("alt", value);
  });

  document.querySelectorAll("[data-i18n-href]").forEach((el) => {
    const value = getByPath(dictionary, el.dataset.i18nHref);
    if (typeof value === "string") el.setAttribute("href", value);
  });

  document.querySelectorAll("[data-resume-link]").forEach((el) => {
    el.setAttribute("href", dictionary.resume.file);
  });

  document.querySelectorAll("[data-resume-download]").forEach((el) => {
    el.setAttribute("download", dictionary.resume.downloadName);
  });

  const langGroup = document.querySelector(".lang-switch");
  if (langGroup) langGroup.setAttribute("aria-label", dictionary.nav.lang);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem("lang", lang);

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  history.replaceState({}, "", url);
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLang(button.dataset.lang));
});

applyLang(detectLang());
