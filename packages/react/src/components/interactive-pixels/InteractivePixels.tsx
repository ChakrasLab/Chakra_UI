import { useEffect, useRef } from "react";

const RIPPLE_DURATION = 760;
const RIPPLE_RADIUS = 88;
const RIPPLE_AMPLITUDE = 1.35;

export interface InteractivePixelsProps {
  src: string;
  className?: string;
  ariaLabel: string;
  objectPosition?: { x: number; y: number };
  crop?: { top?: number; right?: number; bottom?: number; left?: number };
}

/** Localized pointer ripple shared by the monument pixel artwork. */
export default function InteractivePixels({
  src,
  className,
  ariaLabel,
  objectPosition = { x: 0.5, y: 0.5 },
  crop = {},
}: InteractivePixelsProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!stage || !canvas || !ctx) return;

    const image = new Image();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const patchCanvas = document.createElement("canvas");
    const patchCtx = patchCanvas.getContext("2d", { willReadFrequently: true });
    if (!patchCtx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let ripple: { x: number; y: number; start: number } | null = null;
    let lastPointer: { x: number; y: number } | null = null;
    let disposed = false;
    const cropLeft = crop.left ?? 0;
    const cropTop = crop.top ?? 0;
    const getCroppedSize = () => ({
      width: Math.max(1, image.naturalWidth - cropLeft - (crop.right ?? 0)),
      height: Math.max(1, image.naturalHeight - cropTop - (crop.bottom ?? 0)),
    });

    const getImagePlacement = () => {
      if (!image.naturalWidth || !image.naturalHeight || !width || !height) {
        return { x: 0, y: 0, width, height };
      }

      const { width: croppedWidth, height: croppedHeight } = getCroppedSize();
      const scale = Math.max(
        width / croppedWidth,
        height / croppedHeight,
      );
      const drawnWidth = croppedWidth * scale;
      const drawnHeight = croppedHeight * scale;
      return {
        x: (width - drawnWidth) * objectPosition.x,
        y: (height - drawnHeight) * objectPosition.y,
        width: drawnWidth,
        height: drawnHeight,
      };
    };

    const drawBase = () => {
      if (!image.complete || !image.naturalWidth) return;
      ctx.fillStyle = getComputedStyle(stage).backgroundColor;
      ctx.fillRect(0, 0, width, height);
      const placement = getImagePlacement();
      const { width: croppedWidth, height: croppedHeight } = getCroppedSize();
      ctx.drawImage(
        image,
        cropLeft,
        cropTop,
        croppedWidth,
        croppedHeight,
        placement.x,
        placement.y,
        placement.width,
        placement.height,
      );
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBase();
    };

    const requestFrame = () => {
      if (!raf && !document.hidden && !disposed) {
        raf = window.requestAnimationFrame(render);
      }
    };

    const drawRipplePatch = (
      centerX: number,
      centerY: number,
      waveRadius: number,
      fade: number,
      elapsed: number,
    ) => {
      const extent = RIPPLE_RADIUS + 4;
      const left = Math.max(0, Math.floor(centerX - extent));
      const top = Math.max(0, Math.floor(centerY - extent));
      const right = Math.min(width, Math.ceil(centerX + extent));
      const bottom = Math.min(height, Math.ceil(centerY + extent));
      const patchWidth = right - left;
      const patchHeight = bottom - top;
      if (patchWidth <= 0 || patchHeight <= 0) return;

      patchCanvas.width = Math.max(1, Math.round(patchWidth * dpr));
      patchCanvas.height = Math.max(1, Math.round(patchHeight * dpr));
      const placement = getImagePlacement();
      const { width: croppedWidth, height: croppedHeight } = getCroppedSize();
      const scaleX = placement.width / croppedWidth;
      const scaleY = placement.height / croppedHeight;

      patchCtx.drawImage(
        image,
        cropLeft + (left - placement.x) / scaleX,
        cropTop + (top - placement.y) / scaleY,
        patchWidth / scaleX,
        patchHeight / scaleY,
        0,
        0,
        patchCanvas.width,
        patchCanvas.height,
      );

      const frame = patchCtx.getImageData(
        0,
        0,
        patchCanvas.width,
        patchCanvas.height,
      );
      const sourcePixels = frame.data;
      const outputPixels = new Uint8ClampedArray(sourcePixels.length);
      const pixelScaleX = patchCanvas.width / patchWidth;
      const pixelScaleY = patchCanvas.height / patchHeight;
      const localX = (centerX - left) * pixelScaleX;
      const localY = (centerY - top) * pixelScaleY;
      const radiusPx = RIPPLE_RADIUS * pixelScaleX;
      const phase = elapsed * 0.012;

      for (let y = 0; y < patchCanvas.height; y++) {
        for (let x = 0; x < patchCanvas.width; x++) {
          const dx = x - localX;
          const dy = y - localY;
          const distance = Math.hypot(dx, dy);
          const index = (y * patchCanvas.width + x) * 4;

          if (distance > radiusPx || distance < 0.1) {
            outputPixels[index] = sourcePixels[index];
            outputPixels[index + 1] = sourcePixels[index + 1];
            outputPixels[index + 2] = sourcePixels[index + 2];
            outputPixels[index + 3] = sourcePixels[index + 3];
            continue;
          }

          const envelope = Math.pow(Math.max(0, 1 - distance / radiusPx), 1.6);
          const wave = Math.sin((distance - waveRadius * pixelScaleX) * 0.105 + phase);
          const displacement = wave * envelope * fade * RIPPLE_AMPLITUDE * pixelScaleX;
          const sampleX = Math.max(
            0,
            Math.min(
              patchCanvas.width - 1,
              Math.round(x - (dx / distance) * displacement),
            ),
          );
          const sampleY = Math.max(
            0,
            Math.min(
              patchCanvas.height - 1,
              Math.round(y - (dy / distance) * displacement),
            ),
          );
          const sampleIndex = (sampleY * patchCanvas.width + sampleX) * 4;
          outputPixels[index] = sourcePixels[sampleIndex];
          outputPixels[index + 1] = sourcePixels[sampleIndex + 1];
          outputPixels[index + 2] = sourcePixels[sampleIndex + 2];
          outputPixels[index + 3] = sourcePixels[sampleIndex + 3];
        }
      }

      frame.data.set(outputPixels);
      patchCtx.putImageData(frame, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.rect(left, top, patchWidth, patchHeight);
      ctx.clip();
      ctx.drawImage(
        patchCanvas,
        0,
        0,
        patchCanvas.width,
        patchCanvas.height,
        left,
        top,
        patchWidth,
        patchHeight,
      );
      ctx.restore();
    };

    function render(now: number) {
      raf = 0;
      drawBase();

      if (!ripple || reducedMotion.matches) {
        ripple = null;
        return;
      }

      const elapsed = now - ripple.start;
      const progress = elapsed / RIPPLE_DURATION;
      if (progress >= 1) {
        ripple = null;
        return;
      }

      const fade = Math.pow(1 - progress, 1.8);
      const waveRadius = 8 + progress * RIPPLE_RADIUS;
      drawRipplePatch(ripple.x, ripple.y, waveRadius, fade, elapsed);
      requestFrame();
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !image.complete) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (lastPointer && Math.hypot(x - lastPointer.x, y - lastPointer.y) < 7) {
        return;
      }
      lastPointer = { x, y };
      ripple = { x, y, start: performance.now() };
      requestFrame();
    };

    const onPointerLeave = () => {
      lastPointer = null;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (ripple) {
        requestFrame();
      }
    };

    const onReducedMotionChange = () => {
      if (reducedMotion.matches) {
        ripple = null;
        window.cancelAnimationFrame(raf);
        raf = 0;
        drawBase();
      }
    };

    image.onload = () => {
      if (!disposed) {
        resize();
      }
    };
    image.src = src;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener?.("change", onReducedMotionChange);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener?.("change", onReducedMotionChange);
      image.onload = null;
    };
  }, [crop.bottom, crop.left, crop.right, crop.top, objectPosition.x, objectPosition.y, src]);

  return (
    <div
      ref={stageRef}
      className={className}
      aria-label={ariaLabel}
      role="img"
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "var(--chakra-color-surface-canvas, #fff)",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
