import React from "react";

interface DotProps {
  x: number;
  y: number;
  size: number;
  onClick: () => void;
  isPlaying: boolean;
}

const Dot: React.FC<DotProps> = ({ x, y, size, onClick, isPlaying }) => {
  if (!isPlaying) return null;

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#FF6347",
        cursor: "pointer",
        transition: "top 0.1s, left 0.1s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "white",
      }}
    />
  );
};

export default Dot;
