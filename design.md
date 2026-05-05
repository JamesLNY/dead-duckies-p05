**P05: Stardew Valley**  
Team Name: DeadDuckies  
Roster: Emaan Asif (PM), James Lei (Dev 1), Sarah Zou (Dev 2), Kiran Soemardjo (Dev 3),  
TARGET SHIP DATE: 2026-06-08  
Site Location: https://stardewvalley.app/

**Description**  
We are creating a Stardew Valley emulator with our initial phase focused on the standard farm map. Games can be joined by players through the lobby in a pregenerated map. Players will have inventories, be able to sell and buy goods, fish, mine, craft, and establish relationships.

Map / Tiles / Movement: The world consists of a scrolling, tile-based map divided into regions (farm, town, forest, mines). Tiles represent terrain like water and trees. Players will be able to move across the map tile to tile.

Inventory: Players will have an inventory that stores all collected / bought items, including crops, materials, tools, and crafted goods. Items can be consumed, sold, or used for crafting and upgrades.

Farming: Crops and materials are produced through player actions and time progression on the farm.

Time / Stamina: The game runs on a daily cycle: time will affect NPCs and activities. Through actions, players will lose stamina.

NPCs / Relationships: NPCs function as static sprites for buying and selling goods. Relationships can also be established with these NPCs.

Mining / Fishing / Foraging Systems: These activities allow players to collect resources, and are specific to their maps.

Crafting / Tool upgrades: Players can convert materials into functional items (e.g., chests, furnaces) through crafting. Tools can be upgraded to improve efficiency with mining / fishing / foraging.

**Site Map**  
**![](http://marge.stuy.edu/~jlei60/Screenshot%20from%202026-05-05%2010-29-43.png)**  
Log In / Sign Up	\- Users create accounts and log in

Lobby	\- Users create a game or join other users’ game

Game	\- Displays the game

**External Resources**  
Web XNB Converter \- Extract Game Files  
(https://lybell-art.github.io/xnb-js/)

**Dependencies**  
Framework: None  
JavaScript: SocketIO (https://cdn.socket.io/4.8.1/socket.io.min.js)  
Python: Flask, Sqlite3, Flask-SocketIO  
APIs: None

**Tasks \+ Assignments**  
Project Manager: Emaan Asif

- (Phase 1\) Inventory  
- (Phase 2\) Pierre’s  
- (Phase 4\) Crafting  
- (Phase 4\) Tool Upgrades  
- (Phase 5\) Recipes

Dev1: James Lei

- (Phase 1\) Entities  
- (Phase 1\) Player   
- (Phase 2\) Travel  
- (Phase 3\) Trees  
- (Phase 4\) Houses  
- (Phase 4\) Static NPCs V2 (Gus, Clint)

Dev2: Sarah Zou

- (Phase 1\) Farm Map  
- (Phase 2\) Town Map  
- (Phase 2\) Stamina  
- (Phase 3\) Forest / Foraging  
- (Phase 3\) Mining Map  
- (Phase 4\) Eating

Dev3: Kiran Soemardjo

- (Phase 1\) Time  
- (Phase 2\) Static NPCs V1 (Willy, Pierre)  
- (Phase 2\) Relationships  
- (Phase 3\) Fishing  
- (Phase 4\) Static NPCs V3 (Sebastian, Sam, Penny, Haley)  
- (Phase 5\) Community Center

Extension Goals (Unassigned)

- Skill Levels  
- Sound effects/music

**Components**  
Authentication	\- Allows users to create accounts and log in

Lobby	\- Displays available games and let users create, join, and load games  
	\- Uses the User interface to associate games with users

Game	\- Synchronizes games across players and saves game states  
	\- Uses the Map interface to associate a map with a game

Map	\- Renders the map, the player, and all NPCs  
	\- Allows the player to travel between different areas and move

Farming	\- Allows the player to raise crops  
	\- Uses the Player interface to consume stamina  
	\- Uses the Time interface to reflect crop growth time  
	\- Uses the Item interface to create an item upon harvest

Fishing	\- Uses the Inventory interface to give a fish to a player  
	\- Uses the Item interface to create a new fish  
	\- Uses the Time interface to determine available fish species  
	\- Uses the Player interface to consume stamina

Shop	\- Allows the player to sell and purchase items  
	\- Uses the Item interface to obtain the gold equivalent of an item  
	\- Uses the Player interface to give or take gold from a player  
	\- Uses the Inventory interface to give or take an item from a player

Inventory	\- Allows the player to store and craft items

NPC	\- Creates NPCs for the player to interact with

**Component Map**

**![](http://marge.stuy.edu/~jlei60/Screenshot%20from%202026-05-05%2010-30-29.png\)**

**Database Organization**

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
