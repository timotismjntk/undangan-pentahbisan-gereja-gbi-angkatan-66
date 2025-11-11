import React from 'react';

const SnowEffect = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: Math.random() * 3 + 5,
    animationDelay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.4,
    size: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: 'white',
            borderRadius: '50%',
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
