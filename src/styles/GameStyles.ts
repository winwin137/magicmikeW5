import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import capitolImage from '../assets/images/capitol.jpg';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const GameContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ScrollContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100vh - 300px); /* Adjust height as needed */
  
  @media (max-width: 768px) {
    max-height: calc(100vh - 250px);
  }
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #f5f5f5;
  background-image: url('/src/assets/images/trumpStealing.jpg');
  background-size: cover;
  background-position: center;
  padding: 1rem 1rem 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const HeaderContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const MediaRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export const TitleSection = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const VideoContainer = styled.div`
  width: clamp(80px, 12vw, 120px);
  height: clamp(80px, 12vw, 120px);
  position: relative;
  flex-shrink: 0;
`;

export const MikeVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #bf0a30;
  background: #000;
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin: 0;
  color: #bf0a30;
  text-align: center;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 
    -1px -1px 0 white,  
     1px -1px 0 white,
    -1px  1px 0 white,
     1px  1px 0 white,
     3px 3px 0 rgba(139, 0, 0, 0.3);
  padding: 0 0.5rem;
  line-height: 1.1;
  hyphens: auto;

  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 5vw, 1.4rem);
    letter-spacing: 0.5px;
    padding: 0 0.25rem;
    word-spacing: -1px;
  }
`;

export const Subtitle = styled.h2`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin: 0.5rem 0;
  color: #dc3545;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  letter-spacing: 1px;
  text-shadow: 
    -1px -1px 0 white,  
     1px -1px 0 white,
    -1px  1px 0 white,
     1px  1px 0 white,
     1px 1px 0 rgba(139, 0, 0, 0.2);
  padding: 0 0.5rem;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 4vw, 1.1rem);
    letter-spacing: 0.5px;
    padding: 0 0.25rem;
    line-height: 1.1;
  }
`;

export const CountersRow = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
    order: 3;
  }
`;

export const Counter = styled(Title)`
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  white-space: nowrap;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  color: ${props => props.color || '#bf0a30'};
  text-shadow: 2px 2px 0 rgba(139, 0, 0, 0.2);
  letter-spacing: 1px;
  margin: 0;
`;

export const BillionaireBanner = styled.div`
  background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid #B8860B;
  animation: shimmer 2s infinite;
  width: 100%;
  max-width: 90%;
  position: relative;
  margin: 0.5rem auto;

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  span {
    display: block;
    font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, sans-serif;
    color: #8B0000;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    
    &:first-child {
      font-size: clamp(1.1rem, 3.5vw, 1.3rem);
      margin-bottom: 0.5rem;
    }
    
    &:last-child {
      font-size: clamp(0.9rem, 3vw, 1.1rem);
      color: #000;
      padding: 0 0.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin: 0.25rem auto;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  padding: 1.5rem 2rem;
  background: rgba(248, 249, 250, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  border: 2px solid #002868;

  h3 {
    font-size: 2rem;
    margin: 0;
    font-family: 'Impact', sans-serif;
    color: #002868;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    white-space: nowrap;

    &:first-child {
      color: #28a745;
      border-right: 2px solid rgba(0, 40, 104, 0.2);
      padding-right: 3rem;
    }

    &:last-child {
      color: #bf0a30;
      padding-left: 3rem;
    }

    @media (max-height: 768px) {
      font-size: 1.75rem;
      padding-right: 2rem;
      &:last-child {
        padding-left: 2rem;
      }
    }

    @media (max-width: 768px) {
      font-size: 1.5rem;
      padding-right: 1.5rem;
      &:last-child {
        padding-left: 1.5rem;
      }
    }
  }
`;

const progressAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 1rem auto;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '$0';
    position: absolute;
    left: 0;
    top: -20px;
    font-size: 0.8rem;
    color: #666;
  }

  &::after {
    content: '$88 Billion';
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 0.8rem;
    color: #666;
  }
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: ${props => props.$progress >= 100 ? '#4CAF50' : '#bf0a30'};
  transition: width 0.3s ease;
`;

export const Timer = styled.div<{ $timeRemaining: number }>`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: bold;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  color: ${props => props.$timeRemaining <= 10 ? '#dc3545' : '#bf0a30'};
  transition: color 0.3s ease;
  text-shadow: 2px 2px 4px rgba(139, 0, 0, 0.3);
  background: ${props => props.$timeRemaining <= 10 ? 'rgba(220, 53, 69, 0.1)' : 'rgba(191, 10, 48, 0.1)'};
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  border: 2px solid ${props => props.$timeRemaining <= 10 ? '#dc3545' : '#bf0a30'};
  letter-spacing: 2px;
  flex-shrink: 0;
  margin: 0 auto;

  @media (max-width: 768px) {
    order: 2;
    margin: 0;
  }
`;

export const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(calc(50% - 0.5rem), 300px), 1fr));
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const ProgramTile = styled(motion.div)<{ $isUntouchable?: boolean }>`
  background: ${props => props.$isUntouchable ? 
    'linear-gradient(135deg, #bf0a30 0%, #8b0000 100%)' : 
    'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  border-radius: 8px;
  padding: 0.35rem 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: ${props => props.$isUntouchable ? 'not-allowed' : 'pointer'};
  border: 2px solid ${props => props.$isUntouchable ? '#8b0000' : '#002868'};
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 130px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: 0.25rem 0.25rem;
    border-width: 1px;
    min-height: 110px;
  }
  
  &:hover {
    transform: ${props => props.$isUntouchable ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$isUntouchable ? 
      '0 2px 4px rgba(0, 0, 0, 0.1)' : 
      '0 4px 6px rgba(0, 0, 0, 0.15)'};
  }
`;

export const ProgramImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

export const ProgramName = styled.div<{ $isUntouchable?: boolean }>`
  margin: 0;
  color: ${props => props.$isUntouchable ? '#ffffff' : '#1a1a1a'};
  font-family: 'Impact', sans-serif;
  line-height: 0.9;
  text-align: center;
  padding: 0;
  display: grid;
  grid-template-rows: auto auto;
  gap: 0;

  span {
    &:first-child {
      font-size: clamp(0.9rem, 2.5vw, 1.1rem);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 0.9;
      margin-bottom: -0.1em;
    }
    
    &:last-child {
      font-family: 'Arial', sans-serif;
      font-weight: normal;
      font-size: clamp(0.6rem, 2vw, 0.7rem);
      opacity: 0.9;
      line-height: 0.9;
      margin-top: -0.1em;
    }
  }
`;

export const ProgramBudget = styled.div<{ $isUntouchable?: boolean }>`
  font-size: clamp(1.2rem, 3vw, 1.1rem);
  font-weight: bold;
  color: ${props => props.$isUntouchable ? '#ffffff' : '#28a745'};
  margin: 0.15rem 0;
  text-align: center;
  padding: 0 0.25rem;

  span {
    font-size: clamp(1.2rem, 3vw, 1.1rem);
    color: #bf0a30;
    margin-left: 0.5rem;
  }
`;

export const ProgramDescription = styled.p<{ $isUntouchable?: boolean }>`
  color: ${props => props.$isUntouchable ? 'rgba(255, 255, 255, 0.8)' : '#666'};
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  margin: 0;
  padding: 0 0.25rem;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    -webkit-line-clamp: 2;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0 0.25rem;
  margin-top: 0.15rem;

  @media (max-width: 480px) {
    gap: 0.125rem;
  }
`;

export const CutButton = styled.button<{ $amount: number }>`
  background: ${props => props.$amount === 10 ? '#bf0a30' : '#002868'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 0.125rem;
  }

  &:hover {
    background: ${props => props.$amount === 10 ? '#8b0000' : '#001845'};
    transform: translateY(-1px);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

export const GameControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.5rem 0;
  flex-shrink: 0;
`;

export const ControlButton = styled.button`
  background: #002868;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Impact', sans-serif;
  letter-spacing: 1px;
  font-size: 0.9rem;

  &:hover {
    background: #001845;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Modal = styled(motion.div)`
  position: fixed;
  top: calc(50% - 150px);  /* Adjust based on half the height */
  left: calc(50% - 200px - 2rem); /* Subtract 2rem from left position */
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 400px;
  z-index: 1000;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h2 {
    font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, sans-serif;
    color: #bf0a30;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    margin: 0;
    width: 100%;
  }

  p {
    margin: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    top: calc(50% - 100px);
    left: calc(50% - 150px - 2rem);
    padding: 1.5rem;
    max-width: 85%;
    gap: 0.75rem;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DefundedOverlay = styled.div<{ abbreviation?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-family: 'Impact', sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  z-index: 10;
  pointer-events: none;
  text-align: center;
  padding: 1rem;
  
  &::before {
    content: '${props => props.abbreviation ? `${props.abbreviation} DEFUNDED` : 'DEFUNDED'}';
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    line-height: 1.2;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 3rem 3rem 8rem;
  margin-top: auto;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  color: #bf0a30;
  font-size: clamp(0.8rem, 2vw, 1rem);
  opacity: 0.8;
  flex-shrink: 0;
`;

export const CutsInfoContainer = styled.div`
  position: absolute;
  bottom: -15rem; 
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: clamp(1rem, 4vw, 1.5rem);
  color: #bf0a30;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;

  @media (max-width: 768px) {
    bottom: -10rem; 
  }
`;

export const RightJustifiedCutsInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 2rem;
  font-size: clamp(1rem, 4vw, 1.5rem);
  color: #bf0a30;
  margin-top: 0.5rem;
  font-family: 'Impact', 'Haettenschweiler', 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;

  > div:first-child {
    text-align: left;
    flex-grow: 1;
  }

  > div:last-child {
    text-align: right;
    flex-grow: 1;
  }
`;

export const CommitteeText = styled.div`
  text-align: center; 
  color: #bf0a30; 
  font-family: 'Impact', sans-serif;
  font-size: clamp(0.5rem, 4vw, 1rem);
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 
    -1px -1px 0 white, 
    1px -1px 0 white, 
    -1px 1px 0 white, 
    1px 1px 0 white;
`;