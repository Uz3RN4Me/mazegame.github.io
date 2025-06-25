import { GameMode, Controls, PlayerSkin, SymbolicGameSize, GameSizeConfigEntry, PlayerCoreShape, PlayerTrailStyle, AuraPalette, CoreMatrixItem, TrailSignatureItem, SelectedCustomAssembly } from './types';

export const DEFAULT_MAZE_SIZE = 15;
export const CELL_SIZE_PX = 20; // This is a base reference, GameScreen calculates actualCellSize
export const PLAYER_TRAIL_LENGTH = 8;
export const TRAIL_OPACITY_INIT = 1.0;
export const TRAIL_FADE_RATE = 0.15;
export const TRAIL_UPDATE_INTERVAL = 45; // ms
export const TIME_TRIAL_LOW_THRESHOLD = 10; // Seconds remaining to play low time sound

export const HUNTER_CONTINUOUS_SPEED_PX_PER_SEC = 85; 
export const HUNTER_RADIUS_FACTOR = 0.35; // Factor of actualCellSize for hunter collision radius
export const PLAYER_RADIUS_FACTOR = 0.35; // Factor of actualCellSize for player collision radius (used for hunter checks)
export const GAME_LOGIC_FPS = 30; // Target FPS for game logic updates (like continuous hunter movement)


export const THEME_COLORS = {
  // Base & Text
  background: 'bg-[#0A051E]', // Deep Indigo Void
  textPrimary: 'text-cyan-300', // Glowing Cyan Glyphs
  textSecondary: 'text-indigo-300', // Subdued Indigo Data
  textAccent: 'text-fuchsia-400', // Energetic Fuchsia Highlight
  textDanger: 'text-red-400', // For warnings, time running out

  // Panels & Borders
  panelBg: 'bg-[#160E2E]', // Dark Crystalline Panel (Darker Purple/Indigo)
  panelBorder: 'border-indigo-700', // Structure Outline
  panelBorderAccent: 'border-fuchsia-500', // Active Energy Conduit Border

  // Buttons
  buttonPrimaryBg: 'bg-fuchsia-600', // Engage / Activate
  buttonPrimaryHoverBg: 'hover:bg-fuchsia-500',
  buttonSecondaryBg: 'bg-cyan-600', // Interface / Access
  buttonSecondaryHoverBg: 'hover:bg-cyan-500',
  buttonGhostBorder: 'border-indigo-500', // Faint Outline
  buttonGhostHoverBorder: 'hover:border-fuchsia-400', // Energized Outline
  buttonGhostText: 'text-indigo-300',
  buttonGhostHoverText: 'hover:text-fuchsia-300',

  // Inputs
  inputBg: 'bg-indigo-900', // Data Input Field (#312e81)
  inputBorder: 'border-indigo-600',
  inputText: 'text-cyan-200',
  inputFocusRing: 'focus:ring-fuchsia-500',
  inputColorPickerIndicator: 'border-transparent',

  // Canvas Colors - for direct drawing
  canvasWall: '#160E2E', // Dark Kryst-Stone (aligned with panelBg for depth)
  canvasPath: '#312e81', // Labyrinth Void (aligned with inputBg for clearer, lighter paths)
  canvasPlayerDefault: '#d946ef', // Fuchsia (Base for default skin)
  canvasStart: '#06b6d4', // Cyan (Entry data-point/conduit)
  canvasEnd: '#fbbf24', // Amber/Gold (Exit portal/valuable artifact)
  canvasKey: '#FFD700', // Gold (Distinct Kryst-energy signature for key)
  canvasHunter: '#ef4444', // Red (Sentinel Threat)
  canvasDarknessGradientStart: 'rgba(10, 5, 30, 0)',
  canvasDarknessGradientEnd: '#0A051E',
};

// --- Kryst Assembler Components ---

export const DEFAULT_AURA_PALETTE_ID = 'default_cyan_pulse';
export const DEFAULT_CORE_MATRIX_ID = PlayerCoreShape.CIRCLE;
export const DEFAULT_TRAIL_SIGNATURE_ID = PlayerTrailStyle.DOTS;

export const AURA_PALETTES: AuraPalette[] = [
  {
    id: DEFAULT_AURA_PALETTE_ID, name: 'Kryst Initial',
    playerColor: '#06b6d4', trailColorBase: '6, 182, 212', // Cyan-500
    previewSwatchStyle: { background: 'linear-gradient(45deg, #06b6d4, #0e7490)'},
    unlockDescription: 'Available by default.',
  },
  {
    id: 'arcane_fuchsia', name: 'Arcane Fuchsia',
    playerColor: '#d946ef', trailColorBase: '217, 70, 239', // Fuchsia-500
    previewSwatchStyle: { background: 'linear-gradient(45deg, #d946ef, #a21caf)'},
    unlockDescription: 'Complete Level 2',
  },
  {
    id: 'crimson_core', name: 'Crimson Core',
    playerColor: '#f43f5e', trailColorBase: '244, 63, 94', // Rose-500
    previewSwatchStyle: { background: 'linear-gradient(45deg, #f43f5e, #be123c)'},
    unlockDescription: 'Complete Level 4',
  },
  {
    id: 'veridian_stream', name: 'Veridian Stream',
    playerColor: '#22c55e', trailColorBase: '34, 197, 94', // Green-500
    previewSwatchStyle: { background: 'linear-gradient(45deg, #22c55e, #15803d)'},
    unlockDescription: 'Complete Level 6',
  },
  {
    id: 'void_violet', name: 'Void Violet',
    playerColor: '#6d28d9', trailColorBase: '109, 40, 217', // Violet-700
    previewSwatchStyle: { background: 'linear-gradient(45deg, #6d28d9, #4c1d95)'},
    unlockDescription: 'Complete Level 8',
  },
];

export const CORE_MATRIX_ITEMS: CoreMatrixItem[] = [
  { id: PlayerCoreShape.CIRCLE, name: 'Orb Core', unlockDescription: 'Available by default.' },
  { id: PlayerCoreShape.TRIANGLE, name: 'Vector Tri-Core', unlockDescription: 'Complete Level 1' },
  { id: PlayerCoreShape.SQUARE, name: 'Block Matrix', unlockDescription: 'Complete Level 3' },
  { id: PlayerCoreShape.HEXAGON, name: 'Hexa-Cell', unlockDescription: 'Complete Level 5' },
  { id: PlayerCoreShape.DIAMOND, name: 'Facet Prism', unlockDescription: 'Complete Level 7' },
];

export const TRAIL_SIGNATURE_ITEMS: TrailSignatureItem[] = [
  { id: PlayerTrailStyle.DOTS, name: 'Particle Pulse', unlockDescription: 'Available by default.' },
  { id: PlayerTrailStyle.LINE, name: 'Solid Stream', unlockDescription: 'Complete Level 20' }, // Updated unlock description
];

// Predefined Full Skins are removed. All skins are assembled by the player.
// export const PLAYER_SKINS: PlayerSkin[] = [ ... ]; // This array is no longer needed.

// ID for the player's assembled skin from unlocked components
export const CUSTOM_SKIN_ID = 'user_assembled_kryst_signature';

// Default assembly configuration using the default component IDs
export const DEFAULT_CUSTOM_ASSEMBLY: SelectedCustomAssembly = {
  paletteId: DEFAULT_AURA_PALETTE_ID,
  coreShapeId: DEFAULT_CORE_MATRIX_ID,
  trailStyleId: DEFAULT_TRAIL_SIGNATURE_ID,
};


export const GAME_SIZE_CONFIG: GameSizeConfigEntry[] = [
  { name: SymbolicGameSize.SMALL, value: 11, label: 'Small (11x11)' },
  { name: SymbolicGameSize.MEDIUM, value: 15, label: 'Medium (15x15)' },
  { name: SymbolicGameSize.LARGE, value: 21, label: 'Large (21x21)' },
];

export const MODE_DESCRIPTIONS: Record<GameMode, string> = {
  [GameMode.NORMAL]: "Normal Mode: The classic labyrinth experience. Navigate the corridors and find the exit.",
  [GameMode.DARKNESS]: "Darkness Mode: Visibility is severely limited. Navigate carefully using your immediate surroundings.",
  [GameMode.DASH]: "Dash Mode: Move at high speed in a straight line until you hit an obstacle. Plan your dashes carefully!",
  [GameMode.LEVELS]: "Levels Mode: Play through predefined challenging mazes. Some levels feature unique mechanics like Sentinels or time limits. New levels unlock as you progress.",
};

const isBrowser = typeof window !== 'undefined' && typeof window.btoa === 'function';

const defaultPaletteForSVG = AURA_PALETTES.find(p => p.id === DEFAULT_AURA_PALETTE_ID) || AURA_PALETTES[0];
const svgColors = {
  pathBg: THEME_COLORS.canvasPath,
  border: '#4338ca',
  primaryText: '#67e8f9',
  accent: '#f472b6',
  panelAccent: '#a855f7',
  start: THEME_COLORS.canvasStart,
  end: THEME_COLORS.canvasEnd,
  playerDefault: defaultPaletteForSVG.playerColor, // Use default palette color for SVG previews
  key: THEME_COLORS.canvasKey,
  darknessStart: THEME_COLORS.canvasDarknessGradientStart,
  darknessEnd: THEME_COLORS.canvasDarknessGradientEnd,
  wall: THEME_COLORS.canvasWall,
  secondaryTextAlpha: 'rgba(165, 180, 252, 0.5)'
};

const standardScanSVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" fill="${svgColors.pathBg}"/>
  <path d="M3 3 H21 V21 H3 Z" fill="none" stroke="${svgColors.border}" stroke-width="0.5"/>
  <path d="M4 20 V4 H20 V16 H8 V8 H16" stroke="${svgColors.primaryText}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <circle cx="5.5" cy="18.5" r="1.5" fill="${svgColors.start}"/>
  <circle cx="18.5" cy="5.5" r="1.5" fill="${svgColors.end}"/>
  <circle cx="5.5" cy="18.5" r="0.8" fill="${svgColors.playerDefault}" stroke="#FFF" stroke-width="0.2"/>
</svg>
`;

const deepScanSVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="prevDarkGradKrystV2" cx="50%" cy="50%" r="55%">
      <stop offset="15%" stop-color="${svgColors.darknessStart}" />
      <stop offset="35%" stop-color="rgba(10, 5, 30, 0.85)" />
      <stop offset="100%" stop-color="${svgColors.darknessEnd}" />
    </radialGradient>
  </defs>
  <rect width="24" height="24" fill="${svgColors.pathBg}"/>
  <path d="M3 3 H21 V21 H3 Z" fill="none" stroke="${svgColors.border}" stroke-width="0.5" opacity="0.4"/>
  <path d="M4 20 V4 H20 V16 H8 V8 H16" stroke="${svgColors.primaryText}" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.3"/>
  <circle cx="5.5" cy="18.5" r="1.5" fill="${svgColors.start}" opacity="0.5"/>
  <circle cx="18.5" cy="5.5" r="1.5" fill="${svgColors.end}" opacity="0.5"/>
  <circle cx="12" cy="12" r="1.2" fill="${svgColors.playerDefault}"/>
  <circle cx="12" cy="12" r="3" stroke="${svgColors.accent}" stroke-width="0.4" fill="none" opacity="0.8">
    <animate attributeName="r" values="1.5;4" dur="1.8s" begin="0s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8;0" dur="1.8s" begin="0s" repeatCount="indefinite" />
  </circle>
  <circle cx="12" cy="12" r="2.5" stroke="${svgColors.accent}" stroke-width="0.3" fill="none" opacity="0.6">
    <animate attributeName="r" values="2;5" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.6;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
  </circle>
  <rect width="24" height="24" fill="url(#prevDarkGradKrystV2)"/>
</svg>
`;

const energySurgeSVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" fill="${svgColors.pathBg}"/>
  <rect x="20" y="5" width="2.5" height="14" fill="${svgColors.wall}" rx="1"/>
  <circle cx="6" cy="12" r="2.2" fill="${svgColors.playerDefault}"/>
  <circle cx="6" cy="12" r="1.2" fill="rgba(255,255,255,0.6)"/>
  <line x1="7.5" y1="12" x2="7.5" y2="12" stroke="${svgColors.accent}" stroke-width="2.5" stroke-linecap="round">
    <animate attributeName="x2" values="7.5; 19.5" dur="0.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1; 1; 0.8; 0" keyTimes="0; 0.7; 0.85; 1" dur="0.8s" repeatCount="indefinite" />
  </line>
  <rect x="19" y="11" width="2" height="2" fill="${svgColors.accent}" rx="0.5" opacity="0">
     <animate attributeName="opacity" values="0; 0; 1; 0" keyTimes="0; 0.75; 0.85; 1" dur="0.8s" repeatCount="indefinite" />
  </rect>
</svg>
`;

const levelsModeSVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" fill="${svgColors.pathBg}"/>
  <path d="M6 3 L3 6 V18 L6 21 H18 L21 18 V6 L18 3 Z"
        stroke="${svgColors.panelAccent}"
        stroke-width="1.5"
        fill="rgba(168, 85, 247, 0.2)" stroke-linejoin="round">
    <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
  </path>
  <path d="M8 8 L12 6 L16 8 L12 10 Z" fill="${svgColors.primaryText}" opacity="0.7"/>
  <path d="M8 12 L12 10 L16 12 L12 14 Z" fill="${svgColors.primaryText}" opacity="0.5"/>
  <path d="M8 16 L12 14 L16 16 L12 18 Z" fill="${svgColors.primaryText}" opacity="0.3"/>

  <circle cx="7" cy="7" r="1.2" fill="${svgColors.key}" opacity="0.9">
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 10; 10 10; 10 0; 0 0" dur="8s" repeatCount="indefinite" />
  </circle>
   <path d="M17 17 L16 15 L18 15 Z" fill="${svgColors.start}" opacity="0.8">
        <animateMotion path="M0 0 L-2 -3 L0 -6 L2 -3 Z" dur="3s" repeatCount="indefinite" />
    </path>
</svg>
`;

const encodeSVG = (svgString: string) => isBrowser ? btoa(svgString) : '';

export const MODE_IMAGES: Record<GameMode, string> = {
  [GameMode.NORMAL]: `data:image/svg+xml;base64,${encodeSVG(standardScanSVG)}`,
  [GameMode.DARKNESS]: `data:image/svg+xml;base64,${encodeSVG(deepScanSVG)}`,
  [GameMode.DASH]: `data:image/svg+xml;base64,${encodeSVG(energySurgeSVG)}`,
  [GameMode.LEVELS]: `data:image/svg+xml;base64,${encodeSVG(levelsModeSVG)}`,
};


export const LOCAL_STORAGE_KEYS = {
  CONTROLS: 'krystCoreLabyrinthControls_v2',
  HIGHSCORES: 'krystCoreLabyrinthHighscores_v2',
  LEVEL_PROGRESS: 'krystCoreLabyrinthLevelProgress_v2',
  MAX_UNLOCKED_LEVEL: 'krystCoreLabyrinthMaxUnlockedLevel_v2',
  // UNLOCKED_PLAYER_SKINS: 'krystCoreLabyrinthUnlockedSkins_v2', // Removed
  // SELECTED_PLAYER_SKIN_ID: 'krystCoreLabyrinthSelectedSkinID_v2', // Removed or re-purposed if player always has one custom skin
  // Kryst Assembler components
  UNLOCKED_AURA_PALETTE_IDS: 'krystCoreLabyrinthUnlockedPalettes_v1',
  UNLOCKED_CORE_MATRIX_IDS: 'krystCoreLabyrinthUnlockedMatrices_v1',
  UNLOCKED_TRAIL_SIGNATURE_IDS: 'krystCoreLabyrinthUnlockedTrails_v1',
  // Player's current assembly for their *only* skin
  SELECTED_CUSTOM_ASSEMBLY: 'krystCoreLabyrinthSelectedAssembly_v1',
};

export const INITIAL_CONTROLS: Controls = {
  up: ['ArrowUp', 'KeyW'],
  down: ['ArrowDown', 'KeyS'],
  left: ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
};