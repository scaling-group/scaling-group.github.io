---
title: "Producing Mathematics, Understanding Mathematics"
layout: blog_post
author: "Jun Zhai"
date: 2026-09-07
lang: en
translation_key: producing-mathematics-understanding-mathematics
permalink: /blogs/en/producing-mathematics-understanding-mathematics/
abstract: "Starting late and compute-constrained, we placed third out of 256 participants in IGP24 by developing mathematical constructions and eventually adopting an autonomously coordinated agent ensemble. The campaign offers an early look at research organizations that can scale beyond an individual worker—and asks what greater mathematical capacity should be for as the production of mathematics becomes cheap and abundant."
---
Intellectual work, once the rarest and most valuable of commodities, is on the verge of becoming cheap and abundant. This will transform mathematics more profoundly than any increase in solved problems. In [*Mathematics in the age of AI*](https://arxiv.org/abs/2608.16753), Terence Tao asks what mathematical research is trying to achieve as AI becomes capable of research-level work. Machines can increasingly develop the constructions, methods, and arguments through which the subject advances. What do we want that greater capacity to make possible, and what place should human inquiry have within it?

Our [IGP24](https://competition.sair.foundation/competitions/igp24/overview) team, [S17](https://competition.sair.foundation/competitions/igp24/leaderboard), consisted of three NUS Mathematics graduate students: Jun Zhai, Zhikang Luo, and Guodong Tang. We relied on autonomous agent systems where machines didn't just propose candidate solutions, but developed mathematical methods and eventually coordinated their own search. The campaign became an experiment in scaling research beyond an individual worker—and an early look at what happens when the production of mathematics is automated.

## The IGP24 target space

When the competition closed in August 2026, our final collection covered 122,239 scoreable pairs and received a score of 6266.38.

The competition concerned an enormous, finite slice of the inverse Galois problem over \\(\mathbb{Q}\\). For an irreducible polynomial over the rational numbers, the Galois group records the symmetries among its roots. IGP24 fixed the degree at 24 and asked participants to submit explicit monic integer polynomials covering as many pairs of transitive Galois groups and real-root signatures as possible. Here the signature \\(r\\) specifies the number of real roots.

Degree 24 already contains 25,000 transitive groups, labeled \\(24\mathrm{T}1\\) through \\(24\mathrm{T}25000\\). Accounting for allowable real signatures gave the competition 165,836 target \\((24\mathrm{T}t, r)\\) pairs. Every candidate passed through an [exact verification pipeline](https://competition.sair.foundation/competitions/igp24/evaluation-setup). A plausible construction counted for nothing unless the polynomial had exactly the claimed algebraic structure.

A successful campaign required mathematical constructions, reliable implementations, target analysis, exact verification, and judgment about where the next unit of compute could still matter. Other teams continually changed the frontier of uncovered targets. A productive direction could become redundant overnight.

We began work roughly one month after the eventual winners and about ten days after the second-place team. The winners were [established domain specialists with decades of computational Galois theory behind them](https://antieau.github.io/2026/08/27/gunter-malle-juergen-klueners-ai.html): specialized algorithms, number-field databases, and a practiced sense of which calculations were worth running. They used modest hardware with exceptional mathematical efficiency. The runner-up had impressive computing resources, [reporting about 3,400 concurrent cores](https://antieau.github.io/2026/08/27/gunter-malle-juergen-klueners-ai.html#computing-resources) and thousands of agent sessions.

We had no pre-existing databases. We used more hardware than the winner, though both setups in the same order of magnitude. We could rely on neither accumulated domain precomputation nor brute-force dominance. Our choice of systems changed as new models became available and we encountered operational friction in the setups we were using.

## EvE: evolving mathematical constructions

We first tried our lab’s [EvE (Evolving Ensemble of Agents)](https://github.com/scaling-group/eve) framework because it was already available and could produce interpretable results.

Untargeted random sampling was a poor way to seek groups such as the alternating group \\(A_{24}\\). For uniformly sampled monic degree-24 integer polynomials with coefficients bounded by \\(H\\), the probability of obtaining the full symmetric group \\(S_{24}\\) tends to one as \\(H\\) grows, as [Bhargava’s theorem](https://arxiv.org/abs/2410.03792) establishes. Our EvE runs sought constructions that enforce a square discriminant while controlling the real-root signature. A square discriminant places the Galois group inside \\(A_{24}\\); establishing equality requires further verification.

EvE evolves polynomial searches together with the reasoning heuristics and programmatic strategies of coding agents across successive generations. Each combined classical real analysis and constructive geometry to find structural invariants that forced the Galois group to embed into \\(A_{24}\\). They developed constructions across five explicit real-root signatures:

* **\\(r = 0\\).** Hilbert-type families whose derivative satisfies \\(f'(x) = xP(x)^2\\), with an early unscaled polynomial given by \\(13x^{24} + 48x^{13} + 156x^2 + 13\\).
* **\\(r \in \{4, 8, 12\}\\).** Equal-critical-value Morse constructions, pairing critical points with equal polynomial values so that the discriminant factors as an exact square while steering the real-root count.
* **\\(r = 24\\).** A connection between classical orthogonal polynomials and Galois invariants through \\(24! \cdot L_{24}^{(1)}\\), where \\(L_{24}^{(1)}\\) is the generalized Laguerre polynomial. This construction produced 24 positive real roots and a provably square discriminant.

EvE was effective at discovering self-contained polynomial generators, but IGP24 did not offer a stable object for it to evolve. Progress depended on a portfolio of heterogeneous methods, accumulated evidence, live targets, and external computations whose relative value changed throughout the campaign. Selecting successive generations of whole generators conflated the quality of a method with the temporary value of the targets it happened to reach. In these generational cycles, human judgment went to deciding which code survived, not to engaging with the underlying algebraic ideas. We instead needed to preserve methods as separate research lanes and adapt the allocation among them.

That suggested a different unit of adaptation: not a whole generator selected between generations, but a long-horizon agent able to revise its methods as evidence and targets changed.

## Ultra: long-running research and its limits

[GPT‑5.6 Sol Ultra](https://openai.com/index/gpt-5-6/) had recently become available and appeared to offer exactly this through native multi-agent coordination. We therefore switched from EvE and tested Ultra across dozens of runs. Its agents explored group-action routes for producing further degree-24 polynomials, tested constructions computationally, and submitted verified results. The work accumulated in construction scripts, experimental outputs, and further directions to pursue.

Over longer runs, the workspaces became increasingly difficult to make sense of, and the agents’ conversational context deteriorated. They were trying to track hundreds of open \\((24\mathrm{T}t, r)\\) targets. As they lost track of their work, they hallucinated prior verification states, repeated exhausted code paths, and confused which targets had already been captured on the live leaderboard.

We repeatedly had to reset and relaunch both the workspace and the agent to restore productive work. In practice, the researcher's role degraded into context custodian—clearing out stale memory and coaxing the model back on track instead of contemplating the algebraic landscapes it was bumping against. The recurring deterioration made these interventions part of operating Ultra throughout the campaign.

Externalizing this state proved essential: when we retired Ultra, its ongoing experiments and promising research leads weren't lost with its context window. They formed the operational baseline for the decoupled ensemble that followed.

## Separating proposals, state, and coordination

Ultra’s problems and the release of [DeepSeek-V4-Flash-0731](https://api-docs.deepseek.com/updates/) prompted us to try an ensemble. The late campaign used an autonomous, 28-agent decoupled fleet. We divided the work into specialized roles with strictly bounded contexts:

* **Generative construction agents** drafted algebraic hypotheses and parameterized search scripts at high throughput.
* **Synthesis and critique agents** inspected failed code traces, formulated geometric constraints, and designed family expansions.
* **Target and yield evaluators** monitored open leaderboard gaps and computed expected yield per core-hour.

Generative agents wrote code, proposed constructions, and interpreted mathematics. Deterministic services handled routine job admission, execution, banking, and submission through deduplication tables, queue capacities, budget gates, and exact verification routines. This kept routine transactions moving while the coordinator attended to strategy.

At first, I was the coordinator. I read every periodic worker report and made the allocation decisions by hand: reprioritize this target, spin down that saturated family, move these workers into an underexplored algebraic regime. Reading a failure trace and deciding what it meant was central to these decisions. The lack of a clean reward signal made the task a poor fit for a hardcoded bandit allocator or a Thompson-sampling heuristic.

Once my judgments had stabilized into a repeatable pattern, we put an **LLM portfolio coordinator** in the same position. It evaluated the same reports and issued the same three kinds of directives. It could set policy and handle exceptions, while deterministic services enforced operational limits and executed routine transactions.

As it turned out, the LLM carried out the same coordinating duties continuously, at machine speed, without waiting for me to wake up and read the reports. It successfully took over a recurring part of my research labor.

## What an algebraic failure could teach the fleet

The turning point for this setup came when the coordinator was finally made to shift from allocating raw compute to guiding mathematical strategy directly, completely taking over my job. A clear demonstration of this was the `same-closure-constructor` role it introduced. It was made to exploit an exact algebraic property: the Galois closure associated with an already established degree-24 number field can support transitive permutation representations beyond the action under which the field was originally discovered. Those alternative actions offered routes to further degree-24 polynomials.

The role implemented an extraction pipeline based on the following mathematical procedure:

1. Extract the Galois group \\(G\\) of an already verified degree-24 polynomial.
2. Enumerate all conjugacy classes of index-24 subgroups \\(H \le G\\).
3. Compute the coset action \\(G \curvearrowright G/H\\) to identify the target transitive group ID \\(t\\).
4. Determine the source field’s actual complex-conjugation element and count its fixed points in \\(G/H\\) to predict the real-root signature \\(r\\).
5. For uncovered \\((t, r)\\) pairs on the live leaderboard, compute the primitive subfield polynomial associated with the subgroup, then verify its degree, irreducibility, signature, and group ID.

The same-closure-constructor operated above this fixed computation. It adapted the surrounding search when facts appeared only during execution. It changed source coverage after discovering gaps in the available signatures, widened the source pool after source-specific complex-conjugation failures, and reconstructed the pipeline when temporary state was lost.

The important question was what a failed extraction ruled out. Abstract subgroup reachability described what the group permitted, while the realized complex-conjugation class determined what a particular source field could produce. A signature mismatch therefore eliminated that source realization, not necessarily the route itself. The deterministic materializer detected source-specific failures, while the agent decided whether each failure called for another source, a wider search, or abandonment of the route. Across the retained same-closure work, the lane produced 89 verified polynomial lines covering 68 distinct targets.

## Scaling the institution

The dominant scaling story in AI has concerned the capability of an individual worker: larger models, more training data, more test-time compute, and longer contexts. Our campaign points to another quantity worth scaling—the amount of useful parallel work an organization can sustain.

Additional workers need to reach territory that existing work has not covered. Local evidence must change global allocation quickly. A successful method must become available beyond the agent that discovered it. And the organization must retain what it has learned when one model is replaced by another.

This parallel coordination challenge is not unique to algebraic search. On September 4, while this piece was in draft, [Anthropic reported](https://www.anthropic.com/research/formalizing-fermats-last-theorem) that a fleet of Claude agents had produced the first complete, machine-checked formalization of Fermat’s Last Theorem in Lean. The effort produced 13 million lines of code and used 29,500 intermediate theorems in the final proof, taking 11 days and roughly six billion output tokens. Anthropic noted that single-agent, long-context attempts struggled with memory degradation; their platform, [Prove2Me](https://arxiv.org/abs/2608.28433), succeeded by maintaining a shared dependency graph that helped agents choose tasks and proceed in parallel. Our shared record of experiments and targets addressed the exact same structural vulnerability. Both efforts suggest that reliable external state, not just expanding context windows, is what allows complex mathematical work to scale across autonomous systems.

This organizational axis will matter more as strong base models diffuse. A frontier model can increasingly be rented through an API. A laboratory’s accumulated research state is harder to copy: executable methods, negative knowledge, experimental interfaces, verification machinery, and judgment about allocating attention. Next year’s best model may be different. The organization should still be more capable because of what this year’s models discovered.

In an AI-native institute, roles can form around a bottleneck, divide when evidence reveals two distinct problems, and disappear when a search is exhausted. Different models can occupy different roles, drawing on a common record of claims, methods, costs, and open decisions. Research can then extend beyond the memory and attention of any individual worker.

## Results, methods, and understanding

As these autonomous research systems scale, they bring into sharp relief three distinct frontiers of mathematical work:

* **The result frontier**, which consists of verified objects—our team’s final collection of 122,239 scoreable pairs.
* **The method frontier**, which consists of procedures that generate whole classes of objects, such as EvE’s \\(A_{24}\\) Morse invariants and our same-closure extraction pipeline.
* **The understanding frontier**, which consists of structural explanations: why an obstruction occurs, which principles govern it, and how those principles fit into a larger theory.

The same-closure episode produced an explanation as well as new targets. It showed why subgroup reachability alone could not settle the signature question: the arithmetic realization of complex conjugation mattered. Yet turning this observation into general theory resists easy automation: knowing that an involution obstructs a target does not reveal whether the failure is an artifact of that single number field or an intrinsic arithmetic bottleneck governing the entire family. Moving toward broader theory would require organizing such explanations across construction families, identifying their common structure, and establishing general statements. Making those statements and their reasoning intelligible to people would be a further achievement. IGP24 rewarded the resulting polynomials without assessing either that theoretical synthesis or its contribution to human understanding.

Even a complete collection of 165,836 verified polynomials would not automatically organize itself into a mathematical theory of degree-24 number fields.

Mathematics develops methods, builds theories, creates explanations, and chooses concepts that make later work possible. Assessing those achievements requires evidence beyond a count of successful submissions. Scarcity of attempts has no intrinsic intellectual value. If mathematical objects can be produced and verified at machine scale, they should be.

The danger is that success at the measured task can conceal stagnation elsewhere. Deterministic verifiers reject invalid proofs within their scope. A perfectly verified deluge can still advance the result frontier while methods, purpose, and human understanding remain stationary.

These frontiers concern what research produces. We may also value participating in mathematics: learning, exploring, exercising judgment, and sharing understanding with others. Advancing mathematical knowledge and participating in mathematical inquiry can reinforce each other. As more of the operational work becomes automated, we must decide how those purposes should remain connected.

## What greater capacity is for

For me, doing mathematics means both coming to understand something and hoping to contribute something new. I enjoy working through a difficult idea and the moment it finally makes sense. AI could help me reach mathematics I could not reach alone and take part in discoveries I could not otherwise make. But a world with more answers does not guarantee a world with more understanding.

As mathematical production becomes cheap, the decisive question is what we optimize for. We can build institutions that merely accumulate verified results, or ones that treat methods, explanations, and human understanding as objectives in their own right. **The point of greater capacity is not only to produce more mathematics, but to enlarge what can be understood—and who can take part in understanding it.**
