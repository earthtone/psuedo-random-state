import composeK from 'crocks/helpers/composeK'

import { getNextSeed, nextValue, normalize } from './lib/helpers'

// random :: () -> State AppState Number
export const random =
  composeK(nextValue, getNextSeed)

// between :: (Int, Int) -> State AppState Int
export const between = (min, max) =>
  random()
    .map(normalize(min, max))
