import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../Home'

// mock API 数据
const mockCharacters = {
  results: [
    { id: 1, name: 'Rick Sanchez', status: 'Alive' },
    { id: 2, name: 'Morty Smith', status: 'Alive' },
  ],
}

describe('Home', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCharacters,
    } as unknown as Response)
  })

  it('renders title and search input', () => {
    render(
      <MemoryRouter>
        <Home favorites={[]} toggleFavorite={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByText(/Character List/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Search by name/i)).toBeInTheDocument()
  })

  it('loads and shows characters', async () => {
    render(
      <MemoryRouter>
        <Home favorites={[]} toggleFavorite={() => {}} />
      </MemoryRouter>
    )

    // 有 loading 提示
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i)

    // 等待列表渲染
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument()
      expect(screen.getByText(/Morty Smith/)).toBeInTheDocument()
    })
  })

  it('click Fav calls toggleFavorite with id', async () => {
    const toggle = vi.fn()
    render(
      <MemoryRouter>
        <Home favorites={[]} toggleFavorite={toggle} />
      </MemoryRouter>
    )

    await waitFor(() => screen.getByText(/Rick Sanchez/))

    // 找到第一个 "Fav" 按钮（根据你的按钮文本可能是 "☆ Fav"/"★ Unfav"）
    const favBtn = screen.getAllByRole('button', { name: /fav/i })[0]
    fireEvent.click(favBtn)
    expect(toggle).toHaveBeenCalledWith(1)
  })
})
