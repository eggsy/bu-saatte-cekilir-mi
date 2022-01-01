import getRandomItem from "../getRandomItem";

// Messages
const messages = [
  "Bak çok tehlikeli bir işe kalkışıyorsun...",
  "Sakın... sakın. SAKIN!!!",
  "Dayan. Bugün yapma.",
  "Bugün hem bayram, hem Cuma.",
  "Aklını başına getir.",
  "HAYIR HAYIR HAYIR!!!",
  "MÜMKÜN DEĞİL. MÜMKÜN DEĞİL!!!",
  "Büyük sözü dinle. Yapma.",
];

// Function
export const isBayramAndCuma = (isBayram: boolean, isCuma: boolean) => ({
  value: isBayram && isCuma,
  risk: 2,
  message: getRandomItem(messages),
});

export default isBayramAndCuma;
