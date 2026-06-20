# Pre-Training Specifications and Telemetry

This document outlines the precise hardware environment, architectural configurations, and live telemetry data for the current CAWN pre-training run.

## Hardware and Execution Environment

The pre-training pipeline is currently executing on a dedicated single-node Linux environment, optimized for continuous data streaming and Triton kernel compilation.

* **Run State:** Running
* **Start Time:** June 19, 2026, 9:37:02 PM
* **Operating System:** Linux-5.15.0-170-generic-x86_64-with-glibc2.39
* **Python Environment:** CPython 3.12.13
* **W&B CLI Version:** 0.27.2

### System Specifications
| Component | Specification |
| :--- | :--- |
| **GPU Node** | 1x NVIDIA GeForce RTX 5090 |
| **CPU Configuration** | 64 Physical Cores / 128 Logical Threads |

---

## Architectural Configuration

The CAWN architecture utilizes a pure linear-time O(L) continuous sequence mixing mechanism, entirely replacing standard quadratic matrix attention.

| Parameter | Assigned Value |
| :--- | :--- |
| **Model Identity** | Pure Holographic CAWN (Single GPU) |
| **Total Parameters** | 268,301,568 |
| **Hidden Dimension (d_model)** | 1,024 |
| **Total Layers** | 16 |
| **Layers per Block** | 4 |
| **Acoustic Heads** | 8 |
| **Harmonics per Head (K)** | 64 |
| **FFN Expansion Factor** | 2 |
| **Maximum Sequence Length** | 4,096 |
| **Dropout Rate** | 0.0 |

---

## Optimization and Training Dynamics

To maintain mathematical stability across the continuous complex domain, the network employs a strictly partitioned optimization topology.

* **Batch Size per GPU:** 12
* **Gradient Accumulation Steps:** 11
* **Global Batch Size:** 132
* **Maximum Training Steps:** 19,100
* **Peak AdamW Learning Rate:** 0.0004
* **Muon Base Learning Rate:** 0.02
* **Muon Momentum:** 0.95
* **Warmup Steps:** 1,500
* **Weight Decay:** 0.01
* **Dynamic Needle Injection Probability:** 0.05

---

## Live Telemetry Interpretation Guide

Because the CAWN pre-training is an active, continuous stream, static performance snapshots rapidly become obsolete. Instead of logging hardcoded metrics, this section provides the mathematical and systemic context required to interpret the live Weights & Biases dashboard.

### 1. Acoustic Gate Proxies (Waveform Routing)
The most critical indicators of architectural health are not the loss curves, but the behavioral shifts in the complex phase gates.

* **Beta Proxy (`acoustic/beta_proxy`):** This represents the semantic noise-floor gate. Initialized near absolute zero, it acts as a physical shield during early training to prevent high-variance embedding noise from polluting the continuous wave state. A rising trajectory indicates the model has successfully formed semantic representations and is actively writing factual data into the Temporal Ocean.
* **Gamma Divergence (`acoustic/gamma_fast` vs `gamma_slow`):** The architecture utilizes dual-frequency oscillators initialized asymmetrically. As the model learns, these proxies must explicitly decouple. `gamma_fast` climbs to track rapid syntactic structures, while `gamma_slow` drops to establish stable, low-frequency long-term memory.

### 2. Optimization Stability
Training continuous wave mechanisms frequently triggers catastrophic mathematical instability.

* **Gradient Norm (`train/grad_norm`):** The complex chain rule executed through the Triton accumulator is highly susceptible to "Random Walk" explosions. A healthy run maintains a `grad_norm` strictly bounded under 3.0. This telemetry confirms that the Hybrid Muon-AdamW routing and the unbinding RMSNorm are successfully containing the thermal noise of the superposition.

### 3. Holographic Retrieval (Needle In A Haystack)
The ultimate validation of the CAWN architecture is exact-fact retrieval without attention matrices.

* **NIAH Success (`val/niah_success`):** This binary metric evaluates whether the network can retrieve a specific, stochastically generated fact over an extended context window. During early epochs (the "babbling" phase), this remains at 0.0. A discrete shift to 1.0 proves that the Query complex conjugate ($Q^*$) has successfully achieved destructive interference, instantly unpacking the exact historical Value phase ($\phi_v$) from the dense ocean of bound waves.