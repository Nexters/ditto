export type RabbitColor = {
  eyeColor: string;
  bodyColor: string;
};

const palette = [
  {
    eyeColor: '#FF6F1E',
    bodyColor: '#FFC977',
  },
  {
    eyeColor: '#2B8DE8',
    bodyColor: '#B9D5FF',
  },
  {
    eyeColor: '#2389E7',
    bodyColor: '#FEFFB9',
  },
  {
    eyeColor: '#DD1515',
    bodyColor: '#FFD4E4',
  },
  {
    eyeColor: '#3E4C7E',
    bodyColor: '#D0B092',
  },
  {
    eyeColor: '#FF2C1E',
    bodyColor: '#FFFFFF',
  },
  {
    eyeColor: '#117AC7',
    bodyColor: '#B9FFC0',
  },
  {
    eyeColor: '#414142',
    bodyColor: '#A8ABFF',
  },
  {
    eyeColor: '#FFFFFF',
    bodyColor: '#3D3C3C',
  },
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * palette.length);
  return palette[randomIndex];
};
