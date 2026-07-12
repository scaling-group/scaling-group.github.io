---
title: "Humans Provide Information, AI Performs Computation"
layout: blog_post
author: "Liu Yang"
date: 2026-06-21
lang: en
translation_key: information-vs-computation
permalink: /blogs/en/information-vs-computation/
abstract: "AI can do more and more computation for us, but computation is not the same as information. The value of humans will increasingly concentrate on collecting information that AI cannot easily obtain, and compressing that information into problems that AI can use."
---

## Introduction

Over the past period of time, I have felt a strong sense of confusion.

Anyone who has experienced the rapid progress of Codex and Claude Code over the past half year can probably relate to this feeling: if code can be written this way, and research can be done this way, then where exactly does human value lie?

At first, I also tended to place the answer in familiar positions: humans propose ideas, humans judge directions, humans make the final call. These statements are all correct, but they are not precise enough. As agents become stronger, "proposing ideas" and "judging directions" themselves will also be partially automated. The real question is not which traditional step humans still retain, but this: in the new system jointly formed by humans and agents, what is the most irreplaceable role of humans?

After thinking about this for some time, I increasingly feel that the answer still lies in **context**. Saying that "humans need to provide context" may sound like a cliche, but the more I think about it, the deeper it feels. The key is whether humans can bring in things that AI cannot obtain on its own: real-world background, real needs, personal preferences, concrete constraints, and the standards used in the end to judge whether a result is good or bad.

## Information and Computation

We often say that AI is smart: it can write code, derive formulas, make plans, and run experiments, as if it is constantly creating new things. But if we look more carefully, much of what AI does is actually computation. It unfolds already-given information, derives implicit consequences, combines a set of constraints, and finally obtains a result that would take humans a long time to reach.

This is of course very valuable. But this value should not be misunderstood as "it obtained new information out of nowhere."

We can roughly write AI's output as a formula:

AI output = f(the model/agent's own knowledge, information found through search, human-provided context)

AI's output depends on the information it can access. What exists in the model parameters and agent program, what search can find, and what humans input are the conditions under which it continues to compute.

Without additional information input, AI's output can only be a high-probability output under these existing information conditions. It can write this output fluently and reason through it in detail, but from the perspective of information sources, it still has not crossed that boundary.

I think this distinction directly affects how we understand human value. The stronger AI becomes, the less humans should place themselves in the position of computation. What humans should really do is collect as much information as possible that AI cannot obtain, and then tell that information to AI in an appropriate way.

## The Example of Go

Consider a somewhat extreme example.

Suppose I fully tell you the rules of Go: how large the board is, how black and white stones are placed, what liberties are, what capturing means, what ko means, and how scoring works at the end of the game. Then, starting from these rules, you derive the optimal move in a particular position.

This derivation process may be extremely complex. It may require searching a huge game tree, comparing countless variations, and judging the win rate after every move. For humans, this is almost impossible to do manually; for strong AI, this is exactly what it is good at.

But from the perspective of information, the optimal move does not appear out of nowhere. As long as the rules, the initial position, and the definition of "optimal" have already been given, the answer has already been determined by this information. What you do afterward is compute that answer.

In other words, this process does not introduce new information. It introduces computation.

This is also why AI is especially suitable for replacing us in computation. It can make derivations extremely detailed, expand branches to a degree that we neither have the patience nor the ability to explore, check edge cases one by one, and expose hidden contradictions. It can go very far inside a given information world.

But no matter how far it goes, it is still inside that information world.

## Do Not Compete with AI on Computation

If this judgment is correct, then the way humans work should change.

In the past, much human value came from computation. You could write code, do accounting, derive formulas, and organize materials. These things are still important, of course, but they are becoming increasingly suitable to hand over to AI.

Not because these things are low-level, but because their essence is to unfold given information. As long as the goal, constraints, evaluation criteria, and background are clear enough, AI can extend the following chain very far for us.

So humans should not put their main energy into computational work. We should not train ourselves to become executors who are much slower than AI.

A better division of labor is: humans provide information, and AI performs computation.

Here, information does not mean generic materials. It means things that AI cannot easily obtain by itself: things you have actually experienced, details you heard while talking to others, your feel for a domain, which constraints cannot be touched in reality, which solutions look reasonable but will actually fail, and what resources are truly scarce in your environment.

These things are often not on public webpages, nor in papers and documentation. Even if they exist, they may not exist in a form that AI can directly understand and use.

## Problem Finding Is Context Compression

Seen this way, "finding problems" itself becomes very important. Here, a "problem" means a well-defined task: what the task is, what constraints the solution must satisfy, and what standards should be used to evaluate the result.

A person encounters a large amount of information every day: things they read, words they hear, anomalies they see when running experiments, pauses that appear during discussions with others, doubts that briefly flash through their own mind. Most of this information cannot be handed to AI as-is.

I cannot stuff everything I see, hear, and think about every day into context. Even if I could, it would not necessarily be useful. Long context is not automatically valuable; it may simply transfer the confusion to the model.

So I have to do one thing: compress the information I have into topics that I believe are valuable.

This compression is necessarily lossy. A problem cannot preserve all background. It throws away a large amount of detail, but it should reflect my understanding of the matter: where there is a contradiction, where there is an opportunity, where there is uncertainty, and which direction is worth computing further.

The problem itself is not the final answer. It is more like an interface. It compresses my information to the point where AI can begin computation.

## Our Practice: Evolutionary Ensemble of Agents (EvE)

This is also one of the core motivations behind our work on [EvE](https://github.com/scaling-group/eve).

What EvE does can be understood as wrapping existing, already powerful coding agents inside a decentralized evolutionary ensemble. It evolves two populations at the same time: one is the solver population inside the repository, namely concrete code, algorithms, proof drafts, or other functional components; the other is the agent population, namely the guidance and skills used by agents. The former is responsible for producing better solutions, while the latter is responsible for continuously improving the way solutions are produced.

Concretely, when running EvE, you need to give it three kinds of things.

First, a working environment. It can be a GitHub repository or a local folder; it can contain a codebase, or it can contain a mathematical problem.

Second, the solution space that is allowed to be modified. For example, which files or folders contain code or proof drafts that agents are allowed to keep advancing.

Third, the scoring steps used to evaluate each solution. These can be shell scripts, agent judge prompts, or a combination of the two.

Once these things are clearly provided, EvE can begin searching for strong solutions. Problems suitable for it usually share one property: the results can be tested or judged. For example, designing an algorithm, improving a piece of code, or solving a mathematical problem. Humans define the environment, boundaries, and evaluation method; the system is responsible for trying, comparing, inheriting, and evolving at scale inside this space. This is very consistent with the idea here that "humans provide information, AI performs computation." Humans do not need to hand-write a workflow for every task, nor do they need to design all task-specific skills from the beginning. What humans need to provide is the information that truly defines the problem.

## Humans Provide Information, AI Performs Computation

I understand the future way of working through this sentence: **humans provide information, AI performs computation**.

Collecting information requires entering the real world. You need to run experiments, talk to people, observe how systems fail, understand the inertia of an organization, and know which needs are only verbal claims and which pain points will truly make people change their behavior. Much key information is hidden in local experience, in concrete scenarios, and in judgments that have not been written down.

Expressing information is also hard. You cannot pour all experience into AI unchanged. You can only choose a way to compress it. You need to decide what is core, what is noise, what should become a constraint, what should become an evaluation criterion, and what should become a problem that can be computed further.

After AI makes computation cheap, the value of information will instead rise. Once information is expressed correctly, the computation that follows can be rapidly amplified; but if the information itself is wrong, missing, or distorted during compression, AI will only unfold very efficiently in the wrong direction.

## Conclusion

Information and computation are two different things.

AI progress makes computation increasingly cheap. It can deepen derivations for us, fill in details, unfold possibilities, and get implementations running. Humans should no longer place their main value in this kind of computational labor.

Human value will increasingly concentrate on the other side: obtaining information from the real world that AI cannot obtain, and then compressing that information into problems, constraints, examples, and evaluation criteria that AI can use.

Finding problems is especially important. It is a compression of information that a person has encountered over a long period of time. If the compression is good, AI can compute many things along it; if the compression is poor, even the strongest computation will only amplify the error.

## Acknowledgement

My sincere thanks go to my friend Zhao Kong for the numerous conversations we shared. The intellectual sparks from those exchanges were indispensable to this piece; without them, this article would never have been written.