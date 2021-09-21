import { motion } from "framer-motion";

interface AnimatedTextProps {
  className?: string;
  onAnimationComplete?: () => any;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className,
  onAnimationComplete,
}) => {
  const handleAnimationComplete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        initial={{ x: "-30%" }}
        animate="visible"
        variants={{
          visible: (i) => ({
            x: 0,
            transition: {
              delay: i * 0.1,
            },
          }),
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedText;
