import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 animate-twinkle">
        <Sparkles className="w-12 h-12 text-secondary" />
      </div>
      <div className="absolute top-20 right-20 animate-twinkle" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-20 left-20 animate-twinkle" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-10 h-10 text-secondary" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 animate-float">
          <div className="inline-block p-4 bg-card/50 backdrop-blur-sm rounded-full shadow-glow">
            <Sparkles className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block mb-2">Pentahbisan dan Ucapan Syukur</span>
          <span className="block text-gradient-christmas">
            Memasuki Gedung Gereja
          </span>
          <span className="block text-2xl md:text-4xl mt-4 text-foreground/80">
            GBI Jalan Angkatan 66
          </span>
        </h1>

        <div className="mt-8 inline-block bg-card/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-festive border border-border">
          <p className="text-xl md:text-2xl font-medium text-primary">
            Perayaan Natal & Ibadah Syukur
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="w-20 h-px bg-border"></div>
          <span>Scroll untuk melanjutkan</span>
          <div className="w-20 h-px bg-border"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
