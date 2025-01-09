# Race Sim Project Documentation

## Overview
This project is predominantly written in JavaScript, with some HTML and JSON files used for project setup. Key technologies include:
- **Three.js**: A library used for handling 3D animations.
- **Vite**: A Node.js-based build tool used to build the project and create an executable file.
Once project is installed and dependencies added with npm, project can be launched in dev mode using either of the following:
>> npm run dev
>> npx vite

## Main Page Explanation
- **Server**: The entry point is the `server.js` file located in the root directory. This file loads the `index.html` file, which in turn imports `src/main.js` as a module. The project’s functionality begins in `main.js`.
- **Main.js**: This file has two primary responsibilities:
  1. **Scene Creation**: It calls modules from the `scenes` directory to generate scenes.
  2. **Page Routing**: It handles navigation between scenes and connects scene functions to user interactions.

## Scenes
The project is divided into two main scenes:
1. **Settings Scene**:
   - Allows users to select and save branding options.
   - Due to a Vite limitation with HTML files during the build process, raw HTML is embedded within the file.
   - This file collects and displays branding settings for user interaction.

2. **Leaderboard Scene**:
   - More complex, utilizing custom-built modules to display a leaderboard.
   - **Initialization**: Creates the scene, camera, and renderer using Three.js.
   - **Data Integration**: The `getData` function currently pulls data from `leaderboardData.js`. This needs to be replaced with a call to the Race Sim database API to fetch real-time data.
   - **Dynamic Mesh Generation**: The leaderboard dynamically adjusts to the number of data entries, though modifications may be required when integrating with the API.
   - **Animation and Interaction**: Adds animation and interaction functions before calling the `animate` function to render the scene.

## Components
1. **RacerMesh**:
   - Structured in three parts:
     - **Group**: Allows interaction with the leaderboard (e.g., movement).
     - **Racer Meshes**: Generated for each racer, supporting individual animations and interactions.
     - **Fields**: Allow individual data updates for leaderboard entries.

2. **TableHeaderMesh**:
   - Comprises a single group of field meshes, similar to racer meshes but designed for the leaderboard header.

## Constants
- **Styles**: Ensures consistency across the page with defined colors and fonts.
- **TableConfigurations**: An older file that can simplify leaderboard layout changes if needed.

## Branding
- **defaultBranding**: Provides a starting point for branding settings.  
  Suggestion: Add constants like `botleyDefaultBranding` to streamline the setup for new projects and avoid resetting branding repeatedly.

## Utilities
These files manage complex scene-related operations:
- **createTextMesh**: Generates text meshes for components.
- **createTextSprite**: A deprecated module for text creation, retained for potential use in static scenes.

## Services
Modules responsible for animations and interactions:
- **highlightAnimation**: A deprecated function retained for potential reimplementation.
- **racerVisibility**: Creates a scrollable table with disappearing elements as required.
- **scrollAnimation**: Enables user scrolling interaction. While currently manual, automation can be added.
- **mouseEvents**: Handles mouse actions.
- **rayCaster**: Enables depth perception for 3D interactions.

## Views
- **Settings**: Initially used for HTML setup on the settings page. Due to Vite's limitations, the raw HTML was moved to `settingsScene.js`.

## Data
These files handle data generation and collection in the absence of a connection to the Race Sim API. Once API integration is complete, these files can be removed.
