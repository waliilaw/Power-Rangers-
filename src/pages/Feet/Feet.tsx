import { useEffect, useRef } from "react";
import "./Feet.css";

export function Feet() {
  class TextScramble {
    private el: HTMLElement;
    private chars: string;
    private queue: { from: string; to: string; start: number; end: number; char?: string }[];
    private frameRequest!: number;
    private frame: number;
    private resolve!: () => void;

    constructor(el: HTMLElement) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
      this.queue = [];
      this.frame = 0;
    }

    setText(newText: string): Promise<void> {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise<void>((resolve) => (this.resolve = resolve));
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();

      return promise;
    }

    private update() {
      let output = "";
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        const { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            const newChar = this.randomChar();
            this.queue[i].char = newChar;
            output += `<span class="dud">${newChar}</span>`;
          } else {
            output += `<span class="dud">${char}</span>`;
          }
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    private randomChar(): string {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const phrases: string[] = ["WHO AM I ??", "私は誰ですか"];
      const fx = new TextScramble(textRef.current);

      let counter = 0;
      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          setTimeout(next, 800);
        });
        counter = (counter + 1) % phrases.length;
      };

      next();
    }
  }, []);

  return (
    <div className="container">
      <div className="text" ref={textRef}></div>
    </div>
  );
}