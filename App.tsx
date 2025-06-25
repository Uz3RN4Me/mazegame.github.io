import React, { useState, useEffect, useCallback } from 'react';
import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';
import SettingsScreen from './components/SettingsScreen';
import WinScreen from './components/WinScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import SkinCustomizationScreen from './components/SkinCustomizationScreen';
import LevelEditorScreen from './components/LevelEditorScreen'; // Import LevelEditorScreen
import { Screen, GameMode, Controls, HighscoreEntry, Level, PlayerSkin, UnlockedItem, SoundEffect, AuraPalette, CoreMatrixItem, TrailSignatureItem, SelectedCustomAssembly, PlayerCoreShape, PlayerTrailStyle } from './types';
import {
    LOCAL_STORAGE_KEYS, INITIAL_CONTROLS, THEME_COLORS, CUSTOM_SKIN_ID,
    AURA_PALETTES, CORE_MATRIX_ITEMS, TRAIL_SIGNATURE_ITEMS,
    DEFAULT_AURA_PALETTE_ID, DEFAULT_CORE_MATRIX_ID, DEFAULT_TRAIL_SIGNATURE_ID,
    DEFAULT_CUSTOM_ASSEMBLY
} from './constants';
import { loadFromLocalStorage, saveToLocalStorage } from './lib/localStorage';
import { LEVELS_DATA } from './lib/levelData';
import { playSound, preloadSounds } from './lib/soundManager';

console.log('[App.tsx] File loaded, App component defined.');

const App: React.FC = () => {
  console.log('[App.tsx] App component rendering/initializing...');
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.MENU);
  const [gameSettings, setGameSettings] = useState<{ mode: GameMode; sizeOrLevelId: number }>({
    mode: GameMode.NORMAL,
    sizeOrLevelId: 15,
  });
  const [lastGameResult, setLastGameResult] = useState<{
    time: number;
    isNewHighscore: boolean;
    bestTime?: number;
    newlyUnlockedItem?: UnlockedItem;
  } | null>(null);

  const [controls, setControls] = useState<Controls>(() => {
    console.log('[App.tsx] Initializing controls state from localStorage.');
    return loadFromLocalStorage<Controls>(LOCAL_STORAGE_KEYS.CONTROLS, INITIAL_CONTROLS);
  });
  const [highscores, setHighscores] = useState<HighscoreEntry[]>(() => {
    console.log('[App.tsx] Initializing highscores state from localStorage.');
    return loadFromLocalStorage<HighscoreEntry[]>(LOCAL_STORAGE_KEYS.HIGHSCORES, []);
  });

  const [levelProgress, setLevelProgress] = useState<{ [levelId: number]: { completed: boolean; bestTime?: number } }>(() => {
    console.log('[App.tsx] Initializing levelProgress state from localStorage.');
    return loadFromLocalStorage<{ [levelId: number]: { completed: boolean; bestTime?: number } }>(LOCAL_STORAGE_KEYS.LEVEL_PROGRESS, {});
  });
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<number>(() => {
    console.log('[App.tsx] Initializing maxUnlockedLevel state from localStorage.');
    return loadFromLocalStorage<number>(LOCAL_STORAGE_KEYS.MAX_UNLOCKED_LEVEL, 1);
  });

  // Unlocked Kryst Assembler Components
  const [unlockedAuraPaletteIds, setUnlockedAuraPaletteIds] = useState<string[]>(() =>
    loadFromLocalStorage<string[]>(LOCAL_STORAGE_KEYS.UNLOCKED_AURA_PALETTE_IDS, [DEFAULT_AURA_PALETTE_ID])
  );
  const [unlockedCoreMatrixIds, setUnlockedCoreMatrixIds] = useState<PlayerCoreShape[]>(() =>
    loadFromLocalStorage<PlayerCoreShape[]>(LOCAL_STORAGE_KEYS.UNLOCKED_CORE_MATRIX_IDS, [DEFAULT_CORE_MATRIX_ID])
  );
  const [unlockedTrailSignatureIds, setUnlockedTrailSignatureIds] = useState<PlayerTrailStyle[]>(() =>
    loadFromLocalStorage<PlayerTrailStyle[]>(LOCAL_STORAGE_KEYS.UNLOCKED_TRAIL_SIGNATURE_IDS, [DEFAULT_TRAIL_SIGNATURE_ID])
  );

  // Player's current assembly for their custom skin
  const [selectedCustomAssembly, setSelectedCustomAssembly] = useState<SelectedCustomAssembly>(() =>
    loadFromLocalStorage<SelectedCustomAssembly>(LOCAL_STORAGE_KEYS.SELECTED_CUSTOM_ASSEMBLY, DEFAULT_CUSTOM_ASSEMBLY)
  );

  useEffect(() => { 
    console.log('[App.tsx] Running preloadSounds effect.');
    try {
      preloadSounds(); 
      console.log('[App.tsx] preloadSounds finished.');
    } catch (e) {
      console.error('[App.tsx] Error during preloadSounds:', e);
    }
  }, []);

  useEffect(() => { saveToLocalStorage<Controls>(LOCAL_STORAGE_KEYS.CONTROLS, controls); }, [controls]);
  useEffect(() => { saveToLocalStorage<HighscoreEntry[]>(LOCAL_STORAGE_KEYS.HIGHSCORES, highscores); }, [highscores]);
  useEffect(() => { saveToLocalStorage(LOCAL_STORAGE_KEYS.LEVEL_PROGRESS, levelProgress); }, [levelProgress]);
  useEffect(() => { saveToLocalStorage<number>(LOCAL_STORAGE_KEYS.MAX_UNLOCKED_LEVEL, maxUnlockedLevel); }, [maxUnlockedLevel]);
  
  useEffect(() => { saveToLocalStorage<string[]>(LOCAL_STORAGE_KEYS.UNLOCKED_AURA_PALETTE_IDS, unlockedAuraPaletteIds); }, [unlockedAuraPaletteIds]);
  useEffect(() => { saveToLocalStorage<PlayerCoreShape[]>(LOCAL_STORAGE_KEYS.UNLOCKED_CORE_MATRIX_IDS, unlockedCoreMatrixIds); }, [unlockedCoreMatrixIds]);
  useEffect(() => { saveToLocalStorage<PlayerTrailStyle[]>(LOCAL_STORAGE_KEYS.UNLOCKED_TRAIL_SIGNATURE_IDS, unlockedTrailSignatureIds); }, [unlockedTrailSignatureIds]);
  
  useEffect(() => { saveToLocalStorage<SelectedCustomAssembly>(LOCAL_STORAGE_KEYS.SELECTED_CUSTOM_ASSEMBLY, selectedCustomAssembly);}, [selectedCustomAssembly]);


  const changeScreen = (screen: Screen) => {
    playSound(SoundEffect.SCREEN_TRANSITION, 0.4);
    setCurrentScreen(screen);
  };

  const handleStartGame = (mode: GameMode, sizeOrLevelId: number) => {
    playSound(SoundEffect.BUTTON_CLICK);
    setGameSettings({ mode, sizeOrLevelId });
    changeScreen(Screen.GAME);
  };

  const handleSelectLevelMode = () => {
    playSound(SoundEffect.BUTTON_CLICK);
    changeScreen(Screen.LEVEL_SELECT);
  };

  const handleStartLevel = (levelId: number) => {
    if (levelId <= maxUnlockedLevel) {
      playSound(SoundEffect.BUTTON_CLICK);
      handleStartGame(GameMode.LEVELS, levelId);
    } else {
      playSound(SoundEffect.WALL_BUMP);
      changeScreen(Screen.LEVEL_SELECT);
    }
  };

  const handleSaveControls = (newControls: Controls) => {
    playSound(SoundEffect.BUTTON_CLICK);
    setControls(newControls);
  };

  // Saves and equips the player's assembled Kryst Signature
  const handleSaveSelectedAssembly = (newAssembly: SelectedCustomAssembly) => {
    setSelectedCustomAssembly(newAssembly);
    playSound(SoundEffect.SKIN_EQUIP);
    changeScreen(Screen.MENU); // Player's skin is now this new assembly
  };


  const handleSaveLevelProgress = useCallback((levelId: number, time: number, levelData?: Level): UnlockedItem | undefined => {
    let newlyUnlockedComponentThisWin: UnlockedItem | undefined;
    let soundPlayedForUnlock = false;

    setLevelProgress(prev => {
      const currentBest = prev[levelId]?.bestTime;
      const newBestTime = (!currentBest || time < currentBest) ? time : currentBest;
      return { ...prev, [levelId]: { completed: true, bestTime: newBestTime } };
    });

    if (levelId === maxUnlockedLevel && levelId < LEVELS_DATA.length) {
      setMaxUnlockedLevel(levelId + 1);
    }

    // Check for Aura Palette unlock
    if (levelData?.unlocksAuraPaletteId && !unlockedAuraPaletteIds.includes(levelData.unlocksAuraPaletteId)) {
      setUnlockedAuraPaletteIds(prev => [...new Set([...prev, levelData.unlocksAuraPaletteId!])]);
      const paletteMeta = AURA_PALETTES.find(p => p.id === levelData.unlocksAuraPaletteId);
      if (paletteMeta && !newlyUnlockedComponentThisWin) { 
        newlyUnlockedComponentThisWin = { type: 'aura_palette', id: paletteMeta.id, name: paletteMeta.name };
        if (!soundPlayedForUnlock) {
            playSound(SoundEffect.SKIN_EQUIP); // Using SKIN_EQUIP for component unlocks too
            soundPlayedForUnlock = true;
        }
      }
    }
    // Check for Core Matrix unlock
    if (levelData?.unlocksCoreMatrixId && !unlockedCoreMatrixIds.includes(levelData.unlocksCoreMatrixId)) {
      setUnlockedCoreMatrixIds(prev => [...new Set([...prev, levelData.unlocksCoreMatrixId!])]);
      const matrixMeta = CORE_MATRIX_ITEMS.find(m => m.id === levelData.unlocksCoreMatrixId);
      if (matrixMeta && !newlyUnlockedComponentThisWin) {
        newlyUnlockedComponentThisWin = { type: 'core_matrix', id: matrixMeta.id, name: matrixMeta.name };
         if (!soundPlayedForUnlock) {
            playSound(SoundEffect.SKIN_EQUIP);
            soundPlayedForUnlock = true;
        }
      }
    }
    // Check for Trail Signature unlock
    if (levelData?.unlocksTrailSignatureId && !unlockedTrailSignatureIds.includes(levelData.unlocksTrailSignatureId)) {
      setUnlockedTrailSignatureIds(prev => [...new Set([...prev, levelData.unlocksTrailSignatureId!])]);
      const trailMeta = TRAIL_SIGNATURE_ITEMS.find(t => t.id === levelData.unlocksTrailSignatureId);
      if (trailMeta && !newlyUnlockedComponentThisWin) {
        newlyUnlockedComponentThisWin = { type: 'trail_signature', id: trailMeta.id, name: trailMeta.name };
        if (!soundPlayedForUnlock) {
            playSound(SoundEffect.SKIN_EQUIP);
        }
      }
    }
    
    return newlyUnlockedComponentThisWin;
  }, [maxUnlockedLevel, unlockedAuraPaletteIds, unlockedCoreMatrixIds, unlockedTrailSignatureIds]);


  const handleGameWin = useCallback((time: number, mode: GameMode, sizeOrLevelId: number, currentLevelData?: Level) => {
    let isNewHighscore = false;
    let overallBestTime: number | undefined;
    let unlockedItemForThisWin: UnlockedItem | undefined = undefined;

    if (mode === GameMode.LEVELS && currentLevelData) {
      unlockedItemForThisWin = handleSaveLevelProgress(currentLevelData.id, time, currentLevelData);
      // Determine if it's a new highscore for the level
      const progressToCheck = loadFromLocalStorage<{ [levelId: number]: { completed: boolean; bestTime?: number } }>(LOCAL_STORAGE_KEYS.LEVEL_PROGRESS, {});
      overallBestTime = progressToCheck[currentLevelData.id]?.bestTime;
      isNewHighscore = (overallBestTime === time); // If saved time is the current time, it's new/updated best

    } else { // Non-level modes
      const existingHighscore = highscores
        .filter(hs => hs.mode === mode && hs.size === sizeOrLevelId)
        .sort((a,b) => a.time - b.time)[0];
      overallBestTime = existingHighscore?.time;
      if (!existingHighscore || time < existingHighscore.time) {
        isNewHighscore = true;
        const newHighscoreEntry: HighscoreEntry = { mode, size: sizeOrLevelId, time, date: Date.now() };
        setHighscores(prev => [...prev.filter(hs => !(hs.mode === mode && hs.size === sizeOrLevelId)), newHighscoreEntry]
                            .sort((a,b) => a.time - b.time).slice(0, 10)); // Keep top 10
        overallBestTime = time; // Update overallBestTime to the new highscore
      }
      unlockedItemForThisWin = undefined; // No component unlocks for non-level modes
    }

    setLastGameResult({ time, isNewHighscore, bestTime: overallBestTime, newlyUnlockedItem: unlockedItemForThisWin });
    changeScreen(Screen.WIN);
  }, [highscores, handleSaveLevelProgress]);


  const handleReplay = () => {
    playSound(SoundEffect.BUTTON_CLICK);
    changeScreen(Screen.GAME);
  };

  const handleUnlockAllLevels = useCallback(() => { // Cheat/Dev function
    setMaxUnlockedLevel(LEVELS_DATA.length);
    setUnlockedAuraPaletteIds(AURA_PALETTES.map(p => p.id));
    setUnlockedCoreMatrixIds(CORE_MATRIX_ITEMS.map(m => m.id));
    setUnlockedTrailSignatureIds(TRAIL_SIGNATURE_ITEMS.map(t => t.id));
  }, []);

  const getActivePlayerSkin = (): PlayerSkin => {
    const palette = AURA_PALETTES.find(p => p.id === selectedCustomAssembly.paletteId) || AURA_PALETTES.find(p => p.id === DEFAULT_AURA_PALETTE_ID)!;
    // CoreMatrixItem's id is PlayerCoreShape, TrailSignatureItem's id is PlayerTrailStyle
    const coreShape = selectedCustomAssembly.coreShapeId; 
    const trailStyle = selectedCustomAssembly.trailStyleId;

    return {
      id: CUSTOM_SKIN_ID, // Player's skin is always the custom assembled one
      name: 'Assembled Kryst Signature',
      description: 'A Kryst-Core energy pattern assembled by the Code-Breaker.',
      playerColor: palette.playerColor,
      trailColorBase: palette.trailColorBase,
      previewBg: `radial-gradient(ellipse at center, ${palette.playerColor}33 0%, ${THEME_COLORS.inputBg.replace('bg-','')} 70%)`, // Example dynamic preview background
      coreShape: coreShape,
      trailStyle: trailStyle,
    };
  };

  const renderScreen = () => {
    console.log(`[App.tsx] Rendering screen: ${currentScreen}`);
    const activeSkin = getActivePlayerSkin(); // Get the current skin object once
    switch (currentScreen) {
      case Screen.MENU:
        return <MenuScreen
                  onSetScreen={changeScreen}
                  onStartGame={handleStartGame}
                  onSelectLevelMode={handleSelectLevelMode}
                  controls={controls}
                />;
      case Screen.GAME:
        return (
          <GameScreen
            mode={gameSettings.mode}
            sizeOrLevelId={gameSettings.sizeOrLevelId}
            controls={controls}
            highscores={highscores}
            levelProgress={levelProgress}
            selectedPlayerSkinId={activeSkin.id} 
            activePlayerSkin={activeSkin} // Pass the full skin object
            onSetScreen={changeScreen}
            onGameWin={handleGameWin}
            onSaveLevelProgress={handleSaveLevelProgress}
          />
        );
      case Screen.SETTINGS:
        return (
            <SettingsScreen
                onSetScreen={changeScreen}
                initialControls={controls}
                onSaveControls={handleSaveControls}
            />
        );
      case Screen.SKIN_CUSTOMIZATION: // This is now the Kryst Assembler
        return (
            <SkinCustomizationScreen
                onSetScreen={changeScreen}
                unlockedAuraPaletteIds={unlockedAuraPaletteIds}
                unlockedCoreMatrixIds={unlockedCoreMatrixIds}
                unlockedTrailSignatureIds={unlockedTrailSignatureIds}
                currentAssembly={selectedCustomAssembly}
                onSaveSelectedAssembly={handleSaveSelectedAssembly}
                controls={controls}
            />
        );
      case Screen.WIN:
        if (!lastGameResult) {
            console.warn('[App.tsx] WinScreen called without lastGameResult, redirecting to MENU.');
            changeScreen(Screen.MENU);
            return null;
        }
        return (
          <WinScreen
            time={lastGameResult.time}
            mode={gameSettings.mode}
            sizeOrLevelId={gameSettings.sizeOrLevelId}
            isNewHighscore={lastGameResult.isNewHighscore}
            bestTime={lastGameResult.bestTime}
            newlyUnlockedItem={lastGameResult.newlyUnlockedItem}
            maxUnlockedLevel={maxUnlockedLevel}
            onSetScreen={changeScreen}
            onReplay={handleReplay}
            onStartLevel={handleStartLevel}
            controls={controls}
          />
        );
      case Screen.LEVEL_SELECT:
        return (
            <LevelSelectScreen
                onSetScreen={changeScreen}
                onStartLevel={handleStartLevel}
                levelProgress={levelProgress}
                maxUnlockedLevel={maxUnlockedLevel}
                controls={controls}
                onUnlockAllLevels={handleUnlockAllLevels}
            />
        );
      case Screen.LEVEL_EDITOR: // Add case for LevelEditorScreen
        return (
            <LevelEditorScreen
                onSetScreen={changeScreen}
                controls={controls}
            />
        );
      default:
        console.warn(`[App.tsx] Unknown screen: ${currentScreen}, defaulting to MENU.`);
        return <MenuScreen
                  onSetScreen={changeScreen}
                  onStartGame={handleStartGame}
                  onSelectLevelMode={handleSelectLevelMode}
                  controls={controls}
                />;
    }
  };

  return <div className={`w-screen h-screen overflow-hidden ${THEME_COLORS.background} font-body`}>{renderScreen()}</div>;
};

export default App;