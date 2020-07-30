__SIMUL*ANT*__
initialized July 17th, 2020, by Ethan Alexander Firpo

## Description

Simul*ant* is the beginning of a project that will showcase many different simulations of animal behavior, natural phenomena, and other algorithmically interesting things to simulate. The goal of this project is to encourage interest in the sciences and programming through the showcasing of what is possible with just a little applied logic.

Ants have been chosen as the first simulation to happen because ant behavior is famously an example of emergent behavior -- complexity arising based upon simple rules that each agent in a group follows -- allowing an ant colony to exhibit far more complex and evolutionarily advantageous behavior than any individual ant does on its own, or even is aware of happening in their daily life. As such modeling this behavior is relatively simple, compared to other examples of animal behavior, and the results are often mesmerizing. This made ants a perfect place to start.

Currently, Simul*ant* only simulates foraging behavior among ants, but is in process to eventually include a whole colony, both above and below ground. Several re-factorings will likely be necessary to achieve this goal. At time being, dark-red dots represent food, black dots represents ants, and bright-red dots represent ants carrying food. 


## Future Goals
(as of July 2020)
### For Simulant:
- Simulate in-nest ant colony behavior.
- Simulate further context for the ant colony's environment.
- Allow users to store and revisit ant colonies.
- Allow users to determine environmental and behavioral parameters (speed, strength of pheromones, amount of food available, etc)
- Allow users to interact with ants (feeding, obstruction-removal, etc)

### Other simulations planned:
- Simulate bee colony behavior.
- Simulate orb-weaver spider web-building behavior.
- Simulate galactic colonization on cosmological time-scales(an exploration of the Fermi Paradox)
- Simulate orbital mechanics and the three-body problem.

## Technology

This project is currently built in JavaScript, using React.js as a framework for the eventual web site where these simulations will be hosted. CreateJs, specifically the EaselJs sub-library(https://www.createjs.com/easeljs), was used to draw the simulation.

## Known Bugs

- As of July 30th, 2020, ants currently get stuck in trails. The solution is imminently doable, but a planned refactor of how pheremone-trails work will be necessary to implement in-nest behavior later, so the current version may never work perfectly.

## Setup

1. If you do not have Node installed on your machine, please go to https://www.learnhowtoprogram.com/intermediate-javascript/getting-started-with-javascript/installing-node-js and follow the instructions for your operating system.
2. Clone or download this repository from https://github.com/efirpo/simulant
3. In your terminal, navigate to the root directory of the project and run `npm install`
4. Run `npm start` once that completes.
5. Navigate to `localhost:3000` in your web browser.
6. Enjoy the simulation.

## Legal

MIT License (c) 2020 Ethan Alexander Firpo.
