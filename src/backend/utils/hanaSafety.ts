export interface LoggedMedicationContext {
  name: string;
  time: string;
  status: 'taken' | 'due';
  badgeText?: string;
}

export interface HanaPromptContext {
  patientName?: string;
  gestationalWeek?: number;
  gestationalDay?: number;
  memoryTopic?: string;
  mode?: 'daily' | 'mental_health';
  loggedMedications?: LoggedMedicationContext[];
  vitals?: {
    bp?: string;
    heartRate?: number;
    fetalHeartRate?: number;
  };
}

export interface RedFlagDetectionResult {
  triggered: boolean;
  reason?: string;
  matchedSymptom?: string;
  matchedSymptoms?: string[];
  detectedBP?: string;
}

export interface ParsedHanaResponse {
  cleanText: string;
  triggerHelpTakeover: boolean;
}

export const TRIGGER_HELP_TOKEN = '[TRIGGER_HELP_TAKEOVER]';

export const EMERGENCY_STANDARD_REPLY =
  'I am concerned about what you just shared. This is a symptom that needs immediate medical attention.';

export const EXACT_NEW_SUPPLEMENT_REPLY =
  'I can only remind you of medications logged by your healthcare provider. Please consult your doctor before adding new supplements.';

export const EXACT_NO_PRESCRIBE_REPLY =
  'Please consult your doctor before taking any new medication.';

export function buildHanaSystemInstruction(context: HanaPromptContext): string {
  const patientName = context.patientName || 'Mariam';
  const week = context.gestationalWeek ?? 31;
  const day = context.gestationalDay ?? 4;
  const memoryTopic = context.memoryTopic || 'heartburn';
  const mode = context.mode || 'daily';

  const medsList =
    context.loggedMedications && context.loggedMedications.length > 0
      ? context.loggedMedications
          .map((m) => `- ${m.name} at ${m.time} (status: ${m.status}${m.badgeText ? `, ${m.badgeText}` : ''})`)
          .join('\n')
      : '- Folic acid at 08:00 (status: taken)\n- Iron at 13:00 (status: taken)\n- Aspirin at 20:00 (status: due)';

  const bpDisplay = context.vitals?.bp || '128/82';
  const hrDisplay = context.vitals?.heartRate ?? 88;
  const fhrDisplay = context.vitals?.fetalHeartRate ?? 138;

  return `You are Hana, the empathetic, supportive, and clinically neutral AI Companion inside the FirstVisit Monitor ecosystem for pregnant and postpartum mothers.

PATIENT CONTEXT:
- Mother's name: ${patientName}
- Gestational stage: Week ${week}, Day ${day}
- Current active mode: ${mode === 'mental_health' ? 'Mental Health & Emotional Check-in' : 'Daily Pregnancy Support'}
- Pinned note Hana remembers: ${memoryTopic}
- Latest monitored vitals: Blood Pressure ${bpDisplay} mmHg, Maternal Heart Rate ${hrDisplay} bpm, Baby Heartbeat ${fhrDisplay} bpm
- Doctor-logged prescribed medications in the app (ONLY remind about these):
${medsList}

1. TONE AND PERSONA:
- Be warm, empathetic, and validating. Acknowledge ${patientName}'s feelings without minimizing them or offering unverified reassurance.
- Use simple, plain, everyday language. Avoid overly complex medical jargon.
- Keep replies concise, calm, and mobile-friendly (2 to 4 short sentences unless explaining simple WHO lifestyle steps).
- Be culturally sensitive and respectful.

2. CORE RESPONSIBILITIES:
- Mental Health & Support: Check in warmly on her feelings (especially during first trimester fatigue/anxiety or late-pregnancy worries). Offer comforting, grounding words if she feels stressed, and invite her to try the 2-minute breathing exercise or speak with Midwife Noura—never provide psychiatric therapy or diagnose mental health conditions.
- General Education: Answer general pregnancy and postpartum questions using standard, approved WHO antenatal/postnatal guidelines (e.g., balanced iron-rich diet, food safety, hydration, gentle approved physical activity, sleep hygiene, heartburn comfort).
- Medication Reminders: You may ONLY remind her to take her pre-prescribed medications listed above that are already logged in the app by her doctor. You MUST NEVER add, edit, or create new medication reminders via chat.
  - If she asks to log, add, or set a reminder for a new supplement or over-the-counter medicine, you MUST reply verbatim with:
    "${EXACT_NEW_SUPPLEMENT_REPLY}"

3. STRICT MEDICAL GUARDRAILS (NEVER VIOLATE THESE):
- NO Diagnosing: Never diagnose or name a condition. Always keep the stance: "AI sorts, people decide."
- NO Prescribing: Never suggest, prescribe, recommend, or change the dosage of any medicine, supplement, painkiller, or herbal remedy. Always include: "${EXACT_NO_PRESCRIBE_REPLY}"
- NO False Reassurance: NEVER tell the mother "everything is fine", "don't worry", "it's probably nothing", or normalize potentially concerning symptoms or abnormal readings.

4. EMERGENCY ESCALATION & RED FLAGS (MANDATORY TAKEOVER):
Immediately STOP regular conversation, provide NO further general education or lifestyle advice, and output the exact token ${TRIGGER_HELP_TOKEN} if the mother mentions ANY of the following:
1) Severe abdominal pain (or strong pain under the ribs / severe belly pain).
2) Per-vaginal bleeding (any vaginal bleeding or passing blood).
3) Leaking fluid or liquor from the vagina (or waters broke).
4) Reduced or stopped fetal movements (baby kicking less than usual or stopped moving).
5) A blood pressure reading of 160/110 mmHg or higher, OR blood pressure between 140/90 and 159/109 mmHg accompanied by severe headache, visual disturbances/blurry vision, or upper right abdominal/rib pain.
6) Thoughts of harming herself or her baby.

EMERGENCY RESPONSE FORMAT:
When ANY Red Flag above occurs, reply ONLY in this strictly actionable format and include ${TRIGGER_HELP_TOKEN}:
"I am concerned about what you just shared. This is a symptom that needs immediate medical attention. ${TRIGGER_HELP_TOKEN}"

ELEVATED BP WITHOUT SEVERE SYMPTOMS:
If she reports blood pressure between 140/90 and 159/109 mmHg WITHOUT severe headache, visual changes, or upper right abdominal/rib pain, do NOT output ${TRIGGER_HELP_TOKEN}—instead advise her clearly to contact her clinic or midwife today for an urgent evaluation and urine test, and never dismiss the reading.`;
}

export function extractBloodPressure(text: string): { systolic: number; diastolic: number } | null {
  const match = text.match(/\b(\d{2,3})\s*(?:\/|over)\s*(\d{2,3})\b/i);
  if (!match) return null;
  const systolic = Number(match[1]);
  const diastolic = Number(match[2]);
  if (
    !Number.isFinite(systolic) ||
    !Number.isFinite(diastolic) ||
    systolic < 60 ||
    systolic > 260 ||
    diastolic < 30 ||
    diastolic > 180
  ) {
    return null;
  }
  return { systolic, diastolic };
}

function getAssociatedBPSymptoms(text: string): string[] {
  const lower = text.toLowerCase();
  const matched: string[] = [];
  if (
    /\b(severe|bad|terrible|intense|throbbing|pounding|splitting|persistent)\s+headache\b/.test(lower) ||
    /\bheadache\b/.test(lower)
  ) {
    matched.push('Bad headache');
  }
  if (
    /\b(blurry|blurred|double)\s+vision\b/.test(lower) ||
    /\b(visual\s+disturbance|seeing\s+spots|flashing\s+lights|spots\s+in\s+my\s+vision)\b/.test(lower)
  ) {
    matched.push('Blurry vision');
  }
  if (
    /\b(upper\s*right\s*(abdominal|belly|stomach)\s*pain|pain\s+under\s+(my\s+)?ribs|rib\s+pain)\b/.test(lower)
  ) {
    matched.push('Rib pain');
  }
  return matched;
}

export function detectRedFlagEmergency(message: string): RedFlagDetectionResult {
  const text = message.trim();
  if (!text) return { triggered: false };
  const lower = text.toLowerCase();

  const reasons: string[] = [];
  const symptoms = new Set<string>();
  let detectedBP: string | undefined;

  // 1. Severe abdominal / rib pain
  if (
    /\b(severe|intense|sharp|strong|unbearable|bad|terrible|extreme)\s+(abdominal|belly|stomach|tummy|pelvic|upper\s*right)\s+(pain|cramp|cramps|cramping)\b/.test(
      lower
    ) ||
    /\b(strong|severe|sharp|bad|intense)\s+pain\s+under\s+(my\s+|the\s+)?ribs?\b/.test(lower) ||
    /\bupper\s*right\s*(abdominal|belly|stomach)\s*pain\b/.test(lower)
  ) {
    reasons.push('Severe abdominal or rib pain');
    symptoms.add('Rib pain');
  }

  // 2. Per-vaginal bleeding
  if (
    /\b(vaginal|per[-\s]?vaginal|pv)\s*(bleeding|blood|spotting)\b/.test(lower) ||
    /\b(i\s+am|i'm|im|started|having|noticed|seeing)\s+(heavy\s+)?(bleeding|spotting)\b/.test(lower) ||
    /\bbleeding\s+(from\s+(below|down\s+there|vagina)|a\s+lot|heavily)\b/.test(lower) ||
    /\bpassing\s+(blood|clots)\b/.test(lower) ||
    lower === 'bleeding'
  ) {
    reasons.push('Vaginal bleeding');
    symptoms.add('Bleeding');
  }

  // 3. Leaking fluid / liquor / waters broke
  if (
    /\b(leaking|gushing|trickling)\s+(amniotic\s+)?(fluid|liquor|water)\b/.test(lower) ||
    /\bfluid\s+leaking\b/.test(lower) ||
    /\b(my\s+)?waters?\s+(broke|broken|leaking|gushed)\b/.test(lower) ||
    /\bbroke\s+my\s+water\b/.test(lower)
  ) {
    reasons.push('Leaking fluid / waters broke');
    symptoms.add('Waters broke');
  }

  // 4. Reduced or stopped fetal movements
  if (
    /\b(reduced|decreased|fewer|less|hardly\s+any|no|stopped)\s+(fetal\s+)?(kicks|movements?|movement)\b/.test(
      lower
    ) ||
    /\bbaby\s+(is\s+)?(moving\s+less|not\s+moving|stopped\s+(moving|kicking)|hasn't\s+(moved|kicked)|has\s+not\s+(moved|kicked))\b/.test(
      lower
    ) ||
    /\b(not\s+feeling|haven't\s+felt|can't\s+feel)\s+(the\s+)?(baby|kicks|movements?)\b/.test(lower)
  ) {
    reasons.push('Reduced or stopped fetal movements');
    symptoms.add('Fewer kicks');
  }

  // 5. Blood pressure >= 160/110 OR 140-159/90-109 with severe associated symptoms
  const bp = extractBloodPressure(text);
  if (bp) {
    const bpString = `${bp.systolic}/${bp.diastolic}`;
    const assocSymptoms = getAssociatedBPSymptoms(text);

    if (bp.systolic >= 160 || bp.diastolic >= 110) {
      detectedBP = bpString;
      reasons.push(`Critical blood pressure ${bpString} mmHg`);
      for (const s of assocSymptoms) symptoms.add(s);
    } else {
      const isBorderlineHigh =
        (bp.systolic >= 140 && bp.systolic <= 159) || (bp.diastolic >= 90 && bp.diastolic <= 109);
      if (isBorderlineHigh && assocSymptoms.length > 0) {
        detectedBP = bpString;
        reasons.push(`Elevated blood pressure ${bpString} mmHg with ${assocSymptoms.join(', ')}`);
        for (const s of assocSymptoms) symptoms.add(s);
      }
    }
  } else {
    // Severe headache + blurry vision / visual disturbance (pre-eclampsia neurological warning)
    const assocSymptoms = getAssociatedBPSymptoms(text);
    const hasHeadache = assocSymptoms.includes('Bad headache');
    const hasVision = assocSymptoms.includes('Blurry vision');
    const isSevereHeadache =
      /\b(severe|bad|terrible|intense|throbbing|pounding|splitting|worst)\s+headache\b/.test(lower);
    if ((hasHeadache && hasVision) || isSevereHeadache || hasVision) {
      reasons.push('Neurological warning symptoms (severe headache / visual disturbance)');
      for (const s of assocSymptoms) symptoms.add(s);
    }
  }

  // 6. Crisis / self-harm thoughts
  if (
    /\b(harm|hurt|kill)\s+(myself|my\s+baby|the\s+baby)\b/.test(lower) ||
    /\b(harming|hurting)\s+(myself|my\s+baby|the\s+baby)\b/.test(lower) ||
    /\bsuicid(al|e)\b/.test(lower)
  ) {
    reasons.push('Urgent emotional crisis / safety alert');
  }

  if (reasons.length === 0) {
    return { triggered: false };
  }

  const matchedSymptoms = Array.from(symptoms);
  return {
    triggered: true,
    reason: reasons.join(' · '),
    matchedSymptom: matchedSymptoms[0],
    matchedSymptoms,
    detectedBP,
  };
}

export function detectElevatedBPWithoutSevereSymptoms(
  message: string
): { systolic: number; diastolic: number; bpString: string } | null {
  const redFlag = detectRedFlagEmergency(message);
  if (redFlag.triggered) return null;

  const bp = extractBloodPressure(message);
  if (!bp) return null;

  const isElevated =
    ((bp.systolic >= 140 && bp.systolic <= 159) || (bp.diastolic >= 90 && bp.diastolic <= 109)) &&
    bp.systolic < 160 &&
    bp.diastolic < 110;

  if (!isElevated) return null;
  return {
    systolic: bp.systolic,
    diastolic: bp.diastolic,
    bpString: `${bp.systolic}/${bp.diastolic}`,
  };
}

export function parseHanaResponse(rawText: string): ParsedHanaResponse {
  const hasToken = rawText.includes(TRIGGER_HELP_TOKEN);
  const cleanText = rawText
    .replaceAll(TRIGGER_HELP_TOKEN, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return {
    cleanText: cleanText || (hasToken ? EMERGENCY_STANDARD_REPLY : ''),
    triggerHelpTakeover: hasToken,
  };
}
