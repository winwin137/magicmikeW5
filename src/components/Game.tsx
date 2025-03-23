import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howl, Howler } from 'howler';
import { motion, AnimatePresence } from 'framer-motion';

// Import media assets
import clockTickingSound from '../assets/sounds/clock-tick-101150.mp3';
import buttonPressSound from '../assets/sounds/button-press.mp3';
import crowdCheerSound from '../assets/sounds/crowd-cheer.mp3';
import crowdAwwSound from '../assets/sounds/crowd-aww.mp3';
import sketchyMikeVideo from '../assets/videos/sketchy-mike.mov';
import challengeVideo from '../assets/videos/challenge.mov';

import {
  startGame,
  cutBudget,
  updateTimer,
  checkWinCondition,
  toggleSound,
  toggleMedicaidProtection,
  initialPrograms,
} from '../store/gameSlice';
import type { RootState } from '../store';
import type { Program, CutAmount } from '../types';
import {
  GameContainer,
  GameContent,
  MainContent,
  ScrollContainer,
  Header,
  HeaderContent,
  MediaRow,
  VideoContainer,
  MikeVideo,
  TitleSection,
  Title,
  Subtitle,
  Timer,
  ProgramGrid,
  Footer,
  ProgramTile,
  ProgramName,
  ProgramBudget,
  ButtonContainer,
  CutButton,
  ProgressBarContainer,
  ProgressBar,
  Modal,
  Overlay,
  ControlButton,
  BillionaireBanner,
  RightJustifiedCutsInfo,
  CommitteeText,
  DefundedOverlay,  // Add this line
} from '../styles/GameStyles';

// Sound effects
const sounds = {
  tick: new Howl({ 
    src: [clockTickingSound], 
    volume: 0.8,
    html5: true,
    preload: true,
    onload: () => console.log('Tick sound loaded successfully'),
    onloaderror: (id, err) => console.error('Error loading tick sound:', err),
    onplayerror: (id, err) => console.error('Error playing tick sound:', err)
  }),
  cut: new Howl({ 
    src: [buttonPressSound], 
    volume: 0.8,
    html5: true,
    preload: true,
    onload: () => console.log('Button sound loaded successfully'),
    onloaderror: (id, err) => console.error('Error loading button sound:', err),
    onplayerror: (id, err) => console.error('Error playing button sound:', err)
  }),
  win: new Howl({ 
    src: [crowdCheerSound], 
    volume: 0.8,
    html5: true,
    preload: true,
    onload: () => console.log('Win sound loaded successfully'),
    onloaderror: (id, err) => console.error('Error loading win sound:', err),
    onplayerror: (id, err) => console.error('Error playing win sound:', err)
  }),
  lose: new Howl({ 
    src: [crowdAwwSound], 
    volume: 0.8,
    html5: true,
    preload: true,
    onload: () => console.log('Lose sound loaded successfully'),
    onloaderror: (id, err) => console.error('Error loading lose sound:', err),
    onplayerror: (id, err) => console.error('Error playing lose sound:', err)
  }),
  warning: new Howl({ 
    src: [buttonPressSound], 
    volume: 0.8,
    html5: true,
    preload: true,
    onload: () => console.log('Warning sound loaded successfully'),
    onloaderror: (id, err) => console.error('Error loading warning sound:', err),
    onplayerror: (id, err) => console.error('Error playing warning sound:', err)
  }),
};

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const medicaidTileRef = useRef<HTMLDivElement>(null);

  const {
    programs,
    currentCuts,
    targetCuts,
    timeRemaining,
    isGameStarted,
    isGameOver,
    hasWon,
    isSoundEnabled,
  } = useSelector((state: RootState) => state.game);

  // Update video source when game starts and manage sound
  useEffect(() => {
    if (videoRef.current) {
      if (isGameStarted) {
        videoRef.current.src = sketchyMikeVideo;
        videoRef.current.muted = true; // Keep muted during game
      } else {
        videoRef.current.src = challengeVideo;
        videoRef.current.muted = !isSoundEnabled; // Respect sound setting for challenge video
      }
      videoRef.current.load();
      videoRef.current.play().catch(err => console.error('Error playing video:', err));
    }
  }, [isGameStarted, isSoundEnabled]);

  // Manage video sound based on game sound setting
  useEffect(() => {
    if (videoRef.current) {
      // Only apply to challenge video (when not in game)
      if (!isGameStarted) {
        videoRef.current.muted = !isSoundEnabled;
      } else {
        videoRef.current.muted = true; // Always mute sketchy-mike during game
      }
    }
  }, [isSoundEnabled, isGameStarted]);

  const handleStartGame = () => {
    // Try to unlock audio context first
    if (Howler.ctx && Howler.ctx.state !== 'running') {
      Howler.ctx.resume().then(() => {
        console.log('AudioContext resumed on game start');
      });
    }
    
    // If video is playing, pause it before starting game
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    dispatch(startGame());
    if (isSoundEnabled) {
      // Play a silent sound first to unlock audio on iOS/Safari
      const silentSound = new Howl({ src: [buttonPressSound], volume: 0.01 });
      silentSound.play();
      
      // Wait a small delay before playing the actual game sounds
      setTimeout(() => {
        sounds.tick.play();
        sounds.tick.loop(true);
      }, 100);
    }
  };

  const handleCutBudget = useCallback((programId: string, amount: CutAmount) => {
    // Start the game automatically if it hasn't started yet
    if (!isGameStarted && !isGameOver) {
      handleStartGame();
      // Small delay to ensure game is started before making the cut
      setTimeout(() => {
        dispatch(cutBudget({ programId, amount }));
        dispatch(checkWinCondition());
        if (isSoundEnabled) sounds.cut.play();
      }, 100);
      return;
    }
    
    if (isGameOver) return;
    
    const program = programs.find(p => p.id === programId);
    const initialBudget = initialPrograms.find(p => p.id === programId)?.budget || 0;
    const currentBudget = program?.budget || 0;
    
    dispatch(cutBudget({ programId, amount }));
    dispatch(checkWinCondition());
    
    // Check if cut will deplete the program entirely
    if (program && isSoundEnabled) {
      if (currentBudget <= amount && currentBudget > 0) {
        // Program will be depleted
        sounds.lose.play();
        console.log(`Program ${program.name} has been depleted!`);
      } else {
        // Normal cut sound
        sounds.cut.play();
      }
    }
  }, [dispatch, isGameStarted, isGameOver, isSoundEnabled, programs, handleStartGame]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isGameStarted && !isGameOver) {
      timer = setInterval(() => {
        dispatch(updateTimer());
        if (isSoundEnabled && timeRemaining <= 10) sounds.warning.play();
      }, 1000);
    }
    return () => {
      clearInterval(timer);
      sounds.tick.stop();
    };
  }, [isGameStarted, isGameOver, dispatch, timeRemaining, isSoundEnabled]);

  useEffect(() => {
    if (isGameOver && isSoundEnabled) {
      sounds.tick.stop();
      if (hasWon) {
        sounds.win.play();
      } else {
        sounds.lose.play();
      }
      
      // Reset to challenge video when game ends
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = !isSoundEnabled; // Respect sound setting
        }
      }, 1000); // Small delay to let win/lose sound play first
    }
  }, [isGameOver, hasWon, isSoundEnabled]);

  const testSound = () => {
    console.log('Testing all sounds...');
    // Create and play a silent sound to unlock audio on iOS/Safari
    const unlockAudio = () => {
      const audioContext = Howler.ctx;
      if (audioContext && audioContext.state !== 'running') {
        audioContext.resume().then(() => {
          console.log('AudioContext resumed successfully');
        });
      }
      
      // Create a silent sound and play it
      const silentSound = new Howl({ src: [buttonPressSound], volume: 0.01 });
      silentSound.play();
      
      // Play all sounds in sequence with delays
      if (isSoundEnabled) {
        // Button press sound
        setTimeout(() => {
          sounds.cut.play();
          console.log('► Playing: Button press sound');
        }, 500);
        
        // Clock ticking sound (play briefly)
        setTimeout(() => {
          sounds.tick.play();
          console.log('► Playing: Clock ticking sound');
          
          // Stop the ticking after 2 seconds
          setTimeout(() => {
            sounds.tick.stop();
          }, 2000);
        }, 2000);
        
        // Warning sound
        setTimeout(() => {
          sounds.warning.play();
          console.log('► Playing: Warning sound');
        }, 4500);
        
        // Crowd aww sound (depleted program)
        setTimeout(() => {
          sounds.lose.play();
          console.log('► Playing: Crowd aww sound (depleted program)');
        }, 6000);
        
        // Crowd cheer sound (win)
        setTimeout(() => {
          sounds.win.play();
          console.log('► Playing: Crowd cheer sound (win)');
        }, 8000);
        
      } else {
        console.log('Sound is disabled. Enable sound first.');
      }
    };
    
    // Call the unlock function
    unlockAudio();
  };

  const handleToggleMedicaidProtection = () => {
    dispatch(toggleMedicaidProtection());
    
    // Scroll to Medicaid tile if it exists
    if (medicaidTileRef.current) {
      // Smooth scroll that preserves sticky header position
      medicaidTileRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const renderProgram = (program: Program) => {
    const initialBudget = initialPrograms.find(p => p.id === program.id)?.budget || 0;
    const percentageCut = ((initialBudget - program.budget) / initialBudget * 100).toFixed(0);
    const [showPercentage, setShowPercentage] = useState(false);
    const isDefunded = program.budget === 0;

    const handleButtonClick = (amount: number) => {
      handleCutBudget(program.id, amount);
      setShowPercentage(true);
    };

    return (
      <ProgramTile 
        key={program.id}
        ref={program.id === 'medicaid' ? medicaidTileRef : null}
        $isUntouchable={program.isUntouchable}
        $isDefunded={isDefunded}
        $abbreviation={program.abbreviation}
        whileHover={!program.isUntouchable && !isDefunded ? { scale: 1.02 } : {}}
        whileTap={!program.isUntouchable && !isDefunded ? { scale: 0.98 } : {}}
      >
        {isDefunded && (
          <DefundedOverlay 
            $abbreviation={program.abbreviation} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 10 
            }} 
          />
        )}
        <ProgramName $isUntouchable={program.isUntouchable}>
          <span style={{ fontSize: '1.2em' }}>{program.name}</span>
          <br />
          <span style={{ fontSize: '0.9em', opacity: 0.9 }}>{program.description}</span>
        </ProgramName>
        <ProgramBudget $isUntouchable={program.isUntouchable}>
          ${program.budget.toFixed(1)}B
          {showPercentage && percentageCut !== '0' && (
            <span style={{ color: '#bf0a30', marginLeft: '0.5rem' }}>
              -{percentageCut}%
            </span>
          )}
        </ProgramBudget>
        <ButtonContainer>
          <CutButton
            $amount={10}
            onClick={() => handleButtonClick(10)}
            disabled={program.isUntouchable || isDefunded || (isGameOver && !isGameStarted)}
          >
            -$10B
          </CutButton>
          <CutButton
            $amount={1}
            onClick={() => handleButtonClick(1)}
            disabled={program.isUntouchable || isDefunded || (isGameOver && !isGameStarted)}
          >
            -$1B
          </CutButton>
        </ButtonContainer>
      </ProgramTile>
    );
  };

  return (
    <GameContainer>
      <Header>
        <HeaderContent>
          <TitleSection>
            <Title>MAGA MIKE'S MEDICAID MONEY MAGIC MATH</Title>
          </TitleSection>
          <MediaRow>
            <VideoContainer>
              <MikeVideo
                ref={videoRef}
                autoPlay
                playsInline
                loop
              />
            </VideoContainer>
            <Timer $timeRemaining={timeRemaining}>{timeRemaining}s</Timer>
          </MediaRow>
          <ProgressBarContainer>
            <ProgressBar $progress={(currentCuts / targetCuts) * 100} />
          </ProgressBarContainer>
          <CommitteeText>
             Cut $88B from E&CC Programs without touching MEDICAID 
          </CommitteeText>
          <RightJustifiedCutsInfo>
            <div>${(targetCuts - currentCuts).toFixed(1)}B</div>
            <div>${currentCuts.toFixed(1)}B</div>
          </RightJustifiedCutsInfo>
        </HeaderContent>
      </Header>
      <GameContent>
        <MainContent>
          <ScrollContainer>
            <ProgramGrid>
              {programs.map(renderProgram)}
            </ProgramGrid>
            <Footer>
              2024 MAGA Mike's Medicaid Money Magic Math - All Rights Reserved
            </Footer>
          </ScrollContainer>
        </MainContent>
      </GameContent>
      <AnimatePresence>
        {isGameOver && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Modal
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h2>{hasWon ? ' Game Over - Billionaires Win!' : ' Failed to Follow the Law!'}</h2>
              {hasWon ? (
                <BillionaireBanner>
                  <span> Billionaire Tax Avoidance Victory! </span>
                  <span>While Public Programs Were Cut, The Ultra-Wealthy Saved ${(targetCuts * 1.5).toFixed(1)}B in Taxes</span>
                </BillionaireBanner>
              ) : (
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#dc3545' }}>
                  The law requires exactly $88 Billion in cuts from the Energy and Commerce Committee.
                </p>
              )}
              <p>
                {hasWon
                  ? `Congratulations! You successfully cut $${currentCuts.toFixed(1)}B from public programs!`
                  : `You ${timeRemaining <= 0 ? 'ran out of time' : `only cut $${currentCuts.toFixed(1)}B`}. The law requires $${targetCuts}B in cuts - no exceptions!`}
              </p>
              <ControlButton onClick={handleStartGame}>
                Play Again
              </ControlButton>
            </Modal>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {programs.filter(p => !p.isUntouchable && p.budget > 0).length === 0 && !isGameOver && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Modal
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h2>All Other Programs Depleted!</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                Despite MAGA Mike and the Trump administration's promises that Medicaid wouldn't be touched 
                (it wasn't even mentioned in the law), there's no other way to reach the $88 Billion target 
                for the Energy and Commerce Committee...
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#bf0a30' }}>
                Would you like to break their promise and cut Medicaid?
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Note: The game will automatically limit Medicaid cuts to exactly what's needed to reach the $88 billion target.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <ControlButton onClick={handleStartGame}>
                  Start Over
                </ControlButton>
                <ControlButton onClick={handleToggleMedicaidProtection} style={{ background: '#bf0a30' }}>
                  Cut Medicaid
                </ControlButton>
              </div>
            </Modal>
          </>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};

export default Game;