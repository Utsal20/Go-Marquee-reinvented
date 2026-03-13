import React from 'react';
import { motion } from 'framer-motion';
import { BoldIcon, ItalicIcon, SparklesIcon, TypeIcon } from 'lucide-react';
interface StyleControlsProps {
  fontSize: number;
  fontFamily: string;
  styles: {
    bold: boolean;
    italic: boolean;
    neon: boolean;
    outline: boolean;
  };
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onStyleToggle: (style: 'bold' | 'italic' | 'neon' | 'outline') => void;
}
const fontFamilies = [
{
  label: 'Inter',
  value: 'Inter'
},
{
  label: 'Space Mono',
  value: 'Space Mono'
},
{
  label: 'Playfair Display',
  value: 'Playfair Display'
},
{
  label: 'Permanent Marker',
  value: 'Permanent Marker'
},
{
  label: 'Orbitron',
  value: 'Orbitron'
}];

export function StyleControls({
  fontSize,
  fontFamily,
  styles,
  onFontSizeChange,
  onFontFamilyChange,
  onStyleToggle
}: StyleControlsProps) {
  return (
    <div className="space-y-5">
      {/* Font Size Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#71717a]">Size</span>
          <span className="text-xs text-[#71717a] tabular-nums bg-[#18181b] px-2 py-0.5 rounded">
            {fontSize}px
          </span>
        </div>
        <input
          type="range"
          min={16}
          max={120}
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          aria-label="Font size"
          className="w-full" />
        
        <div className="flex justify-between text-[10px] text-[#52525b]">
          <span>16px</span>
          <span>120px</span>
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <span className="text-xs text-[#71717a]">Font</span>
        <div className="grid grid-cols-1 gap-1.5">
          {fontFamilies.map((font) =>
          <button
            key={font.value}
            onClick={() => onFontFamilyChange(font.value)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${fontFamily === font.value ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#a1a1aa] border border-transparent hover:border-[#2a2a30] hover:text-[#e4e4e7]'}`}
            style={{
              fontFamily: `'${font.value}', sans-serif`
            }}
            aria-label={`Select ${font.label} font`}
            aria-pressed={fontFamily === font.value}>
            
              {font.label}
            </button>
          )}
        </div>
      </div>

      {/* Style Toggles */}
      <div className="space-y-3">
        <span className="text-xs text-[#71717a]">Style</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onStyleToggle('bold')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${styles.bold ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Toggle bold"
            aria-pressed={styles.bold}>
            
            <BoldIcon className="w-3.5 h-3.5" />
            Bold
          </button>

          <button
            onClick={() => onStyleToggle('italic')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${styles.italic ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Toggle italic"
            aria-pressed={styles.italic}>
            
            <ItalicIcon className="w-3.5 h-3.5" />
            Italic
          </button>

          <button
            onClick={() => onStyleToggle('neon')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${styles.neon ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Toggle neon glow"
            aria-pressed={styles.neon}>
            
            <SparklesIcon className="w-3.5 h-3.5" />
            Neon
          </button>

          <button
            onClick={() => onStyleToggle('outline')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${styles.outline ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Toggle outline"
            aria-pressed={styles.outline}>
            
            <TypeIcon className="w-3.5 h-3.5" />
            Outline
          </button>
        </div>
      </div>
    </div>);

}