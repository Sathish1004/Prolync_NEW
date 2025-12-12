import React from 'react';
import { motion } from 'framer-motion';

const BoldTypographyBanner = () => {
  const sentence = "PROLYNC MAKES LEARNERS CLEVER";
  const words = sentence.split(" ");

  return (
    <section className="w-full bg-black overflow-hidden flex items-center justify-center relative h-[50vh] min-h-[50vh] max-h-[50vh]">
      <div className="absolute inset-0 bg-black">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-0"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="cursor-default font-black text-[clamp(28px,10vw,60px)] md:text-[clamp(32px,7vw,110px)] leading-[1] tracking-tighter transition-colors duration-300 -mt-[10px] md:-mt-[20px]"
              initial={{ color: word === 'PROLYNC' ? '#8b5cf6' : '#262626' }}
              whileHover={{ 
                scale: 1.05,
                color: '#ffffff', // Fallback
                textShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
                transition: { duration: 0.1 }
              }}
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              }}
            >
              {word === 'PROLYNC' ? (
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-blue-400 hover:to-green-300 transition-all duration-300">
                    {word}
                 </span>
              ) : (
                <span className="bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:via-blue-500 hover:to-green-400 transition-all duration-300 bg-none">
                  {word}  
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>


    </section>
  );
};

export default BoldTypographyBanner;
