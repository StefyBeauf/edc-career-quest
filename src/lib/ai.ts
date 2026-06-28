import Anthropic from '@anthropic-ai/sdk'
import type { Specialization, SimulationScenario, AIFeedback, EventType } from '@/types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateSimulationScenario(
  specialization: Specialization,
  missionNumber: number
): Promise<SimulationScenario> {
  const specializations = {
    marketing: 'Marketing Digital',
    negociation: 'Négociation Commerciale',
    finance: 'Finance d\'Entreprise',
  }

  const prompt = `Tu es un expert en formation professionnelle spécialisé en ${specializations[specialization]}.

Génère un scénario de simulation professionnelle pour une mission de 90-120 minutes destinée à des étudiants de 3ème année en ${specializations[specialization]}.

Mission numéro : ${missionNumber}

Retourne UNIQUEMENT un JSON valide avec cette structure exacte :
{
  "title": "Titre accrocheur de la mission",
  "context": "Description du contexte d'entreprise (3-4 phrases)",
  "company": "Nom de l'entreprise fictive",
  "role": "Poste occupé par l'étudiant dans la simulation",
  "characters": [
    {"name": "Prénom Nom", "role": "Poste", "personality": "Trait principal"}
  ],
  "documents": [
    {"name": "Nom du document", "description": "Ce que contient ce document", "content": "Contenu synthétique du document (5-10 lignes)"}
  ],
  "objective": "Objectif principal de la mission",
  "deliverables": ["Livrable 1", "Livrable 2", "Livrable 3"],
  "constraints": ["Contrainte 1", "Contrainte 2", "Contrainte 3"],
  "specialization": "${specialization}"
}

Assure-toi que le scénario est réaliste, professionnel et adapté au niveau Master/Bachelor 3.`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in AI response')
  return JSON.parse(jsonMatch[0]) as SimulationScenario
}

export async function generateSimulationEvent(
  scenario: SimulationScenario,
  eventType: EventType,
  elapsedMinutes: number
): Promise<string> {
  const eventLabels = {
    incident: 'incident problématique',
    urgence: 'situation d\'urgence',
    opportunité: 'opportunité inattendue',
    info: 'nouvelle information importante',
  }

  const prompt = `Tu es animateur d'une simulation professionnelle.

Contexte : ${scenario.context}
Entreprise : ${scenario.company}
Rôle de l'étudiant : ${scenario.role}
Objectif : ${scenario.objective}
Temps écoulé : ${elapsedMinutes} minutes

Génère un ${eventLabels[eventType]} qui surgit maintenant et complique ou enrichit la situation.
L'événement doit être court (3-5 phrases), réaliste et forcer l'étudiant à adapter sa stratégie.
Commence directement par l'annonce de l'événement, sans introduction.`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

export async function generateAIFeedback(
  scenario: SimulationScenario,
  studentResponse: string,
  deliverable: string
): Promise<AIFeedback> {
  const prompt = `Tu es un formateur expert en ${scenario.specialization === 'marketing' ? 'Marketing Digital' : scenario.specialization === 'negociation' ? 'Négociation Commerciale' : 'Finance d\'Entreprise'}.

Contexte de la simulation : ${scenario.context}
Livrable évalué : ${deliverable}
Réponse de l'étudiant : ${studentResponse}

Évalue cette réponse de façon pédagogique. Retourne UNIQUEMENT un JSON valide :
{
  "pointFort": "Ce qui est bien dans la réponse (1-2 phrases)",
  "axeAmelioration": "Ce qui peut être renforcé (1-2 phrases)",
  "questionReflexion": "Une question ouverte pour approfondir la réflexion",
  "vigilanceProfessionnelle": "Un écueil à éviter dans la pratique professionnelle"
}

RÈGLE ABSOLUE : Ne jamais donner la réponse correcte. Guider sans révéler.`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in AI feedback response')
  return JSON.parse(jsonMatch[0]) as AIFeedback
}
