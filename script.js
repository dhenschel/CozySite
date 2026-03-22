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
const SUPER_EVENTS_HOLD_TRIGGER_MS = 10 * 1000;
const ATTENTION_POPUP_DELAY_MS = 10 * 60 * 1000;
const ATTENTION_RESET_INACTIVE_MS = 60 * 60 * 1000;
const DEFAULT_SPECIAL_DUCKS_ENABLED = true;
const DEFAULT_SUPER_EVENTS_ENABLED = true;
const SUPER_EVENT_VIBRATION_PATTERN = [140, 70, 190, 90, 260];
const SECRET_SPECIAL_DUCKS_VIBRATION_PATTERN = [90, 50, 90];
const MOBILE_MANUAL_COUNT_MAX = 400;
const DESKTOP_MANUAL_COUNT_MAX = 1000;
const DESKTOP_LAYOUT_BREAKPOINT = 921;
const MIN_SPEED = 1;
const MAX_SPEED = 200;
const DRAG_SCALE = 2;
const SUPER_EVENT_CHANCE = 1 / 5000;
const SUPER_EVENT_TYPES = ["vision", "painting", "guardian", "super-sign"];
const GUARDIAN_EVENT_FAMILY_KEY = "real_duck";
const GUARDIAN_EVENT_BLACK_FADE_MS = 4200;
const GUARDIAN_EVENT_DUCK_FADE_MS = 3200;
const GUARDIAN_EVENT_BUBBLE_FADE_MS = 1400;
const GUARDIAN_EVENT_HOLD_MS = 10000;
const VISION_EVENT_BLUR_FADE_MS = 4200;
const VISION_EVENT_DUCK_ENTRY_MS = 6200;
const VISION_EVENT_FIRST_LOOK_MS = 5000;
const VISION_EVENT_SECOND_LOOK_MS = 3000;
const VISION_EVENT_THIRD_LOOK_MS = 3000;
const VISION_EVENT_POST_CLEAR_LOOK_MS = 5000;
const VISION_EVENT_DUCK_EXIT_MS = 6200;
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
const SUPER_SIGN_DUCK_SPEED = 5;
const THEME_COLOR_DAY = "rgb(186, 233, 255)";
const THEME_COLOR_NIGHT = "rgb(9, 24, 56)";
const THEME_COLOR_PAINTING = "rgb(154, 32, 37)";
const THEME_COLOR_BLACKOUT = "#000000";
const PROTECTED_DUCK_IMAGE_SELECTOR =
  ".duck, .vision-event__duck, .painting-event__duck, .guardian-event__duck";
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
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const duckContext =
  duckRain instanceof HTMLCanvasElement
    ? duckRain.getContext("2d", { alpha: true })
    : null;
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
const specialDucksToggleRow = document.getElementById("specialDucksToggleRow");
const specialDucksToggle = document.getElementById("specialDucksToggle");
const superEventsToggle = document.getElementById("superEventsToggle");
const superEventsToggleRow = document.getElementById("superEventsToggleRow");
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
let activeRangeTouchScroll = null;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
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
let specialDucksOnlyMode = false;
let specialDucksHoldTimeoutId = 0;
let suppressSpecialDucksToggleClick = false;
let superEventsHoldTimeoutId = 0;
let suppressSuperEventsToggleClick = false;

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
const rangeInputs = Array.from(form.querySelectorAll('input[type="range"]'));
let duckRenderLoopFrame = 0;
let duckDevicePixelRatio = 1;
let duckCanvasWidth = 0;
let duckCanvasHeight = 0;
let duckIdCounter = 0;

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
    image: null,
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
      asset.image = probe;
      asset.sourceWidth = probe.naturalWidth || FALLBACK_ASSET_SIZE;
      asset.sourceHeight = probe.naturalHeight || FALLBACK_ASSET_SIZE;
      asset.dimensionsReady = true;
      resolve(asset);
    };
    probe.onerror = () => {
      asset.image = null;
      asset.dimensionsReady = true;
      resolve(asset);
    };
    probe.src = asset.url;
  });

  return asset.loadPromise;
}

function getDuckAssetSetAssets(assetSet) {
  return [assetSet.base, ...assetSet.specials.map((entry) => entry.asset)];
}

function dedupeDuckAssets(assets) {
  const seenUrls = new Set();

  return assets.filter((asset) => {
    if (!asset?.url || seenUrls.has(asset.url)) {
      return false;
    }

    seenUrls.add(asset.url);
    return true;
  });
}

function scheduleAssetWarmup(callback, timeout = 1500) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(callback, 120);
}

function warmDuckAssets() {
  const activeAssetSet = getActiveDuckAssetSet();
  const primaryAssets = dedupeDuckAssets(getDuckAssetSetAssets(activeAssetSet));
  const deferredAssets = dedupeDuckAssets([
    ...getDuckAssetSetAssets(GLOWING_ASSET_SET),
    ...getDuckAssetSetAssets(HALF_GLOWING_ASSET_SET),
    ...getDuckAssetSetAssets(NON_GLOWING_ASSET_SET),
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
  ]).filter((asset) => !primaryAssets.some((primaryAsset) => primaryAsset.url === asset.url));

  const warmDeferredAssetsInChunks = (remainingAssets) => {
    if (!remainingAssets.length) {
      return;
    }

    const nextChunk = remainingAssets.splice(0, 6);

    Promise.allSettled(nextChunk.map(loadDuckAssetDimensions)).finally(() => {
      if (!remainingAssets.length) {
        return;
      }

      scheduleAssetWarmup(() => {
        warmDeferredAssetsInChunks(remainingAssets);
      }, 2000);
    });
  };

  Promise.allSettled(primaryAssets.map(loadDuckAssetDimensions)).then(() => {
    requestRender();
  });

  scheduleAssetWarmup(() => {
    warmDeferredAssetsInChunks([...deferredAssets]);
  }, 2000);
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

function isDesktopLayout() {
  return viewportWidth >= DESKTOP_LAYOUT_BREAKPOINT;
}

function getManualCountMax() {
  return isDesktopLayout() ? DESKTOP_MANUAL_COUNT_MAX : MOBILE_MANUAL_COUNT_MAX;
}

function syncResponsiveControlLimits() {
  const countNumberInput = controls.count?.number;
  const nextManualCountMax = getManualCountMax();

  if (!(countNumberInput instanceof HTMLInputElement)) {
    return false;
  }

  countNumberInput.max = String(nextManualCountMax);

  if (state.count > nextManualCountMax) {
    state.count = nextManualCountMax;
    syncControl("count");
    return true;
  }

  syncControl("count");
  return false;
}

function normalizeValue(key, rawValue, sourceElement = controls[key].range) {
  const min = Number(sourceElement.min);
  const max =
    key === "count" &&
    sourceElement instanceof HTMLInputElement &&
    sourceElement.type === "number"
      ? getManualCountMax()
      : Number(sourceElement.max);
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
  updateRangeVisual(glowLevelInput);
}

function syncSpawnToggleDefaults() {
  specialDucksToggle.checked = DEFAULT_SPECIAL_DUCKS_ENABLED;
  superEventsToggle.checked = DEFAULT_SUPER_EVENTS_ENABLED;
  specialDucksOnlyMode = false;
}

function areSpecialDucksEnabled() {
  return specialDucksToggle.checked;
}

function areSuperEventsEnabled() {
  return superEventsToggle.checked;
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

function isProtectedDuckImageTarget(target) {
  return target instanceof Element && Boolean(target.closest(PROTECTED_DUCK_IMAGE_SELECTOR));
}

function protectDuckImage(image) {
  if (!(image instanceof HTMLImageElement)) {
    return;
  }

  image.draggable = false;
}

function pickDuckVariant(assetSet) {
  if (!assetSet.specials.length) {
    loadDuckAssetDimensions(assetSet.base);
    return {
      familyKey: assetSet.baseKey,
      asset: assetSet.base,
    };
  }

  if (!specialDucksOnlyMode && (!areSpecialDucksEnabled() || Math.random() >= SPECIAL_DUCK_CHANCE)) {
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
    navigator.vibrate(SUPER_EVENT_VIBRATION_PATTERN);
  } catch {
    // Ignore unsupported or blocked vibration calls.
  }
}

function triggerSecretSpecialDucksVibration() {
  if (!isMobileSuperEventVibrationEligible()) {
    return;
  }

  try {
    navigator.vibrate(SECRET_SPECIAL_DUCKS_VIBRATION_PATTERN);
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

function pickRandomSuperEventType() {
  return SUPER_EVENT_TYPES[Math.floor(Math.random() * SUPER_EVENT_TYPES.length)] || "";
}

function triggerSelectedFullscreenSuperEvent(superEventType) {
  if (superEventType === "vision") {
    void triggerVisionEvent();
    return true;
  }

  if (superEventType === "painting") {
    void triggerPaintingEvent();
    return true;
  }

  if (superEventType === "guardian") {
    void triggerGuardianEvent();
    return true;
  }

  return false;
}

function triggerForcedSuperSignEvent() {
  if (hasActiveSuperEvent() || isAttentionPopupBlockingSuperEvents()) {
    return false;
  }

  const targetDuck = duckPool.find((duck) => !duck.isDragged);

  if (!targetDuck) {
    return false;
  }

  superSignDuckActive = true;
  triggerSuperEventVibration();

  const profile = createDuckMotionProfile({
    mode: "super-sign",
    logicalSize: window.innerWidth,
  });
  const { size, duration } = applyDuckMotionProfile(targetDuck, profile);
  const fallDistance = window.innerHeight + size * 2.8;
  const startTop = size * -1.45;

  setDuckPath(targetDuck, 0, startTop, fallDistance, duration, 0);
  restartDuckAnimation(targetDuck);
  return true;
}

function triggerForcedRandomSuperEvent() {
  if (hasActiveSuperEvent() || isAttentionPopupBlockingSuperEvents()) {
    return false;
  }

  const eventTypes = [...SUPER_EVENT_TYPES];

  for (let index = eventTypes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentValue = eventTypes[index];

    eventTypes[index] = eventTypes[swapIndex];
    eventTypes[swapIndex] = currentValue;
  }

  for (const selectedSuperEventType of eventTypes) {
    if (selectedSuperEventType === "super-sign") {
      if (triggerForcedSuperSignEvent()) {
        return true;
      }

      continue;
    }

    if (triggerSelectedFullscreenSuperEvent(selectedSuperEventType)) {
      return true;
    }
  }

  return false;
}

function preloadActiveSpecialDuckAssets() {
  const activeAssetSet = getActiveDuckAssetSet();
  const specialAssets = activeAssetSet.specials.map((entry) => entry.asset);

  if (!specialAssets.length) {
    return Promise.resolve();
  }

  return Promise.allSettled(specialAssets.map(loadDuckAssetDimensions)).then(() => undefined);
}

function maybeTriggerRandomSuperEvent() {
  if (
    !areSuperEventsEnabled() ||
    hasActiveSuperEvent() ||
    isAttentionPopupBlockingSuperEvents() ||
    Math.random() >= SUPER_EVENT_CHANCE
  ) {
    return "";
  }

  const selectedSuperEventType = pickRandomSuperEventType();

  if (selectedSuperEventType === "super-sign") {
    return "super-sign";
  }

  if (triggerSelectedFullscreenSuperEvent(selectedSuperEventType)) {
    return selectedSuperEventType;
  }

  return "";
}

function createDuckMotionProfile(options = {}) {
  const assetSet = getActiveDuckAssetSet();
  const isFreshSpawn = !options.mode && !options.familyKey;
  const triggeredSuperEventType = isFreshSpawn ? maybeTriggerRandomSuperEvent() : "";
  const preservedFamilyKey =
    options.normalFamilyKey ||
    (options.familyKey && !isVisionNumberDuckFamilyKey(options.familyKey) ? options.familyKey : "");
  const spawnMode =
    options.mode ||
    (triggeredSuperEventType === "super-sign" ? "super-sign" : "normal");

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

function updateRangeVisual(rangeInput) {
  if (!(rangeInput instanceof HTMLInputElement) || rangeInput.type !== "range") {
    return;
  }

  const min = Number(rangeInput.min);
  const max = Number(rangeInput.max);
  const value = Number(rangeInput.value);
  const resolvedMin = Number.isFinite(min) ? min : 0;
  const resolvedMax = Number.isFinite(max) && max > resolvedMin ? max : resolvedMin + 1;
  const resolvedValue = clamp(
    Number.isFinite(value) ? value : resolvedMin,
    resolvedMin,
    resolvedMax
  );
  const progress = ((resolvedValue - resolvedMin) / (resolvedMax - resolvedMin)) * 100;

  rangeInput.style.setProperty("--range-progress", `${progress.toFixed(4)}%`);
}

function syncControl(key) {
  const value = state[key];
  const range = controls[key].range;
  const number = controls[key].number;
  const rangeMin = Number(range.min);
  const rangeMax = Number(range.max);

  range.value = String(clamp(value, rangeMin, rangeMax));
  number.value = String(value);
  updateRangeVisual(range);
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

function handleViewportResize() {
  const nextViewportWidth = window.innerWidth;
  const nextViewportHeight = window.innerHeight;
  const widthChanged = Math.abs(nextViewportWidth - viewportWidth) > 2;
  const heightChanged = Math.abs(nextViewportHeight - viewportHeight) > 2;

  if (!widthChanged && !heightChanged) {
    return;
  }

  viewportWidth = nextViewportWidth;
  viewportHeight = nextViewportHeight;
  const countLimitAdjusted = syncResponsiveControlLimits();
  resizeDuckCanvas();
  requestPanelHeightSync();

  // Mobile browsers frequently fire resize when their UI bars show or hide.
  // A full duck rerender there changes random sizes/positions even though the
  // user did not actually change the configuration.
  if (hasActiveSuperEvent() || !widthChanged) {
    if (countLimitAdjusted) {
      requestRender();
    }

    return;
  }

  requestRender();
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
    "is-bubbles-visible",
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

    paintingEvent.classList.add("is-bubbles-visible");
    await waitForMilliseconds(PAINTING_EVENT_LOOK_HOLD_MS);

    if (runId !== paintingEventRunId) {
      return false;
    }

    paintingEvent.classList.remove("is-bubbles-visible");
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

    paintingEvent.classList.remove(
      "is-painting",
      "is-art-visible",
      "is-ducks-visible",
      "is-bubbles-visible"
    );
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

function clearSpecialDucksHoldTrigger() {
  if (specialDucksHoldTimeoutId) {
    window.clearTimeout(specialDucksHoldTimeoutId);
    specialDucksHoldTimeoutId = 0;
  }
}

function clearSuperEventsHoldTrigger() {
  if (superEventsHoldTimeoutId) {
    window.clearTimeout(superEventsHoldTimeoutId);
    superEventsHoldTimeoutId = 0;
  }
}

function captureSecretTogglePointer(target, pointerId) {
  if (!(target instanceof Element) || typeof target.setPointerCapture !== "function") {
    return;
  }

  try {
    target.setPointerCapture(pointerId);
  } catch {
    // Ignore browsers that reject capture for this interaction.
  }
}

function releaseSecretTogglePointer(target, pointerId) {
  if (
    !(target instanceof Element) ||
    typeof target.releasePointerCapture !== "function" ||
    typeof target.hasPointerCapture !== "function" ||
    !target.hasPointerCapture(pointerId)
  ) {
    return;
  }

  try {
    target.releasePointerCapture(pointerId);
  } catch {
    // Ignore capture cleanup failures.
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

function getActiveThemeColor() {
  if (!guardianEvent.hidden) {
    return THEME_COLOR_BLACKOUT;
  }

  if (!paintingEvent.hidden) {
    if (paintingEvent.classList.contains("is-blackout-visible")) {
      return THEME_COLOR_BLACKOUT;
    }

    return THEME_COLOR_PAINTING;
  }

  return root.classList.contains("night-mode") ? THEME_COLOR_NIGHT : THEME_COLOR_DAY;
}

function syncThemeColor() {
  if (!(themeColorMeta instanceof HTMLMetaElement)) {
    return;
  }

  const nextThemeColor = getActiveThemeColor();

  if (themeColorMeta.content === nextThemeColor) {
    return;
  }

  themeColorMeta.content = nextThemeColor;
}

function initializeThemeColorSync() {
  syncThemeColor();

  if (typeof MutationObserver !== "function") {
    return;
  }

  const themeColorObserver = new MutationObserver(() => {
    syncThemeColor();
  });

  themeColorObserver.observe(root, {
    attributes: true,
    attributeFilter: ["class"],
  });

  [guardianEvent, paintingEvent].forEach((element) => {
    themeColorObserver.observe(element, {
      attributes: true,
      attributeFilter: ["class", "hidden"],
    });
  });
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
  const displayHeight = getDuckDisplayHeight(size, asset);

  loadDuckAssetDimensions(asset);

  if ("dataset" in duck) {
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
    duck.style.setProperty("--display-height", displayHeight.toFixed(2));
  } else {
    duck.asset = asset;
    duck.familyKey = resolvedVariant.familyKey;
    duck.normalFamilyKey = referenceFamilyKey;
    duck.logicalSize = logicalSize;
    duck.assetWidth = asset.sourceWidth || FALLBACK_ASSET_SIZE;
    duck.assetHeight = asset.sourceHeight || FALLBACK_ASSET_SIZE;
    duck.size = size;
    duck.displayHeight = displayHeight;
  }

  return { asset, size };
}

function interpolateValue(from, to, progress) {
  return from + (to - from) * progress;
}

function shouldHandleCardTouchScroll(target) {
  return !target.closest("input, button");
}

function clearCardTouchScroll() {
  activeCardTouchScroll = null;
}

function clearRangeTouchScroll() {
  activeRangeTouchScroll = null;
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

function syncRangeValueForTouchScroll(rangeInput, rawValue) {
  if (rangeInput === glowLevelInput) {
    if (glowLevelInput.value === String(rawValue)) {
      return;
    }

    glowLevelInput.value = String(rawValue);
    updateRangeVisual(glowLevelInput);
    refreshExistingDucks("asset");
    return;
  }

  const key = rangeInput.dataset.setting;

  if (!key || !controls[key]) {
    rangeInput.value = String(rawValue);
    updateRangeVisual(rangeInput);
    return;
  }

  const normalizedValue = normalizeValue(key, rawValue, rangeInput);
  const changed = state[key] !== normalizedValue;

  state[key] = normalizedValue;
  syncControl(key);

  if (changed && !MOTION_UPDATE_KEYS.has(key)) {
    requestRender();
  }
}

function handleRangeTouchStart(event) {
  if (event.touches.length !== 1) {
    clearRangeTouchScroll();
    return;
  }

  const rangeInput = event.currentTarget;
  const touch = event.touches[0];

  activeRangeTouchScroll = {
    rangeInput,
    startX: touch.clientX,
    startY: touch.clientY,
    startValue: rangeInput.value,
    startScrollTop: pageShell.scrollTop,
    isScrolling: false,
  };
}

function handleRangeTouchMove(event) {
  if (
    !activeRangeTouchScroll ||
    activeRangeTouchScroll.rangeInput !== event.currentTarget ||
    event.touches.length !== 1
  ) {
    return;
  }

  const touch = event.touches[0];
  const deltaX = touch.clientX - activeRangeTouchScroll.startX;
  const deltaY = touch.clientY - activeRangeTouchScroll.startY;

  if (!activeRangeTouchScroll.isScrolling) {
    if (Math.abs(deltaY) < 8) {
      return;
    }

    if (Math.abs(deltaY) <= Math.abs(deltaX)) {
      return;
    }

    activeRangeTouchScroll.isScrolling = true;
  }

  syncRangeValueForTouchScroll(
    activeRangeTouchScroll.rangeInput,
    activeRangeTouchScroll.startValue
  );
  pageShell.scrollTop = activeRangeTouchScroll.startScrollTop - deltaY;

  if (event.cancelable) {
    event.preventDefault();
  }
}

function resizeDuckCanvas() {
  if (!(duckRain instanceof HTMLCanvasElement) || !duckContext) {
    return;
  }

  const nextWidth = Math.max(window.innerWidth, 1);
  const nextHeight = Math.max(window.innerHeight, 1);
  const nextRatio = Math.max(window.devicePixelRatio || 1, 1);
  const pixelWidth = Math.max(1, Math.round(nextWidth * nextRatio));
  const pixelHeight = Math.max(1, Math.round(nextHeight * nextRatio));

  if (
    duckCanvasWidth === nextWidth &&
    duckCanvasHeight === nextHeight &&
    duckDevicePixelRatio === nextRatio &&
    duckRain.width === pixelWidth &&
    duckRain.height === pixelHeight
  ) {
    return;
  }

  duckCanvasWidth = nextWidth;
  duckCanvasHeight = nextHeight;
  duckDevicePixelRatio = nextRatio;
  duckRain.width = pixelWidth;
  duckRain.height = pixelHeight;
  duckRain.style.width = `${nextWidth}px`;
  duckRain.style.height = `${nextHeight}px`;
  duckContext.setTransform(nextRatio, 0, 0, nextRatio, 0, 0);
  duckContext.imageSmoothingEnabled = true;
  duckContext.imageSmoothingQuality = "high";
}

function requestDuckFrame() {
  if (duckRenderLoopFrame) {
    return;
  }

  duckRenderLoopFrame = window.requestAnimationFrame(drawDuckRainFrame);
}

function getDuckImageAsset(duck) {
  return duck.asset || null;
}

function createCanvasDuck() {
  duckIdCounter += 1;

  return {
    id: duckIdCounter,
    asset: null,
    familyKey: "duck",
    normalFamilyKey: "duck",
    logicalSize: state.size,
    spawnMode: "normal",
    assetWidth: FALLBACK_ASSET_SIZE,
    assetHeight: FALLBACK_ASSET_SIZE,
    size: state.size,
    displayHeight: state.size,
    duration: 1,
    delay: 0,
    fallDistance: 0,
    startLeft: 0,
    startTop: 0,
    driftStart: 0,
    driftMid: 0,
    driftEnd: 0,
    rotateStart: 0,
    rotateMid: 0,
    rotateEnd: 0,
    rotationDirection: 1,
    animationStartedAt: 0,
    animationPausedAt: 0,
    isDragged: false,
    keepFrontUntilRespawn: false,
    dragLeft: 0,
    dragTop: 0,
    currentRotation: 0,
  };
}

function setDuckPath(duck, leftPx, topPx, fallDistance, duration, delay = 0) {
  duck.startLeft = leftPx;
  duck.startTop = topPx;
  duck.duration = duration;
  duck.delay = delay;
  duck.fallDistance = fallDistance;
}

function restartDuckAnimation(duck, now = performance.now()) {
  duck.animationStartedAt = now;
  duck.animationPausedAt = 0;
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
  const displayHeight = getDuckDisplayHeight(size, asset);

  duck.asset = asset;
  duck.familyKey = familyKey;
  duck.normalFamilyKey = normalFamilyKey;
  duck.logicalSize = logicalSize;
  duck.spawnMode = mode;
  duck.assetWidth = asset.sourceWidth || FALLBACK_ASSET_SIZE;
  duck.assetHeight = asset.sourceHeight || FALLBACK_ASSET_SIZE;
  duck.size = size;
  duck.displayHeight = displayHeight;

  if (mode === "super-sign") {
    duck.driftStart = 0;
    duck.driftMid = 0;
    duck.driftEnd = 0;
    duck.rotateStart = 0;
    duck.rotateMid = 0;
    duck.rotateEnd = 0;
    duck.rotationDirection = 1;
    return { size, duration };
  }

  const rotationProfile = createRotationProfile();

  duck.driftStart = randomSignedMagnitude(driftBase, state.driftVariance, 0, 420);
  duck.driftMid = randomSignedMagnitude(driftBase * 1.2, state.driftVariance, 0, 520);
  duck.driftEnd = randomSignedMagnitude(driftBase * 0.85, state.driftVariance, 0, 520);
  duck.rotateStart = Number.parseFloat(rotationProfile.start) || 0;
  duck.rotateMid = Number.parseFloat(rotationProfile.mid) || 0;
  duck.rotateEnd = Number.parseFloat(rotationProfile.end) || 0;
  duck.rotationDirection = rotationProfile.direction === "-1" ? -1 : 1;

  return { size, duration };
}

function getStoredDuckFamilyKey(duck) {
  return duck.familyKey || "duck";
}

function getStoredDuckNormalFamilyKey(duck) {
  return duck.normalFamilyKey || getStoredDuckFamilyKey(duck);
}

function getStoredDuckSpawnMode(duck) {
  return duck.spawnMode || "normal";
}

function getStoredDuckLogicalSize(duck) {
  return Number.isFinite(duck.logicalSize) ? duck.logicalSize : state.size;
}

function getStoredDuckAsset(duck) {
  const liveAsset = duck.asset;

  if (liveAsset) {
    return {
      sourceWidth:
        Number.isFinite(liveAsset.sourceWidth) && liveAsset.sourceWidth > 0
          ? liveAsset.sourceWidth
          : FALLBACK_ASSET_SIZE,
      sourceHeight:
        Number.isFinite(liveAsset.sourceHeight) && liveAsset.sourceHeight > 0
          ? liveAsset.sourceHeight
          : FALLBACK_ASSET_SIZE,
    };
  }

  return {
    sourceWidth: Number.isFinite(duck.assetWidth) && duck.assetWidth > 0 ? duck.assetWidth : FALLBACK_ASSET_SIZE,
    sourceHeight:
      Number.isFinite(duck.assetHeight) && duck.assetHeight > 0 ? duck.assetHeight : FALLBACK_ASSET_SIZE,
  };
}

function getCurrentDuckSize(duck) {
  return Number.isFinite(duck.size) && duck.size > 0 ? duck.size : getStoredDuckLogicalSize(duck);
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
  const currentDuration = Number(duck.duration || 1);
  const currentFallDistance = Number(duck.fallDistance || 1);

  return Math.max(0.6, currentDuration * (remainingDistance / Math.max(currentFallDistance, 1)));
}

function getMotionDurationFromRemainingDistance(duration, remainingDistance, size, asset) {
  const fullFallDistance =
    window.innerHeight + Math.max(size, getDuckDisplayHeight(size, asset)) * 2.8;

  return Math.max(0.6, duration * (remainingDistance / Math.max(fullFallDistance, 1)));
}

function getDuckDriftStartOffset(duck) {
  return Number.isFinite(duck.driftStart) ? duck.driftStart : 0;
}

function getDuckRotationDirection(duck) {
  return duck.rotationDirection === -1 ? -1 : 1;
}

function getDuckStartCoordinate(duck, variableName) {
  if (variableName === "--start-left") {
    return duck.startLeft || 0;
  }

  if (variableName === "--start-top") {
    return duck.startTop || 0;
  }

  return 0;
}

function getDuckAnimationProgress(duck, now = performance.now()) {
  const duration = Number(duck.duration || 0);
  const delay = Number(duck.delay || 0);
  const startedAt = Number(duck.animationStartedAt || 0);
  const effectiveNow = duck.animationPausedAt || now;

  if (duration > 0 && startedAt > 0) {
    return clamp((effectiveNow - startedAt - delay * 1000) / (duration * 1000), 0, 0.999);
  }

  if (duration > 0 && delay < 0) {
    return clamp((-delay) / duration, 0, 0.999);
  }

  return 0;
}

function getDuckCurrentTranslation(duck, progress = getDuckAnimationProgress(duck)) {
  const driftStart = duck.driftStart || 0;
  const driftMid = duck.driftMid || 0;
  const driftEnd = duck.driftEnd || 0;
  const fallMid = (duck.fallDistance || 0) * 0.52;
  const fallEnd = duck.fallDistance || 0;

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

function getDuckCurrentRotation(duck, progress = getDuckAnimationProgress(duck)) {
  if (progress <= 0.5) {
    return interpolateValue(duck.rotateStart || 0, duck.rotateMid || 0, progress / 0.5);
  }

  return interpolateValue(duck.rotateMid || 0, duck.rotateEnd || 0, (progress - 0.5) / 0.5);
}

function getDuckCurrentGeometry(duck, now = performance.now()) {
  const progress = getDuckAnimationProgress(duck, now);
  const translation = getDuckCurrentTranslation(duck, progress);
  const size = getCurrentDuckSize(duck);
  const asset = getStoredDuckAsset(duck);
  const left = (duck.startLeft || 0) + translation.x;
  const top = (duck.startTop || 0) + translation.y;
  const height = getDuckDisplayHeight(size, asset);
  const rotation = getDuckCurrentRotation(duck, progress);

  return {
    progress,
    size,
    asset,
    rotation,
    translation,
    position: { left, top },
    center: {
      x: left + size / 2,
      y: top + height / 2,
    },
  };
}

function getDuckVisualState(duck, now = performance.now()) {
  if (duck.isDragged) {
    const scaledSize = duck.size * DRAG_SCALE;
    const scaledHeight = duck.displayHeight * DRAG_SCALE;
    const offsetX = (scaledSize - duck.size) / 2;
    const offsetY = (scaledHeight - duck.displayHeight) / 2;

    return {
      left: duck.dragLeft - offsetX,
      top: duck.dragTop - offsetY,
      size: scaledSize,
      displayHeight: scaledHeight,
      rotation: duck.currentRotation,
    };
  }

  const geometry = getDuckCurrentGeometry(duck, now);

  return {
    left: geometry.position.left,
    top: geometry.position.top,
    size: geometry.size,
    displayHeight: getDuckDisplayHeight(geometry.size, geometry.asset),
    rotation: geometry.rotation,
  };
}

function refreshDuckAssetVariant(duck, assetSet = getActiveDuckAssetSet(), now = performance.now()) {
  if (duck.isDragged) {
    return;
  }

  const currentGeometry = getDuckCurrentGeometry(duck, now);
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

  duck.startLeft = nextPosition.left;
  duck.startTop = nextPosition.top;
}

function refreshDuckMotion(duck, now = performance.now()) {
  if (duck.isDragged) {
    return;
  }

  const currentGeometry = getDuckCurrentGeometry(duck, now);
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
  restartDuckAnimation(duck, now);
}

function refreshDuckSpeed(duck, now = performance.now()) {
  if (duck.isDragged) {
    return;
  }

  const nextDuration =
    getStoredDuckSpawnMode(duck) === "super-sign"
      ? speedValueToDuration(SUPER_SIGN_DUCK_SPEED)
      : createDurationProfile();
  const progress = getDuckAnimationProgress(duck, now);

  setDuckPath(
    duck,
    duck.startLeft || 0,
    duck.startTop || 0,
    Number(duck.fallDistance || 0),
    nextDuration,
    -progress * nextDuration
  );
  restartDuckAnimation(duck, now);
}

function refreshExistingDucks(updateType) {
  const activeAssetSet = updateType === "asset" ? getActiveDuckAssetSet() : null;
  const now = performance.now();

  duckPool.forEach((duck) => {
    if (updateType === "asset") {
      refreshDuckAssetVariant(duck, activeAssetSet, now);
      return;
    }

    if (updateType === "speed") {
      refreshDuckSpeed(duck, now);
      return;
    }

    refreshDuckMotion(duck, now);
  });

  requestDuckFrame();
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

  duck.keepFrontUntilRespawn = false;
  setDuckPath(duck, startLeft, startTop, fallDistance, duration, entryDelay);
}

function discardActiveDuckDrag() {
  if (!activeDuckDrag) {
    return;
  }

  activeDuckDrag.duck.isDragged = false;
  activeDuckDrag = null;
}

function releaseDuck(pointerId) {
  if (!activeDuckDrag || activeDuckDrag.pointerId !== pointerId) {
    return;
  }

  const { duck, lastX, lastY, size, displayHeight, currentRotation } = activeDuckDrag;
  const spawnMode = getStoredDuckSpawnMode(duck);
  const driftStart = spawnMode === "super-sign" ? 0 : getDuckDriftStartOffset(duck);
  const remainingDistance = Math.max(
    40,
    window.innerHeight + Math.max(size, displayHeight) * 1.35 - lastY
  );
  const nextDuration = getDurationFromRemainingDistance(duck, remainingDistance);

  if (spawnMode === "super-sign") {
    duck.driftStart = 0;
    duck.driftMid = 0;
    duck.driftEnd = 0;
    duck.rotateStart = 0;
    duck.rotateMid = 0;
    duck.rotateEnd = 0;
    duck.rotationDirection = 1;
  } else {
    const rotationProfile = createRotationProfileFromAngle(
      currentRotation,
      getDuckRotationDirection(duck)
    );

    duck.rotateStart = Number.parseFloat(rotationProfile.start) || 0;
    duck.rotateMid = Number.parseFloat(rotationProfile.mid) || 0;
    duck.rotateEnd = Number.parseFloat(rotationProfile.end) || 0;
    duck.rotationDirection = rotationProfile.direction === "-1" ? -1 : 1;
  }

  setDuckPath(duck, lastX - driftStart, lastY, remainingDistance, nextDuration);
  duck.isDragged = false;
  duck.keepFrontUntilRespawn = true;
  moveDuckToFront(duck);
  duck.dragLeft = 0;
  duck.dragTop = 0;
  duck.currentRotation = 0;
  restartDuckAnimation(duck);
  activeDuckDrag = null;
}

function createDuck() {
  return createCanvasDuck();
}

function syncDuckPool(activeCount) {
  while (duckPool.length < activeCount) {
    duckPool.push(createDuck());
  }

  while (duckPool.length > activeCount) {
    const duck = duckPool.pop();

    if (!duck) {
      continue;
    }

    if (activeDuckDrag?.duck === duck) {
      activeDuckDrag = null;
    }

    releaseSuperEventLockForDuck(duck);
  }
}

function renderDucks() {
  discardActiveDuckDrag();

  const activeCount = clamp(Math.round(state.count), 1, getManualCountMax());
  syncDuckPool(activeCount);

  superSignDuckActive = false;

  const now = performance.now();

  duckPool.forEach((duck) => {
    configureFreshDuckSpawn(duck, true);
    restartDuckAnimation(duck, now);
  });

  requestDuckFrame();
}

function pauseDuckAnimationClocks() {
  const pausedAt = performance.now();

  duckPool.forEach((duck) => {
    if (duck.isDragged || duck.animationPausedAt) {
      return;
    }

    duck.animationPausedAt = pausedAt;
  });
}

function resumeDuckAnimationClocks() {
  const resumedAt = performance.now();

  duckPool.forEach((duck) => {
    const pausedAt = Number(duck.animationPausedAt || 0);

    if (!pausedAt) {
      return;
    }

    const startedAt = Number(duck.animationStartedAt || 0);

    if (startedAt > 0) {
      duck.animationStartedAt = startedAt + resumedAt - pausedAt;
    }

    duck.animationPausedAt = 0;
  });

  requestDuckFrame();
}

function isDuckPointHit(duck, x, y, now = performance.now()) {
  const visual = getDuckVisualState(duck, now);
  const centerX = visual.left + visual.size / 2;
  const centerY = visual.top + visual.displayHeight / 2;
  const radians = (-visual.rotation * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const localX = x - centerX;
  const localY = y - centerY;
  const rotatedX = localX * cos - localY * sin;
  const rotatedY = localX * sin + localY * cos;

  return (
    Math.abs(rotatedX) <= visual.size / 2 &&
    Math.abs(rotatedY) <= visual.displayHeight / 2
  );
}

function findDuckAtPoint(x, y, now = performance.now()) {
  if (activeDuckDrag?.duck && isDuckPointHit(activeDuckDrag.duck, x, y, now)) {
    return activeDuckDrag.duck;
  }

  for (let index = duckPool.length - 1; index >= 0; index -= 1) {
    const duck = duckPool[index];

    if (duck.isDragged || !duck.keepFrontUntilRespawn) {
      continue;
    }

    if (isDuckPointHit(duck, x, y, now)) {
      return duck;
    }
  }

  for (let index = duckPool.length - 1; index >= 0; index -= 1) {
    const duck = duckPool[index];

    if (duck.isDragged || duck.keepFrontUntilRespawn) {
      continue;
    }

    if (isDuckPointHit(duck, x, y, now)) {
      return duck;
    }
  }

  return null;
}

function moveDuckToFront(duck) {
  const duckIndex = duckPool.indexOf(duck);

  if (duckIndex === -1 || duckIndex === duckPool.length - 1) {
    return;
  }

  duckPool.splice(duckIndex, 1);
  duckPool.push(duck);
}

function getCanvasPointerPosition(event) {
  const rect = duckRain.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function handleDuckCanvasPointerDown(event) {
  if (!(duckRain instanceof HTMLCanvasElement) || !duckContext) {
    return;
  }

  if ((event.pointerType === "mouse" && event.button !== 0) || activeDuckDrag) {
    return;
  }

  const pointer = getCanvasPointerPosition(event);
  const targetDuck = findDuckAtPoint(pointer.x, pointer.y);

  if (!targetDuck) {
    return;
  }

  event.preventDefault();

  const visual = getDuckVisualState(targetDuck, performance.now());

  targetDuck.keepFrontUntilRespawn = true;
  moveDuckToFront(targetDuck);

  activeDuckDrag = {
    duck: targetDuck,
    pointerId: event.pointerId,
    offsetX: pointer.x - visual.left,
    offsetY: pointer.y - visual.top,
    lastX: visual.left,
    lastY: visual.top,
    size: targetDuck.size,
    displayHeight: targetDuck.displayHeight,
    currentRotation: visual.rotation,
  };

  targetDuck.isDragged = true;
  targetDuck.dragLeft = visual.left;
  targetDuck.dragTop = visual.top;
  targetDuck.currentRotation = visual.rotation;

  if (typeof duckRain.setPointerCapture === "function") {
    duckRain.setPointerCapture(event.pointerId);
  }

  requestDuckFrame();
}

function handleDuckCanvasPointerMove(event) {
  if (!activeDuckDrag || activeDuckDrag.pointerId !== event.pointerId) {
    return;
  }

  const pointer = getCanvasPointerPosition(event);
  const nextLeft = pointer.x - activeDuckDrag.offsetX;
  const nextTop = pointer.y - activeDuckDrag.offsetY;

  activeDuckDrag.lastX = nextLeft;
  activeDuckDrag.lastY = nextTop;
  activeDuckDrag.duck.dragLeft = nextLeft;
  activeDuckDrag.duck.dragTop = nextTop;

  requestDuckFrame();
}

function handleDuckCanvasPointerUp(event) {
  releaseDuck(event.pointerId);

  if (
    typeof duckRain.releasePointerCapture === "function" &&
    duckRain.hasPointerCapture?.(event.pointerId)
  ) {
    duckRain.releasePointerCapture(event.pointerId);
  }
}

function drawDuckToCanvas(duck, now = performance.now()) {
  if (!duckContext) {
    return;
  }

  const asset = getDuckImageAsset(duck);

  if (!asset?.image) {
    return;
  }

  const visual = getDuckVisualState(duck, now);
  const centerX = visual.left + visual.size / 2;
  const centerY = visual.top + visual.displayHeight / 2;

  duckContext.save();
  duckContext.translate(centerX, centerY);
  duckContext.rotate((visual.rotation * Math.PI) / 180);
  duckContext.drawImage(
    asset.image,
    -visual.size / 2,
    -visual.displayHeight / 2,
    visual.size,
    visual.displayHeight
  );
  duckContext.restore();
}

function updateDuckForFrame(duck, now = performance.now()) {
  if (duck.isDragged) {
    return;
  }

  if (getDuckAnimationProgress(duck, now) < 0.999) {
    return;
  }

  releaseSuperEventLockForDuck(duck);
  configureFreshDuckSpawn(duck);
  restartDuckAnimation(duck, now);
}

function drawDuckRainFrame(now = performance.now()) {
  duckRenderLoopFrame = 0;
  resizeDuckCanvas();

  if (!duckContext) {
    return;
  }

  duckContext.clearRect(0, 0, duckCanvasWidth, duckCanvasHeight);

  duckPool.forEach((duck) => {
    updateDuckForFrame(duck, now);

    if (!duck.isDragged && !duck.keepFrontUntilRespawn) {
      drawDuckToCanvas(duck, now);
    }
  });

  duckPool.forEach((duck) => {
    if (!duck.isDragged && duck.keepFrontUntilRespawn) {
      drawDuckToCanvas(duck, now);
    }
  });

  if (activeDuckDrag?.duck) {
    drawDuckToCanvas(activeDuckDrag.duck, now);
  }

  requestDuckFrame();
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

function initializeDuckCanvas() {
  if (!(duckRain instanceof HTMLCanvasElement) || !duckContext) {
    return;
  }

  resizeDuckCanvas();
  duckRain.addEventListener("pointerdown", handleDuckCanvasPointerDown);
  duckRain.addEventListener("pointermove", handleDuckCanvasPointerMove);
  duckRain.addEventListener("pointerup", handleDuckCanvasPointerUp);
  duckRain.addEventListener("pointercancel", handleDuckCanvasPointerUp);
  duckRain.addEventListener("lostpointercapture", (event) => {
    if (!activeDuckDrag) {
      return;
    }

    releaseDuck(event.pointerId);
  });
  requestDuckFrame();
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
  syncSpawnToggleDefaults();
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

rangeInputs.forEach((rangeInput) => {
  updateRangeVisual(rangeInput);
  rangeInput.addEventListener("touchstart", handleRangeTouchStart, { passive: true });
  rangeInput.addEventListener("touchmove", handleRangeTouchMove, { passive: false });
  rangeInput.addEventListener("touchend", clearRangeTouchScroll, { passive: true });
  rangeInput.addEventListener("touchcancel", clearRangeTouchScroll, { passive: true });
});

glassCard.addEventListener("touchstart", handleCardTouchStart, { passive: true });
glassCard.addEventListener("touchmove", handleCardTouchMove, { passive: false });
glassCard.addEventListener("touchend", clearCardTouchScroll, { passive: true });
glassCard.addEventListener("touchcancel", clearCardTouchScroll, { passive: true });

[
  guardianEventDuck,
  visionEventDuck,
  paintingEventPulloverDuck,
  paintingEventTshirtDuck,
].forEach(protectDuckImage);

document.addEventListener("contextmenu", (event) => {
  if (!isProtectedDuckImageTarget(event.target)) {
    return;
  }

  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (!isProtectedDuckImageTarget(event.target)) {
    return;
  }

  event.preventDefault();
});

window.addEventListener("resize", handleViewportResize, { passive: true });
window.addEventListener("focus", syncAttentionTimer);
window.addEventListener("blur", syncAttentionTimer);
window.addEventListener("blur", clearRangeTouchScroll);
window.addEventListener("pageshow", () => {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  syncResponsiveControlLimits();
  resizeDuckCanvas();
  setPanelExpanded(true);
  resetToDefaults();
  resumeDuckAnimationClocks();
  requestDuckFrame();
  syncAttentionTimer();
});
window.addEventListener("pagehide", () => {
  discardActiveDuckDrag();
  pauseDuckAnimationClocks();
  pauseAttentionTimer();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearRangeTouchScroll();
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
  updateRangeVisual(glowLevelInput);
  refreshExistingDucks("asset");
});

specialDucksToggle.addEventListener("change", () => {
  if (specialDucksToggle.checked) {
    return;
  }

  specialDucksOnlyMode = false;
  clearSpecialDucksHoldTrigger();
});

specialDucksToggleRow.addEventListener("pointerdown", (event) => {
  if ((event.pointerType === "mouse" && event.button !== 0) || specialDucksHoldTimeoutId) {
    return;
  }

  captureSecretTogglePointer(event.currentTarget, event.pointerId);
  specialDucksHoldTimeoutId = window.setTimeout(() => {
    specialDucksHoldTimeoutId = 0;
    suppressSpecialDucksToggleClick = true;

    if (specialDucksOnlyMode) {
      specialDucksOnlyMode = false;
      triggerSecretSpecialDucksVibration();
      return;
    }

    void preloadActiveSpecialDuckAssets().then(() => {
      if (areSpecialDucksEnabled()) {
        specialDucksOnlyMode = true;
        triggerSecretSpecialDucksVibration();
      }
    });
  }, SUPER_EVENTS_HOLD_TRIGGER_MS);
});

specialDucksToggleRow.addEventListener("pointerup", (event) => {
  clearSpecialDucksHoldTrigger();
  releaseSecretTogglePointer(event.currentTarget, event.pointerId);
});

specialDucksToggleRow.addEventListener("pointercancel", (event) => {
  clearSpecialDucksHoldTrigger();
  releaseSecretTogglePointer(event.currentTarget, event.pointerId);
});

specialDucksToggleRow.addEventListener("lostpointercapture", () => {
  clearSpecialDucksHoldTrigger();
});

specialDucksToggleRow.addEventListener("click", (event) => {
  if (!suppressSpecialDucksToggleClick) {
    return;
  }

  suppressSpecialDucksToggleClick = false;
  event.preventDefault();
  event.stopPropagation();
});

specialDucksToggle.addEventListener("click", (event) => {
  if (!suppressSpecialDucksToggleClick) {
    return;
  }

  suppressSpecialDucksToggleClick = false;
  event.preventDefault();
  event.stopPropagation();
});

superEventsToggleRow.addEventListener("pointerdown", (event) => {
  if ((event.pointerType === "mouse" && event.button !== 0) || superEventsHoldTimeoutId) {
    return;
  }

  captureSecretTogglePointer(event.currentTarget, event.pointerId);
  superEventsHoldTimeoutId = window.setTimeout(() => {
    superEventsHoldTimeoutId = 0;
    suppressSuperEventsToggleClick = true;

    if (!triggerForcedRandomSuperEvent()) {
      suppressSuperEventsToggleClick = false;
    }
  }, SUPER_EVENTS_HOLD_TRIGGER_MS);
});

superEventsToggleRow.addEventListener("pointerup", (event) => {
  clearSuperEventsHoldTrigger();
  releaseSecretTogglePointer(event.currentTarget, event.pointerId);
});

superEventsToggleRow.addEventListener("pointercancel", (event) => {
  clearSuperEventsHoldTrigger();
  releaseSecretTogglePointer(event.currentTarget, event.pointerId);
});

superEventsToggleRow.addEventListener("lostpointercapture", () => {
  clearSuperEventsHoldTrigger();
});

superEventsToggleRow.addEventListener("click", (event) => {
  if (!suppressSuperEventsToggleClick) {
    return;
  }

  suppressSuperEventsToggleClick = false;
  event.preventDefault();
  event.stopPropagation();
});

superEventsToggle.addEventListener("click", (event) => {
  if (!suppressSuperEventsToggleClick) {
    return;
  }

  suppressSuperEventsToggleClick = false;
  event.preventDefault();
  event.stopPropagation();
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

window.addEventListener("blur", clearSuperEventsHoldTrigger);
window.addEventListener("blur", clearSpecialDucksHoldTrigger);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearSpecialDucksHoldTrigger();
    clearSuperEventsHoldTrigger();
  }
});

setInfoPopupOpen(false);
setAttentionPopupOpen(false);
syncSpecialEventAssets();
initializeThemeColorSync();
initializeDuckCanvas();
syncResponsiveControlLimits();
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
