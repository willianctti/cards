import { motion } from "framer-motion"
import { type CardData } from "../data/messages"

interface CardProps {
  data: CardData
  isFlipped: boolean
  isOpenedBefore: boolean
  index: number
}

export function Card({ data, isFlipped, isOpenedBefore, index }: CardProps) {
  return (
    <motion.div
      className="perspective select-none"
      initial={{ opacity: 0, y: 40, scale: 0.85, rotate: -3 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{ width: 160, height: 230 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="absolute inset-0 rounded-lg backface-hidden"
          style={{
            background: "linear-gradient(145deg, #faf8f5, #f0ede8)",
            border: "1px solid #e8e0d8",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-5">
            <span className="font-serif text-4xl text-rose-muted tracking-wide">
              {data.day}
            </span>
            <span className="mt-1 text-[10px] text-stone uppercase tracking-[0.15em] leading-relaxed">
              dias
            </span>
            {isOpenedBefore && !isFlipped && (
              <span className="absolute bottom-3 text-[9px] text-rose-dark uppercase tracking-[0.2em]">
                lido
              </span>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-lg backface-hidden rotate-y-180 flex flex-col items-center justify-center p-5"
          style={{
            background: "linear-gradient(145deg, #faf8f5, #f5eeeb)",
            border: "1px solid #e8e0d8",
            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          }}
        >
          <span className="text-[9px] text-rose-muted uppercase tracking-[0.15em] mb-2">
            {data.date}
          </span>
          <p className="font-serif text-xs leading-relaxed text-charcoal text-center">
            {data.message}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
