import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type CarouselSlide = {
  src: string;
  alt: string;
};

/** Time between auto-advances (shorter = more frequent). */
const AUTO_MS = 3000;
const GAP_PX = 10;
/** Caps slide height on narrow viewports (matches CSS max-height). */
function maxCellHeightForViewportWidth(viewportWidth: number): number {
  if (viewportWidth <= 360) return 200;
  if (viewportWidth <= 480) return 220;
  if (viewportWidth <= 640) return 260;
  return 320;
}
/** Viewport max-width for single-slide layout (matches CSS). */
const SINGLE_SLIDE_MAX_CSS_PX = 640;
/** Embla scroll tween length; slightly longer reads smoother than very short snaps. */
const SCROLL_DURATION_MS = 48;

function readVisibleColumns(): 1 | 3 {
  if (typeof window === "undefined") return 3;
  return window.matchMedia(`(max-width: ${SINGLE_SLIDE_MAX_CSS_PX}px)`).matches ? 1 : 3;
}

type Props = {
  slides: CarouselSlide[];
  label: string;
};

export function DetailCarousel({ slides, label }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<1 | 3>(readVisibleColumns);
  const [slidePx, setSlidePx] = useState<{ w: number; h: number } | null>(null);
  const viewportElRef = useRef<HTMLDivElement | null>(null);

  const plugins = useMemo(() => {
    if (reduceMotion || slides.length <= 1) return [];
    return [
      Autoplay({
        delay: AUTO_MS,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ];
  }, [reduceMotion, slides.length]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: slides.length > 1,
      align: "start",
      duration: reduceMotion ? 0 : SCROLL_DURATION_MS,
      skipSnaps: false,
    },
    plugins
  );

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportElRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  const measureViewport = useCallback(() => {
    const el = viewportElRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    if (w <= 0) return;
    const cols = visibleColumns;
    const gapTotal = (cols - 1) * GAP_PX;
    const cellW = (w - gapTotal) / cols;
    const cellH = Math.min(cellW * 0.82, maxCellHeightForViewportWidth(w));
    setSlidePx((prev) =>
      prev && prev.w === cellW && prev.h === cellH ? prev : { w: cellW, h: cellH }
    );
  }, [visibleColumns]);

  useLayoutEffect(() => {
    const mq = window.matchMedia(`(max-width: ${SINGLE_SLIDE_MAX_CSS_PX}px)`);
    const sync = () => setVisibleColumns(mq.matches ? 1 : 3);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    measureViewport();
    const el = viewportElRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measureViewport);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureViewport, slides.length]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, slides.length]);

  useEffect(() => {
    if (!emblaApi || !slidePx) return;
    emblaApi.reInit();
  }, [emblaApi, slidePx]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, slides.length]);

  const goTo = useCallback(
    (i: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(((i % slides.length) + slides.length) % slides.length);
    },
    [emblaApi, slides.length]
  );

  if (slides.length === 0) return null;

  const viewportStyle: CSSProperties | undefined = slidePx
    ? ({
        "--detail-carousel-slide-w": `${slidePx.w}px`,
        "--detail-carousel-slide-h": `${slidePx.h}px`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className="detail-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} photo gallery`}
    >
      <div
        className="detail-carousel-viewport"
        ref={setViewportRef}
        style={viewportStyle}
      >
        <div className="detail-carousel-track">
          {slides.map((slide) => (
            <div key={slide.src} className="detail-carousel-slide-cell">
              <img src={slide.src} alt={slide.alt} decoding="async" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="detail-carousel-dots" role="tablist" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              className={`detail-carousel-dot${i === selectedIndex ? " detail-carousel-dot--active" : ""}`}
              aria-selected={i === selectedIndex}
              aria-label={`Go to image ${i + 1}: ${slide.alt}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
