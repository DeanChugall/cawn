---
layout: home

hero:
  name: "CAWN"
  text: "Continuous Acoustic Wave Networks"
  tagline: A pure linear-time O(L) sequence model that completely discards the O(L²) Transformer Attention wall. Infinite context, flat VRAM.
  image:
    src: /assets/aida_hero.png
    alt: CAWN Hero Image
  actions:
    - theme: brand
      text: Explore Architecture
      link: /architecture
    - theme: alt
      text: 🔴 Live DevLog
      link: /devlog/1k_steps

features:
  - title: 🌊 Holographic Phase Binding
    details: Keys and Values are mathematically bound via angular addition. Destructive interference unpacks exact historical values in O(1) time, solving the SSM "Needle In A Haystack" degradation.
  - title: 🚀 Flat VRAM O(L) Scaling
    details: 100% Custom Fused Triton kernels process the continuous complex domain entirely within SRAM. Scales identically from 512 to 2,000,000 tokens with zero quadratic explosion.
  - title: ⚙️ Hybrid Muon-AdamW Routing
    details: 2D structural projections undergo Newton-Schulz orthogonalization via Muon, while fragile 1D phase gates are insulated in AdamW. Brutally stable continuous optimization.
---

<br>

<div align="center">
  <h3>Live Pre-Training Telemetry</h3>
  <a href="/images/wb_dash_1.png" target="_blank">
    <img src="/images/wb_dash_1.png" alt="W&B Acoustic Gates and Training Dynamics" style="cursor: pointer; border-radius: 8px; border: 1px solid #333; max-width: 90%; box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />
  </a>
</div>

<br>
<hr>
<br>

<div align="center">
  <h3>The Temporal Ocean: How CAWN Works</h3>
</div>

```text
☁️ [ DATA CLOUD ]          Input Tokens (Text / Knowledge)
          │
          ▼
💧 [ PHASE INJECTION ]     Phase and Amplitude Computation (Write Binding)
          │                P_r = (A_v * beta) * cos(phi_k + phi_v)
          │                P_i = (A_v * beta) * sin(phi_k + phi_v)
          │
   〰️〰️〰️ ▼ 〰️〰️〰️          [ GOLDEN RATIO HARMONICS ]
  〰️  〰️  〰️  〰️  〰️       Fast & Slow Oscillators decoupled by phi (1.618).
    〰️  〰️  〰️  〰️         Ensures waves spread asymmetrically and NEVER
                           fully destructively overlap (Nyquist limit).
          │
🌊 ═══════▼═══════ 🌊      [ THE TEMPORAL OCEAN (Triton Phase Accumulator) ]
   [ COMPLEX     ]         M_r = M_r_prev * gamma * cos(θ) ... + P_r
   [ STATE (C)   ]         Fixed O(1) SRAM Buffer. All historical tokens 
🌊 ═══════════════ 🌊      are fused into a single massive interference wave.
          │
❄️ [ QUERY CASTING ]       [ HOLOGRAPHIC UNBINDING (Read / Query Conjugate) ]
          │                Retrieving the "Needle". Multiplying the ocean by Q*.
          │                Destructive interference cancels the noise and isolates
          │                only the specific wave resonating with the query.
          ▼
🛡️ [ THERMAL SHIELD ]      [ UNBINDING RMSNORM (Random Walk Stabilization) ]
          │                Dense superpositions naturally generate thermal noise.
          │                The network structurally upcasts to FP32 and clamps
          │                the variance, preventing gradient explosions.
          ▼
💎 [ THE CRYSTAL ]         OUTPUT TOKEN (Extraction)
                           The exact historical fact extracted from the chaos.