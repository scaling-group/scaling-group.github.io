---
title: "Scaling Group: Research"
layout: textlay
excerpt: "Scaling Group: Research"
sitemap: false
permalink: /research/
---

# Research


Here are some themes that we currently work on:

**Foundation Scientific Learning Models** 

Can we build a single large model for a wide range of scientific problems?

We proposed a new framework for scientific machine learning, namely **“In-Context Operator Networks”** (ICON). A distinguishing feature of ICON is its ability to learn operators from data prompts during the inference phase, without weight adjustments. A single ICON model can tackle a wide range of tasks involving different operators, since it is trained as a generalist operator learner, rather than being tuned to approximate a specific operator. This is similar to how a single Large Language Model can solve a variety of natural language processing tasks specified by the language prompt.

In our [paper](https://www.pnas.org/doi/10.1073/pnas.2310142120) published in PNAS, we showed how **a single ICON model (without fine-tuning) manages 19 distinct problem types**, encompassing forward and inverse ODE, PDE, and mean-field control problems, each including infinite operators. Later in [this paper](https://arxiv.org/pdf/2308.05061.pdf), we fine-tuned the GPT-2 model as a multi-modal differential equation solver, prompting the model to perform scientific machine learning with human language and LaTeX equations, apart from numerical data (See the following figure). In [this paper](https://www.sciencedirect.com/science/article/pii/S0021999124006272), we showed how a single ICON model can make forward and reverse predictions for different PDEs with different strides, and **generalize well to PDEs with new forms**, without any fine-tuning. We also showed prompt engineer techniques to broaden the range of problems that an ICON model can address.

---
![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-multi-modal.png){: style="width: 70%; float: center; margin: 0px"}

Figure 1: Diagram for multi-modal in-context operator learning. The model learns the operator from the textual prompt and/or numerical examples, and applys to the question to make the prediction, with one forward pass.

---
![]({{ site.url }}{{ site.baseurl }}/images/papers/icon-mfg.png){: style="width: 100%; float: center; margin: 0px"}

Figure 2: Illustration of in-context operator learning for a mean-field control problem. The blue/red/black dots represent the data points in the prompt. The ICON model is able to learn the underlying operator from three examples and solve the problem with one forward pass.

---

Tracing the evolution of neural equation solvers, we see a three-act progression: Act 1 focused on approximating the solution function, e.g., Physics-Informed Neural Networks, while Act 2 shifted towards approximating the solution operator, e.g., Fourier Neural Operator, DeepONet. ICON can be viewed as an early attempt of Act 3, where the model acts like an intelligent learner that adapts to new physical systems and tasks.

**Uncertainty Quantification**

Coming soon...


**... and more** 
