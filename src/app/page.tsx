export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎓</div>
        <h1 className="text-3xl font-bold text-white mb-3">EDC Career Quest</h1>
        <p className="text-gray-400 mb-8">
          Scannez le QR Code affiché par votre enseignante pour accéder à votre parcours.
        </p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left space-y-4">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Univers disponibles</p>
          <div className="flex items-center gap-3 text-white">
            <span className="text-2xl">✈️</span>
            <span>Passeport vers le Stage — B1 / PGE1</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <span className="text-2xl">🧭</span>
            <span>Expédition Professionnelle — B2 / PGE2</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <span className="text-2xl">🚀</span>
            <span>Mission Horizon — B3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
