export enum Screen {
  MENU = 'MENU',
  GAME = 'GAME',
  SETTINGS = 'SETTINGS',
  WIN = 'WIN',
  LEVEL_SELECT = 'LEVEL_SELECT',
  SKIN_CUSTOMIZATION = 'SKIN_CUSTOMIZATION', // Will be the "Kryst Assembler"
  LEVEL_EDITOR = 'LEVEL_EDITOR', // New screen for the level editor
}

export enum GameMode {
  NORMAL = 'Normal',
  DARKNESS = 'Darkness',
  DASH = 'Dash',
  LEVELS = 'Levels',
}

export enum SymbolicGameSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
}

export interface GameSizeConfigEntry {
  name: SymbolicGameSize;
  value: number;
  label: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface HunterPosition extends Position {
  pixelX: number; // For continuous movement
  pixelY: number; // For continuous movement
  // Future: could add velocityX, velocityY if physics-based movement is desired
}


export interface TrailSegment extends Position {
  opacity: number;
}

export interface Player extends Position {
  trail: TrailSegment[];
  hasKey: boolean;
}

export interface MazeCell {
  isWall: boolean;
  isPath: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isKey?: boolean;
  isPlayer?: boolean;
  isHunter?: boolean; // Tile-based hunter marker
}

export type MazeGrid = MazeCell[][];

export interface Controls {
  up: string[];
  down: string[];
  left: string[];
  right: string[];
}

export interface HighscoreEntry {
  mode: GameMode;
  size: number;
  time: number;
  date: number;
}

export enum PlayerCoreShape {
  CIRCLE = 'CIRCLE',
  HEXAGON = 'HEXAGON',
  TRIANGLE = 'TRIANGLE',
  SQUARE = 'SQUARE',
  DIAMOND = 'DIAMOND',
}

export enum PlayerTrailStyle {
  DOTS = 'DOTS',
  LINE = 'LINE',
  // Future potential styles:
  // SPARKLE = 'SPARKLE',
  // PULSE = 'PULSE',
}

// PlayerSkin definition - this will now primarily represent the *assembled* skin.
export interface PlayerSkin {
  id: string; // Will typically be CUSTOM_SKIN_ID
  name: string;
  description?: string;
  playerColor: string; // Hex string
  trailColorBase: string; // "R, G, B" string
  previewBg: string; // Tailwind class or inline style for preview background
  coreShape: PlayerCoreShape;
  trailStyle: PlayerTrailStyle;
}

// Components for the Kryst Assembler
export interface AuraPalette {
  id: string;
  name: string;
  playerColor: string; // Hex string
  trailColorBase: string; // "R, G, B" string
  previewSwatchStyle?: React.CSSProperties; // For UI display
  unlockDescription?: string; // e.g., "Complete Level X"
}

export interface CoreMatrixItem {
  id: PlayerCoreShape; // The enum value itself is the ID
  name: string; // e.g., "Orb Core", "Vector Tri-Core"
  unlockDescription?: string;
}

export interface TrailSignatureItem {
  id: PlayerTrailStyle; // The enum value itself is the ID
  name: string; // e.g., "Particle Dots", "Solid Stream"
  unlockDescription?: string;
}

// Structure to store the player's selected custom assembly
export interface SelectedCustomAssembly {
  paletteId: string;
  coreShapeId: PlayerCoreShape;
  trailStyleId: PlayerTrailStyle;
}


export interface Level {
  id: number;
  name: string;
  description: string;
  mazeDefinition: string[];
  width: number;
  height: number;
  timeLimit?: number; // Optional time limit in seconds
  unlocksAuraPaletteId?: string; // For unlocking an AuraPalette
  unlocksCoreMatrixId?: PlayerCoreShape; // For unlocking a CoreMatrix
  unlocksTrailSignatureId?: PlayerTrailStyle; // For unlocking a TrailSignature
  hunterMovementType?: 'tile' | 'continuous'; 
  hunterPhasesThroughWalls?: boolean; 
  isDashLevel?: boolean; // New: If true, movement uses Dash logic
  isDarknessLevel?: boolean; // New: If true, applies Darkness visual effect
  controlScheme?: 'normal' | 'mirrored'; // New: For mirrored controls
}


export interface UnlockedItem {
  type: 'aura_palette' | 'core_matrix' | 'trail_signature'; // 'skin' type removed
  name: string;
  id: string; // For palettes, this is their string ID. For matrix/trail, it's the enum value.
}

export interface ParsedLevelData {
  grid: MazeGrid;
  start: Position;
  end: Position;
  keyPos?: Position;
  hunterStartPositions?: Position[]; // Grid positions for hunter initialization
}

export interface MazeCanvasPropsBase {
  maze: MazeGrid;
  player: Player;
  startPos: Position;
  endPos: Position;
  keyPos?: Position;
  hunters?: HunterPosition[];
  gameMode: GameMode; // Overall mode like DARKNESS, or NORMAL (can be overridden by level specific)
  cellSize: number;
  canvasWidth: number;
  canvasHeight: number;
  selectedPlayerSkin: PlayerSkin;
  // Level specific visual modifiers
  currentLevelHunterMovementType?: 'tile' | 'continuous';
  currentLevelPhasesThroughWalls?: boolean; // Added for distinct hunter visuals
}


export enum SoundEffect {
  PLAYER_MOVE = 'PLAYER_MOVE',
  PLAYER_DASH = 'PLAYER_DASH',
  WALL_BUMP = 'WALL_BUMP',
  KEY_COLLECT = 'KEY_COLLECT',
  GAME_WIN = 'GAME_WIN',
  GAME_LOSE = 'GAME_LOSE',
  LEVEL_START = 'LEVEL_START',
  BUTTON_CLICK = 'BUTTON_CLICK',
  BUTTON_CLICK_SECONDARY = 'BUTTON_CLICK_SECONDARY',
  SKIN_SELECT = 'SKIN_SELECT', // Used for selecting assembler components
  SKIN_EQUIP = 'SKIN_EQUIP', // Used for equipping assembled signature
  SCREEN_TRANSITION = 'SCREEN_TRANSITION',
  TIME_TICK_LOW = 'TIME_TICK_LOW',
  TIME_UP = 'TIME_UP',
  HUNTER_MOVE_CONTINUOUS = 'HUNTER_MOVE_CONTINUOUS', // Optional: new sound for continuous hunter
}

// For Level Editor
export enum EditorTool {
  WALL = 'WALL',
  PATH = 'PATH',
  START = 'START',
  END = 'END',
  KEY = 'KEY',
  HUNTER = 'HUNTER',
  ERASER = 'ERASER', // Essentially sets to PATH
}

export interface EditorGridCell extends MazeCell {
  // Editor specific properties can be added if needed
}

export type EditorGrid = EditorGridCell[][];
