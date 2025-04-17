import { GameContainer } from '@/components/game/game-container'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Word Learning Game
      </h1>
      <GameContainer />
    </main>
  )
}