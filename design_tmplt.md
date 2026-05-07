# System Blueprint (_a.k.a._ "Design Doc")

## TNPG: DeadDuckies
## project: Stardew Valley
## Target ship date: {2026-06-08}

---

#### roster:


| Name | Email | Primary Role | Secondary Role |
|---|---|---|---|
| | | | |
| | | | |
| | | | |
| | | | |

---


# Summary
{Keep it tight. Concise. 1 sentence. Really need more? 3 max.}

## Problem Being Solved


## Target Users

Who will use this system?

- ____________________________________
- ____________________________________


## Why This Project Matters


---

# Minimum Viable Product (MVP) Scope

## Core Features (Required for Final Submission)
Features that **must** be completed:
1.
1.
1.

## Stretch Features (Only if MVP is Complete)
1.
1.
1.

## Explicit Non-Goals

Features intentionally excluded:
-
-

---

# Technology Stack

| Layer | Selected Tool |
|---|---|
| Backend Framework | Flask |
| Frontend Framework | None |
| Database | SQLite |
| Authentication | Flask Sessions |
| ORM / DB Library | None |

## Why This Stack Was Chosen

Because this project seems to be frontend heavy, with a focus on canvas and javascript, we decided to choose the standard backend technology stack.

---

# Team Ownership Plan

Each member must own meaningful deliverables.

| Team Member | Primary Ownership | Secondary Ownership | Specific Deliverables |
|---|---|---|---|
| James | Map, Farming | NPCs | |
| Kiran | Time, NPCs, Fishing | | Display Timer|
| Sarah | Stamina | Map | |
| Emaan | Inventory, Crafting, Shop | | |

---

# Component map

![](http://marge.stuy.edu/~jlei60/Screenshot%20from%202026-05-05%2010-30-29.png)

# Site map

![](http://marge.stuy.edu/~jlei60/Screenshot%20from%202026-05-05%2010-29-43.png)

```
Landing Page
   ↓
Login / Register
   ↓
Lobby
   ├── Join Game
   ├── Load Save Game
   ↓
Game
```

## Key User Stories
### eg0
As a __________, I want to __________ so that...

### eg1
As a __________, I want to __________ so that...

### eg2
As a __________, I want to __________ so that...



# Database Design

{Insert your table/document organizational structure here}


# Testing Plan
{Delineate here your plan for testing each component}

# Timeline
## Week 1 Goals:
- Farm Map (scrolling, software for json for impassable, untillable, teleporter tiles)
- Player Movement
- Entities (anything that goes on top of a tile, debris, worms, etc,)
- Time System
- Inventory
## Week 2 Goals:
- Town Map
- Pierre's
- Teleport/Travel
- Static NPCs (Willy, Pierre for fish and seed shops)
- Relationships
- Stamina System
## Week 3 Goals:
- Forest Map/Foraging
- Trees
- Fishing
- Crafting
## CHOPPING BLOCK:
- Static NPCs (Gus, Clint for saloon and blacksmith)
- Tool Upgrades
- House
## Internal Deadlines:
{List milestones your team has identified, in the order they must be completed. Set a target completion date for each.}


# Completion Criteria (_a.k.a._ "Definition of 'Done'")
Project is considered complete when all of the following are true:
1.
1.
1.

# Open Questions
{Delineate anything undecided here}

# Appendix
{Any relevant info that is useful but would have interrupted narrative flow above, or cluttered the information portrayed}

# Other
{Put here anything that did not sensibly fit under above headings. This section will inform evolution of SoftDev.}
