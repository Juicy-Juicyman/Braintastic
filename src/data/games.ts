import type { Game } from "@/types/gametypes";

export const localGames: Game[] = [
  {
    id: "counting",
    slug: "counting",
    name: "Counting Game",
    description:
      "Practice counting objects and improve your number skills in a fun and interactive way!",
    imgSrc: "/counting.webp",
  },
  {
    id: "reaction",
    slug: "reaction",
    name: "Reaction Game",
    description:
      "Test your reaction speed by tapping quickly on moving dots. How fast can you go?",
    imgSrc: "/reaction.webp",
  },
  {
    id: "shapes",
    slug: "shapes",
    name: "Shapes Game",
    description:
      "Learn shapes and colors by matching them to their correct spots in this engaging game.",
    imgSrc: "/shapes.webp",
  },
  {
    id: "spelling",
    slug: "spelling",
    name: "Spelling Game",
    description:
      "Improve your spelling by forming words based on fun images and prompts.",
    imgSrc: "/spelling.webp",
  },
  {
    id: "memory",
    slug: "memory",
    name: "Memory Game",
    description:
      "Test your memory by matching pairs of cards. Can you find all the matches?",
    imgSrc: "/memory.webp",
  },
];
