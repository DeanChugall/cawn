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
      { text: 'DevLog', link: '/devlog/1k_steps' },
      { text: '🔴 Live Dashboard', link: 'https://api.wandb.ai/links/datatabns/zlc202ix' }
    ],

    sidebar: [
      {
        text: 'About CAWN',
        items: [
          { text: 'Architecture Overview', link: '/architecture' },
          { text: 'Holographic Phase Binding', link: '/holographic-memory' },
          { text: 'Training Specs & Telemetry', link: '/devlog/training-specs' }
        ]
      },
      {
        text: 'Live Pre-training DevLog',
        items: [
          { text: '1k Steps: Waking the Ocean', link: '/devlog/1k_steps' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DeanChugall/cawnai_website' }
    ]
  }
})