'use client'

import { useState } from 'react'
import { entreprisesPistes, postesPistes, contraintesPistes, indicesDuJour } from '@/lib/content/univers2-pge2-s2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default function Dossier4Pistes() {
  const [enquete, setEnquete] = useState<{ entreprise: string; poste: string; contrainte: string } | null>(null)
  const [indice, setIndice] = useState<string | null>(null)

  const nouvelleEnquete = () => setEnquete({ entreprise: pick(entreprisesPistes), poste: pick(postesPistes), contrainte: pick(contraintesPistes) })
  const tirerIndice = () => setIndice(pick(indicesDuJour))

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 4 — Les Pistes</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Générateur d&apos;enquêtes</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Chaque équipe reçoit un dossier confidentiel : une cible, une mission, un obstacle de terrain.
          À vous de remonter la piste et de trouver la stratégie que les autres n&apos;ont pas vue.
        </p>
      </div>

      <button
        onClick={nouvelleEnquete}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🔎</span><span>Nouveau dossier d&apos;enquête</span>
      </button>

      {enquete && (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(201,168,76,0.1)' }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#f5c842' }}>⬛ Dossier confidentiel</span>
          </div>
          <div className="p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Cible</p>
                <p className="font-black text-white text-sm">{enquete.entreprise}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(201,168,76,0.5)' }}>Mission</p>
                <p className="font-black text-white text-sm">{enquete.poste}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}>
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(248,113,113,0.6)' }}>Obstacle</p>
                <p className="font-black text-white text-sm">{enquete.contrainte}</p>
              </div>
            </div>
            <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              <p className="font-bold text-white text-sm">Comment remontez-vous jusqu&apos;à cette cible malgré l&apos;obstacle ?</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={tirerIndice}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}
      >
        <span>📎</span><span>Renseignement de terrain</span>
      </button>
      {indice && (
        <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)', color: 'rgba(255,240,200,0.85)', fontStyle: 'italic' }}>
          <span style={{ color: '#c9a84c', fontStyle: 'normal', marginRight: '6px' }}>📎</span>{indice}
        </div>
      )}

      <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
        Notez vos résultats de votre côté — vous en débattrez avec votre intervenant en fin de séance.
      </div>
    </div>
  )
}
