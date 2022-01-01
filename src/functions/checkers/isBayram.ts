import getRandomItem from "../getRandomItem";

// Messages
const getMessage = (day: string) => {
  const messages = [
    `${day} günü çekmek mi?`,
    "Bugün Bayram ulan.",
    `Bugün ${day}, sence çekilir mi?`,
    "Azıcık saygınız olsun.",
    `Sana sadece şunu diyorum. Neyse desem de anlamazsın.`,
    day,
  ];

  return getRandomItem(messages);
};

// Type
export interface BayramResponse {
  name: string;
  risk: number;
  dates: string[];
}

// Function
export const isBayram = (data: BayramResponse[]) => {
  const date = data.find((d) =>
    d.dates.some((date) => new Date(date).getTime() < new Date().getTime())
  );

  const isDate = !!date?.name;

  return {
    value: isDate,
    risk: isDate ? date.risk : 0,
    message: getMessage(date?.name || "bayram"),
  };
};

export default isBayram;
