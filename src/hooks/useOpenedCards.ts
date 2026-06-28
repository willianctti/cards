import { useState, useCallback, useEffect } from "react"

const STORAGE_KEY = "cartas-abertas"

function loadOpenedCards(): Set<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return new Set()
    const parsed: number[] = JSON.parse(stored)
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

function saveOpenedCards(ids: Set<number>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
}

export function useOpenedCards() {
  const [openedIds, setOpenedIds] = useState<Set<number>>(loadOpenedCards)

  useEffect(() => {
    saveOpenedCards(openedIds)
  }, [openedIds])

  const openCard = useCallback((id: number) => {
    setOpenedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const isOpened = useCallback(
    (id: number): boolean => openedIds.has(id),
    [openedIds]
  )

  return { openedIds, openCard, isOpened }
}
