# Components.care React

## Overview

The aim of this project is to provide a solid fundation for developing complex React based web applications.

There are 5 types of components you will find here:
- Standalone Components
> Standalone Components are designed to run without any further integration of the Components.care framework and can be used as an extension of your existing UI libraries.
- Application Framework
> The Application Framework provides you with a set of pre-configured common libraries to enable you rapid development of new applications
- Non-standalone Components
> UI Components based off the application framework
- Backend Integration
> Backend Integration provides automatic data management and a backend communication layer
- Backend Components
> Backend Components are UI components with Backend integration

Used Libraries:
- Material-UI (Used as base for UI components)
- react-i18n (Provided by the framework to easily create multi-locale applications)
- react-router-dom (Provided by the framework to enable promatically controllable routing in your React app)
- Redux (Provided and used by the backend integration for data handling)

## Developer Setup

### Running the developer environment

1. Run `npm install`
2. Run `npm start`

### Path overview

- `src/stories`: Storybook Stories for previewing library components
- TODO: Create a directory structure for the 5 types of components mentioned above

### Building the source code

1. Run `npm install`
2. Run `npm build`
3. You'll find the output files under `dist/`
