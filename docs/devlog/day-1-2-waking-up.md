# Day 1-2: Initializing the Temporal Ocean and Observing Phase Dynamics

**Date:** June 20, 2026  
**Current Step:** 600+  
**Tokens Processed:** ~324 Million  
**Training Loss:** ~4.08  

We are officially live with the pre-training of CAWN V21 (268M). Developing a pure linear-time O(L) sequence model that completely discards standard O(L²) Attention matrices requires navigating uncharted theoretical and infrastructural territory. The first 24 hours of training have provided critical empirical validation of our complex domain routing and memory binding mechanisms.

## Infrastructure and Dataloader Anomalies: The Silent Deadlock

At step 605, the training loop halted due to a silent network deadlock originating from the HuggingFace streaming dataloader. The underlying TCP socket remained open but failed to deliver subsequent byte packets. Because no explicit connection reset or timeout exception was thrown by the OS, our standard Python `try-except` blocks wrapping the `next(stream)` call were bypassed. This caused the CPU workers to hang indefinitely while the GPU waited for the next micro-batch.

**The Resolution:** We manually interrupted the process. Thanks to our deterministic `SAVE_INTERVAL = 100` configuration, the system automatically rolled back to the pristine checkpoint at step 600. Upon restart, the script reloaded the complete model weights alongside the exact Hybrid Muon-AdamW optimizer states. Crucially, the dataloader performed a precise fast-forward operation, discarding the exact number of micro-batches required to seamlessly resume the dataset stream without data contamination or repeating previously seen tokens.

## Model Dynamics: Acoustic Gate Activation and Oscillator Decoupling

The most significant observation from the initial phase of this run is not merely the smooth degradation of the `train/loss` curve, but rather the internal behavior of the continuous waveform routing within the complex domain (C). 

As visualized in the W&B dashboard panels below (specifically observing the shift between steps 400 and 600), the network is actively transitioning from random noise generation to structured memory retention:

<a href="/images/wb_dash_1.png" target="_blank">
  <img src="/images/wb_dash_1.png" alt="W&B Acoustic Gates and Training Dynamics" style="cursor: pointer; border-radius: 8px; border: 1px solid #333;" />
</a>

**1. `beta_proxy` (Semantic Gate) Trajectory:** We deliberately initialized the beta gate with a heavy negative bias (-3.0) and applied a strict epsilon noise-floor threshold. During the earliest stages of training, this gate remained virtually closed to shield the complex phase accumulators from being poisoned by uninformative, high-variance embedding noise. Now that the token representations are converging into meaningful semantic vectors, the network has recognized their utility. It is aggressively updating the weights to push the beta gate open, thereby actively writing factual token data into the holographic memory structure.

**2. Decoupling of the `gamma` Oscillators:** The architecture utilizes dual-frequency oscillators to manage context. We initialized `gamma_fast` with a -1.0 bias (promoting rapid decay) and `gamma_slow` with a +2.0 bias (promoting long-term retention). The telemetry shows a distinct, organic bifurcation:
* `gamma_fast` is climbing as the model attempts to track immediate syntactic structures and local context more tightly.
* `gamma_slow` is dropping. This reduction demonstrates the model learning to suppress short-term noise in its low-frequency components, stabilizing the phase state to prevent destructive interference over extended context windows.

**3. Optimization Health and Router Stability:** Despite the radical shifts occurring within the phase gating mechanisms, our custom Hybrid Muon-AdamW routing architecture is functioning flawlessly. By isolating the 2D projection matrices for Newton-Schulz orthogonalization via the Muon optimizer, while handling the delicate 1D phase gates and norms through AdamW, the global `grad_norm` remains strictly bounded and stable under 3.0.

We are currently streaming through a 10-billion-token corpus. The training dynamics suggest a highly stable trajectory toward full convergence.

[Track the Live W&B Dashboard Here](https://api.wandb.ai/links/datatabns/zlc202ix)