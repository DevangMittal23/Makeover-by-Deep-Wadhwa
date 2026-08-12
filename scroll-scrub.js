/**
 * Scroll-Scrubbed Video Canvas
 * =============================
 * A full-viewport <canvas> sits BEHIND page content.  Video frames are
 * drawn in sync with scroll position — Apple product-page style.
 *
 * The script auto-discovers all <section> elements inside <main> that
 * do NOT have [data-no-scrub], wraps them in a scroll-driven container,
 * and maps the scroll progress to frame indices.
 *
 * A spacer is injected after the hero so that the initial video area
 * scrolls slowly, giving the viewer time to absorb each frame.
 *
 * CONFIGURATION
 * ------------------------------------
 */
const CONFIG = {
  /** Total extracted frames (frame_0001 … frame_NNNN) */
  frameCount: 114,

  /** Path pattern — %INDEX% → zero-padded frame number */
  framePath: 'frames/frame_%INDEX%.webp',

  /** Zero-pad width (4 → 0001) */
  padDigits: 4,

  /** Hide the loader bar once this fraction of frames is loaded */
  loadThreshold: 0.80,

  /** Scroll easing: 1 = linear, >1 = ease-in, <1 = ease-out */
  easingPower: 1,

  /**
   * Extra transparent scroll space (in vh) inserted after the hero.
   * Makes the video scrub slower in the hero area so every frame
   * is visible longer.  Increase for a more cinematic pace.
   */
  heroSpacerVh: 150,
};

/* ------------------------------------------------------------------ */
/*  STATE                                                              */
/* ------------------------------------------------------------------ */
let frames = [];
let loadedCount = 0;
let currentFrameIdx = -1;
let ticking = false;
let canvas, ctx;
let scrollWrapper;
let loaderEl;

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function zeroPad(num, digits) {
  return String(num).padStart(digits, '0');
}

function frameSrc(i) {
  return CONFIG.framePath.replace('%INDEX%', zeroPad(i, CONFIG.padDigits));
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.round(rect.width * dpr);
  const h = Math.round(rect.height * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    drawFrame(currentFrameIdx >= 0 ? currentFrameIdx : 0);
  }
}

/* ------------------------------------------------------------------ */
/*  DRAWING                                                            */
/* ------------------------------------------------------------------ */

function drawFrame(idx) {
  if (idx < 0 || idx >= frames.length) return;
  const img = frames[idx];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  currentFrameIdx = idx;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
}

/* ------------------------------------------------------------------ */
/*  SCROLL → FRAME                                                     */
/* ------------------------------------------------------------------ */

function onScroll() {
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    const wrapperRect = scrollWrapper.getBoundingClientRect();
    const wrapperTop = window.scrollY + wrapperRect.top;
    const scrollable = scrollWrapper.offsetHeight - window.innerHeight;

    if (scrollable <= 0) { ticking = false; return; }

    let fraction = (window.scrollY - wrapperTop) / scrollable;
    fraction = Math.max(0, Math.min(1, fraction));

    if (CONFIG.easingPower !== 1) {
      fraction = Math.pow(fraction, CONFIG.easingPower);
    }

    const idx = Math.min(
      Math.floor(fraction * CONFIG.frameCount),
      CONFIG.frameCount - 1
    );

    if (idx !== currentFrameIdx) drawFrame(idx);
    ticking = false;
  });
}

/* ------------------------------------------------------------------ */
/*  PRELOADING                                                         */
/* ------------------------------------------------------------------ */

function preloadFrames() {
  return new Promise((resolve) => {
    frames = new Array(CONFIG.frameCount);

    for (let i = 0; i < CONFIG.frameCount; i++) {
      const img = new Image();
      img.decoding = 'async';

      img.onload = img.onerror = () => {
        loadedCount++;

        if (i === 0 && img.complete && img.naturalWidth > 0) {
          drawFrame(0);
        }

        const pct = loadedCount / CONFIG.frameCount;
        if (loaderEl) {
          loaderEl.querySelector('.loader-bar').style.width =
            `${pct * 100}%`;
          if (pct >= CONFIG.loadThreshold) loaderEl.classList.add('loaded');
        }

        if (loadedCount === CONFIG.frameCount) {
          if (loaderEl) loaderEl.classList.add('loaded');
          resolve();
        }
      };

      img.src = frameSrc(i + 1);
      frames[i] = img;
    }
  });
}

/* ------------------------------------------------------------------ */
/*  DOM SETUP                                                          */
/* ------------------------------------------------------------------ */

function buildDOM() {
  const mainEl = document.querySelector('main');
  if (!mainEl) { console.error('[scroll-scrub] <main> not found'); return false; }

  // Grab every section that should participate in the scroll-scrub.
  // Sections with [data-no-scrub] (e.g. the Contact form) are excluded.
  const scrubSections = Array.from(
    mainEl.querySelectorAll(':scope > section:not([data-no-scrub])')
  );
  if (scrubSections.length === 0) {
    console.error('[scroll-scrub] No scrub sections found');
    return false;
  }

  const heroSec = scrubSections[0];

  /* ── 1. Remove the hero's old background image ──────────────────── */
  const oldBgContainer = heroSec.querySelector('.absolute.inset-0.z-0');
  if (oldBgContainer) oldBgContainer.remove();

  /* ── 2. Create the wrapper ──────────────────────────────────────── */
  const wrapper = document.createElement('div');
  wrapper.id = 'scroll-scrub-wrapper';
  wrapper.style.cssText = 'position: relative;';
  mainEl.insertBefore(wrapper, heroSec);

  /* ── 3. Sticky canvas shell ─────────────────────────────────────── */
  const shell = document.createElement('div');
  shell.id = 'scroll-scrub-shell';
  shell.style.cssText = [
    'position: sticky',
    'top: 0',
    'width: 100%',
    'height: 100vh',
    'z-index: 0',
    'overflow: hidden',
    'pointer-events: none',
  ].join(';');

  canvas = document.createElement('canvas');
  canvas.id = 'scroll-video-canvas';
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;display:block;';
  shell.appendChild(canvas);
  ctx = canvas.getContext('2d', { alpha: false });

  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';
  overlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  shell.appendChild(overlay);

  wrapper.appendChild(shell);

  /* ── 4. Content rail ────────────────────────────────────────────── */
  const rail = document.createElement('div');
  rail.id = 'scroll-scrub-rail';
  rail.style.cssText =
    'margin-top: -100vh; position: relative; z-index: 1;';

  // A) Hero — transparent so video shows through
  heroSec.style.background = 'transparent';
  rail.appendChild(heroSec);

  // B) Spacer — extra transparent scroll room for slower video
  if (CONFIG.heroSpacerVh > 0) {
    const spacer = document.createElement('div');
    spacer.id = 'scroll-scrub-spacer';
    spacer.style.cssText = `height: ${CONFIG.heroSpacerVh}vh;`;
    rail.appendChild(spacer);
  }

  // C) Remaining sections — completely transparent background so video is 100% visible
  for (let i = 1; i < scrubSections.length; i++) {
    const sec = scrubSections[i];
    sec.style.background = 'transparent';
    rail.appendChild(sec);
  }

  wrapper.appendChild(rail);

  /* ── 5. Store wrapper for scroll calculations ───────────────────── */
  scrollWrapper = wrapper;

  /* ── 6. Loading indicator ───────────────────────────────────────── */
  loaderEl = document.createElement('div');
  loaderEl.className = 'scroll-scrub-loader';
  loaderEl.innerHTML =
    '<div class="loader-track"><div class="loader-bar"></div></div>';
  document.body.appendChild(loaderEl);

  return true;
}

/* ------------------------------------------------------------------ */
/*  INIT                                                               */
/* ------------------------------------------------------------------ */

function init() {
  if (!buildDOM()) return;

  resizeCanvas();

  preloadFrames().then(() => onScroll());

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    onScroll();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
