import getRandomItem from "../getRandomItem";

// Messages
const messages = [
  "Bundan daha iyi bir zaman olamaz.",
  "Yavaşça saate bak.",
  "31.",
  "Pişman olmazsın.",
  "Git çek bence.",
  "Yine de sen bilirsin, ama 31 bu.",
  "Saat ne diyorsa o.",
  "Saat diyorsa doğrudur.",
];

// Function
export const isBestMinute = () => ({
  value: new Date().getMinutes() === 31,
  message: getRandomItem(messages),
  risk: 0,
});

export default isBestMinute;
