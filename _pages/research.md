---
title: "Scaling Group: Research"
layout: textlay
excerpt: "Scaling Group: Research"
sitemap: false
permalink: /research/
---

<!-- Here are some themes that we currently work on: -->

## In-Context Operator Networks (ICON): Towards Scientific Foundation Models

Many scientific problems can be naturally described as learning an operator that maps an input function/field (the "key function") to an output function/field (the "value function"). In-Context Operator Networks (ICON) study how to amortize operator identification into context: rather than training one model per operator, ICON takes a set of key--value function pairs in its context and predicts the value function for a new key function, without weight updates during inference. (Note: our early papers used the terms *condition* and *quantity of interest (QoI)* for these concepts; we adopt *key function* and *value function* here as they better align with common convention.)

For a concrete mathematical example, consider a 1D scalar conservation law

$$
\partial_t u(t,x) + \partial_x f(u(t,x)) = 0,
$$

we can define its forward (solution) operator $$\mathcal{F}_{f,\tau}[u(0,\cdot)] = u(\tau,\cdot)$$, or $$\mathcal{F}_{f,\tau}(u_0) = u_\tau$$ for simplicity.

Classical numerical methods approximate $$\mathcal{F}_{f,\tau}$$ via discretization once the governing equation is specified. In **fixed-operator learning**, one typically fixes an operator
(e.g., fixed $$f$$ and $$\tau$$) and trains a model $$G_\theta$$ such that $$G_\theta(u_0)\approx \mathcal{F}_{f,\tau}(u_0)$$; if the
operator changes (e.g., $$f$$ changes), a new model or fine-tuning is often required. In **in-context operator learning**, a single model $$T_\theta$$ is trained over a distribution of operators (e.g., different $$f$$) so that it can infer
the operator from a few in-context key-value function pairs and apply it to a new key function:

$$
\widehat{u}_\tau^{(q)} = T_\theta\!\left(\{(u_0^{(i)},u_\tau^{(i)})\}_{i=1}^{k},\, u_0^{(q)}\right).
$$

Here $$k\in\mathbb{N}$$ is the number of in-context examples, $$i=1,\ldots,k$$ indexes the examples, and $$q$$ denotes
the query instance.

Key advantages of the ICON paradigm include:
- Unified Framework: A single ICON model can represent many operators by conditioning on examples, rather than training one model per operator. This enables ICON to effectively leverage large-scale, heterogeneous datasets spanning multiple physical systems.

- Instant Adaptation: Shifting between operators is achieved seamlessly by updating the in-context examples, allowing for instant adaptation to new physical systems without training.

- Agentic Integration for Numerical Workflows: Beyond static inference, ICON holds the potential to serve as a core agentic component within automated scientific discovery loops. It can autonomously interface with numerical solvers and LLM engines, acting as a flexible neural operator unit to navigate and solve complex, multi-physics numerical problems.

Tracing the evolution of neural equation solvers, we see a three-act progression: Act 1 focused on approximating the solution function, e.g., Physics-Informed Neural Networks, while Act 2 shifted towards approximating the solution operator, e.g., Fourier Neural Operator, DeepONet. ICON can be viewed as an early attempt of Act 3, where the model acts like an intelligence that adapts to new physical systems and tasks. 


<!-- **Uncertainty Quantification**

Coming soon... -->

We have a series of works on ICON as follows. 

🚀 Check out [**icon-core**](https://github.com/scaling-group/icon-core) on GitHub, the open-source infrastructure package for your ICON development, featuring built-in AI support, modular implementations, training pipelines, and examples to get you started. We’d love to see your model and dataset! Feel free to submit a pull request to contribute.

**In-Context Operator Learning with Data Prompts for Differential Equation Problems** ([PNAS 2023](https://www.pnas.org/doi/10.1073/pnas.2310142120))

We proposed In-Context Operator Learning and In-Context Operator Networks. A single ICON model (without fine-tuning) manages 19 distinct problem types, encompassing forward and inverse ODE, PDE, and mean-field control problems, with infinite operators in each problem type.

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-mfg.png){: style="width: 100%; float: center; margin: 0px"}

Figure 1: Illustration of in-context operator learning for a mean-field control problem. The blue/red/black dots represent the data points in the prompt. The ICON model learns the underlying operator from three examples and solves the problem with one forward pass.

**Fine-Tune Language Models as Multi-Modal Differential Equation Solvers** ([Neural Networks 2025](https://www.sciencedirect.com/science/article/abs/pii/S089360802500334X))

We adopted a decoder-only, language-model-style architecture and introduced multi-modal prompting, allowing the model to be prompted with human language and LaTeX equations in addition to numerical data. We showed its impressive capabilities in combining multi-modal information to learn the operator.

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-multi-modal_numerical.png){: style="width: 80%; float: center; margin: 0px"}

Figure 2: Diagram for multi-modal in-context operator learning. The model learns the operator from the textual prompt and/or numerical examples, and applies it to the question to make the prediction, with one forward pass. Both the textual caption and the numerical examples are optional.

**PDE Generalization of In-Context Operator Networks** ([JCP 2024](https://www.sciencedirect.com/science/article/pii/S0021999124006272))

A single ICON model makes forward and reverse predictions for conservation laws with different flux functions and time strides, and generalizes well to PDEs with new forms, without any fine-tuning. We also demonstrated prompt-design strategies---such as change of variables and stride manipulation---to expand the range of tractable problems.

**VICON: Vision In-Context Operator Networks for Multi-Physics Fluid Dynamics Prediction** ([TMLR 2026](https://arxiv.org/pdf/2411.16063))

We incorporated a patch-wise vision transformer architecture to efficiently process 2D functions, with flexible rollout under varying timestep strides and missing frames, in multi-physics fluid dynamics prediction tasks. 

## Previous Works

Here are some of Yang Liu’s previous works during Ph.D. years:

**Bayesian Inference for PDEs with PI-GANs and B-PINNs**

This series of works aim to address the following challenge: How to perform stochatic modeling and uncertainty quantification for physical systems, with the knowledge of the governing equations and scattered/noisy measurements?

To accurately model the distribution within physical systems (typically defined within a functional space) we proposed Physics-Informed Generative Adversarial Networks (PI-GANs) ([arxiv 2018](https://arxiv.org/abs/1811.02033), [SIAM SISC 2020](https://epubs.siam.org/doi/abs/10.1137/18M1225409?journalCode=sjoce3)). This method effectively integrates physical principles and data, making it suitable for modeling stochastic physical systems or for learning prior distributions from historical data. When combined with our proposed Bayesian Physics-Informed Neural Networks (B-PINNs) ([arxiv 2020](https://arxiv.org/abs/2003.06097), [JCP 2021](https://www.sciencedirect.com/science/article/abs/pii/S0021999120306872)), which establish likelihoods based on governing equations and observational data, this framework allows for systematic Bayesian inference on PDEs ([arxiv 2021](\https://arxiv.org/abs/2106.05863), [JCP 2022](https://www.sciencedirect.com/science/article/abs/pii/S0021999122001358)).


**Learning Optimal Transport Map and Particle Dynamics with Unpaired Samples**

We proposed potential flow generator ([arxiv 2019](https://arxiv.org/pdf/1908.11462), [IEEE TNNLS 2020](https://ieeexplore.ieee.org/document/9233438)) as a plug-and-play generator module for different GANs and flow-based models. With a special ODE-based network architecture and an augmented loss term tied to the Hamilton-Jacobi equation derived from the optimal transport condition, the potential flow generator not only transports the source distribution to the target one, but also approximates the optimal transport map. To the best of my knowledge, this is the first paper to draw the connection between deep generative models and the continuous flow formulation of optimal transport.

![]({{ site.url }}{{ site.baseurl }}/images/papers/WGAN_all.png){: style="width: 40%; float: center; margin: 0px"}
![]({{ site.url }}{{ site.baseurl }}/images/papers/flow_all.png){: style="width: 45%; float: center; margin: 0px"}

Figure 3: Potential flow generator in GANs (left 3 columns) and normalizing flow (right 3 columns). The first row shows the samples or the unnormalized densities of source distributions $$\mu$$ (in purple) and target distributions $$\nu$$ (in orange), the second row shows the learned optimal transport maps $$G$$ and the push forward distributions $$G_{\#}\mu$$.

Subsequently, we extended this framework to inference of particle dynamics from unpaired observations of particles ([arxiv 2020](https://arxiv.org/abs/2008.01915), [SIAM SISC 2022](https://epubs.siam.org/doi/abs/10.1137/21M1413018)), encompassing non-local particle interactions and high-dimensional stochastic particle dynamics.


These works were cited by other great works in [high-dimensional mean-field problems](https://www.pnas.org/doi/10.1073/pnas.1922204117), [single-cell transcriptomics](https://www.nature.com/articles/s42256-023-00763-w), and [flow matching for generative modeling](https://arxiv.org/pdf/2210.02747).


**[... and more]({{ site.url }}{{ site.baseurl }}/downloads/cv/liuyang.pdf)**
