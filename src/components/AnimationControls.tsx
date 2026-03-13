import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowLeftRightIcon } from 'lucide-react';
type Direction = 'left' | 'right' | 'bounce';
type Speed = 'slow' | 'normal' | 'fast' | 'blazing';
interface AnimationControlsProps {
  direction: Direction;
  speed: Speed;
  onDirectionChange: (dir: Direction) => void;
  onSpeedChange: (speed: Speed) => void;
}
const speeds: {
  value: Speed;
  label: string;
}[] = [
{
  value: 'slow',
  label: 'Slow'
},
{
  value: 'normal',
  label: 'Normal'
},
{
  value: 'fast',
  label: 'Fast'
},
{
  value: 'blazing',
  label: 'Blazing'
}];

const speedToIndex: Record<Speed, number> = {
  slow: 0,
  normal: 1,
  fast: 2,
  blazing: 3
};
export function AnimationControls({
  direction,
  speed,
  onDirectionChange,
  onSpeedChange
}: AnimationControlsProps) {
  return (
    <div className="space-y-5">
      {/* Direction */}
      <div className="space-y-3">
        <span className="text-xs text-[#71717a]">Direction</span>
        <div className="flex gap-2">
          <button
            onClick={() => onDirectionChange('left')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${direction === 'left' ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Scroll left to right"
            aria-pressed={direction === 'left'}>
            
            <ArrowRightIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Right</span>
          </button>

          <button
            onClick={() => onDirectionChange('right')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${direction === 'right' ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Scroll right to left"
            aria-pressed={direction === 'right'}>
            
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Left</span>
          </button>

          <button
            onClick={() => onDirectionChange('bounce')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${direction === 'bounce' ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30' : 'bg-[#18181b] text-[#71717a] border border-transparent hover:border-[#2a2a30] hover:text-[#a1a1aa]'}`}
            aria-label="Bounce animation"
            aria-pressed={direction === 'bounce'}>
            
            <ArrowLeftRightIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bounce</span>
          </button>
        </div>
      </div>

      {/* Speed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#71717a]">Speed</span>
          <span className="text-xs text-[#3b82f6] capitalize">{speed}</span>
        </div>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={speedToIndex[speed]}
          onChange={(e) => onSpeedChange(speeds[Number(e.target.value)].value)}
          aria-label="Animation speed"
          className="w-full" />
        
        <div className="flex justify-between text-[10px] text-[#52525b]">
          <span>🐢 Slow</span>
          <span>Normal</span>
          <span>Fast</span>
          <span>⚡ Blazing</span>
        </div>
      </div>
    </div>);

}