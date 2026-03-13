import React, { useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';
type Direction = 'left' | 'right' | 'bounce';
type Speed = 'slow' | 'normal' | 'fast' | 'blazing';
interface MarqueePreviewProps {
  message: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  direction: Direction;
  speed: Speed;
  styles: {
    bold: boolean;
    italic: boolean;
    neon: boolean;
    outline: boolean;
  };
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}
const speedDuration: Record<Speed, number> = {
  slow: 20,
  normal: 8,
  fast: 3,
  blazing: 1.5
};
export function MarqueePreview({
  message,
  fontSize,
  fontFamily,
  color,
  direction,
  speed,
  styles,
  isFullscreen,
  onToggleFullscreen
}: MarqueePreviewProps) {
  // Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        onToggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onToggleFullscreen]);
  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);
  const displayText = message || 'Hello World';
  const animationName = useMemo(() => {
    if (direction === 'left') return 'marquee-left';
    if (direction === 'right') return 'marquee-right';
    return 'marquee-bounce';
  }, [direction]);
  const duration = speedDuration[speed];
  const textStyle: React.CSSProperties = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontFamily: `'${fontFamily}', sans-serif`,
      color,
      fontWeight: styles.bold ? 700 : 400,
      fontStyle: styles.italic ? 'italic' : 'normal',
      whiteSpace: 'nowrap',
      lineHeight: 1.2,
      transition: 'color 0.3s ease, font-size 0.3s ease, text-shadow 0.3s ease'
    }),
    [fontSize, fontFamily, color, styles.bold, styles.italic]
  );
  const textClassName = useMemo(() => {
    const classes: string[] = [];
    if (styles.neon) classes.push('neon-glow');
    if (styles.outline) classes.push('text-outline');
    return classes.join(' ');
  }, [styles.neon, styles.outline]);
  const animationStyle: React.CSSProperties = useMemo(
    () => ({
      animationName,
      animationDuration: `${duration}s`,
      animationTimingFunction:
      direction === 'bounce' ? 'ease-in-out' : 'linear',
      animationIterationCount: 'infinite',
      animationDirection: direction === 'bounce' ? 'alternate' : 'normal',
      display: 'inline-block'
    }),
    [animationName, duration, direction]
  );
  return (
    <motion.div
      layout
      className={`relative flex flex-col bg-[#0a0a0b] overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'flex-1 rounded-xl lg:rounded-none'}`}
      animate={{
        borderRadius: isFullscreen ? 0 : undefined
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}>
      
      {/* Top Bar */}
      <div className="absolute top-4 left-5 right-5 z-10 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#52525b] font-medium">
          {isFullscreen ? 'Fullscreen' : 'Preview'}
        </span>
        <button
          onClick={onToggleFullscreen}
          className="w-8 h-8 rounded-lg bg-[#18181b]/80 backdrop-blur-sm border border-[#1e1e22] flex items-center justify-center text-[#71717a] hover:text-[#e4e4e7] hover:border-[#2a2a30] transition-all duration-150"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
          
          {isFullscreen ?
          <Minimize2Icon className="w-3.5 h-3.5" /> :

          <Maximize2Icon className="w-3.5 h-3.5" />
          }
        </button>
      </div>

      {/* Fullscreen hint */}
      <AnimatePresence>
        {isFullscreen &&
        <motion.div
          initial={{
            opacity: 0,
            y: -8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            delay: 0.3,
            duration: 0.4
          }}
          className="absolute top-14 left-0 right-0 z-10 flex justify-center">
          
            <span className="text-[10px] text-[#3a3a40] bg-[#111113]/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#1e1e22]/50">
              Press ESC to exit
            </span>
          </motion.div>
        }
      </AnimatePresence>

      {/* Canvas Area */}
      <div className="flex-1 dot-grid flex items-center overflow-hidden relative">
        <div className="w-full marquee-mask overflow-hidden">
          <div className="w-max" style={animationStyle}>
            <span className={textClassName} style={textStyle}>
              {displayText}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: color
            }} />
          
          <span className="text-[10px] text-[#52525b] uppercase tracking-wider">
            Live
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#52525b]">
          <span>{fontSize}px</span>
          <span className="capitalize">{speed}</span>
          <span
            style={{
              fontFamily: `'${fontFamily}', sans-serif`
            }}>
            
            {fontFamily}
          </span>
        </div>
      </div>
    </motion.div>);

}