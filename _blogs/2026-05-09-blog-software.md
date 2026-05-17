---
title: "Software 3.0 and Evolutionary Ensemble (EvE) of Agents"
layout: blog_post
author: "Yang Liu, Yu Zongmin"
date: 2026-05-09
lang: en
translation_key: software-engineer
permalink: /blogs/en/software-engineer/
abstract: "Sharing our observations on how AI is reshaping the software development paradigm, along with our reflections and practices within this wave."
pinned: true
pin_order: 2
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

* **From Data-Driven to Empirical-Driven.**

  In the era of Software 2.0, models passively absorbed massive datasets to fit probability distributions within the data. The empirical-driven mode is fundamentally different: it no longer relies on static data stacking, but on a dynamic loop where an Agent actively interacts with its environment, gathers feedback, and self-corrects. This more closely resembles the scientific method: proposing a hypothesis (writing code), experimental validation (running tests), analyzing results (obtaining feedback), and refining the hypothesis. This shift implies that the source of intelligence has evolved from "imitating past data" to "exploring unknown spaces." Under this paradigm, as long as the feedback loop is sufficiently short and of high quality, an Agent can navigate and uncover complex logic never before discovered by humans—all through countless empirical iterations without the need for human-labeled data.

* **Human’s Focus: Building the Agent’s "Playground".**

  In the past, Software 1.0 engineers manually wrote logic, while in the 2.0 era, they were preoccupied with data cleaning and hyperparameter tuning. In principle, these execution-level tasks can now be handed over to Agents, with perhaps only a few exceptionally difficult problems still requiring the intervention of top-tier human minds.

  In the future, the primary role of humans will be to construct the "Playground" where Agents produce logic. This process is by no means trivial. Initially, the logic provided by an Agent may deviate entirely from expectations, requiring humans to continuously calibrate and align the system.

  We can draw an analogy from the Industrial Revolution: before the invention of the spinning machine, humans had to "hand-spin" yarn, where the quality of every thread depended on the physical strength and skill of the worker. This is much like an engineer writing code line by line. Once the spinning machine was invented, humans stopped spinning yarn directly and instead turned to building the machines. Human intelligence was no longer consumed by the production of each individual thread, but was instead focused on keeping the machine running and defining what constituted a "qualified" thread. The machine then produced yarn automatically and at high speed. If we replace "yarn" with "code" or "logic," the picture becomes clear: in the future, humans will not manufacture logic themselves; instead, they will build systems that produce logic tailored to our needs.

  Within this Playground, the most critical element is the definition of problems and evaluation metrics—these are the core "rules of the game". Because only humans understand specific needs and navigate the complexities of ethics and values, defining "what to do" and "what is good" remains a non-negotiable human prerogative, at least in the short term. If we define "programming" as the "expression of intent," then defining problems and metrics is the highest level of programming. As for "how to do it," that can largely be left to the Agents to explore.

* **Self-Referential Iteration of AI**

  Since AI is so good at iterating software, and AI itself is software, why not let AI develop a smarter version of itself, which then develops an even smarter version? This is self-referential iteration. Readers of *Gödel, Escher, Bach: An Eternal Golden Braid* will be familiar with this idea. One could even say this is the Holy Grail of AI.
  
  Self-referential iteration is an ongoing, continuous process of self-completion:
  * AI is already accelerating AI development, though it cannot yet fully detach from human intervention.
  * We can fix one part of the AI and self-referentially iterate the rest. For example, we can fix the LLM and iterate on the outer Agent layer.

  I estimate that within a few years, we will see AI training a smarter AI model and writing the peripheral harness systems without any human intervention. I see no fundamental obstacles.

  It is worth noting that AI's self-referential iteration will not shift the focus of human labor mentioned above. While this iteration will accelerate the pace of AI problem-solving, the decisions of "what to do" and "what defines quality" must remain firmly in human hands.

## Our Exploration

The proposal of the [LLM as Optimizers](https://arxiv.org/abs/2309.03409) paradigm in 2023 already signaled a massive shift in software iteration models. Subsequent work like [FunSearch](https://www.nature.com/articles/s41586-023-06924-6) and [AlphaEvolve](https://arxiv.org/abs/2506.13131) further confirmed this trend.

FunSearch and AlphaEvolve introduced evolutionary algorithm ideas on top of LLM-as-Optimizer. Evolutionary algorithms and LLMs are a match made in heaven: the LLM solves the hardest part of evolutionary algorithms (designing crossover and mutation operators), while the evolutionary algorithm provides the "version control" the LLM needs. You no longer have to worry about the LLM making a mess of the code because every modification creates a new version, and the evolutionary algorithm automatically selects the better-performing versions to continue iterating. However, I believe two problems remained unsolved:

* The "meta prompt" for LLM-as-Optimizer—the prompt telling the LLM to optimize based on examples—is still human-designed. There is huge design space here; for instance, letting the LLM compare different examples or optimization directions affects efficiency. Following the logic of fixing one part of the AI to iterate on the rest, we could fix the LLM and self-referentially iterate on this meta prompt. (I should note that the AlphaEvolve paper mentions they evolve the meta prompt, but I didn't fully grasp their implementation).
* The evolution from LLM-as-Optimizer to Agent-as-Optimizer. LLM-as-Optimizer struggles with complex codebases; using an Agent to manage context and workflow is a necessary step.

In the summer of 2025, I discussed these two goals with my collaborators. In short, we wanted to build an agent that could optimize both downstream task code and itself. This resulted in our paper, [Escher-Loop](https://arxiv.org/abs/2604.23472). The "Escher" here is a tribute to the place where I learned about self-referential iteration—the book *Gödel, Escher, Bach*. In this work, the "synchronous race + Elo rating" mechanism simply and effectively solved the problem of comparing whether "optimizing from 60 to 70" is more impressive than "optimizing from 90 to 95". This is a design I am particularly proud of. To me, this work was an interesting exploration (many thanks to my collaborators). It partially realized self-referential iteration and validated its effectiveness, though it didn't fully solve the leap to Agent-as-Optimizer.

Just as I was worrying about how to create a self-referentially iterating Agent-as-Optimizer that could solve truly complex problems, my team member Yu Zongmin pointed out that we don't need to reinvent the wheel. We should leverage existing coding agents like Claude Code and Codex. This idea was brilliant—the puzzle was complete! We could build the most "correct" thing possible based on all the reflections above.

* Since coding agents are rising and natural language is the new programming language, the target of self-referential iteration can simply be natural language intended for the coding agent, including optimization guidance, skills.md, and so on. Our experience is that natural language has a significant influence on Agent behavior; the degree of freedom is sufficient.
* The human role is to provide a specific evaluation standard for the downstream task that can score the code written by the Agent.
* We require a framework that is both universally compatible with all other agents and infinitely scalable. Ultimately, we settled on a completely decentralized ensemble architecture. By abandoning rigid role assignments (such as "leaders" vs. "workers"), EvE achieves universal compatibility. In principle, any existing agent or multi-agent system can be seamlessly integrated and treated as a single individual within this ensemble.
* For the downstream task, we chose the one closest to full AI self-iteration: designing foundation model architectures. Our interest lies in "in-context operator networks," a scientific computing foundation model framework, making it a natural testbed.

Ultimately, these practices became **Evolutionary Ensemble (EvE) of Agents** ([arXiv](https://arxiv.org/abs/2605.09018), [GitHub](https://github.com/scaling-group/eve)). The results were stunning: EvE can truly solve bottlenecks encountered in our AI research, even outperforming all the human designs within our own group.

## Conclusion

We predict that all human intellectual activity will eventually converge on the most essential elements: defining what needs to be done and determining what is "good" (i.e., the metrics). However, this task is far from trivial; it demands an exceptionally broad perspective and keen intuition. Perhaps, in the end, it truly aligns with Steve Jobs’ insight: "Ultimately, it comes down to taste."
