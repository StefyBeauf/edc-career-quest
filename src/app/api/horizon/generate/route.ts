import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SPEC: Record<string, string> = {
  marketing: 'Marketing Digital (campagnes, réseaux sociaux, acquisition, influence, performance, KPI)',
  negociation: 'Négociation & Vente (relation client, argumentation, fidélisation, gestion des objections)',
  finance: 'Finance & Gestion (audit, contrôle de gestion, reporting, indicateurs, budget)',
}
const label = (s: string) => SPEC[s] ?? SPEC.marketing

const PROMPTS: Record<string, (s: string, extra?: number) => string> = {

  // ── Mission 1 ──────────────────────────────────────────────────────────────
  question_m1: (s) => `Tu es formateur en école de commerce. Génère UNE question de réflexion sur les compétences professionnelles pour un étudiant B3 en ${label(s)}.

La question doit pousser l'étudiant à identifier ses forces ou axes de progression. Elle doit être courte (1 phrase), concrète et ancrée dans la réalité professionnelle de la spécialité.

Réponds UNIQUEMENT avec la question. Aucune introduction.`,

  // ── Mission 2 — briefing immersif ─────────────────────────────────────────
  briefing_m2: (s) => `Tu es scénariste pour une simulation pédagogique immersive en école de commerce. Crée un briefing de mission réaliste pour des étudiants B3 en ${label(s)}.

Le briefing doit :
- Présenter une entreprise fictive crédible avec un nom, un secteur et un contexte précis
- Confier une mission claire et réaliste à l'équipe (tâche à réaliser en 90 minutes)
- Avoir l'air d'une vraie situation professionnelle, pas d'un exercice scolaire
- NE PAS mentionner qu'il y aura des alertes ou des imprévus (c'est la surprise)
- Être adapté au niveau Bac+3 et à la spécialité

Format STRICT :
🏢 [NOM DE L'ENTREPRISE] — [Secteur]
[Contexte de l'entreprise en 2 phrases]

📋 VOTRE MISSION
[Description précise de ce que l'équipe doit produire ou réaliser]

⏱ Durée : 90 minutes
👥 Travail en équipe

Bonne chance.`,

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

  // ── Mission 3 — histoire + distribution aléatoire par équipe ─────────────
  enigme_m3: (s, teams = 4) => {
    const packets = Array.from({ length: teams }, (_, i) => `📦 ÉQUIPE ${i + 1}\n• Info ${i * 2 + 1} : [fragment de l'histoire — partiel, cohérent avec les autres]\n• Info ${i * 2 + 2} : [fragment de l'histoire — partiel, une fausse piste possible]`).join('\n\n')
    return `Tu es le Centre de Contrôle Horizon. Crée une histoire professionnelle fragmentée pour un escape game inter-équipes. Contexte B3 ${label(s)}.

PRINCIPE : c'est LA MÊME HISTOIRE pour tout le monde. Mais chaque équipe ne reçoit que des fragments. Pour résoudre l'énigme, toutes les équipes doivent partager leurs informations.

Il y a ${teams} équipes. Génère ${teams} paquets d'informations différents. Certains fragments sont vrais, d'autres sont de fausses pistes, certains sont incomplets.

Format STRICT :
🎯 L'HISTOIRE
[Situation professionnelle réaliste à résoudre — 3 phrases. Poser une question ou un problème central que toutes les équipes doivent résoudre ensemble.]

${packets}

✅ SOLUTION (pour l'enseignante uniquement)
[Ce que les équipes doivent reconstituer ou décider]`
  },

  canal_m3: (s) => `Tu es le Centre de Contrôle Horizon. Pour un exercice de collaboration inter-équipes en ${label(s)}, génère UN canal de communication avec UNE contrainte.

Format STRICT :
📡 CANAL : [canal en 1-3 mots — ex: WhatsApp, Email, Porte-parole, Message écrit, Slack, Téléphone]
⚡ CONTRAINTE : [contrainte en 1 phrase — ex: 10 mots maximum, 1 seul message toutes les 5 min, uniquement des questions]`,

  // ── Mission 4 — situation de réflexion (pas de production) ───────────────
  situation_m4: (s) => `Tu es le Centre de Contrôle Horizon. Génère une situation de communication critique pour des B3 en ${label(s)}.

IMPORTANT : l'objectif est de faire RÉFLÉCHIR les étudiants, pas de produire une réponse. Tu poses la situation et tu génères des questions de réflexion sur les enjeux, les choix et les risques.

Format STRICT :
🚨 SITUATION
[2-3 phrases décrivant une situation de communication complexe, réaliste, avec des enjeux forts]

👤 Destinataire : [un destinataire précis]
📡 Canal imposé : [un canal précis]
⚡ Contrainte : [une contrainte de format ou de ton]

💭 QUESTIONS DE RÉFLEXION
1. Quels sont les risques si vous communiquez de la mauvaise façon dans cette situation ?
2. [Question sur le choix du ton ou du registre adapté]
3. [Question sur ce que le destinataire a vraiment besoin d'entendre]
4. [Question sur ce qu'il ne faut surtout pas dire ou faire]`,

  // ── Mission 5 — portefeuille de tâches Bac+3, 90 min ─────────────────────
  taches_m5: (s) => `Tu es le Centre de Contrôle Horizon. Génère un portefeuille de 6 tâches professionnelles simultanées pour des étudiants Bac+3 en ${label(s)}. Toutes arrivent en même temps. La session dure 1h à 1h30.

Les tâches doivent être complexes, nécessiter une vraie réflexion stratégique, et créer de vrais dilemmes de priorisation. Le niveau de langage et de complexité doit correspondre à un profil Bac+3 proche de l'insertion professionnelle.

Inclure au moins : une tâche à fort enjeu stratégique, une tâche relationnelle sensible, une tâche administrative urgente, une tâche à long terme à ne pas négliger.

Format STRICT :
TÂCHE 1 — [intitulé professionnel précis]
Urgence : [haute/moyenne/basse] | Impact stratégique : [fort/moyen/faible] | Délai : [durée] | Risque si ignorée : [1 phrase]

TÂCHE 2 — [intitulé professionnel précis]
Urgence : [haute/moyenne/basse] | Impact stratégique : [fort/moyen/faible] | Délai : [durée] | Risque si ignorée : [1 phrase]

TÂCHE 3 — [intitulé professionnel précis]
Urgence : [haute/moyenne/basse] | Impact stratégique : [fort/moyen/faible] | Délai : [durée] | Risque si ignorée : [1 phrase]

TÂCHE 4 — [intitulé professionnel précis]
Urgence : [haute/moyenne/basse] | Impact stratégique : [fort/moyen/faible] | Délai : [durée] | Risque si ignorée : [1 phrase]

TÂCHE 5 — [intitulé professionnel précis]
Urgence : [haute/moyenne/basse] | Impact stratégique : [fort/moyen/faible] | Délai : [durée] | Risque si ignorée : [1 phrase]

TÂCHE 6 — [intitulé professionnel précis]
Urgence : [haute/moyenne/basse] | Impact stratégique : [fort/moyen/faible] | Délai : [durée] | Risque si ignorée : [1 phrase]`,

  urgence_m5: (s) => `Tu es le Centre de Contrôle Horizon. Génère UN événement surprise qui arrive pendant un exercice de priorisation pour des Bac+3 en ${label(s)}. Il doit rebattre les cartes et forcer un réarbitrage stratégique immédiat. Le niveau doit être celui d'un professionnel junior en poste.

Format STRICT :
⚠️ URGENCE — [titre en 5 mots max]
[Description en 2-3 phrases. Impact concret sur les tâches en cours. Décision requise immédiatement.]`,

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
    const { type, specialization, teams } = await req.json() as { type: string; specialization: string; teams?: number }
    const promptFn = PROMPTS[type]
    if (!promptFn) return NextResponse.json({ error: 'Type inconnu' }, { status: 400 })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 800,
      messages: [{ role: 'user', content: promptFn(specialization ?? 'marketing', teams) }],
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Erreur de génération' }, { status: 500 })
  }
}
