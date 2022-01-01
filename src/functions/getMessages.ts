// Holy
import isCuma from "./checkers/isCuma";
import isBayram, { BayramResponse } from "./checkers/isBayram";

// Not so Holy
import isBestMinute from "./checkers/isBestMinute";
import isNewYear from "./checkers/isNewYear";

// Extras
import isBayramAndCuma from "./checkers/isBayramAndCuma";

export default function getMessages(bayrams: BayramResponse[]) {
  const getBayram = isBayram(bayrams);
  const getBayramAndCuma = isBayramAndCuma(getBayram.value, isCuma().value);

  // Is Bayram and Cuma at the same time
  if (getBayramAndCuma.value) return getBayramAndCuma;
  // Is Bayram
  else if (getBayram.value) return getBayram;
  // Is Cuma
  else if (isCuma().value) return isCuma();
  // Is new year
  else if (isNewYear().value) return isNewYear();
  // Is best minute
  else if (isBestMinute().value) return isBestMinute();
  else
    return {
      name: "Çekilir!",
      message: "Artık seni kimse durduramaz.",
      risk: 0,
    };
}
