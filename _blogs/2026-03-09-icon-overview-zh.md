---
title: "In-Context Operator Networks：迈向科学基础模型"
layout: blog_post
author: "杨柳"
date: 2026-03-09
lang: zh
translation_key: icon
permalink: /blogs/zh/icon-overview/
abstract: "介绍 In-Context Operator Networks（ICON）的核心想法、我们为什么把它看作迈向科学基础模型的一条路径，以及课题组近几篇论文之间的关系。"
pinned: true
pin_order: 1
---

许多科学问题都可以被看作学习一个算子，也就是把一个函数或场映射到另一个函数或场。在我们最近的工作中，我们一直在探索，能不能不为每个新的物理系统单独训练一个模型，而是让这个算子直接从上下文中被推断出来。

这就是 **In-Context Operator Networks（ICON）** 背后的核心想法。ICON 不是拟合“一个模型对应一个固定算子”，而是把一小组输入输出样例放进上下文中，在测试时不更新权重的前提下，直接预测新输入对应的输出。在我们早期的论文中，我们使用的是 *condition* 和 *quantity of interest (QoI)* 这组术语。这里我们改用 *key function* 和 *value function*，因为它们更贴近更广义的文献。

举一个具体的例子，考虑一个一维守恒律

$$
\partial_t u(t,x) + \partial_x f(u(t,x)) = 0.
$$

它的前向算子可以写成 $$\mathcal{F}_{f,\tau}[u(0,\cdot)] = u(\tau,\cdot)$$，更紧凑地也可以写成 $$\mathcal{F}_{f,\tau}(u_0) = u_\tau$$。经典数值方法是在给定控制方程之后，对这个算子进行离散逼近。在固定算子学习里，人们会针对某个特定的 $$f$$ 和 $$\tau$$ 训练一个模型 $$G_\theta$$，使得 $$G_\theta(u_0)\approx \mathcal{F}_{f,\tau}(u_0)$$。如果算子发生变化，通常就需要重新训练另一个模型，或者再做一次微调。

ICON 想处理的是另一种情形。我们训练一个单一模型 $$T_\theta$$，让它面对一个算子分布，并给它少量 in-context 样例：

$$
\widehat{u}_\tau^{(q)} = T_\theta\!\left(\{(u_0^{(i)},u_\tau^{(i)})\}_{i=1}^{k},\, u_0^{(q)}\right).
$$

我们的希望是，模型能从这些样例中推断出当前算子，并立刻把它应用到 query 上。这样一来，模型适应新任务的方式就不再是改权重，而是改 prompt。

为什么我们觉得这个方向有吸引力？

- 一个单一模型可以表示许多算子，而不是只表示一个。
- 通过替换 in-context 样例，模型可以即时适应一个新任务。
- 来自不同物理系统的大规模异质数据，不再只是麻烦，反而可能成为优势。
- 这种模型开始更像一个可复用的计算单元，可以被放进更大的科学工作流里，而不只是一个静态 surrogate。

从更广的角度看，我们认为神经方程求解器大致经历了三个阶段。第一阶段关注的是解函数本身的逼近，例如 Physics-Informed Neural Networks。第二阶段转向解算子的逼近，例如 DeepONet 和 Fourier Neural Operator。ICON 可以被看作第三阶段的一种早期尝试，在这个阶段里，模型被期待能够跨任务推断和复用算子，而不是只对单个任务做专门化拟合。

## 一条研究线索

我们关于 ICON 的工作，是沿着一系列论文逐步发展的，每篇论文都把这个框架往不同方向推进了一步。

**In-Context Operator Learning with Data Prompts for Differential Equation Problems** ([PNAS 2023](https://www.pnas.org/doi/10.1073/pnas.2310142120))

这篇论文引入了 in-context operator learning 和 ICON。一个单一模型在不微调的前提下，处理了 19 类问题，涵盖正向和逆向的 ODE、PDE 以及 mean-field control，而且每一类内部都包含许多具体算子。

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-mfg.png){: style="width: 100%; float: center; margin: 0px"}

图 1：一个 mean-field control 问题上的 in-context operator learning。模型从少量样例中推断算子，并在一次前向传播中完成 query。

**PDE Generalization of In-Context Operator Networks** ([JCP 2024](https://www.sciencedirect.com/science/article/pii/S0021999124006272))

在这篇工作中，我们考察了一个单一 ICON 模型能否在不同通量函数和不同时间步长的守恒律之间泛化，甚至泛化到此前未见过的 PDE 形式。我们还研究了 prompt design 策略，例如变量变换和 stride manipulation，以拓展模型可处理的问题范围。

**Fine-Tune Language Models as Multi-Modal Differential Equation Solvers** ([Neural Networks 2025](https://www.sciencedirect.com/science/article/abs/pii/S089360802500334X))

这篇工作采用了 decoder-only、language-model 风格的架构，并引入了 multi-modal prompting。模型现在不仅可以使用数值样例，还可以同时利用自然语言和 LaTeX 方程，这使得算子学习的接口丰富了很多。

![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-multi-modal_numerical.png){: style="width: 80%; float: center; margin: 0px"}

图 2：多模态 in-context operator learning。文本描述和数值样例都可以作为关于当前算子的 prompt 信息。

**VICON: Vision In-Context Operator Networks for Multi-Physics Fluid Dynamics Prediction** ([TMLR 2026](https://arxiv.org/pdf/2411.16063))

VICON 把这个框架扩展到了二维场，使用 patch-wise vision transformer，面向多物理场流体动力学，并支持灵活 rollout 以及部分缺帧的情形。

**GICON: Graph In-Context Operator Networks for Generalizable Spatiotemporal Prediction** ([arXiv 2026](https://arxiv.org/abs/2603.12725v3))

GICON 把同样的思想带到了图结构系统里，使用 graph message passing 和 example-aware positional encoding。它的目标是在真实时空问题上实现几何泛化和样例数量泛化。

## 迈向科学基础模型

我们更长期的兴趣，并不只是再做一个 operator approximator。我们关心的是，ICON 能不能真正成为 scientific foundation models：成为一种可复用的组件，能够跨任务迁移，能够与模拟器和基于语言的系统交互，也能够进入越来越 agentic 的科学工作流中。

ICON 的发展需要更广泛的社区共同参与。我们希望有更多人一起推动这个方向，不只是贡献新模型，也包括贡献数据集、benchmark、基础设施以及具体的科学应用。

这也是我们构建 [**icon-core**](https://github.com/scaling-group/icon-core) 的原因。它是一个面向 ICON 开发的开源基础设施包，把模型实现、训练流程和示例打包成一个可复用的栈，这样其他人就不需要每次都从零开始重建基础部分。
