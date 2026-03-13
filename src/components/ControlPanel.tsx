import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextInput } from './TextInput';
import { StyleControls } from './StyleControls';
import { ColorControls } from './ColorControls';
import { AnimationControls } from './AnimationControls';
import { ZapIcon, LinkIcon, CheckIcon } from 'lucide-react';
type Direction = 'left' | 'right' | 'bounce';
type Speed = 'slow' | 'normal' | 'fast' | 'blazing';
interface ControlPanelProps {
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
  onMessageChange: (value: string) => void;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onColorChange: (color: string) => void;
  onDirectionChange: (dir: Direction) => void;
  onSpeedChange: (speed: Speed) => void;
  onStyleToggle: (style: 'bold' | 'italic' | 'neon' | 'outline') => void;
  onShare: () => Promise<boolean>;
}
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};
function SectionHeader({ children }: {children: React.ReactNode;}) {
  return (
    <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#52525b] font-semibold mb-3">
      {children}
    </h3>);

}
export function ControlPanel({
  message,
  fontSize,
  fontFamily,
  color,
  direction,
  speed,
  styles,
  onMessageChange,
  onFontSizeChange,
  onFontFamilyChange,
  onColorChange,
  onDirectionChange,
  onSpeedChange,
  onStyleToggle,
  onShare
}: ControlPanelProps) {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const success = await onShare();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <aside
      className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-[#111113] border-b lg:border-b-0 lg:border-r border-[#1e1e22] flex flex-col h-auto lg:h-screen"
      aria-label="Marquee controls">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1e1e22] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center">
            <ZapIcon className="w-3.5 h-3.5 text-[#3b82f6]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#e4e4e7] tracking-tight">
              Kinetic Studio
            </h1>
            <p className="text-[10px] text-[#52525b]">Marquee Generator</p>
          </div>
        </div>
        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${copied ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-[#18181b] text-[#71717a] border border-[#1e1e22] hover:text-[#e4e4e7] hover:border-[#2a2a30]'}`}
          aria-label="Copy share link">
          
          {copied ?
          <>
              <CheckIcon className="w-3 h-3" />
              Copied!
            </> :

          <>
              <LinkIcon className="w-3 h-3" />
              Share
            </>
          }
        </button>
      </div>

      {/* Scrollable Controls */}
      <div className="flex-1 overflow-y-auto sidebar-scroll px-5 py-5 space-y-6">
        {/* Message Section */}
        <motion.section
          custom={0}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}>
          
          <SectionHeader>Message</SectionHeader>
          <TextInput message={message} onChange={onMessageChange} />
        </motion.section>

        <div className="border-t border-[#1e1e22]" />

        {/* Typography Section */}
        <motion.section
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}>
          
          <SectionHeader>Typography</SectionHeader>
          <StyleControls
            fontSize={fontSize}
            fontFamily={fontFamily}
            styles={styles}
            onFontSizeChange={onFontSizeChange}
            onFontFamilyChange={onFontFamilyChange}
            onStyleToggle={onStyleToggle} />
          
        </motion.section>

        <div className="border-t border-[#1e1e22]" />

        {/* Color Section */}
        <motion.section
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}>
          
          <SectionHeader>Color</SectionHeader>
          <ColorControls color={color} onChange={onColorChange} />
        </motion.section>

        <div className="border-t border-[#1e1e22]" />

        {/* Animation Section */}
        <motion.section
          custom={3}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}>
          
          <SectionHeader>Animation</SectionHeader>
          <AnimationControls
            direction={direction}
            speed={speed}
            onDirectionChange={onDirectionChange}
            onSpeedChange={onSpeedChange} />
          
        </motion.section>
      </div>

      {/* Footer Branding */}
      <div className="px-5 py-3 border-t border-[#1e1e22]">
        <p className="text-[10px] text-[#3a3a40] text-center">
          Kinetic Studio — crafted with care
        </p>
      </div>
    </aside>);

}