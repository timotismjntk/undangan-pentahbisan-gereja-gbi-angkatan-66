import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Auto-play attempt
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasStarted(true);
        }
      } catch (error) {
        console.log('Auto-play prevented:', error);
        setHasStarted(true);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  };

  if (!hasStarted) return null;

  return (
    <Button
      onClick={toggleMusic}
      size="icon"
      variant="outline"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-festive bg-card/95 backdrop-blur-sm border-2 transition-smooth hover:scale-110"
      aria-label={isPlaying ? 'Matikan musik' : 'Putar musik'}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-primary" />
      ) : (
        <VolumeX className="w-6 h-6 text-muted-foreground" />
      )}
      <Music className="w-3 h-3 absolute -top-1 -right-1 animate-twinkle" />
    </Button>
  );
};

export default MusicPlayer;
