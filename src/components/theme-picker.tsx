import { useTheme } from "next-themes";

const themeColors = {
  base: "#fff",
  green: "#0f0",
  blue: "#00f",
  red: "#f00",
  orange: "#f27d07",
  pink: "#faa",
  purple: "#961d80",
  gray: "#5c5858",
};

export const THEMES = Object.keys(themeColors);

export default function ThemePicker() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-text text-2xl font-bold">Themes</span>
      <div className="grid grid-cols-4 gap-3">
        {THEMES.map((theme, index) => (
          <div
            className="p-7 rounded-full "
            key={index}
            style={{
              backgroundColor: themeColors[theme as keyof typeof themeColors],
            }}
            onClick={() => setTheme(theme)}
          />
        ))}
      </div>
    </div>
  );
}

