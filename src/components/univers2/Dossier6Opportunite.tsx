'use client'

import { useState } from 'react'
import { dossiersStrategie, rebondissementsStrategie, type DossierStrategie } from '@/lib/content/univers2-pge2-s2'

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)] }

function Champ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full rounded-xl px-3 py-2 text-sm resize-y outline-none"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', caretColor: '#c9a84c' }}
      />
    </div>
  )
}

export default function Dossier6Opportunite() {
  const [dossier, setDossier] = useState<DossierStrategie | null>(null)
  const [cibles, setCibles] = useState('')
  const [canaux, setCanaux] = useState('')
  const [actions, setActions] = useState('')
  const [priorites, setPriorites] = useState('')
  const [calendrier, setCalendrier] = useState('')
  const [analyse, setAnalyse] = useState('')
  const [loading, setLoading] = useState(false)
  const [coupDeTheatre, setCoupDeTheatre] = useState<string | null>(null)
  const [planRevise, setPlanRevise] = useState('')

  const nouveauDossier = () => {
    setDossier(pick(dossiersStrategie))
    setCibles(''); setCanaux(''); setActions(''); setPriorites(''); setCalendrier('')
    setAnalyse(''); setCoupDeTheatre(null); setPlanRevise('')
  }

  const planRempli = cibles.trim() && canaux.trim() && actions.trim()

  const analyser = async () => {
    if (!dossier || !planRempli) return
    setLoading(true)
    try {
      const res = await fetch('/api/expedition/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'strategie', dossier, entreprises: cibles, canaux, actions, priorites, calendrier }),
      })
      const data = await res.json() as { content?: string }
      setAnalyse(data.content ?? '')
    } finally { setLoading(false) }
  }

  const declencherCoupDeTheatre = () => setCoupDeTheatre(pick(rebondissementsStrategie))

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 6 — L&apos;Opportunité</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Le Plan d&apos;enquête</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Vous recevez un dossier de terrain. Construisez votre plan d&apos;investigation avec les ressources disponibles — l&apos;IA vérifie la solidité de votre stratégie.
        </p>
      </div>

      <button
        onClick={nouveauDossier}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">📂</span><span>Ouvrir un dossier</span>
      </button>

      {dossier && (
        <>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(201,168,76,0.08)' }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#f5c842' }}>⬛ Dossier de terrain</span>
            </div>
            <div className="p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="font-black text-white uppercase tracking-wide">{dossier.titre}</p>
              <p className="text-sm" style={{ color: 'rgba(255,240,200,0.7)' }}>{dossier.situation}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dossier.contraintes.map(c => (
                  <span key={c} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>⚠ {c}</span>
                ))}
                {dossier.ressources.map(r => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', color: '#86efac', border: '1px solid rgba(74,222,128,0.2)' }}>✓ {r}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Votre plan d&apos;enquête</p>
            <Champ label="Cibles identifiées" value={cibles} onChange={setCibles} placeholder="Quelles entreprises, et pourquoi elles ?" />
            <Champ label="Canaux d'approche" value={canaux} onChange={setCanaux} placeholder="LinkedIn, réseau, candidature directe, cabinet…" />
            <Champ label="Actions à mener" value={actions} onChange={setActions} placeholder="Ce que vous faites concrètement, étape par étape" />
            <Champ label="Ordre de priorité" value={priorites} onChange={setPriorites} placeholder="Qu'est-ce qui passe en premier ?" />
            <Champ label="Calendrier" value={calendrier} onChange={setCalendrier} placeholder="Sur combien de temps, quelles étapes ?" />
            <button
              onClick={analyser}
              disabled={loading || !planRempli}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wide text-sm disabled:opacity-40"
              style={{ background: '#c9a84c', color: '#050a1a' }}
            >
              {loading ? 'Analyse en cours…' : '🤖 Analyser mon plan'}
            </button>
          </div>
        </>
      )}

      {analyse && (
        <>
          <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(255,240,200,0.9)' }}>
            {analyse}
          </div>

          {!coupDeTheatre ? (
            <button
              onClick={declencherCoupDeTheatre}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
            >
              <span>🎲</span><span>Coup de théâtre</span>
            </button>
          ) : (
            <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#fca5a5' }}>🎲 Coup de théâtre</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.85)' }}>{coupDeTheatre}</p>
              <p className="text-sm font-bold text-white pt-1" style={{ borderTop: '1px solid rgba(239,68,68,0.15)' }}>Comment révisez-vous votre plan ?</p>
              <textarea
                value={planRevise}
                onChange={e => setPlanRevise(e.target.value)}
                placeholder="Que changez-vous dans votre stratégie face à cet imprévu ?"
                rows={3}
                className="w-full rounded-xl px-3 py-2 text-sm resize-y outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', caretColor: '#c9a84c' }}
              />
            </div>
          )}
        </>
      )}

      <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
        Notez vos résultats de votre côté — vous en débattrez avec votre intervenant en fin de séance.
      </div>
    </div>
  )
}
