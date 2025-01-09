export function formatName(nameData, nameFormat) {
  switch (nameFormat) {
    case "first":
      return nameData.first;
    case "last":
      return nameData.last;
    case "full":
      return `${nameData.first} ${nameData.last}`;
    case "abbreviation":
      return `${nameData.first[0]}. ${nameData.last.slice(0, 3)}`;
    default:
      return nameData.last;
  }
}
