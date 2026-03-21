const defaults = {
  count: 15,
  size: 72,
  sizeVariance: 20,
  rotation: 45,
  rotationVariance: 45,
  speed: 14,
  speedVariance: 4,
  drift: 26,
  driftVariance: 14,
};

const state = { ...defaults };
const APP_VERSION =
  document.querySelector('meta[name="app-version"]')?.content || "dev";
const FALLBACK_ASSET_SIZE = 1024;
const UI_REVEAL_PREWARM_MS = 140;
const ATTENTION_POPUP_DELAY_MS = 10 * 60 * 1000;
const ATTENTION_RESET_INACTIVE_MS = 60 * 60 * 1000;
const MIN_SPEED = 1;
const MAX_SPEED = 200;
const DRAG_SCALE = 2;
const GUARDIAN_EVENT_FAMILY_KEY = "real_duck";
const GUARDIAN_EVENT_CHANCE = 1 / 10000;
const GUARDIAN_EVENT_BLACK_FADE_MS = 4200;
const GUARDIAN_EVENT_DUCK_FADE_MS = 3200;
const GUARDIAN_EVENT_BUBBLE_FADE_MS = 1400;
const GUARDIAN_EVENT_HOLD_MS = 10000;
const VISION_EVENT_CHANCE = 1 / 100;
const VISION_EVENT_BLUR_FADE_MS = 4200;
const VISION_EVENT_DUCK_ENTRY_MS = 6200;
const VISION_EVENT_FIRST_LOOK_MS = 5000;
const VISION_EVENT_SECOND_LOOK_MS = 3000;
const VISION_EVENT_THIRD_LOOK_MS = 3000;
const VISION_EVENT_POST_CLEAR_LOOK_MS = 5000;
const VISION_EVENT_DUCK_EXIT_MS = 6200;
const PAINTING_EVENT_CHANCE = 1 / 10000;
const PAINTING_EVENT_STROKE_MS = 1900;
const PAINTING_EVENT_SHIFT_MS = 360;
const PAINTING_EVENT_DUCK_ENTRY_MS = 4200;
const PAINTING_EVENT_ART_FADE_MS = 5600;
const PAINTING_EVENT_LOOK_HOLD_MS = 5000;
const PAINTING_EVENT_TURN_HOLD_MS = 3000;
const PAINTING_EVENT_BLACK_FADE_MS = 4200;
const PAINTING_EVENT_BLACK_HOLD_MS = 500;
const PAINTING_EVENT_TARGET_STROKE_WIDTH = 150;
const PAINTING_EVENT_CONTACT_OFFSET_RATIO = 0.12;
const PAINTING_EVENT_MIN_STROKES = 6;
const SUPER_SIGN_DUCK_FAMILY_KEY = "sign_duck";
const SUPER_SIGN_DUCK_CHANCE = 1 / 10000;
const SUPER_SIGN_DUCK_SPEED = 5;
const MODE_DEFAULT_GLOW_LEVELS = {
  day: 0,
  night: 2,
};
const SPECIAL_DUCK_CHANCE = 1 / 100;
const MOTION_UPDATE_KEYS = new Set([
  "speed",
  "speedVariance",
  "rotation",
  "rotationVariance",
  "drift",
  "driftVariance",
]);
const SPECIAL_DUCK_FAMILY_ENTRIES = [
  ["architect_duck", "architect_duck_glow.png", "architect_duck_halfglow.png", "architect_duck.png"],
  ["bread_duck", "bread_duck_glow.png", "bread_duck_halfglow.png", "bread_duck.png"],
  ["glasses_duck", "glasses_duck_glow.png", "glasses_duck_halfglow.png", "glasses_duck.png"],
  ["hoodie_duck", "hoodie_duck_glow.png", "hoodie_duck_halfglow.png", "hoodie_duck.png"],
  ["instantnudel_duck", "instantnudel_duck_glow.png", "instantnudel_duck_halfglow.png", "instantnudel_duck.png"],
  ["paint_duck", "paint_duck_glow.png", "paint_duck_halfglow.png", "paint_duck.png"],
  ["pullover_duck", "pullover_duck_glow.png", "pullover_duck_halfglow.png", "pullover_duck.png"],
  ["real_duck", "real_duck_glow.png", "real_duck_halfglow.png", "real_duck.png"],
  ["shaker_duck", "shaker_duck_glow.png", "shaker_duck_halfglow.png", "shaker_duck.png"],
  ["sign_duck", "sign_duck_glow.png", "sign_duck_halfglow.png", "sign_duck.png"],
  ["spezi_duck", "spezi_duck_glow.png", "spezi_duck_halfglow.png", "spezi_duck.png"],
];
const GLOWING_ASSET_SET = createDuckAssetSet(
  "images/ducks/glowing_vesion",
  ["duck", "duck_glow.png"],
  SPECIAL_DUCK_FAMILY_ENTRIES.map(([key, glowFilename]) => [key, glowFilename])
);
const HALF_GLOWING_ASSET_SET = createDuckAssetSet(
  "images/ducks/halfglowing_version",
  ["duck", "duck_halfglow.png"],
  SPECIAL_DUCK_FAMILY_ENTRIES.map(([key, , halfGlowFilename]) => [key, halfGlowFilename])
);
const NON_GLOWING_ASSET_SET = createDuckAssetSet(
  "images/ducks/non_glowing_version",
  ["duck", "duck.png"],
  SPECIAL_DUCK_FAMILY_ENTRIES.map(([key, , , nonGlowFilename]) => [key, nonGlowFilename])
);
const PAINTING_EVENT_ROLLER_ASSET = createDuckAsset("images/other/paint_roller.png");
const PAINTING_EVENT_WALL_ASSET = createDuckAsset("images/other/red_wall.jpg");
const PAINTING_EVENT_ART_ASSET = createDuckAsset("images/other/wall_painting.png");
const PAINTING_EVENT_PULLOVER_BACK_ASSET = createDuckAsset(
  "images/ducks/back_version/pullover_duck_back.png"
);
const PAINTING_EVENT_TSHIRT_BACK_ASSET = createDuckAsset(
  "images/ducks/back_version/tshirt_duck_back.png"
);
const PAINTING_EVENT_PULLOVER_FRONT_ASSET = createDuckAsset(
  "images/ducks/non_glowing_version/pullover_duck.png"
);
const PAINTING_EVENT_TSHIRT_FRONT_ASSET = createDuckAsset(
  "images/ducks/non_glowing_version/tshirt_duck.png"
);
const VISION_EVENT_NUMBER_DUCK_VARIANTS = [
  ["30_duck", createDuckAsset("images/ducks/non_glowing_version/30_duck.png")],
  ["50_duck", createDuckAsset("images/ducks/non_glowing_version/50_duck.png")],
  ["80_duck", createDuckAsset("images/ducks/non_glowing_version/80_duck.png")],
].map(([key, asset]) => ({ key, asset }));
const VISION_EVENT_NUMBER_DUCKS_BY_KEY = Object.fromEntries(
  VISION_EVENT_NUMBER_DUCK_VARIANTS.map((entry) => [entry.key, entry.asset])
);
const VISION_EVENT_BACK_ASSET = createDuckAsset("images/ducks/back_version/duck_back.png");
const VISION_EVENT_SQUINT_ASSET = createDuckAsset("images/ducks/non_glowing_version/squint_duck.png");
const VISION_EVENT_GLASSES_ASSET = createDuckAsset("images/ducks/non_glowing_version/glasses_duck.png");

const root = document.documentElement;
const duckRain = document.getElementById("duckRain");
const duckDragLayer = document.getElementById("duckDragLayer");
const pageShell = document.querySelector(".page-shell");
const form = document.getElementById("duckControls");
const infoTrigger = document.getElementById("infoTrigger");
const infoPopup = document.getElementById("infoPopup");
const attentionPopup = document.getElementById("attentionPopup");
const attentionPopupClose = document.getElementById("attentionPopupClose");
const guardianEvent = document.getElementById("guardianEvent");
const guardianEventDuck = document.getElementById("guardianEventDuck");
const visionEvent = document.getElementById("visionEvent");
const visionEventDuck = document.getElementById("visionEventDuck");
const paintingEvent = document.getElementById("paintingEvent");
const paintingEventWall = document.getElementById("paintingEventWall");
const paintingEventRoller = document.getElementById("paintingEventRoller");
const paintingEventScene = paintingEvent.querySelector(".painting-event__scene");
const paintingEventPulloverDuck = document.getElementById("paintingEventPulloverDuck");
const paintingEventTshirtDuck = document.getElementById("paintingEventTshirtDuck");
const paintingEventArt = document.getElementById("paintingEventArt");
const uiVisibilityToggle = document.getElementById("uiVisibilityToggle");
const nightModeToggle = document.getElementById("nightModeToggle");
const themeSwitchLabel = document.getElementById("themeSwitchLabel");
const glowLevelInput = document.getElementById("glowLevel");
const panelStack = document.querySelector(".panel-stack");
const glassCard = document.getElementById("glassCard");
const panelToggle = document.getElementById("panelToggle");
const panelToggleIcon = document.getElementById("panelToggleIcon");
const controlElements = Array.from(document.querySelectorAll("[data-setting]"));
const duckPool = [];
let activeDuckDrag = null;
let renderFrame = 0;
let panelHeightFrame = 0;
let activeCardTouchScroll = null;
let attentionElapsedMs = 0;
let attentionActiveStartedAt = 0;
let attentionInactiveStartedAt = 0;
let attentionTimeoutId = 0;
let attentionPopupTriggered = false;
let attentionPopupPending = false;
let uiRevealFrameId = 0;
let uiRevealTimeoutId = 0;
let guardianEventActive = false;
let guardianEventRunId = 0;
let guardianEventRestoreUi = false;
let visionEventActive = false;
let visionEventRunId = 0;
let visionEventRestoreUi = false;
let paintingEventActive = false;
let paintingEventRunId = 0;
let paintingEventRestoreUi = false;
let superSignDuckActive = false;
let numberedDuckRainMode = false;

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

function versionedUrl(path) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${encodeURIComponent(APP_VERSION)}`;
}

function createDuckAsset(path) {
  return {
    path,
    url: versionedUrl(path),
    sourceWidth: FALLBACK_ASSET_SIZE,
    sourceHeight: FALLBACK_ASSET_SIZE,
    dimensionsReady: false,
    loadPromise: null,
  };
}

function createDuckAssetSet(folderPath, baseEntry, specialEntries) {
  const [baseKey, baseFilename] = baseEntry;
  const base = createDuckAsset(`${folderPath}/${baseFilename}`);
  const specials = specialEntries.map(([key, filename]) => ({
    key,
    asset: createDuckAsset(`${folderPath}/${filename}`),
  }));

  return {
    baseKey,
    base,
    specials,
    byKey: Object.fromEntries([
      [baseKey, base],
      ...specials.map((entry) => [entry.key, entry.asset]),
    ]),
  };
}

function loadDuckAssetDimensions(asset) {
  if (asset.dimensionsReady) {
    return Promise.resolve(asset);
  }

  if (asset.loadPromise) {
    return asset.loadPromise;
  }

  asset.loadPromise = new Promise((resolve) => {
    const probe = new Image();

    probe.decoding = "async";
    probe.onload = () => {
      asset.sourceWidth = probe.naturalWidth || FALLBACK_ASSET_SIZE;
      asset.sourceHeight = probe.naturalHeight || FALLBACK_ASSET_SIZE;
      asset.dimensionsReady = true;
      resolve(asset);
    };
    probe.onerror = () => {
      asset.dimensionsReady = true;
      resolve(asset);
    };
    probe.src = asset.url;
  });

  return asset.loadPromise;
}

function warmDuckAssets() {
  const loadAllAssetMetadata = () => {
    const assets = [
      GLOWING_ASSET_SET.base,
      ...GLOWING_ASSET_SET.specials.map((entry) => entry.asset),
      HALF_GLOWING_ASSET_SET.base,
      ...HALF_GLOWING_ASSET_SET.specials.map((entry) => entry.asset),
      NON_GLOWING_ASSET_SET.base,
      ...NON_GLOWING_ASSET_SET.specials.map((entry) => entry.asset),
      getDuckAssetForFamily(GLOWING_ASSET_SET, GUARDIAN_EVENT_FAMILY_KEY),
      PAINTING_EVENT_ROLLER_ASSET,
      PAINTING_EVENT_WALL_ASSET,
      PAINTING_EVENT_ART_ASSET,
      PAINTING_EVENT_PULLOVER_BACK_ASSET,
      PAINTING_EVENT_TSHIRT_BACK_ASSET,
      PAINTING_EVENT_PULLOVER_FRONT_ASSET,
      PAINTING_EVENT_TSHIRT_FRONT_ASSET,
      ...VISION_EVENT_NUMBER_DUCK_VARIANTS.map((entry) => entry.asset),
      VISION_EVENT_BACK_ASSET,
      VISION_EVENT_SQUINT_ASSET,
      VISION_EVENT_GLASSES_ASSET,
    ];

    Promise.allSettled(assets.map(loadDuckAssetDimensions)).then(() => {
      requestRender();
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadAllAssetMetadata, { timeout: 1500 });
    return;
  }

  window.setTimeout(loadAllAssetMetadata, 0);
}

function syncSpecialEventAssets() {
  guardianEventDuck.src = getDuckAssetForFamily(GLOWING_ASSET_SET, GUARDIAN_EVENT_FAMILY_KEY).url;
  visionEventDuck.src = VISION_EVENT_BACK_ASSET.url;
  paintingEventRoller.src = PAINTING_EVENT_ROLLER_ASSET.url;
  paintingEventArt.src = PAINTING_EVENT_ART_ASSET.url;
  paintingEventPulloverDuck.src = PAINTING_EVENT_PULLOVER_BACK_ASSET.url;
  paintingEventTshirtDuck.src = PAINTING_EVENT_TSHIRT_BACK_ASSET.url;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function countDecimals(step) {
  const stepText = String(step);
  const decimalPart = stepText.split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}

function normalizeValue(key, rawValue, sourceElement = controls[key].range) {
  const min = Number(sourceElement.min);
  const max = Number(sourceElement.max);
  const step = Number(sourceElement.step || 1);
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

function speedValueToDuration(speedValue) {
  const safeSpeed = clamp(speedValue, MIN_SPEED, MAX_SPEED);
  return clamp((defaults.speed * defaults.speed) / safeSpeed, 0.08, 70);
}

function createRotationProfile() {
  const direction = Math.random() < 0.5 ? -1 : 1;
  const startMagnitude = randomAround(state.rotation, state.rotationVariance, 0, 360);
  const midExtraMagnitude = randomAround(state.rotation * 0.9, state.rotationVariance, 0, 320);
  const endExtraMagnitude = randomAround(state.rotation * 1.05, state.rotationVariance, 0, 360);

  return createRotationProfileFromAngle(direction * startMagnitude, direction, {
    midExtraMagnitude,
    endExtraMagnitude,
  });
}

function createRotationProfileFromAngle(startAngle, direction, extras = {}) {
  const resolvedDirection = direction === -1 ? -1 : 1;
  const midExtraMagnitude =
    extras.midExtraMagnitude ??
    randomAround(state.rotation * 0.9, state.rotationVariance, 0, 320);
  const endExtraMagnitude =
    extras.endExtraMagnitude ??
    randomAround(state.rotation * 1.05, state.rotationVariance, 0, 360);

  const start = startAngle;
  const mid = start + resolvedDirection * midExtraMagnitude;
  const end = mid + resolvedDirection * endExtraMagnitude;

  return {
    start: `${start.toFixed(1)}deg`,
    mid: `${mid.toFixed(1)}deg`,
    end: `${end.toFixed(1)}deg`,
    direction: String(resolvedDirection),
  };
}

function getGlowLevel() {
  return Number(glowLevelInput.value);
}

function getModeKey(isNightMode = root.classList.contains("night-mode")) {
  return isNightMode ? "night" : "day";
}

function syncGlowLevelForMode(modeKey) {
  glowLevelInput.value = String(MODE_DEFAULT_GLOW_LEVELS[modeKey]);
}

function getActiveDuckAssetSet() {
  const glowLevel = getGlowLevel();

  if (glowLevel >= 2) {
    return GLOWING_ASSET_SET;
  }

  if (glowLevel === 1) {
    return HALF_GLOWING_ASSET_SET;
  }

  return NON_GLOWING_ASSET_SET;
}

function getDuckAssetForFamily(assetSet, familyKey) {
  return assetSet.byKey[familyKey] || assetSet.base;
}

function pickVisionNumberDuckVariant() {
  const index = Math.floor(Math.random() * VISION_EVENT_NUMBER_DUCK_VARIANTS.length);
  const variant = VISION_EVENT_NUMBER_DUCK_VARIANTS[index];

  loadDuckAssetDimensions(variant.asset);
  return variant;
}

function getReferenceAssetForFamily(familyKey) {
  return NON_GLOWING_ASSET_SET.byKey[familyKey] || NON_GLOWING_ASSET_SET.base;
}

function pickDuckVariant(assetSet) {
  if (!assetSet.specials.length || Math.random() >= SPECIAL_DUCK_CHANCE) {
    loadDuckAssetDimensions(assetSet.base);
    return {
      familyKey: assetSet.baseKey,
      asset: assetSet.base,
    };
  }

  const index = Math.floor(Math.random() * assetSet.specials.length);
  const variant = assetSet.specials[index];

  loadDuckAssetDimensions(variant.asset);
  return {
    familyKey: variant.key,
    asset: variant.asset,
  };
}

function getRenderedDuckSize(baseSize, asset, familyKey) {
  const baseAsset = getReferenceAssetForFamily(familyKey);
  const baseMaxDimension = Math.max(baseAsset.sourceWidth, baseAsset.sourceHeight);
  const assetMaxDimension = Math.max(asset.sourceWidth, asset.sourceHeight);
  const resolutionScale = assetMaxDimension / baseMaxDimension;

  return clamp(baseSize * resolutionScale, 18, 520);
}

function getDuckSizeForMode(logicalSize, asset, familyKey, mode = "normal") {
  if (mode === "super-sign") {
    return window.innerWidth;
  }

  return getRenderedDuckSize(logicalSize, asset, familyKey);
}

function hasActiveSuperEvent() {
  return guardianEventActive || visionEventActive || paintingEventActive || superSignDuckActive;
}

function isVisionNumberDuckFamilyKey(familyKey) {
  return Boolean(VISION_EVENT_NUMBER_DUCKS_BY_KEY[familyKey]);
}

function isAttentionPopupBlockingSuperEvents() {
  return attentionPopupPending || !attentionPopup.hidden;
}

function isMobileSuperEventVibrationEligible() {
  return (
    document.visibilityState === "visible" &&
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function" &&
    (navigator.maxTouchPoints > 0 || window.matchMedia("(hover: none), (pointer: coarse)").matches)
  );
}

function triggerSuperEventVibration() {
  if (!isMobileSuperEventVibrationEligible()) {
    return;
  }

  try {
    navigator.vibrate([90, 60, 140]);
  } catch {
    // Ignore unsupported or blocked vibration calls.
  }
}

function releaseSuperEventLockForDuck(duck) {
  if (getStoredDuckSpawnMode(duck) === "super-sign") {
    superSignDuckActive = false;
    flushDeferredAttentionPopup();
  }
}

function createDuckMotionProfile(options = {}) {
  const assetSet = getActiveDuckAssetSet();
  const isFreshSpawn = !options.mode && !options.familyKey;
  const fullscreenEventTriggered = isFreshSpawn && maybeTriggerFullscreenSuperEvent();
  const preservedFamilyKey =
    options.normalFamilyKey ||
    (options.familyKey && !isVisionNumberDuckFamilyKey(options.familyKey) ? options.familyKey : "");
  const spawnMode =
    options.mode ||
    (isFreshSpawn &&
    !hasActiveSuperEvent() &&
    !isAttentionPopupBlockingSuperEvents() &&
    !fullscreenEventTriggered &&
    Math.random() < SUPER_SIGN_DUCK_CHANCE
      ? "super-sign"
      : "normal");

  if (spawnMode === "super-sign") {
    superSignDuckActive = true;
    if (isFreshSpawn) {
      triggerSuperEventVibration();
    }
    const asset = getDuckAssetForFamily(assetSet, SUPER_SIGN_DUCK_FAMILY_KEY);
    const logicalSize = options.logicalSize ?? window.innerWidth;

    loadDuckAssetDimensions(asset);

    return {
      mode: "super-sign",
      asset,
      familyKey: SUPER_SIGN_DUCK_FAMILY_KEY,
      logicalSize,
      size: getDuckSizeForMode(logicalSize, asset, SUPER_SIGN_DUCK_FAMILY_KEY, "super-sign"),
      duration: speedValueToDuration(SUPER_SIGN_DUCK_SPEED),
      driftBase: 0,
    };
  }

  const logicalSize =
    options.logicalSize ?? randomAround(state.size, state.sizeVariance, 24, 520);
  const baseVariant = preservedFamilyKey
    ? {
        familyKey: preservedFamilyKey,
        asset: getDuckAssetForFamily(assetSet, preservedFamilyKey),
      }
    : pickDuckVariant(assetSet);
  const selectedVariant = numberedDuckRainMode ? pickVisionNumberDuckVariant() : baseVariant;
  const size = getDuckSizeForMode(logicalSize, selectedVariant.asset, baseVariant.familyKey);
  const effectiveSpeed = randomAround(state.speed, state.speedVariance, MIN_SPEED, MAX_SPEED);
  const duration = speedValueToDuration(effectiveSpeed);
  const driftBase = randomAround(state.drift, state.driftVariance, 0, 420);

  return {
    mode: "normal",
    asset: selectedVariant.asset,
    familyKey: selectedVariant.familyKey,
    normalFamilyKey: baseVariant.familyKey,
    logicalSize,
    size,
    duration,
    driftBase,
  };
}

function getTransformMatrix(duck) {
  const transformValue = window.getComputedStyle(duck).transform;

  if (!transformValue || transformValue === "none") {
    return null;
  }

  try {
    const Matrix =
      window.DOMMatrixReadOnly || window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix;

    if (!Matrix) {
      return null;
    }

    return new Matrix(transformValue);
  } catch {
    return null;
  }
}

function getCurrentDuckTranslation(duck) {
  const matrix = getTransformMatrix(duck);

  if (!matrix) {
    return { x: 0, y: 0 };
  }

  return {
    x: Number(matrix.m41 || 0),
    y: Number(matrix.m42 || 0),
  };
}

function getMatrixRotationDegrees(matrix) {
  if (!matrix) {
    return 0;
  }

  const angleRadians = Math.atan2(matrix.b || 0, matrix.a || 1);
  return angleRadians * (180 / Math.PI);
}

function syncControl(key) {
  const value = state[key];
  const range = controls[key].range;
  const number = controls[key].number;
  const rangeMin = Number(range.min);
  const rangeMax = Number(range.max);

  range.value = String(clamp(value, rangeMin, rangeMax));
  number.value = String(value);
}

function syncAllControls() {
  Object.keys(controls).forEach(syncControl);
}

function syncPanelHeight() {
  if (root.classList.contains("panel-collapsed")) {
    panelStack.style.minHeight = "";
    return;
  }

  panelStack.style.minHeight = `${glassCard.offsetHeight}px`;
}

function requestPanelHeightSync() {
  if (panelHeightFrame) {
    return;
  }

  panelHeightFrame = window.requestAnimationFrame(() => {
    panelHeightFrame = 0;
    syncPanelHeight();
  });
}

function setPanelExpanded(isExpanded) {
  if (isExpanded) {
    glassCard.hidden = false;
  }

  root.classList.toggle("panel-collapsed", !isExpanded);
  glassCard.setAttribute("aria-hidden", String(!isExpanded));
  glassCard.inert = !isExpanded;
  panelToggle.setAttribute("aria-expanded", String(isExpanded));
  panelToggle.setAttribute(
    "aria-label",
    isExpanded ? "Einstellungen nach rechts einklappen" : "Einstellungen von rechts ausklappen"
  );
  panelToggleIcon.textContent = isExpanded ? ">" : "<";
  requestPanelHeightSync();
}

function setInfoPopupOpen(isOpen) {
  infoPopup.hidden = !isOpen;
  infoTrigger.setAttribute("aria-expanded", String(isOpen));
}

function setAttentionPopupOpen(isOpen) {
  attentionPopup.hidden = !isOpen;
}

function setGuardianEventVisible(isOpen) {
  guardianEvent.hidden = !isOpen;
  guardianEvent.setAttribute("aria-hidden", String(!isOpen));
}

function setVisionEventVisible(isOpen) {
  visionEvent.hidden = !isOpen;
  visionEvent.setAttribute("aria-hidden", String(!isOpen));
}

function resetVisionEventScene() {
  visionEvent.classList.remove("is-visible", "is-blurry", "is-duck-visible", "is-duck-exiting");
  visionEventDuck.src = VISION_EVENT_BACK_ASSET.url;
  visionEventDuck.style.setProperty("--vision-duck-move-duration", `${VISION_EVENT_DUCK_ENTRY_MS}ms`);
}

function setNumberedDuckRainMode(isActive) {
  if (numberedDuckRainMode === isActive) {
    return;
  }

  numberedDuckRainMode = isActive;
}

function setPaintingEventVisible(isOpen) {
  paintingEvent.hidden = !isOpen;
  paintingEvent.setAttribute("aria-hidden", String(!isOpen));
}

function setPaintingEventContentVisible(isVisible) {
  paintingEventWall.hidden = !isVisible;
  paintingEventRoller.hidden = !isVisible;
  paintingEventScene.hidden = !isVisible;
}

function setSuperEventDucksPaused(isPaused) {
  root.classList.toggle("guardian-event-active", isPaused);
  root.classList.toggle("super-event-active", isPaused);
}

function setSuperEventUiHidden(isHidden) {
  root.classList.toggle("super-event-ui-hidden", isHidden);
}

function resetPaintingEventScene() {
  setPaintingEventContentVisible(true);
  paintingEvent.classList.remove(
    "is-visible",
    "is-painting",
    "is-ducks-visible",
    "is-art-visible",
    "is-blackout-visible"
  );
  paintingEventWall.replaceChildren();
  paintingEventRoller.style.removeProperty("--roller-x");
  paintingEventRoller.style.removeProperty("--roller-y");
  paintingEventRoller.style.removeProperty("opacity");
  paintingEventPulloverDuck.src = PAINTING_EVENT_PULLOVER_BACK_ASSET.url;
  paintingEventTshirtDuck.src = PAINTING_EVENT_TSHIRT_BACK_ASSET.url;
  paintingEventArt.src = PAINTING_EVENT_ART_ASSET.url;
}

function setPaintingRollerPosition(x, y) {
  paintingEventRoller.style.setProperty("--roller-x", `${x.toFixed(2)}px`);
  paintingEventRoller.style.setProperty("--roller-y", `${y.toFixed(2)}px`);
}

function getPaintingRollerMetrics() {
  const rollerRect = paintingEventRoller.getBoundingClientRect();
  const rollerWidth = rollerRect.width || PAINTING_EVENT_TARGET_STROKE_WIDTH * 1.45;
  const rollerHeight = rollerRect.height || rollerWidth * 1.42;
  const paintWidth = Math.max(PAINTING_EVENT_TARGET_STROKE_WIDTH, rollerWidth * 0.68);
  const contactOffset = rollerHeight * PAINTING_EVENT_CONTACT_OFFSET_RATIO;

  return {
    rollerWidth,
    rollerHeight,
    paintWidth,
    contactOffset,
  };
}

function createPaintingWallStroke(left, width) {
  const stroke = document.createElement("div");

  stroke.className = "painting-event__stroke";
  stroke.style.left = `${left}px`;
  stroke.style.width = `${width}px`;
  stroke.style.height = "0px";
  stroke.style.backgroundImage = `url("${PAINTING_EVENT_WALL_ASSET.url}")`;
  stroke.style.backgroundPosition = `${-left}px 0px`;

  return stroke;
}

function setPaintingRollerVisible(isVisible) {
  paintingEventRoller.style.opacity = isVisible ? "1" : "0";
}

function updatePaintingStrokeProgress(stroke, progress) {
  stroke.style.height = `${(window.innerHeight * progress).toFixed(2)}px`;
}

function animatePaintingStroke(stroke, rollerX, contactOffset, runId) {
  return new Promise((resolve) => {
    const strokeStart = performance.now();

    const step = (now) => {
      if (runId !== paintingEventRunId) {
        resolve(false);
        return;
      }

      const progress = clamp((now - strokeStart) / PAINTING_EVENT_STROKE_MS, 0, 1);
      const contactY = window.innerHeight * progress;

      updatePaintingStrokeProgress(stroke, progress);
      setPaintingRollerPosition(rollerX, contactY - contactOffset);

      if (progress < 1) {
        window.requestAnimationFrame(step);
        return;
      }

      resolve(true);
    };

    window.requestAnimationFrame(step);
  });
}

function waitForMilliseconds(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function triggerGuardianEvent() {
  if (guardianEventActive) {
    return false;
  }

  guardianEventActive = true;
  guardianEventRunId += 1;
  triggerSuperEventVibration();
  const runId = guardianEventRunId;
  const guardianDuckAsset = getDuckAssetForFamily(GLOWING_ASSET_SET, GUARDIAN_EVENT_FAMILY_KEY);

  await loadDuckAssetDimensions(guardianDuckAsset);

  if (runId !== guardianEventRunId) {
    return false;
  }

  if (activeDuckDrag) {
    discardActiveDuckDrag();
  }

  guardianEventRestoreUi = !root.classList.contains("ui-hidden");
  setSuperEventUiHidden(true);
  setUiHidden(true);
  setInfoPopupOpen(false);
  setAttentionPopupOpen(false);
  guardianEventDuck.src = guardianDuckAsset.url;
  guardianEvent.classList.remove("is-visible", "is-duck-visible", "is-bubble-visible");
  setGuardianEventVisible(true);

  await waitForMilliseconds(20);

  if (runId !== guardianEventRunId) {
    return false;
  }

  guardianEvent.classList.add("is-visible");
  await waitForMilliseconds(GUARDIAN_EVENT_BLACK_FADE_MS);

  if (runId !== guardianEventRunId) {
    return false;
  }

  pauseDuckAnimationClocks();
  setSuperEventDucksPaused(true);
  guardianEvent.classList.add("is-duck-visible");
  await waitForMilliseconds(GUARDIAN_EVENT_DUCK_FADE_MS);

  if (runId !== guardianEventRunId) {
    return false;
  }

  guardianEvent.classList.add("is-bubble-visible");
  await waitForMilliseconds(GUARDIAN_EVENT_HOLD_MS);

  if (runId !== guardianEventRunId) {
    return false;
  }

  guardianEvent.classList.remove("is-bubble-visible");
  await waitForMilliseconds(GUARDIAN_EVENT_BUBBLE_FADE_MS);

  if (runId !== guardianEventRunId) {
    return false;
  }

  guardianEvent.classList.remove("is-duck-visible");
  await waitForMilliseconds(GUARDIAN_EVENT_DUCK_FADE_MS);

  if (runId !== guardianEventRunId) {
    return false;
  }

  guardianEvent.classList.remove("is-visible");
  setSuperEventDucksPaused(false);
  resumeDuckAnimationClocks();
  await waitForMilliseconds(GUARDIAN_EVENT_BLACK_FADE_MS);

  if (runId !== guardianEventRunId) {
    return false;
  }

  setGuardianEventVisible(false);
  setSuperEventUiHidden(false);
  if (guardianEventRestoreUi) {
    setUiHidden(false);
  }

  guardianEventRestoreUi = false;
  guardianEventActive = false;
  flushDeferredAttentionPopup();

  return true;
}

async function triggerVisionEvent() {
  if (visionEventActive) {
    return false;
  }

  visionEventActive = true;
  visionEventRunId += 1;
  triggerSuperEventVibration();
  const runId = visionEventRunId;
  const visionEventAssets = [
    ...VISION_EVENT_NUMBER_DUCK_VARIANTS.map((entry) => entry.asset),
    VISION_EVENT_BACK_ASSET,
    VISION_EVENT_SQUINT_ASSET,
    VISION_EVENT_GLASSES_ASSET,
  ];

  try {
    await Promise.allSettled(visionEventAssets.map(loadDuckAssetDimensions));

    if (runId !== visionEventRunId) {
      return false;
    }

    if (activeDuckDrag) {
      discardActiveDuckDrag();
    }

    visionEventRestoreUi = !root.classList.contains("ui-hidden");
    setSuperEventUiHidden(true);
    setUiHidden(true);
    setInfoPopupOpen(false);
    setAttentionPopupOpen(false);
    resetVisionEventScene();
    setVisionEventVisible(true);

    await waitForMilliseconds(20);

    if (runId !== visionEventRunId) {
      return false;
    }

    visionEvent.classList.add("is-visible");
    await waitForMilliseconds(40);
    visionEvent.classList.add("is-blurry");
    await waitForMilliseconds(VISION_EVENT_BLUR_FADE_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    setNumberedDuckRainMode(true);
    visionEventDuck.style.setProperty("--vision-duck-move-duration", `${VISION_EVENT_DUCK_ENTRY_MS}ms`);
    visionEventDuck.src = VISION_EVENT_BACK_ASSET.url;
    visionEvent.classList.add("is-duck-visible");
    await waitForMilliseconds(VISION_EVENT_DUCK_ENTRY_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    await waitForMilliseconds(VISION_EVENT_FIRST_LOOK_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    visionEventDuck.src = VISION_EVENT_SQUINT_ASSET.url;
    await waitForMilliseconds(VISION_EVENT_SECOND_LOOK_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    visionEventDuck.src = VISION_EVENT_GLASSES_ASSET.url;
    await waitForMilliseconds(VISION_EVENT_THIRD_LOOK_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    visionEventDuck.src = VISION_EVENT_BACK_ASSET.url;
    visionEvent.classList.remove("is-blurry");
    await waitForMilliseconds(VISION_EVENT_POST_CLEAR_LOOK_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    visionEventDuck.src = VISION_EVENT_GLASSES_ASSET.url;
    visionEventDuck.style.setProperty("--vision-duck-move-duration", `${VISION_EVENT_DUCK_EXIT_MS}ms`);
    setNumberedDuckRainMode(false);
    visionEvent.classList.add("is-duck-exiting");
    await waitForMilliseconds(VISION_EVENT_DUCK_EXIT_MS);

    if (runId !== visionEventRunId) {
      return false;
    }

    visionEvent.classList.remove("is-duck-visible", "is-duck-exiting");
    visionEvent.classList.remove("is-visible");
    await waitForMilliseconds(220);

    return true;
  } finally {
    if (runId === visionEventRunId) {
      setNumberedDuckRainMode(false);
      resetVisionEventScene();
      setVisionEventVisible(false);
      setSuperEventUiHidden(false);

      if (visionEventRestoreUi) {
        setUiHidden(false);
      }

      visionEventRestoreUi = false;
      visionEventActive = false;
      flushDeferredAttentionPopup();
    }
  }
}

async function triggerPaintingEvent() {
  if (paintingEventActive) {
    return false;
  }

  paintingEventActive = true;
  paintingEventRunId += 1;
  triggerSuperEventVibration();
  const runId = paintingEventRunId;
  let ducksPaused = false;
  const paintingEventAssets = [
    PAINTING_EVENT_ROLLER_ASSET,
    PAINTING_EVENT_WALL_ASSET,
    PAINTING_EVENT_ART_ASSET,
    PAINTING_EVENT_PULLOVER_BACK_ASSET,
    PAINTING_EVENT_TSHIRT_BACK_ASSET,
    PAINTING_EVENT_PULLOVER_FRONT_ASSET,
    PAINTING_EVENT_TSHIRT_FRONT_ASSET,
  ];

  try {
    await Promise.allSettled(paintingEventAssets.map(loadDuckAssetDimensions));

    if (runId !== paintingEventRunId) {
      return false;
    }

    if (activeDuckDrag) {
      discardActiveDuckDrag();
    }

    paintingEventRestoreUi = !root.classList.contains("ui-hidden");
    setSuperEventUiHidden(true);
    setUiHidden(true);
    setInfoPopupOpen(false);
    setAttentionPopupOpen(false);
    resetPaintingEventScene();
    setPaintingRollerVisible(false);
    setPaintingEventVisible(true);

    await waitForMilliseconds(20);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEvent.classList.add("is-visible", "is-painting");
    await waitForMilliseconds(40);

    const { paintWidth, contactOffset } = getPaintingRollerMetrics();

    const strokeCount = Math.max(
      PAINTING_EVENT_MIN_STROKES,
      Math.ceil(window.innerWidth / paintWidth)
    );

    for (let index = 0; index < strokeCount; index += 1) {
      const left = index * paintWidth;
      const width = Math.min(paintWidth, window.innerWidth - left);

      if (width <= 0) {
        break;
      }

      const rollerX = left + width / 2;
      setPaintingRollerVisible(false);
      setPaintingRollerPosition(rollerX, -contactOffset);

      await waitForMilliseconds(index === 0 ? 40 : PAINTING_EVENT_SHIFT_MS);

      if (runId !== paintingEventRunId) {
        return false;
      }

      const stroke = createPaintingWallStroke(left, width);
      paintingEventWall.appendChild(stroke);
      setPaintingRollerVisible(true);
      await waitForMilliseconds(420);

      if (runId !== paintingEventRunId) {
        return false;
      }

      const finishedStroke = await animatePaintingStroke(
        stroke,
        rollerX,
        contactOffset,
        runId
      );

      if (!finishedStroke || runId !== paintingEventRunId) {
        return false;
      }
    }

    paintingEvent.classList.remove("is-painting");
    setPaintingRollerVisible(false);
    pauseDuckAnimationClocks();
    setSuperEventDucksPaused(true);
    ducksPaused = true;
    paintingEvent.classList.add("is-ducks-visible");
    await waitForMilliseconds(PAINTING_EVENT_DUCK_ENTRY_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEvent.classList.add("is-art-visible");
    await waitForMilliseconds(PAINTING_EVENT_ART_FADE_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    await waitForMilliseconds(PAINTING_EVENT_LOOK_HOLD_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEventPulloverDuck.src = PAINTING_EVENT_PULLOVER_FRONT_ASSET.url;
    paintingEventTshirtDuck.src = PAINTING_EVENT_TSHIRT_FRONT_ASSET.url;
    await waitForMilliseconds(PAINTING_EVENT_TURN_HOLD_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEvent.classList.add("is-blackout-visible");
    await waitForMilliseconds(PAINTING_EVENT_BLACK_FADE_MS + PAINTING_EVENT_BLACK_HOLD_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEvent.classList.remove("is-painting", "is-art-visible", "is-ducks-visible");
    paintingEventWall.replaceChildren();
    setPaintingRollerVisible(false);
    setPaintingEventContentVisible(false);
    setSuperEventDucksPaused(false);
    resumeDuckAnimationClocks();
    ducksPaused = false;
    paintingEvent.classList.remove("is-blackout-visible");
    await waitForMilliseconds(PAINTING_EVENT_BLACK_FADE_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEvent.classList.remove("is-visible");
    await waitForMilliseconds(220);

    return true;
  } finally {
    if (runId === paintingEventRunId) {
      if (ducksPaused) {
        setSuperEventDucksPaused(false);
        resumeDuckAnimationClocks();
      }

      resetPaintingEventScene();
      setPaintingEventVisible(false);
      setSuperEventUiHidden(false);

      if (paintingEventRestoreUi) {
        setUiHidden(false);
      }

      paintingEventRestoreUi = false;
      paintingEventActive = false;
      flushDeferredAttentionPopup();
    }
  }
}

function maybeTriggerVisionEvent() {
  if (hasActiveSuperEvent() || isAttentionPopupBlockingSuperEvents() || Math.random() >= VISION_EVENT_CHANCE) {
    return false;
  }

  void triggerVisionEvent();
  return true;
}

function maybeTriggerGuardianEvent() {
  if (hasActiveSuperEvent() || isAttentionPopupBlockingSuperEvents() || Math.random() >= GUARDIAN_EVENT_CHANCE) {
    return false;
  }

  void triggerGuardianEvent();
  return true;
}

function maybeTriggerPaintingEvent() {
  if (hasActiveSuperEvent() || isAttentionPopupBlockingSuperEvents() || Math.random() >= PAINTING_EVENT_CHANCE) {
    return false;
  }

  void triggerPaintingEvent();
  return true;
}

function maybeTriggerFullscreenSuperEvent() {
  if (hasActiveSuperEvent() || isAttentionPopupBlockingSuperEvents()) {
    return false;
  }

  if (maybeTriggerVisionEvent()) {
    return true;
  }

  if (maybeTriggerPaintingEvent()) {
    return true;
  }

  return maybeTriggerGuardianEvent();
}

function clearUiRevealTimers() {
  if (uiRevealFrameId) {
    window.cancelAnimationFrame(uiRevealFrameId);
    uiRevealFrameId = 0;
  }

  if (uiRevealTimeoutId) {
    window.clearTimeout(uiRevealTimeoutId);
    uiRevealTimeoutId = 0;
  }
}

function resetAttentionTimerState() {
  attentionElapsedMs = 0;
  attentionActiveStartedAt = 0;
  attentionInactiveStartedAt = 0;
  attentionPopupTriggered = false;
  attentionPopupPending = false;
  clearAttentionTimeout();
  setAttentionPopupOpen(false);
}

function clearAttentionTimeout() {
  if (!attentionTimeoutId) {
    return;
  }

  window.clearTimeout(attentionTimeoutId);
  attentionTimeoutId = 0;
}

function isAttentionTimerEligible() {
  return document.visibilityState === "visible" && document.hasFocus();
}

function pauseAttentionTimer() {
  if (attentionActiveStartedAt) {
    attentionElapsedMs += performance.now() - attentionActiveStartedAt;
    attentionActiveStartedAt = 0;
  }

  if (!attentionInactiveStartedAt) {
    attentionInactiveStartedAt = Date.now();
  }

  clearAttentionTimeout();
}

function showAttentionPopup() {
  if (attentionPopupTriggered || attentionPopupPending) {
    return false;
  }

  attentionElapsedMs = ATTENTION_POPUP_DELAY_MS;
  attentionActiveStartedAt = 0;
  clearAttentionTimeout();

  if (hasActiveSuperEvent()) {
    attentionPopupPending = true;
    return false;
  }

  attentionPopupTriggered = true;
  setAttentionPopupOpen(true);
  return true;
}

function flushDeferredAttentionPopup() {
  if (!attentionPopupPending || hasActiveSuperEvent() || !isAttentionTimerEligible()) {
    return false;
  }

  attentionPopupPending = false;
  attentionPopupTriggered = true;
  attentionElapsedMs = ATTENTION_POPUP_DELAY_MS;
  attentionActiveStartedAt = 0;
  clearAttentionTimeout();
  setAttentionPopupOpen(true);
  return true;
}

function pauseDuckAnimationClocks() {
  const pausedAt = performance.now().toFixed(3);

  duckPool.forEach((duck) => {
    if (duck.classList.contains("is-dragged")) {
      return;
    }

    duck.dataset.animationPausedAt = pausedAt;
  });
}

function resumeDuckAnimationClocks() {
  const resumedAt = performance.now();

  duckPool.forEach((duck) => {
    const pausedAt = Number(duck.dataset.animationPausedAt || 0);

    if (!pausedAt) {
      return;
    }

    const startedAt = Number(duck.dataset.animationStartedAt || 0);

    if (startedAt > 0) {
      duck.dataset.animationStartedAt = (startedAt + resumedAt - pausedAt).toFixed(3);
    }

    duck.dataset.animationPausedAt = "";
  });
}

function syncAttentionTimer() {
  if (flushDeferredAttentionPopup()) {
    return;
  }

  if (!isAttentionTimerEligible()) {
    pauseAttentionTimer();
    return;
  }

  if (
    attentionInactiveStartedAt &&
    Date.now() - attentionInactiveStartedAt >= ATTENTION_RESET_INACTIVE_MS
  ) {
    resetAttentionTimerState();
  } else {
    attentionInactiveStartedAt = 0;
  }

  if (attentionPopupTriggered) {
    return;
  }

  if (attentionActiveStartedAt) {
    return;
  }

  const remainingMs = ATTENTION_POPUP_DELAY_MS - attentionElapsedMs;

  if (remainingMs <= 0) {
    showAttentionPopup();
    return;
  }

  attentionActiveStartedAt = performance.now();
  clearAttentionTimeout();
  attentionTimeoutId = window.setTimeout(() => {
    attentionTimeoutId = 0;

    if (!isAttentionTimerEligible()) {
      pauseAttentionTimer();
      return;
    }

    showAttentionPopup();
  }, remainingMs);
}

function setUiHidden(isHidden) {
  if (
    !isHidden &&
    !root.classList.contains("ui-hidden") &&
    !root.classList.contains("ui-revealing")
  ) {
    uiVisibilityToggle.setAttribute("aria-pressed", "false");
    uiVisibilityToggle.setAttribute("aria-label", "Bedienelemente ausblenden");
    return;
  }

  clearUiRevealTimers();
  uiVisibilityToggle.setAttribute("aria-pressed", String(isHidden));
  uiVisibilityToggle.setAttribute(
    "aria-label",
    isHidden ? "Bedienelemente einblenden" : "Bedienelemente ausblenden"
  );

  if (isHidden) {
    root.classList.remove("ui-revealing");
    root.classList.add("ui-hidden");
    setInfoPopupOpen(false);
    return;
  }

  root.classList.remove("ui-hidden");
  root.classList.add("ui-revealing");
  uiRevealFrameId = window.requestAnimationFrame(() => {
    uiRevealFrameId = window.requestAnimationFrame(() => {
      uiRevealFrameId = 0;
      uiRevealTimeoutId = window.setTimeout(() => {
        uiRevealTimeoutId = 0;
        root.classList.remove("ui-revealing");
      }, UI_REVEAL_PREWARM_MS);
    });
  });
}

function setNightMode(isEnabled) {
  root.classList.toggle("night-mode", isEnabled);
  nightModeToggle.checked = isEnabled;
  themeSwitchLabel.textContent = isEnabled ? "Nachtmodus" : "Tagmodus";
  syncGlowLevelForMode(getModeKey(isEnabled));
}

function requestRender() {
  if (renderFrame) {
    return;
  }

  renderFrame = window.requestAnimationFrame(() => {
    renderFrame = 0;
    renderDucks();
  });
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
  duck.dataset.delay = delay.toFixed(2);
}

function restartDuckAnimation(duck) {
  const nextAnimationName =
    duck.dataset.animationName === "duck-fall-a" ? "duck-fall-b" : "duck-fall-a";

  duck.dataset.animationName = nextAnimationName;
  duck.dataset.animationStartedAt = performance.now().toFixed(3);
  duck.dataset.animationPausedAt = "";
  duck.style.animationName = nextAnimationName;
}

function applyDuckMotionProfile(duck, profile) {
  const {
    asset,
    familyKey,
    normalFamilyKey = familyKey,
    logicalSize,
    size,
    duration,
    driftBase,
    mode = "normal",
  } = profile;

  if (duck.dataset.assetUrl !== asset.url) {
    duck.src = asset.url;
    duck.dataset.assetUrl = asset.url;
  }

  duck.dataset.familyKey = familyKey;
  duck.dataset.normalFamilyKey = normalFamilyKey;
  duck.dataset.logicalSize = logicalSize.toFixed(2);
  duck.dataset.spawnMode = mode;
  duck.dataset.assetWidth = String(asset.sourceWidth || FALLBACK_ASSET_SIZE);
  duck.dataset.assetHeight = String(asset.sourceHeight || FALLBACK_ASSET_SIZE);
  duck.style.setProperty("--size", size.toFixed(2));
  duck.style.setProperty("--scale-start", "1");
  duck.style.setProperty("--scale-mid", "1");
  duck.style.setProperty("--scale-end", "1");

  if (mode === "super-sign") {
    duck.style.setProperty("--drift-start", "0px");
    duck.style.setProperty("--drift-mid", "0px");
    duck.style.setProperty("--drift-end", "0px");
    duck.style.setProperty("--rotate-start", "0deg");
    duck.style.setProperty("--rotate-mid", "0deg");
    duck.style.setProperty("--rotate-end", "0deg");
    duck.dataset.rotationDirection = "1";
    return { size, duration };
  }

  const rotationProfile = createRotationProfile();

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
  duck.style.setProperty("--rotate-start", rotationProfile.start);
  duck.style.setProperty("--rotate-mid", rotationProfile.mid);
  duck.style.setProperty("--rotate-end", rotationProfile.end);
  duck.dataset.rotationDirection = rotationProfile.direction;

  return { size, duration };
}

function getStoredDuckFamilyKey(duck) {
  return duck.dataset.familyKey || "duck";
}

function getStoredDuckNormalFamilyKey(duck) {
  return duck.dataset.normalFamilyKey || getStoredDuckFamilyKey(duck);
}

function getStoredDuckSpawnMode(duck) {
  return duck.dataset.spawnMode || "normal";
}

function getStoredDuckLogicalSize(duck) {
  const logicalSize = Number(duck.dataset.logicalSize);
  return Number.isFinite(logicalSize) ? logicalSize : state.size;
}

function getStoredDuckAsset(duck) {
  const sourceWidth = Number(duck.dataset.assetWidth);
  const sourceHeight = Number(duck.dataset.assetHeight);

  return {
    sourceWidth: Number.isFinite(sourceWidth) && sourceWidth > 0 ? sourceWidth : FALLBACK_ASSET_SIZE,
    sourceHeight:
      Number.isFinite(sourceHeight) && sourceHeight > 0 ? sourceHeight : FALLBACK_ASSET_SIZE,
  };
}

function getCurrentDuckSize(duck) {
  const size = Number.parseFloat(duck.style.getPropertyValue("--size"));
  return Number.isFinite(size) && size > 0 ? size : getStoredDuckLogicalSize(duck);
}

function getDuckDisplayHeight(size, asset) {
  const safeWidth = Math.max(asset.sourceWidth || 1, 1);
  return size * ((asset.sourceHeight || safeWidth) / safeWidth);
}

function getDuckPositionFromCenter(center, size, asset, offsetX = 0, offsetY = 0) {
  const height = getDuckDisplayHeight(size, asset);

  return {
    left: center.x - size / 2 - offsetX,
    top: center.y - height / 2 - offsetY,
  };
}

function getRemainingDistance(top, size, asset) {
  const visibleDimension = Math.max(size, getDuckDisplayHeight(size, asset));
  return Math.max(40, window.innerHeight + visibleDimension * 1.35 - top);
}

function getDurationFromRemainingDistance(duck, remainingDistance) {
  const currentDuration = Number(duck.dataset.duration || 1);
  const currentFallDistance = Number(duck.dataset.fallDistance || 1);

  return Math.max(
    0.6,
    currentDuration * (remainingDistance / Math.max(currentFallDistance, 1))
  );
}

function getMotionDurationFromRemainingDistance(duration, remainingDistance, size, asset) {
  const fullFallDistance =
    window.innerHeight + Math.max(size, getDuckDisplayHeight(size, asset)) * 2.8;

  return Math.max(0.6, duration * (remainingDistance / Math.max(fullFallDistance, 1)));
}

function getDuckDriftStartOffset(duck) {
  return Number.parseFloat(duck.style.getPropertyValue("--drift-start")) || 0;
}

function getDuckRotationDirection(duck) {
  return duck.dataset.rotationDirection === "-1" ? -1 : 1;
}

function getDuckStartCoordinate(duck, variableName) {
  return Number.parseFloat(duck.style.getPropertyValue(variableName)) || 0;
}

function getDuckAnimationProgress(duck) {
  const duration = Number(duck.dataset.duration || 0);
  const delay = Number(duck.dataset.delay || duck.style.getPropertyValue("--delay") || 0);
  const startedAt = Number(duck.dataset.animationStartedAt || 0);

  if (duration > 0 && startedAt > 0) {
    return clamp((performance.now() - startedAt - delay * 1000) / (duration * 1000), 0, 0.999);
  }

  if (duration > 0 && delay < 0) {
    return clamp((-delay) / duration, 0, 0.999);
  }

  return 0;
}

function createDurationProfile() {
  const effectiveSpeed = randomAround(state.speed, state.speedVariance, MIN_SPEED, MAX_SPEED);
  return speedValueToDuration(effectiveSpeed);
}

function applyDuckAssetVariant(
  duck,
  familyKey,
  logicalSize,
  mode = "normal",
  assetSet = getActiveDuckAssetSet(),
  normalFamilyKey = familyKey
) {
  const referenceFamilyKey =
    normalFamilyKey || (isVisionNumberDuckFamilyKey(familyKey) ? "duck" : familyKey);
  const resolvedVariant =
    numberedDuckRainMode && mode === "normal"
      ? pickVisionNumberDuckVariant()
      : {
          familyKey: isVisionNumberDuckFamilyKey(familyKey) ? referenceFamilyKey : familyKey,
          asset: getDuckAssetForFamily(
            assetSet,
            isVisionNumberDuckFamilyKey(familyKey) ? referenceFamilyKey : familyKey
          ),
        };
  const asset = resolvedVariant.asset;
  const size = getDuckSizeForMode(logicalSize, asset, referenceFamilyKey, mode);

  if (duck.dataset.assetUrl !== asset.url) {
    duck.src = asset.url;
    duck.dataset.assetUrl = asset.url;
  }

  duck.dataset.familyKey = resolvedVariant.familyKey;
  duck.dataset.normalFamilyKey = referenceFamilyKey;
  duck.dataset.logicalSize = logicalSize.toFixed(2);
  duck.dataset.assetWidth = String(asset.sourceWidth || FALLBACK_ASSET_SIZE);
  duck.dataset.assetHeight = String(asset.sourceHeight || FALLBACK_ASSET_SIZE);
  duck.style.setProperty("--size", size.toFixed(2));

  return { asset, size };
}

function interpolateValue(from, to, progress) {
  return from + (to - from) * progress;
}

function getDuckCurrentTranslation(duck, progress = getDuckAnimationProgress(duck)) {
  const driftStart = Number.parseFloat(duck.style.getPropertyValue("--drift-start")) || 0;
  const driftMid = Number.parseFloat(duck.style.getPropertyValue("--drift-mid")) || 0;
  const driftEnd = Number.parseFloat(duck.style.getPropertyValue("--drift-end")) || 0;
  const fallMid = Number.parseFloat(duck.style.getPropertyValue("--fall-mid")) || 0;
  const fallEnd = Number.parseFloat(duck.style.getPropertyValue("--fall-end")) || 0;

  if (progress <= 0.5) {
    const localProgress = progress / 0.5;

    return {
      x: interpolateValue(driftStart, driftMid, localProgress),
      y: interpolateValue(0, fallMid, localProgress),
    };
  }

  const localProgress = (progress - 0.5) / 0.5;

  return {
    x: interpolateValue(driftMid, driftEnd, localProgress),
    y: interpolateValue(fallMid, fallEnd, localProgress),
  };
}

function getDuckCurrentGeometry(duck) {
  const progress = getDuckAnimationProgress(duck);
  const startLeft = getDuckStartCoordinate(duck, "--start-left");
  const startTop = getDuckStartCoordinate(duck, "--start-top");
  const translation = getDuckCurrentTranslation(duck, progress);
  const size = getCurrentDuckSize(duck);
  const asset = getStoredDuckAsset(duck);
  const left = startLeft + translation.x;
  const top = startTop + translation.y;
  const height = getDuckDisplayHeight(size, asset);

  return {
    progress,
    size,
    asset,
    translation,
    position: { left, top },
    center: {
      x: left + size / 2,
      y: top + height / 2,
    },
  };
}

function refreshDuckAssetVariant(duck, assetSet = getActiveDuckAssetSet()) {
  if (duck.classList.contains("is-dragged")) {
    return;
  }

  const currentGeometry = getDuckCurrentGeometry(duck);
  const familyKey = getStoredDuckFamilyKey(duck);
  const normalFamilyKey = getStoredDuckNormalFamilyKey(duck);
  const logicalSize = getStoredDuckLogicalSize(duck);
  const spawnMode = getStoredDuckSpawnMode(duck);
  const { asset, size } = applyDuckAssetVariant(
    duck,
    familyKey,
    logicalSize,
    spawnMode,
    assetSet,
    normalFamilyKey
  );
  const nextPosition = getDuckPositionFromCenter(
    currentGeometry.center,
    size,
    asset,
    currentGeometry.translation.x,
    currentGeometry.translation.y
  );

  duck.style.setProperty("--start-left", `${nextPosition.left.toFixed(2)}px`);
  duck.style.setProperty("--start-top", `${nextPosition.top.toFixed(2)}px`);
}

function refreshDuckMotion(duck) {
  if (duck.classList.contains("is-dragged")) {
    return;
  }

  const currentGeometry = getDuckCurrentGeometry(duck);
  const profile = createDuckMotionProfile({
    mode: getStoredDuckSpawnMode(duck),
    familyKey: getStoredDuckFamilyKey(duck),
    normalFamilyKey: getStoredDuckNormalFamilyKey(duck),
    logicalSize: getStoredDuckLogicalSize(duck),
  });
  const { asset, size, duration } = profile;

  applyDuckMotionProfile(duck, profile);

  const nextPosition = getDuckPositionFromCenter(
    currentGeometry.center,
    size,
    asset,
    getDuckDriftStartOffset(duck),
    0
  );
  const remainingDistance = getRemainingDistance(nextPosition.top, size, asset);
  const nextDuration = getMotionDurationFromRemainingDistance(
    duration,
    remainingDistance,
    size,
    asset
  );

  setDuckPath(duck, nextPosition.left, nextPosition.top, remainingDistance, nextDuration);
  restartDuckAnimation(duck);
}

function refreshDuckSpeed(duck) {
  if (duck.classList.contains("is-dragged")) {
    return;
  }

  const nextDuration =
    getStoredDuckSpawnMode(duck) === "super-sign"
      ? speedValueToDuration(SUPER_SIGN_DUCK_SPEED)
      : createDurationProfile();
  const progress = getDuckAnimationProgress(duck);
  const startLeft = getDuckStartCoordinate(duck, "--start-left");
  const startTop = getDuckStartCoordinate(duck, "--start-top");
  const fallDistance = Number(duck.dataset.fallDistance || 0);

  setDuckPath(duck, startLeft, startTop, fallDistance, nextDuration, -progress * nextDuration);
  restartDuckAnimation(duck);
}

function refreshExistingDucks(updateType) {
  const activeAssetSet = updateType === "asset" ? getActiveDuckAssetSet() : null;

  duckPool.forEach((duck) => {
    if (updateType === "asset") {
      refreshDuckAssetVariant(duck, activeAssetSet);
      return;
    }

    if (updateType === "speed") {
      refreshDuckSpeed(duck);
      return;
    }

    refreshDuckMotion(duck);
  });
}

function configureFreshDuckSpawn(duck, useEntryDelay = false) {
  const profile = createDuckMotionProfile();
  const { size, duration } = applyDuckMotionProfile(duck, profile);
  const fallDistance = window.innerHeight + size * 2.8;
  const minVisiblePart = size * 0.28;
  const startLeft =
    profile.mode === "super-sign"
      ? 0
      : randomBetween(-size + minVisiblePart, window.innerWidth - minVisiblePart);
  const startTop = size * -1.45;
  const entryDelay = useEntryDelay ? randomBetween(-duration, 0) : 0;

  setDuckPath(duck, startLeft, startTop, fallDistance, duration, entryDelay);
}

function getFrozenDuckTransform(duck) {
  const matrix = getTransformMatrix(duck);

  if (!matrix) {
    return "none";
  }

  if ("is2D" in matrix && matrix.is2D) {
    return `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, 0, 0)`;
  }

  matrix.m41 = 0;
  matrix.m42 = 0;
  matrix.m43 = 0;
  return matrix.toString();
}

function getDraggedDuckTransform(frozenTransform) {
  if (!frozenTransform || frozenTransform === "none") {
    return `scale(${DRAG_SCALE})`;
  }

  return `${frozenTransform} scale(${DRAG_SCALE})`;
}

function returnDuckToRain(duck) {
  if (duck.parentNode !== duckRain) {
    duckRain.appendChild(duck);
  }
}

function discardActiveDuckDrag() {
  if (!activeDuckDrag) {
    return;
  }

  const { duck, pointerId } = activeDuckDrag;

  activeDuckDrag = null;
  duck.classList.remove("is-dragged");
  duck.style.zIndex = "";
  duck.style.left = "";
  duck.style.top = "";
  duck.style.transform = "";
  returnDuckToRain(duck);

  if (typeof duck.hasPointerCapture === "function" && duck.hasPointerCapture(pointerId)) {
    duck.releasePointerCapture(pointerId);
  }
}

function releaseDuck(pointerId) {
  if (!activeDuckDrag || activeDuckDrag.pointerId !== pointerId) {
    return;
  }

  const { duck, lastX, lastY, size, currentRotation } = activeDuckDrag;
  const spawnMode = getStoredDuckSpawnMode(duck);
  const driftStart = spawnMode === "super-sign" ? 0 : getDuckDriftStartOffset(duck);
  const remainingDistance = Math.max(40, window.innerHeight + size * 1.35 - lastY);
  const currentDuration = Number(duck.dataset.duration || 1);
  const currentFallDistance = Number(duck.dataset.fallDistance || 1);
  const nextDuration = Math.max(
    0.6,
    currentDuration * (remainingDistance / Math.max(currentFallDistance, 1))
  );

  if (spawnMode === "super-sign") {
    duck.style.setProperty("--drift-start", "0px");
    duck.style.setProperty("--drift-mid", "0px");
    duck.style.setProperty("--drift-end", "0px");
    duck.style.setProperty("--rotate-start", "0deg");
    duck.style.setProperty("--rotate-mid", "0deg");
    duck.style.setProperty("--rotate-end", "0deg");
    duck.dataset.rotationDirection = "1";
  } else {
    const rotationProfile = createRotationProfileFromAngle(
      currentRotation,
      getDuckRotationDirection(duck)
    );

    duck.style.setProperty("--rotate-start", rotationProfile.start);
    duck.style.setProperty("--rotate-mid", rotationProfile.mid);
    duck.style.setProperty("--rotate-end", rotationProfile.end);
    duck.dataset.rotationDirection = rotationProfile.direction;
  }

  setDuckPath(duck, lastX - driftStart, lastY, remainingDistance, nextDuration);
  duck.classList.remove("is-dragged");
  returnDuckToRain(duck);
  duck.style.zIndex = "";
  duck.style.left = "";
  duck.style.top = "";
  duck.style.transform = "";
  restartDuckAnimation(duck);

  if (typeof duck.hasPointerCapture === "function" && duck.hasPointerCapture(pointerId)) {
    duck.releasePointerCapture(pointerId);
  }

  activeDuckDrag = null;
}

function shouldHandleCardTouchScroll(target) {
  return !target.closest("input, button");
}

function clearCardTouchScroll() {
  activeCardTouchScroll = null;
}

function handleCardTouchStart(event) {
  if (event.touches.length !== 1 || !shouldHandleCardTouchScroll(event.target)) {
    clearCardTouchScroll();
    return;
  }

  const touch = event.touches[0];

  activeCardTouchScroll = {
    startX: touch.clientX,
    startY: touch.clientY,
    startScrollTop: pageShell.scrollTop,
    isScrolling: false,
  };
}

function handleCardTouchMove(event) {
  if (!activeCardTouchScroll || event.touches.length !== 1) {
    return;
  }

  const touch = event.touches[0];
  const deltaX = touch.clientX - activeCardTouchScroll.startX;
  const deltaY = touch.clientY - activeCardTouchScroll.startY;

  if (!activeCardTouchScroll.isScrolling) {
    if (Math.abs(deltaY) < 8) {
      return;
    }

    if (Math.abs(deltaY) <= Math.abs(deltaX)) {
      clearCardTouchScroll();
      return;
    }

    activeCardTouchScroll.isScrolling = true;
  }

  pageShell.scrollTop = activeCardTouchScroll.startScrollTop - deltaY;

  if (event.cancelable) {
    event.preventDefault();
  }
}

function attachDuckDragging(duck) {
  duck.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  duck.addEventListener("animationend", () => {
    if (duck.classList.contains("is-dragged")) {
      return;
    }

    releaseSuperEventLockForDuck(duck);
    configureFreshDuckSpawn(duck);
    restartDuckAnimation(duck);
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
      lastX: rect.left,
      lastY: rect.top,
      size: rect.width,
      frozenTransform: getFrozenDuckTransform(duck),
      currentRotation: getMatrixRotationDegrees(getTransformMatrix(duck)),
    };

    duckDragLayer.appendChild(duck);
    duck.style.left = `${rect.left.toFixed(2)}px`;
    duck.style.top = `${rect.top.toFixed(2)}px`;
    duck.style.zIndex = "1";
    duck.style.transform = getDraggedDuckTransform(activeDuckDrag.frozenTransform);
    duck.classList.add("is-dragged");

    if (typeof duck.setPointerCapture === "function") {
      duck.setPointerCapture(event.pointerId);
    }
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

function createDuck() {
  const duck = document.createElement("img");

  duck.className = "duck";
  duck.src = getActiveDuckAssetSet().base.url;
  duck.alt = "";
  duck.decoding = "async";
  duck.draggable = false;

  attachDuckDragging(duck);

  return duck;
}

function syncDuckPool(activeCount) {
  while (duckPool.length < activeCount) {
    duckPool.push(createDuck());
  }

  while (duckPool.length > activeCount) {
    const duck = duckPool.pop();

    if (duck) {
      releaseSuperEventLockForDuck(duck);
      duck.remove();
    }
  }

  const fragment = document.createDocumentFragment();

  duckPool.forEach((duck) => {
    if (duck.parentNode !== duckRain) {
      fragment.appendChild(duck);
    }
  });

  if (fragment.childNodes.length) {
    duckRain.appendChild(fragment);
  }
}

function renderDucks() {
  discardActiveDuckDrag();
  superSignDuckActive = false;

  if (duckDragLayer.firstChild) {
    duckDragLayer.replaceChildren();
  }

  const activeCount = clamp(Math.round(state.count), 1, 400);

  syncDuckPool(activeCount);

  duckPool.forEach((duck) => {
    configureFreshDuckSpawn(duck, true);
    restartDuckAnimation(duck);
  });
}

function isSpeedKey(key) {
  return key === "speed" || key === "speedVariance";
}

function applyValue(key, rawValue, sourceElement = controls[key].range) {
  const nextValue = normalizeValue(key, rawValue, sourceElement);

  if (state[key] === nextValue) {
    syncControl(key);
    return false;
  }

  state[key] = nextValue;
  syncControl(key);
  return true;
}

function resetToDefaults() {
  Object.keys(defaults).forEach((key) => {
    state[key] = defaults[key];
  });

  syncAllControls();
  syncGlowLevelForMode(getModeKey());
  requestRender();
}

Object.entries(controls).forEach(([key, control]) => {
  control.range.addEventListener("input", () => {
    const changed = applyValue(key, control.range.value, control.range);

    if (!changed || MOTION_UPDATE_KEYS.has(key)) {
      return;
    }

    requestRender();
  });

  control.range.addEventListener("change", () => {
    applyValue(key, control.range.value, control.range);

    if (MOTION_UPDATE_KEYS.has(key)) {
      refreshExistingDucks(isSpeedKey(key) ? "speed" : "motion");
    }
  });

  control.number.addEventListener("input", () => {
    if (control.number.value === "" || control.number.validity.badInput) {
      return;
    }

    if (!MOTION_UPDATE_KEYS.has(key)) {
      const changed = applyValue(key, control.number.value, control.number);

      if (changed) {
        requestRender();
      }

      return;
    }

    applyValue(key, control.number.value, control.number);
  });

  control.number.addEventListener("change", () => {
    const changed = applyValue(key, control.number.value, control.number);

    if (MOTION_UPDATE_KEYS.has(key)) {
      if (changed) {
        refreshExistingDucks(isSpeedKey(key) ? "speed" : "motion");
      }

      return;
    }

    if (changed) {
      requestRender();
    }
  });

  control.number.addEventListener("blur", () => {
    control.number.value = String(state[key]);
  });
});

glassCard.addEventListener("touchstart", handleCardTouchStart, { passive: true });
glassCard.addEventListener("touchmove", handleCardTouchMove, { passive: false });
glassCard.addEventListener("touchend", clearCardTouchScroll, { passive: true });
glassCard.addEventListener("touchcancel", clearCardTouchScroll, { passive: true });

window.addEventListener("resize", requestRender, { passive: true });
window.addEventListener("resize", requestPanelHeightSync, { passive: true });
window.addEventListener("focus", syncAttentionTimer);
window.addEventListener("blur", syncAttentionTimer);
window.addEventListener("pageshow", () => {
  setPanelExpanded(true);
  resetToDefaults();
  resumeDuckAnimationClocks();
  syncAttentionTimer();
});
window.addEventListener("pagehide", () => {
  pauseDuckAnimationClocks();
  pauseAttentionTimer();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    pauseDuckAnimationClocks();
  } else {
    resumeDuckAnimationClocks();
  }

  syncAttentionTimer();
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

attentionPopupClose.addEventListener("click", () => {
  setAttentionPopupOpen(false);
  syncAttentionTimer();
});

uiVisibilityToggle.addEventListener("click", () => {
  setUiHidden(!root.classList.contains("ui-hidden"));
});

nightModeToggle.addEventListener("change", () => {
  setNightMode(nightModeToggle.checked);
  refreshExistingDucks("asset");
});

glowLevelInput.addEventListener("input", () => {
  refreshExistingDucks("asset");
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
  requestPanelHeightSync();
});

setInfoPopupOpen(false);
setAttentionPopupOpen(false);
syncSpecialEventAssets();
resetVisionEventScene();
setVisionEventVisible(false);
resetPaintingEventScene();
setPaintingEventVisible(false);
setGuardianEventVisible(false);
setUiHidden(false);
setNightMode(false);
setPanelExpanded(true);
resetToDefaults();
warmDuckAssets();
requestPanelHeightSync();
syncAttentionTimer();
