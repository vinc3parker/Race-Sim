function generateRandomName () {
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

export default generateRandomName