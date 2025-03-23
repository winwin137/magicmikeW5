import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Program, CutAmount } from '../types';

export const initialPrograms: Program[] = [
  { id: 'medicaid', name: 'Medicaid', budget: 561, isUntouchable: true, description: 'Centers for Medicare and Medicaid Services' },
  { id: 'chip', name: 'CHIP', budget: 17, description: 'Children\'s Health Insurance Program' },
  { id: 'cdc', name: 'CDC', budget: 8.1, description: 'Centers for Disease Control and Prevention' },
  { id: 'fda', name: 'FDA', budget: 6.5, description: 'Food and Drug Administration' },
  { id: 'doe', name: 'DOE', budget: 44.7, description: 'Department of Energy' },
  { id: 'epa', name: 'EPA', budget: 9.2, description: 'Environmental Protection Agency' },
  { id: 'fcc', name: 'FCC', budget: 0.388, description: 'Federal Communications Commission' },
  { id: 'ntia', name: 'NTIA', budget: 0.072, description: 'National Telecommunications and Information Administration' },
  { id: 'ftc', name: 'FTC', budget: 0.43, description: 'Federal Trade Commission' },
];

const initialState: GameState = {
  programs: initialPrograms,
  targetCuts: 88,
  currentCuts: 0,
  timeRemaining: 60,
  isGameStarted: false,
  isGameOver: false,
  hasWon: false,
  isSoundEnabled: true,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameOver = false;
      state.hasWon = false;
      state.currentCuts = 0;
      state.timeRemaining = 60;
      state.programs = initialPrograms;
    },
    toggleMedicaidProtection: (state) => {
      try {
        const medicaid = state.programs.find(p => p.id === 'medicaid');
        if (medicaid) {
          medicaid.isUntouchable = false;
          console.log('Medicaid protection toggled off');
        } else {
          console.error('Medicaid program not found');
        }
      } catch (error) {
        console.error('Error in toggleMedicaidProtection:', error);
      }
    },
    cutBudget: (state, action: PayloadAction<{ programId: string; amount: CutAmount }>) => {
      try {
        const program = state.programs.find(p => p.id === action.payload.programId);
        if (!program) {
          console.error(`Program with ID ${action.payload.programId} not found`);
          return;
        }

        if (program.isUntouchable) {
          console.warn(`Attempted to cut untouchable program: ${program.name}`);
          return;
        }

        // Precise rounding to handle floating point issues
        const roundToThreeDecimals = (num: number) => Math.round(num * 1000) / 1000;

        let cut: number = action.payload.amount;
        
        // Special handling for programs with less than 1B budget
        if (program.budget < 1 && action.payload.amount === 1) {
          cut = roundToThreeDecimals(program.budget);
        } else {
          cut = roundToThreeDecimals(Math.min(action.payload.amount, program.budget));
        }
        
        // Special handling for Medicaid to only cut what's needed to reach $88B exactly
        if (program.id === 'medicaid') {
          const remainingNeeded = roundToThreeDecimals(state.targetCuts - state.currentCuts);
          console.log(`Medicaid cut - Remaining needed: ${remainingNeeded}, Current budget: ${program.budget}`);
          
          if (remainingNeeded > 0) {
            cut = roundToThreeDecimals(Math.min(cut, remainingNeeded));
          } else {
            cut = 0; // Already at or above $88B, don't cut more
          }
        }
        
        program.budget = roundToThreeDecimals(program.budget - cut);
        state.currentCuts = roundToThreeDecimals(state.currentCuts + cut);
        
        // Auto-zero if less than 0.001B remaining
        if (program.budget > 0 && program.budget < 0.001) {
          state.currentCuts = roundToThreeDecimals(state.currentCuts + program.budget);
          program.budget = 0;
        }

        console.log(`Cut ${cut}B from ${program.name}. New budget: ${program.budget}B`);
      } catch (error) {
        console.error('Error in cutBudget:', error);
      }
    },
    updateTimer: (state) => {
      if (state.isGameStarted && !state.isGameOver) {
        state.timeRemaining -= 1;
        if (state.timeRemaining <= 0) {
          state.isGameOver = true;
          state.hasWon = false;
        }
      }
    },
    checkWinCondition: (state) => {
      if (state.currentCuts >= state.targetCuts) {
        state.isGameOver = true;
        state.hasWon = true;
      }
    },
    toggleSound: (state) => {
      state.isSoundEnabled = !state.isSoundEnabled;
    },
  },
});

export const { startGame, toggleMedicaidProtection, cutBudget, updateTimer, checkWinCondition, toggleSound } = gameSlice.actions;
export default gameSlice.reducer; 