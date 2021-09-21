import { motion } from "framer-motion";

const TrollFace: React.FC = () => (
  <motion.div
    initial={{ x: "30%" }}
    animate={{ x: 0 }}
    exit={{ x: "30%" }}
    className="relative min-h-[50vh] bg-black rounded-lg"
  >
    <div
      className="absolute inset-4"
      style={{
        backgroundImage: "url('/images/troll-face.gif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />

    <audio autoPlay src="/sounds/amongus.mp3" />
  </motion.div>
);

export default TrollFace;
