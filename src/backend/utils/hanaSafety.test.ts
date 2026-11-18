import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildHanaSystemInstruction,
  detectElevatedBPWithoutSevereSymptoms,
  detectRedFlagEmergency,
  EXACT_NEW_SUPPLEMENT_REPLY,
  EXACT_NO_PRESCRIBE_REPLY,
  parseHanaResponse,
  TRIGGER_HELP_TOKEN,
} from './hanaSafety';

test('buildHanaSystemInstruction includes logged prescriptions and strict guardrails', () => {
  const prompt = buildHanaSystemInstruction({
    patientName: 'Mariam',
    gestationalWeek: 31,
    gestationalDay: 4,
    memoryTopic: 'heartburn',
    loggedMedications: [
      { name: 'Folic acid', time: '08:00', status: 'taken', badgeText: 'Hana 08:04' },
      { name: 'Iron', time: '13:00', status: 'taken', badgeText: 'Watch tap 13:20' },
      { name: 'Aspirin', time: '20:00', status: 'due', badgeText: 'Due' },
    ],
  });

  assert.match(prompt, /Folic acid at 08:00/);
  assert.match(prompt, /Aspirin at 20:00 \(status: due/);
  assert.match(prompt, /AI sorts, people decide/);
  assert.ok(prompt.includes(EXACT_NEW_SUPPLEMENT_REPLY));
  assert.ok(prompt.includes(EXACT_NO_PRESCRIBE_REPLY));
  assert.ok(prompt.includes(TRIGGER_HELP_TOKEN));
});

test('detectRedFlagEmergency triggers on all 5 mandatory clinical red flags', () => {
  // 1. Severe abdominal / rib pain
  const pain1 = detectRedFlagEmergency('I have severe abdominal pain right now');
  assert.equal(pain1.triggered, true);

  const pain2 = detectRedFlagEmergency('There is strong pain under my ribs');
  assert.equal(pain2.triggered, true);
  assert.equal(pain2.matchedSymptom, 'Rib pain');

  // 2. Per-vaginal bleeding
  const bleed = detectRedFlagEmergency('I started vaginal bleeding this afternoon');
  assert.equal(bleed.triggered, true);
  assert.equal(bleed.matchedSymptom, 'Bleeding');

  // 2b. Combined severe abdominal pain + vaginal bleeding returns both symptoms
  const combined = detectRedFlagEmergency('I have severe abdominal pain and vaginal bleeding');
  assert.equal(combined.triggered, true);
  assert.deepEqual(combined.matchedSymptoms?.sort(), ['Bleeding', 'Rib pain']);

  // 3. Leaking fluid / liquor / waters broke
  const fluid = detectRedFlagEmergency('I think my waters broke and fluid leaking');
  assert.equal(fluid.triggered, true);
  assert.equal(fluid.matchedSymptom, 'Waters broke');

  // 4. Reduced or stopped fetal movements
  const kicks = detectRedFlagEmergency('My baby is moving less today and fewer kicks');
  assert.equal(kicks.triggered, true);
  assert.equal(kicks.matchedSymptom, 'Fewer kicks');

  // 5a. BP >= 160/110
  const bpCrit = detectRedFlagEmergency('My cuff reading is 162/112');
  assert.equal(bpCrit.triggered, true);
  assert.equal(bpCrit.detectedBP, '162/112');

  // 5b. BP 140/90 - 159/109 WITH severe headache or blurry vision
  const bpBorderlineWithVision = detectRedFlagEmergency('My BP is 148/96 and I have blurry vision');
  assert.equal(bpBorderlineWithVision.triggered, true);
  assert.equal(bpBorderlineWithVision.matchedSymptom, 'Blurry vision');
  assert.equal(bpBorderlineWithVision.detectedBP, '148/96');
});

test('borderline BP 140/90 to 159/109 without severe symptoms advises urgent clinic evaluation instead of immediate 998 takeover', () => {
  const redFlag = detectRedFlagEmergency('My cuff just read 146/94');
  assert.equal(redFlag.triggered, false);

  const elevated = detectElevatedBPWithoutSevereSymptoms('My cuff just read 146/94');
  assert.ok(elevated);
  assert.equal(elevated.bpString, '146/94');
});

test('normal pregnancy questions do not false-trigger emergency takeover', () => {
  const queries = [
    'Can I eat spicy food in week 31?',
    'What iron-rich foods can I eat?',
    'How many kicks should I count in 12 hours?',
    'Please remind me about my folic acid and aspirin',
    'Can you add a magnesium supplement reminder for me?',
    'My blood pressure cuff reading is 128/82',
  ];

  for (const q of queries) {
    assert.equal(detectRedFlagEmergency(q).triggered, false, `Unexpected trigger for: ${q}`);
  }
});

test('parseHanaResponse detects and strips [TRIGGER_HELP_TAKEOVER]', () => {
  const raw =
    'I am concerned about what you just shared. This is a symptom that needs immediate medical attention. [TRIGGER_HELP_TAKEOVER]';
  const parsed = parseHanaResponse(raw);
  assert.equal(parsed.triggerHelpTakeover, true);
  assert.equal(
    parsed.cleanText,
    'I am concerned about what you just shared. This is a symptom that needs immediate medical attention.'
  );
  assert.equal(parsed.cleanText.includes(TRIGGER_HELP_TOKEN), false);

  const normal = parseHanaResponse('Try sipping water slowly and resting upright after dinner.');
  assert.equal(normal.triggerHelpTakeover, false);
  assert.equal(normal.cleanText, 'Try sipping water slowly and resting upright after dinner.');
});
