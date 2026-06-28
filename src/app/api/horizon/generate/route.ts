import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SPEC: Record<string, string> = {
  marketing: 'Marketing Digital (campagnes, réseaux sociaux, acquisition, influence, performance, KPI)',
  negociation: 'Négociation & Vente (relation client, argumentation, fidélisation, gestion des objections)',
  finance: 'Finance & Gestion (audit, contrôle de gestion, reporting, indicateurs, budget)',
}
const label = (s: string) => SPEC[s] ?? SPEC.marketing

const PROMPTS: Record<string, (s: string) => string> = {

  // ── Mission 1 ──────────────────────────────────────────────────────────────
  question_m1: (s) => `Tu es formateur en école de commerce. Génère UNE question de réflexion sur les compétences professionnelles pour un étudiant B3 en ${label(s)}.

La question doit pousser l'étudiant à identifier ses forces ou axes de progression. Elle doit être courte (1 phrase), concrète et ancrée dans la réalité professionnelle de la spécialité.

Réponds UNIQUEMENT avec la question. Aucune introduction.`,

  // ── Mission 2 — alerte auto-injectée ──────────────────────────────────────
  alerte_m2: (s) => `Tu es le Centre de Contrôle Horizon, un maître du jeu IA pour une simulation pédagogique en école de commerce. Tu génères des alertes imprévisibles pour des étudiants B3 en ${label(s)} en plein exercice de gestion de crise.

Génère UNE alerte réaliste et surprenante. Elle doit créer de la pression et forcer une adaptation immédiate.

Types possibles (choisis aléatoirement) :
RESSOURCES : membre indisponible, document perdu, outil hors service
TEMPS : délai réduit, réunion avancée, deadline raccourcie
INFORMATIONS : donnée contradictoire, erreur détectée, nouvelle information critique
CONTEXTE : priorité modifiée par la direction, nouveau risque, changement de périmètre

Format STRICT :
[Emoji] [TYPE EN MAJUSCULES] — [Titre en 5 mots max]
[Description en 1-2 phrases. Ton urgent et direct.]`,

  // ── Mission 3 — énigme collaborative ──────────────────────────────────────
  enigme_m3: (s) => `Tu es le Centre de Contrôle Horizon. Génère une énigme collaborative pour un escape game inter-équipes en contexte B3 ${label(s)}.

L'énigme doit être non résolvable par une seule équipe : les informations sont réparties en 4 paquets d'indices.

Format STRICT :
🎯 ÉNIGME
[Titre de l'énigme + objectif à atteindre, 2 phrases]

📦 PAQUET A — Équipe 1
• Indice 1 : [information partielle réelle]
• Indice 2 : [information partielle réelle]

📦 PAQUET B — Équipe 2
• Indice 3 : [information partielle réelle]
• Indice 4 : [information partielle réelle]

📦 PAQUET C — Équipe 3
• Indice 5 : [information partielle ou fausse piste]
• Indice 6 : [information partielle réelle]

📦 PAQUET D — Équipe 4
• Indice 7 : [information clé — manquante aux autres]
• Indice 8 : [information partielle réelle]

✅ SOLUTION
[Ce que les équipes doivent trouver ensemble]`,

  canal_m3: (s) => `Tu es le Centre de Contrôle Horizon. Pour un exercice de collaboration inter-équipes en ${label(s)}, génère UN canal de communication avec UNE contrainte.

Format STRICT :
📡 CANAL : [canal en 1-3 mots — ex: WhatsApp, Email, Porte-parole, Message écrit, Slack, Téléphone]
⚡ CONTRAINTE : [contrainte en 1 phrase — ex: 10 mots maximum, 1 seul message toutes les 5 min, uniquement des questions]`,

  // ── Mission 4 — situation de communication ────────────────────────────────
  situation_m4: (s) => `Tu es le Centre de Contrôle Horizon. Génère une situation de communication critique complète pour des B3 en ${label(s)}.

Format STRICT (exactement ce format) :
🚨 INFORMATION CRITIQUE
[1-2 phrases décrivant la situation urgente à communiquer]

👤 DESTINATAIRE
[Un seul destinataire : Direction / Client / Manager / Équipe terrain / Partenaire / RH / Presse / Investisseur]

📡 CANAL IMPOSÉ
[Un seul canal : Email / WhatsApp / Slack / Teams / Téléphone / Réunion / Pitch oral / Note interne]

⚡ CONTRAINTE
[Une contrainte : ex: 50 mots maximum / Ton rassurant / Ton directif / 30 secondes / Sans jargon technique]`,

  // ── Mission 5 — tâches à prioriser ───────────────────────────────────────
  taches_m5: (s) => `Tu es le Centre de Contrôle Horizon. Génère 5 tâches professionnelles simultanées pour des B3 en ${label(s)}. Elles arrivent toutes en même temps. Les étudiants doivent décider l'ordre de traitement.

Les niveaux d'urgence et d'impact doivent créer de vrais dilemmes (pas tout urgent, pas tout important).

Format STRICT :
TÂCHE 1 — [intitulé en 5 mots max]
Urgence : [haute/moyenne/basse] | Impact : [fort/moyen/faible] | Délai : [durée] | Risque : [1 phrase courte]

TÂCHE 2 — [intitulé en 5 mots max]
Urgence : [haute/moyenne/basse] | Impact : [fort/moyen/faible] | Délai : [durée] | Risque : [1 phrase courte]

TÂCHE 3 — [intitulé en 5 mots max]
Urgence : [haute/moyenne/basse] | Impact : [fort/moyen/faible] | Délai : [durée] | Risque : [1 phrase courte]

TÂCHE 4 — [intitulé en 5 mots max]
Urgence : [haute/moyenne/basse] | Impact : [fort/moyen/faible] | Délai : [durée] | Risque : [1 phrase courte]

TÂCHE 5 — [intitulé en 5 mots max]
Urgence : [haute/moyenne/basse] | Impact : [fort/moyen/faible] | Délai : [durée] | Risque : [1 phrase courte]`,

  urgence_m5: (s) => `Tu es le Centre de Contrôle Horizon. Génère UN événement surprise qui arrive pendant un exercice de priorisation pour des B3 en ${label(s)}. Il doit rebattre les cartes et forcer une ré-arbitrage immédiat.

Format STRICT :
⚠️ URGENCE — [titre en 4 mots max]
[Description en 2 phrases. Impact immédiat sur les tâches en cours. Ton très direct.]`,

  // ── Mission 6 — scénario final ────────────────────────────────────────────
  scenario_m6: (s) => `Tu es le Centre de Contrôle Horizon. Génère un scénario de crise complet pour la mission finale "Sauver Horizon" — simulation de 90 minutes pour des B3 en ${label(s)}.

Format STRICT :
🏢 CONTEXTE
[Entreprise fictive, secteur, situation initiale — 3 phrases]

🚨 ANOMALIE MAJEURE
[Le problème central qui menace la mission — 2 phrases]

👥 PERSONNAGES
• [Prénom] — [Rôle] : [attitude ou contrainte particulière]
• [Prénom] — [Rôle] : [attitude ou contrainte particulière]
• [Prénom] — [Rôle] : [attitude ou contrainte particulière]

⚡ CONTRAINTES DE DÉPART
• [Contrainte 1]
• [Contrainte 2]
• [Contrainte 3]

📋 LIVRABLES ATTENDUS À 90 MIN
• Diagnostic de la situation
• Priorités retenues et justification
• Décisions prises
• Plan d'action
• Stratégie de communication`,

  alerte_m6: (s) => `Tu es le Centre de Contrôle Horizon, maître du jeu d'une simulation de crise de 90 minutes pour des B3 en ${label(s)}. La station Horizon est en danger.

Génère UNE alerte qui complique la situation en cours sans la rendre impossible.

Types possibles :
PANNE : système ou ressource qui lâche
INFO CONTRADICTOIRE : nouvelle donnée qui remet en question une décision prise
RESSOURCE INDISPONIBLE : personne, outil, budget qui disparaît
CONTRAINTE SUPPLÉMENTAIRE : nouvelle limite imposée
COMMUNICATION URGENTE : message à transmettre immédiatement à un destinataire précis
PRIORITÉ MODIFIÉE : la direction change d'objectif

Format STRICT :
[Emoji] [TYPE] — [Titre en 5 mots max]
[Description en 2 phrases. Ton urgent. Impact immédiat sur la mission.]`,

  debrief_m6: (s) => `Tu es formateur. Génère 5 questions de débrief pédagogique après une simulation de crise pour des B3 en ${label(s)}.

Les questions doivent couvrir : priorisation, communication, travail d'équipe, gestion du stress, apprentissages clés.

Format :
1. [Question]
2. [Question]
3. [Question]
4. [Question]
5. [Question]`,
}

export async function POST(req: Request) {
  try {
    const { type, specialization } = await req.json() as { type: string; specialization: string }
    const promptFn = PROMPTS[type]
    if (!promptFn) return NextResponse.json({ error: 'Type inconnu' }, { status: 400 })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: promptFn(specialization ?? 'marketing') }],
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Erreur de génération' }, { status: 500 })
  }
}
