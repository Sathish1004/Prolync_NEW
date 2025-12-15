import React from 'react';

const phrases = [
  { highlight: "PROLYNC", rest: "MAKES LEARNERS CLEVER" },
  { highlight: "ERROR", rest: "MAKES CLEVER" },
  { highlight: "SKILLS", rest: "MAKE FUTURE READY" },
  { highlight: "LEARN • BUILD • GROW", rest: "" }
];

const GradientText = ({ text }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 bg-[length:200%_auto] animate-shimmer filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
    {text}
  </span>
);

const OutlineText = ({ text }) => (
  <span 
    className="text-transparent"
    style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.25)' }}
  >
    {text}
  </span>
);

const MarqueeItem = ({ item }) => (
  <div className="flex items-center gap-4 mx-8 shrink-0">
    <GradientText text={item.highlight} />
    {item.rest && <OutlineText text={item.rest} />}
    {/* Separator dot */}
    <div className="w-2 h-2 rounded-full bg-gray-800 mx-4"></div>
  </div>
);

const BoldTypographyBanner = () => {
  return (
    <section className="w-full bg-black overflow-hidden py-16 md:py-24 relative select-none">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-[0.1]" 
            style={{ 
              backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }}
       ></div>
       
       {/* Gradient Overlay for Fade Edges */}
       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-full whitespace-nowrap overflow-hidden">
        {/* First Loop */}
        <div className="flex animate-marquee items-center">
          {phrases.map((phrase, idx) => (
            <div key={`p1-${idx}`} className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-none flex items-center">
               <MarqueeItem item={phrase} />
            </div>
          ))}
        </div>
        {/* Second Loop for Seamless Scroll */}
        <div className="flex animate-marquee items-center" aria-hidden="true">
          {phrases.map((phrase, idx) => (
            <div key={`p2-${idx}`} className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-none flex items-center">
               <MarqueeItem item={phrase} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BoldTypographyBanner;
