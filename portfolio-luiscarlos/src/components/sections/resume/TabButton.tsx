import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  active,
  onClick,
  icon,
  label,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center justify-center py-3 px-6 rounded-lg font-medium text-base
        transition-all duration-300 ease-in-out relative overflow-hidden
        ${
          active
            ? "bg-primary text-white shadow-md shadow-primary/30"
            : "bg-card-bg text-text-light hover:bg-primary/5"
        }
      `}
      whileHover={{
        scale: 1.05,
        y: -3,
        boxShadow: "0 10px 25px rgba(var(--color-primary-rgb), 0.35)",
      }}
      whileTap={{ scale: 0.97, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3,
      }}
    >
      {!active && (
        <motion.span
          className="absolute inset-0 bg-primary/10 rounded-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {active && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      )}

      <motion.span
        className="relative z-10 flex items-center"
        animate={{
          scale: active ? [1, 1.05, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 0.5,
            repeat: active ? 0 : 0,
            repeatType: "reverse",
          },
        }}
      >
        <motion.span
          className="mr-2 text-lg"
          animate={{ rotate: active ? [0, 5, 0, -5, 0] : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {icon}
        </motion.span>

        {label}

        {active && (
          <motion.span
            className="ml-2 w-2 h-2 rounded-full bg-white"
            layoutId="activeTabIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.span>
    </motion.button>
  );
};

export default TabButton;
