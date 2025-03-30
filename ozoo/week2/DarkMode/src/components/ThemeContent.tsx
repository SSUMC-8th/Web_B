import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

export const ThemeContent = () => {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx("p-4 h-dvh", isLightMode ? "bg-whitd" : "bg-gray-800")}
    >
      <h1
        className={clsx(
          "text-xl font-bold", isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates saepe officia reiciendis accusantium, corrupti minima nostrum quidem cum, dignissimos molestiae harum repellat ab officiis fuga voluptatibus commodi, sint odio sit.
        {" "}
      </p>
    </div>
  );
};