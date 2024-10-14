# Verlet solver

A simple implementation of 2D Verlet physics written in JavaScript based on [Vite](https://vite.dev/) and [PixiJS](https://pixijs.com/) as renderer.

![image](https://github.com/user-attachments/assets/9c01bacf-2f5c-4e80-b8b4-0f880c449464)

### Requirements
- [Node.js](https://nodejs.org/)

### Setup
`git clone https://github.com/vanorium/verletSolver.git`

`cd verletSolver`

`npm install`

### Preview
`npm run dev`

### Building
`npm run build`

A collection of builded files will be collected in a folder "dist"

### For a better understanding
- The physics simulation is based on [Verlet integration](https://en.wikipedia.org/wiki/Verlet_integration)
- Fixed timestep makes the simuluation deterministic
- Initially, it's deterministic with a step that equals to 165/1000. Removing the expression `dt = 165/1000` in the code (in verlet.js) removes determenistic nature and makes frames stable for all devices

  ![image](https://github.com/user-attachments/assets/fae94975-8f9e-456d-b852-2091f5b45744)

  
### Supported
- Сircular collision
- Сonstraints
- Joints

### Inspired by
https://github.com/johnBuffer/VerletSFML
