import { useTypewriter } from "../hooks/useTypewriter.js";

const skills = ["Java", "DSA", "Spring Boot", "REST APIs", "MongoDB", "Android", "Kotlin", "Python", "UI/UX"];

export default function TypingText() {
  const text = useTypewriter(skills);
  return (
    <p className="hero-role typing-line">
      <span className="typing-prefix">I work with</span>
      <span className="visually-hidden">{skills.join(", ")}</span>
      <span className="typing-value" aria-hidden="true">{text}</span>
    </p>
  );
}
