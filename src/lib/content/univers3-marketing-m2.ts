// ═══════════════════════════════════════════════════════════════════════════
// B3 Marketing Digital — Mission 2 « MARKETING UNDER PRESSURE » (v3)
// Contenus de la mission (fiche `fiche-mission-horizon-stryde-m2.docx`, v3).
// Les textes marqués « mot pour mot » viennent de la fiche et ne doivent pas être reformulés.
// Les compléments rédigés par Claude Code sont marqués « à valider par Stéphanie ».
// ═══════════════════════════════════════════════════════════════════════════

// Visuels STRYDE fournis par Stéphanie (/public/univers3/stryde/). Packshots des 3 modèles livrés
// le 2026-11-27. Si un fichier manque, l'interface affiche un emplacement graphique de remplacement.
export const VISUELS_STRYDE = {
  collection: '/univers3/stryde/collection.jpg',
  origin: '/univers3/stryde/origin.webp',
  impact: '/univers3/stryde/impact.webp',
  shadow: '/univers3/stryde/shadow.webp',
  portraitCeo: '/univers3/stryde/portrait-ceo.webp',
} as const

// Écran d'activation (centre de contrôle Mission Horizon) : mot pour mot (fiche v3).
export const activationM2 = {
  surtitre: 'MISSION HORIZON — CENTRE DE CONTRÔLE',
  titre: 'Activation du simulateur professionnel',
  paragraphes: [
    'Pour tester votre capacité à garder le contrôle sous pression, le centre de contrôle vous plonge dans une simulation professionnelle immersive.',
    'Votre équipage devient une agence marketing chargée du lancement d’une nouvelle marque de sneakers.',
    'Vos compétences seront mises à l’épreuve. Vos décisions auront des conséquences. Votre capacité d’adaptation fera la différence.',
  ],
  simulation: 'SIMULATION 02 — STRYDE',
  format: '90 minutes • 4 épreuves • 100 points',
  bouton: 'Activer le simulateur',
  // Rédigé par Claude Code — à valider par Stéphanie.
  activation: 'Activation en cours…',
  // Message neutre affiché quand une partie de l'ancienne version (6 épreuves) a été effacée (CLAUDE.md, section 3.2).
  miseAJour: 'Le simulateur a été mis à jour. Merci de relancer votre partie.',
}

// Écran de retour au centre de contrôle : mot pour mot (fiche v3).
export const retourM2 = {
  surtitre: 'MISSION HORIZON — FIN DE SIMULATION',
  titre: 'Retour au centre de contrôle',
  paragraphes: [
    'Vous avez construit une stratégie, défendu vos recommandations et affronté des imprévus.',
    'Votre prochaine mission consiste à analyser votre expérience et à en tirer des enseignements pour votre future vie professionnelle.',
    'Vous ne pourrez pas toujours contrôler les événements. Mais vous pourrez apprendre à contrôler votre manière d’y réagir.',
  ],
  fin: 'Simulation terminée.',
  // Rédigé par Claude Code — à valider par Stéphanie.
  revoirVerdict: '← Revoir le verdict',
}

export const accueilM2 = {
  titre: 'Marketing Under Pressure',
  sousTitre: 'Garder le contrôle sous pression',
  // ⚠️ Passage de 80 à 90 minutes : à valider par Stéphanie (question ouverte 10).
  accroche: 'Un lancement. Des imprévus. 90 minutes pour faire la différence.',
  mentions: ['90 minutes', '4 épreuves', '100 points'],
  // Mot pour mot (fiche v2, conservé).
  introduction:
    "Vous intégrez une agence de marketing et de communication chargée du lancement national d'une nouvelle marque de sneakers. Votre client ambitionne de bousculer les codes du streetwear et de se faire une place sur un marché particulièrement concurrentiel. Vous avez carte blanche pour construire sa stratégie de lancement. Mais entre les exigences du client, les opportunités inattendues et les crises qui se préparent, rien ne va se passer exactement comme prévu. Votre mission : créer le désir, prendre les bonnes décisions et garder le contrôle sous pression.",
  bouton: 'Entrer en mission',
  // Micro-textes rédigés par Claude Code — à valider par Stéphanie.
  champAgence: {
    label: 'Nom de votre agence',
    aide: 'Un nom d’agence inventé par l’équipe. Pas de prénom ni de nom réel.',
    placeholder: 'Ex. : Agence Contre-Courant',
    min: 2,
    max: 40,
  },
  repriseTitre: 'Partie retrouvée',
  repriseTexte: 'Votre agence reprend exactement là où elle s’était arrêtée.',
  codeLabel: 'Code de partie',
  codeAide: 'Il identifie votre équipe à l’écran. La partie se reprend uniquement sur ce navigateur.',
}

// Repères de la partie (fiche v3, « Déroulé ») : 2 phases de 45 minutes, pause hors chronomètre.
export const DUREE_PARTIE_MIN = 90
export const NB_EPREUVES = 4
export const NUMEROS_EPREUVES = [1, 2, 3, 4] as const
// Une partie locale est purgée 24 h après sa création (CLAUDE.md, section 3.2).
export const DUREE_VIE_PARTIE_MS = 24 * 60 * 60 * 1000

// Durée de chaque épreuve en minutes (fiche v3).
export const DUREES_EPREUVES_MIN: Record<number, number> = { 1: 15, 2: 30, 3: 25, 4: 20 }
export const PHASE_EPREUVE: Record<number, 1 | 2> = { 1: 1, 2: 1, 3: 2, 4: 2 }
// Dernière épreuve de la phase 1 : la pause verrouillée suit.
export const DERNIERE_EPREUVE_PHASE_1 = 2
// Alertes du chronomètre, en minutes restantes.
export const ALERTES_CHRONO_MIN = [5, 1] as const

// Micro-textes du chronomètre et de la validation — à valider par Stéphanie.
export const textesChrono = {
  alerte5: 'Plus que 5 minutes. Finalisez vos choix.',
  alerte1: 'Dernière minute. Vos réponses seront envoyées automatiquement à la fin du temps.',
  tempsAjoute: (min: number) => `L’intervenante vous accorde ${min} minute${min > 1 ? 's' : ''} de plus.`,
  boutonValider: 'Valider la décision',
  // Bouton bloqué tant qu'un rebondissement peut encore arriver : message neutre (n'annonce pas l'heure).
  attenteRebondissements: 'D’autres informations client peuvent encore arriver.',
  confirmerValider: 'Valider maintenant ? La décision sera définitive et le temps restant ne sera pas reporté.',
  confirmerOui: 'Oui, valider',
  confirmerNon: 'Continuer à travailler',
  soumisAuto: 'Temps écoulé : vos réponses ont été envoyées telles quelles, rien n’a été supprimé.',
  soumisManuel: 'Décision validée.',
  epreuveSuivante: 'Passer à l’épreuve suivante',
  versPause: 'Terminer la phase 1',
  versVerdict: 'Découvrir le verdict',
}

// Écran de fin de phase 1 (fiche v3) : texte de transition mot pour mot ; micro-textes — à valider par Stéphanie.
export const textesPause = {
  surtitre: 'Phase 1 terminée',
  // Mot pour mot (fiche v3).
  titre: 'Votre stratégie prend forme. Mais le marché n’a pas dit son dernier mot.',
  attente: 'La phase 2 s’ouvrira quand l’intervenante le décidera. Votre partie est sauvegardée.',
  ouverte: 'La phase 2 est ouverte. Le marché vous attend.',
  bouton: 'Commencer la phase 2',
  bilanTitre: 'Votre agence après la phase 1',
  messageCeo: 'Le message de votre client',
  sauvegarde: 'Toutes vos réponses de la phase 1 sont sauvegardées sur ce navigateur.',
  horsLigne: 'Connexion momentanément indisponible : nouvel essai automatique toutes les 10 secondes.',
  rappelSimulation: 'Ces indicateurs simulent les conséquences de vos décisions. Ce n’est pas une note.',
}

// Les 4 indicateurs du tableau de bord (fiche) : 25 points chacun, total sur 100.
export const INDICATEURS = [
  { id: 'pertinence', label: 'Pertinence marketing' },
  { id: 'confiance', label: 'Confiance du client' },
  { id: 'adaptation', label: 'Capacité d’adaptation' },
  { id: 'credibilite', label: 'Crédibilité professionnelle' },
] as const
export const MAX_INDICATEUR = 25
export const texteAnalyseEnAttente = (epreuvesEnAttente: number[]) =>
  `Analyse en attente : épreuve${epreuvesEnAttente.length > 1 ? 's' : ''} ${epreuvesEnAttente.join(', ')}. Les indicateurs seront mis à jour dès qu’elle sera disponible.`

// ═══ Stéphanie Vador, fondatrice et CEO de STRYDE ═══════════════════════════
// Personnage et portrait choisis par Stéphanie le 2026-11-27 (remplacent Stéphanie Vador).
export const CEO = {
  nom: 'Stéphanie Vador',
  fonction: 'Fondatrice et CEO de STRYDE',
}

/** Palier de ton de Stéphanie Vador selon la Confiance du client (fiche v3, « comportement CEO »). */
export const PALIERS_CONFIANCE = [
  { min: 21, ton: 'Enthousiaste et confiant' },
  { min: 16, ton: 'Constructif et vigilant' },
  { min: 11, ton: 'Exigeant' },
  { min: 6, ton: 'Impatient et sceptique' },
  { min: 0, ton: 'Envisage de rompre le contrat' },
] as const
export const tonCeo = (confiance: number) => PALIERS_CONFIANCE.find(p => confiance >= p.min)!.ton

// Micro-textes du retour de Stéphanie Vador après chaque épreuve — à valider par Stéphanie.
export const textesAnalyse = {
  chargement: 'Stéphanie Vador lit votre proposition…',
  titre: 'Le retour de votre client',
  variations: 'Effets sur votre agence',
  consequence: 'Conséquence',
  // Message neutre du mode dégradé (fiche v3, exemple repris tel quel).
  enAttente: 'Stéphanie Vador étudie votre proposition. Son retour arrivera sous peu.',
  enAttenteDetail: 'Vos réponses sont conservées et la partie continue. L’analyse sera relancée automatiquement, ou depuis ce bouton.',
  relancer: 'Relancer l’analyse',
  relancesEpuisees: 'Nombre de relances atteint. Prévenez l’intervenante : vos réponses restent conservées.',
  bandeauAttente: (n: number) => `Analyse en attente pour l’épreuve ${n}.`,
}

// ═══ Verdict final ══════════════════════════════════════════════════════════
// Statut du contrat CALCULÉ PAR LE CODE à partir du score total (fiche v3), jamais par l'IA.
export const BAREME_VERDICT = [
  { min: 90, statut: 'Agence d’excellence' },
  { min: 75, statut: 'Agence de confiance' },
  { min: 60, statut: 'Agence sous surveillance' },
  { min: 40, statut: 'Contrat menacé' },
  { min: 0, statut: 'Contrat perdu' },
] as const
export const statutContrat = (total: number) => BAREME_VERDICT.find(b => total >= b.min)!.statut

// Micro-textes de l'écran de verdict — à valider par Stéphanie.
export const textesVerdict = {
  surtitre: 'Fin de simulation · Verdict du client',
  scoreFinal: 'Score de l’agence',
  provisoire: 'provisoire',
  statut: 'Statut du contrat',
  evolution: 'Évolution épreuve par épreuve',
  decisions: 'Historique de vos décisions',
  messageCeo: 'Le dernier mot de Stéphanie Vador',
  chargement: 'Stéphanie Vador prépare son verdict…',
  enAttente: 'Stéphanie Vador étudie votre parcours. Son dernier message arrivera sous peu. Vos résultats sont conservés.',
  relancer: 'Relancer le message',
  mettreAJour: 'De nouvelles analyses sont arrivées : mettre à jour le message',
  relancesEpuisees: 'Nombre de relances atteint. Prévenez l’intervenante : vos résultats restent conservés.',
  resumeIndisponible: 'Décision non résumée : analyse en attente.',
  analyseAttente: 'Analyse en attente',
  depart: 'Départ',
  historique: 'Vos réponses complètes',
  rappelSimulation: 'Ces indicateurs simulent les conséquences de vos décisions dans le jeu. Ce n’est pas une note.',
  versRetour: 'Revenir au centre de contrôle',
}

// ═══ Dossier client STRYDE ══════════════════════════════════════════════════
// Brief et collection : fiche mission. Histoire et équipe dirigeante : Stéphanie (2026-11-27).
// Tout le reste : rédigé par Claude Code — À VALIDER PAR STÉPHANIE.
// Règles respectées : marque et personnes fictives ; ni concurrents, ni benchmark, ni slogan,
// ni campagne, ni stratégie fournis ; engagements environnementaux vérifiables et réalistes à 89 €.
// La section « conception » contient les indices utiles à l'épreuve 3 (origine du design).

export interface ModeleStryde {
  id: 'origin' | 'impact' | 'shadow'
  nom: string
  description: string[]
  visuel: string
}

export interface DossierClient {
  brief: Record<string, string>
  collection: ModeleStryde[]
  histoire: string[]
  equipeDirigeante: { nom: string; role: string; parcours: string; portrait?: string }[]
  valeurs: { nom: string; description: string }[]
  materiaux: string[]
  fabrication: string[]
  packaging: string[]
  ressources: string[]
  distribution: string[]
  attentesClient: string[]
  conception: string[]
  engagementsEnvironnementaux: string[]
}

export const dossierClient: DossierClient = {
  // Fiche mission (brief).
  brief: {
    'Marque': 'STRYDE, jeune marque française de sneakers lifestyle et streetwear',
    'Collection': '3 modèles : STRYDE 01 ORIGIN, STRYDE 02 IMPACT, STRYDE 03 SHADOW',
    'Cible': '18-30 ans',
    'Positionnement souhaité': 'Urbain, créatif et accessible',
    'Prix de vente': '89 € la paire',
    'Budget marketing': '100 000 €',
    'Distribution': 'E-commerce et pop-up stores',
    'Zone': 'France',
    'Lancement': 'Dans 30 jours',
    'Objectifs': 'Notoriété, acquisition, désirabilité, fidélisation',
    'Ambition': 'Construire une communauté autour de la marque',
    'Contrainte': 'Des moyens limités : chaque euro doit être justifié',
  },
  // Fiche mission (collection). Descriptions développées par Claude Code — à valider.
  collection: [
    {
      id: 'origin',
      nom: 'STRYDE 01 ORIGIN',
      description: [
        'Silhouette épurée et minimaliste, pensée pour le quotidien.',
        'Coloris blanc cassé et beige, surpiqûres ton sur ton.',
        'Le modèle « de base » de la marque, celui qui se porte avec tout.',
      ],
      visuel: VISUELS_STRYDE.origin,
    },
    {
      id: 'impact',
      nom: 'STRYDE 02 IMPACT',
      description: [
        'Modèle audacieux au style streetwear affirmé.',
        'Coloris blanc et orange électrique, bande latérale contrastée.',
        'Le modèle qui fait parler : le plus visible de la collection.',
      ],
      visuel: VISUELS_STRYDE.impact,
    },
    {
      id: 'shadow',
      nom: 'STRYDE 03 SHADOW',
      description: [
        'Lignes contemporaines, monochrome, légèrement futuriste.',
        'Coloris noir et anthracite, semelle sculptée.',
        'Le modèle le plus graphique, pensé pour les soirs et la ville.',
      ],
      visuel: VISUELS_STRYDE.shadow,
    },
  ],
  histoire: [
    'STRYDE a été fondée en 2024 à Montreuil par Stéphanie Vador, une entrepreneuse ambitieuse qui souhaite bousculer les codes du marché de la sneaker.',
    'Pour accompagner le développement de sa marque, elle s’est entourée de trois experts aux compétences complémentaires (voir « Équipe dirigeante »).',
    'Point de départ : ne plus avoir à choisir entre une paire bon marché qui ne dure pas et une paire désirable hors de prix.',
    'Deux ans de prototypes, 14 versions de semelle testées par un panel de 40 personnes de 18 à 30 ans, avant d’arrêter les 3 modèles de la collection.',
    'Le lancement national est la première vraie prise de parole de la marque : jusqu’ici, STRYDE n’a été visible que par le bouche-à-oreille de son entourage.',
  ],
  // Équipe dirigeante : rôles fournis par Stéphanie (2026-11-27). Stéphanie Vador est l'unique
  // interlocutrice des agences pendant le business game.
  equipeDirigeante: [
    {
      nom: 'Stéphanie Vador',
      role: 'Fondatrice & CEO',
      parcours: 'Vision stratégique, développement de la marque et décisions finales. Exigeante, audacieuse et orientée résultats. Seule interlocutrice de votre agence.',
      portrait: VISUELS_STRYDE.portraitCeo,
    },
    {
      nom: 'Inès Ferrand',
      role: 'Directrice marketing & communication',
      parcours: 'Stratégie marketing, notoriété, acquisition, influence et image de marque.',
    },
    {
      nom: 'Malik Benhamou',
      role: 'Directeur artistique & innovation produit',
      parcours: 'Design des sneakers, créativité, identité visuelle et développement des collections. Il dessine tous les modèles STRYDE.',
    },
    {
      nom: 'Clara Nguyen',
      role: 'Directrice financière & opérations',
      parcours: 'Gestion budgétaire, rentabilité, production, logistique et distribution.',
    },
  ],
  valeurs: [
    { nom: 'Créativité', description: 'Des modèles dessinés en interne, sans copier les tendances du moment.' },
    { nom: 'Accessibilité', description: 'Un prix juste, expliqué, sans discours de luxe.' },
    { nom: 'Transparence', description: 'Dire ce que l’on fait vraiment, y compris ce que l’on ne fait pas encore.' },
    { nom: 'Collectif', description: 'Une marque construite avec sa communauté, pas seulement pour elle.' },
  ],
  materiaux: [
    'Tige : textile tissé composé à 50 % de polyester recyclé (certifié GRS) et empiècements en microfibre synthétique sans PVC.',
    'Doublure : coton biologique (certifié GOTS).',
    'Semelle : caoutchouc naturel avec 20 % de caoutchouc recyclé issu de chutes de production.',
    'Lacets : polyester recyclé. Œillets métalliques classiques.',
  ],
  fabrication: [
    'Assemblage dans un atelier familial au Portugal (région de Porto), partenaire depuis les premiers prototypes.',
    'Premier lot : 4 500 paires au total (1 800 ORIGIN, 1 500 IMPACT, 1 200 SHADOW).',
    'Délai de réassort : 10 semaines minimum. Aucune paire supplémentaire ne peut être livrée avant la fin du premier trimestre de vente.',
    'Coût de revient moyen : 31 € par paire, transport compris.',
  ],
  packaging: [
    'Boîte en carton recyclé non blanchi, imprimée en une seule couleur.',
    'Pas de papier de soie ni de plastique : la paire est protégée par un sac en coton réutilisable.',
    'Un code imprimé à l’intérieur de la boîte renvoie vers une page expliquant l’origine des matériaux.',
  ],
  ressources: [
    'Équipe de 7 personnes : Stéphanie Vador, ses 3 directeurs et directrices (marketing, artistique, finances et opérations), 1 développeuse web, 1 logisticien, 1 alternante en marketing.',
    'Inès Ferrand définit les grandes orientations marketing, mais n’a pas d’équipe pour concevoir et déployer le lancement : c’est la raison pour laquelle STRYDE fait appel à votre agence.',
    'Votre unique interlocutrice est Stéphanie Vador : c’est elle qui valide ou refuse vos recommandations.',
    'Un compte Instagram de 2 300 abonnés, essentiellement l’entourage de l’équipe et le panel de testeurs.',
    'Une séance photo produit réalisée (packshots des 3 modèles sur fond neutre). Aucune photo portée, aucune vidéo.',
    'Un site e-commerce prêt, avec une capacité de livraison de 300 commandes par jour.',
  ],
  distribution: [
    'Vente en ligne sur le site STRYDE uniquement : pas de place de marché ni de revendeur la première année.',
    'Deux pop-up stores possibles pendant le premier trimestre : chacun coûte environ 18 000 € pour 3 semaines (local, aménagement, personnel).',
    'Livraison en France métropolitaine uniquement, retours gratuits sous 30 jours.',
    'Stock limité : en cas de rupture, le client préfère une liste d’attente à une promesse de livraison intenable.',
  ],
  attentesClient: [
    'Être reconnu comme une marque créative, pas comme « une marque de plus ».',
    'Des recommandations argumentées : le client veut comprendre pourquoi chaque euro est dépensé.',
    'Aucune promesse que la marque ne pourrait pas tenir (prix, délais, engagements environnementaux).',
    'Être tenu informé rapidement en cas de problème : elle préfère une mauvaise nouvelle tôt qu’une surprise tard.',
    'Garder la main sur l’image de la marque : toute prise de parole publique importante doit être soumise à Stéphanie Vador.',
  ],
  conception: [
    'Les 3 modèles ont été dessinés par Malik Benhamou entre octobre 2024 et mars 2025.',
    'Les croquis, fichiers de conception et échanges avec l’atelier sont datés et archivés.',
    'Les dessins des 3 modèles ont été déposés à l’INPI (dessins et modèles) en avril 2025.',
    'Les prototypes ont été fabriqués par l’atelier portugais à partir de juin 2025 ; la semelle utilise un moule exclusif à STRYDE.',
    'Comme beaucoup de sneakers, les modèles reprennent des codes courants du secteur (semelle épaisse, bande latérale, tige basse).',
  ],
  engagementsEnvironnementaux: [
    'Ce que STRYDE fait : matériaux recyclés ou biologiques certifiés (voir « Matériaux »), fabrication en Europe, packaging sans plastique.',
    'Ce que STRYDE ne fait pas encore : la paire n’est ni « neutre en carbone », ni « 100 % recyclée », ni recyclable en fin de vie.',
    'Le client refuse toute formule floue du type « éco-responsable » ou « respectueuse de la planète » sans preuve associée.',
    'Les certificats des fournisseurs (GRS, GOTS) peuvent être fournis sur demande.',
  ],
}

// ═══ Épreuves (v3) ══════════════════════════════════════════════════════════
// Titres, durées, travail demandé et champs : fiche v3. Situations et aides : rédigées par
// Claude Code — À VALIDER PAR STÉPHANIE.
// Saisie réduite (fiche v3) : deux champs principaux par épreuve (« Quelle est votre décision ? »,
// « Pourquoi avez-vous fait ce choix ? ») + uniquement les champs spécifiques prévus.
// Aucune longueur minimale ; la longueur maximale est conservée (maîtrise des coûts IA).

export type TypeChamp = 'texte' | 'canaux' | 'decision'
export type RebondissementId = 'R1' | 'R2' | 'R3' | 'R4'

export interface ChampEpreuve {
  id: string
  label: string
  aide: string
  maxCaracteres: number
  type?: TypeChamp
  /** Champ affiché seulement après ce rebondissement (il le révèle : ce n'est pas un nouveau formulaire). */
  visibleApres?: RebondissementId
}

export interface Epreuve {
  numero: number
  titre: string
  dureeMin: number
  phase: 1 | 2
  situation: string
  travailDemande: string[]
  champs: ChampEpreuve[]
  competences: string[]
}

export const MAX_CANAUX = 3
export const DECISIONS_PARTENARIAT = [
  { id: 'accepter', label: 'Accepter' },
  { id: 'refuser', label: 'Refuser' },
  { id: 'negocier', label: 'Négocier' },
] as const

const LABEL_DECISION = 'Quelle est votre décision ?'
const LABEL_POURQUOI = 'Pourquoi avez-vous fait ce choix ?'
const AIDE_POURQUOI = 'Vos arguments, appuyés sur le dossier client, vos recherches et les informations reçues. Les risques que vous acceptez.'

export const epreuves: Epreuve[] = [
  {
    numero: 1,
    titre: 'Trouver sa place',
    dureeMin: DUREES_EPREUVES_MIN[1],
    phase: PHASE_EPREUVE[1],
    situation: 'Premier rendez-vous avec STRYDE. Avant de parler lancement, le client veut savoir où sa marque peut exister sur un marché où tout le monde vend des sneakers.',
    travailDemande: [
      'Identifiez 2 concurrents réels de STRYDE (recherche Internet, aucune liste n’est fournie).',
      'Repérez une opportunité de différenciation.',
      'Recommandez un positionnement justifié par vos recherches. Pas d’étude de marché exhaustive.',
    ],
    champs: [
      { id: 'decision', label: LABEL_DECISION, aide: 'Vos 2 concurrents, l’opportunité repérée et le positionnement que vous recommandez.', maxCaracteres: 900 },
      { id: 'pourquoi', label: LABEL_POURQUOI, aide: AIDE_POURQUOI, maxCaracteres: 700 },
      { id: 'sources', label: 'Sources', aide: 'Liens ou références consultés, et ce que vous en avez retenu. Une URL seule ne prouve rien.', maxCaracteres: 400 },
    ],
    competences: ['Analyse de marché', 'Exploitation d’informations', 'Argumentation'],
  },
  {
    numero: 2,
    titre: 'Réussir son lancement',
    dureeMin: DUREES_EPREUVES_MIN[2],
    phase: PHASE_EPREUVE[2],
    situation: 'Le client valide l’idée d’un lancement national dans 30 jours. Il attend un concept qui donne envie et des actions concrètes, cohérentes avec le positionnement que vous avez défendu.',
    travailDemande: [
      'Imaginez un concept de lancement.',
      'Choisissez librement 3 actions marketing (digital, communication, événementiel, influence, acquisition, expérience client, communauté).',
      'Pas de slogan imposé, pas de plan média détaillé, pas de répartition budgétaire complexe.',
      'Restez attentifs : le client peut revenir vers vous pendant l’épreuve.',
    ],
    champs: [
      { id: 'decision', label: LABEL_DECISION, aide: 'Votre concept, vos 3 actions et, si la situation change, vos arbitrages.', maxCaracteres: 1200 },
      { id: 'createur', label: 'Partenariat proposé : votre choix', aide: 'Accepter, refuser ou négocier. Justifiez ce choix dans le champ « Pourquoi ».', maxCaracteres: 20, type: 'decision', visibleApres: 'R2' },
      { id: 'pourquoi', label: LABEL_POURQUOI, aide: AIDE_POURQUOI, maxCaracteres: 900 },
    ],
    competences: ['Créativité', 'Arbitrage sous contrainte', 'Évaluation des risques'],
  },
  {
    numero: 3,
    titre: 'Sauver la réputation de STRYDE',
    dureeMin: DUREES_EPREUVES_MIN[3],
    phase: PHASE_EPREUVE[3],
    situation: 'Une publication devient virale : STRYDE est accusée d’avoir copié le design d’une sneaker concurrente. Les commentaires s’enchaînent et le client vous appelle.',
    travailDemande: [
      'Séparez les faits des accusations.',
      'Identifiez les risques pour la marque.',
      'Construisez un plan de réaction argumenté et rédigez le message officiel de STRYDE.',
      'Aucune recherche de cas réel n’est demandée. Aucune expertise juridique n’est attendue.',
    ],
    champs: [
      { id: 'decision', label: LABEL_DECISION, aide: 'Votre plan de réaction : quoi, qui, quand.', maxCaracteres: 1000 },
      { id: 'pourquoi', label: LABEL_POURQUOI, aide: AIDE_POURQUOI, maxCaracteres: 700 },
      { id: 'message', label: 'Message officiel au public', aide: 'Le texte que STRYDE publierait.', maxCaracteres: 600 },
    ],
    competences: ['Gestion de crise', 'Communication responsable', 'Esprit critique'],
  },
  {
    numero: 4,
    titre: 'L’ultimatum',
    dureeMin: DUREES_EPREUVES_MIN[4],
    phase: PHASE_EPREUVE[4],
    situation: 'Trois alertes arrivent en même temps. Tout ne peut pas être traité à la fois, mais tout doit être décidé.',
    travailDemande: [
      'Construisez un plan d’urgence priorisé.',
      'Répartissez les responsabilités dans l’agence.',
      'Rédigez un message professionnel au client.',
    ],
    champs: [
      { id: 'decision', label: LABEL_DECISION, aide: 'Votre plan d’urgence, dans l’ordre de priorité.', maxCaracteres: 900 },
      { id: 'pourquoi', label: LABEL_POURQUOI, aide: AIDE_POURQUOI, maxCaracteres: 600 },
      { id: 'responsabilites', label: 'Répartition des responsabilités', aide: 'Qui fait quoi dans l’agence.', maxCaracteres: 400 },
      { id: 'messageClient', label: 'Message au client', aide: 'Le message que vous envoyez à Stéphanie Vador maintenant.', maxCaracteres: 500 },
    ],
    competences: ['Priorisation', 'Gestion de conflit', 'Posture professionnelle sous pression'],
  },
]

// ═══ Rebondissements chronométrés (fiche v3) ═════════════════════════════════
// Déclenchés à partir de l'heure de début de l'épreuve (une prolongation ne les décale pas),
// une seule fois chacun (mémorisés dans l'état de partie). R1 : mot pour mot (fiche v3).
// R2, R3 et l'habillage : rédigés par Claude Code — À VALIDER PAR STÉPHANIE.
// R4 : le texte est la `nouvelleInformation` de la variante de crise tirée.
export interface Rebondissement {
  id: RebondissementId
  epreuve: number
  /** Minutes écoulées depuis le début de l'épreuve. */
  minute: number
  categorie: string
  /** Message du client (affiché entre guillemets, signé Stéphanie Vador). */
  messageClient: boolean
  texte: string
}

export const REBONDISSEMENTS: Rebondissement[] = [
  {
    id: 'R1', epreuve: 2, minute: 10, categorie: 'Alerte client — Réduction budgétaire', messageClient: true,
    // Mot pour mot (fiche v3).
    texte: 'Je viens de terminer une réunion avec nos investisseurs. Notre budget marketing est réduit à 60 000 €. En revanche, nos ambitions restent inchangées. Je compte sur votre agence pour trouver des solutions.',
  },
  {
    id: 'R2', epreuve: 2, minute: 20, categorie: 'Opportunité — Partenariat influenceur', messageClient: true,
    texte: 'Un créateur de contenu vient de nous contacter : il propose une collaboration pour le lancement. Son profil est intéressant, mais je ne veux pas de mauvaise surprise. Acceptez-vous, refusez-vous ou négociez-vous ce partenariat ?',
  },
  {
    id: 'R3', epreuve: 3, minute: 10, categorie: 'Alerte client — Réaction immédiate', messageClient: true,
    texte: 'Je ne peux pas laisser cette polémique grossir pendant des heures. Je veux une prise de parole publique de STRYDE tout de suite. Je sais que tout n’est pas encore vérifié, mais chaque heure de silence nous coûte des précommandes.',
  },
  {
    id: 'R4', epreuve: 3, minute: 15, categorie: 'Nouvelle information — Origine du design', messageClient: false,
    texte: '',
  },
]

export const rebondissementsEpreuve = (n: number) => REBONDISSEMENTS.filter(r => r.epreuve === n)

// Micro-textes de l'écran d'épreuve — à valider par Stéphanie.
export const textesEpreuve = {
  situation: 'Situation',
  travailDemande: 'Ce que le client attend',
  alertesRecues: 'Alertes reçues pendant l’épreuve',
  votreDecision: 'Votre décision',
  rechercheAutorisee: 'Recherche Internet et outils d’IA autorisés. Vos décisions, elles, doivent venir de l’équipe.',
  ouvrirDossier: 'Consulter le dossier client',
  rappelTitre: 'Rappel de vos décisions',
  ajouterCanal: '+ Ajouter un canal',
  retirerCanal: 'Retirer',
  maxCanauxAtteint: `${MAX_CANAUX} canaux maximum : retirez-en un pour en choisir un autre.`,
  champsVides: (n: number) => `${n} champ${n > 1 ? 's' : ''} encore vide${n > 1 ? 's' : ''}.`,
  vosReponses: 'Vos réponses envoyées',
  nonRenseigne: 'Non renseigné',
  alertePrioritaire: 'Alerte prioritaire',
  signature: `${CEO.nom}, ${CEO.fonction}`,
  fermerAlerte: 'J’ai pris connaissance de l’alerte',
  retourCeo: 'Retour de Stéphanie Vador',
}

// Rappels affichés en tête d'épreuve : uniquement des réponses réellement données par l'équipe,
// jamais de préremplissage (CLAUDE.md, section 8). Clé = épreuve affichée.
export const RAPPELS: Record<number, { epreuve: number; champs: string[] }[]> = {
  2: [{ epreuve: 1, champs: ['decision'] }],
  3: [{ epreuve: 2, champs: ['decision', 'createur'] }],
  4: [{ epreuve: 2, champs: ['createur'] }, { epreuve: 3, champs: ['message'] }],
}

// ═══ Épreuve 2 (R2) — Profils de créateurs de contenu ═══════════════════════
// 5 profils fictifs (types imposés par la fiche), difficulté comparable : chacun a de vrais
// atouts et de vrais risques, aucune décision n'est évidente. Rédigés par Claude Code — À VALIDER.
// Avatars à initiales uniquement (jamais de photo). Tarifs cohérents avec un budget de 60 000 €.
// Tiré au démarrage de l'épreuve 2, révélé par le rebondissement R2 (+20 min).
// `reactionCrise` : affichée à l'épreuve 3 UNIQUEMENT si l'équipe a choisi « Accepter » à l'épreuve 2.

export interface ProfilCreateur {
  id: string
  nom: string
  avatar: { initiales: string; couleur: string }
  univers: string
  reseaux: string
  audience: string
  publications: string[]
  collaborations: string
  tarif: string
  reputation: string
  signauxAlerte: string[]
  reactionCrise: { auteur: string; texte: string; effet: 'amplifie' | 'attenue' | 'incertain' }
}

export const profilsCreateurs: ProfilCreateur[] = [
  {
    id: 'kenzo-rival',
    nom: 'Kenzo Rival (@kenzorival)',
    avatar: { initiales: 'KR', couleur: '#FF5B14' },
    univers: 'Streetwear et culture sneakers, ton humoristique et provocateur.',
    reseaux: 'TikTok 820 000 abonnés · Instagram 410 000 abonnés',
    audience: '16-24 ans à 70 %, majoritairement en France. Très réactive en commentaires.',
    publications: [
      '« Unboxing de la paire la plus attendue du mois » : 1,4 M de vues.',
      '« Le classement des pires sneakers de l’année » : ton moqueur, 2,1 M de vues.',
      '« Une journée de shopping à Paris avec 100 € » : 900 000 vues.',
    ],
    collaborations: 'Deux marques de streetwear (Nordtrack, Velours Club) en 2024-2025.',
    tarif: '14 000 € pour 1 vidéo TikTok et 3 stories Instagram.',
    reputation: 'Très suivi, souvent cité comme prescripteur. Humour clivant.',
    signauxAlerte: [
      'Polémique en 2025 pour des moqueries envers un petit créateur ; excuses publiques une semaine plus tard.',
      'Taux d’engagement en baisse depuis six mois (de 9 % à 5 %).',
      'Audience plus jeune que la cible STRYDE.',
    ],
    reactionCrise: { auteur: '@kenzorival', texte: '« Franchement je savais pas… On attend la réponse de la marque 👀 » (repris 2 400 fois)', effet: 'amplifie' },
  },
  {
    id: 'lina-sow',
    nom: 'Lina Sow (@lina.marche)',
    avatar: { initiales: 'LS', couleur: '#F2EEE6' },
    univers: 'Consommation responsable, mode de seconde main, vie urbaine à Lyon.',
    reseaux: 'Instagram 18 000 abonnés · TikTok 9 000 abonnés',
    audience: '22-30 ans, urbaine, sensible au prix juste et à la transparence.',
    publications: [
      '« Je porte la même paire pendant 30 jours : bilan honnête » : 64 000 vues.',
      '« Ce que coûte vraiment une paire de sneakers » : 120 000 vues.',
      '« Mes 5 friperies préférées à Lyon » : 38 000 vues.',
    ],
    collaborations: 'Trois petites marques françaises de vêtements.',
    tarif: '2 500 € pour 1 Reel, 2 stories et un test de 30 jours.',
    reputation: 'Très crédible auprès de sa communauté, taux d’engagement de 7 %.',
    signauxAlerte: [
      'Exige un droit de regard total sur ses contenus et refuse tout script.',
      'A publié un avis négatif sur une ancienne marque partenaire qui exagérait ses arguments écologiques.',
      'Portée limitée pour un lancement national.',
    ],
    reactionCrise: { auteur: '@lina.marche', texte: '« Je préfère attendre les explications de la marque avant de me prononcer. Je vous tiens au courant. »', effet: 'attenue' },
  },
  {
    id: 'hugo-delmas',
    nom: 'Hugo Delmas (@hugo.daily)',
    avatar: { initiales: 'HD', couleur: '#B9B4AA' },
    univers: 'Lifestyle : routines, voyages, décoration, bien-être.',
    reseaux: 'YouTube 260 000 abonnés · Instagram 190 000 abonnés',
    audience: '25-40 ans ; environ 45 % dans la cible 18-30 ans.',
    publications: [
      '« Ma routine du matin en 10 minutes » : 480 000 vues.',
      '« Week-end à Lisbonne avec un petit budget » : 350 000 vues.',
      '« J’ai refait mon salon pour 500 € » : 290 000 vues.',
    ],
    collaborations: 'Marques de café, de montres et de bagagerie (12 placements de produit en 3 mois).',
    tarif: '9 000 € pour une intégration de 60 secondes dans une vidéo YouTube.',
    reputation: 'Image soignée et professionnelle, contenus très produits.',
    signauxAlerte: [
      'Aucune légitimité particulière sur les sneakers ou le streetwear.',
      'Audience vieillissante, partiellement hors cible.',
      'Fréquence élevée de placements : sa communauté commence à s’en plaindre.',
    ],
    reactionCrise: { auteur: 'Sous la dernière vidéo de @hugo.daily', texte: '« Tu ne dis rien sur ta marque partenaire ? » (340 j’aime, sans réponse)', effet: 'incertain' },
  },
  {
    id: 'mira-k',
    nom: 'Mira K. (@mirak.kicks)',
    avatar: { initiales: 'MK', couleur: '#FF8A50' },
    univers: 'Critiques de sneakers, personnalisation, histoire des modèles.',
    reseaux: 'Instagram 120 000 abonnés · TikTok 150 000 abonnés',
    audience: '18-28 ans, passionnés de sneakers, très connaisseurs.',
    publications: [
      '« Test porté : 3 semaines avec la nouvelle Brekko » : 410 000 vues.',
      '« Je personnalise une paire blanche en direct » : 260 000 vues.',
      '« Les marques qui copient au lieu de créer » : 530 000 vues (2024).',
    ],
    collaborations: 'Ambassadrice de la marque Brekko pendant deux ans, jusqu’à il y a 4 mois. Ponctuellement Nordtrack.',
    tarif: '7 500 € pour 1 vidéo de test et 2 publications.',
    reputation: 'Experte reconnue, avis écoutés par les passionnés.',
    signauxAlerte: [
      'Son contrat avec Brekko vient de se terminer : une clause de non-concurrence est possible.',
      'Une partie de son audience pourrait la juger « mercenaire » si elle change de marque trop vite.',
      'A déjà critiqué publiquement « les marques qui copient ».',
    ],
    reactionCrise: { auteur: 'Plusieurs internautes', texte: 'ressortent la vidéo de @mirak.kicks « Les marques qui copient au lieu de créer » et l’interpellent : « Et ta nouvelle marque alors ? »', effet: 'amplifie' },
  },
  {
    id: 'noor-studio',
    nom: 'NOOR (@noor.studio)',
    avatar: { initiales: 'NO', couleur: '#2A2A2F' },
    univers: 'Courts-métrages en stop-motion, humour décalé, culture urbaine.',
    reseaux: 'TikTok 35 000 abonnés (multiplié par 4 en 3 mois) · Instagram 12 000 abonnés',
    audience: '18-25 ans, très créative, partage beaucoup les contenus.',
    publications: [
      '« Une sneaker qui s’enfuit du magasin » (stop-motion) : 1,1 M de vues.',
      '« Mon quartier en pâte à modeler » : 240 000 vues.',
      '« Pub imaginaire pour une marque qui n’existe pas » : 180 000 vues.',
    ],
    collaborations: 'Aucune marque. Un court-métrage sélectionné dans un festival étudiant.',
    tarif: '4 000 € pour 1 film de 45 secondes, avec liberté créative totale.',
    reputation: 'Originalité saluée, considérée comme un talent à suivre.',
    signauxAlerte: [
      'Humour parfois limite : une vidéo a été retirée par la plateforme.',
      'Aucune expérience de collaboration avec une marque.',
      'Délai de production incertain alors que le lancement a lieu dans 30 jours.',
    ],
    reactionCrise: { auteur: '@noor.studio', texte: 'publie une animation parodique de la polémique (90 000 vues). Les commentaires hésitent entre soutien et moquerie.', effet: 'incertain' },
  },
]

// ═══ Épreuve 3 — Variantes de crise « copie de design » ═════════════════════
// 3 variantes de difficulté comparable, aucune insoluble. Marques comparées TOUJOURS fictives.
// Les 5 commentaires imposés par la fiche figurent mot pour mot dans chaque variante.
// `faitsEtablis` et `aVerifier` ne sont PAS affichés aux équipes (c'est à elles de distinguer) :
// ils servent de référence à l'analyse IA. Rédigé par Claude Code — À VALIDER.

export type TonCommentaire = 'negatif' | 'question' | 'favorable' | 'neutre'

export interface Silhouette {
  tige: string
  accent: string
  semelle: string
  bande: boolean
  profilSemelle: 'crantee' | 'lisse' | 'sculptee' | 'plate'
}

export interface VarianteCrise {
  id: string
  modeleConcerne: ModeleStryde['id']
  marqueFictive: string
  modeleFictif: string
  publication: { auteur: string; abonnes: string; texte: string; vues: string; partages: string }
  commentaires: { auteur: string; texte: string; ton: TonCommentaire }[]
  comparaison: { stryde: Silhouette; concurrent: Silhouette; communs: string[]; differences: string[] }
  faitsEtablis: string[]
  aVerifier: string[]
  origineDesign: string[]
  /** Rebondissement R4 (+15 min) : élément nouveau sur l'origine du design, cohérent avec la variante,
   *  qui peut remettre en cause l'analyse initiale. Rédigé par Claude Code — À VALIDER. */
  nouvelleInformation: string
}

// Mot pour mot (fiche).
const COMMENTAIRES_FICHE: VarianteCrise['commentaires'] = [
  { auteur: '@julie.sneak', texte: 'C’est moi ou cette paire ressemble énormément à celle d’une autre marque ?', ton: 'question' },
  { auteur: '@tom_93', texte: 'Encore une marque qui copie les tendances sans rien inventer.', ton: 'negatif' },
  { auteur: '@maelle.style', texte: 'Vous avez vraiment créé ce modèle vous-mêmes ?', ton: 'question' },
  { auteur: '@karimdesign', texte: 'Personnellement, je ne vois pas le problème. Beaucoup de sneakers se ressemblent.', ton: 'favorable' },
  { auteur: '@leo.m', texte: 'J’étais prêt à commander, mais maintenant j’attends des explications.', ton: 'negatif' },
]

export const variantesCrise: VarianteCrise[] = [
  {
    id: 'impact-brekko',
    modeleConcerne: 'impact',
    marqueFictive: 'Brekko',
    modeleFictif: 'Volt Runner',
    publication: {
      auteur: '@sneakradar.fr',
      abonnes: '240 000 abonnés',
      texte: 'STRYDE 02 IMPACT vs Brekko Volt Runner. Même bande latérale, même blanc et orange. Coïncidence ? 🤔',
      vues: '1,2 M de vues',
      partages: '8 300 partages',
    },
    commentaires: [
      ...COMMENTAIRES_FICHE,
      { auteur: '@nina.k', texte: 'La Volt Runner est sortie quand exactement ? Quelqu’un a la date ?', ton: 'question' },
      { auteur: '@samy.run', texte: 'Le blanc et orange, il y en a partout depuis des années…', ton: 'neutre' },
      { auteur: '@marco.dz', texte: 'J’ai précommandé l’IMPACT, je garde ma commande pour l’instant.', ton: 'favorable' },
    ],
    comparaison: {
      stryde: { tige: '#F2EEE6', accent: '#FF5B14', semelle: '#F2EEE6', bande: true, profilSemelle: 'crantee' },
      concurrent: { tige: '#FFFFFF', accent: '#FF7A2E', semelle: '#E6E6E6', bande: true, profilSemelle: 'lisse' },
      communs: ['Bande latérale contrastée', 'Coloris blanc et orange', 'Tige basse'],
      differences: ['Semelle crantée (moule exclusif STRYDE) contre semelle lisse', 'Bande plus haute et plus large chez STRYDE', 'Forme du talon différente'],
    },
    faitsEtablis: [
      'Les dessins de STRYDE sont datés d’octobre 2024 à mars 2025 et déposés à l’INPI en avril 2025.',
      'La Brekko Volt Runner a été annoncée en juin 2025 et commercialisée en septembre 2025.',
      'Le coloris blanc et orange et la bande latérale sont des codes très répandus.',
    ],
    aVerifier: [
      'Brekko avait-il diffusé des visuels ou des prototypes avant avril 2025 ?',
      'Existe-t-il un fournisseur ou un intermédiaire commun aux deux marques ?',
      'Le compte @sneakradar.fr a-t-il un lien commercial avec Brekko ?',
      'L’avis d’un conseil en propriété industrielle sur la ressemblance.',
    ],
    origineDesign: [
      'Croquis de l’IMPACT : premières versions datées du 14 novembre 2024 (archives de Malik Benhamou).',
      'Dépôt des dessins et modèles à l’INPI : avril 2025.',
      'Premier prototype de l’IMPACT fabriqué par l’atelier portugais : juillet 2025.',
      'Brekko Volt Runner : annonce publique en juin 2025, mise en vente en septembre 2025.',
    ],
    nouvelleInformation: 'Un ancien stagiaire du studio de STRYDE, passé par Brekko au printemps 2024, affirme avoir montré à Malik Benhamou en octobre 2024, quelques semaines avant ses premiers croquis de l’IMPACT, des planches de tendances internes à Brekko, dont une bande latérale orange. Malik Benhamou dit ne pas se souvenir de ces planches.',
  },
  {
    id: 'shadow-ondrel',
    modeleConcerne: 'shadow',
    marqueFictive: 'Maison Ondrel',
    modeleFictif: 'Eclipse',
    publication: {
      auteur: '@clem.fitcheck',
      abonnes: '95 000 abonnés',
      texte: 'J’ai cru que c’était une Eclipse de Maison Ondrel à 240 € 😅 STRYDE vend quasiment la même à 89 €…',
      vues: '680 000 vues',
      partages: '4 100 partages',
    },
    commentaires: [
      ...COMMENTAIRES_FICHE,
      { auteur: '@yanis.b', texte: 'Si c’est la même qualité pour 150 € de moins, je dis merci 😂', ton: 'favorable' },
      { auteur: '@sarah.archi', texte: 'La semelle est vraiment très proche. Le reste, je ne sais pas.', ton: 'neutre' },
      { auteur: '@paul.collect', texte: 'Maison Ondrel a réagi ? Ils pourraient porter plainte non ?', ton: 'question' },
    ],
    comparaison: {
      stryde: { tige: '#1C1C1F', accent: '#2A2A2F', semelle: '#0B0B0C', bande: false, profilSemelle: 'sculptee' },
      concurrent: { tige: '#141416', accent: '#3A3A40', semelle: '#0B0B0C', bande: false, profilSemelle: 'sculptee' },
      communs: ['Semelle sculptée au profil très proche', 'Monochrome noir et anthracite', 'Lignes épurées'],
      differences: ['Tige textile recyclé chez STRYDE, cuir chez Maison Ondrel', 'Prix : 89 € contre 240 €', 'Laçage et languette différents'],
    },
    faitsEtablis: [
      'L’Eclipse de Maison Ondrel est commercialisée depuis 2023, avant la conception de la SHADOW.',
      'La SHADOW a été dessinée entre octobre 2024 et mars 2025 ; dépôt INPI en avril 2025, accepté.',
      'La ressemblance de la semelle est réelle ; les modèles monochromes sont courants.',
    ],
    aVerifier: [
      'La designer connaissait-elle l’Eclipse au moment de dessiner la SHADOW ?',
      'Une comparaison technique détaillée des deux semelles.',
      'La position de Maison Ondrel, qui n’a pas encore réagi.',
      'L’avis d’un juriste sur le risque réel.',
    ],
    origineDesign: [
      'Croquis de la SHADOW : premières versions datées du 3 décembre 2024 (archives de Malik Benhamou).',
      'Moodboard de conception : architecture contemporaine, sneakers des années 2000, plusieurs modèles monochromes du marché.',
      'Dépôt des dessins et modèles à l’INPI : avril 2025.',
      'Maison Ondrel Eclipse : en vente depuis mars 2023.',
    ],
    nouvelleInformation: 'Le moodboard complet de la SHADOW vient d’être retrouvé : parmi une vingtaine d’images figure une photo de l’Eclipse de Maison Ondrel. Malik Benhamou reconnaît l’avoir vue, mais assure ne s’en être inspiré que pour l’ambiance monochrome, pas pour la semelle.',
  },
  {
    id: 'origin-solvane',
    modeleConcerne: 'origin',
    marqueFictive: 'Solvane',
    modeleFictif: 'Base 01',
    publication: {
      auteur: '@solvane.paris (compte officiel de la marque Solvane)',
      abonnes: '310 000 abonnés',
      texte: 'On aime qu’on s’inspire de nous. Un peu moins qu’on nous copie. 👟 Base 01 depuis 2022.',
      vues: '410 000 vues',
      partages: '3 600 partages',
    },
    commentaires: [
      ...COMMENTAIRES_FICHE,
      { auteur: '@hugo.porto', texte: 'Il paraît que les deux marques font fabriquer au même endroit au Portugal…', ton: 'question' },
      { auteur: '@amel.daily', texte: 'Une basket blanche minimaliste, c’est pas vraiment une invention non plus.', ton: 'neutre' },
      { auteur: '@lucas.r', texte: 'Solvane qui attaque une petite marque, c’est pas très classe.', ton: 'favorable' },
    ],
    comparaison: {
      stryde: { tige: '#F2EEE6', accent: '#E3D9C6', semelle: '#E8E0D0', bande: false, profilSemelle: 'plate' },
      concurrent: { tige: '#F7F5F0', accent: '#EDEDED', semelle: '#F2F2F2', bande: false, profilSemelle: 'plate' },
      communs: ['Basket blanche minimaliste', 'Tige basse sans motif', 'Semelle plate'],
      differences: ['Coloris blanc cassé et beige chez STRYDE, blanc pur chez Solvane', 'Surpiqûres ton sur ton chez STRYDE', 'Semelle issue d’un moule exclusif STRYDE selon le contrat'],
    },
    faitsEtablis: [
      'La Base 01 de Solvane est commercialisée depuis 2022.',
      'L’ORIGIN a été dessinée entre octobre 2024 et mars 2025 ; dépôt INPI en avril 2025.',
      'Les baskets blanches minimalistes sont l’un des styles les plus répandus du marché.',
    ],
    aVerifier: [
      'L’atelier portugais de STRYDE produit-il aussi pour Solvane ? Quelles pièces sont partagées ?',
      'Le contrat d’exclusivité du moule de semelle est-il respecté ?',
      'Ce que Solvane reproche précisément (forme, détails, matériaux).',
      'L’avis d’un conseil en propriété industrielle.',
    ],
    origineDesign: [
      'Croquis de l’ORIGIN : premières versions datées du 21 octobre 2024 (archives de Malik Benhamou).',
      'Contrat avec l’atelier portugais : moule de semelle exclusif à STRYDE (article 7).',
      'Dépôt des dessins et modèles à l’INPI : avril 2025.',
      'Solvane Base 01 : en vente depuis 2022.',
    ],
    nouvelleInformation: 'L’atelier portugais reconnaît par e-mail qu’en février 2025, un moule de semelle très proche de celui de l’ORIGIN a servi à une petite série pour un autre client, malgré l’exclusivité prévue à l’article 7 du contrat. L’atelier refuse de dire de quel client il s’agit.',
  },
]

// ═══ Épreuve 4 — Alertes de l'ultimatum ═════════════════════════════════════
// Trois alertes simultanées dès l'ouverture (fiche v3) : menace de changement d'agence, conflit
// entre deux collaborateurs fictifs, lancement avancé de 7 jours. Elles reprennent UNIQUEMENT des
// décisions réellement prises par l'équipe (créateur, variante de crise) : si une information
// manque, la formulation reste neutre. L'application n'invente jamais une décision.
// Rédigé par Claude Code — À VALIDER.

export interface ContexteUltimatum {
  createur?: string
  decisionPartenariat?: 'accepter' | 'refuser' | 'negocier'
  modeleCrise?: string
  marqueCrise?: string
}

const PHRASE_PARTENARIAT: Record<NonNullable<ContexteUltimatum['decisionPartenariat']>, (createur: string) => string> = {
  accepter: c => `Et nos investisseurs s’inquiètent du partenariat avec ${c} que vous nous avez recommandé.`,
  refuser: c => `Vous nous avez conseillé de renoncer à ${c} : pendant ce temps, d’autres marques occupent le terrain.`,
  negocier: c => `La négociation avec ${c} n’avance pas et nous fait perdre du temps.`,
}

export const alertesUltimatum = {
  client: {
    titre: 'Le client menace de changer d’agence',
    texte: (c: ContexteUltimatum) => [
      c.modeleCrise ? `« Les précommandes ont chuté depuis la polémique autour de la ${c.modeleCrise}.` : '« Les précommandes ont chuté depuis le début de la polémique.',
      c.decisionPartenariat && c.createur ? PHRASE_PARTENARIAT[c.decisionPartenariat](c.createur) : '',
      'Si vous ne me présentez pas un plan crédible aujourd’hui, je confierai le lancement à une autre agence. »',
    ].filter(Boolean).join(' '),
  },
  equipe: {
    titre: 'Conflit dans l’agence',
    texte: () => [
      'Le responsable créatif veut maintenir le plan de lancement tel que vous l’avez défendu : « On ne recule pas pour quelques commentaires. »',
      'La responsable communication veut tout suspendre tant que la polémique n’est pas réglée.',
      'Ils refusent désormais de travailler ensemble.',
    ].join(' '),
  },
  planning: {
    titre: 'Le lancement est avancé de 7 jours',
    texte: () => [
      'Le client avance la date de lancement national d’une semaine.',
      'Toutes vos actions doivent être prêtes 7 jours plus tôt, avec un budget toujours limité à 60 000 €.',
      'Le premier lot de 4 500 paires ne peut pas être augmenté.',
    ].join(' '),
  },
}
