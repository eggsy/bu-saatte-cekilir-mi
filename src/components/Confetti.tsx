import ReactCanvasConfetti from "react-canvas-confetti";
import { useEffect, useState } from "react";

/* Import composables */
import useFocus from "../composables/useFocus";

const Confetti: React.FC = () => {
  const [fired, setFired] = useState(false);
  const isFocused = useFocus();

  useEffect(() => {
    setFired(true);

    /* Set interval */
    const interval = setInterval(() => {
      if (isFocused) setFired((prev) => !prev);
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, [isFocused]);

  return (
    <ReactCanvasConfetti
      fire={fired}
      spread={150}
      particleCount={100}
      origin={{ x: 0, y: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        height: "100vh",
        width: "100vw",
        zIndex: -1,
      }}
    />
  );
};

export default Confetti;
