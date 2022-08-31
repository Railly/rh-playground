import { useState } from "react";
import { motion } from "framer-motion";

// make a DockElement and  DockContainer to create a MacOs Dock
export default function DockContainer({ children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-row items-center justify-center h-20 bg-gray-800 w-96 rounded-3xl"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {children}
    </motion.div>
  );
}

export function DockElement({ name }) {
  return (
    <motion.div
      layoutId="dock-element"
      className="flex flex-col items-center justify-center w-20 h-20 m-4 bg-gray-600 rounded-3xl"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <p>{name}</p>
    </motion.div>
  );
}
