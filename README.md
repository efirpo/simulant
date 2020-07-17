__SIMULANT__
initialized July 17th, 2020, by Ethan Alexander Firpo

## Description

Simulant is an application that simulates ant behavior using JavaScript.

## Capstone Proposal

#### Name of Student:

Ethan Firpo

#### Name of Project:

#### Simulant -- but ant is in italics like it's the internet in 2002.

#### Project's Purpose or Goal: (What will it do for users?)

Provide education for a beginner/intermediate level science audience on ants through real-time and interactive simulation of ant colony behavior and data.

#### List the absolute minimum features the project requires to meet this purpose or goal:

Provide basic factual information on simplest ant behavior(foraging).
Provide static simulation of simplest ant behavior.
Allow a user to start/stop the simulation.
What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.

- React (likely React Native and/or ReactDND)
- CreateJS/EaselJS
- Redux
- Node.js


#### If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.

- Simulate in-nest colony behavior, reproduction, life cycles, labor roles.
- Allow users to place food, water, otherwise interact with the ants, control speed at which simulation runs.
- Allow users to store their own "ant farms" and come back to their colony.
- Allow users to track individual ants' life cycles and behaviors.
- Simulate other arthropod/animal behaviors -- bees foraging/colony activity, spider-web construction, and fish-school behavior come to mind as things I would like to build some day.  
- Maybe game-ify the whole thing and add point systems, predators, rival ant colonies, randomize start conditions and make it all dynamic with RNG.

#### What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?

I'll need a database for user information, but unknown whether I'll be using Firestore, or MongoDB. I'll have to see as we begin using Firestore.

#### Is there anything else you'd like your instructor to know?

This has been edited since the original proposal to reflect choices of development tools. CreateJS/EaselJS has replaced the Unity Engine as my choice to render the simulation, notably.

## Setup

1. If you do not have Node installed on your machine, please go to https://www.learnhowtoprogram.com/intermediate-javascript/getting-started-with-javascript/installing-node-js and follow the instructions for your operating system.
2. Clone or download this repository from https://github.com/efirpo/simulant
3. In your terminal, navigate to the root directory of the project and run `npm install`
4. Run `npm start` once that completes.
5. Navigate to `localhost:3000` in your web browser.
6. Enjoy the simple animation.

## Legal

MIT License (c) 2020 Ethan Alexander Firpo.