# Outpost Zero: Junior Astronaut Mission Trainer

A 2D top-down game for the NASA Space Apps Challenge "Build a Junior Astronaut Mission Trainer" (ages 7-12). Built with Phaser 3 and plain JavaScript. It runs in any browser on a phone or computer, with no download or account.

Play it: https://aleetaminnu.github.io/junior-astronaut-outpost-zero/

## The idea
You run a small lunar outpost for 7 days. Each day you only get 10 power, and every building uses some of it. Keeping the crew alive and collecting science both come out of the same power, so there is no free choice.

## How to play
- Walk with the arrow keys, WASD or the on-screen buttons.
- Stand next to a building and press E, Space or INTERACT.
- Press END DAY when you are done. If you still have 2 or more power left, the game asks first.
- Survive 7 days and collect 50 science points.

## Buildings
- Habitat: +15 air (2 power)
- Greenhouse: +14 food (2 power)
- Supply Depot: +16 radiation shield (2 power)
- Science Lab: +10 science (3 power)
- Power Array: shows the power forecast (free)

Overnight air, food and shield drop, and radiation hurts the crew more when the shield is low. Random events (a solar flare, a radio blackout, lunar night and more) ask for a choice, and every choice costs something.

## NASA data and facts
See `docs/SOURCES.md`. The storm events are based on real events from the NASA DONKI archive and are saved inside the game. Radiation on the Moon is based on Chang'e 4 lander measurements. Power, air and food numbers are simplified for gameplay.

## Files
- `js/resources.js` the numbers and daily rules
- `js/missions.js` events, facts and day reports
- `js/interface.js` dashboard, popups and on-screen buttons
- `js/sound.js` sound effects made in the browser
- `js/player.js` the astronaut
- `js/world.js` the map and the buildings
- `js/main.js` starts the game
- `assets/logo.png`, `assets/icon.png` logo and icon

## License
MIT