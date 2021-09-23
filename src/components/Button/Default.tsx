import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ButtonProps {
  title?: string;
  href?: string;
  target?: string;
  onClick?: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  title,
  href,
  target,
  onClick,
  children,
}) => {
  const props = {
    title: title || children?.toString(),
    className:
      "px-8 py-2 text-gray-400 bg-gray-100 rounded-lg hover:text-gray-500 hover:bg-gray-200",
  };

  if (href)
    return (
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        href={href}
        target={target}
        rel="noreferrer noopener"
        {...props}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  else
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
};

export default Button;
