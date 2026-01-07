import React from "react";

interface MacbookMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const MacbookMockup = ({ children, className = "" }: MacbookMockupProps) => {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Lid (Top Part) */}
      <div className="relative rounded-[20px] bg-[#1a1a1a] p-[1.5%] ring-1 ring-white/10 shadow-2xl">
        {/* Camera Notch */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[7%] w-[18%] bg-black rounded-b-xl z-20 flex justify-center border-b border-white/5">
             <div className="h-full w-full relative flex items-center justify-center">
                 {/* Camera lens reflection */}
                 {/* <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.3)]"></div> */}
             </div>
        </div>
        
        {/* Screen/Content Area */}
        <div className="relative overflow-hidden rounded-[4px] bg-black w-full h-full border border-white/5">
           {children}
        </div>
      </div>
      
      {/* Base (Bottom Part) - Only visible "hinge" and top of base roughly */}
      <div className="relative -mt-[2px] mx-auto h-[12px] w-full max-w-[98%] rounded-b-lg bg-[#272729] shadow-inner border-x border-b border-black/50">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[4px] w-[15%] rounded-b-md bg-[#1a1a1a]"></div>
      </div>
      {/* Reflection under the laptop */}
      {/* <div className="absolute -bottom-8 left-4 right-4 h-8 bg-black/20 blur-xl rounded-[100%]"></div> */}
    </div>
  );
};
