import { createRaceLeaderboardScene } from './scenes/RaceLeaderboardScene';
import { createSettingsScene } from './scenes/SettingsScene';

//import { handleResize } from './utils/windowResize';

// Clear localStorage items related to racers
function clearRacerStorage() {
    Object.keys(localStorage).forEach((key) => {
    if (key.endsWith(".racers")) {
      localStorage.removeItem(key);
      console.log(`Removed localStorage item: ${key}`);
    }
  });
}

clearRacerStorage();

let currentScene = null;

function initializeScene(createSceneFunction) {
    if (currentScene) {
        // Add scene clean up options here
        currentScene.cleanUp();
    }

    currentScene = createSceneFunction();
}

// Routing
function handleRoute() {
    const path = window.location.pathname;

    switch (path) {
        case '/':
            initializeScene(createSettingsScene);
            break;
        case '/leaderboard':
            initializeScene(createRaceLeaderboardScene);
            break;
        default:
            document.getElementById('app').innerHTML = '<h1>404 - Page Not Found</h1>';
            break;
    }
}

// Listen to route changes
window.addEventListener('popstate', handleRoute);

// Initialize the first route
handleRoute();