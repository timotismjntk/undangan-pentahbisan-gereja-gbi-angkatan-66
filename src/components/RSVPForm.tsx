import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  name: string;
  message: string;
  attendance: string;
  timestamp: number;
}

const RSVPForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('christmas-messages');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Mohon lengkapi formulir",
        description: "Nama dan ucapan harus diisi.",
        variant: "destructive",
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      attendance,
      timestamp: Date.now(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('christmas-messages', JSON.stringify(updatedMessages));

    toast({
      title: "Terima kasih!",
      description: "Ucapan Anda telah terkirim.",
    });

    setName('');
    setMessage('');
    setAttendance('yes');
  };

  return (
    <section className="py-20 px-4 bg-card/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Ucapan & Konfirmasi Kehadiran
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Berikan ucapan dan konfirmasikan kehadiran Anda
        </p>

        <Card className="p-8 mb-12 shadow-festive border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg">Nama</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-lg">Ucapan</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis ucapan Anda di sini..."
                className="mt-2 min-h-[120px]"
                required
              />
            </div>

            <div>
              <Label className="text-lg mb-4 block">Konfirmasi Kehadiran</Label>
              <RadioGroup value={attendance} onValueChange={setAttendance}>
                <div className="flex items-center space-x-3 mb-3">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="cursor-pointer text-base">
                    Ya, saya akan hadir
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer text-base">
                    Maaf, saya tidak bisa hadir
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full text-lg py-6" size="lg">
              <Heart className="w-5 h-5 mr-2" />
              Kirim Ucapan
            </Button>
          </form>
        </Card>

        {messages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
              <MessageCircle className="w-6 h-6 text-primary" />
              Ucapan dari Tamu ({messages.length})
            </h3>
            <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <Card key={msg.id} className="p-6 shadow-card hover:shadow-festive transition-smooth">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-lg">{msg.name}</h4>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      msg.attendance === 'yes' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {msg.attendance === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(msg.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPForm;
