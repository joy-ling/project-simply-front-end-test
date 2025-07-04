"use client";

import { decode } from "html-entities";
import { motion } from "framer-motion";

export interface PostItemProps {
  id: number;
  title: string;
  bgColor: string;
  rotation: number;
  marginTop: number;
  zIndex: number;
  animationDirection: "left" | "right";
}

// Removing HTML Entities and unicode stuff
function cleanTitle(title: string) {
  return decode(title).replace(/\uFFFC/g, "");
}

export default function PostItem({
  id,
  title,
  bgColor,
  rotation,
  marginTop,
  zIndex,
  animationDirection = "left",
}: PostItemProps) {
  const initialX = animationDirection === "left" ? "-150%" : "150%";

  return (
    <motion.div
      key={id}
      className="relative w-full"
      style={{
        marginTop: `${marginTop}px`,
        zIndex: zIndex,
        transformOrigin: "0% 50%",
        backgroundColor: "grey",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <motion.span
        className="p-5 font-black text-8xl text-black text-nowrap inline-block"
        style={{
          backgroundColor: bgColor
        }}
        initial={{ x: initialX }}
        animate={{ x: -100 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {cleanTitle(title).slice(0, 70)}
      </motion.span>
    </motion.div>
  );
}
