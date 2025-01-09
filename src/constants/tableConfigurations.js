export const tableConfigurations = {
  simple: {
    headers: ["Rank", "Name"],
    fields: ["rank", "name"],
    nameFormat: "abrreviaiton", // Options: "first", "last", "full", "abbreviation"
  },
  fastestLap: {
    headers: ["Rank", "Name", "Fastest Lap"],
    fields: ["rank", "name", "fastestLap"],
    nameFormat: "full",
  },
  fullRace: {
    headers: ["Rank", "Name", "Fastest Lap", "Gap"],
    fields: ["rank", "name", "fastestLap", "gap"],
    nameFormat: "full",
  },
};