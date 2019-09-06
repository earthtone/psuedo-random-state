import test from 'ava'
import Pair from 'crocks/Pair'
import {
  getNextSeed,
  liftState,
  nextSeed,
  nextValue,
  normalize,
  updateSeed
} from '../helpers'

const noop = () => {}
const double = x => x * 2

test('calling "normalize" with min/max arguments returns a fucntion', t => {
  let result = typeof normalize(2, 4)
  t.is(result, 'function')
})

test('calling function returned by "normalize" is constrained between min/max', t => {
  let result = normalize(2, 4)(3)
  t.is(result, 8)

  result = normalize(3, 5)(7)
  t.is(result, 17)
})

test('calling "liftState" with a function returns a function', t => {
  let result = typeof liftState(noop)
  t.is(result, 'function')
})

test('calling the function returned by calling "liftState" returns a State', t => {
  let result = liftState(noop)()
  t.is(result.inspect(), 'State Function')
})

test('"liftState" returns a resultant when called with "evalWith"', t => {
  let result = liftState(double)(2)
  t.is(result.evalWith(), 4)
})

test('given a small integer "nextSeed" returns a long integer', t => {
  t.is(nextSeed(7), 1282168116)
  t.is(nextSeed(23), 1758542852)
  t.is(nextSeed(108), 1068058165)
})

test('"getNextSeed" returns a State instance', t => {
  let result = getNextSeed().inspect()
  t.is(result, 'State Function')
})

test('returns a resultant with "nextSeed" called on a State\'s "seed" prop', t => {
  let result = getNextSeed().evalWith({ seed: 7 })
  t.is(result, 1282168116)

  result = getNextSeed().evalWith({ seed: 23 })
  t.is(result, 1758542852)

  result = getNextSeed().evalWith({ seed: 108 })
  t.is(result, 1068058165)
})

test('"updateSeed" returns a State instance', t => {
  let result = updateSeed().inspect()
  t.is(result, 'State Function')
})

test('"updateSeed" udates a State\'s "seed" prop', t => {
  let result = updateSeed().execWith({ seed: 42 }).seed
  t.is(result, 42)
})

test('"nextValue" returns a State instance', t => {
  let result = nextValue().inspect()
  t.is(result, 'State Function')
})

test('"nextValue" composes "updateSeed" and "value" to return and updated State\'s object', t => {
  let result = nextValue(0xbadca7).evalWith({ seed: 23 })
  t.is(result, 0.005676442762535478)
})
