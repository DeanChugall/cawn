import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  title: "CAWNai",
  description: "Continuous Acoustic Wave Network - Pure O(L) Sequence Modeling",

  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  ],

  // OVO JE DODATO ZA LATEX MATEMATIKU
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DevLog', link: '/devlog/day-1-2-waking-up' },
      { text: '🔴 Live Dashboard', link: 'https://api.wandb.ai/links/datatabns/zlc202ix' }
    ],

    sidebar: [
      {
        text: 'About CAWN',
        items: [
          { text: 'Architecture Overview', link: '/architecture' },
          { text: 'Holographic Phase Binding', link: '/holographic-memory' }
        ]
      },
      {
        text: 'Live Pre-training DevLog',
        items: [
          { text: 'Day 1-2: Waking the Ocean', link: '/devlog/day-1-2-waking-up' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DeanChugall/cawnai_website' }
    ]
  }
})