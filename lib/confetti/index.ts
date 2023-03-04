import JSConfetti from 'js-confetti';

export const showConfetti = async (): Promise<void> => {
  if (typeof window === undefined) return;

  const jsConfetti = new JSConfetti();
  return jsConfetti.addConfetti({
    emojis: ['🐰', '🥕'],
  });
};
