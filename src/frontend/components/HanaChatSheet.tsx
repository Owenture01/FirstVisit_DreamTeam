import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Phone,
  Leaf,
  Smile,
  Pin,
  Lock,
  Wind,
  Send,
  X,
  Users,
  Check,
} from 'lucide-react';
import { HanaAvatar } from './HanaAvatar';

export type HanaView = 'daily' | 'mental_health' | 'mood_question' | 'mood_result';

interface HanaChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp?: () => void;
  gestationalWeek?: number;
  initialView?: HanaView;
}

interface ChatMessage {
  id: string;
  sender: 'hana' | 'user';
  text: string;
  showSenderLabel?: boolean;
}

const DAILY_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'd1',
    sender: 'hana',
    text: "Morning, Mariam! How's the heartburn today?",
    showSenderLabel: true,
  },
  {
    id: 'd2',
    sender: 'user',
    text: 'Better. Can I eat spicy food?',
  },
  {
    id: 'd3',
    sender: 'hana',
    text: 'A little is fine. Wait 2 hours after dinner before lying down.',
    showSenderLabel: true,
  },
  {
    id: 'd4',
    sender: 'hana',
    text: 'Strong pain under your ribs? Press Help.',
    showSenderLabel: false,
  },
];

const DAILY_QUICK_CHIPS: { label: string; prompt: string; reply: string }[] = [
  {
    label: 'Foods to avoid',
    prompt: 'Which foods should I avoid for heartburn?',
    reply:
      'Try limiting very greasy meals, peppermint, citrus juice, and late-night caffeine. Smaller meals spaced through the day usually help most.',
  },
  {
    label: 'Iron-rich food',
    prompt: 'What iron-rich foods can I eat?',
    reply:
      'Lentils, spinach, chickpeas, and well-cooked lean meats are great. Pair them with a squeeze of lemon or bell pepper for vitamin C absorption.',
  },
  {
    label: 'Coffee?',
    prompt: 'Can I still have a morning coffee?',
    reply:
      'One small coffee (under 200 mg caffeine a day) is generally fine—having it after breakfast rather than on an empty stomach can ease heartburn.',
  },
];

const MOOD_OPTIONS = ['Calm', 'Tired', 'Worried', 'Low'] as const;
type MoodTag = (typeof MOOD_OPTIONS)[number];

const MOOD_USER_MESSAGES: Record<MoodTag, { userText: string; hanaReply: string }> = {
  Calm: {
    userText: 'Feeling calmer today.',
    hanaReply:
      'Glad to hear that, Mariam. Would you like a quick breathing check-in or to chat with Noura anytime?',
  },
  Tired: {
    userText: 'Very tired after last night.',
    hanaReply:
      'Growing a baby in week 31 takes real energy. Want to breathe together for 2 minutes or talk to Noura?',
  },
  Worried: {
    userText: 'Worried about the birth.',
    hanaReply: "That's very normal. Want to breathe together or talk to Noura?",
  },
  Low: {
    userText: 'Feeling a bit low today.',
    hanaReply:
      'Thank you for sharing honestly. You do not have to carry this alone—want to breathe together or talk to Noura?',
  },
};

const MOOD_QUESTIONS = [
  {
    questionNumber: 4,
    question: 'Have you felt worried or on edge without a clear reason?',
    options: [
      'Yes, most of the time',
      'Yes, sometimes',
      'Not very often',
      'No, not at all',
    ],
    defaultSelected: 'Yes, sometimes',
  },
  {
    questionNumber: 10,
    question: 'Have you felt overwhelmed or like things are getting on top of you?',
    options: [
      'Yes, quite often',
      'Yes, occasionally',
      'Hardly ever',
      'No, not at all',
    ],
    defaultSelected: 'Yes, occasionally',
  },
];

const CALL_TIME_OPTIONS = ['Today, around 16:00', 'Today, around 17:30', 'Tomorrow, 09:30'];

export const HanaChatSheet: React.FC<HanaChatSheetProps> = ({
  isOpen,
  onClose,
  onOpenHelp = () => {},
  gestationalWeek = 31,
  initialView = 'daily',
}) => {
  const [activeView, setActiveView] = useState<HanaView>(initialView);

  // Daily chat state
  const [dailyMessages, setDailyMessages] = useState<ChatMessage[]>(
    DAILY_INITIAL_MESSAGES
  );
  const [memoryTopic, setMemoryTopic] = useState('heartburn');
  const [isEditingMemory, setIsEditingMemory] = useState(false);
  const [memoryDraft, setMemoryDraft] = useState('heartburn');
  const [dailyInput, setDailyInput] = useState('');

  // Mental health chat state
  const [selectedMood, setSelectedMood] = useState<MoodTag>('Worried');
  const [mentalMessages, setMentalMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'hana',
      text: 'How are you feeling today?',
      showSenderLabel: true,
    },
    {
      id: 'm2',
      sender: 'user',
      text: MOOD_USER_MESSAGES.Worried.userText,
    },
    {
      id: 'm3',
      sender: 'hana',
      text: MOOD_USER_MESSAGES.Worried.hanaReply,
      showSenderLabel: true,
    },
  ]);
  const [mentalInput, setMentalInput] = useState('');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (4s)' | 'Exhale (6s)'>(
    'Inhale (4s)'
  );

  // Mood check question state (Screen 17)
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>(
    MOOD_QUESTIONS[0].defaultSelected
  );

  // Mood check result state (Screen 18)
  const [callTime, setCallTime] = useState('Today, around 16:00');
  const [showTimeChoices, setShowTimeChoices] = useState(false);
  const [isCallingNoura, setIsCallingNoura] = useState(false);
  const [letAhmedKnow, setLetAhmedKnow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveView(initialView);
      setQuestionIdx(0);
      setSelectedOption(MOOD_QUESTIONS[0].defaultSelected);
      setIsBreathingActive(false);
      setIsCallingNoura(false);
      setShowTimeChoices(false);
    }
  }, [isOpen, initialView]);

  // Breathing cadence loop when breathing exercise is open
  useEffect(() => {
    if (!isBreathingActive) return;
    const phases: ('Inhale (4s)' | 'Hold (4s)' | 'Exhale (6s)')[] = [
      'Inhale (4s)',
      'Hold (4s)',
      'Exhale (6s)',
    ];
    let step = 0;
    setBreathPhase(phases[0]);
    const interval = window.setInterval(() => {
      step = (step + 1) % phases.length;
      setBreathPhase(phases[step]);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [isBreathingActive]);

  if (!isOpen) return null;

  const handleSendDaily = (customText?: string, presetReply?: string) => {
    const text = (customText ?? dailyInput).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `du-${Date.now()}`,
      sender: 'user',
      text,
    };
    setDailyMessages((prev) => [...prev, userMsg]);
    if (!customText) setDailyInput('');

    window.setTimeout(() => {
      let replyText =
        presetReply ??
        `Noted for week ${gestationalWeek}. Keep sipping water slowly—and if you feel strong pain under your ribs or sudden swelling, press Help right away.`;
      if (!presetReply) {
        const lower = text.toLowerCase();
        if (lower.includes('bp') || lower.includes('pressure') || lower.includes('headache')) {
          replyText =
            'I cannot diagnose, so please sit calmly for 5 minutes and check with your upper-arm cuff. If BP is 140/90 or above, re-check or press Help.';
        } else if (lower.includes('kick') || lower.includes('move')) {
          replyText =
            'Aim for 10 kicks in 12 hours when resting. If baby is moving less than usual, go to the maternity unit right away.';
        }
      }
      setDailyMessages((prev) => [
        ...prev,
        {
          id: `dh-${Date.now()}`,
          sender: 'hana',
          text: replyText,
          showSenderLabel: true,
        },
      ]);
    }, 380);
  };

  const handleSelectMood = (mood: MoodTag) => {
    setSelectedMood(mood);
    const preset = MOOD_USER_MESSAGES[mood];
    setMentalMessages([
      {
        id: 'm1',
        sender: 'hana',
        text: 'How are you feeling today?',
        showSenderLabel: true,
      },
      {
        id: `m2-${mood}`,
        sender: 'user',
        text: preset.userText,
      },
      {
        id: `m3-${mood}`,
        sender: 'hana',
        text: preset.hanaReply,
        showSenderLabel: true,
      },
    ]);
  };

  const handleSendMental = () => {
    const text = mentalInput.trim();
    if (!text) return;

    setMentalMessages((prev) => [
      ...prev,
      { id: `mu-${Date.now()}`, sender: 'user', text },
    ]);
    setMentalInput('');

    window.setTimeout(() => {
      setMentalMessages((prev) => [
        ...prev,
        {
          id: `mh-${Date.now()}`,
          sender: 'hana',
          text: "Thank you for sharing that with me. You can breathe together below, or share a short private check with Midwife Noura.",
          showSenderLabel: true,
        },
      ]);
    }, 380);
  };

  const handleNextQuestion = () => {
    if (questionIdx < MOOD_QUESTIONS.length - 1) {
      const nextIdx = questionIdx + 1;
      setQuestionIdx(nextIdx);
      setSelectedOption(MOOD_QUESTIONS[nextIdx].defaultSelected);
    } else {
      setActiveView('mood_result');
    }
  };

  const currentQuestion = MOOD_QUESTIONS[questionIdx];
  const progressPercentClass = questionIdx === 0 ? 'w-[40%]' : 'w-[90%]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hana companion"
      className="absolute inset-0 z-[35] bg-[#F1F6F8] text-[#0F2733] flex flex-col overflow-hidden text-left"
    >
      {/* =====================================================================
          SCREENS 15 & 16 · HANA CHAT (DAILY & MENTAL HEALTH)
          ===================================================================== */}
      {(activeView === 'daily' || activeView === 'mental_health') && (
        <>
          {/* Header Bar */}
          <div className="px-3 pt-3 pb-2.5 bg-[#FBFDFE] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Hana companion"
                className="min-w-[44px] min-h-[44px] -ml-1 rounded-full flex items-center justify-center text-[#0F2733] hover:bg-[#F1F6F8] transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
              </button>

              <div className="w-9 h-9 rounded-full bg-[#DDEFF4]/70 border border-[#DCE5EA] flex items-center justify-center overflow-hidden shrink-0">
                <HanaAvatar size="sm" animated />
              </div>

              <div className="min-w-0">
                <h2 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-tight truncate">
                  Hana
                </h2>
                <p className="font-['Noto_Sans'] text-[11.5px] text-[#475569] leading-tight truncate">
                  AI helper · not a doctor
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenHelp}
              aria-label="Emergency help"
              className="min-h-[38px] h-9 px-3.5 rounded-full bg-[#B3261E] hover:bg-[#8F1D17] text-white font-['Figtree'] font-bold text-[13px] flex items-center gap-1.5 shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>Help</span>
            </button>
          </div>

          {/* Two-Part Segmented Tab Switcher */}
          <div className="px-4 pb-3 bg-[#FBFDFE] border-b border-[#DCE5EA] shrink-0">
            <div className="grid grid-cols-2 gap-1 p-1 rounded-[14px] bg-[#E3ECF0]">
              <button
                type="button"
                onClick={() => setActiveView('daily')}
                className={`min-h-[38px] py-1.5 px-3 rounded-[10px] font-['Figtree'] text-[13px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeView === 'daily'
                    ? 'bg-white text-[#0B5F73] font-bold shadow-2xs'
                    : 'text-[#334155] font-semibold hover:text-[#0F2733]'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" strokeWidth={2.1} />
                <span>Daily</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('mental_health')}
                className={`min-h-[38px] py-1.5 px-3 rounded-[10px] font-['Figtree'] text-[13px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeView === 'mental_health'
                    ? 'bg-white text-[#0B5F73] font-bold shadow-2xs'
                    : 'text-[#334155] font-semibold hover:text-[#0F2733]'
                }`}
              >
                <Smile className="w-3.5 h-3.5" strokeWidth={2.1} />
                <span>Mental health</span>
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {activeView === 'daily' ? (
              <>
                {/* Memory Pin Banner */}
                <div className="w-full rounded-[12px] bg-[#FBFDFE] border border-[#DCE5EA] px-3 py-2 flex items-center justify-between gap-2">
                  {isEditingMemory ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={memoryDraft}
                        onChange={(e) => setMemoryDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setMemoryTopic(memoryDraft.trim() || 'heartburn');
                            setIsEditingMemory(false);
                          }
                        }}
                        aria-label="Edit Hana memory note"
                        className="flex-1 min-w-0 px-2.5 py-1 rounded-lg bg-[#F1F6F8] border border-[#DCE5EA] text-[12px] text-[#0F2733] focus:outline-none focus:border-[#0B5F73]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setMemoryTopic(memoryDraft.trim() || 'heartburn');
                          setIsEditingMemory(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[11px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 min-w-0 text-[12px]">
                        <Pin className="w-3.5 h-3.5 text-[#475569] shrink-0" />
                        <span className="truncate text-[#334155]">
                          <strong className="font-['Figtree'] font-bold text-[#0F2733]">
                            Hana remembers
                          </strong>{' '}
                          week {gestationalWeek} · {memoryTopic}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMemoryDraft(memoryTopic);
                          setIsEditingMemory(true);
                        }}
                        className="font-['Figtree'] font-bold text-[12px] text-[#0B5F73] hover:underline shrink-0 px-1 py-0.5 cursor-pointer"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>

                {/* Daily Conversation Thread */}
                <div className="flex flex-col space-y-2.5 pt-1">
                  {dailyMessages.map((msg) =>
                    msg.sender === 'user' ? (
                      <div
                        key={msg.id}
                        className="self-end max-w-[80%] rounded-[18px] rounded-tr-[6px] bg-[#0B5F73] text-white px-3.5 py-2.5 shadow-2xs"
                      >
                        <p className="font-['Noto_Sans'] text-[13.5px] leading-snug">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <div
                        key={msg.id}
                        className="self-start max-w-[82%] rounded-[18px] rounded-tl-[6px] bg-[#FBFDFE] border border-[#DCE5EA] px-3.5 py-2.5 shadow-2xs"
                      >
                        {msg.showSenderLabel && (
                          <span className="font-['Noto_Sans'] text-[11px] font-semibold text-[#475569] block mb-0.5">
                            Hana
                          </span>
                        )}
                        <p className="font-['Noto_Sans'] text-[13.5px] text-[#0F2733] leading-snug">
                          {msg.text}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Mental Health Private Banner */}
                <div className="w-full rounded-[12px] bg-[#FBFDFE] border border-[#DCE5EA] px-3 py-2 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#475569] shrink-0" />
                  <span className="font-['Noto_Sans'] text-[12px] text-[#334155]">
                    Private. Shared with Noura only if you say yes.
                  </span>
                </div>

                {/* Mental Health Conversation + Mood Chips */}
                <div className="flex flex-col space-y-2.5 pt-1">
                  {mentalMessages.map((msg, idx) => (
                    <React.Fragment key={msg.id}>
                      {msg.sender === 'user' ? (
                        <div className="self-end max-w-[80%] rounded-[18px] rounded-tr-[6px] bg-[#0B5F73] text-white px-3.5 py-2.5 shadow-2xs">
                          <p className="font-['Noto_Sans'] text-[13.5px] leading-snug">
                            {msg.text}
                          </p>
                        </div>
                      ) : (
                        <div className="self-start max-w-[82%] rounded-[18px] rounded-tl-[6px] bg-[#FBFDFE] border border-[#DCE5EA] px-3.5 py-2.5 shadow-2xs">
                          {msg.showSenderLabel && (
                            <span className="font-['Noto_Sans'] text-[11px] font-semibold text-[#475569] block mb-0.5">
                              Hana
                            </span>
                          )}
                          <p className="font-['Noto_Sans'] text-[13.5px] text-[#0F2733] leading-snug">
                            {msg.text}
                          </p>
                        </div>
                      )}

                      {/* Mood Selector Pills right after Hana's opening question */}
                      {idx === 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap py-0.5">
                          {MOOD_OPTIONS.map((mood) => {
                            const isSelected = selectedMood === mood;
                            return (
                              <button
                                key={mood}
                                type="button"
                                onClick={() => handleSelectMood(mood)}
                                aria-pressed={isSelected}
                                className={`min-h-[34px] px-3.5 py-1 rounded-full font-['Figtree'] text-[12.5px] transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FBEBD0] border border-[#D9822B] text-[#6E4100] font-bold shadow-2xs'
                                    : 'bg-[#FBFDFE] border border-[#DCE5EA] text-[#0F2733] font-semibold hover:border-[#0B5F73]/50'
                                }`}
                              >
                                {mood}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Two Action Cards: Breathe & Talk to Noura */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsBreathingActive((prev) => !prev)}
                      className="rounded-[16px] bg-[#FBFDFE] border border-[#DCE5EA] hover:border-[#0B5F73]/50 p-3 text-left transition-all cursor-pointer active:scale-[0.99]"
                    >
                      <Wind className="w-4 h-4 text-[#0B5F73]" strokeWidth={2} />
                      <span className="font-['Figtree'] font-bold text-[13.5px] text-[#0F2733] block mt-1.5">
                        Breathe
                      </span>
                      <span className="font-['Noto_Sans'] text-[11.5px] text-[#475569] block">
                        2 minutes
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setQuestionIdx(0);
                        setSelectedOption(MOOD_QUESTIONS[0].defaultSelected);
                        setActiveView('mood_question');
                      }}
                      className="rounded-[16px] bg-[#FBFDFE] border border-[#DCE5EA] hover:border-[#0B5F73]/50 p-3 text-left transition-all cursor-pointer active:scale-[0.99]"
                    >
                      <Phone className="w-4 h-4 text-[#0B5F73]" strokeWidth={2} />
                      <span className="font-['Figtree'] font-bold text-[13.5px] text-[#0F2733] block mt-1.5">
                        Talk to Noura
                      </span>
                      <span className="font-['Noto_Sans'] text-[11.5px] text-[#475569] block">
                        Today 16:00
                      </span>
                    </button>
                  </div>

                  {/* Interactive Guided Breathing Helper */}
                  {isBreathingActive && (
                    <div className="rounded-[16px] bg-[#DDEFF4]/70 border border-[#0B5F73]/25 p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0B5F73] text-white flex items-center justify-center animate-companion-breathe shrink-0">
                          <Wind className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-['Figtree'] font-bold text-[13px] text-[#0F2733] block">
                            {breathPhase}
                          </span>
                          <span className="font-['Noto_Sans'] text-[11.5px] text-[#475569] block">
                            Breathe slowly with Hana
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsBreathingActive(false)}
                        className="px-3 py-1.5 rounded-full bg-white text-[#0B5F73] font-['Figtree'] font-bold text-[11.5px] border border-[#DCE5EA] cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bottom Composer Area */}
          <div className="px-4 pt-2.5 pb-3 bg-[#FBFDFE] border-t border-[#DCE5EA] shrink-0">
            {activeView === 'daily' ? (
              <div className="flex items-center gap-2 overflow-x-auto pb-2.5 no-scrollbar">
                {DAILY_QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleSendDaily(chip.prompt, chip.reply)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#DDEFF4] hover:bg-[#cbe4ec] text-[#0B5F73] font-['Figtree'] font-bold text-[12px] transition-colors shrink-0 cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenHelp}
                className="w-full mb-2.5 rounded-[10px] bg-[#FBE3E0] hover:bg-[#f7d5d1] px-3 py-2 text-left transition-colors cursor-pointer"
              >
                <span className="font-['Noto_Sans'] font-semibold text-[12px] text-[#B3261E] block">
                  Thoughts of harming yourself or baby? Call 998.
                </span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={activeView === 'daily' ? dailyInput : mentalInput}
                onChange={(e) =>
                  activeView === 'daily'
                    ? setDailyInput(e.target.value)
                    : setMentalInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (activeView === 'daily') {
                      handleSendDaily();
                    } else {
                      handleSendMental();
                    }
                  }
                }}
                placeholder="Message Hana"
                aria-label="Message Hana"
                className="flex-1 min-h-[44px] h-11 px-4 rounded-full bg-white text-[14px] text-[#0F2733] placeholder:text-[#64748B] border border-[#DCE5EA] focus:outline-none focus:border-[#0B5F73]"
              />
              <button
                type="button"
                onClick={() =>
                  activeView === 'daily' ? handleSendDaily() : handleSendMental()
                }
                aria-label="Send message to Hana"
                className="w-11 h-11 rounded-full bg-[#0B5F73] hover:bg-[#084857] text-white flex items-center justify-center active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          SCREEN 17 · MOOD CHECK · QUESTION
          ===================================================================== */}
      {activeView === 'mood_question' && (
        <div className="flex-1 flex flex-col justify-between gap-4 overflow-y-auto px-4 pt-3 pb-5 bg-[#F1F6F8]">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveView('mental_health')}
                aria-label="Back to Hana mental health chat"
                className="min-w-[44px] min-h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#0F2733] hover:bg-white/60 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
              </button>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5EA]/85 text-[#334155] font-['Figtree'] font-semibold text-[11.5px]">
                <Lock className="w-3 h-3" strokeWidth={2.2} />
                <span>Only Noura sees this</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full h-1.5 rounded-full bg-[#DCE5EA] overflow-hidden">
                <div
                  className={`h-full rounded-full bg-[#0B5F73] transition-all duration-300 ${progressPercentClass}`}
                />
              </div>
              <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-2">
                Question {currentQuestion.questionNumber} of 10 · past 7 days
              </p>
            </div>

            {/* Question Prompt */}
            <h2 className="font-['Figtree'] font-extrabold text-[22px] text-[#0F2733] leading-[1.25] mt-2">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-2.5 mt-5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    aria-pressed={isSelected}
                    className={`w-full min-h-[52px] px-4 py-3 rounded-[16px] text-left font-['Figtree'] text-[15px] transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FBFDFE] border-2 border-[#0B5F73] text-[#0F2733] font-bold shadow-2xs'
                        : 'bg-[#FBFDFE] border border-[#DCE5EA] text-[#0F2733] font-semibold hover:border-[#0B5F73]/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <p className="font-['Noto_Sans'] text-[12px] text-[#475569] mt-3">
              A short mood check midwives use.
            </p>
          </div>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="w-full min-h-[48px] h-12 rounded-full bg-[#0B5F73] hover:bg-[#084857] text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center active:scale-[0.99] transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {/* =====================================================================
          SCREEN 18 · MOOD CHECK · RESULT
          ===================================================================== */}
      {activeView === 'mood_result' && (
        <div className="flex-1 flex flex-col justify-between gap-4 overflow-y-auto px-4 pt-3 pb-5 bg-[#F1F6F8]">
          <div>
            {/* Top Close Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close mood check result"
                className="min-w-[44px] min-h-[44px] -mr-2 rounded-full flex items-center justify-center text-[#0F2733] hover:bg-white/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={2.2} />
              </button>
            </div>

            {/* Warm Smile Icon + Thank You Copy */}
            <div className="mt-2">
              <div className="w-16 h-16 rounded-full bg-[#FBEBD0] text-[#6E4100] flex items-center justify-center">
                <Smile className="w-8 h-8" strokeWidth={2} />
              </div>

              <h2 className="font-['Figtree'] font-extrabold text-[23px] text-[#0F2733] leading-[1.2] mt-4">
                Thank you for telling us, Mariam
              </h2>
              <p className="font-['Noto_Sans'] text-[13.5px] text-[#475569] mt-1.5">
                Many mums feel this. Noura can help.
              </p>
            </div>

            {/* Midwife Noura Call Card */}
            <div className="w-full rounded-[20px] bg-[#FBFDFE] border border-[#DCE5EA] p-4 mt-5 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FBEBD0] text-[#6E4100] font-['Figtree'] font-bold text-[15px] flex items-center justify-center shrink-0">
                  N
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Figtree'] font-bold text-[14.5px] text-[#0F2733] leading-snug">
                    Midwife Noura will call you
                  </h3>
                  <p className="font-['Noto_Sans'] text-[12.5px] text-[#475569] leading-snug">
                    {callTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                <button
                  type="button"
                  onClick={() => setIsCallingNoura((prev) => !prev)}
                  className="min-h-[44px] h-11 rounded-full bg-[#0B5F73] hover:bg-[#084857] text-white font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  {isCallingNoura ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Calling...</span>
                    </>
                  ) : (
                    <span>Call now</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowTimeChoices((prev) => !prev)}
                  className="min-h-[44px] h-11 rounded-full bg-white hover:bg-[#F1F6F8] border border-[#DCE5EA] text-[#0F2733] font-['Figtree'] font-bold text-[14px] flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                >
                  Change time
                </button>
              </div>

              {showTimeChoices && (
                <div className="mt-3 pt-3 border-t border-[#DCE5EA] flex flex-wrap gap-1.5">
                  {CALL_TIME_OPTIONS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setCallTime(slot);
                        setShowTimeChoices(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors cursor-pointer ${
                        callTime === slot
                          ? 'bg-[#0B5F73] text-white'
                          : 'bg-[#F1F6F8] text-[#0F2733] hover:bg-[#DDEFF4]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Let Ahmed Know Toggle Row */}
            <div className="flex items-center justify-between gap-3 mt-4 px-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className="w-4 h-4 text-[#334155] shrink-0" />
                <span className="font-['Figtree'] font-semibold text-[13.5px] text-[#0F2733]">
                  Let Ahmed know you need rest
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={letAhmedKnow}
                aria-label="Let Ahmed know you need rest"
                onClick={() => setLetAhmedKnow((prev) => !prev)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  letAhmedKnow ? 'bg-[#0B5F73]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    letAhmedKnow ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {letAhmedKnow && (
              <p className="font-['Noto_Sans'] text-[11.5px] text-[#0B5F73] mt-1.5 px-1">
                Quiet rest request sent to Ahmed. Your mood answers stay private.
              </p>
            )}
          </div>

          {/* Bottom Crisis Callout */}
          <button
            type="button"
            onClick={onOpenHelp}
            className="w-full rounded-[14px] bg-[#FBE3E0] hover:bg-[#f7d5d1] px-4 py-3 text-left transition-colors cursor-pointer"
          >
            <span className="font-['Noto_Sans'] font-semibold text-[12.5px] text-[#B3261E] leading-snug block">
              Thoughts of harming yourself or your baby? Call 998 now.
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
