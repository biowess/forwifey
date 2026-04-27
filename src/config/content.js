// ============================================================
// CONTENT CONFIG — edit all app text and quiz content here
// ============================================================

export const META = {
  title: 'For You ✦',
  subtitle: 'A small world, made with care.',
  footer: '© Wassim x Molk',
}

// INTRO SCENE
export const INTRO = {
  greeting: 'For You',
  subline: 'Something small, made just for this moment.',
  cta: 'Open',
  sparkle: '✦',
}

// LOVE LETTERS
export const LETTERS = [
  {
    id: 'letter-1',
    label: 'Right Now',
    emoji: '✦',
    preview: 'This moment...',
    content: `Right now, in this exact moment,\nyou exist — and that is already something extraordinary.\n\nI don't need a history with you to feel it.\nThe present is enough.\nYou are enough.`,
  },
  {
    id: 'letter-2',
    label: 'Today',
    emoji: '◇',
    preview: 'Today feels...',
    content: `Today feels different\nbecause you are in it.\n\nNothing dramatic.\nNothing complicated.\nJust a quiet warmth\nthat makes today matter.`,
  },
  {
    id: 'letter-3',
    label: 'Softly',
    emoji: '○',
    preview: 'Some things...',
    content: `Some things don't need a reason.\nThis is one of them.\n\nI made this for you\nbecause you came to mind\nand stayed there — softly.`,
  },
  {
    id: 'letter-4',
    label: 'You',
    emoji: '✿',
    preview: 'There is something...',
    content: `There is something about you\nthat is hard to describe\nbut easy to feel.\n\nWarm.\nPresent.\nReal.`,
  },
]

export const HEART = {
  label: 'Just for you',
  pulse: true,
}

// QUIZ
export const QUIZ = {
  intro: 'A small quiz — no wrong answers.',
  questions: [
    {
      id: 'q1',
      text: 'What kind of energy feels right today?',
      options: [
        { id: 'a', label: 'Quiet and warm' },
        { id: 'b', label: 'Light and curious' },
        { id: 'c', label: 'Soft and dreamy' },
        { id: 'd', label: 'Alive and present' },
      ],
    },
    {
      id: 'q2',
      text: 'What should this moment feel like?',
      options: [
        { id: 'a', label: 'Like a slow morning' },
        { id: 'b', label: 'Like a good book' },
        { id: 'c', label: 'Like a quiet song' },
        { id: 'd', label: 'Like coming home' },
      ],
    },
    {
      id: 'q3',
      text: 'Choose your mood.',
      options: [
        { id: 'a', label: 'Gentle ✦' },
        { id: 'b', label: 'Radiant ◎' },
        { id: 'c', label: 'Still ○' },
        { id: 'd', label: 'Tender ◇' },
      ],
    },
    {
      id: 'q4',
      text: 'What do you want more of right now?',
      options: [
        { id: 'a', label: 'Peace' },
        { id: 'b', label: 'Laughter' },
        { id: 'c', label: 'Beauty' },
        { id: 'd', label: 'Connection' },
      ],
    },
  ],
  affirmations: [
    'Perfect.',
    'Lovely.',
    'That feels right.',
    'Beautiful choice.',
    'Exactly.',
  ],
  affectionLines: [
    'You are exactly enough.',
    'Warmth follows you.',
    'Today is better with you in it.',
    'You carry something rare.',
    'Whatever you feel right now — it matters.',
    'Your presence is a gift.',
  ],
  completionMessage: 'Your path is clear. The future is warm.',
  ctaNext: 'See what\'s ahead →',
}

// FUTURE / TERMINAL SCENE
export const TERMINAL = {
  scanLines: [
    { delay: 0,    text: 'Scanning present moment…',               type: 'system' },
    { delay: 800,  text: 'Emotional state: stable',                 type: 'value' },
    { delay: 1600, text: 'Warmth levels: elevated',                 type: 'value' },
    { delay: 2400, text: 'Presence: confirmed',                     type: 'system' },
    { delay: 3200, text: '—',                                        type: 'divider' },
    { delay: 3800, text: 'Future projection: warm',                  type: 'highlight' },
    { delay: 4600, text: 'Possible mornings: slow, soft, unhurried', type: 'detail' },
    { delay: 5400, text: 'Possible evenings: quiet light, shared silence', type: 'detail' },
    { delay: 6200, text: 'Possible laughter: unexpected, frequent', type: 'detail' },
    { delay: 7000, text: '—',                                        type: 'divider' },
    { delay: 7600, text: 'Next chapter: not written yet',            type: 'system' },
    { delay: 8400, text: 'But the beginning is now.',               type: 'final' },
  ],
  cta: 'A little more →',
}

// ABOUT
export const ABOUT = {
  title: 'Wassim x Molk',
  body: 'This little world was made with care, just for you.',
  footer: '© Wassim x Molk',
}
