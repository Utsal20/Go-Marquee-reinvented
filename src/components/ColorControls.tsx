import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
interface ColorControlsProps {
  color: string;
  onChange: (color: string) => void;
}
const presetColors = [
{
  hex: '#3b82f6',
  label: 'Blue'
},
{
  hex: '#ef4444',
  label: 'Red'
},
{
  hex: '#22c55e',
  label: 'Green'
},
{
  hex: '#f59e0b',
  label: 'Amber'
},
{
  hex: '#a855f7',
  label: 'Purple'
},
{
  hex: '#ec4899',
  label: 'Pink'
},
{
  hex: '#06b6d4',
  label: 'Cyan'
},
{
  hex: '#f97316',
  label: 'Orange'
},
{
  hex: '#ffffff',
  label: 'White'
},
{
  hex: '#facc15',
  label: 'Yellow'
}];

export function ColorControls({ color, onChange }: ColorControlsProps) {
  const [hexInput, setHexInput] = useState(color);
  const handleHexSubmit = () => {
    const cleaned = hexInput.startsWith('#') ? hexInput : `#${hexInput}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      onChange(cleaned);
    }
  };
  const handleHexChange = (value: string) => {
    setHexInput(value);
    const cleaned = value.startsWith('#') ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      onChange(cleaned);
    }
  };
  const isSelected = (hex: string) => color.toLowerCase() === hex.toLowerCase();
  return (
    <div className="space-y-4">
      {/* Preset Swatches */}
      <div className="grid grid-cols-5 gap-2.5">
        {presetColors.map((preset) =>
        <button
          key={preset.hex}
          onClick={() => {
            onChange(preset.hex);
            setHexInput(preset.hex);
          }}
          className={`relative w-full aspect-square rounded-full transition-all duration-150 ${isSelected(preset.hex) ? 'ring-2 ring-[#3b82f6] ring-offset-2 ring-offset-[#111113] scale-110' : 'hover:scale-105'}`}
          style={{
            backgroundColor: preset.hex
          }}
          aria-label={`Select ${preset.label} color`}
          aria-pressed={isSelected(preset.hex)}>
          
            {isSelected(preset.hex) &&
          <CheckIcon
            className="absolute inset-0 m-auto w-3.5 h-3.5"
            style={{
              color:
              preset.hex === '#ffffff' || preset.hex === '#facc15' ?
              '#000' :
              '#fff'
            }} />

          }
          </button>
        )}
      </div>

      {/* Custom Hex Input */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg border border-[#1e1e22] flex-shrink-0 transition-colors duration-200"
          style={{
            backgroundColor: color
          }}
          aria-hidden="true" />
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            onBlur={handleHexSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleHexSubmit()}
            placeholder="#3b82f6"
            maxLength={7}
            aria-label="Custom hex color"
            className="w-full bg-[#18181b] border border-[#1e1e22] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] font-mono placeholder-[#52525b] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/30 transition-all duration-200" />
          
        </div>
      </div>
    </div>);

}