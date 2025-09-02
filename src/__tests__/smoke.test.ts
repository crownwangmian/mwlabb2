import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('adds numbers correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('string contains substring', () => {
    expect('hello world').toContain('world')
  })
})
