---
title: "In-Context Operator Networks: Toward Scientific Foundation Models"
layout: blog_post
author: "Yang Liu"
date: 2026-03-09
lang: en
translation_key: icon
permalink: /blogs/en/icon/
abstract: "An overview of In-Context Operator Networks (ICON), why we view them as a path toward scientific foundation models, and how the recent papers in the group fit together."
pinned: true
pin_order: 1
---

Many scientific problems can be viewed as learning an operator that maps one function or field to another. In our recent work, we have been exploring whether this operator can be inferred directly from context, instead of training a separate model for every new physical system.

This is the central idea behind **In-Context Operator Networks (ICON)**. Rather than fitting one model to one fixed operator, ICON takes a small set of input-output examples in its context and predicts the output for a new input without updating the weights at test time. In our earlier papers we used the terms *condition* and *quantity of interest (QoI)*. Here we instead use *key function* and *value function*, which are closer to the broader literature.

For a concrete example, consider a 1D conservation law

$$
\partial_t u(t,x) + \partial_x f(u(t,x)) = 0.
$$

Its forward operator can be written as $$\mathcal{F}_{f,\tau}[u(0,\cdot)] = u(\tau,\cdot)$$, or more compactly $$\mathcal{F}_{f,\tau}(u_0) = u_\tau$$. Classical numerical methods approximate this operator once the governing equation is specified. In fixed-operator learning, one would train a model $$G_\theta$$ for a particular choice of $$f$$ and $$\tau$$ so that $$G_\theta(u_0)\approx \mathcal{F}_{f,\tau}(u_0)$$. If the operator changes, another model or additional fine-tuning is usually required.

ICON aims at a different regime. A single model $$T_\theta$$ is trained over a distribution of operators and receives a few in-context examples:

$$
\widehat{u}_\tau^{(q)} = T_\theta\!\left(\{(u_0^{(i)},u_\tau^{(i)})\}_{i=1}^{k},\, u_0^{(q)}\right).
$$

The hope is that the model infers the operator from these examples and applies it immediately to the query. This lets the model adapt by changing the prompt rather than by changing the weights.

Why do we find this direction compelling?

- A single model can represent many operators instead of one.
- Adaptation to a new task can happen instantly by swapping the in-context examples.
- Large heterogeneous datasets from different physical systems become an advantage rather than a nuisance.
- The model starts to look less like a static surrogate and more like a reusable computational unit inside a larger scientific workflow.

From a broader perspective, we see a rough three-stage evolution in neural equation solvers. The first stage focused on approximating solution functions, for example Physics-Informed Neural Networks. The second stage shifted toward solution operators, for example DeepONet and Fourier Neural Operator. ICON can be viewed as an early attempt at a third stage, where the model is expected to infer and reuse operators across tasks rather than specializing to only one.

## A Research Thread

Our work on ICON has developed through a sequence of papers, each pushing the framework in a different direction.

**In-Context Operator Learning with Data Prompts for Differential Equation Problems** ([PNAS 2023](https://www.pnas.org/doi/10.1073/pnas.2310142120))

This paper introduced in-context operator learning and ICON. A single model, without fine-tuning, handled 19 problem types spanning forward and inverse ODE, PDE, and mean-field control settings, with many operators inside each type.

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-mfg.png){: style="width: 100%; float: center; margin: 0px"}

Figure 1: In-context operator learning for a mean-field control problem. The model infers the operator from a few examples and solves the query in one forward pass.

**PDE Generalization of In-Context Operator Networks** ([JCP 2024](https://www.sciencedirect.com/science/article/pii/S0021999124006272))

Here we examined whether a single ICON model could generalize across conservation laws with different fluxes and timesteps, including previously unseen PDE forms. We also studied prompt design strategies such as variable transforms and stride manipulation to enlarge the solvable regime.

**Fine-Tune Language Models as Multi-Modal Differential Equation Solvers** ([Neural Networks 2025](https://www.sciencedirect.com/science/article/abs/pii/S089360802500334X))

This work adopted a decoder-only, language-model-style architecture and introduced multi-modal prompting. The model can now use human language and LaTeX equations alongside numerical examples, which makes the operator-learning interface much richer.

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-multi-modal_numerical.png){: style="width: 80%; float: center; margin: 0px"}

Figure 2: Multi-modal in-context operator learning. Textual descriptions and numerical examples can both act as prompt information for the operator.

**VICON: Vision In-Context Operator Networks for Multi-Physics Fluid Dynamics Prediction** ([TMLR 2026](https://arxiv.org/pdf/2411.16063))

VICON extends the framework to 2D fields with a patch-wise vision transformer, targeting multi-physics fluid dynamics with flexible rollout and partially missing frames.

**GICON: Graph In-Context Operator Networks for Generalizable Spatiotemporal Prediction** ([arXiv 2026](https://arxiv.org/abs/2603.12725v3))

GICON brings the same philosophy to graph-structured systems using graph message passing and example-aware positional encoding. The goal is geometric and example-cardinality generalization on real spatiotemporal problems.

## Toward Scientific Foundation Models

Our longer-term interest is not just to produce another operator approximator. We are interested in whether ICON can truly become scientific foundation models: reusable components that can move between tasks, interact with simulators and language-based systems, and participate in increasingly agentic scientific workflows.

The development of ICON needs a broader community effort. We hope more people will help push this direction forward, not only through new models, but also through datasets, benchmarks, infrastructure, and concrete scientific applications.

That is also why we built [**icon-core**](https://github.com/scaling-group/icon-core), an open-source infrastructure package for ICON development. It packages model implementations, training pipelines, and examples into a reusable stack so that others can work on the same direction without rebuilding the basics each time.
