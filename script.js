const defaults = {
  count: 12,
  countVariance: 4,
  size: 72,
  sizeVariance: 20,
  rotation: 28,
  rotationVariance: 18,
  speed: 14,
  speedVariance: 4,
  drift: 26,
  driftVariance: 14,
};

const state = { ...defaults };

const root = document.documentElement;
const duckRain = document.getElementById("duckRain");
const form = document.getElementById("duckControls");
const infoTrigger = document.getElementById("infoTrigger");
const infoPopup = document.getElementById("infoPopup");
const panelStack = document.querySelector(".panel-stack");
const glassCard = document.getElementById("glassCard");
const panelToggle = document.getElementById("panelToggle");
const panelToggleIcon = document.getElementById("panelToggleIcon");
const controlElements = Array.from(document.querySelectorAll("[data-setting]"));
let activeDuckDrag = null;

const controls = controlElements.reduce((map, element) => {
  const key = element.dataset.setting;
  const nextMap = map;

  if (!nextMap[key]) {
    nextMap[key] = {};
  }

  if (element.type === "range") {
    nextMap[key].range = element;
  } else if (element.type === "number") {
    nextMap[key].number = element;
  }

  return nextMap;
}, {});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function countDecimals(step) {
  const stepText = String(step);
  const decimalPart = stepText.split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}

function normalizeValue(key, rawValue) {
  const range = controls[key].range;
  const min = Number(range.min);
  const max = Number(range.max);
  const step = Number(range.step || 1);
  const precision = countDecimals(step);
  const numericValue = Number(rawValue);

  if (Number.isNaN(numericValue)) {
    return state[key];
  }

  const clamped = clamp(numericValue, min, max);
  const stepped = Math.round((clamped - min) / step) * step + min;
  return Number(stepped.toFixed(precision));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomAround(base, variance, min, max) {
  const candidate = base + randomBetween(-variance, variance);
  return clamp(candidate, min, max);
}

function randomSignedMagnitude(base, variance, min, max) {
  const magnitude = randomAround(base, variance, min, max);
  return magnitude * (Math.random() < 0.5 ? -1 : 1);
}

function syncControl(key) {
  const value = state[key];
  controls[key].range.value = String(value);
  controls[key].number.value = String(value);
}

function syncAllControls() {
  Object.keys(controls).forEach(syncControl);
}

function syncPanelHeight() {
  if (!glassCard.hidden) {
    panelStack.style.minHeight = `${glassCard.offsetHeight}px`;
  }
}

function setPanelExpanded(isExpanded) {
  if (isExpanded) {
    glassCard.hidden = false;
    syncPanelHeight();
  }

  root.classList.toggle("panel-collapsed", !isExpanded);
  panelToggle.setAttribute("aria-expanded", String(isExpanded));
  panelToggle.setAttribute(
    "aria-label",
    isExpanded ? "Einstellungen nach rechts einklappen" : "Einstellungen von rechts ausklappen"
  );
  panelToggleIcon.textContent = isExpanded ? ">" : "<";
}

function setInfoPopupOpen(isOpen) {
  infoPopup.hidden = !isOpen;
  infoTrigger.setAttribute("aria-expanded", String(isOpen));
}

function setDuckPath(duck, leftPx, topPx, fallDistance, duration, delay = 0) {
  duck.style.setProperty("--start-left", `${leftPx.toFixed(2)}px`);
  duck.style.setProperty("--start-top", `${topPx.toFixed(2)}px`);
  duck.style.setProperty("--duration", duration.toFixed(2));
  duck.style.setProperty("--delay", delay.toFixed(2));
  duck.style.setProperty("--fall-mid", `${(fallDistance * 0.52).toFixed(2)}px`);
  duck.style.setProperty("--fall-end", `${fallDistance.toFixed(2)}px`);
  duck.dataset.fallDistance = fallDistance.toFixed(2);
  duck.dataset.duration = duration.toFixed(2);
}

function getFrozenDuckTransform(duck) {
  const transformValue = window.getComputedStyle(duck).transform;

  if (!transformValue || transformValue === "none") {
    return "none";
  }

  try {
    const Matrix = window.DOMMatrixReadOnly || window.DOMMatrix;
    const matrix = new Matrix(transformValue);

    if ("is2D" in matrix && matrix.is2D) {
      return `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, 0, 0)`;
    }

    matrix.m41 = 0;
    matrix.m42 = 0;
    matrix.m43 = 0;
    return matrix.toString();
  } catch {
    return "none";
  }
}

function releaseDuck(pointerId) {
  if (!activeDuckDrag || activeDuckDrag.pointerId !== pointerId) {
    return;
  }

  const { duck, lastX, lastY, size } = activeDuckDrag;
  const remainingDistance = Math.max(40, window.innerHeight + size * 1.35 - lastY);
  const currentDuration = Number(duck.dataset.duration || 1);
  const currentFallDistance = Number(duck.dataset.fallDistance || 1);
  const nextDuration = Math.max(
    0.6,
    currentDuration * (remainingDistance / Math.max(currentFallDistance, 1))
  );

  setDuckPath(duck, lastX, lastY, remainingDistance, nextDuration);

  duck.style.animation = "none";
  void duck.offsetWidth;
  duck.classList.remove("is-dragged");
  duck.style.left = "";
  duck.style.top = "";
  duck.style.transform = "";
  duck.style.animation = "";
  duck.releasePointerCapture(pointerId);

  activeDuckDrag = null;
}

function attachDuckDragging(duck) {
  duck.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  duck.addEventListener("pointerdown", (event) => {
    if (activeDuckDrag) {
      return;
    }

    event.preventDefault();

    const rect = duck.getBoundingClientRect();

    activeDuckDrag = {
      duck,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      startX: rect.left,
      startY: rect.top,
      lastX: rect.left,
      lastY: rect.top,
      size: rect.width,
      frozenTransform: getFrozenDuckTransform(duck),
    };

    duck.style.left = `${rect.left.toFixed(2)}px`;
    duck.style.top = `${rect.top.toFixed(2)}px`;
    duck.style.transform = activeDuckDrag.frozenTransform;
    duck.classList.add("is-dragged");
    duck.setPointerCapture(event.pointerId);
  });

  duck.addEventListener("pointermove", (event) => {
    if (!activeDuckDrag || activeDuckDrag.pointerId !== event.pointerId) {
      return;
    }

    const nextLeft = event.clientX - activeDuckDrag.offsetX;
    const nextTop = event.clientY - activeDuckDrag.offsetY;

    activeDuckDrag.lastX = nextLeft;
    activeDuckDrag.lastY = nextTop;

    duck.style.left = `${nextLeft.toFixed(2)}px`;
    duck.style.top = `${nextTop.toFixed(2)}px`;
  });

  duck.addEventListener("pointerup", (event) => {
    releaseDuck(event.pointerId);
  });

  duck.addEventListener("pointercancel", (event) => {
    releaseDuck(event.pointerId);
  });
}

function createDuck(index, total) {
  const duck = document.createElement("img");
  const size = randomAround(state.size, state.sizeVariance, 24, 520);
  const duration = randomAround(state.speed, state.speedVariance, 1, 70);
  const driftBase = randomAround(state.drift, state.driftVariance, 0, 420);

  duck.className = "duck";
  duck.src = "images/duck_glow.png";
  duck.alt = "";
  duck.decoding = "async";
  duck.draggable = false;

  const fallDistance = window.innerHeight + size * 2.8;
  const minVisiblePart = size * 0.28;
  const startLeft = randomBetween(-size + minVisiblePart, window.innerWidth - minVisiblePart);
  const startTop = size * -1.45;

  duck.style.setProperty("--size", size.toFixed(2));
  setDuckPath(duck, startLeft, startTop, fallDistance, duration, -Math.random() * duration);
  duck.style.setProperty("--scale-start", randomAround(0.94, 0.12, 0.72, 1.28).toFixed(2));
  duck.style.setProperty("--scale-mid", randomAround(1.04, 0.16, 0.78, 1.36).toFixed(2));
  duck.style.setProperty("--scale-end", randomAround(0.98, 0.12, 0.72, 1.3).toFixed(2));
  duck.style.setProperty(
    "--drift-start",
    `${randomSignedMagnitude(driftBase, state.driftVariance, 0, 420).toFixed(1)}px`
  );
  duck.style.setProperty(
    "--drift-mid",
    `${randomSignedMagnitude(driftBase * 1.2, state.driftVariance, 0, 520).toFixed(1)}px`
  );
  duck.style.setProperty(
    "--drift-end",
    `${randomSignedMagnitude(driftBase * 0.85, state.driftVariance, 0, 520).toFixed(1)}px`
  );
  duck.style.setProperty(
    "--rotate-start",
    `${randomSignedMagnitude(state.rotation, state.rotationVariance, 0, 540).toFixed(1)}deg`
  );
  duck.style.setProperty(
    "--rotate-mid",
    `${randomSignedMagnitude(
      state.rotation * 1.25,
      state.rotationVariance,
      0,
      640
    ).toFixed(1)}deg`
  );
  duck.style.setProperty(
    "--rotate-end",
    `${randomSignedMagnitude(
      state.rotation * 1.65,
      state.rotationVariance,
      0,
      720
    ).toFixed(1)}deg`
  );

  attachDuckDragging(duck);

  return duck;
}

function renderDucks() {
  const activeCount = Math.max(
    1,
    Math.round(randomAround(state.count, state.countVariance, 1, 240))
  );
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < activeCount; index += 1) {
    fragment.appendChild(createDuck(index, activeCount));
  }

  duckRain.replaceChildren(fragment);
}

function applyValue(key, rawValue) {
  state[key] = normalizeValue(key, rawValue);
  syncControl(key);
  renderDucks();
}

function resetToDefaults() {
  Object.keys(defaults).forEach((key) => {
    state[key] = defaults[key];
  });

  syncAllControls();
  renderDucks();
}

Object.entries(controls).forEach(([key, control]) => {
  control.range.addEventListener("input", () => {
    applyValue(key, control.range.value);
  });

  control.number.addEventListener("input", () => {
    if (control.number.value === "" || control.number.validity.badInput) {
      return;
    }

    applyValue(key, control.number.value);
  });

  control.number.addEventListener("change", () => {
    applyValue(key, control.number.value);
  });

  control.number.addEventListener("blur", () => {
    control.number.value = String(state[key]);
  });
});

window.addEventListener("resize", renderDucks);
window.addEventListener("resize", syncPanelHeight);
window.addEventListener("pageshow", () => {
  setPanelExpanded(true);
  resetToDefaults();
});

form.addEventListener("reset", (event) => {
  event.preventDefault();
  resetToDefaults();
});

panelToggle.addEventListener("click", () => {
  const isExpanded = panelToggle.getAttribute("aria-expanded") === "true";
  setPanelExpanded(!isExpanded);
});

infoTrigger.addEventListener("click", () => {
  setInfoPopupOpen(infoPopup.hidden);
});

document.addEventListener("pointerdown", (event) => {
  if (
    infoPopup.hidden ||
    infoPopup.contains(event.target) ||
    infoTrigger.contains(event.target)
  ) {
    return;
  }

  setInfoPopupOpen(false);
});

glassCard.addEventListener("transitionend", () => {
  glassCard.hidden = root.classList.contains("panel-collapsed");
});

setInfoPopupOpen(false);
setPanelExpanded(true);
resetToDefaults();
syncPanelHeight();
