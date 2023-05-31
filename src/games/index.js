import { obj as bomb } from './bomb';
import { obj as dalgona } from './dalgona';
import { obj as roulette } from './roulette';

const dummyItems = new Array(20)
  .fill({})
  .map((_, index) => ({ ...bomb, path: `bomb${index}` }));

export const games = [bomb, dalgona, roulette, ...dummyItems];
