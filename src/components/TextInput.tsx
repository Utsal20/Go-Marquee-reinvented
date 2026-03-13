import React from 'react';
import { motion } from 'framer-motion';
interface TextInputProps {
  message: string;
  onChange: (value: string) => void;
}
export function TextInput({ message, onChange }: TextInputProps) {
  const maxLength = 500;
  const charCount = message.length;
  const isNearLimit = charCount > 450;
  return (
    <div className="space-y-2">
      <textarea
        value={message}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            onChange(e.target.value);
          }
        }}
        placeholder="Type your message..."
        rows={3}
        aria-label="Marquee message text"
        className="w-full bg-[#18181b] border border-[#1e1e22] rounded-lg px-4 py-3 text-[#e4e4e7] text-sm placeholder-[#52525b] resize-none focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/30 transition-all duration-200"
        style={{
          fontFamily: 'Inter, sans-serif'
        }} />
      
      <div className="flex justify-end">
        <span
          className={`text-xs tabular-nums transition-colors duration-200 ${isNearLimit ? 'text-amber-400' : 'text-[#52525b]'}`}>
          
          {charCount} / {maxLength}
        </span>
      </div>
    </div>);

}