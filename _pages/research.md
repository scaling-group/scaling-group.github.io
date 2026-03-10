---
title: "Scaling Group: Research"
layout: textlay
excerpt: "Scaling Group: Research"
sitemap: false
permalink: /research/
---

<!-- Here are some themes that we currently work on: -->

## Foundation Scientific Learning Models

We proposed a new framework for scientific machine learning, namely **“In-Context Operator Learning”** and the corresponding model **“In-Context Operator Networks”** (ICON). A distinguishing feature of ICON is its ability to learn operators from numerical prompts during the inference phase, without weight adjustments. A single ICON model can tackle a wide range of tasks involving different operators, since it is trained as a generalist operator learner, rather than being tuned to approximate a specific operator. This is similar to how a single Large Language Model can solve a variety of natural language processing tasks specified by the language prompt. View the tutorial code in our [GitHub repository](https://github.com/scaling-group/icon-tutorial).

Key advantages of the ICON paradigm include:
- **Unified Framework**: A single ICON model can represent many operators by conditioning on examples, rather than training one model per operator. This enables ICON to effectively leverage large-scale, heterogeneous datasets spanning multiple physical systems.
- **Instant Adaptation**: Shifting between operators is achieved seamlessly by updating the in-context examples, allowing for instant adaptation to new physical systems without training.
- **Agentic Integration for Numerical Workflows**: Beyond static inference, ICON holds the potential to serve as a core agentic component within automated scientific discovery loops. It can autonomously interface with numerical solvers and LLM engines, acting as a flexible neural operator unit to navigate and solve complex, multi-physics numerical problems.


<!-- **Uncertainty Quantification**

Coming soon... -->

## Research Highlight

**In-Context Operator Learning with Data Prompts for Differential Equation Problems** 

We proposed In-Context Operator Learning and In-Context Operator Networks. A single ICON model (without fine-tuning) manages 19 distinct problem types, encompassing forward and inverse ODE, PDE, and mean-field control problems, with infinite operators in each problem type ([PNAS 2023](https://www.pnas.org/doi/10.1073/pnas.2310142120)).

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-mfg.png){: style="width: 100%; float: center; margin: 0px"}

Figure 1: Illustration of in-context operator learning for a mean-field control problem. The blue/red/black dots represent the data points in the prompt. The ICON model learns the underlying operator from three examples and solves the problem with one forward pass.

**Fine-Tune Language Models as Multi-Modal Differential Equation Solvers** 

We adopted a decoder-only, language-model-style architecture and introduced multi-modal prompting, allowing the model to be prompted with human language and LaTeX equations in addition to numerical data. We showed its impressive capabilities in combining multi-modal information to learn the operator ([Neural Networks 2025](https://www.sciencedirect.com/science/article/abs/pii/S089360802500334X)).

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-multi-modal_numerical.png){: style="width: 80%; float: center; margin: 0px"}

Figure 2: Diagram for multi-modal in-context operator learning. The model learns the operator from the textual prompt and/or numerical examples, and applies it to the question to make the prediction, with one forward pass. Both the textual caption and the numerical examples are optional.

**PDE Generalization of In-Context Operator Networks**

A single ICON model makes forward and reverse predictions for conservation laws with different flux functions and time strides, and generalizes well to PDEs with new forms, without any fine-tuning. We also demonstrated prompt-design strategies---such as change of variables and stride manipulation---to expand the range of tractable problems ([JCP 2024](https://www.sciencedirect.com/science/article/pii/S0021999124006272)).

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-weno-jcp.png){: style="width: 75%; float: center; margin: 0px"}

Figure 3: Illustration of training and inference of ICON for PDEs, using conservation laws as examples.

**VICON: Vision In-Context Operator Networks for Multi-Physics Fluid Dynamics Prediction**

We incorporated a patch-wise vision transformer architecture to efficiently process 2D functions, with flexible rollout under varying timestep strides and missing frames, in multi-physics fluid dynamics prediction tasks ([TMLR 2026](https://arxiv.org/pdf/2411.16063)).

![]({{ site.url }}{{ site.baseurl }}/images/papers/VICON.png){: style="width: 80%; float: center; margin: 0px"}

Figure 4: VICON model overview.

## Outdated pre-ICON artifacts during Ph.D.

**Bayesian Inference for PDEs with PI-GANs and B-PINNs**

This series of works aim to address the following challenge: How to perform stochatic modeling and uncertainty quantification for physical systems, with the knowledge of the governing equations and scattered/noisy measurements?

To accurately model the distribution within physical systems (typically defined within a functional space) we proposed Physics-Informed Generative Adversarial Networks (PI-GANs) ([arxiv 2018](https://arxiv.org/abs/1811.02033), [SIAM SISC 2020](https://epubs.siam.org/doi/abs/10.1137/18M1225409?journalCode=sjoce3)). This method effectively integrates physical principles and data, making it suitable for modeling stochastic physical systems or for learning prior distributions from historical data. When combined with our proposed Bayesian Physics-Informed Neural Networks (B-PINNs) ([arxiv 2020](https://arxiv.org/abs/2003.06097), [JCP 2021](https://www.sciencedirect.com/science/article/abs/pii/S0021999120306872)), which establish likelihoods based on governing equations and observational data, this framework allows for systematic Bayesian inference on PDEs ([arxiv 2021](\https://arxiv.org/abs/2106.05863), [JCP 2022](https://www.sciencedirect.com/science/article/abs/pii/S0021999122001358)).


**Learning Optimal Transport Map and Particle Dynamics with Unpaired Samples**

We proposed potential flow generator ([arxiv 2019](https://arxiv.org/pdf/1908.11462), [IEEE TNNLS 2020](https://ieeexplore.ieee.org/document/9233438)) as a plug-and-play generator module for different GANs and flow-based models. With a special ODE-based network architecture and an augmented loss term tied to the Hamilton-Jacobi equation derived from the optimal transport condition, the potential flow generator not only transports the source distribution to the target one, but also approximates the optimal transport map.

To the best of my knowledge, this is the first paper to draw the connection between deep generative models and the continuous flow formulation of optimal transport.

![]({{ site.url }}{{ site.baseurl }}/images/papers/MNIST-OT.png){: style="width: 80%; float: center; margin: 0px"}

Figure 5: Learned optimal transport mapping from digits 0--4 to 5--9 on the MNIST dataset. The model transforms images to similar ones without the need for paired training samples.

Subsequently, we extended this framework to inference of particle dynamics from unpaired observations of particles ([arxiv 2020](https://arxiv.org/abs/2008.01915), [SIAM SISC 2022](https://epubs.siam.org/doi/abs/10.1137/21M1413018)), encompassing non-local particle interactions and high-dimensional stochastic particle dynamics.


These works were cited by other great works in [high-dimensional mean-field problems](https://www.pnas.org/doi/10.1073/pnas.1922204117), [single-cell transcriptomics](https://www.nature.com/articles/s42256-023-00763-w), and [flow matching for generative modeling](https://arxiv.org/pdf/2210.02747).


**[... and more]({{ site.url }}{{ site.baseurl }}/downloads/cv/liuyang.pdf)**
