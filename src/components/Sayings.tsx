import { motion } from "framer-motion";

/* Import data */
import sayings from "../data/sayings";

interface SayingsProps {
  soundEnabled: boolean;
}

const Sayings: React.FC<SayingsProps> = ({ soundEnabled }) => {
  const randomSaying = sayings[Math.floor(Math.random() * sayings.length)];

  return (
    <>
      <motion.div
        initial={{ x: "30%" }}
        animate={{ x: 0 }}
        exit={{ x: "30%" }}
        className="p-4 overflow-y-auto text-gray-200 bg-black rounded-lg"
      >
        <div className="max-h-[50vh] space-y-1">
          {randomSaying.split("\n").map((line, index) => (
            <p key={index} className={!line ? "py-2" : undefined}>
              {line}
            </p>
          ))}
        </div>
      </motion.div>

      {soundEnabled && (
        <audio className="hidden" autoPlay src="/sounds/turkiyem.mp3" />
      )}
    </>
  );
};

export default Sayings;
