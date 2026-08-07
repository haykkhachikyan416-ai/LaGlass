import { useEffect } from "react";

/**
 * Progressive enhancement only. Renders nothing.
 *
 * The header is solid dark by default (the safe, always-readable state). When
 * this runs, it marks the header `data-at-top` while the visitor is at the very
 * top of the page so it can sit transparently over the hero. It also closes the
 * CSS-only mobile drawer on Escape.
 *
 * If this script never executes, the header stays solid and the menu still
 * opens and closes via CSS — nothing breaks.
 */
export function HeaderScrollState() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("menu-toggle") as HTMLInputElement | null;
    if (!header) return;

    const sync = () => {
      const atTop = window.scrollY <= 24 && !toggle?.checked;
      header.dataset.atTop = atTop ? "true" : "false";
    };
    sync();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && toggle?.checked) {
        toggle.checked = false;
        sync();
      }
    };

    window.addEventListener("scroll", sync, { passive: true });
    toggle?.addEventListener("change", sync);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", sync);
      toggle?.removeEventListener("change", sync);
      document.removeEventListener("keydown", onKeyDown);
      delete header.dataset.atTop;
    };
  }, []);

  return null;
}
