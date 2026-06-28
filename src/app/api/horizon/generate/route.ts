import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SPECIALITY_LABELS: Record<string, string> = {
  marketing: 'Marketing Digital (campagnes, réseaux sociaux, acquisition, influence, performance)',
  negociation: 'Négociation & Vente (relation client, argumentation, fidélisation, gestion des objections)',
  finance: 'Finance & Gestion (audit, contrôle de gestion, reporting, indicateurs, budget)',
}

function getSpecialityLabel(spec: string) {
  return SPECIALITY_LABELS[spec] ?? SPECIALITY_LABELS['marketing']
}

const PROMPTS: Record<string, (spec: string) => string> = {
  question_competences: (spec) => `Tu es un formateur en école de commerce. Génère UNE seule question de réflexion sur les compétences pour un étudiant B3 spécialisé en ${getSpecialityLabel(spec)}.

La question doit :
- Pousser l'étudiant à identifier ses forces ou ses axes de progression
- Être concrète et ancrée dans la réalité professionnelle de la spécialité
- Être courte (1 phrase maximum)

Réponds UNIQUEMENT avec la question, sans introduction ni explication.`,

  incident: (spec) => `Tu es un formateur. Génère UN incident professionnel réaliste pour un exercice de gestion de crise en classe. L'étudiant est en B3 spécialisé en ${getSpecialityLabel(spec)}.

L'incident doit :
- Être crédible dans ce contexte professionnel
- Créer une vraie pression (délai, information manquante, changement soudain…)
- Être court : 2 phrases maximum

Format de réponse :
🔴 [Type d'incident en 2 mots]
[Description de l'incident]`,

  contrainte_communication: (spec) => `Tu es un formateur. Génère UNE contrainte de communication originale pour un exercice de travail en équipe. Contexte : étudiants B3 spécialisés en ${getSpecialityLabel(spec)}.

Exemples de types de contraintes : communication uniquement écrite, un seul porte-parole, 10 mots max par message, pas de questions directes, communication indirecte, rôles imposés…

Réponds UNIQUEMENT avec la contrainte, formulée comme une règle claire et actionnable. 1 à 2 phrases maximum.`,

  perturbation: (spec) => `Tu es un formateur. Génère UNE perturbation d'information pour un exercice de collaboration. Contexte : B3 spécialisé en ${getSpecialityLabel(spec)}.

Types de perturbations possibles : une info est fausse, un indice est incomplet, un groupe a une info clé que les autres n'ont pas, une info arrive en retard, deux sources se contredisent.

Réponds UNIQUEMENT avec la perturbation, formulée comme une instruction à donner à l'enseignante. 1 à 2 phrases.`,

  scenario_communication: (spec) => `Tu es un formateur. Génère un mini-scénario de communication pour un étudiant B3 en ${getSpecialityLabel(spec)}.

Format STRICT de réponse (exactement ce format, rien d'autre) :
Destinataire : [UN destinataire]
Objectif : [UN verbe d'action]
Contrainte : [UNE contrainte de format]`,

  taches: (spec) => `Tu es un formateur. Génère une liste de 4 tâches professionnelles à prioriser pour un étudiant B3 en ${getSpecialityLabel(spec)}.

Chaque tâche a une urgence et une importance différentes pour créer un vrai dilemme de priorisation.

Format STRICT :
1. [Tâche] — Urgence : [haute/moyenne/basse] — Impact : [fort/moyen/faible]
2. [Tâche] — Urgence : [haute/moyenne/basse] — Impact : [fort/moyen/faible]
3. [Tâche] — Urgence : [haute/moyenne/basse] — Impact : [fort/moyen/faible]
4. [Tâche] — Urgence : [haute/moyenne/basse] — Impact : [fort/moyen/faible]`,

  urgence: (spec) => `Tu es un formateur. Génère UNE urgence qui arrive en cours d'exercice pour déstabiliser les étudiants B3 en ${getSpecialityLabel(spec)}.

L'urgence doit changer les priorités établies et forcer une décision rapide.

Format :
⚠️ URGENCE : [titre en 4 mots max]
[Description en 1-2 phrases]`,

  scenario_final: (spec) => `Tu es un formateur expert en école de commerce. Génère un scénario de simulation finale pour des étudiants B3 en ${getSpecialityLabel(spec)}.

Le scénario doit inclure :
- Un contexte d'entreprise fictif réaliste
- Un problème principal à résoudre
- 2 personnages clés avec leurs rôles
- 2 contraintes fortes
- Le livrable attendu

Format STRICT :
🏢 CONTEXTE
[2-3 phrases]

🚨 PROBLÈME PRINCIPAL
[1-2 phrases]

👥 PERSONNAGES
• [Personnage 1] : [rôle]
• [Personnage 2] : [rôle]

⚡ CONTRAINTES
• [Contrainte 1]
• [Contrainte 2]

📋 LIVRABLE ATTENDU
[1 phrase]`,

  evenement_final: (spec) => `Tu es un formateur. Génère UN événement imprévu qui survient pendant la simulation finale. Contexte B3 en ${getSpecialityLabel(spec)}.

L'événement doit compliquer le scénario en cours sans le rendre impossible.

Format :
[Emoji approprié] [TYPE] : [titre]
[Description en 1-2 phrases]`,

  debrief: (spec) => `Tu es un formateur expert. Génère 4 questions de débrief pédagogique après une simulation pour des B3 en ${getSpecialityLabel(spec)}.

Les questions doivent couvrir : ce qui a bien fonctionné, ce qui a été difficile, les apprentissages, et les axes d'amélioration.

Format :
1. [Question]
2. [Question]
3. [Question]
4. [Question]`,
}

export async function POST(req: Request) {
  try {
    const { type, specialization } = await req.json() as { type: string; specialization: string }

    const promptFn = PROMPTS[type]
    if (!promptFn) {
      return NextResponse.json({ error: 'Type inconnu' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{ role: 'user', content: promptFn(specialization ?? 'marketing') }],
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Erreur de génération' }, { status: 500 })
  }
}
