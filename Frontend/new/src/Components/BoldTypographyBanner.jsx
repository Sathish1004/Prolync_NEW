import React from 'react';
import { motion } from 'framer-motion';

const BoldTypographyBanner = () => {
  const sentence = "PROLYNC MAKES LEARNERS CLEVER";
  const words = sentence.split(" ");

  return (
    <section className="w-full bg-black overflow-hidden flex items-center justify-center relative pt-12 pb-2 md:pt-24 md:pb-2 h-auto">
      <div className="absolute inset-0 bg-black">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-10xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-nowrap justify-center items-center gap-x-[1.5vw] md:gap-x-8 w-full"
        >
          {/* Brand Name - Static Gradient */}
          <span className="font-black tracking-tighter cursor-default text-[clamp(2rem,6vw,7rem)] leading-none bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 filter drop-shadow-lg shrink-0">
            PROLYNC
          </span>

          {/* Slogan - Animated Gradient Text */}
          <span className="font-black tracking-tighter cursor-default text-[clamp(2rem,6vw,7rem)] leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#262626] via-[#737373] to-[#262626] bg-[length:200%_auto] animate-gradient-text shrink-0"
             style={{
               WebkitTextStroke: '1px rgba(255,255,255,0.1)',
             }}
          >
            
             MAKES LEARNERS CLEVER
          </span>
        </motion.div>
      </div>
      
      {/* Decorative Glow */}
      <style jsx>{`
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          animation: gradient-text 3s linear infinite;
        }
      `}</style>

    </section>
  );
};

export default BoldTypographyBanner;
