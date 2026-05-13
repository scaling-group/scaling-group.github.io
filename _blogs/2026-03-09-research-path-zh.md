---
title: "从 PI-GAN 和 B-PINNs 到 ICON：一条研究路径"
layout: blog_post
author: "杨柳"
date: 2026-03-09
lang: zh
translation_key: research-path
permalink: /blogs/zh/research-path/
abstract: "简要回顾通向当前研究工作的路径：从 PDE 的不确定性量化与贝叶斯推断，到最优传输、粒子动力学，最终到 ICON。"
---

回过头看，研究方向往往比它真正展开时显得更清晰。我们课题组当前的重点，是面向科学计算的现代可规模化 AI，尤其是 in-context operator learning。但这个方向并不是一下子冒出来的，而是从几条早期看起来彼此分离的研究线索中逐渐汇合出来的。

这篇文章想简要回顾一下这条路径。

## PDE 的不确定性量化与贝叶斯推断

其中一条早期线索，来自一个基本问题：当我们知道控制方程，同时只有稀疏或带噪的观测时，应该如何对物理系统进行随机建模和不确定性量化？

这引出了我们关于 **Physics-Informed Generative Adversarial Networks (PI-GANs)** 的工作（[arXiv 2018](https://arxiv.org/abs/1811.02033), [SIAM SISC 2020](https://epubs.siam.org/doi/abs/10.1137/18M1225409?journalCode=sjoce3)）。这项工作的目标，是在学习过程中显式编码物理约束，从而对物理系统上的分布进行建模，尤其是在无限维或函数空间的设定下。

PI-GANs 与 **Bayesian Physics-Informed Neural Networks (B-PINNs)**（[arXiv 2020](https://arxiv.org/abs/2003.06097), [JCP 2021](https://www.sciencedirect.com/science/article/abs/pii/S0021999120306872)）结合之后，变得尤其有用。B-PINNs 提供了一种利用控制方程和观测数据构建 likelihood 的方式，并进一步支撑了更广义的 PDE 贝叶斯推断流程（[arXiv 2021](https://arxiv.org/abs/2106.05863), [JCP 2022](https://www.sciencedirect.com/science/article/abs/pii/S0021999122001358)）。

![]({{ site.url }}{{ site.baseurl }}/images/papers/PI-GAN-B-PINN.png){: style="width: 70%; float: center; margin: 0px"}

图 1：PI-GAN 和 B-PINNs 中，从数据和物理出发学习函数先验与后验的示意图。

现在回头看，这条线索里其实已经包含了 ICON 的一个关键动机：我们希望从大量历史数据中，在一族函数空间问题上学到一个 prior，然后再根据新的观测去推断 posterior。ICON 可以看作这个想法的一种极致形式，因为 posterior inference 是在上下文中完成的，不再需要对模型做任何进一步训练。

## 从非配对数据中学习最优传输与粒子动力学

另一条重要线索，是从非配对数据中学习最优传输与粒子动力学。

在 **potential flow generator**（[arXiv 2019](https://arxiv.org/pdf/1908.11462), [IEEE TNNLS 2020](https://ieeexplore.ieee.org/document/9233438)）中，我们提出了一个可插拔的生成器模块，可用于 GAN 和 flow-based models。这个架构建立在 ODE 视角之上，并在损失函数中加入了一项与最优传输条件对应的 Hamilton-Jacobi 方程约束。最终得到的生成器，不只是把样本从一个分布搬运到另一个分布，它还近似了传输映射本身。据我所知，这是第一篇把深度生成模型和最优传输的连续流表述联系起来的论文。

![]({{ site.url }}{{ site.baseurl }}/images/papers/WGAN_all.png){: style="width: 40%; float: center; margin: 0px"}
![]({{ site.url }}{{ site.baseurl }}/images/papers/flow_all.png){: style="width: 45%; float: center; margin: 0px"}

图 2：GAN（左三列）和 normalizing flow（右三列）中的 potential flow generator。第一行展示了源分布 $$\mu$$（紫色）和目标分布 $$\nu$$（橙色）的样本或未归一化密度，第二行展示了学到的最优传输映射 $$G$$，以及推前分布 $$G_{\#}\mu$$。

随后，我们又把这条线扩展到了从非配对粒子观测中推断粒子动力学（[arXiv 2020](https://arxiv.org/abs/2008.01915), [SIAM SISC 2022](https://epubs.siam.org/doi/abs/10.1137/21M1413018)）。这个想法现在已经被广泛用于单细胞转录组学中，而那里的核心挑战，往往正是从非配对观测中推断动力学。

这些工作后来也被一些很好的后续研究所引用，例如 [high-dimensional mean-field problems](https://www.pnas.org/doi/10.1073/pnas.1922204117)、[single-cell transcriptomics](https://www.nature.com/articles/s42256-023-00763-w) 和 [flow matching for generative modeling](https://arxiv.org/pdf/2210.02747)。

这里还有一篇值得一提的论文：[arXiv 2021](https://arxiv.org/abs/2101.06802)。这篇论文没有发表，也没有受到太多关注，但它已经在探索一种接近 foundation models 的想法。在附录里，我们讨论了这样一种可能性：训练一个统一模型，把两个分布作为输入，然后直接预测它们之间的 optimal transport，而不需要为每一对新分布重新训练。用一个已经训练好的模型做前向推断来求解科学问题，而不是针对每个具体实例重新优化一个模型，这个更一般的想法，在那篇文章里就已经开始被探索了。这也非常接近 ICON 的精神。

## 结语

回头看，从不确定性量化、贝叶斯推断、最优传输和粒子动力学到 ICON，这条路径并不是一连串彼此无关的话题。它背后的方向始终是一样的：从大规模的科学问题家族中学到可复用的结构，再通过前向推断去解决新的实例，而不是每次都重新开始。
