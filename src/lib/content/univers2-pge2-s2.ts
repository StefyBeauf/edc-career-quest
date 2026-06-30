// ═══ DOSSIER 4 — LES PISTES ══════════════════════════════════════════════
export const entreprisesPistes = ['Startup', 'PME', 'Groupe international', 'Cabinet de conseil', 'Association']
export const postesPistes = ['RH', 'Marketing', 'Finance', 'Commerce']
export const contraintesPistes = ['Télétravail souhaité', '45 min de trajet maximum', 'Anglais obligatoire', 'PME uniquement', 'Secteur impact / RSE', 'Démarrage sous 1 mois']

export const indicesDuJour: string[] = [
  'Les sites carrière des entreprises sont souvent moins concurrencés que les jobboards.',
  'Une candidature envoyée le mardi matin a statistiquement plus de chances d\'être lue.',
  'Contacter un alumni de son école multiplie les chances de réponse.',
  'Les cabinets de recrutement spécialisés connaissent des offres jamais publiées.',
  'Un message personnalisé sur LinkedIn obtient 3 fois plus de réponses qu\'une candidature anonyme.',
  'Les salons étudiants permettent souvent de court-circuiter le tri des CV en ligne.',
  'Suivre une entreprise sur LinkedIn avant de postuler peut être mentionné en entretien — cela montre l\'intérêt réel.',
]

// ═══ DOSSIER 5 — LES CONTACTS — Laboratoire de Pitch ═════════════════════
export const interlocuteursPitch = ['Responsable RH', 'Manager opérationnel', 'Directeur général', 'Alumni de l\'école', 'Recruteur cabinet', 'Responsable opérationnel']
export const contextesPitch = ['Forum entreprise', 'LinkedIn', 'Salon professionnel', 'Visioconférence', 'Appel téléphonique', 'Rencontre informelle']
export const dureesPitch = [30, 60, 120]

export const dossiersConfidentielsPitch: string[] = [
  'Votre interlocuteur est pressé et ne dispose que de 30 secondes. Comment adaptez-vous votre pitch ?',
  'Votre interlocuteur vous coupe la parole après 10 secondes pour poser une question technique. Comment rebondissez-vous ?',
  'Vous apprenez juste avant de parler que votre interlocuteur déteste les formules toutes faites comme « motivé et dynamique ». Réajustez votre pitch.',
  'Votre interlocuteur ne connaît pas du tout votre école. Que devez-vous expliquer en plus ?',
  'Votre interlocuteur est en réalité décisionnaire pour un poste différent de celui que vous visiez. Comment réorientez-vous votre discours ?',
]

// ═══ DOSSIER 6 — L'OPPORTUNITÉ — Simulateur de Stratégie ═════════════════
export interface DossierStrategie {
  titre: string
  situation: string
  contraintes: string[]
  ressources: string[]
}

export const dossiersStrategie: DossierStrategie[] = [
  {
    titre: 'Alternance RH',
    situation: 'Début de recherche',
    contraintes: ['Mobilité limitée à l\'Île-de-France', 'Peu de réseau professionnel', '2 mois restants avant la rentrée'],
    ressources: ['Profil LinkedIn à jour', 'Une expérience de stage RH de 2 mois'],
  },
  {
    titre: 'Stage Marketing Digital',
    situation: 'Recherche déjà entamée depuis 1 mois, sans retour positif',
    contraintes: ['20 candidatures déjà envoyées sans réponse', 'Doit démarrer dans 6 semaines', 'Cible uniquement les grandes entreprises'],
    ressources: ['Un projet personnel de création de contenu', 'Maîtrise de Canva et Meta Ads'],
  },
  {
    titre: 'Premier emploi Finance',
    situation: 'Sortie d\'école dans 3 mois, recherche à anticiper',
    contraintes: ['Aucune expérience en entreprise hors stages courts', 'Marché très concurrentiel sur ce secteur', 'Salaire minimum requis pour des raisons personnelles'],
    ressources: ['Certification Excel avancé', 'Un alumni travaillant dans un cabinet d\'audit'],
  },
  {
    titre: 'Alternance Commerce / Vente',
    situation: 'Recherche en parallèle des cours, peu de temps disponible',
    contraintes: ['Seulement 5h par semaine à consacrer à la recherche', 'Permis B non obtenu', 'Doit rester dans sa ville actuelle'],
    ressources: ['Bon relationnel et expérience de vente en job étudiant', 'Réseau familial dans le commerce local'],
  },
]

export interface Rebondissement {
  evenement: string
}

export const rebondissementsStrategie: string[] = [
  'Vous recevez un refus de l\'entreprise sur laquelle reposait une grande partie de votre plan.',
  'Une entreprise que vous n\'aviez pas ciblée vous contacte spontanément après avoir vu votre profil LinkedIn.',
  'L\'alternance ou le poste que vous visiez en priorité vient d\'être pourvu par un autre candidat.',
  'Un alumni de votre école accepte de vous mettre en relation avec un recruteur dans le secteur visé.',
  'Le délai dont vous disposiez est soudainement réduit de moitié.',
  'Une des entreprises ciblées annonce un gel des recrutements pour le trimestre.',
  'Vous obtenez un entretien, mais à une date qui entre en conflit avec vos examens.',
]
