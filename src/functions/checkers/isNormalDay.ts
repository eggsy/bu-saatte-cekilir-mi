import getRandomItem from "../getRandomItem";

// Messages
const messages = [
  "Çek gitsin.",
  "Çek. Ama günahı senin boynuna.",
  "Hadi hadi bakmıyorum ben.",
  "Çekersin.",
  "Çekmelisin.",
  "Diyelim ki çektin.",
  "Olabilir, insanlık hâli.",
  "İhtiyaç kardeşim bu.",
  "Haftada en az 3 kere.",
  "Doğru yoldasın.",
  "Karanlık taraf seni çağırıyor.",
  "Bizi yüzüstü bırakma.",
  "Elizabeth.",
  "Cezalandır o eli.",
  "Bunu hakettin.",
  "Hadi başla.",
];

// Function
export const isNormalDay = () => ({
  value: true,
  risk: 0,
  message: getRandomItem(messages),
});

export default isNormalDay;
