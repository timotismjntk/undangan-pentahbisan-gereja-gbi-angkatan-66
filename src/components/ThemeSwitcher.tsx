import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Snowflake, TreePine } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'classic' as const, label: 'Klasik', icon: Sparkles, color: 'christmas-red' },
    { id: 'snowy' as const, label: 'Salju', icon: Snowflake, color: 'primary' },
    { id: 'modern' as const, label: 'Modern', icon: TreePine, color: 'christmas-green' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-card/95 backdrop-blur-sm p-3 rounded-2xl shadow-festive border border-border">
      {themes.map((t) => {
        const Icon = t.icon;
        return (
          <Button
            key={t.id}
            onClick={() => setTheme(t.id)}
            variant={theme === t.id ? 'default' : 'outline'}
            size="sm"
            className="gap-2 transition-smooth"
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
