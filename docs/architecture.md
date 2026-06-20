# CAWN Architecture Overview

The Continuous Acoustic Wave Network (CAWN) introduces a fundamental paradigm shift in sequence modeling. By completely discarding the standard $O(L^2)$ Transformer Attention mechanism and exact Key-Value (KV) caching, CAWN achieves pure linear-time $O(L)$ scaling. 

Rather than relying on dot-product attention matrices, CAWN maps discrete language tokens to continuous acoustic waveforms in the complex domain ($\mathbb{C}$). This enables infinite context windows with a strictly flat VRAM footprint.

## 1. The Holographic Resonance Block

At the core of the architecture lies the `HolographicResonanceBlock`, which replaces the standard Self-Attention mechanism. It routes high-dimensional token representations through a sequence of time-mixing convolutions and complex phase projections.

### 1.1 Temporal Convolution
Before phase projection, the hidden states $X \in \mathbb{R}^{B \times L \times D}$ undergo a causal 1D depth-wise convolution (`time_conv`). This acts as an initial local mixer, allowing the model to capture immediate token-to-token syntax transitions before projecting them into the global temporal ocean.

### 1.2 Holographic Phase Binding (Write Operation)
Unlike traditional models that store exact vector matrices, CAWN generates phase angles ($\phi$) and amplitude vectors ($A_v$) via linear projections. Keys and Values are explicitly bound through angular addition in the complex plane. 

Given the amplitude $A_v$ and the semantic gate $\beta$, the system pushes information into the running complex accumulator $M_t$:

$$ M_t = \gamma M_{t-1} e^{i\theta} + (A_v \cdot \beta) e^{i(\phi_k + \phi_v)} $$

Here, the information is holographically superimposed into the accumulator. The network does not store the Value tensor explicitly; it stores the constructive interference pattern of the Key-Value pair.

### 1.3 Exact-Fact Retrieval (Read Operation)
State Space Models (SSMs) frequently suffer from exact-fact degradation over long contexts ("Needle in a Haystack" failures). CAWN solves this via complex conjugate multiplication. 

To retrieve a historical fact, the network multiplies the current state by the Query's complex conjugate (representing destructive interference):

$$ O_t = M_t \cdot e^{-i\phi_q} $$

$$ O_t = M_t \cdot (\cos(\phi_q) - i\sin(\phi_q)) $$

If $\phi_q$ successfully aligns with a historical $\phi_k$, the original Value phase $\phi_v$ is destructively unpacked from the continuous waveform, achieving $O(1)$ exact retrieval without attending to the historical sequence length.

## 2. Dual-Frequency Oscillators & Static Resonance

To prevent signal degradation across the temporal ocean, CAWN splits the memory accumulation into two decoupled pathways: `fast` and `slow` oscillators. The phase rotation frequencies ($\theta$) are not learned arbitrarily; they are statically grounded in physical harmonic laws to ensure mathematical stability.

* **Schumann Resonance Base:** The base frequency is initialized at $7.83$ Hz.
* **Golden Ratio Scaling:** The frequencies across the harmonics $K$ are logarithmically scaled using the golden ratio ($\phi \approx 1.618$).

$$ \theta_{fast} = \theta_{base} \cdot \phi^{scaled\_indices} $$
$$ \theta_{slow} = \frac{\theta_{fast}}{\phi} $$

This static allocation ensures that high-frequency waves rapidly absorb local syntactical dependencies, while low-frequency waves retain broad, global semantic contexts without destructive overlapping.

## 3. Dynamic Gating Mechanisms

The continuous state is governed by highly regulated, dynamic gating layers:

1. **Beta Proxy ($\beta$):** The semantic threshold gate. Initialized with a severe negative bias ($-3.0$) and a hard epsilon step-function (noise-floor). It restricts early, high-variance embedding noise from polluting the complex state. The network must aggressively learn to open this gate to write factual data.
2. **Gamma Decay ($\gamma$):** Two separate learned sigmoidal gates. `gamma_fast` is initialized with a $-1.0$ bias for rapid forgetting, while `gamma_slow` is initialized with a $+2.0$ bias for prolonged retention.
3. **Unbinding RMSNorm:** Due to the mathematical nature of continuous phase accumulation, variance can exhibit random walk expansion. CAWN implements an intermediate RMSNorm immediately following the conjugate retrieval to crush variance explosions before projecting the wave back into the real domain.

## 4. Triton Fused Kernels

To achieve brutal hardware efficiency, the complex phase accumulation and decay logic is fully fused using custom Triton kernels (`complex_phase_accum_fwd_kernel` and `complex_phase_accum_bwd_kernel`). 

By fusing the cosine/sine transformations, complex arithmetic, and masking operations into a single kernel pass, CAWN restricts the massive $B \times L \times K$ hidden state entirely within the GPU's ultra-fast SRAM. This eliminates costly HBM read/write bottlenecks inherent to native PyTorch implementations.

## 5. Hybrid Muon-AdamW Routing

Training continuous linear models historically suffers from catastrophic gradient instability. CAWN bypasses this via a bifurcated routing topology:

* **Muon Optimizer:** All standard 2D matrices (FFN linear layers) are routed through the Muon optimizer, utilizing Newton-Schulz orthogonalization. This enforces strictly isometric transformations, keeping activations globally bounded.
* **AdamW Optimizer:** The delicate 1D operations—specifically the phase gates ($\beta$, $\gamma$), normalization layers, and biases—are insulated from orthogonalization and routed through a standard AdamW optimizer (without weight decay for biases).

This hybrid structure ensures that the underlying phase mathematics can delicately tune their thresholds, while the massive dimensionality expansions in the feed-forward blocks remain perfectly stable.