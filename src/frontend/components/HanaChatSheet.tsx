import React, { useState } from 'react';
import { X, Send, Sparkles, Heart, Moon, Droplets, Baby } from 'lucide-react';
import { HanaAvatar } from './HanaAvatar';

interface HanaChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  gestationalWeek?: number;
}

interface Message {
  sender: 'hana' | 'user';
  text: string;
  time: string;
}

export const HanaChatSheet: React.FC<HanaChatSheetProps> = ({
  isOpen,
  onClose,
  gestationalWeek = 31,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'hana',
      text: "Hello Mariam! I noticed your smartwatch recorded only 5 hours of sleep last night. In Week 31, rest is essential to keep maternal blood pressure calm and baby's placental perfusion strong.",
      time: '14:22',
    },
    {
      sender: 'hana',
      text: "💡 Quick tip: Try resting on your left side with a soft pillow between your knees for 25 minutes this afternoon. It takes weight off the inferior vena cava and helps lower diastolic pressure.",
      time: '14:23',
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    { label: 'Sleep position tip', icon: Moon, reply: 'Sleeping on your left side optimizes blood flow to the placenta and prevents compression of your major veins. A pregnancy wedge pillow can make this much more comfortable!' },
    { label: 'Hydration goal', icon: Droplets, reply: 'At Week 31, aim for 2.4 to 3.0 liters of water daily. Staying well hydrated maintains amniotic fluid volume and prevents uterine irritability.' },
    { label: 'Kick count guide', icon: Baby, reply: 'Count baby kicks when you are sitting or resting. You should feel at least 10 kicks or flutter movements within 2 hours. Your Bump Band is automatically logging movements now!' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    setTimeout(() => {
      let botReply = "I understand. I have updated your daily care checklist and will keep an eye on your Bump Band and smartwatch stream. Let Dr. Noura or triage know if you feel any dizziness!";
      if (text.toLowerCase().includes('sleep')) {
        botReply = "A 20-minute nap with legs elevated is ideal. I will set a calm reminder for 15:30.";
      } else if (text.toLowerCase().includes('pressure') || text.toLowerCase().includes('bp')) {
        botReply = "If your blood pressure ever rises above 140/90, rest seated and take a quiet re-check in 15 minutes. If it exceeds 160/110, use the red Help button immediately.";
      }

      setMessages(prev => [...prev, {
        sender: 'hana',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-[28px] shadow-2xl border border-slate-200 overflow-hidden text-left flex flex-col h-[85vh]">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto my-3 shrink-0" />

        {/* Header */}
        <div className="px-6 py-2 pb-4 flex items-center justify-between border-b border-slate-100 bg-[#F1F6F8]">
          <div className="flex items-center gap-3">
            <HanaAvatar size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Figtree'] font-extrabold text-[17px] text-[#0F2733]">
                  Hana · AI Companion
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#15803D] text-white font-bold">
                  Active
                </span>
              </div>
              <p className="font-['Noto_Sans'] text-xs text-[#475569]">
                Proactive maternal health companion · Week {gestationalWeek}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-[#0F2733] flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FBFDFE]">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex items-end gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'hana' && <HanaAvatar size="sm" className="mb-1" />}
              <div 
                className={`max-w-[80%] rounded-[18px] p-3.5 text-sm ${
                  m.sender === 'user'
                    ? 'bg-[#0B5F73] text-white rounded-br-[4px]'
                    : 'bg-[#F1F6F8] text-[#0F2733] rounded-bl-[4px] border border-slate-200/60'
                }`}
              >
                <p className="font-['Noto_Sans'] leading-relaxed">{m.text}</p>
                <span className={`text-[10px] block mt-1 text-right ${
                  m.sender === 'user' ? 'text-white/70' : 'text-[#475569]'
                }`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((q, idx) => {
            const Icon = q.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(q.reply)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#DDEFF4] hover:bg-[#c6e3ec] text-[#0B5F73] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{q.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Hana anything about vitals, kicks, symptoms..."
            className="flex-1 min-h-[44px] px-4 rounded-full bg-[#F1F6F8] text-sm text-[#0F2733] placeholder:text-[#475569] border border-slate-200 focus:outline-none focus:border-[#0B5F73]"
          />
          <button
            onClick={() => handleSend()}
            aria-label="Send message to Hana"
            className="w-11 h-11 rounded-full bg-[#0B5F73] text-white flex items-center justify-center hover:bg-[#084857] active:scale-95 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
