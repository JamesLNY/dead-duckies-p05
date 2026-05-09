# System Blueprint (_a.k.a._ "Design Doc")

## TNPG: DeadDuckies
## Project: Stardew Valley
## Target ship date: {2026-06-08}

---

#### Roster:


| Name | Email | Primary Role | Secondary Role |
|---|---|---|---|
|Emaan Asif | emaana3@nycstudents.net| Project Manager| |
|James Lei |jamesl291@nycstudents.net | Devo1 | |
|Sarah Zou |sarahz40@nycstudents.net | Devo2| |
|Kiran Soemarjdo |kirans14@nycstudents.net | Devo3 | |

---

# Summary
We are creating a Stardew Valley emulator with our initial phase focused on the standard farm map. Games can be joined by players through the lobby in a pregenerated map. Players will have inventories, be able to sell and buy goods, fish, mine, craft, and establish relationships.

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

# Component Map

![](http://marge.stuy.edu/~jlei60/Screenshot%20from%202026-05-05%2010-30-29.png)

# Site Map

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

### Farmer
As a farmer, I want to be tame the land in my farm, hoe tiles, and plant crops to make a nice big farm.

### Monopolist
As a monopolist, I want to profit from the crops which I grow to obtain as much money as possible.

### Hoarder
As a hoarder, I want to increase the amount of items I can store in my inventory to collect all the items in the game.

# Database Design

| Players |  |  |
| ----- | :---- | :---- |
| TEXT | name | UNIQUE |
| TEXT | password |  |

| Games |  |  |
| ----- | :---- | :---- |
| INTEGER | id | PK AUTOINCREMENT |
| TEXT | player1 | FK REF players(name) |
| TEXT | player2 | FK REF players(name) |
| TEXT | player3 | FK REF players(name) |
| TEXT | player4 | FK REF players(name) |
| INTEGER | day | DEFAULT 0 |
| INTEGER | money | DEFAULT 500 |

| Tiles |  |  |
| ----- | :---- | :---- |
| INTEGER | game\_id | FK REF games(id) |
| TEXT | map |  |
| INTEGER | x\_pos |  |
| INTEGER | y\_pos |  |
| TEXT | furniture | DEFAULT “\[\]” |
| BOOLEAN | tilled |  |

| Inventory |  |  |
| ----- | :---- | :---- |
| INTEGER | game | FK REF games(id) |
| TEXT | player | FK REF player(username) |
| TEXT | contents |  |
| INTEGER | upgrades | DEFAULT 0 |

| Plants |  |  |
| ----- | :---- | :---- |
| INTEGER | game\_id | FK REF games(id) |
| TEXT | map |  |
| INTEGER | x\_pos |  |
| INTEGER | y\_pos |  |
| TEXT | type |  |
| INTEGER | age | DEFAULT 0 |

| Placeables |  |  |
| ----- | :---- | :---- |
| INTEGER | game\_id | FK REF games(id) |
| TEXT | map |  |
| INTEGER | x\_pos |  |
| INTEGER | y\_pos |  |
| TEXT | type |  |
| INTEGER | item |  |
| INTEGER | progress |  |

| Relationships |  |  |
| ----- | :---- | :---- |
| INTEGER | game | FK REF games(id) |
| TEXT | npc\_name |  |
| TEXT | player | FK REF player(username) |
| INTEGER | points |  |
| INTEGER | giftcount | DEFAULT 0 |
| TEXT | status |  |


# Testing Plan
- Lobby
   - Make sure that no more than 4 ppl can join a lobby, that the same player can't join twice, etc
   - Prevent duplicate results when multiple people perform the same action at the same time
- Map
   - Make sure all impassable tiles are indeed impassable
   - Make sure layers render correctly (eg, player is rendered behind objects he walks behind, and the objects fade properly)
- Authentication
   - Check that sqlite injection isn't possible
   - Ensure that there are no URLs that allow authentication to be bypassed
   - Make sure empty strings can't be used as username/password
- NPC
   - Ensure that dialogue triggers are correct
   - Make sure relationship system functions as intended
- Game
   - Ensure that saving works correctly
   - Check that no data is saved if the game is closed before the end of the day
- Farming
   - Make sure crop growth times are correct and that proper growth stages are correctly displayed
   - Ensure crops only grow when watered and can only be planted on tilled soil
   - Check that only tillable tiles can be hoed
- Shop
   - Ensure items are priced correctly
   - Players cannot go below 0 gold
- Fishing
   - Ensure fishing AI works as intended
- Inventory
   - Make sure items properly carry over between days
   - Make sure items can only be picked up if inventory has space

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
- Mining
- Trees
- Fishing
- Crafting
- Eating
## Week 4 Goals:
- Static NPCs (Gus, Clint for saloon and blacksmith)
- Static NPCs (Sebastian, Sam, Penny, Haley)
- Tool Upgrades
- Houses
## CHOPPING BLOCK:
- Community Center
- Cooking/Recipes
- Skill Levels
- Sound Effects/Music
## Internal Deadlines:
1. Farm map and player movement (5/6/2026)
2. Entities, main game UI and time/inventory system (5/11/2026)
3. Town map and Pierre's (5/13/2026)



# Completion Criteria (_a.k.a._ "Definition of 'Done'")
Project is considered complete when all of the following are true:
1. Players are able to move and interact with the map  to obtain resources
1. Players are able to farm and fish
1. Players are able to buy and sell items

# Open Questions
- Implement community center/skill levels?
- Multiplayer?

# Appendix
Assets:
- https://lybell-art.github.io/xnb-js/ (used to extract files from Stardew Valley)
