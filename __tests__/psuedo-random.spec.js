import test from 'ava'
import { random, between } from '../'

test('"random" returns a State instance', t => {
  let result = random().inspect()
  t.is(result, 'State Function')
})

test('"random" updates a state object\'s seed property', t => {
  let result = random().execWith({ seed: 23 })
  t.deepEqual(result, { seed: 1758542852 })

  result = random().execWith({ seed: 7 })
  t.deepEqual(result, { seed: 1282168116 })

  result = random().execWith({ seed: 108 })
  t.deepEqual(result, { seed: 1068058165 })
})

test('"random" takes a state object\'s seed property and returns psuedo-random number resultant', t => {
  let result = random().evalWith({ seed: 23 })
  t.deepEqual(result, 0.8189031647694327 )

  result = random().evalWith({ seed: 7 })
  t.deepEqual(result, 0.5970641193884091)

  result = random().evalWith({ seed: 108 })
  t.deepEqual(result, 0.49736014893032626)
})

test('"between" returns a State instance', t => {
  let result = between(3, 5).inspect()
  t.is(result, 'State Function')
})

test('"between" takes a state object\'s seed prop returns a psuedo-random resultant within a range and retursn a new state object with an updated seed value', t => {
  const state = { seed: 23 }

  let result = between(0, 1)
  t.is(result.evalWith(state), 0)
  t.deepEqual(result.execWith(state), { seed: 1758542852 })

  result = between(0, 2)
  t.is(result.evalWith(state), 1)
  t.deepEqual(result.execWith(state), { seed: 1758542852 })

  result = between(0, 200)
  t.is(result.evalWith(state), 163)
  t.deepEqual(result.execWith(state), { seed: 1758542852 })
})
