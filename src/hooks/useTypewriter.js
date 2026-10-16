import { useEffect, useState } from "react";

const REDUCED_TEXT = "Java · DSA · Spring Boot";

export function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 50, hold = 1400, gap = 220, reducedText = REDUCED_TEXT } = {}) {
  const [text, setText] = useState("");

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer = 0;
    let stopped = false;

    const step = () => {
      if (stopped || motionQuery.matches) return;
      if (document.hidden) return;
      const current = words[wordIndex];
      if (!deleting) {
        characterIndex += 1;
        setText(current.slice(0, characterIndex));
        if (characterIndex >= current.length) {
          deleting = true;
          timer = window.setTimeout(step, hold);
          return;
        }
        timer = window.setTimeout(step, typeSpeed);
        return;
      }

      characterIndex -= 1;
      setText(current.slice(0, Math.max(0, characterIndex)));
      if (characterIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = window.setTimeout(step, gap);
        return;
      }
      timer = window.setTimeout(step, deleteSpeed);
    };

    const onVisibilityChange = () => {
      window.clearTimeout(timer);
      if (!document.hidden && !motionQuery.matches) timer = window.setTimeout(step, gap);
    };

    const onMotionChange = () => {
      window.clearTimeout(timer);
      if (motionQuery.matches) {
        setText(reducedText);
      } else {
        wordIndex = 0;
        characterIndex = 0;
        deleting = false;
        setText("");
        if (!document.hidden) timer = window.setTimeout(step, gap);
      }
    };

    if (motionQuery.matches) setText(reducedText);
    else timer = window.setTimeout(step, gap);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener?.("change", onMotionChange);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, [words, typeSpeed, deleteSpeed, hold, gap, reducedText]);

  return text;
}
