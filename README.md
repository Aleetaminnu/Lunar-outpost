# Junior Astronaut: Outpost Zero

A 2D top-down game for the NASA Space Apps Challenge "Build a Junior Astronaut Mission Trainer" (ages 7-12). Built with Phaser 3 and plain JavaScript. Runs in any browser, no download or account.

Play it: https://aleetaminnu.github.io/junior-astronaut-outpost-zero/

## The idea
You run a lunar outpost, then a Martian one, with only a little power each day. Every building costs power, so keeping the crew alive always competes with doing science. There is no free choice.

## How to play
- Move with the joystick, arrow keys or WASD. Or tap a building and the astronaut walks there.
- Next to a building, press USE (E or Space on a keyboard).
- Press END DAY when you are done. Overnight air, food and shield drop and radiation hurts the crew.
- Finish four stages: Landing Camp, Base Camp, Science Outpost (Moon) and Mars Outpost. Each opens a new part of the base.
- The MAP button (or M) shows the whole base. Difficulty (Easy, Normal, Hard), sound and bigger text are on the start screen and top bar.

## What it teaches
- Power is limited, so life support, shielding, food and science trade off against each other.
- Radiation: the Moon's surface has about twice the radiation of Mars' surface. A strong shield matters more on the Moon.
- Space weather: solar flares and storms hit harder when your shield is weak.
- Communication delay: on the Moon a call to Earth takes about 3 seconds there and back. On Mars it takes 8 to 48 minutes, so Earth's answer arrives tomorrow and the crew has to decide alone.

## NASA data and facts used
See `docs/SOURCES.md` for each source and what we used it for.
- DONKI (Space Weather Database): the game asks for solar flares from the last 7 days. Active space weather makes storms and daily radiation stronger. If the live feed can't be reached the game uses saved archive events and says so on screen.
- Radiation levels: Chang'e 4 lander (Moon) and Curiosity RAD (Mars).
- Power, air, food and shield numbers are simplified for gameplay.

## Files
- `js/resources.js` shared numbers and daily rules
- `js/missions.js` stages, events, space weather, badges and the mission report
- `js/interface.js` dashboard, popups, joystick
- `js/player.js` astronaut
- `js/world.js` map, buildings and locked areas
- `js/sound.js` sound effects made in the browser
- `js/main.js` starts the game and runs the stages

## Team
1. Player development
2. World development
3. Interface development
4. Systems development
5. Mission development
6. Integration and testing

## AI use
Parts of the planning and code were written with AI assistance (ChatGPT and Claude). The team reviewed, tested and edited the code. Add your own note here about what each member did.

## License
MIT