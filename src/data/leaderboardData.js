function generateRandomName() {
  const firstNames = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "Tom",
    "Emily",
    "Mike",
    "Sarah",
    "Chris",
    "Katie",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Jones",
    "Davis",
    "Wilson",
    "Taylor",
    "Anderson",
    "Thomas",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
}

function startRace(location) {
  const racers = [];
  for (let i = 0; i < 30; i++) {
    // Use 0-based indexing for id
    const racer = {
      id: i, // Assign unique id
      name: generateRandomName(),
      rank: i + 1, // Rank starts from 1
      fastestLap: generateFastestLap(),
      gap: 0,
    };
    racers.push(racer);
  }

  console.log(`${location} race initialized`);

  // Save to localStorage
  localStorage.setItem(`${location}.racers`, JSON.stringify(racers));
}


function generateFastestLap() {
  const minutes = Math.floor(Math.random() * 2); // 0 to 1
  const seconds = Math.floor(
    Math.random() * (minutes === 0 ? 2 : 60) + (minutes === 0 ? 58 : 0)
  )
    .toString()
    .padStart(2, "0"); // 58 to 59 if minutes is 0, otherwise 0 to 59

  const hundredths = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0"); // 0 to 99
  return `${minutes}:${seconds}.${hundredths}`;
}

function decrementFastestLap(currentLap) {
  const [minutes, rest] = currentLap.split(":");
  const [seconds, hundredths] = rest.split(".");

  let totalHundredths =
    parseInt(minutes) * 60 * 100 +
    parseInt(seconds) * 100 +
    parseInt(hundredths);

  totalHundredths -= Math.floor(Math.random() * 100); // Improve lap by up to 1 second

  const newMinutes = Math.floor(totalHundredths / (60 * 100));
  const newSeconds = Math.floor((totalHundredths % (60 * 100)) / 100)
    .toString()
    .padStart(2, "0");
  const newHundredths = (totalHundredths % 100).toString().padStart(2, "0");

  return `${newMinutes}:${newSeconds}.${newHundredths}`;
}

function runRace(location) {
  if (!localStorage.getItem(`${location}.racers`)) {
    startRace(location);
  }

  const racers = JSON.parse(localStorage.getItem(`${location}.racers`));
  let updateCount = 0; // Track the number of cycles

  function updateRace() {
    updateCount++;
    const randomRacerIndex = Math.floor(Math.random() * racers.length);
    const randomRankChange = Math.floor(Math.random() * 5) + 1; // Move up or down 1-5 ranks

    // Randomly move racer up or down
    const currentRank = racers[randomRacerIndex].rank;
    let newRank = currentRank - randomRankChange;
    if (newRank < 1) newRank = currentRank + randomRankChange;
    if (newRank > racers.length) newRank = currentRank - randomRankChange;

    // Temporarily assign the new rank
    racers[randomRacerIndex].rank = newRank;

    // Sort racers by rank and reassign unique ranks
    racers.sort((a, b) => a.rank - b.rank);
    racers.forEach((racer, index) => {
      racer.rank = index + 1; // Reassign unique ranks from 1 to 30
    });

    // Update gaps
    racers.forEach((racer, index) => {
      racer.gap = index === 0 ? 0 : (Math.random() * 5 + 0.01).toFixed(2);
    });

    // Occasionally update fastest lap
    if (updateCount >= Math.floor(Math.random() * 11) + 10) {
      // Between 10 and 20 cycles
      updateCount = 0; // Reset update counter
      const lapRacerIndex = Math.floor(Math.random() * racers.length); // Random racer
      const lapRacer = racers[lapRacerIndex];
      lapRacer.fastestLap = decrementFastestLap(lapRacer.fastestLap);
    }

    // Save updated racers to localStorage
    localStorage.setItem(`${location}.racers`, JSON.stringify(racers));

    // Schedule next update
    const delay = Math.random() * (5000 - 2000) + 2000; // Between 2 and 5 seconds
    setTimeout(updateRace, delay);
  }
  console.log(`${location} race started`);
  updateRace();
}


export function getRace(location) {
  if (!localStorage.getItem(`${location}.racers`)) {
    runRace(location);
  }

  const racers = JSON.parse(localStorage.getItem(`${location}.racers`));
  return racers;
}

// Example Usage:
// startRace("london");
// runRace("london");
// const raceData = getRace("london");
// console.log(raceData);
