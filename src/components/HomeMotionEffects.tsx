import { useEffect } from "react";

/**
 * Cursor / touch responsive motion enhancements for:
 *  - The "kasiAIhub Method" section cards
 *  - The Entrepreneur Journey circles + connectors
 *
 * Uses pointer events so effects work on both mouse and touch devices.
 * Bails out entirely when prefers-reduced-motion is set.
 */
export default function HomeMotionEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const cleanups: Array<() => void> = [];

    // ====== Method section ======
    // Find the dark-gray section that actually contains the Method cards
    // (there are multiple dark-gray sections on the page).
    const methodSection = Array.from(
      document.querySelectorAll<HTMLElement>(".kasi-section-dark-gray"),
    ).find((el) => el.querySelector(".kasi-method-card")) || null;

    if (methodSection) {
      // ensure radial-gradient overlay sits cleanly on top of background color
      methodSection.style.position = methodSection.style.position || "relative";
      methodSection.style.backgroundRepeat = "no-repeat";
      methodSection.style.transition = "background-image 0.15s ease-out";

      const onMove = (e: PointerEvent) => {
        const r = methodSection.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        methodSection.style.backgroundImage = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,168,107,0.12), transparent 70%)`;
      };
      const onLeave = () => {
        methodSection.style.backgroundImage = "";
      };
      methodSection.addEventListener("pointermove", onMove);
      methodSection.addEventListener("pointerleave", onLeave);
      methodSection.addEventListener("pointercancel", onLeave);
      cleanups.push(() => {
        methodSection.removeEventListener("pointermove", onMove);
        methodSection.removeEventListener("pointerleave", onLeave);
        methodSection.removeEventListener("pointercancel", onLeave);
        methodSection.style.backgroundImage = "";
      });

      const cards = Array.from(
        methodSection.querySelectorAll<HTMLElement>(".kasi-method-card"),
      );
      cards.forEach((card) => {
        card.style.transition =
          "transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out";
        card.style.transformStyle = "preserve-3d";
        card.style.willChange = "transform";
      });

      const resetAll = () => {
        cards.forEach((c) => {
          c.style.transform = "";
          c.style.boxShadow = "";
          c.style.borderColor = "";
        });
      };

      cards.forEach((card, idx) => {
        const onEnter = () => {
          cards.forEach((other, i) => {
            if (i === idx) return;
            other.style.transform = "translateY(-2px)";
          });
        };
        const onCardMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          let tiltY = px * 12;
          let tiltX = -py * 12;
          tiltY = Math.max(-6, Math.min(6, tiltY));
          tiltX = Math.max(-6, Math.min(6, tiltX));
          card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          card.style.boxShadow = "0 16px 40px rgba(0,168,107,0.2)";
          card.style.borderColor = "rgba(0,168,107,0.5)";
        };
        const onLeaveCard = () => resetAll();
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointermove", onCardMove);
        card.addEventListener("pointerleave", onLeaveCard);
        card.addEventListener("pointercancel", onLeaveCard);
        cleanups.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointermove", onCardMove);
          card.removeEventListener("pointerleave", onLeaveCard);
          card.removeEventListener("pointercancel", onLeaveCard);
        });
      });
      cleanups.push(resetAll);
    }

    // ====== Journey section ======
    const journeySection = document.querySelector<HTMLElement>(
      ".kasi-journey-section",
    );
    if (journeySection) {
      const circles = Array.from(
        journeySection.querySelectorAll<HTMLElement>(".kasi-journey-circle"),
      );
      const icons = Array.from(
        journeySection.querySelectorAll<HTMLElement>(".kasi-journey-icon"),
      );
      const arrows = Array.from(
        journeySection.querySelectorAll<HTMLElement>(
          ".kasi-journey-arrow-desktop",
        ),
      );

      circles.forEach((circle, i) => {
        circle.style.transition =
          "transform 0.3s ease-out, box-shadow 0.3s ease-out";

        const ring = document.createElement("span");
        ring.setAttribute("aria-hidden", "true");
        ring.style.cssText =
          "position:absolute;inset:0;border-radius:50%;border:2px solid rgba(0,168,107,0.4);pointer-events:none;opacity:0;transform:scale(1);";
        circle.appendChild(ring);

        const glow = document.createElement("span");
        glow.setAttribute("aria-hidden", "true");
        glow.style.cssText =
          "position:absolute;inset:0;border-radius:50%;pointer-events:none;opacity:0;transition:opacity 0.25s ease-out;";
        circle.appendChild(glow);

        const icon = icons[i];
        if (icon) icon.style.transition = "transform 0.4s ease-out";

        const onEnter = () => {
          ring.style.animation = "kasiJourneyPulse 1.5s ease-out infinite";
          if (icon) icon.style.transform = "translateY(-5px)";
          glow.style.opacity = "1";
        };
        const onLeave = () => {
          ring.style.animation = "";
          ring.style.opacity = "0";
          if (icon) {
            icon.style.transition = "transform 0.3s ease-in";
            icon.style.transform = "translateY(0)";
            requestAnimationFrame(() => {
              icon.style.transition = "transform 0.4s ease-out";
            });
          }
          glow.style.opacity = "0";
          glow.style.background = "";
        };
        const onMove = (e: PointerEvent) => {
          const r = circle.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          glow.style.background = `radial-gradient(80px circle at ${x}px ${y}px, rgba(0,168,107,0.25), transparent 70%)`;
        };

        circle.addEventListener("pointerenter", onEnter);
        circle.addEventListener("pointerleave", onLeave);
        circle.addEventListener("pointercancel", onLeave);
        circle.addEventListener("pointermove", onMove);
        cleanups.push(() => {
          circle.removeEventListener("pointerenter", onEnter);
          circle.removeEventListener("pointerleave", onLeave);
          circle.removeEventListener("pointercancel", onLeave);
          circle.removeEventListener("pointermove", onMove);
          ring.remove();
          glow.remove();
          if (icon) {
            icon.style.transform = "";
            icon.style.transition = "";
          }
        });
      });

      arrows.forEach((arrow) => {
        arrow.style.transition = "filter 0.4s ease-out, opacity 0.4s ease-out";
      });
      const onSectionMove = (e: PointerEvent) => {
        arrows.forEach((arrow) => {
          const r = arrow.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          if (dist < 100) {
            arrow.style.filter = "drop-shadow(0 0 8px rgba(0,168,107,0.8))";
            arrow.style.color = "#00A86B";
          } else {
            arrow.style.filter = "";
            arrow.style.color = "";
          }
        });
      };
      const onSectionLeave = () => {
        arrows.forEach((arrow) => {
          arrow.style.filter = "";
          arrow.style.color = "";
        });
      };
      journeySection.addEventListener("pointermove", onSectionMove);
      journeySection.addEventListener("pointerleave", onSectionLeave);
      journeySection.addEventListener("pointercancel", onSectionLeave);
      cleanups.push(() => {
        journeySection.removeEventListener("pointermove", onSectionMove);
        journeySection.removeEventListener("pointerleave", onSectionLeave);
        journeySection.removeEventListener("pointercancel", onSectionLeave);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
