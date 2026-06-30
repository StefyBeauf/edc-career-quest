'use client'

import { useState } from 'react'
import { entreprisesPistes, postesPistes, contraintesPistes, indicesDuJour } from '@/lib/content/univers2-pge2-s2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default function Dossier4Pistes() {
  const [enquete, setEnquete] = useState<{ entreprise: string; poste: string; contrainte: string } | null>(null)
  const [indice, setIndice] = useState<string | null>(null)

  const nouvelleEnquete = () => setEnquete({ entreprise: pick(entreprisesPistes), poste: pick(postesPistes), contrainte: pick(contraintesPistes) })
  const indiceDuJour = () => setIndice(pick(indicesDuJour))

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 4 — Les Pistes</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Générateur d&apos;enquêtes</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Chaque équipe tire une enquête : entreprise, poste, contrainte. Où chercheriez-vous cette opportunité ?</p>
      </div>

      <button
        onClick={nouvelleEnquete}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🔎</span><span>Nouvelle enquête</span>
      </button>

      {enquete && (
        <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Entreprise</p>
              <p className="font-bold text-white text-sm mt-1">{enquete.entreprise}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Poste</p>
              <p className="font-bold text-white text-sm mt-1">{enquete.poste}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Contrainte</p>
              <p className="font-bold text-white text-sm mt-1">{enquete.contrainte}</p>
            </div>
          </div>
          <p className="text-center font-semibold text-white pt-2" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>Où chercheriez-vous cette opportunité ?</p>
        </div>
      )}

      <div className="rounded-2xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>🏆 Duel d&apos;enquêteurs</p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Les groupes comparent leurs stratégies de recherche. Votez : quelle équipe a trouvé la meilleure piste ?</p>
      </div>

      <button
        onClick={indiceDuJour}
        className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
      >
        <span>💡</span><span>Indice du jour</span>
      </button>
      {indice && (
        <div className="rounded-xl p-4 text-sm italic" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(255,240,200,0.85)' }}>
          {indice}
        </div>
      )}
    </div>
  )
}
