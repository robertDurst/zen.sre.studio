> In the beginning, there was simplicity.
>
> — anonymous

Yet in order to evolve a system, complexity becomes inevitable

> one day code base understandable and grug can get work done, everything good!
> 
> next day impossible: complexity demon spirit has entered code and very dangerous situation!
> 
> — [The Grug Brained Developer](https://grugbrain.dev/)

Systems evolve ways to handle complexity by retaining context via _mental models_ from which to use their intuition, biases, and judgement to make decisions about
system design. As time goes on, teams expand. Context cannot be retained within the head of a single human any more, so lines are drawn between system components.
Now the humans develop a network of SMEs (_subject matter experts_) to call on (or page) in times of need. However, systems continue to scale. Each SME then knows
less and less about the system as a whole functions. In a modified [parable of the blind men and the elephant](https://en.wikipedia.org/wiki/Blind_men_and_an_elephant)
borrowed from Donella H. Meadows's [Thinking in Systems](https://en.wikipedia.org/wiki/Thinking_In_Systems:_A_Primer), each individual simply knows how their component
works but less and less how it functions within the context of the entire system. To then communicate what "system is up means", each team defines a few SLOs (service
level objectives) to create a layer of abstraction at the system reliability level. Now teams present these at an engineering organization wide forum. Each member of
the forum now has context on the functionality of the system and what matters and is able to define a higher level mental model again.

Yet, even this will begin to fail us. As google contends in its [The Evolution of SRE at Google: Using STAMP to improve resilience in Google production systems](https://www.usenix.org/publications/loginonline/evolution-sre-google) that in order to continue scaling our operations as systems scale well beyond their current levels of complexity, we need to evolve from thinking of reliability at the component level and instead at the systems level, employing system theoretic frameworks to better reason about and handle system resiliency.

## Tooling?

Today there is a host of tooling to facilitate reasoning about services from various levels of abstraction.

### Application Performance Monitors

**Datadog (observability 1.0)**

**Honeycomb (observability 2.0)**

### Service Level Objectives

**Nobl9**

**Datadog**

### System Diagrams as Code



***

Yet, the work to quickly flip back and forth between these as you reason about the system in question is cognitively taxing. What kind of _tools for thought_ exist that enable you to:
* generate SLOs for the "official SLO reporting tool for c-suite"
* explore an intermediate representation for low level tool understanding
* editable high level language DSL for defining system constraints
* system dependency graph of all system components and how constraints interact
* ability to collaborate in a local first manner with other system architects
* real time feedback from constraint solvers and AI enabled copilots
* near real time system constraint updates

This is, in our opinion, a tooling gap in the ecosystem.
