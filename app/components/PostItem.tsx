"use client";

import { decode } from "html-entities";

export interface PostItemProps {
  id: number;
  title: string;
  bgColor: string;
  yPosition: number;
  rotation: number;
  zIndex: number;
}

// Removing HTML Entities and unicode stuff
function cleanTitle(title: string) {
  return decode(title).replace(/\uFFFC/g, "");
}

export default function PostItem({
  id,
  title,
  bgColor,
  yPosition,
  rotation,
  zIndex
}: PostItemProps) {
  return (
    <div
      key={id}
      className={`relative p-5 font-black text-8xl text-black text-nowrap text-clip text-center w-max`}
      style={{
        backgroundColor: bgColor,
        marginTop: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
        zIndex: zIndex
      }}
    >
      {cleanTitle(title)}
    </div>
  );
}
