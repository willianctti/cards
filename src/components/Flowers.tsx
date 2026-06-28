import { motion } from "framer-motion"
import { Flower2 } from "lucide-react"

const iconProps = {
  strokeWidth: 1.2,
  className: "w-full h-full",
}

export function Flowers() {
  return (
    <>
      <motion.div
        className="absolute left-3 top-2 md:left-14 md:top-6 w-8 h-8 md:w-12 md:h-12 text-rose-muted"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <Flower2 {...iconProps} />
      </motion.div>

      <motion.div
        className="absolute right-3 top-4 md:right-16 md:top-10 w-10 h-10 md:w-14 md:h-14 text-sunflower"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <Flower2 {...iconProps} />
      </motion.div>

      <motion.div
        className="absolute left-6 bottom-2 md:left-28 md:bottom-4 w-6 h-6 md:w-9 md:h-9 text-rose-muted/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <Flower2 {...iconProps} />
      </motion.div>

      <motion.div
        className="absolute right-6 top-16 md:right-24 md:top-28 w-6 h-6 md:w-9 md:h-9 text-sunflower/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <Flower2 {...iconProps} />
      </motion.div>
    </>
  )
}
