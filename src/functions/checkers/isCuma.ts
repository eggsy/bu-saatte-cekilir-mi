import getRandomItem from "../getRandomItem";

// Messages
const messages = [
  "Cuma günü çekmek mi...",
  "Hayır... hayır... hayır!!! Bugün Cuma!",
  "Hiç mi edep öğrenmedin? Cuma bugün.",
  "Dedenle Cuma'ya gittiğin günleri hatırla.",
  "Azıcık Cuma'ya saygın olsun.",
  "Kendinden utan, bugün Cuma.",
  "Yardım al. Cuma cuma başlatma şimdi.",
];

// Function
export const isCuma = () => ({
  value: new Date().getDay() === 5,
  risk: 2,
  message: getRandomItem(messages),
});

export default isCuma;
