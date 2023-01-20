/* eslint-disable no-import-assign */
// improved assertions for mocks
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner

  utils.getWinner = (...args) => {
    utils.getWinner.mock.calls.push(args);
    return args;
  }
  // Keep track of calls
  utils.getWinner.mock = { calls: [] }

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')

  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds'])
  })

  expect(utils.getWinner.mock.calls).toEqual([
    ['Ken Wheeler', 'Kent C. Dodds'],
    ['Ken Wheeler', 'Kent C. Dodds']
  ]);

  utils.getWinner = originalGetWinner
});