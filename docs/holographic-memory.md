# Holographic Phase Binding and Exact Retrieval

The continuous Acoustic Wave Network (CAWN) eliminates the $\mathcal{O}(L^2)$ matrix attention bottleneck by shifting sequence modeling into the complex domain ($\mathbb{C}$). By leveraging Holographic Reduced Representations (HRR), the network dynamically projects hidden states into Complex Keys and Values, binding them via angular addition, and retrieves exact historical states through complex conjugate query multiplication.

## 1. Phase Generation and Bounding
Instead of accumulating isolated vectors, the network explicitly generates raw angular logits for the Key, Value, and Query at each temporal step. To prevent chaotic phase wrapping and gradient explosion, these angular logits are strictly bounded to the principal Euclidean phase domain $[-\pi, \pi]$ utilizing a scaled hyperbolic tangent activation natively in float32 precision:

$$\phi_{k, v, q} = \tanh(\mathbf{W} h_t) \cdot \pi$$

## 2. Phase Binding (The Write Operation)
The network mathematically binds the bounded Key and Value into a unified, indecipherable complex phasor strictly via angular addition:

$$\phi_{bind} = \phi_k + \phi_v$$

This locked representation is modulated by the extracted value amplitude ($a_v$) and passed through a semantic boolean gate ($\beta$) before being unpacked into Real and Imaginary components ($p^{(r)}, p^{(i)}$) for accumulation. 

## 3. Holographic Unbinding (The Read Operation)
During inference, to retrieve a specific historical fact ("Needle In A Haystack"), the network executes a dense temporal query over the entire accumulated phase state. By explicitly multiplying the continuous complex state by the complex conjugate of the Query ($Q^*$), the network effectively subtracts the query angle from the entire ocean of bound phases:

$$\phi_{out} = \phi_{bind} - \phi_q = (\phi_k + \phi_v) - \phi_q$$

When a historical Key precisely matches the active Query ($\phi_k \approx \phi_q$), their angular momenta destructively cancel. The exact historical Value ($\phi_v$) instantaneously surfaces from the complex superposition as a pristine, isolated signal. 

## 4. The Resonance Block: $\varphi$ Oscillators
To eliminate "Acoustic Periodicity", the accumulators physically separate the signal into Fast and Slow harmonic oscillators. The fundamental basis frequency ($f_{base} = 7.83$) is scaled by a spatial denominator:

$$\theta_{base} = \frac{f_{base}}{10000.0}$$

The rotation speeds are then distributed across the harmonic dimension utilizing the irrational golden ratio ($\varphi \approx 1.618$):

$$\theta_{k, fast} = \theta_{base} \cdot \varphi^{\lambda_k}, \quad \theta_{k, slow} = \frac{\theta_{k, fast}}{\varphi}$$

To guarantee that the highest frequency harmonic never exceeds the Nyquist sampling limit ($\pi$ radians per step) and thus prevents phase aliasing, the maximum spatial exponent is strictly bounded:

$$\lambda_{max} = \log_\varphi \left( \frac{\pi}{\theta_{base}} \right)$$

## 5. Causal Phase Accumulation (Triton Hardware Kernel)
The dual-gated phase accumulator utilizes a true-complex phase rotation, explicitly unpacking the raw phase push into Real ($r$) and Imaginary ($i$) components using standard trigonometric projection. This formulation is executed directly within the fused Triton kernel:

$$P^{(r)}_{t,k} = p^{(r)}_{t,k} + \gamma_{t,k} \left( P^{(r)}_{t-1,k} \cos \theta_k - P^{(i)}_{t-1,k} \sin \theta_k \right)$$

$$P^{(i)}_{t,k} = p^{(i)}_{t,k} + \gamma_{t,k} \left( P^{(r)}_{t-1,k} \sin \theta_k + P^{(i)}_{t-1,k} \cos \theta_k \right)$$

## 6. Asymmetric Bias Initialization
To enforce divergent temporal dynamics, the temporal decay gates ($\gamma$) are initialized asymmetrically. The fast harmonic gate receives a $-1.0$ bias (rapid forgetting), while the slow harmonic gate receives a $+2.0$ bias (long-term retention). These biases are additively modulated by a learned spatial frequency bias ($\mathcal{F}_{bias}$) initialized from $3.0$ to $0.0$ across the harmonic dimension:

$$\gamma_{t,k} = \sigma \left( \mathbf{W}_\gamma h_t + b_{asymmetric} + \mathcal{F}_{bias}^{(k)} \right)$$