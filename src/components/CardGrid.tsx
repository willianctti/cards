import { useState, useEffect, useCallback, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { messages } from "../data/messages"
import { Card } from "./Card"

interface CardGridProps {
  openCard: (id: number) => void
  isOpened: (id: number) => boolean
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = "entrance" | "idle" | "shuffling" | "revealed"

export function CardGrid({ openCard, isOpened }: CardGridProps) {
  const [order] = useState(() => shuffleArray(messages))
  const [phase, setPhase] = useState<Phase>("entrance")
  const [revealedId, setRevealedId] = useState<number | null>(null)
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setPhase("idle"), messages.length * 40 + 600)
    return () => clearTimeout(timer)
  }, [])

  const clearAutoClose = useCallback(() => {
    if (autoCloseRef.current) {
      clearTimeout(autoCloseRef.current)
      autoCloseRef.current = null
    }
  }, [])

  const scheduleAutoClose = useCallback(() => {
    clearAutoClose()
    autoCloseRef.current = setTimeout(() => {
      setRevealedId(null)
      setPhase("idle")
    }, 6000)
  }, [clearAutoClose])

  const handleShuffle = useCallback(() => {
    if (phase === "shuffling") return
    clearAutoClose()

    const target = order[Math.floor(Math.random() * order.length)]

    if (phase === "revealed") {
      setRevealedId(null)
      setTimeout(() => {
        setPhase("shuffling")
        setTimeout(() => {
          setRevealedId(target.id)
          openCard(target.id)
          setPhase("revealed")
          scheduleAutoClose()
        }, 1000)
      }, 200)
    } else {
      setPhase("shuffling")
      setTimeout(() => {
        setRevealedId(target.id)
        openCard(target.id)
        setPhase("revealed")
        scheduleAutoClose()
      }, 1000)
    }
  }, [phase, order, openCard, clearAutoClose, scheduleAutoClose])

  const handleClose = useCallback(() => {
    clearAutoClose()
    setRevealedId(null)
    setPhase("idle")
  }, [clearAutoClose])

  const showButton = phase === "idle" || phase === "revealed"

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {phase === "shuffling" && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-10 flex items-center justify-center"
            style={{ background: "rgba(250, 248, 245, 0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative" style={{ width: 180, height: 250 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(145deg, #faf8f5, #f0ede8)",
                    border: "1px solid #e8e0d8",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 100, 0],
                    y: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, 0],
                    rotate: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, 0],
                    scale: [1, 0.8, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    delay: i * 0.08,
                  }}
                >
                  <span className="font-serif text-5xl text-rose-muted tracking-wide">
                    ?
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-4 px-4 mb-8">
        <AnimatePresence mode="wait">
          {showButton && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleShuffle}
                className="relative px-8 py-3 rounded-full text-sm uppercase tracking-[0.2em] transition-colors"
                style={{
                  background: "transparent",
                  border: "1px solid #d4a5a5",
                  color: "#b88484",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d4a5a5"
                  e.currentTarget.style.color = "#faf8f5"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#b88484"
                }}
              >
                {phase === "revealed" ? "outra carta" : "embaralhar"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "revealed" && revealedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleClose}
              className="px-5 py-1.5 text-[10px] uppercase tracking-[0.2em] rounded-full transition-colors"
              style={{
                background: "transparent",
                border: "1px solid #e0d5d0",
                color: "#c4a5a5",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0ede8"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
              }}
            >
              fechar
            </button>
          </motion.div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-5 px-4 max-w-5xl mx-auto">
        {order.map((card, index) => (
          <Card
            key={card.id}
            data={card}
            isFlipped={revealedId === card.id}
            isOpenedBefore={isOpened(card.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
