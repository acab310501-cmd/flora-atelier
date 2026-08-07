import confetti from 'canvas-confetti';

const PETAL_COLORS = ['#E8B4B8', '#A8C3B8', '#FFFFFF', '#F2D4D6', '#D4E9DF'];

export function firePetals(x: number, y: number) {
  const count = 28;
  const defaults = {
    spread: 360,
    ticks: 90,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 22,
    shapes: ['circle'] as any,
    scalar: 1.1,
    colors: PETAL_COLORS,
  };

  // Two bursts for a richer petal explosion
  confetti({ ...defaults, particleCount: count, origin: { x, y } });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: count * 0.6, origin: { x, y }, scalar: 0.8 });
  }, 120);
}
