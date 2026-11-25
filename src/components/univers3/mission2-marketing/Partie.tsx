'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  accueilM2 as A, ALERTES_CHRONO_MIN, DUREES_EPREUVES_MIN, epreuves, textesAnalyse, textesChrono as T,
} from '@/lib/content/univers3-marketing-m2'
import DossierClient from './DossierClient'
import EcranEpreuve from './EcranEpreuve'
import EcranPause from './EcranPause'
import Consequences, { BoutonRelancer } from './Consequences'
import Jauges from './Jauges'
import { useAnalyses } from './useAnalyses'
import { useBilan } from './useBilan'
import EcranBilan from './EcranBilan'
import AlertesUltimatum from './AlertesUltimatum'
import FicheCreateur from './FicheCreateur'
import FilSocial from './FilSocial'
import { contexteUltimatum, createurTire, criseTiree, decisionPartenariat } from './contexteNarratif'
import Chronometre from './Chronometre'
import {
  assurerTirages, demarrerPhase2, formaterCode, marquerAlerte, modifierReponse, passerALaSuite, soumettreEpreuve, type EtatPartie,
} from './etatPartie'
import { STRYDE } from './theme'
import { formaterTemps, tempsRestantMs, useMaintenant } from './useChrono'
import { usePilotage } from './usePilotage'

// Partie en cours : chronomètre, alertes, soumission (anticipée ou automatique), enchaînement
// épreuve → conséquences → épreuve suivante / pause / bilan.
// Le tableau de bord, les variantes (épreuves 4-6) et l'analyse IA arrivent aux lots suivants.

interface Props {
  slug: string
  etat: EtatPartie
  reprise: boolean
  mettreAJour: (f: (e: EtatPartie) => EtatPartie) => void
  sauverMaintenant: () => void
}

// Lecture du pilotage : toutes les 10 s pendant la pause (déblocage de la phase 2),
// toutes les 20 s pendant une épreuve (minutes ajoutées par l'intervenante).
const INTERVALLE_PAUSE_MS = 10_000
const INTERVALLE_EPREUVE_MS = 20_000

export default function Partie({ slug, etat, reprise, mettreAJour, sauverMaintenant }: Props) {
  const n = typeof etat.etape === 'number' ? etat.etape : null
  const soumis = n !== null && etat.soumisLe[n] !== undefined
  const enCours = n !== null && !soumis

  const { pilotage, statut } = usePilotage(slug, etat.etape === 'pause' ? INTERVALLE_PAUSE_MS : enCours ? INTERVALLE_EPREUVE_MS : undefined)
  // Pilotage injoignable : on garde le dernier cumul connu, pour ne jamais raccourcir une épreuve.
  const bonusCourant = pilotage?.minutesBonus ?? etat.dernierBonus ?? (n !== null ? etat.bonusAuDebut[n] ?? 0 : 0)

  const t = useMaintenant(enCours)
  // t = 0 tant que l'horloge n'a pas tourné une première fois : aucune expiration possible avant.
  const restant = n !== null && t > 0 ? tempsRestantMs(etat, n, bonusCourant, t) : (n !== null ? DUREES_EPREUVES_MIN[n] * 60_000 : 0)

  const [message, setMessage] = useState<string | null>(null)
  const [dossierOuvert, setDossierOuvert] = useState(false)
  const { enCours: analysesEnCours, relancer } = useAnalyses(etat, mettreAJour)
  // Analyses en échec relançables, signalées hors de l'écran de conséquences de l'épreuve concernée.
  const { enCours: bilanEnCours, relancer: relancerBilan } = useBilan(etat, mettreAJour, analysesEnCours)
  // (L'écran de bilan affiche ses propres boutons de relance.)
  const enAttenteAilleurs = etat.etape === 'bilan' ? [] : Object.keys(etat.analyses).map(Number)
    .filter(k => etat.analyses[k] === 'en-attente' && !(k === n && soumis))

  // Chronomètre toujours visible : quand le bandeau sort de l'écran au défilement, une barre
  // compacte s'affiche en haut (rendue dans <body> ; la coquille U3 empêche un bandeau « sticky »).
  const refBandeau = useRef<HTMLElement>(null)
  const [bandeauVisible, setBandeauVisible] = useState(true)
  useEffect(() => {
    const el = refBandeau.current
    if (!el) return
    const obs = new IntersectionObserver(([entree]) => setBandeauVisible(entree.isIntersecting))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect -- réactions à l'horloge et au pilotage (événements extérieurs au rendu) */

  // L'intervenante a fermé la mission (repère de session modifié) : rechargement, la purge s'applique au chargement.
  useEffect(() => {
    if (statut === 'ok' && pilotage && !etat.sessionInconnue && pilotage.session !== etat.session) {
      window.location.reload()
    }
  }, [statut, pilotage, etat.session, etat.sessionInconnue])

  // Minutes ajoutées par l'intervenante : mémorisées et annoncées si une épreuve est en cours.
  useEffect(() => {
    if (!pilotage || pilotage.minutesBonus === etat.dernierBonus) return
    const avant = etat.dernierBonus
    mettreAJour(e => ({ ...e, dernierBonus: pilotage.minutesBonus }))
    if (enCours && avant !== undefined && pilotage.minutesBonus > avant) {
      setMessage(T.tempsAjoute(pilotage.minutesBonus - avant))
    }
  }, [pilotage, etat.dernierBonus, enCours, mettreAJour])

  // Expiration : soumission automatique, réponses conservées telles quelles (même incomplètes).
  // Fonctionne aussi hors ligne : la soumission est locale, l'analyse attendra le réseau.
  useEffect(() => {
    if (n !== null && enCours && t > 0 && restant <= 0) {
      mettreAJour(e => soumettreEpreuve(e, n, true))
      setMessage(null)
    }
  }, [n, enCours, t, restant, mettreAJour])

  // Alertes à 5 min et à 1 min, une seule fois chacune (mémorisées dans l'état de partie).
  useEffect(() => {
    if (n === null || !enCours || t <= 0 || restant <= 0) return
    const vues = etat.alertesVues?.[n] ?? []
    const franchies = ALERTES_CHRONO_MIN.filter(m => restant <= m * 60_000 && !vues.includes(m))
    if (franchies.length === 0) return
    mettreAJour(e => franchies.reduce((acc, m) => marquerAlerte(acc, n, m), e))
    // Après un rechargement tardif, seule l'alerte la plus urgente s'affiche.
    setMessage(Math.min(...franchies) === 1 ? T.alerte1 : T.alerte5)
  }, [n, enCours, t, restant, etat.alertesVues, mettreAJour])

  // Filet de sécurité : tirage manquant pour l'épreuve en cours (ne retire jamais un tirage existant).
  useEffect(() => {
    if (n !== null && n >= 4 && (!etat.variantes.createur || (n >= 5 && !etat.variantes.crise))) mettreAJour(assurerTirages)
  }, [n, etat.variantes.createur, etat.variantes.crise, mettreAJour])

  /* eslint-enable react-hooks/set-state-in-effect */

  // Les messages s'effacent seuls au bout de 12 s.
  useEffect(() => {
    if (!message) return
    const id = setTimeout(() => setMessage(null), 12_000)
    return () => clearTimeout(id)
  }, [message])

  const bonusPourDemarrer = pilotage?.minutesBonus ?? etat.dernierBonus ?? 0

  return (
    <div className="space-y-6">
      <header ref={refBandeau} className="flex flex-wrap items-center justify-between gap-3 pb-4" style={{ borderBottom: `1px solid ${STRYDE.bordure}` }}>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: STRYDE.texteSecondaire }}>Agence</p>
          <p className="text-2xl font-black uppercase tracking-tight">{etat.agence}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {/* Dossier client accessible en un clic depuis chaque écran de la partie. */}
          <button
            type="button"
            onClick={() => setDossierOuvert(true)}
            aria-haspopup="dialog"
            className="rounded-xl px-4 py-2.5 text-sm font-black uppercase tracking-wider"
            style={{ border: `1px solid ${STRYDE.orange}`, color: STRYDE.orange }}
          >
            Dossier client
          </button>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: STRYDE.texteSecondaire }}>{A.codeLabel}</p>
            <p className="text-xl font-black tracking-[0.2em]" style={{ color: STRYDE.orange }} data-testid="m2-code">{formaterCode(etat.partieId)}</p>
          </div>
          {n !== null && <Chronometre restantMs={restant} termine={soumis} />}
        </div>
      </header>

      {!bandeauVisible && n !== null && createPortal(
        <div className="fixed top-0 inset-x-0 z-40 flex items-center justify-between gap-3 px-4 py-2 motion-safe:animate-in motion-safe:slide-in-from-top" style={{ background: STRYDE.noir, borderBottom: `1px solid ${STRYDE.bordure}`, color: STRYDE.blancCasse }} data-testid="m2-barre-compacte">
          <p className="text-sm font-black uppercase tracking-tight truncate">{etat.agence} · Épreuve {n} / 6</p>
          <div className="flex items-center gap-3 shrink-0">
            <button type="button" onClick={() => setDossierOuvert(true)} aria-haspopup="dialog" className="rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider" style={{ border: `1px solid ${STRYDE.orange}`, color: STRYDE.orange }}>
              Dossier client
            </button>
            <span className="text-xl font-black tabular-nums" style={{ color: restant <= 5 * 60_000 && !soumis ? STRYDE.orange : STRYDE.blancCasse }} aria-hidden="true">
              {soumis ? 'Terminée' : formaterTemps(restant)}
            </span>
          </div>
        </div>,
        document.body,
      )}

      <div aria-live="assertive" className="min-h-0">
        {message && (
          <div role="alert" className="rounded-xl px-4 py-3 text-sm font-semibold flex items-start justify-between gap-3" style={{ background: STRYDE.orangeDoux, border: '1px solid rgba(255,91,20,0.5)' }} data-testid="m2-alerte">
            <span>{message}</span>
            <button type="button" onClick={() => setMessage(null)} aria-label="Fermer le message" className="font-black px-1" style={{ color: STRYDE.orange }}>×</button>
          </div>
        )}
      </div>

      {/* Tableau de bord compact : les 4 jauges restent visibles pendant les épreuves. */}
      {n !== null && <Jauges etat={etat} compact />}

      {enAttenteAilleurs.map(k => (
        <div key={k} role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm" style={{ background: STRYDE.anthracite, border: `1px dashed ${STRYDE.bordure}` }} data-testid="m2-bandeau-attente">
          <span>{textesAnalyse.bandeauAttente(k)}</span>
          <BoutonRelancer etat={etat} n={k} enCours={analysesEnCours.includes(k)} onRelancer={() => void relancer(k)} />
        </div>
      ))}

      {reprise && (
        <div role="status" className="rounded-xl px-4 py-3 text-sm" style={{ background: STRYDE.anthracite, border: `1px solid ${STRYDE.bordure}` }}>
          <strong>{A.repriseTitre}.</strong> {A.repriseTexte}
        </div>
      )}

      {n !== null && (
        <EcranEpreuve
          epreuve={epreuves[n - 1]}
          etat={etat}
          onReponse={(champId, valeur) => mettreAJour(e => modifierReponse(e, n, champId, valeur))}
          onBlur={sauverMaintenant}
          onValider={() => mettreAJour(e => soumettreEpreuve(e, n, false))}
          onOuvrirDossier={() => setDossierOuvert(true)}
          annexe={annexeEpreuve(n, etat)}
          consequences={<Consequences etat={etat} n={n} enCours={analysesEnCours.includes(n)} onRelancer={() => void relancer(n)} />}
          suite={(
            <button
              type="button"
              onClick={() => mettreAJour(e => passerALaSuite(e, bonusPourDemarrer))}
              className="rounded-xl px-6 py-3.5 font-black uppercase tracking-[0.12em]"
              style={{ background: STRYDE.orange, color: STRYDE.noir }}
            >
              {n === 3 ? T.versPause : n === 6 ? T.versBilan : T.epreuveSuivante} →
            </button>
          )}
        />
      )}

      {etat.etape === 'pause' && (
        <EcranPause
          etat={etat}
          phase2Ouverte={pilotage?.phase2Ouverte === true}
          statut={statut}
          onCommencer={() => {
            // Double vérification du verrou au moment du clic.
            if (pilotage?.phase2Ouverte === true) mettreAJour(e => demarrerPhase2(e, bonusPourDemarrer))
          }}
        />
      )}

      <DossierClient ouvert={dossierOuvert} onFermer={() => setDossierOuvert(false)} />

      {etat.etape === 'bilan' && (
        <EcranBilan
          etat={etat}
          bilanEnCours={bilanEnCours}
          onRelancerBilan={() => void relancerBilan()}
          analysesEnCours={analysesEnCours}
          onRelancerAnalyse={k => void relancer(k)}
        />
      )}
    </div>
  )
}

// Contenu propre aux épreuves 4 à 6, nourri par les tirages et les décisions précédentes.
function annexeEpreuve(n: number, etat: EtatPartie) {
  if (n === 4) {
    const p = createurTire(etat)
    return p ? <FicheCreateur profil={p} /> : null
  }
  if (n === 5) {
    const v = criseTiree(etat)
    // Un partenariat ACCEPTÉ à l'épreuve 4 rend le créateur visible dans la polémique.
    const partenaire = decisionPartenariat(etat) === 'accepter' ? createurTire(etat) : undefined
    return v ? <FilSocial variante={v} createurPartenaire={partenaire} /> : null
  }
  if (n === 6) return <AlertesUltimatum contexte={contexteUltimatum(etat)} />
  return null
}
