import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'index.js',
  plugins: [
    resolve({
      mainFields: ['module', 'main']
    }),
    commonjs()
  ],
  output: [
    { file: 'dist/index.esm.js', format: 'esm', name: 'psuedo-random-state' },
    { file: 'dist/index.umd.js', format: 'umd', name: 'psuedo-random-state' },
    { file: 'dist/index.unpkg.js', format: 'iife', name: 'PseudoRandomState' },
  ]
}
