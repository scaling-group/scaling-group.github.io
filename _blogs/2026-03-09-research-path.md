---
title: "From PI-GANs and B-PINNs to ICON: A Research Path"
layout: blog_post
author: "Yang Liu"
date: 2026-03-09
lang: en
translation_key: research-path
permalink: /blogs/en/research-path/
abstract: "A short account of the research path leading to the current work, from uncertainty quantification and Bayesian inference for PDEs, to optimal transport, particle dynamics, and eventually ICON."
---

Research directions usually look cleaner in hindsight than they feel while they are unfolding. The current focus of our group is on modern scalable AI for scientific computing, especially in-context operator learning. But this focus did not appear all at once. It emerged from several earlier threads that, at the time, looked rather separate.

This post is a brief account of that path.

## Uncertainty Quantification and Bayesian Inference for PDEs

One early thread was driven by a basic question: how should we perform stochastic modeling and uncertainty quantification for physical systems when we know the governing equations and only have scattered or noisy observations?

This led to our work on **Physics-Informed Generative Adversarial Networks (PI-GANs)** ([arXiv 2018](https://arxiv.org/abs/1811.02033), [SIAM SISC 2020](https://epubs.siam.org/doi/abs/10.1137/18M1225409?journalCode=sjoce3)). The goal there was to model distributions over physical systems, often in infinite-dimensional or function-space settings, while encoding physical constraints directly into the learning process.

PI-GANs became especially useful when combined with **Bayesian Physics-Informed Neural Networks (B-PINNs)** ([arXiv 2020](https://arxiv.org/abs/2003.06097), [JCP 2021](https://www.sciencedirect.com/science/article/abs/pii/S0021999120306872)). B-PINNs provided a way to build likelihoods from governing equations and observational data, which then supported broader Bayesian inference pipelines for PDE problems ([arXiv 2021](https://arxiv.org/abs/2106.05863), [JCP 2022](https://www.sciencedirect.com/science/article/abs/pii/S0021999122001358)).

![]({{ site.url }}{{ site.baseurl }}/images/papers/PI-GAN-B-PINN.png){: style="width: 70%; float: center; margin: 0px"}

Figure 1: Schematic of learning functional priors and posteriors from data and physics, with PI-GAN and B-PINNs.

This thread already contained a key motivation behind ICON: we wanted to learn a prior from large amounts of historical data over families of function-space problems, and then infer the posterior from new observations. ICON can be viewed as the ultimate form of this idea, because posterior inference is carried out in context, without any further training of the model.


## Learning Optimal Transport and Particle Dynamics from Unpaired Data

Another important thread is learning optimal transport and particle dynamics from unpaired data.

In **potential flow generator** ([arXiv 2019](https://arxiv.org/pdf/1908.11462), [IEEE TNNLS 2020](https://ieeexplore.ieee.org/document/9233438)), we introduced a plug-and-play generator module for GANs and flow-based models. The architecture was based on an ODE view, and the loss included a term tied to the Hamilton-Jacobi equation implied by the optimal transport condition. The resulting generator did not just move samples from one distribution to another; it also approximated the transport map itself. To the best of my knowledge, this is the first paper to draw the connection between deep generative models and the continuous flow formulation of optimal transport.

![]({{ site.url }}{{ site.baseurl }}/images/papers/WGAN_all.png){: style="width: 40%; float: center; margin: 0px"}
![]({{ site.url }}{{ site.baseurl }}/images/papers/flow_all.png){: style="width: 45%; float: center; margin: 0px"}

Figure 2: Potential flow generator in GANs (left 3 columns) and normalizing flow (right 3 columns). The first row shows the samples or the unnormalized densities of source distributions $$\mu$$ (in purple) and target distributions $$\nu$$ (in orange), the second row shows the learned optimal transport maps $$G$$ and the push forward distributions $$G_{\#}\mu$$.

We then extended this line to the inference of particle dynamics from unpaired particle observations ([arXiv 2020](https://arxiv.org/abs/2008.01915), [SIAM SISC 2022](https://epubs.siam.org/doi/abs/10.1137/21M1413018)). This idea is now widely used in single-cell transcriptomics, where the central challenge is often to infer dynamics from unpaired observations.

These works were cited by other great works in [high-dimensional mean-field problems](https://www.pnas.org/doi/10.1073/pnas.1922204117), [single-cell transcriptomics](https://www.nature.com/articles/s42256-023-00763-w), and [flow matching for generative modeling](https://arxiv.org/pdf/2210.02747).

There is one more paper worth mentioning here: [arXiv 2021](https://arxiv.org/abs/2101.06802). This paper was not published and did not receive much attention, but it was already exploring an idea close to foundation models. In the appendix, we discussed the possibility of training a single model that takes two distributions as input and directly predicts the optimal transport between them, without retraining for each new pair. The broader idea of solving scientific problems by a forward pass of a trained model, rather than by optimizing a new model for every instance, was already being explored there. This is also very much the spirit of ICON.


## Conclusion

Looking back, the path from uncertainty quantification, Bayesian inference, optimal transport, and particle dynamics to ICON was not a sequence of disconnected topics. The underlying direction was the same: to learn reusable structure from large families of scientific problems, and to solve new instances by inference rather than by starting over each time.
