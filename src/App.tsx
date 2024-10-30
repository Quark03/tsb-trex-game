import Game from "./Game"

function App() {
  return (
    <main className="h-screen w-screen relative flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 mb-6">
        <img className="h-16" src="/TSB_Logo.png" alt="TSB Logo" />
        <h1 className="text-4xl font-ethnocentric uppercase">Técnico <span className="text-tsb-blue">Solar</span> Boat</h1>
      </div>
      <Game />
    </main>
  )
}

export default App
