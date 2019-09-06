# Psuedo-Random State Generator

A pseudo-random number generator that uses [Crocks'](https://crocks.dev/) [State Monad](https://crocks.dev/docs/crocks/State.html).

## Basic Usage

Two functions are exported via the package: `random` and `between`. Both return instances of [Crocks' State Monad](https://crocks.dev/docs/crocks/State.html).

```js
import { random } from '@earthtone/psuedo-random-state'

const state = {
  seed: 23
}

const rand = random()
const resultant = rand.evalWith(state)
const newState = rand.execWith(state)

console.log(rand.inspect()) // -> 'State Function'
console.log(resultant) // -> 0.8189031647694327
console.log(newState) // -> { seed: 1758542852 }
```

```js
import { between } from '@earthtone/psuedo-random-state'

const state = {
  seed: 23
}

const tween = between(0, 200)
const resultatn = tween.evalWith(state)
const newState = tween.execWith(state)

console.log(rand.inspect()) // -> 'State Function'
console.log(resultant) // -> 163
console.log(newState) // -> { seed: 1758542852 }
```

## Inspiration

[Ian Hoffman Hicks'](https://github.com/evilsoft) [Redux and the State ADT course](https://egghead.io/courses/redux-and-the-state-adt)
