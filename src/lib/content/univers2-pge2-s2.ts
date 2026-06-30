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

// ═══ DOSSIER 5 — LES CONTACTS ════════════════════════════════════════════
export const personnesRencontre = ['Responsable RH', 'Directeur marketing', 'Alumni de l\'école', 'Manager opérationnel', 'Recruteur indépendant']
export const lieuxRencontre = ['Forum entreprise', 'Salon professionnel', 'LinkedIn', 'Ascenseur', 'Événement networking']
export const tempsRencontre = [30, 60, 90]

export const profilsMystere: string[] = [
  'les présentations trop longues',
  'les CV récités mot pour mot',
  'les réponses vagues sans exemple concret',
  'le manque de questions de la part du candidat',
  'les candidats qui ne connaissent pas l\'entreprise',
  'les formules toutes faites comme « je suis motivé et dynamique »',
  'le jargon scolaire déconnecté du monde professionnel',
]

// ═══ DOSSIER 6 — L'OPPORTUNITÉ ═══════════════════════════════════════════
export const situationsImprevus: string[] = [
  'Vous recevez un refus après un entretien que vous pensiez avoir réussi.',
  'Une entreprise ne répond plus depuis 3 semaines après un entretien positif.',
  'Vous obtenez un entretien pour le poste de vos rêves dans 48h.',
  'Une opportunité inattendue apparaît dans un secteur que vous n\'aviez pas envisagé.',
  'Deux entretiens importants tombent le même jour, à la même heure.',
  'Votre alternance idéale est à 1h30 de transport de chez vous.',
  'On vous propose un poste, mais avec un salaire inférieur à ce que vous espériez.',
  'Un recruteur vous recontacte 2 mois après votre candidature, pour un autre poste.',
  'Vous devez choisir entre deux propositions reçues le même jour.',
  'L\'entreprise qui vous a recruté annule finalement le poste avant votre arrivée.',
]

export interface DossierConfidentiel {
  contexte: string
  question: string
}

export const dossiersConfidentiels: DossierConfidentiel[] = [
  {
    contexte: 'Vous avez envoyé 25 candidatures. Vous avez obtenu 3 entretiens. Une entreprise vous intéresse particulièrement mais ne répond plus depuis 10 jours.',
    question: 'Quelle stratégie mettez-vous en place pour relancer sans paraître insistant(e) ?',
  },
  {
    contexte: 'Vous avez un entretien dans 3 jours pour un poste qui vous passionne, mais vous venez de recevoir une offre ferme d\'une autre entreprise, moins enthousiasmante, avec une réponse attendue sous 48h.',
    question: 'Comment gérez-vous ce dilemme sans brûler aucune des deux pistes ?',
  },
  {
    contexte: 'Lors d\'un entretien, le recruteur vous annonce que le poste a en réalité changé de périmètre depuis la publication de l\'offre : moins de responsabilités que prévu.',
    question: 'Quelles questions posez-vous pour décider si vous maintenez votre candidature ?',
  },
  {
    contexte: 'Vous avez signé une promesse d\'embauche, mais une opportunité bien plus intéressante se présente une semaine après, dans une entreprise que vous admirez depuis longtemps.',
    question: 'Quelle décision prenez-vous, et comment gérez-vous l\'aspect éthique vis-à-vis du premier engagement ?',
  },
  {
    contexte: 'Après plusieurs refus, vous commencez à douter de votre projet professionnel initial.',
    question: 'Quelles questions vous posez-vous pour faire la part entre un ajustement de stratégie et une vraie remise en cause de votre projet ?',
  },
]
