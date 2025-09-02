import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Detail from '../Detail'

describe('Detail', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://example.com/rick.png',
        species: 'Human',
        status: 'Alive',
        gender: 'Male',
        origin: { name: 'Earth' },
        location: { name: 'Citadel of Ricks' },
      }),
    } as unknown as Response)
  })

  it('renders character detail by id', async () => {
    render(
      <MemoryRouter initialEntries={['/item/1']}>
        <Routes>
          <Route
            path="/item/:id"
            element={<Detail favorites={[1]} toggleFavorite={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.getByText(/Species:/i)).toBeInTheDocument()
      expect(screen.getByText(/Location:/i)).toBeInTheDocument()
    })
  })
})
