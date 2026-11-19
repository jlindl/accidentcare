"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registered once for the whole app.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Custom easing that matches the CSS tokens in globals.css.
export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "power2.inOut";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
