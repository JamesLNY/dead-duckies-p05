# System Blueprint (_a.k.a._ "Design Doc")

## TNPG: DeadDuckies
## Project: Stardew Valley
## Target ship date: 2026-06-01 

---

#### Roster:


| Name | Email | Primary Role | Secondary Role |
|---|---|---|---|
|Emaan Asif | emaana3@nycstudents.net| Project Manager| Inventory/Pierre's |
|James Lei |jamesl291@nycstudents.net | Devo1 | Entities/Player|
|Sarah Zou |sarahz40@nycstudents.net | Devo2 | Farm/Town Map|
|Kiran Soemarjdo |kirans14@nycstudents.net | Devo3 | Time/NPC's |

---

# Summary
We are creating a Stardew Valley emulator with our initial phase focused on the standard farm map. Games can be joined by players through the lobby. Players start with a farm with randomized trees and debris. Players will have inventories, be able to sell and buy goods, fish, mine, craft, and establish relationships along with a time and gold system.

## Problem Being Solved
To offer a free, simplified, and web-version of Stardew Valley. Provides a trial of the game before users commit to buying the actual game. 

## Target Users
Users who enjoy Stardew Valley and other farming games

## Why This Project Matters
For us as developers, it builds off our work and lessons/skills learned from our previous P02 Civilization 6 emulator project while challenging us and helping us learn more about the gameplay logic and programming behind it. There are also many people we know who want to try Stardew Valley but are unable to or unsure about purchasing the actual game or do not have the storage for it.

---

# Minimum Viable Product (MVP) Scope

## Core Features (Required for Final Submission)
Features that **must** be completed:

1. Map
2. Tiles/Trees/Entities
3. Players
4. Movement
5. Inventory
6. Farming 
7. Time

## Stretch Features (Only if MVP is Complete)

1. Stamina
2. NPCs/Relationships
3. Mining/Fishing/Foraging
4. Crafting/Cooking/Construction/Tool Upgrades
6. Community Center
7. Skill Levels

## Explicit Non-Goals

Features intentionally excluded:
- NPC Schedules and Pathways in Stardew Valey
- Festivals, animals, marriage, seasons and weather, and story events in Stardew Valley

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

This project is frontend heavy, with a focus on JavaScript and its canvas feature, we decided to choose the standard backend technology stack that we were all most familiar and comfortable in as well as to not rely on a frontend framework so we could have more flexibility. 

---

# Team Ownership Plan

Each member must own meaningful deliverables.

| Team Member | Primary Ownership | Secondary Ownership | Specific Deliverables |
|---|---|---|---|
| James | Player, Entitities, Trees | Forest/Foraging, Mining, Houses | | 
| Kiran | Assets, Time, Static NPCs (Willy, Pierre), Relationships, Fishing | Static NPCs (Sebastian, Sam, Penny, Haley), Community Center | |
| Sarah | Maps, Pierre's, Travel, Stamina | Static NPCs (Gus, Clint), Eating | |
| Emaan | PM Tasks, Inventory | Crafting, Tool Upgrades, Cooking | |

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
- Trees
- Pierre's
- Teleport/Travel
- Static NPCs (Willy, Pierre for fish and seed shops)
- Relationships
- Stamina System
## Week 3 Goals:
- Forest Map/Foraging
- Mining
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
3. Trees (5/13/2026)
4. Town map and Pierre's (5/13/2026)
5. Teleport (5/13/2026)
6. Static NPCs (Willy, Pierre) (5/13/2026)
7. Stamina (5/18/2026)
8. Relationships (5/18/2026)
9. Fishing (5/20/2026)
11. Mining (5/20/2026)
12. Eating (5/20/2026)
13. Crafting (5/25/2026)
14. Forest Map/Foraging (5/25/2026)
15. Static NPCs (Gus, Clint) (5/27/2026)
16. Houses (5/30/2026)
17. Tool Upgrades (5/30/2026)
18. Static NPCs (Sebastian, Sam, Penny, Haley) (6/1/2026)

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
