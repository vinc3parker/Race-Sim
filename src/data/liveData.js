// Initial data structure for racers in three different races
let races = {
  london: [
    { name: "John Speedster", rank: 1 },
    { name: "Emily Dash", rank: 2 },
    { name: "Michael Turbo", rank: 3 },
    { name: "Sarah Blaze", rank: 4 },
    { name: "Chris Rocket", rank: 5 },
    { name: "Anna Flash", rank: 6 },
  ],
  manchester: [
    { name: "Daniel Swift", rank: 1 },
    { name: "Laura Lightning", rank: 2 },
    { name: "Peter Blaze", rank: 3 },
    { name: "Sophia Vortex", rank: 4 },
    { name: "Jacob Thunder", rank: 5 },
    { name: "Olivia Sprint", rank: 6 },
  ],
  bristol: [
    { name: "Liam Bolt", rank: 1 },
    { name: "Isabella Zoom", rank: 2 },
    { name: "Ethan Nitro", rank: 3 },
    { name: "Grace Fury", rank: 4 },
    { name: "James Surge", rank: 5 },
    { name: "Charlotte Rush", rank: 6 },
  ],
};


// Function to shuffle racers in a specific race
function shuffleRacers(race) {
  // Step 1: Select a random racer to move
  const randomIndex = Math.floor(Math.random() * race.length);
  const racerToMove = race[randomIndex];

  // Step 2: Determine a new position for this racer
  let newPosition;
  do {
    newPosition = Math.floor(Math.random() * race.length) + 1;
  } while (newPosition === racerToMove.rank);

  // Step 3: Adjust positions of the other racers without changing their order
  race.forEach((racer) => {
    if (racer !== racerToMove) {
      if (
        newPosition < racerToMove.rank &&
        racer.rank >= newPosition &&
        racer.rank < racerToMove.rank
      ) {
        racer.rank += 1;
      } else if (
        newPosition > racerToMove.rank &&
        racer.rank > racerToMove.rank &&
        racer.rank <= newPosition
      ) {
        racer.rank -= 1;
      }
    }
  });

  // Step 4: Assign the new position to the selected racer
  racerToMove.rank = newPosition;

  // Step 5: Update time differences
  race.forEach((racer) => {
    if (racer.rank === 1) {
    } else {
      racer.timeDifference = parseFloat((Math.random() * 5).toFixed(2)); // Random time difference between 0 and 5 seconds
    }
  });
}

// Function to start shuffling racers in all races
export function startRaces() {
  Object.keys(races).forEach((raceName) => {
    setInterval(() => {
      shuffleRacers(races[raceName]);
      //console.log(`Race update (${raceName}):`, races[raceName]);
    }, 3000); // Update every 5 seconds
  });
}

// Function to get the current state of racers in a specific race
export function getRace(raceName) {
  return races[raceName] || [];
}

// Function to get the state of all races
export function getAllRaces() {
  return races;
}
