export const langs = ['zh', 'en'] as const;
export type Lang = typeof langs[number];

export const ui = {
  zh: {
    'nav.title': '麻瓜開發手札 Code with AI',
    'nav.about': '關於我',
    'nav.projects': '作品集',
    'nav.articles': 'Medium 文章',
    'nav.lang': 'EN',
    'nav.langHref': '/portfolio/en',
    'about.name': '陳以婕',
    'about.bio1': '與 AI co-work 完成專案的程式麻瓜',
    'about.bio2': 'AI 專案管理｜AI 專案開發｜活動舉辦｜社群經營｜文章撰寫',
    'projects.title': '作品集',
    'articles.title': 'Medium 文章',
    'articles.viewMore': '查看更多文章',
    'articles.loading': '文章載入中...',
    'articles.error': '無法載入文章，請稍後再試。',
    'footer.copy': '© 2024 ICC All rights reserved.',
    'locale': 'zh-TW',
  },
  en: {
    'nav.title': 'Code with AI - Notes from a Muggle',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.articles': 'Medium Articles',
    'nav.lang': '中文',
    'nav.langHref': '/portfolio',
    'about.name': 'Chen I-Chieh',
    'about.bio1': 'A non-developer working with AI to complete projects.',
    'about.bio2': 'AI Project Management | AI Development | Event Organization | Community Management | Writing',
    'projects.title': 'Projects',
    'articles.title': 'Medium Articles',
    'articles.viewMore': 'View More Articles',
    'articles.loading': 'Loading articles...',
    'articles.error': 'Unable to load articles. Please try again later.',
    'footer.copy': '© 2024 ICC All rights reserved.',
    'locale': 'en-US',
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui['zh']) {
  return ui[lang][key];
}
