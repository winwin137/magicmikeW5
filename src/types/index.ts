export interface Program {
  id: string;
  name: string;
  budget: number;
  isUntouchable?: boolean;
  description?: string;
}

export interface GameState {
  programs: Program[];
  targetCuts: number;
  currentCuts: number;
  timeRemaining: number;
  isGameStarted: boolean;
  isGameOver: boolean;
  hasWon: boolean;
  isSoundEnabled: boolean;
}

export type CutAmount = 1 | 10;

export interface GameSettings {
  initialTime: number;
  targetCuts: number;
} 