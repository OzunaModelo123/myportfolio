/** First-paint splash: dismiss after fonts + layout frames + min/max time. */

const STORAGE_KEY = 'portfolio_boot_seen';
const MIN_FIRST_MS = 520;
const MIN_RETURN_MS = 90;
const MAX_MS = 2800;

function doubleRaf() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Called once after React root render. Removes #app-boot and flips html classes for content fade-in.
 */
export function dismissBootSplash() {
  const el = document.getElementById('app-boot');
  const html = document.documentElement;

  const finishBoot = () => {
    html.classList.remove('boot-pending');
    html.classList.add('boot-complete');
    sessionStorage.setItem(STORAGE_KEY, '1');
    if (!el) return;

    const removeNode = () => {
      el.remove();
    };

    el.addEventListener(
      'transitionend',
      (e) => {
        if (e.propertyName === 'opacity') removeNode();
      },
      { once: true },
    );

    requestAnimationFrame(() => {
      el.classList.add('app-boot--out');
    });

    setTimeout(removeNode, 650);
  };

  if (!el) {
    finishBoot();
    return;
  }

  const isReturn = sessionStorage.getItem(STORAGE_KEY) === '1';
  const minMs = isReturn ? MIN_RETURN_MS : MIN_FIRST_MS;

  const fonts = document.fonts?.ready ?? Promise.resolve();
  if (fonts && typeof fonts.catch === 'function') fonts.catch(() => {});

  const minDelay = wait(minMs);
  const cap = wait(MAX_MS);

  Promise.race([
    Promise.all([fonts, minDelay]).then(() => doubleRaf()),
    cap,
  ]).then(finishBoot, finishBoot);
}
