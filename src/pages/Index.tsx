import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import MusicPlayer from '@/components/MusicPlayer';
import SnowEffect from '@/components/SnowEffect';
import Hero from '@/components/Hero';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';

const IndexContent = () => {
  const { theme } = useTheme();

  return (
    <>
      {theme === 'snowy' && <SnowEffect />}
      <ThemeSwitcher />
      <MusicPlayer />
      
      <main className="relative">
        <Hero />
        <EventDetails />
        <RSVPForm />
        <Footer />
      </main>
    </>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <IndexContent />
    </ThemeProvider>
  );
};

export default Index;
