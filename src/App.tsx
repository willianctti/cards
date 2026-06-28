import { CardGrid } from "./components/CardGrid"
import { useOpenedCards } from "./hooks/useOpenedCards"
import { Flowers } from "./components/Flowers"

export default function App() {
  const { openedIds, openCard, isOpened } = useOpenedCards()

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      <Flowers />
      <header className="relative pt-16 pb-6 md:pt-28 md:pb-8 text-center px-4">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal tracking-wide">
          22 dias, 22 lembretes
        </h1>
        <p className="mt-3 text-sm md:text-base text-stone tracking-[0.05em] max-w-md mx-auto leading-relaxed">
          Cada carta guarda uma mensagem para os dias ate nos vermos novamente.
        </p>
        <div className="mt-4">
          <span className="inline-block text-xs text-rose-muted uppercase tracking-[0.2em]">
            {openedIds.size} de {22} cartas abertas
          </span>
        </div>
      </header>

      <main className="pb-20 relative">
        <CardGrid openCard={openCard} isOpened={isOpened} />
      </main>

      <footer className="pb-8 text-center relative">
        <p className="text-[10px] text-stone/50 uppercase tracking-[0.2em]">
          de 28 de junho a 20 de julho
        </p>
      </footer>
    </div>
  )
}
