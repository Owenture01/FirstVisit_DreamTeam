import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Sparkles, 
  X, 
  SwitchCamera, 
  Heart, 
  Check, 
  Lock, 
  ChevronLeft, 
  Edit3, 
  Music, 
  Plus
} from 'lucide-react';
import { Header } from '../components/Header';
import { fetalAudio } from '../utils/fetalSound';

interface JourneyScreenProps {
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
  initialSubView?: 'timeline' | 'record' | 'making' | 'player' | 'share';
}

type JourneySubView = 'timeline' | 'record' | 'making' | 'player' | 'share';

interface WeeklyClip {
  week: number;
  title: string;
  comparison: string;
  duration: string;
  gradient: string;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
  initialSubView = 'timeline',
}) => {
  const [subView, setSubView] = useState<JourneySubView>(initialSubView);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<'one_word' | 'wish' | 'today'>('one_word');
  const [includeHeartbeat, setIncludeHeartbeat] = useState(true);
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<'wk12' | 'wk20' | 'wk31'>('wk20');
  const [selectedMusic, setSelectedMusic] = useState<'soft' | 'playful' | 'classic' | 'lullaby'>('soft');
  const [, setMakingStep] = useState(2);

  // Share Sheet state
  const [shareWithAhmed, setShareWithAhmed] = useState(true);
  const [shareWithFatima, setShareWithFatima] = useState(false);
  const [hideHealthReadings, setHideHealthReadings] = useState(true);
  const [includeAudioInShare, setIncludeAudioInShare] = useState(true);
  const [isShareSuccess, setIsShareSuccess] = useState(false);
  const [invitedMessage, setInvitedMessage] = useState(false);

  // Weekly clips data matching mockup (Screen 31)
  const weeklyClips: WeeklyClip[] = [
    {
      week: 30,
      title: 'Crib day',
      comparison: 'Baby is the size of a cabbage',
      duration: '0:14',
      gradient: 'from-[#A8DADC] to-[#457B9D]',
    },
    {
      week: 29,
      title: 'Hiccups!',
      comparison: 'Baby is the size of a squash',
      duration: '0:12',
      gradient: 'from-[#F4A261] to-[#E76F51]',
    },
    {
      week: 28,
      title: 'Big kicks',
      comparison: 'Baby is the size of an aubergine',
      duration: '0:15',
      gradient: 'from-[#E9C46A] to-[#F4A261]',
    },
  ];

  // Making video simulated progression (Screen 33)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (subView === 'making') {
      timer = setTimeout(() => {
        setMakingStep(3);
        const nextTimer = setTimeout(() => {
          setSubView('player');
          setIsPlaying(true);
        }, 1200);
        return () => clearTimeout(nextTimer);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [subView]);

  const togglePlayVideo = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (nextPlaying && includeHeartbeat) {
      fetalAudio.play(138);
    } else {
      fetalAudio.stop();
    }
  };

  return (
    <div className="w-full flex flex-col space-y-3.5 pb-6 text-left relative">
      {/* Subview Quick Jump Chips for Prototype testing */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 bg-[#F1F6F8] dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
        <span className="text-[11px] font-['Figtree'] font-bold text-slate-400 shrink-0 px-1">
          Journey Flow:
        </span>
        <button
          onClick={() => setSubView('timeline')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-['Figtree'] font-bold shrink-0 transition-colors ${
            subView === 'timeline' ? 'bg-[#0B5F73] text-white shadow-xs' : 'bg-white text-[#475569] hover:bg-slate-50'
          }`}
        >
          31 · Timeline
        </button>
        <button
          onClick={() => setSubView('record')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-['Figtree'] font-bold shrink-0 transition-colors ${
            subView === 'record' ? 'bg-[#0B5F73] text-white shadow-xs' : 'bg-white text-[#475569] hover:bg-slate-50'
          }`}
        >
          32 · Record
        </button>
        <button
          onClick={() => setSubView('making')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-['Figtree'] font-bold shrink-0 transition-colors ${
            subView === 'making' ? 'bg-[#0B5F73] text-white shadow-xs' : 'bg-white text-[#475569] hover:bg-slate-50'
          }`}
        >
          33 · Making
        </button>
        <button
          onClick={() => setSubView('player')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-['Figtree'] font-bold shrink-0 transition-colors ${
            subView === 'player' ? 'bg-[#0B5F73] text-white shadow-xs' : 'bg-white text-[#475569] hover:bg-slate-50'
          }`}
        >
          34 · Video
        </button>
        <button
          onClick={() => setSubView('share')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-['Figtree'] font-bold shrink-0 transition-colors ${
            subView === 'share' ? 'bg-[#0B5F73] text-white shadow-xs' : 'bg-white text-[#475569] hover:bg-slate-50'
          }`}
        >
          35 · Share
        </button>
      </div>

      {/* Screen 31: Journey Timeline (Default Main View) */}
      {subView === 'timeline' && (
        <div className="w-full flex flex-col space-y-3.5 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-1 pt-1">
            <div>
              <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
                Your journey
              </h1>
              <p className="font-['Noto_Sans'] text-[14px] text-[#475569]">
                Week 31 · 14 check-ins
              </p>
            </div>

            <button
              onClick={onOpenProfile}
              aria-label="Mother profile"
              className="w-10 h-10 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-extrabold text-[15px] flex items-center justify-center hover:bg-[#cbe7ee] transition-colors border border-slate-200 shadow-xs"
            >
              M
            </button>
          </div>

          {/* AI Montage Hero Card */}
          <div className="w-full bg-[#0B5F73] text-white rounded-[24px] p-5 relative overflow-hidden shadow-sm">
            <div className="absolute top-2 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-['Figtree'] font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#F2A541]" />
              <span>Made by AI</span>
            </div>

            <div className="flex items-start gap-4 mb-4 mt-2">
              {/* Video Thumbnail with play icon */}
              <div 
                onClick={() => {
                  setSubView('player');
                  setIsPlaying(true);
                  if (includeHeartbeat) fetalAudio.play(138);
                }}
                className="w-20 h-24 rounded-2xl bg-gradient-to-br from-[#F4A261] via-[#E76F51] to-[#E9C46A] flex items-center justify-center shadow-md cursor-pointer hover:scale-102 transition-transform shrink-0 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/90 text-[#0B5F73] flex items-center justify-center shadow-md group-hover:bg-white transition-colors">
                  <Play className="w-4 h-4 fill-[#0B5F73] ml-0.5" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex-1 pr-2">
                <h2 className="font-['Figtree'] font-extrabold text-[19px] text-white leading-snug">
                  Baby's story so far
                </h2>
                <p className="font-['Noto_Sans'] text-[13px] text-[#DDEFF4] mt-1">
                  1:12 · Weeks 12 to 31
                </p>
                <p className="text-[11px] text-white/70 mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Private until shared</span>
                </p>
              </div>
            </div>

            {/* Action Buttons: Watch & Remake */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => {
                  setSubView('player');
                  setIsPlaying(true);
                  if (includeHeartbeat) fetalAudio.play(138);
                }}
                className="flex-1 min-h-[44px] bg-white text-[#0B5F73] hover:bg-slate-100 font-['Figtree'] font-bold text-[15px] rounded-full flex items-center justify-center transition-colors shadow-xs"
              >
                Watch
              </button>

              <button
                onClick={() => {
                  setMakingStep(0);
                  setSubView('making');
                }}
                className="flex-1 min-h-[44px] bg-white/15 hover:bg-white/25 text-white font-['Figtree'] font-bold text-[15px] rounded-full flex items-center justify-center transition-colors border border-white/20"
              >
                Remake
              </button>
            </div>
          </div>

          {/* Week 31 Check-in Prompt Bar */}
          <div className="w-full bg-[#FBFDFE] border border-slate-200/90 rounded-[20px] p-4 flex items-center justify-between shadow-xs">
            <div className="pr-3">
              <span className="font-['Figtree'] font-bold text-[14px] text-[#0F2733] block">
                Week 31 check-in
              </span>
              <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
                Show the bump, say one word
              </span>
            </div>

            <button
              onClick={() => setSubView('record')}
              aria-label="Record check-in clip"
              className="w-11 h-11 rounded-full bg-[#B3261E] hover:bg-[#8F1D17] text-white flex items-center justify-center shadow-sm shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
            </button>
          </div>

          {/* Every week list */}
          <div className="pt-2">
            <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733] mb-3 px-1">
              Every week
            </h2>

            <div className="space-y-2.5">
              {weeklyClips.map((clip) => (
                <div
                  key={clip.week}
                  onClick={() => {
                    setSubView('player');
                    setIsPlaying(true);
                  }}
                  className="w-full bg-[#FBFDFE] hover:bg-slate-50 border border-slate-200/80 rounded-[18px] p-3 flex items-center gap-3.5 transition-colors cursor-pointer group shadow-2xs"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${clip.gradient} flex items-end justify-end p-1 shadow-xs shrink-0 relative overflow-hidden`}>
                    <span className="relative z-10 px-1 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] font-bold">
                      {clip.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] truncate">
                      Week {clip.week} · "{clip.title}"
                    </h3>
                    <p className="font-['Noto_Sans'] text-[13px] text-[#475569] truncate">
                      {clip.comparison}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#F1F6F8] text-[#0B5F73] flex items-center justify-center group-hover:bg-[#0B5F73] group-hover:text-white transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen 32: Journey · Record View */}
      {subView === 'record' && (
        <div className="fixed inset-0 z-50 bg-[#15252D] text-white flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsRecording(false);
                setSubView('timeline');
              }}
              className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-3 py-1 rounded-full bg-white/20 text-white font-['Figtree'] font-bold text-[13px]">
              Week 31
            </div>

            <button
              className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <SwitchCamera className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full max-w-sm mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#F2A541] text-[#6E4100] font-['Figtree'] font-extrabold text-[10px] uppercase tracking-wide mb-1">
              This week's prompt
            </span>
            <p className="font-['Figtree'] font-bold text-[14px] text-white">
              Show the bump, then say one word for this week
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-4 relative">
            <div className="w-56 h-72 rounded-[999px] border-2 border-dashed border-white/50 flex items-center justify-center relative">
              <span className="font-['Figtree'] font-medium text-[13px] text-white/80 bg-black/40 px-3 py-1 rounded-full">
                Bump here
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => setSelectedPrompt('one_word')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors ${
                selectedPrompt === 'one_word'
                  ? 'bg-white text-[#0F2733]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              One word
            </button>

            <button
              onClick={() => setSelectedPrompt('wish')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors ${
                selectedPrompt === 'wish'
                  ? 'bg-white text-[#0F2733]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              A wish for baby
            </button>

            <button
              onClick={() => setSelectedPrompt('today')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors ${
                selectedPrompt === 'today'
                  ? 'bg-white text-[#0F2733]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Baby did today
            </button>
          </div>

          <div className="flex items-center justify-between px-4 pb-4">
            <button
              onClick={() => setIncludeHeartbeat(!includeHeartbeat)}
              className="flex items-center gap-1.5 text-left text-[11px] text-white/80 hover:text-white"
            >
              <Heart className={`w-4 h-4 ${includeHeartbeat ? 'fill-[#F2A541] text-[#F2A541]' : 'text-white/60'}`} />
              <span className="leading-tight">
                Add<br />heartbeat<br />sound
              </span>
            </button>

            <button
              onClick={() => {
                setIsRecording(true);
                setTimeout(() => {
                  setIsRecording(false);
                  setMakingStep(0);
                  setSubView('making');
                }, 1500);
              }}
              aria-label="Capture clip"
              className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <div className={`w-full h-full rounded-full bg-[#B3261E] flex items-center justify-center transition-all ${
                isRecording ? 'rounded-md scale-75 animate-pulse' : ''
              }`} />
            </button>

            <div className="font-mono text-[14px] text-white/90">
              <span className="font-bold">0:07</span>
              <span className="text-white/60">/0:15</span>
            </div>
          </div>
        </div>
      )}

      {/* Screen 33: Journey · Making Video View */}
      {subView === 'making' && (
        <div className="fixed inset-0 z-50 bg-[#F1F6F8] flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setSubView('timeline')}
              className="w-9 h-9 rounded-full bg-white text-[#0F2733] flex items-center justify-center shadow-xs border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-36 flex items-center justify-center mb-8">
              <div className="absolute w-24 h-32 rounded-2xl bg-gradient-to-br from-[#A8DADC] to-[#457B9D] -rotate-12 -translate-x-8 shadow-md" />
              <div className="absolute w-24 h-32 rounded-2xl bg-gradient-to-br from-[#F4A261] to-[#E76F51] rotate-12 translate-x-8 shadow-md" />
              <div className="relative z-10 w-26 h-34 rounded-2xl bg-gradient-to-br from-[#F2A541] to-[#E76F51] flex items-center justify-center shadow-xl animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="font-['Figtree'] font-extrabold text-[22px] text-[#0F2733] mb-6 text-center">
              Making your journey video
            </h2>

            <div className="w-full max-w-xs space-y-3.5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-left">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-['Figtree'] font-bold text-[14px] text-[#0F2733]">
                  Picked 14 best moments
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-['Figtree'] font-bold text-[14px] text-[#0F2733]">
                  Put them in week order
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F2A541] text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-['Figtree'] font-bold text-[14px] text-[#0F2733]">
                  Adding baby's heartbeat sound
                </span>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                <span className="font-['Figtree'] font-bold text-[14px] text-[#475569]">
                  Choosing gentle music
                </span>
              </div>
            </div>
          </div>

          <div className="pb-4 text-center">
            <p className="font-['Noto_Sans'] text-[12px] text-[#475569] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#0B5F73]" />
              <span>Made on your phone, private until you share</span>
            </p>
          </div>
        </div>
      )}

      {/* Screen 34: Journey · Video Player / Editor */}
      {subView === 'player' && (
        <div className="fixed inset-0 z-50 bg-[#0E1A20] text-white flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                fetalAudio.stop();
                setSubView('timeline');
              }}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <span className="font-['Figtree'] font-bold text-[16px] text-white">
              Baby's story
            </span>

            <button
              onClick={() => setSubView('making')}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 my-3 rounded-[24px] bg-gradient-to-br from-[#F4A261] via-[#E76F51] to-[#E9C46A] relative overflow-hidden flex flex-col justify-between p-5 shadow-2xl">
            <div className="flex justify-end">
              <span className="px-2.5 py-1 rounded-full bg-black/40 text-white text-[11px] font-mono">
                1:12
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={togglePlayVideo}
                className="w-16 h-16 rounded-full bg-white/90 text-[#0B5F73] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-[#0B5F73]" />
                ) : (
                  <Play className="w-7 h-7 fill-[#0B5F73] ml-1" />
                )}
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-xs rounded-xl p-3 border border-white/20">
              <span className="font-['Noto_Sans'] text-[12px] text-white/80 block">
                Weeks 12 to 31
              </span>
              <h3 className="font-['Figtree'] font-extrabold text-[18px] text-white mb-1.5">
                Mariam and baby
              </h3>

              <div className="h-6 flex items-center justify-between text-white/80">
                <div className="flex-1 flex items-center gap-1 overflow-hidden">
                  <div className="w-full h-0.5 bg-white/40 relative">
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-8 h-4 flex items-center">
                      <svg className="w-full h-full stroke-white fill-none stroke-[2]" viewBox="0 0 40 20">
                        <path d="M 0 10 L 12 10 L 15 2 L 18 18 L 22 10 L 40 10" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 pl-2 text-[11px] font-['Figtree'] font-bold text-[#F2A541]">
                  <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>138 bpm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 mb-2">
            <button
              onClick={() => setSelectedChapter('wk12')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold shrink-0 transition-colors ${
                selectedChapter === 'wk12'
                  ? 'bg-white text-[#0F2733]'
                  : 'bg-white/15 text-white'
              }`}
            >
              Wk 12 · First scan
            </button>

            <button
              onClick={() => setSelectedChapter('wk20')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold shrink-0 transition-colors ${
                selectedChapter === 'wk20'
                  ? 'bg-[#F2A541] text-[#6E4100]'
                  : 'bg-white/15 text-white'
              }`}
            >
              Wk 20 · First kick
            </button>

            <button
              onClick={() => setSelectedChapter('wk31')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-['Figtree'] font-bold shrink-0 transition-colors ${
                selectedChapter === 'wk31'
                  ? 'bg-white text-[#0F2733]'
                  : 'bg-white/15 text-white'
              }`}
            >
              Wk 31
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedMusic('soft')}
                className={`px-3 py-1 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors ${
                  selectedMusic === 'soft' ? 'bg-white text-[#0F2733]' : 'bg-white/15 text-white'
                }`}
              >
                Soft
              </button>

              <button
                onClick={() => setSelectedMusic('playful')}
                className={`px-3 py-1 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors ${
                  selectedMusic === 'playful' ? 'bg-white text-[#0F2733]' : 'bg-white/15 text-white'
                }`}
              >
                Playful
              </button>

              <button
                onClick={() => setSelectedMusic('classic')}
                className={`px-3 py-1 rounded-full text-[12px] font-['Figtree'] font-bold transition-colors ${
                  selectedMusic === 'classic' ? 'bg-white text-[#0F2733]' : 'bg-white/15 text-white'
                }`}
              >
                Classic
              </button>
            </div>

            <button
              onClick={() => setSelectedMusic('lullaby')}
              className={`flex items-center gap-1 text-[12px] font-['Figtree'] font-bold ${
                selectedMusic === 'lullaby' ? 'text-[#F2A541]' : 'text-white/70'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Lullaby</span>
            </button>
          </div>

          <div className="flex items-center gap-3 pb-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                fetalAudio.stop();
                setSubView('timeline');
              }}
              className="flex-1 min-h-[44px] bg-white/15 hover:bg-white/25 text-white font-['Figtree'] font-bold text-[15px] rounded-full flex items-center justify-center transition-colors"
            >
              Save
            </button>

            <button
              onClick={() => setSubView('share')}
              className="flex-1 min-h-[44px] bg-white hover:bg-slate-100 text-[#0B5F73] font-['Figtree'] font-bold text-[15px] rounded-full flex items-center justify-center transition-colors shadow-sm"
            >
              Share
            </button>
          </div>
        </div>
      )}

      {/* Screen 35: Journey · Share Sheet */}
      {subView === 'share' && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[430px] bg-white rounded-t-[28px] p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-2 mb-2" />

            <div className="flex items-center justify-between">
              <h2 className="font-['Figtree'] font-extrabold text-[20px] text-[#0F2733]">
                Who can watch?
              </h2>

              <button
                onClick={() => setSubView('player')}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div 
                onClick={() => setShareWithAhmed(!shareWithAhmed)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#FBFDFE] border border-slate-200/90 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-extrabold text-[14px] flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733]">
                      Ahmed · husband
                    </h3>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  shareWithAhmed ? 'bg-[#0B5F73] text-white' : 'border-2 border-slate-300'
                }`}>
                  {shareWithAhmed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div 
                onClick={() => setShareWithFatima(!shareWithFatima)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#FBFDFE] border border-slate-200/90 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-['Figtree'] font-extrabold text-[14px] flex items-center justify-center">
                    F
                  </div>
                  <div>
                    <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733]">
                      Fatima · mum
                    </h3>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  shareWithFatima ? 'bg-[#0B5F73] text-white' : 'border-2 border-slate-300'
                }`}>
                  {shareWithFatima && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <button 
                onClick={() => setInvitedMessage(true)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-slate-300 text-[#0B5F73] font-['Figtree'] font-bold text-[14px] hover:bg-[#F1F6F8] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#F1F6F8] text-[#0B5F73] flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <span>{invitedMessage ? 'Invite link copied to clipboard!' : 'Add someone'}</span>
              </button>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-['Figtree'] font-bold text-[14px] text-[#0F2733]">
                    Hide health readings
                  </h4>
                  <p className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                    No heart rate or BP in the video
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setHideHealthReadings(!hideHealthReadings)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    hideHealthReadings ? 'bg-[#0B5F73]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    hideHealthReadings ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-['Figtree'] font-bold text-[14px] text-[#0F2733]">
                    Baby's heartbeat sound
                  </h4>
                  <p className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                    Recorded by your band
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIncludeAudioInShare(!includeAudioInShare)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    includeAudioInShare ? 'bg-[#0B5F73]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    includeAudioInShare ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsShareSuccess(true);
                  setTimeout(() => {
                    setIsShareSuccess(false);
                    setSubView('timeline');
                  }, 1200);
                }}
                className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                {isShareSuccess ? '✓ Shared with Ahmed' : 'Share with Ahmed'}
              </button>

              <button
                onClick={() => setSubView('timeline')}
                className="w-full min-h-[44px] bg-slate-100 hover:bg-slate-200 text-[#0F2733] font-['Figtree'] font-bold text-[14px] rounded-full flex items-center justify-center transition-colors"
              >
                Save to my phone only
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
