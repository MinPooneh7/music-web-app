import { useTheme } from "next-themes";

import base from "../assets/base.png";
import green from "../assets/green.png";
import black from "../assets/black.png";
import blue from "../assets/blue.png";
import red from "../assets/red.png";
import orange from "../assets/orange.png";
import pink from "../assets/pink.png";
import purple from "../assets/purple.png";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const themeColors = {
  base: { color: "#fff", img: base },
  green: { color: "#0f0", img: green },
  blue: { color: "#00f", img: blue },
  red: { color: "#f00", img: red },
  orange: { color: "#f27d07", img: orange },
  pink: { color: "#faa", img: pink },
  purple: { color: "#961d80", img: purple },
  gray: { color: "#5c5858", img: black },
};

export const THEMES = Object.keys(themeColors);

export default function ThemePicker() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-text text-2xl font-bold">Themes</span>
      <div className="grid grid-cols-4 gap-3">
        {THEMES.map((theme, index) => (
          <HoverCard>
            <HoverCardTrigger>
              <div
                className="p-7 rounded-full "
                key={index}
                style={{
                  backgroundColor:
                    themeColors[theme as keyof typeof themeColors].color,
                }}
                onClick={() => setTheme(theme)}
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-100">
              <img
                src={themeColors[theme as keyof typeof themeColors].img}
                alt="gheme color screenshot"
                className="w-full"
              />
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
