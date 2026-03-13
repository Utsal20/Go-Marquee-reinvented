import React, { useCallback, useEffect, useState, Component } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { MarqueePreview } from './components/MarqueePreview';
import { AnimatePresence } from 'framer-motion';
type Direction = 'left' | 'right' | 'bounce';
type Speed = 'slow' | 'normal' | 'fast' | 'blazing';
interface TextStyles {
  bold: boolean;
  italic: boolean;
  neon: boolean;
  outline: boolean;
}
// Compact URL param helpers
const FONT_ENCODE: Record<string, string> = {
  Inter: 'i',
  'Space Mono': 'sm',
  'Playfair Display': 'pd',
  'Permanent Marker': 'pm',
  Orbitron: 'o'
};
const FONT_DECODE: Record<string, string> = Object.fromEntries(
  Object.entries(FONT_ENCODE).map(([k, v]) => [v, k])
);
const DIR_ENCODE: Record<Direction, string> = {
  left: 'l',
  right: 'r',
  bounce: 'b'
};
const DIR_DECODE: Record<string, Direction> = {
  l: 'left',
  r: 'right',
  b: 'bounce'
};
const SPD_ENCODE: Record<Speed, string> = {
  slow: 's',
  normal: 'n',
  fast: 'f',
  blazing: 'z'
};
const SPD_DECODE: Record<string, Speed> = {
  s: 'slow',
  n: 'normal',
  f: 'fast',
  z: 'blazing'
};
function encodeStyles(s: TextStyles): string {
  return String(
    (s.bold ? 8 : 0) | (
    s.italic ? 4 : 0) | (
    s.neon ? 2 : 0) | (
    s.outline ? 1 : 0)
  );
}
function decodeStyles(v: string): TextStyles {
  const n = parseInt(v, 10);
  if (isNaN(n))
  return {
    bold: false,
    italic: false,
    neon: false,
    outline: false
  };
  return {
    bold: !!(n & 8),
    italic: !!(n & 4),
    neon: !!(n & 2),
    outline: !!(n & 1)
  };
}
function parseUrlState() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      message: p.get('t') ? decodeURIComponent(p.get('t')!) : undefined,
      fontSize: p.get('fs') ? Number(p.get('fs')) : undefined,
      fontFamily: p.get('ff') ? FONT_DECODE[p.get('ff')!] : undefined,
      color: p.get('c') ? `#${p.get('c')}` : undefined,
      direction: p.get('d') ? DIR_DECODE[p.get('d')!] : undefined,
      speed: p.get('sp') ? SPD_DECODE[p.get('sp')!] : undefined,
      styles: p.get('st') ? decodeStyles(p.get('st')!) : undefined
    };
  } catch {
    return {};
  }
}
export function App() {
  const initial = parseUrlState();
  const [message, setMessage] = useState(initial.message ?? 'Hello World');
  const [fontSize, setFontSize] = useState(initial.fontSize ?? 48);
  const [fontFamily, setFontFamily] = useState(initial.fontFamily ?? 'Inter');
  const [color, setColor] = useState(initial.color ?? '#3b82f6');
  const [direction, setDirection] = useState<Direction>(
    initial.direction ?? 'left'
  );
  const [speed, setSpeed] = useState<Speed>(initial.speed ?? 'normal');
  const [styles, setStyles] = useState<TextStyles>(
    initial.styles ?? {
      bold: false,
      italic: false,
      neon: false,
      outline: false
    }
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Sync state → URL (debounced via replaceState to avoid history spam)
  useEffect(() => {
    const params = new URLSearchParams();
    if (message && message !== 'Hello World')
    params.set('t', encodeURIComponent(message));
    if (fontSize !== 48) params.set('fs', String(fontSize));
    if (fontFamily !== 'Inter')
    params.set('ff', FONT_ENCODE[fontFamily] || fontFamily);
    if (color !== '#3b82f6') params.set('c', color.replace('#', ''));
    if (direction !== 'left') params.set('d', DIR_ENCODE[direction]);
    if (speed !== 'normal') params.set('sp', SPD_ENCODE[speed]);
    const styleVal = encodeStyles(styles);
    if (styleVal !== '0') params.set('st', styleVal);
    const qs = params.toString();
    const newUrl = qs ?
    `${window.location.pathname}?${qs}` :
    window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [message, fontSize, fontFamily, color, direction, speed, styles]);
  const handleStyleToggle = useCallback(
    (style: 'bold' | 'italic' | 'neon' | 'outline') => {
      setStyles((prev) => ({
        ...prev,
        [style]: !prev[style]
      }));
    },
    []
  );
  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    } catch {
      return false;
    }
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#0a0a0b] flex flex-col lg:flex-row">
      <ControlPanel
        message={message}
        fontSize={fontSize}
        fontFamily={fontFamily}
        color={color}
        direction={direction}
        speed={speed}
        styles={styles}
        onMessageChange={setMessage}
        onFontSizeChange={setFontSize}
        onFontFamilyChange={setFontFamily}
        onColorChange={setColor}
        onDirectionChange={setDirection}
        onSpeedChange={setSpeed}
        onStyleToggle={handleStyleToggle}
        onShare={handleShare} />
      

      <main className="flex-1 flex min-h-[50vh] lg:min-h-screen">
        <MarqueePreview
          message={message}
          fontSize={fontSize}
          fontFamily={fontFamily}
          color={color}
          direction={direction}
          speed={speed}
          styles={styles}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen((prev) => !prev)} />
        
      </main>
    </div>);

}