import { useState, useEffect } from "react";

/**
 * Listens to window events and sets the focus state and returns a state value.
 */
const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return isFocused;
};

export default useFocus;
