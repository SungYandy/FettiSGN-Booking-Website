import React from 'react';

interface FettiLogoProps {
  className?: string;
}

export const FettiLogo: React.FC<FettiLogoProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Bar - Refined geometry for the 'r' shape */}
      <path 
        d="M20 32H79V44H36C33 44 32 45 32 47V48H20V32Z" 
        fill="currentColor"
      />
      {/* Bottom Bar - Identical shape shifted down */}
      <path 
        d="M20 52H79V64H36C33 64 32 65 32 67V68H20V52Z" 
        fill="currentColor"
      />
    </svg>
  );
};
