"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.12);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.12);
      follower.style.transform = `translate(${followerPos.current.x - 18}px, ${followerPos.current.y - 18}px)`;
      animId = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      cursor.style.transform += " scale(2)";
      follower.style.transform += " scale(1.5)";
      follower.style.borderColor = "rgba(56, 189, 248, 0.6)";
    };

    const onMouseLeaveLink = () => {
      follower.style.borderColor = "rgba(255, 255, 255, 0.4)";
    };

    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(animate);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className="cursor-follower hidden md:block"
        aria-hidden="true"
      />
    </>
  );
}
