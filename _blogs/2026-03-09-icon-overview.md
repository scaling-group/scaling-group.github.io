---
title: "In-Context Operator Networks: A Research Program for Numerical Intelligence"
layout: blog_post
author: "Liu Yang"
date: 2026-03-09
lang: en
translation_key: icon
permalink: /blogs/en/icon/
abstract: "In-Context Operator Networks acquire and apply knowledge from numerical context. A frozen model infers the predictive relation expressed by contextual examples and applies it to new queries, adapting across scientific and social systems without retraining."
show_abstract: false
pinned: true
pin_order: 1
---

<aside class="blog-epigraph" aria-label="Epigraph">
  <p class="blog-epigraph__quote">“There are, indeed, things that cannot be put into words.<br />They make themselves manifest.”</p>
  <p class="blog-epigraph__source">— Ludwig Wittgenstein, <cite>Tractatus Logico-Philosophicus</cite>, 6.522</p>
</aside>

## Intelligence Beyond Language

Intelligence is commonly understood as the ability to acquire and apply knowledge, adapt to unfamiliar situations, and solve new problems. Large language models exhibit this capacity by inferring task-relevant knowledge from textual context and applying it to new tasks. Yet intelligence need not be confined to language. Scientific and social systems often reveal themselves numerically before we can fully describe them in words: traffic moves across road networks, water flows through river basins, and physical fields evolve over space and time. These observations contain predictive relations that may be learned before they are named, formalized, or built into a specialist model.

We call the ability to acquire and apply knowledge from such numerical context [*numerical intelligence*]({{ '/numerical-intelligence/' | relative_url }}), and view it as a foundational pillar of artificial intelligence alongside linguistic intelligence. It treats measurements themselves as context: a model perceives raw numerical observations, infers the mechanisms or predictive relations that organize them, and reasons about unfamiliar systems without first translating those observations into words.

Unlike conventional deep learning, numerical intelligence does not encode the rules of one specific system in model weights and rely on retraining for each new application. Instead, the weights encode a general capacity to reason from numerical context, while the numerical prompt supplies the knowledge needed for the system at hand. This allows a frozen model to adapt at inference time.

This capability matters because the systems that shape science, society, and business—from climate and energy to cities, markets, and supply chains—are continuously revealed through measurements. Turning changing data into an understanding of system behavior, reliable predictions, and timely actions gives AI a direct interface to the measurable world.

## Operators as a Common Language

For numerical intelligence to work across heterogeneous systems, problems that appear unrelated must first be expressed in a common mathematical language. Operators provide such a language. An operator maps one space of functions or fields to another:

$$
\mathcal{F}: \mathcal{X}\to\mathcal{Y},
\qquad y(\cdot)=\mathcal{F}[x(\cdot)].
$$

Unlike a pointwise rule that maps one value to another, an operator takes an entire function or field as input and returns another function or field. This single abstraction covers many tasks: forecasting can evolve a traffic-density field forward in time, physical modeling can map a rainfall field to river discharge, inverse problems can recover an unknown coefficient field from observations, and control can map a desired target to an action. For a particular problem, the operator is determined by the governing dynamics and their parameters, the task formulation, the domain or geometry, the boundary and forcing conditions, and the choice of input and output variables. Operator approximation is the task of computing or learning this function-to-function map.

For a concrete example, consider a 1D conservation law

$$
\partial_t u(t,x) + \partial_x f(u(t,x)) = 0.
$$

On a fixed periodic spatial domain, choosing the flux function $$f$$ and evolution time $$\tau$$ defines a solution operator

$$
\mathcal{F}_{f,\tau}[u(0,\cdot)] = u(\tau,\cdot),
$$

or more compactly $$\mathcal{F}_{f,\tau}(u_0) = u_\tau$$. Its input is the entire initial profile $$u_0(x)$$, and its output is the entire evolved profile $$u(\tau,x)$$. Thus the operator is not merely one of the derivative symbols appearing in the PDE; it is the complete evolution rule induced by the equation. Because the domain and periodic boundary condition are held fixed here, changing $$f$$ or $$\tau$$ produces a different operator in this family.

Classical numerical methods evaluate a specified operator once the governing equation is known. Fixed-operator learning instead approximates that operator with a model $$G_\theta$$, so that $$G_\theta(u_0)\approx \mathcal{F}_{f,\tau}(u_0)$$. In both cases, the operator is fixed in advance; if it changes, the solver must be reformulated or the model retrained or fine-tuned.

**In-Context Operator Networks (ICON)** move the specification of the operator into the context. Rather than fitting one model to one fixed operator, a single model $$T_\theta$$ is trained over a distribution of operators and receives a few input-output examples as a numerical prompt:

$$
\widehat{u}_\tau^{(q)} = T_\theta\!\left(\{(u_0^{(i)},u_\tau^{(i)})\}_{i=1}^{k},\, u_0^{(q)}\right).
$$

The examples identify the operator relevant to the query, while the model weights provide the general ability to infer and apply it. No weight update is needed at test time. This is the mathematical realization of the numerical intelligence described above: knowledge about the current system enters through measurements rather than retraining.

This formulation also clarifies three stages in how machine learning works with numerical systems. The first approximates individual solution functions, as in Physics-Informed Neural Networks. The second approximates fixed solution operators, as in DeepONet and Fourier Neural Operator. ICON points to a third stage: the predictive relation itself is inferred from numerical context and then applied by a frozen model. The goal is no longer only to approximate one operator well, but to build models that can acquire and use new numerical knowledge in context.

## A Research Thread

Our work on ICON has developed through a sequence of papers, each advancing the framework by one step.

<sup>*</sup> Equal contribution &nbsp;&nbsp; <sup>†</sup> Corresponding author

**In-Context Operator Learning with Data Prompts for Differential Equation Problems** ([PNAS 2023](https://www.pnas.org/doi/10.1073/pnas.2310142120))

<em>Liu Yang, Siting Liu, Tingwei Meng, Stanley J. Osher<sup>†</sup></em>

This paper introduced in-context operator learning and ICON. Without fine-tuning, a single model handled 19 types of forward and inverse ODE, PDE, and mean-field control problems, each encompassing many operators and with key and value functions ranging from 1D functions to 2D spatiotemporal fields.

![Selected one-dimensional ICON test cases]({{ '/images/papers/icon-selected-1d-problems.png' | relative_url }}){: .figure-light-canvas style="width: 100%; display: block; margin: 0 auto"}

![A two-dimensional mean-field control problem solved by ICON]({{ '/images/papers/icon-mfg-side-by-side.png' | relative_url }}){: style="width: 100%; display: block; margin: 0 auto"}

Figure 1: ICON across 1D and 2D problems. The first panel shows selected 1D forward and inverse ODE and PDE problems: the top row contains key functions and the bottom row contains value functions (called conditions and QoIs in the original paper); grey dots form the numerical contextual examples, blue dots are the question, red dots are the prediction, and solid lines show the ground truth, closely overlapping the prediction. The second panel shows a 2D-to-2D mean-field control problem: three numerical contextual examples appear on the left, followed by the query key function, ground-truth value function, predicted value function, and prediction error on the right. The model infers the operator from these examples and solves the 2D spatiotemporal query in one forward pass.

**PDE Generalization of In-Context Operator Networks** ([JCP 2024](https://www.sciencedirect.com/science/article/pii/S0021999124006272))

<em>Liu Yang, Stanley J. Osher<sup>†</sup></em>

Here we demonstrated that a single ICON model can generalize across conservation laws with different fluxes and timesteps, including previously unseen PDE forms. We also studied prompt-design strategies based on changes of variables and varying the forecast horizon to enlarge the solvable regime.

**Fine-Tune Language Models as Multi-Modal Differential Equation Solvers** ([Neural Networks 2025](https://www.sciencedirect.com/science/article/abs/pii/S089360802500334X))

<em>Liu Yang, Siting Liu, and Stanley J. Osher<sup>†</sup></em>

This work adopted a decoder-only, language-model-style architecture and introduced multi-modal prompting. The model can use human language and LaTeX equations alongside numerical examples, providing an early interface between linguistic and numerical forms of context.

![]({{ '/images/papers/icon-multi-modal_numerical.png' | relative_url }}){: style="width: 100%; display: block; margin: 0 auto"}

Figure 2: Multi-modal in-context operator learning. Textual descriptions and numerical examples can both act as prompt information for the operator.

**VICON: Vision In-Context Operator Networks for Multi-Physics Fluid Dynamics Prediction** ([TMLR 2026](https://arxiv.org/pdf/2411.16063))

<em>Yadi Cao<sup>*</sup>, Yuxuan Liu<sup>*</sup>, Liu Yang, Rose Yu, Hayden Schaeffer, Stanley Osher<sup>†</sup></em>

VICON extends the framework to 2D fields with a patch-wise vision transformer, targeting multi-physics fluid dynamics with flexible rollout and partially missing frames.

**GICON: Graph In-Context Operator Networks for Generalizable Spatiotemporal Prediction** ([arXiv 2026](https://arxiv.org/abs/2603.12725v3))

<em>Chenghan Wu, Zongmin Yu, Boai Sun, Liu Yang<sup>†</sup></em>

GICON brings the same philosophy to graph-structured systems using graph message passing and example-aware positional encoding. It provides a shared representation for numerical observations on irregular domains and studies geometric and example-cardinality generalization on real spatiotemporal problems.

**In-Context Modeling as a Retrain-Free Paradigm for Foundation Models in Computational Science** ([arXiv 2026](https://arxiv.org/abs/2604.23098))

<em>Lingfeng Li<sup>*</sup>, Zhuoyuan Li<sup>*</sup>, Shun Li<sup>*</sup>, Kaixin Zhan, Huajian Gao<sup>†</sup>, Changqing Chen<sup>†</sup>, Liu Yang<sup>†</sup></em>

In-Context Modeling (ICM) connects in-context learning with physics-informed training. Instead of requiring labeled input-output pairs, the governing equations provide the training signal, while observational fields are presented to the model as physical context. At inference time, the frozen model assimilates new measurements and answers field queries in a single forward pass. This preserves the label-free supervision of physics-informed learning while removing the usual need to optimize a new model for every problem instance: one model generalizes across unseen materials, geometries, and loading conditions without retraining.

![Overview of In-Context Modeling with physics-informed training]({{ '/images/papers/icm-figure1.png' | relative_url }}){: .figure-light-canvas style="width: 100%; display: block; margin: 0 auto"}

Figure 3: Overview of ICM. Observational fields are converted into physics-informed tokens, governing equations provide the label-free training signal, and a frozen attention-based model infers unknown physical relationships from context without retraining.

**VICX: Generalizable Robot Manipulation via Video Generation and In-Context Operator Network** ([arXiv 2026](https://arxiv.org/abs/2606.12028), [Project]({{ '/vicx/' | relative_url }}))

<em>Song Chen<sup>*</sup>, Linyan Xiang<sup>*</sup>, Ying Zhou, Liu Yang<sup>†</sup></em>

VICX extends the ICON thread into embodied AI. A frozen video generation model provides high-level visual plans, while V2T-ICON grounds those generated videos into executable robot-state trajectories using retrieved image-state examples as in-context prompts. This turns visual-to-state grounding into an operator inference problem and connects in-context operator learning with closed-loop robot manipulation.

![VICX closed-loop robot manipulation framework]({{ '/vicx/assets/paper/closed_loop_evaluation.png' | relative_url }}){: .figure-light-canvas style="width: 80%; display: block; margin: 0 auto"}

Figure 4: The VICX framework. A frozen video generation model proposes a visual plan, and V2T-ICON grounds it into a robot trajectory using image-state references.

**A Foundation Model of Numerical Intelligence with Cross-Disciplinary Generalization** ([arXiv 2026](https://arxiv.org/abs/2607.28432))

<em>Chenghan Wu, Zongmin Yu, Liu Yang<sup>†</sup></em>

UNICON takes ICON to cross-disciplinary scale and makes the case for numerical intelligence concrete. A single model is trained on numerical systems spanning hydrology, traffic, power systems, weather, land, ocean, soil, solar resources and human mobility, then frozen. Presented with graph-based examples from a new system, it infers the predictive relation expressed by those examples and applies it to new queries. The same model approaches specialist performance even in disciplines absent from training, including web activity and air quality. Combining UNICON with language-model agents to perform contextual ensemble learning (CEL) yields further gains, enabling it to surpass state-of-the-art specialists in a discipline unseen during training. Experiments also show that a more diverse training corpus improves generalization to unseen systems and disciplines.

![UNICON training across heterogeneous numerical systems and inference on unseen disciplines]({{ '/images/papers/unicon-fig1.png' | relative_url }}){: style="width: 80%; display: block; margin: 0 auto"}

Figure 5: UNICON learns how to learn from graph-based numerical context, then applies that ability to systems and disciplines not represented in training.

## Programmable ICON Harnesses

A foundational insight in in-context operator learning is that the same numerical problem can be addressed in different ways by reformulating its prompt. Equivalent formulations need not elicit identical behavior from a frozen model: one formulation may place the problem in a regime that the model handles much more reliably than another. This opens a new route to better inference without retraining.

We call the mechanism that exploits this freedom an inference-time **harness**: a programmable layer around a frozen model that constructs and transforms numerical prompts, selects examples, orchestrates model calls, and processes or combines their outputs without updating the model weights. Like a harness for a language model, it can turn a general base model into a task-adapted system through code. It can also quantify uncertainty and impose explicit mathematical rules on the inference process. Across our work, this idea has developed into a continuing research thread:

**PDE Generalization of In-Context Operator Networks: A Study on 1D Scalar Nonlinear Conservation Laws** ([JCP 2024](https://www.sciencedirect.com/science/article/pii/S0021999124006272))

<em>Liu Yang, Stanley J. Osher<sup>†</sup></em>

*Change of variables and varying forecast horizon.* These strategies reformulate a numerical query before it is given to ICON. They show that prompt-space transformations can extend the range of problems addressed by the same frozen model.

**Chain of Operators: An Inference-Time Harness for In-Context Operator Learning** ([arXiv 2026](https://arxiv.org/abs/2606.12318))

<em>Minghui Yang, Chenghan Wu, Ling Guo, Liu Yang<sup>†</sup></em>

*Chain of Operators (CHOP).* This work turns prompt reformulation into a compositional harness. CHOP routes numerical prompts through explicit elementary operator transformations, moving a difficult query through intermediate representations where the frozen ICON is more capable and then mapping the result back.

**A Foundation Model of Numerical Intelligence with Cross-Disciplinary Generalization** ([arXiv 2026](https://arxiv.org/abs/2607.28432))

<em>Chenghan Wu, Zongmin Yu, Liu Yang<sup>†</sup></em>

*Contextual Ensemble Learning (CEL).* CEL orchestrates diverse context-building pathways and fuses their predictions. By constructing contexts from distinct observation slices, CEL systematically exposes the frozen network to complementary facets of the system, fusing these partial views to approximate the target operator far more reliably.

These methods share one principle: after training has produced a capable in-context learner, further adaptation can happen by programming its numerical prompt space and the sequence of model calls. A harness makes the inference behavior of a frozen ICON programmable without updating its weights, separating the costly acquisition of general in-context learning ability from the task-specific orchestration of how that ability is used.

## Linguistic Intelligence and Numerical Intelligence

Linguistic and numerical intelligence address different kinds of context. Linguistic intelligence acquires and applies knowledge expressed through words: task descriptions, metadata, scientific concepts, constraints, and domain heuristics. Numerical intelligence acquires and applies knowledge expressed through observations: graph signals, fields, multivariate sequences, and paired examples that reveal how a system behaves.

Their relationship is complementary rather than competitive. A language-model agent can interpret a high-level goal and use semantic or domain knowledge to design an inference harness: it may select examples, construct several contexts, choose transformations, call a frozen ICON repeatedly, and decide how to combine the predictions. The numerical model then learns predictive relations from those contexts and returns quantitative results that language alone cannot reliably produce.

More broadly, this division of labor suggests an AI ecosystem made of interoperable linguistic and numerical building blocks rather than one monolithic model expected to encode every capability.

![Linguistic and numerical intelligence in an artificial general intelligence ecosystem]({{ '/images/papers/unicon-fig1a.png' | relative_url }}){: style="width: 100%; display: block; margin: 0 auto"}

Figure 6: Linguistic and numerical intelligence as complementary components of an artificial general intelligence ecosystem.

## A Research Program for Numerical Intelligence

Together, these works define a research program for numerical intelligence: training teaches a model how to learn from context, while context supplies the knowledge required for the problem at hand.

Advancing this program will require shared models, diverse datasets, cross-disciplinary benchmarks, inference methods, and concrete applications. We built [**icon-core**](https://github.com/scaling-group/icon-core) as open-source infrastructure for this community, packaging model implementations, training pipelines, and examples into a reusable stack.

To accelerate numerical intelligence research, we built [**Evolving Ensemble of Agents (EvE)**](https://arxiv.org/abs/2605.09018) ([GitHub](https://github.com/scaling-group/eve), [Blog]({{ '/blogs/en/software-engineer/' | relative_url }})), a self-improving system that organizes highly capable coding agents into a decentralized, co-evolving ensemble. Rather than redesigning the base agents, EvE evolves both the guidance and skills that shape agent behavior and the candidate solutions in the code repository. We are already using EvE to iterate on ICON model architectures and design inference harnesses, bringing automated research directly into our effort to advance numerical intelligence.
