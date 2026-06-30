'use client'

import { useState, useEffect, useRef } from 'react'
import { personnesRencontre, lieuxRencontre, tempsRencontre, profilsMystere } from '@/lib/content/univers2-pge2-s2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

export default function Dossier5Contacts() {
  const [rencontre, setRencontre] = useState<{ personne: string; lieu: string; temps: number } | null>(null)
  const [mystere, setMystere] = useState<string | null>(null)
  const [chrono, setChrono] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nouvelleRencontre = () => {
    setRencontre({ personne: pick(personnesRencontre), lieu: pick(lieuxRencontre), temps: pick(tempsRencontre) })
    setChrono(null)
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const profilMystere = () => setMystere(pick(profilsMystere))

  const lancerChrono = (secondes: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setChrono(secondes)
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setChrono(prev => {
        if (prev === null || prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 5 — Les Contacts</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Générateur de rencontres</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Une rencontre, un lieu, un temps imposé. Que dites-vous ?</p>
      </div>

      <button
        onClick={nouvelleRencontre}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">🎭</span><span>Nouvelle rencontre</span>
      </button>

      {rencontre && (
        <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Interlocuteur</p>
              <p className="font-bold text-white text-sm mt-1">{rencontre.personne}</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(201,168,76,0.5)' }}>Lieu</p>
              <p className="font-bold text-white text-sm mt-1">{rencontre.lieu}</p>
            </div>
          </div>
          <p className="text-center font-semibold text-white">Que dites-vous ?</p>

          {/* Pitch chrono */}
          <div className="space-y-2 pt-3" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
            <p className="text-xs font-black uppercase tracking-widest text-center" style={{ color: 'rgba(201,168,76,0.5)' }}>⏱️ Pitch Chrono</p>
            <div className="flex gap-2">
              {tempsRencontre.map(t => (
                <button
                  key={t}
                  onClick={() => lancerChrono(t)}
                  className="flex-1 py-2 rounded-xl font-black text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                >{t}s</button>
              ))}
            </div>
            {chrono !== null && (
              <div className="text-center py-3">
                <p className="font-black" style={{ fontSize: '2.5rem', fontFamily: 'monospace', color: chrono <= 5 && running ? '#f87171' : '#f5c842' }}>{chrono}</p>
                {!running && chrono === 0 && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Temps écoulé</p>}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={profilMystere}
        className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
      >
        <span>🕵️</span><span>Profil Mystère</span>
      </button>
      {mystere && (
        <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', color: 'rgba(255,200,200,0.85)' }}>
          Votre interlocuteur déteste <strong>{mystere}</strong>. Adaptez votre pitch en conséquence.
        </div>
      )}
    </div>
  )
}
