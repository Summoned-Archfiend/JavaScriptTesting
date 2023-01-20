// monkey-patching
import thumbWar from '../thumb-war'
import * as utils from '../utils';

test('returns winner', () => {
  // Keep track of original function
  const originalGetWinner = utils.getWinner;

  // Mock a function with our function
  utils.getWinner = (p1, p2) =>p2;

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds');

  // Restore original function in case other tests use it.
  utils.getWinner = originalGetWinner;  expect(['Ken Wheeler', 'Kent C. Dodds'].includes(winner)).toBe(true)

});