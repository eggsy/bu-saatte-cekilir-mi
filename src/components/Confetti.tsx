import ReactCanvasConfetti from "react-canvas-confetti";
import { useEffect, useState } from "react";

const Confetti: React.FC = () => {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    setFired(true);
    setInterval(() => setFired((prev) => !prev), 750);
  }, []);

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
