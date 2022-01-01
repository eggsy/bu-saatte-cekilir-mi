import getRandomItem from "../getRandomItem";

// Messages
const messages = [
  "Çekmek için yeni yıldan daha iyi bir zaman olabilir mi?",
  "Hemen başla. Yeni yılın ilk günü.",
  "Nasıl girersen öyle geçer.",
  "Bir yılı daha libidolu geçirmek mi...",
  "Olur olur, ben karışmıyorum.",
  "Yeni yıl, yeni olanaklar, yeni fanteziler.",
  "Ulan hâlâ mı sapsın.",
  "Acıyorum sana ama çek ulan. Son gününmüş gibi çek.",
  `${new Date().getFullYear() - 1} yılına ne oldu?`,
];

// Function
export const isNewYear = () => ({
  value: new Date().getMonth() + 1 === 1 && new Date().getDate() === 1,
  message: getRandomItem(messages),
  risk: 0,
});

export default isNewYear;
