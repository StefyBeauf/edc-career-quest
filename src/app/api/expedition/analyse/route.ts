import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

interface PitchPayload {
  type: 'pitch'
  interlocuteur: string
  contexte: string
  duree: number
  pitch: string
}

interface StrategiePayload {
  type: 'strategie'
  dossier: { titre: string; situation: string; contraintes: string[]; ressources: string[] }
  entreprises: string
  canaux: string
  actions: string
  priorites: string
  calendrier: string
}

function buildPitchPrompt(p: PitchPayload) {
  return `Tu es coach en insertion professionnelle dans une école de commerce. Un étudiant s'entraîne à pitcher dans la situation suivante :

Interlocuteur : ${p.interlocuteur}
Contexte : ${p.contexte}
Durée imposée : ${p.duree} secondes

Voici le pitch rédigé par l'étudiant :
"""
${p.pitch}
"""

Analyse ce pitch et réponds STRICTEMENT dans ce format :

✅ STRUCTURE
Qui il est : [oui/partiellement/non — 1 courte remarque]
Ce qu'il fait : [oui/partiellement/non — 1 courte remarque]
Ce qu'il recherche : [oui/partiellement/non — 1 courte remarque]
Sa valeur ajoutée : [oui/partiellement/non — 1 courte remarque]

🎯 ADAPTATION À L'INTERLOCUTEUR (${p.interlocuteur})
[2-3 phrases : le pitch est-il adapté à ce que cet interlocuteur précis attend ? Que faudrait-il accentuer ou retirer ?]

🔍 CLARTÉ
[Détecte : phrases trop longues, jargon, répétitions. 2 phrases maximum. Si rien à signaler, dis-le.]

📊 SCORES
Adaptation à l'interlocuteur : [note]/10
Clarté : [note]/10
Impact : [note]/10
Crédibilité : [note]/10

💡 CONSEIL PRINCIPAL
[Un seul conseil concret et actionnable, la priorité absolue à corriger]`
}

function buildStrategiePrompt(p: StrategiePayload) {
  return `Tu es coach en insertion professionnelle dans une école de commerce. Un étudiant construit une stratégie de recherche dans le cadre suivant :

Dossier : ${p.dossier.titre}
Situation : ${p.dossier.situation}
Contraintes : ${p.dossier.contraintes.join(', ')}
Ressources disponibles : ${p.dossier.ressources.join(', ')}

Voici le plan rédigé par l'étudiant :
Entreprises ciblées : ${p.entreprises || '(non renseigné)'}
Canaux utilisés : ${p.canaux || '(non renseigné)'}
Actions prévues : ${p.actions || '(non renseigné)'}
Priorités : ${p.priorites || '(non renseigné)'}
Calendrier : ${p.calendrier || '(non renseigné)'}

Analyse ce plan et réponds STRICTEMENT dans ce format :

🔀 DIVERSIFICATION
[Le plan repose-t-il sur un seul canal/levier ou est-il diversifié ? 1-2 phrases. Si un seul canal est utilisé à 100%, le signaler explicitement.]

🎯 RÉALISME
[Les objectifs sont-ils réalistes compte tenu du temps et des contraintes données ? 1-2 phrases.]

🔗 COHÉRENCE
[Les entreprises ciblées sont-elles cohérentes avec le dossier (${p.dossier.titre}) ? 1-2 phrases.]

📌 SUIVI & RELANCES
[Le plan prévoit-il un système de suivi ou de relance des candidatures ? Si rien n'est mentionné, le signaler.]

💡 RECOMMANDATION PRINCIPALE
[Un seul conseil concret et actionnable, la priorité absolue à corriger dans ce plan]`
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as PitchPayload | StrategiePayload

    const prompt = body.type === 'pitch' ? buildPitchPrompt(body) : buildStrategiePrompt(body)

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Erreur de génération' }, { status: 500 })
  }
}
