---
title: "Software: From 1.0 to 3.0, and the Future"
layout: blog_post
author: "Yang Liu, Yu Zongmin"
date: 2026-05-09
lang: en
translation_key: software-engineer
permalink: /blogs/en/software-engineer/
abstract: "Sharing our observations on how AI is reshaping the software development paradigm, along with our reflections and practices within this wave."
---

This article was written by Yang Liu, following in-depth discussions and exchanges with team member Yu Zongmin. In the text below, "I" refers to Yang Liu. I am by no means an expert in software development; I simply want to share the thinking behind our recent work, "Evolutionary Ensemble (EvE) of Agents" ([arXiv](https://arxiv.org/abs/2605.09018), [GitHub](https://github.com/scaling-group/eve)).

## Software 1.0: Engineers Iterating on Traditional Code

My reflections began with my experience working at an excellent autonomous driving startup after completing my PhD. It was 2021, and at that stage, the industry mainstream was not the end-to-end neural networks later championed by Tesla, but rather extremely precise expert logic.

Back then, I observed that the essence of R&D was actually a grueling form of iteration. Some called it "Humanized Descent"; in academia, it’s sometimes jokingly referred to as "Graduate Student Descent." Simply put, given a specific metric, engineers rely on experience to repeatedly adjust complex code logic with a single goal: to make that metric go up.

This "Humanized Descent" model powered the early technological explosion. It offers excellent interpretability—when dealing with specific requirements (e.g., a client asking for a logic branch for a specific road condition), one can quickly deploy by adding a few lines of if-else. However, the drawbacks are obvious:

* **Expensive Development:** This model is an extremely costly drain on intellect. Software engineering sits at the frontier of "scalable intelligence," where the intellect of software engineers is a scarce resource and salaries are high.
* **Sluggish Iteration:** Every modification requires human analysis and adjustment, leading to long iteration cycles.
* **Capability Limits:** As systems scale, code logic becomes increasingly bloated, eventually evolving into complex systems where attribution is difficult. Adding functions or fixing problems can introduce new bugs. This complexity eventually exceeds the processing capacity of human engineers, thereby capping the system's potential.

## Software 2.0: Neural Networks Replacing Traditional Code

Subsequently, the industry began shifting toward the end-to-end neural network path represented by Tesla. This was the [Software 2.0](https://karpathy.medium.com/software-2-0-a64152b37c35) vision proposed by Andrej Karpathy. The core idea is: I have a massive chunk of logic, and I will replace it with a neural network. If Software 1.0 is humans manually writing logic, Software 2.0 is "training" logic by organizing data and designing models and objective functions.

Software 2.0 largely overcomes the drawbacks of Software 1.0 mentioned above, but it introduces its own problems:

* Dependency on massive amounts of data.
* The "black box" interpretability dilemma and reliability issues.
* Weakness in "targeted modifications": For example, if I suddenly want to add a specific feature, it’s not easily done. I can only fine-tune, but will that fine-tuning break something elsewhere? It’s hard to say; neural networks provide no such guarantees and may even suffer from "Catastrophic Forgetting."

At a certain stage, Software 2.0 was constantly encroaching on the territory of Software 1.0. Much of the "metric-boosting" work could be handled by neural networks. Their power made training a network the default choice for many tasks, even when it might not be the optimal choice. For instance, Gaussian Splatting is actually better suited than neural networks for fitting the lighting and geometry of a scene.

The greatest inspiration the Software 2.0 vision gave me was a higher-level understanding of the concept of "programming." What is programming? Programming is not defined by typing specific characters; it is telling a computer "what to do." Long ago, using punch cards was programming; later, using assembly and high-level languages was programming. So why wouldn't training a neural network be programming? The medium changes, but the core remains the expression of human intent.

## Software 3.0: The Impact of LLMs

I first saw the concept of Software 3.0 [here](https://www.latent.space/p/ai-engineer). The main view is that LLMs broaden the meaning of software development significantly. To be honest, I am still not clear on the strict definition of Software 3.0, but it certainly centers on the "rise of Coding Agents" and "natural language becoming the new programming language." When prompt engineering took off in 2023, Andrej Karpathy said: [The hottest new programming language is English](https://x.com/karpathy/status/1617979122625712128?lang=en). Now, with the rise of coding agents, we provide more than just prompts; we provide files to guide the Agent. Ultimately, programming is telling the computer what we want to do.

What will happen in the future? Here are my personal thoughts.

* **Traditional code returns in a new way, potentially reclaiming territory lost to neural networks.**

  Coding Agents are excellent at "optimizing code to improve metrics." They almost perfectly solve the core problems of Software 1.0:
  * **Development is no longer expensive:** Coding Agents provide cheap intelligence.
  * **Iteration is no longer sluggish:** Coding Agents can complete modifications and tests in seconds, greatly shortening the cycle—sometimes even faster than training a neural network.
  * **Capabilities are no longer limited:** Coding Agents can handle massive codebases and may eventually manage complex systems beyond human capacity.


  Furthermore, the code written by Coding Agents largely avoids the pitfalls of neural networks:
  * It no longer requires massive data, as LLMs contain human prior knowledge and reasoning abilities.
  * It offers better interpretability and reliability because the logic is explicit. No matter how complex the code, its interpretability still exceeds that of a neural network.
  * Targeted modifications are easier because we can directly modify the logic rather than fine-tuning a black box.


  I believe much of current software development should be re-examined to see whether training a neural network or letting a Coding Agent write traditional code is more appropriate. Weng Jiayi expressed similar views in [this blog post](https://trinkle23897.github.io/learning-beyond-gradients/). He discussed the possibility of coding agents replacing deep reinforcement learning, but the use of coding agents to write traditional code to replace neural networks shouldn't be limited to control systems.

  Simple functions—such as low-dimensional functions or functions where every input dimension has a rational explanation—do not need neural networks for fitting. Neural networks have the so-called "universal approximation," but letting a coding agent find a more interpretable, problem-specific parametric representation (like Gaussian Splatting) or a piece of code logic for each problem can also produce universal approximation. The true domain of neural networks is extremely complex functions, especially foundation models.

* **Most human effort will concentrate on defining metrics.**

  In past software engineering, defining metrics was important, but most labor was not spent there. In the Software 1.0 era, most engineers wrote code to improve metrics; in 2.0, most trained networks to improve them (especially data cleaning). However, as long as the goal is clear, these tasks can theoretically be handed over to Agents—perhaps only a few extremely difficult problems will still require top-tier human brains. But the definition of the metric, because requirements are known only to humans and due to ethical considerations, etc., will still need to be completed by humans for the foreseeable future. We said "programming is telling the computer what to do"—defining the metric is telling the machine "what to do." As for "how to do it," that can largely be left to the Agent to explore.

* **Self-Referential Iteration of AI**

  Since AI is so good at iterating software, and AI itself is software, why not let AI develop a smarter version of itself, which then develops an even smarter version? This is self-referential iteration. Readers of *Gödel, Escher, Bach: An Eternal Golden Braid* will be familiar with this idea. One could even say this is the Holy Grail of AI.
  
  Self-referential iteration is an ongoing, continuous process of self-completion:
  * AI is already accelerating AI development, though it cannot yet fully detach from human intervention.
  * We can fix one part of the AI and self-referentially iterate the rest. For example, we can fix the LLM and iterate on the outer Agent layer.


  I estimate that within a few years, we will see AI training a smarter AI model and writing the peripheral harness systems without any human intervention. I see no fundamental obstacles.

## Our Exploration

The proposal of the [LLM as Optimizers](https://arxiv.org/abs/2309.03409) paradigm in 2023 already signaled a massive shift in software iteration models. Subsequent work like [FunSearch](https://www.nature.com/articles/s41586-023-06924-6) and [AlphaEvolve](https://arxiv.org/abs/2506.13131) further confirmed this trend.

FunSearch and AlphaEvolve introduced evolutionary algorithm ideas on top of LLM-as-Optimizer. Evolutionary algorithms and LLMs are a match made in heaven: the LLM solves the hardest part of evolutionary algorithms (designing crossover and mutation operators), while the evolutionary algorithm provides the "version control" the LLM needs. You no longer have to worry about the LLM making a mess of the code because every modification creates a new version, and the evolutionary algorithm automatically selects the better-performing versions to continue iterating. However, I believe two problems remained unsolved:

* The "meta prompt" for LLM-as-Optimizer—the prompt telling the LLM to optimize based on examples—is still human-designed. There is huge design space here; for instance, letting the LLM compare different examples or optimization directions affects efficiency. Following the logic of fixing one part of the AI to iterate on the rest, we could fix the LLM and self-referentially iterate on this meta prompt. (I should note that the AlphaEvolve paper mentions they evolve the meta prompt, but I didn't fully grasp their implementation).
* The evolution from LLM-as-Optimizer to Agent-as-Optimizer. LLM-as-Optimizer struggles with complex codebases; using an Agent to manage context and workflow is a necessary step.

In the summer of 2025, I shared these two goals with my collaborators. In short, we wanted to build an agent that could optimize both downstream task code and itself. This resulted in our paper, [Escher-Loop](https://arxiv.org/abs/2604.23472). The "Escher" here is a tribute to the place where I learned about self-referential iteration—the book *Gödel, Escher, Bach*. In this work, the "synchronous race + Elo rating" mechanism simply and effectively solved the problem of comparing whether "optimizing from 60 to 70" is more impressive than "optimizing from 90 to 95". This is a design I am particularly proud of. To me, this work was an interesting exploration (many thanks to my collaborators). It partially realized self-referential iteration and validated its effectiveness, though it didn't fully solve the leap to Agent-as-Optimizer.

Just as I was worrying about how to create a self-referentially iterating Agent-as-Optimizer that could solve truly complex problems, my team member Yu Zongmin pointed out that we don't need to reinvent the wheel. We should leverage existing coding agents like Claude Code and Codex. This idea was brilliant—the puzzle was complete! We could build the most "correct" thing possible based on all the reflections above.

* Since coding agents are rising and natural language is the new programming language, the target of self-referential iteration can simply be natural language intended for the coding agent, including optimization guidance, skills.md, and so on. Our experience is that natural language has a significant influence on Agent behavior; the degree of freedom is sufficient.
* The human role is to provide a specific evaluation standard for the downstream task that can score the code written by the Agent.
* We require a framework that is both universally compatible with all other agents and infinitely scalable. Ultimately, we settled on a completely decentralized ensemble architecture. By abandoning rigid role assignments (such as "leaders" vs. "workers"), EvE achieves universal compatibility. In principle, any existing agent or multi-agent system can be seamlessly integrated and treated as a single individual within this ensemble.
* For the downstream task, we chose the one closest to full AI self-iteration: designing foundation model architectures. Our interest lies in "in-context operator networks," a scientific computing foundation model framework, making it a natural testbed.

Ultimately, these practices became **Evolutionary Ensemble (EvE) of Agents** ([arXiv](https://arxiv.org/abs/2605.09018), [GitHub](https://github.com/scaling-group/eve)). The results were stunning: EvE can truly solve bottlenecks encountered in our AI research, even outperforming all the human designs within our own group.

## Conclusion

We predict that all human intellectual activity will eventually converge on the most essential elements: defining what needs to be done and determining what is "good" (i.e., the metrics). However, this task is far from trivial; it demands an exceptionally broad perspective and keen intuition. Perhaps, in the end, it truly aligns with Steve Jobs’ insight: "Ultimately, it comes down to taste."