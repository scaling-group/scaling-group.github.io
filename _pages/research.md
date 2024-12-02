---
title: "Scaling Group: Research"
layout: textlay
excerpt: "Scaling Group: Research"
sitemap: false
permalink: /research/
---

# Research


<!-- Here are some themes that we currently work on: -->

**Foundation Scientific Learning Models** 

Can we build a single large model for a wide range of scientific problems?

We proposed a new framework for scientific machine learning, namely **“In-Context Operator Networks”** (ICON). A distinguishing feature of ICON is its ability to learn operators from data prompts during the inference phase, without weight adjustments. A single ICON model can tackle a wide range of tasks involving different operators, since it is trained as a generalist operator learner, rather than being tuned to approximate a specific operator. This is similar to how a single Large Language Model can solve a variety of natural language processing tasks specified by the language prompt.

In our [paper](https://www.pnas.org/doi/10.1073/pnas.2310142120) published in PNAS, we showed how **a single ICON model (without fine-tuning) manages 19 distinct problem types**, encompassing forward and inverse ODE, PDE, and mean-field control problems, each including infinite operators. Later in [this paper](https://arxiv.org/pdf/2308.05061.pdf), we fine-tuned the GPT-2 model as a multi-modal differential equation solver, prompting the model to perform scientific machine learning with human language and LaTeX equations, apart from numerical data (See the following figure). In [this paper](https://www.sciencedirect.com/science/article/pii/S0021999124006272), we showed how a single ICON model can make forward and reverse predictions for different PDEs with different strides, and **generalize well to PDEs with new forms**, without any fine-tuning. We also showed prompt engineer techniques to broaden the range of problems that an ICON model can address. In [this paper](https://arxiv.org/pdf/2411.16063), we proposed VICON, incorporating a vision transformer architecture to efficiently process 2D functions in multi-physics fluid dynamics prediction tasks.

---
![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-multi-modal.png){: style="width: 70%; float: center; margin: 0px"}

Figure 1: Diagram for multi-modal in-context operator learning. The model learns the operator from the textual prompt and/or numerical examples, and applys to the question to make the prediction, with one forward pass.

---
![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-mfg.png){: style="width: 100%; float: center; margin: 0px"}

Figure 2: Illustration of in-context operator learning for a mean-field control problem. The blue/red/black dots represent the data points in the prompt. The ICON model is able to learn the underlying operator from three examples and solve the problem with one forward pass.

---

Tracing the evolution of neural equation solvers, we see a three-act progression: **Act 1** focused on approximating the solution function, e.g., Physics-Informed Neural Networks, while **Act 2** shifted towards approximating the solution operator, e.g., Fourier Neural Operator, DeepONet. ICON can be viewed as an early attempt of **Act 3**, where the model acts like an intelligent agent that adapts to new physical systems and tasks.

**Uncertainty Quantification**

Coming soon...


**Previous Works**

Here are some of Yang Liu's previous works during Ph.D. years:


-- Bayesian Inference for PDEs with PI-GANs and B-PINNs

This series of works aim to address the following challenge: How to perform stochatic modeling and uncertainty quantification for physical systems, with the knowledge of the governing equations and scattered/noisy measurements?


To accurately model the distribution within physical systems (typically defined within a functional space) we proposed [Physics-Informed Generative Adversarial Networks (PI-GANs)](https://epubs.siam.org/doi/abs/10.1137/18M1225409?journalCode=sjoce3). This method effectively integrates physical principles and data, making it suitable for modeling stochastic physical systems or for learning prior distributions from historical data. When combined with our proposed [Bayesian Physics-Informed Neural Networks (B-PINNs)](https://www.sciencedirect.com/science/article/abs/pii/S0021999120306872), which establish likelihoods based on governing equations and observational data, this framework allows for [systematic Bayesian inference on PDEs](https://www.sciencedirect.com/science/article/abs/pii/S0021999122001358).


-- Learning Optimal Transport Map and Particle Dynamics

Being the first to draw the connection between deep generative models and the continuous flow formulation of optimal transport, we proposed [potential flow generator](https://ieeexplore.ieee.org/document/9233438) as a plug-and-play generator module for different GANs and flow-based models. With a special ODE-based network architecture and an augmented loss term tied to the Hamilton-Jacobi equation derived from the optimal transport condition, the potential flow generator not only transports the source distribution to the target one, but also approximates the optimal transport map.

---

![]({{ site.url }}{{ site.baseurl }}/images/papers/WGAN_all.png){: style="width: 40%; float: center; margin: 0px"}
![]({{ site.url }}{{ site.baseurl }}/images/papers/flow_all.png){: style="width: 45%; float: center; margin: 0px"}

Potential flow generator in GANs (left 3 columns) and normalizing flow (right 3 columns). The first row shows the samples or the unnormalized densities of source distributions (purple) and target distributions (orange), the second row shows the learned optimal transport maps.

---

Subsequently, we extended this framework to [inference of particle dynamics from paired/unpaired observations of particles](https://epubs.siam.org/doi/abs/10.1137/21M1413018), encompassing non-local particle interactions and high-dimensional stochastic particle dynamics.

These works were cited by other great works in [high-dimensional mean-field problems](https://www.pnas.org/doi/10.1073/pnas.1922204117), [single-cell transcriptomics](https://www.nature.com/articles/s42256-023-00763-w), and [flow matching for generative modeling](https://arxiv.org/pdf/2210.02747).


**... and more** 
