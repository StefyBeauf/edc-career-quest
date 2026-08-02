// ── Cours 5 — Pitch professionnel (PGE2 uniquement, S2, détective) ─────────

export interface SceneInterlocuteur {
  id: string
  titre: string
  description: string
  interlocuteur: string
  questions: [string, string, string]
  strategies: { id: string; label: string }[]
  bonneStrategieId: string
  informationsAPrivilegier: string
  erreursAEviter: string
  exemplePhrase: string
}

export const scenesInterlocuteur: SceneInterlocuteur[] = [
  {
    id: 'forum-ecole',
    titre: 'Forum école',
    description: 'Un recruteur s\'arrête devant votre stand lors du forum entreprises de l\'école.',
    interlocuteur: 'Un recruteur pressé, qui voit défiler des dizaines d\'étudiants.',
    questions: [
      'Qui est en face de moi ?',
      'Qu\'attend cette personne ?',
      'Quelle information donner en priorité ?',
    ],
    strategies: [
      { id: 'court-percutant', label: 'Un pitch court et percutant, qui donne envie d\'échanger plus longtemps' },
      { id: 'exhaustif', label: 'Un pitch complet qui couvre tout mon parcours en détail' },
      { id: 'question-ouverte', label: 'Commencer par lui poser une question sur l\'entreprise' },
    ],
    bonneStrategieId: 'court-percutant',
    informationsAPrivilegier: 'Formation, objectif de stage et disponibilité — l\'essentiel, rapidement.',
    erreursAEviter: 'Réciter tout son parcours ou attendre que le recruteur relance la conversation.',
    exemplePhrase: 'Bonjour, je suis en PGE2 à l\'EDC, je recherche un stage marketing à partir de juin — votre stand m\'intéresse particulièrement pour...',
  },
  {
    id: 'rencontre-alumni',
    titre: 'Rencontre alumni',
    description: 'Lors d\'un événement école, vous êtes présenté à un ancien élève qui travaille dans un secteur qui vous intéresse.',
    interlocuteur: 'Un alumni disponible, curieux d\'échanger, pas en posture de recrutement direct.',
    questions: [
      'Qui est en face de moi ?',
      'Qu\'attend cette personne ?',
      'Quelle information donner en priorité ?',
    ],
    strategies: [
      { id: 'authentique-curieux', label: 'Un pitch authentique, qui montre un vrai intérêt pour son parcours et son secteur' },
      { id: 'demande-directe', label: 'Demander directement s\'il connaît des offres de stage' },
      { id: 'court-percutant', label: 'Le même pitch court que pour un recruteur au forum' },
    ],
    bonneStrategieId: 'authentique-curieux',
    informationsAPrivilegier: 'Votre motivation pour le secteur et une question précise sur son expérience.',
    erreursAEviter: 'Transformer l\'échange en demande d\'emploi frontale dès les premières secondes.',
    exemplePhrase: 'Je suis en PGE2 et votre parcours dans ce secteur m\'intéresse beaucoup — comment avez-vous démarré ?',
  },
  {
    id: 'message-linkedin',
    titre: 'Message vocal LinkedIn',
    description: 'Un professionnel vous répond par message vocal sur LinkedIn suite à votre prise de contact.',
    interlocuteur: 'Une personne qui a pris le temps de répondre, mais que vous ne rencontrez pas en face à face.',
    questions: [
      'Qui est en face de moi ?',
      'Qu\'attend cette personne ?',
      'Quelle information donner en priorité ?',
    ],
    strategies: [
      { id: 'structure-clair', label: 'Un message vocal bref, structuré, qui va à l\'essentiel car il n\'y a pas de relance possible' },
      { id: 'long-detaille', label: 'Un message vocal long qui explique tout en détail pour ne rien oublier' },
      { id: 'ecrit-uniquement', label: 'Répondre uniquement par écrit pour éviter l\'oral' },
    ],
    bonneStrategieId: 'structure-clair',
    informationsAPrivilegier: 'Qui vous êtes, ce que vous recherchez, et une question claire pour relancer l\'échange.',
    erreursAEviter: 'Un message trop long sans structure, difficile à écouter jusqu\'au bout.',
    exemplePhrase: 'Bonjour, merci pour votre retour. Je suis en PGE2, je recherche un stage en communication à partir de juin. Auriez-vous quelques minutes pour...',
  },
  {
    id: 'debut-entretien',
    titre: 'Début d\'entretien',
    description: 'Le recruteur vous dit : « Présentez-vous en quelques mots. »',
    interlocuteur: 'Un recruteur qui évalue votre clarté et votre capacité à vous synthétiser.',
    questions: [
      'Qui est en face de moi ?',
      'Qu\'attend cette personne ?',
      'Quelle information donner en priorité ?',
    ],
    strategies: [
      { id: 'structure-lien-poste', label: 'Un pitch structuré qui relie votre parcours au poste visé' },
      { id: 'chronologique-complet', label: 'Un résumé chronologique complet depuis le lycée' },
      { id: 'court-percutant', label: 'Une phrase très courte, sans plus de détails' },
    ],
    bonneStrategieId: 'structure-lien-poste',
    informationsAPrivilegier: 'Ce qui, dans votre parcours, fait écho au poste et à l\'entreprise visés.',
    erreursAEviter: 'Un récit trop long ou déconnecté du poste pour lequel vous êtes reçu.',
    exemplePhrase: 'Je suis en PGE2 à l\'EDC, avec une appétence pour le marketing digital confirmée par un premier stage — c\'est ce qui m\'amène à candidater sur ce poste.',
  },
]

export type CategoriePitch = 'indispensable' | 'utile' | 'a-eviter'

export interface ElementPitch {
  id: string
  label: string
  categorie: CategoriePitch
}

export const elementsPitch: ElementPitch[] = [
  { id: 'identite', label: 'Prénom / formation', categorie: 'indispensable' },
  { id: 'objectif', label: 'Objectif professionnel', categorie: 'indispensable' },
  { id: 'competences', label: 'Compétences clés', categorie: 'indispensable' },
  { id: 'disponibilite', label: 'Disponibilité', categorie: 'indispensable' },
  { id: 'motivation', label: 'Phrase de motivation', categorie: 'indispensable' },
  { id: 'type-stage', label: 'Type de stage recherché', categorie: 'utile' },
  { id: 'secteur', label: 'Secteur visé', categorie: 'utile' },
  { id: 'experience', label: 'Expérience ou projet pertinent', categorie: 'utile' },
  { id: 'salaire', label: 'Salaire souhaité', categorie: 'a-eviter' },
  { id: 'details-perso', label: 'Détails personnels inutiles', categorie: 'a-eviter' },
  { id: 'discours-long', label: 'Un discours trop long', categorie: 'a-eviter' },
  { id: 'anecdote', label: 'Une anecdote trop personnelle', categorie: 'a-eviter' },
]

export const STRUCTURE_RECOMMANDEE = [
  'Qui je suis',
  'Ce que je recherche',
  'Ce que je peux apporter',
  'Pourquoi j\'échange avec vous',
  'Ouverture vers la suite',
]

export interface ContextePitch {
  id: string
  label: string
  description: string
}

export const contextesPitchOral: ContextePitch[] = [
  { id: 'forum-ecole', label: 'Forum école', description: 'Un recruteur s\'arrête devant votre stand.' },
  { id: 'message-vocal', label: 'Message vocal LinkedIn', description: 'Vous répondez par message vocal à un professionnel.' },
  { id: 'appel-tel', label: 'Appel téléphonique', description: 'Un recruteur vous appelle sans prévenir.' },
  { id: 'debut-entretien', label: 'Début d\'entretien', description: 'On vous demande de vous présenter en quelques mots.' },
  { id: 'rencontre-alumni', label: 'Rencontre alumni', description: 'Vous échangez avec un ancien élève lors d\'un événement.' },
  { id: 'post-conference', label: 'Échange informel post-conférence', description: 'Vous abordez un intervenant à la fin de sa conférence.' },
]

export const PITCH_CHAMPS = [
  { cle: 'quiJeSuis', label: 'Qui je suis', placeholder: 'Ex. PGE2 à l\'EDC, spécialisation marketing digital' },
  { cle: 'ceQueJeRecherche', label: 'Ce que je recherche', placeholder: 'Ex. un stage de 6 mois à partir de juin' },
  { cle: 'ceQueJePeuxApporter', label: 'Ce que je peux apporter', placeholder: 'Ex. une première expérience en gestion de réseaux sociaux' },
  { cle: 'pourquoiCetEchange', label: 'Pourquoi j\'échange avec vous', placeholder: 'Ex. votre entreprise correspond à mon projet' },
  { cle: 'ouvertureSuite', label: 'Ouverture vers la suite', placeholder: 'Ex. je serais ravi d\'échanger plus longuement' },
] as const
