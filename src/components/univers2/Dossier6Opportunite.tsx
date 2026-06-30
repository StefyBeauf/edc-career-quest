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
  const [entreprises, setEntreprises] = useState('')
  const [canaux, setCanaux] = useState('')
  const [actions, setActions] = useState('')
  const [priorites, setPriorites] = useState('')
  const [calendrier, setCalendrier] = useState('')
  const [analyse, setAnalyse] = useState('')
  const [loading, setLoading] = useState(false)
  const [rebondissement, setRebondissement] = useState<string | null>(null)
  const [planRevise, setPlanRevise] = useState('')

  const nouveauDossier = () => {
    setDossier(pick(dossiersStrategie))
    setEntreprises(''); setCanaux(''); setActions(''); setPriorites(''); setCalendrier('')
    setAnalyse(''); setRebondissement(null); setPlanRevise('')
  }

  const planRempli = entreprises.trim() && canaux.trim() && actions.trim()

  const analyser = async () => {
    if (!dossier || !planRempli) return
    setLoading(true)
    try {
      const res = await fetch('/api/expedition/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'strategie', dossier, entreprises, canaux, actions, priorites, calendrier }),
      })
      const data = await res.json() as { content?: string }
      setAnalyse(data.content ?? '')
    } finally { setLoading(false) }
  }

  const declencherRebondissement = () => setRebondissement(pick(rebondissementsStrategie))

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>Dossier 6 — L&apos;Opportunité</p>
        <h2 className="font-black text-white text-lg uppercase tracking-wide mb-2">Le Simulateur de Stratégie</h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Construisez un plan de recherche réaliste. L&apos;IA vérifie diversification, réalisme, cohérence et suivi.</p>
      </div>

      <button
        onClick={nouveauDossier}
        className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-black uppercase tracking-wide text-sm"
        style={{ background: 'rgba(201,168,76,0.15)', border: '1.5px solid rgba(201,168,76,0.45)', color: '#f5c842' }}
      >
        <span className="text-xl">📂</span><span>Attribuer un dossier</span>
      </button>

      {dossier && (
        <>
          <div className="rounded-2xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
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

          <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Votre plan d&apos;action</p>
            <Champ label="Entreprises ciblées" value={entreprises} onChange={setEntreprises} placeholder="Lesquelles, et pourquoi ?" />
            <Champ label="Canaux utilisés" value={canaux} onChange={setCanaux} placeholder="LinkedIn, jobboards, réseau, cabinets…" />
            <Champ label="Actions prévues" value={actions} onChange={setActions} placeholder="Ce que vous allez faire concrètement" />
            <Champ label="Priorités" value={priorites} onChange={setPriorites} placeholder="Qu'est-ce qui passe en premier ?" />
            <Champ label="Calendrier" value={calendrier} onChange={setCalendrier} placeholder="Sur combien de temps, quelles étapes ?" />
            <button
              onClick={analyser}
              disabled={loading || !planRempli}
              className="w-full py-3 rounded-xl font-black uppercase tracking-wide text-sm disabled:opacity-40"
              style={{ background: '#c9a84c', color: '#050a1a' }}
            >
              {loading ? 'Analyse en cours…' : '🤖 Analyser ma stratégie'}
            </button>
          </div>
        </>
      )}

      {analyse && (
        <>
          <div className="rounded-2xl p-4 whitespace-pre-line text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(255,240,200,0.9)' }}>
            {analyse}
          </div>

          {!rebondissement ? (
            <button
              onClick={declencherRebondissement}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-2xl font-black uppercase tracking-wide text-xs"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5' }}
            >
              <span>⚠️</span><span>Rebondissement</span>
            </button>
          ) : (
            <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#fca5a5' }}>⚠️ Rebondissement</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,200,0.85)' }}>{rebondissement}</p>
              <p className="text-sm font-bold text-white pt-1" style={{ borderTop: '1px solid rgba(239,68,68,0.15)' }}>Modifiez votre plan d&apos;action.</p>
              <textarea
                value={planRevise}
                onChange={e => setPlanRevise(e.target.value)}
                placeholder="Comment ajustez-vous votre stratégie face à cet imprévu ?"
                rows={3}
                className="w-full rounded-xl px-3 py-2 text-sm resize-y outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', caretColor: '#c9a84c' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
