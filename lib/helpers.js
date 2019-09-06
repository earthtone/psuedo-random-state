// const State = require('crocks/State')
import State from 'crocks/State'
import assoc from 'crocks/helpers/assoc'
import compose from 'crocks/helpers/compose'
import constant from 'crocks/combinators/constant'
import converge from 'crocks/combinators/converge'
import liftA2 from 'crocks/helpers/liftA2'

const { get, modify } = State

// nextSeed :: Int -> Int
export const nextSeed = seed =>
  (seed * 1103515245 + 12345) & 0x7fffffff

// value :: Int -> Number
export const value = seed =>
  (seed >>> 16) / 0x7fff

// normalize :: (Int, Int) -> Number -> Integer
export const normalize = (min, range) =>
  x => Math.floor(x * (range - min)) + min

// liftState :: (a -> b) -> a -> State s b
export const liftState = fn =>
  compose(State.of, fn)

// getNextSeed :: () => State AppState Int
export const getNextSeed = () =>
  get( ({ seed }) => nextSeed(seed) )

// updateSeed :: Int -> State AppState ()
export const updateSeed = seed =>
  modify(assoc('seed', seed))

// nextValue :: Int -> State AppState Number
export const nextValue = converge(
  liftA2(constant),
  liftState(value),
  updateSeed
)
