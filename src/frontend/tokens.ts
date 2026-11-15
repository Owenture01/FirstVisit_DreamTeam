/**
 * FirstVisit Design Tokens
 * Replicated directly from design specs in image_beffec35.png
 * 
 * Rules:
 * - Touch targets: 44px or more, 8px apart
 * - Status always has an icon and words, never colour alone
 * - Motion with a job: heartbeat at live bpm, sheets slide up, kick ring fills; all off with reduced motion
 * - Icons: one outline set, 2px stroke
 * - Radius: cards 20 (clinic 16), tiles 18, inputs 12, buttons and badges full
 * - Spacing: 4, 8, 12, 16, 20, 24
 */

export const tokens = {
  colors: {
    // Primary brand: Calm clinical teal (7.4:1 contrast on white)
    primary: '#0B5F73',
    primarySoft: '#DDEFF4',
    
    // Status colors
    success: '#15803D', // Connected, done (health green)
    review: '#F2A541',  // Amber ring
    reviewText: '#6E4100', // Amber text
    urgent: '#B3261E',  // Red only for urgent
    urgentSoft: '#FBE3E0', // Soft red background
    
    // Structure & Guardrail
    guardrail: '#E6EEF1',
    guardrailText: '#1E293B',
    background: '#F1F6F8',
    cards: '#FBFDFE',
    text: '#0F2733',
    muted: '#475569',
    
    // Dark mode palette
    dark: {
      bg: '#0E1A20',
      surface: '#15252D',
      primary: '#6CCBE0',
      muted: '#A9B8C0',
      text: '#F1F6F8',
    }
  },
  
  typography: {
    heading: "font-['Figtree'] text-[26px] font-[800] leading-tight",
    cardTitle: "font-['Figtree'] text-[17px] font-[700] leading-snug",
    body: "font-['Noto_Sans'] text-[16px] font-[400] leading-[1.5]",
    caption: "font-['Noto_Sans'] text-[14px] font-[400] leading-normal", // Never below 12px
    metric: "font-['Figtree'] tabular-nums font-[800]",
  },
  
  radius: {
    cards: 'rounded-[20px]',
    clinicCards: 'rounded-[16px]',
    tiles: 'rounded-[18px]',
    inputs: 'rounded-[12px]',
    full: 'rounded-full',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
  }
} as const;
