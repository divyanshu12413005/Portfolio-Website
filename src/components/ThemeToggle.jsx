export default function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === "light" ? "dark" : "light";
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${nextTheme} theme`} title={`Switch to ${nextTheme} theme`}>
      <span aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span>
      <span className="theme-toggle-label">{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
