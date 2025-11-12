import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://raw.githubusercontent.com/timotismjntk/joyful-christmas-invite/refs/heads/main/src/audio/backsound.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    setHasStarted(true);

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
        console.log(audioRef.current)
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current && hasStarted) {
        console.log('Retrying to play audio after delay');
        toggleMusic();
      }
    }, 1000);
  }, [hasStarted]);

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
