import Game from "./Game"

function App() {
  return (
    <main className="h-screen w-screen relative flex flex-col items-center justify-center bg-blue-50">
      <div className="flex items-center flex-col gap-4 mb-6">
        <img className="h-24" src="/TSB_Logo.png" alt="TSB Logo" />
        <h1 className="text-4xl font-ethnocentric uppercase">Técnico <span className="text-tsb-blue">Solar</span> Boat</h1>
      </div>
      <Game />
      <div className="fixed bottom-0 right-0 mb-2 mr-2">
        <p>Author: António Festas - 112386 </p>
      </div>
    </main>
  )
}

export default App
