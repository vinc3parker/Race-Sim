export function fetchRacerData() {
    const racers = [];

    for (let i = 1; i <= 30; i++) {
        const racer = {
          name: generateRandomName(),
          rank: i,
          fastestLap: `${Math.floor(Math.random() * 2) + 0}:${Math.floor(
            Math.random() * 60
          )
            .toString()
            .padStart(2, "0")}.${Math.floor(Math.random() * 100)
            .toString()
            .padStart(2, "0")}`,

          totalTime: `${Math.floor(Math.random() * 59) + 1}:${
            Math.floor(Math.random() * 59) + 1
          }.${Math.floor(Math.random() * 999) + 1}`,
        };
        racers.push(racer);
  }
  
  return Promise.resolve(racers);
}

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

  return { first: firstName, last: lastName };
}
