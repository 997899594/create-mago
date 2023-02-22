
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.js'],
  format: ['esm'],
  splitting: true,
  clean: true,
  target: 'esnext'
})
