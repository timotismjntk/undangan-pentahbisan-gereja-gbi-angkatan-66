import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Church } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    const text = 'Undangan Natal - Pentahbisan Gedung Gereja GBI Jalan Angkatan 66';

    if (navigator.share) {
      try {
        await navigator.share({
          title: text,
          url: url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link tersalin!",
      description: "Link undangan telah disalin ke clipboard.",
    });
  };

  return (
    <footer className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 inline-block p-4 bg-primary/10 rounded-full">
          <Church className="w-12 h-12 text-primary" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Terima Kasih
        </h2>

        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i 
          berkenan hadir memeriahkan acara Pentahbisan dan Ucapan Syukur Memasuki Gedung Gereja ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button onClick={handleShare} size="lg" className="gap-2">
            <Share2 className="w-5 h-5" />
            Bagikan via WhatsApp
          </Button>
          <Button onClick={handleCopyLink} variant="outline" size="lg" className="gap-2">
            <Copy className="w-5 h-5" />
            Salin Link Undangan
          </Button>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 GBI Jalan Angkatan 66 • Dibuat dengan ❤️
          </p>
        </div>
      </div>

      {/* Decorative Christmas trees at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
