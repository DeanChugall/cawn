# V21 Pre-Training Specifications and Telemetry

This document outlines the precise hardware environment, architectural configurations, and live telemetry data for the current CAWN V21 pre-training run.

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

The CAWN V21 architecture utilizes a pure linear-time O(L) continuous sequence mixing mechanism, entirely replacing standard quadratic matrix attention.

| Parameter | Assigned Value |
| :--- | :--- |
| **Model Identity** | V21 Pure Holographic CAWN (Single GPU) |
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

## Telemetry Snapshot (17h 28m Runtime)

The following metrics represent the model's stability and output at approximately 17 hours into the run, serving as empirical validation of the continuous phase accumulation logic.

### Training Metrics
| Metric | Value |
| :--- | :--- |
| **Tokens Processed** | 329.26M |
| **Throughput Speed** | ~15,793 tokens/sec |
| **Training Loss** | 4.4115 |
| **Active Learning Rate** | 0.0001624 |
| **Gradient Norm** | 2.7968 |

### Acoustic Gate Proxies
The internal routing mechanisms governing the temporal wave states:

| Gate | Value |
| :--- | :--- |
| **Beta Proxy (Semantic)** | 0.0474 |
| **Gamma Fast Proxy** | 0.9525 |
| **Gamma Slow Proxy** | 0.9525 |

### Validation Metrics
| Metric | Value |
| :--- | :--- |
| **Validation Loss** | 5.7235 |
| **Validation Perplexity** | 305.98 |
| **NIAH Success Rate** | 0.0 |