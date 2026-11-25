// ═══════════════════════════════════════════════════════════════════════════
// B3 Marketing Digital — Mission 2 « MARKETING UNDER PRESSURE »
// Contenus de la mission (fiche `fiche-mission-mission2-marketing-under-pressure-v2.docx`).
// Les textes marqués « mot pour mot » viennent de la fiche et ne doivent pas être reformulés.
// Les compléments rédigés par Claude Code sont marqués « à valider par Stéphanie ».
// ═══════════════════════════════════════════════════════════════════════════

// Visuels STRYDE fournis par Stéphanie, à déposer dans /public/univers3/stryde/ sous ces noms.
// Tant qu'un fichier est absent, l'interface affiche un emplacement graphique de remplacement.
export const VISUELS_STRYDE = {
  collection: '/univers3/stryde/collection.jpg',
  origin: '/univers3/stryde/origin.jpg',
  impact: '/univers3/stryde/impact.jpg',
  shadow: '/univers3/stryde/shadow.jpg',
} as const

export const accueilM2 = {
  titre: 'Marketing Under Pressure',
  sousTitre: 'Garder le contrôle sous pression',
  accroche: 'Un lancement. Des imprévus. 80 minutes pour faire la différence.',
  mentions: ['80 minutes', '6 épreuves', 'Une connexion par équipe'],
  // Mot pour mot (fiche).
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

// Repères de la partie (fiche, section « Déroulé »).
export const DUREE_PARTIE_MIN = 80
export const NB_EPREUVES = 6
// Une partie locale est purgée 24 h après sa création (CLAUDE.md, section 3.2).
export const DUREE_VIE_PARTIE_MS = 24 * 60 * 60 * 1000

// Durée de chaque épreuve en minutes (fiche, « Déroulé ») : 2 phases de 40 minutes.
export const DUREES_EPREUVES_MIN: Record<number, number> = { 1: 15, 2: 15, 3: 10, 4: 15, 5: 15, 6: 10 }
export const PHASE_EPREUVE: Record<number, 1 | 2> = { 1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 2 }
// Alertes du chronomètre, en minutes restantes (fiche, « Chronomètre »).
export const ALERTES_CHRONO_MIN = [5, 1] as const

// Micro-textes du chronomètre et de la validation — à valider par Stéphanie.
export const textesChrono = {
  alerte5: 'Plus que 5 minutes. Finalisez vos choix.',
  alerte1: 'Dernière minute. Vos réponses seront envoyées automatiquement à la fin du temps.',
  tempsAjoute: (min: number) => `L’intervenante vous accorde ${min} minute${min > 1 ? 's' : ''} de plus.`,
  boutonValider: 'Valider la décision',
  confirmerValider: 'Valider maintenant ? La décision sera définitive et le temps restant ne sera pas reporté.',
  confirmerOui: 'Oui, valider',
  confirmerNon: 'Continuer à travailler',
  soumisAuto: 'Temps écoulé : vos réponses ont été envoyées telles quelles, rien n’a été supprimé.',
  soumisManuel: 'Décision validée.',
  epreuveSuivante: 'Passer à l’épreuve suivante',
  versPause: 'Terminer la phase 1',
  versBilan: 'Voir le bilan de la mission',
}

// Écran de pause (fiche) : titre mot pour mot ; micro-textes — à valider par Stéphanie.
export const textesPause = {
  titre: 'Phase 1 terminée. Votre stratégie prend forme. Mais le marché n’a pas dit son dernier mot.',
  attente: 'La phase 2 s’ouvrira quand l’intervenante le décidera. Votre partie est sauvegardée.',
  ouverte: 'La phase 2 est ouverte. Le marché vous attend.',
  bouton: 'Commencer la phase 2',
  bilanTitre: 'Bilan de la phase 1',
  sauvegarde: 'Toutes vos réponses de la phase 1 sont sauvegardées sur ce navigateur.',
  horsLigne: 'Connexion momentanément indisponible : nouvel essai automatique toutes les 10 secondes.',
  rappelSimulation: 'Ces indicateurs simulent les conséquences de vos décisions. Ce n’est pas une note.',
}

// Les 4 indicateurs du tableau de bord (fiche) : 25 points chacun, total sur 100.
export const INDICATEURS = [
  { id: 'pertinence', label: 'Pertinence marketing' },
  { id: 'confiance', label: 'Confiance du client' },
  { id: 'cohesion', label: 'Cohésion d’équipe (simulée)' },
  { id: 'credibilite', label: 'Crédibilité professionnelle' },
] as const
export const MAX_INDICATEUR = 25
export const texteAnalyseEnAttente = (epreuvesEnAttente: number[]) =>
  `Analyse en attente : épreuve${epreuvesEnAttente.length > 1 ? 's' : ''} ${epreuvesEnAttente.join(', ')}. Les indicateurs seront mis à jour dès qu’elle sera disponible.`

// Écran de fin (fiche) : titre mot pour mot.
export const textesBilan = {
  titre: 'Mission terminée. Il est temps de prendre du recul.',
  // Mot pour mot (fiche).
  messageCloture: 'Vous avez construit une stratégie, défendu vos recommandations et affronté des imprévus. Votre prochaine mission consiste à analyser votre expérience et à en tirer des enseignements pour votre future vie professionnelle. Vous ne pourrez pas toujours contrôler les événements. Mais vous pourrez apprendre à contrôler votre manière d’y réagir.',
  // Micro-textes — à valider par Stéphanie.
  scoreFinal: 'Score final de l’agence',
  evolution: 'Évolution épreuve par épreuve',
  decisions: 'Vos 6 décisions',
  pointsForts: 'Points forts',
  pointsVigilance: 'Points de vigilance',
  competences: 'Compétences mobilisées',
  recommandation: 'Recommandation de progression',
  historique: 'Historique complet de vos réponses',
  chargement: 'Votre client prépare le bilan de la mission…',
  enAttente: 'Bilan en attente. Vos résultats sont conservés : vous pourrez relancer le bilan dans un instant.',
  relancer: 'Relancer le bilan',
  mettreAJour: 'De nouvelles analyses sont arrivées : mettre à jour le bilan',
  relancesEpuisees: 'Nombre de relances atteint. Prévenez l’intervenante : vos résultats restent conservés.',
  resumeIndisponible: 'Résumé indisponible : analyse en attente.',
  analyseAttente: 'Analyse en attente',
  depart: 'Départ',
  rappelSimulation: 'Ces indicateurs simulent les conséquences de vos décisions. Ce n’est pas une note.',
}

// ═══ Dossier client STRYDE ══════════════════════════════════════════════════
// Brief et collection : fiche mission. Tout le reste : rédigé par Claude Code — À VALIDER PAR STÉPHANIE.
// Règles respectées : marque et personnes fictives ; ni concurrents, ni benchmark, ni slogan,
// ni campagne, ni stratégie fournis ; engagements environnementaux vérifiables et réalistes à 89 €.
// La section « conception » contient les indices utiles à l'épreuve 5 (origine du design).

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
  fondateurs: { nom: string; role: string; parcours: string }[]
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
    'STRYDE est née en 2024 à Montreuil, dans un atelier partagé où ses fondateurs se retrouvaient le soir après leur travail.',
    'Point de départ : ne plus avoir à choisir entre une paire bon marché qui ne dure pas et une paire désirable hors de prix.',
    'Deux ans de prototypes, 14 versions de semelle testées par un panel de 40 personnes de 18 à 30 ans, avant d’arrêter les 3 modèles de la collection.',
    'Le lancement national est la première vraie prise de parole de la marque : jusqu’ici, STRYDE n’a été visible que par le bouche-à-oreille de son entourage.',
  ],
  fondateurs: [
    {
      nom: 'Inès Ferrand',
      role: 'Cofondatrice, directrice artistique',
      parcours: 'Formée au design produit, 6 ans comme designer chaussure en bureau d’études. Elle dessine tous les modèles STRYDE.',
    },
    {
      nom: 'Malik Benhamou',
      role: 'Cofondateur, directeur général',
      parcours: 'Ancien responsable des achats dans l’industrie textile. Il gère la fabrication, les fournisseurs et les finances.',
    },
    {
      nom: 'Clara Nguyen',
      role: 'Associée, responsable e-commerce et relation client',
      parcours: 'A travaillé 4 ans pour une boutique en ligne de mode. Elle a construit le site STRYDE et gère le service client.',
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
    'Équipe de 6 personnes : les 3 fondateurs, 1 développeuse web, 1 logisticien, 1 alternante en marketing.',
    'Pas de service communication interne : c’est la raison pour laquelle STRYDE fait appel à votre agence.',
    'Un compte Instagram de 2 300 abonnés, essentiellement l’entourage des fondateurs et du panel de testeurs.',
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
    'Être tenu informé rapidement en cas de problème : il préfère une mauvaise nouvelle tôt qu’une surprise tard.',
    'Garder la main sur l’image de la marque : toute prise de parole publique importante doit lui être soumise.',
  ],
  conception: [
    'Les 3 modèles ont été dessinés par Inès Ferrand entre octobre 2024 et mars 2025.',
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

// ═══ Épreuves ═══════════════════════════════════════════════════════════════
// Titres, durées, travail demandé et champs : fiche mission. Situations et aides : rédigées par
// Claude Code — À VALIDER PAR STÉPHANIE, sauf l'alerte de l'épreuve 3 (mot pour mot).
// Pas de QCM : uniquement des champs libres courts et argumentés. Seules exceptions de forme,
// prévues par la fiche : la liste de 3 canaux maximum (épreuve 2) et la décision
// accepter / refuser / négocier (épreuve 4), toujours accompagnées d'une justification.

export type TypeChamp = 'texte' | 'canaux' | 'decision'

export interface ChampEpreuve {
  id: string
  label: string
  aide: string
  maxCaracteres: number
  type?: TypeChamp
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

// Les 5 étapes narratives structurent l'écran d'une épreuve, sans chronomètre propre.
export const ETAPES_NARRATIVES = ['Alerte', 'Investigation', 'Concertation', 'Décision', 'Conséquences'] as const

const AIDE_SOURCES = 'Liens ou références consultés, et ce que vous en avez retenu. Une URL seule ne prouve rien.'
const AIDE_JUSTIFICATION = 'Pourquoi ce choix plutôt qu’un autre ? Appuyez-vous sur le dossier client et vos recherches.'

export const epreuves: Epreuve[] = [
  {
    numero: 1,
    titre: 'Trouver sa place sur le marché',
    dureeMin: DUREES_EPREUVES_MIN[1],
    phase: PHASE_EPREUVE[1],
    situation: 'Premier rendez-vous avec STRYDE. Avant de parler campagne, le client veut une chose : savoir où sa marque peut exister sur un marché où tout le monde vend des sneakers.',
    travailDemande: [
      'Identifiez 3 concurrents réels de STRYDE (recherche Internet obligatoire, aucune liste n’est fournie).',
      'Analysez leur positionnement et leur communication.',
      'Repérez une opportunité de différenciation pour STRYDE.',
      'Proposez un positionnement et justifiez-le.',
    ],
    champs: [
      { id: 'concurrents', label: 'Trois concurrents', aide: 'Pour chacun : nom, prix, cible, ce qu’il met en avant. 3 à 6 lignes.', maxCaracteres: 700 },
      { id: 'enseignements', label: 'Ce que vous en retenez', aide: 'Points communs, manques, excès observés. 2 à 4 phrases.', maxCaracteres: 500 },
      { id: 'opportunite', label: 'Opportunité de différenciation', aide: 'L’espace que personne n’occupe vraiment. 1 à 3 phrases.', maxCaracteres: 400 },
      { id: 'positionnement', label: 'Positionnement proposé', aide: 'STRYDE est… pour… qui veulent… 1 à 2 phrases.', maxCaracteres: 300 },
      { id: 'justification', label: 'Justification', aide: AIDE_JUSTIFICATION, maxCaracteres: 500 },
      { id: 'sources', label: 'Sources', aide: AIDE_SOURCES, maxCaracteres: 400 },
    ],
    competences: ['Analyse de marché', 'Recherche et exploitation d’informations', 'Argumentation'],
  },
  {
    numero: 2,
    titre: 'Créer le désir',
    dureeMin: DUREES_EPREUVES_MIN[2],
    phase: PHASE_EPREUVE[2],
    situation: 'Le client valide l’idée d’un lancement national. Il attend maintenant une campagne qui donne envie, cohérente avec le positionnement que vous avez défendu.',
    travailDemande: [
      'Inspirez-vous de tendances et de campagnes réelles.',
      'Imaginez un concept et un message (ou un slogan).',
      `Choisissez ${MAX_CANAUX} canaux au maximum et les actions associées.`,
      'Expliquez comment vous allez susciter l’intérêt de la cible.',
    ],
    champs: [
      { id: 'concept', label: 'Concept de campagne', aide: 'L’idée centrale, en 2 à 4 phrases.', maxCaracteres: 400 },
      { id: 'message', label: 'Message ou slogan', aide: 'Ce que la cible doit retenir. 1 phrase.', maxCaracteres: 200 },
      { id: 'canaux', label: `Canaux (${MAX_CANAUX} maximum)`, aide: 'Un canal par ligne.', maxCaracteres: 60, type: 'canaux' },
      { id: 'actions', label: 'Actions', aide: 'Ce qui se passe concrètement sur chaque canal. 3 à 6 lignes.', maxCaracteres: 600 },
      { id: 'justification', label: 'Justification', aide: AIDE_JUSTIFICATION, maxCaracteres: 500 },
      { id: 'sources', label: 'Sources et inspirations', aide: AIDE_SOURCES, maxCaracteres: 400 },
    ],
    competences: ['Créativité', 'Cohérence stratégique', 'Choix des canaux'],
  },
  {
    numero: 3,
    titre: 'Faire plus avec moins',
    dureeMin: DUREES_EPREUVES_MIN[3],
    phase: PHASE_EPREUVE[3],
    // Mot pour mot (fiche).
    situation: 'Nous venons de revoir nos prévisions financières. Le budget marketing doit être réduit immédiatement. En revanche, nos ambitions restent inchangées. Nous comptons sur votre créativité.',
    travailDemande: [
      'Le budget passe de 100 000 € à 60 000 € (-40 %). Aucun calcul n’est attendu.',
      'Reprenez votre stratégie de l’épreuve 2 et arbitrez.',
      'Proposez des alternatives et défendez vos choix.',
      'Anticipez les conséquences de ces arbitrages.',
    ],
    champs: [
      { id: 'conservees', label: 'Actions conservées', aide: 'Ce que vous gardez, et pourquoi c’est prioritaire.', maxCaracteres: 400 },
      { id: 'supprimees', label: 'Actions supprimées ou remplacées', aide: 'Ce que vous abandonnez ou transformez.', maxCaracteres: 400 },
      { id: 'alternatives', label: 'Alternatives', aide: 'Comment obtenir un effet comparable avec moins de moyens.', maxCaracteres: 500 },
      { id: 'nouvelleStrategie', label: 'Nouvelle stratégie', aide: 'La version à 60 000 €, en 2 à 4 phrases.', maxCaracteres: 500 },
      { id: 'justification', label: 'Justification', aide: 'Comment présenteriez-vous ces arbitrages au client ?', maxCaracteres: 500 },
      { id: 'risques', label: 'Risques', aide: 'Ce que ces choix peuvent coûter, et comment le limiter.', maxCaracteres: 400 },
    ],
    competences: ['Arbitrage sous contrainte', 'Adaptation', 'Défense des recommandations'],
  },
  {
    numero: 4,
    titre: 'Le partenariat risqué',
    dureeMin: DUREES_EPREUVES_MIN[4],
    phase: PHASE_EPREUVE[4],
    situation: 'Un créateur de contenu a contacté STRYDE : il propose un partenariat pour le lancement. Le client hésite et vous demande une recommandation claire.',
    travailDemande: [
      'Étudiez le profil du créateur et vérifiez ce qui peut l’être.',
      'Pesez opportunités et risques pour la marque.',
      'Décidez : accepter, refuser ou négocier un partenariat.',
      'Fixez vos conditions et justifiez votre décision.',
    ],
    champs: [
      { id: 'decision', label: 'Votre décision', aide: 'Choisissez, puis justifiez plus bas.', maxCaracteres: 20, type: 'decision' },
      { id: 'opportunites', label: 'Opportunités', aide: 'Ce que STRYDE peut y gagner.', maxCaracteres: 400 },
      { id: 'risques', label: 'Risques', aide: 'Ce que STRYDE peut y perdre.', maxCaracteres: 400 },
      { id: 'conditions', label: 'Conditions', aide: 'Vos conditions pour accepter ou négocier, ou ce qui vous ferait changer d’avis.', maxCaracteres: 400 },
      { id: 'justification', label: 'Justification', aide: AIDE_JUSTIFICATION, maxCaracteres: 500 },
      { id: 'sources', label: 'Sources', aide: AIDE_SOURCES, maxCaracteres: 300 },
    ],
    competences: ['Évaluation des risques', 'Prise de décision', 'E-réputation et influence'],
  },
  {
    numero: 5,
    titre: 'La marque dans la tourmente',
    dureeMin: DUREES_EPREUVES_MIN[5],
    phase: PHASE_EPREUVE[5],
    situation: 'Une publication devient virale : STRYDE est accusée d’avoir copié le design d’une autre marque. Les commentaires s’enchaînent et le client vous appelle.',
    travailDemande: [
      'Analysez la situation : qui accuse, de quoi, avec quel écho.',
      'Distinguez les faits, les ressemblances, les accusations et ce qui reste à vérifier.',
      'Construisez un plan d’action et rédigez le message officiel de la marque.',
      'Appuyez-vous sur un exemple réel de crise comparable. Aucune expertise juridique n’est attendue : dites quoi vérifier et qui solliciter.',
    ],
    champs: [
      { id: 'analyse', label: 'Analyse de la situation', aide: '2 à 4 phrases.', maxCaracteres: 500 },
      { id: 'faits', label: 'Faits établis et points à vérifier', aide: 'Deux listes : ce que l’on sait, ce qu’il faut vérifier (et auprès de qui).', maxCaracteres: 500 },
      { id: 'planAction', label: 'Plan d’action', aide: 'Quoi, qui, quand. 3 à 6 lignes.', maxCaracteres: 600 },
      { id: 'message', label: 'Message officiel', aide: 'Le texte que STRYDE publierait.', maxCaracteres: 600 },
      { id: 'exempleReel', label: 'Exemple réel et sources', aide: 'Une crise réelle comparable et ce qu’elle vous apprend.', maxCaracteres: 400 },
      { id: 'justification', label: 'Justification', aide: AIDE_JUSTIFICATION, maxCaracteres: 400 },
    ],
    competences: ['Gestion de crise', 'Communication responsable', 'Esprit critique'],
  },
  {
    numero: 6,
    titre: 'L’ultimatum',
    dureeMin: DUREES_EPREUVES_MIN[6],
    phase: PHASE_EPREUVE[6],
    situation: 'Trois alertes arrivent en même temps. Respirez : tout ne peut pas être traité à la fois, mais tout doit être décidé.',
    travailDemande: [
      'Classez les trois alertes par ordre de priorité.',
      'Construisez un plan d’urgence et répartissez les responsabilités.',
      'Gérez le conflit dans l’équipe.',
      'Adaptez la stratégie et rédigez votre message au client.',
    ],
    champs: [
      { id: 'priorites', label: 'Ordre de priorité', aide: '1, 2, 3 : et pourquoi cet ordre.', maxCaracteres: 300 },
      { id: 'planUrgence', label: 'Plan d’urgence', aide: 'Les actions des prochaines 48 heures.', maxCaracteres: 600 },
      { id: 'responsabilites', label: 'Responsabilités', aide: 'Qui fait quoi dans l’agence.', maxCaracteres: 400 },
      { id: 'conflit', label: 'Gestion du conflit', aide: 'Comment sortir du blocage entre les deux responsables.', maxCaracteres: 400 },
      { id: 'adaptation', label: 'Adaptation de la stratégie', aide: 'Ce qui change avec un lancement avancé de 7 jours.', maxCaracteres: 400 },
      { id: 'messageClient', label: 'Message au client', aide: 'Le message que vous lui envoyez maintenant.', maxCaracteres: 500 },
      { id: 'justification', label: 'Justification', aide: AIDE_JUSTIFICATION, maxCaracteres: 400 },
    ],
    competences: ['Priorisation', 'Gestion de conflit', 'Posture professionnelle sous pression'],
  },
]

// Micro-textes de l'écran d'épreuve — à valider par Stéphanie.
export const textesEpreuve = {
  travailDemande: 'Ce que le client attend',
  concertation: 'Avant d’écrire : chacun donne son avis en une phrase, puis l’équipe tranche. Un désaccord bien argumenté vaut mieux qu’un consensus mou.',
  rechercheAutorisee: 'Recherche Internet et outils d’IA autorisés. Vos réponses, elles, doivent venir de l’équipe.',
  ouvrirDossier: 'Consulter le dossier client',
  rappelTitre: 'Rappel de vos décisions',
  ajouterCanal: '+ Ajouter un canal',
  retirerCanal: 'Retirer',
  maxCanauxAtteint: `${MAX_CANAUX} canaux maximum : retirez-en un pour en choisir un autre.`,
  champsVides: (n: number) => `${n} champ${n > 1 ? 's' : ''} encore vide${n > 1 ? 's' : ''}.`,
  vosReponses: 'Vos réponses envoyées',
  nonRenseigne: 'Non renseigné',
}

// Rappels affichés en tête d'épreuve : uniquement des réponses réellement données par l'équipe,
// jamais de préremplissage (CLAUDE.md, section 8). Clé = épreuve affichée.
export const RAPPELS: Record<number, { epreuve: number; champs: string[] }[]> = {
  2: [{ epreuve: 1, champs: ['positionnement', 'opportunite'] }],
  3: [{ epreuve: 2, champs: ['concept', 'message', 'canaux', 'actions'] }],
  4: [{ epreuve: 3, champs: ['nouvelleStrategie'] }],
  5: [{ epreuve: 4, champs: ['decision', 'conditions'] }],
  6: [{ epreuve: 4, champs: ['decision'] }, { epreuve: 5, champs: ['message'] }],
}

// ═══ Épreuve 4 — Profils de créateurs de contenu ════════════════════════════
// 5 profils fictifs (types imposés par la fiche), difficulté comparable : chacun a de vrais
// atouts et de vrais risques, aucune décision n'est évidente. Rédigés par Claude Code — À VALIDER.
// Avatars à initiales uniquement (jamais de photo). Tarifs cohérents avec un budget de 60 000 €.
// `reactionCrise` : affichée à l'épreuve 5 UNIQUEMENT si l'équipe a choisi « Accepter » à l'épreuve 4.

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

// ═══ Épreuve 5 — Variantes de crise « copie de design » ═════════════════════
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
      'Croquis de l’IMPACT : premières versions datées du 14 novembre 2024 (archives d’Inès Ferrand).',
      'Dépôt des dessins et modèles à l’INPI : avril 2025.',
      'Premier prototype de l’IMPACT fabriqué par l’atelier portugais : juillet 2025.',
      'Brekko Volt Runner : annonce publique en juin 2025, mise en vente en septembre 2025.',
    ],
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
      'Croquis de la SHADOW : premières versions datées du 3 décembre 2024 (archives d’Inès Ferrand).',
      'Moodboard de conception : architecture contemporaine, sneakers des années 2000, plusieurs modèles monochromes du marché.',
      'Dépôt des dessins et modèles à l’INPI : avril 2025.',
      'Maison Ondrel Eclipse : en vente depuis mars 2023.',
    ],
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
      'Croquis de l’ORIGIN : premières versions datées du 21 octobre 2024 (archives d’Inès Ferrand).',
      'Contrat avec l’atelier portugais : moule de semelle exclusif à STRYDE (article 7).',
      'Dépôt des dessins et modèles à l’INPI : avril 2025.',
      'Solvane Base 01 : en vente depuis 2022.',
    ],
  },
]

// ═══ Épreuve 6 — Alertes de l'ultimatum ═════════════════════════════════════
// Trois alertes simultanées (client, équipe, planning). Elles reprennent UNIQUEMENT des décisions
// réellement prises par l'équipe : si une information manque (champ vide), la formulation reste
// neutre. L'application n'invente jamais une décision. Rédigé par Claude Code — À VALIDER.

export interface ContexteUltimatum {
  createur?: string
  decisionPartenariat?: 'accepter' | 'refuser' | 'negocier'
  modeleCrise?: string
  marqueCrise?: string
  concept?: string
  canaux: string[]
}

const PHRASE_PARTENARIAT: Record<NonNullable<ContexteUltimatum['decisionPartenariat']>, (createur: string) => string> = {
  accepter: c => `Et notre direction s’inquiète du partenariat avec ${c} que vous nous avez recommandé.`,
  refuser: c => `Vous nous avez conseillé de renoncer à ${c} : pendant ce temps, d’autres marques occupent le terrain.`,
  negocier: c => `La négociation avec ${c} n’avance pas et nous fait perdre du temps.`,
}

export const alertesUltimatum = {
  client: {
    titre: 'Le client menace de changer d’agence',
    texte: (c: ContexteUltimatum) => [
      c.modeleCrise ? `« Les précommandes ont chuté depuis la polémique autour de la ${c.modeleCrise}.` : '« Les précommandes ont chuté depuis le début de la polémique.',
      c.decisionPartenariat && c.createur ? PHRASE_PARTENARIAT[c.decisionPartenariat](c.createur) : '',
      'Si vous ne nous présentez pas un plan crédible aujourd’hui, nous confierons le lancement à une autre agence. »',
    ].filter(Boolean).join(' '),
  },
  equipe: {
    titre: 'Conflit dans l’agence',
    texte: (c: ContexteUltimatum) => [
      c.concept
        ? `Le responsable créatif veut maintenir la campagne telle quelle (« ${c.concept.length > 90 ? `${c.concept.slice(0, 90).trimEnd()}…` : c.concept} ») : « On ne recule pas pour quelques commentaires. »`
        : 'Le responsable créatif veut maintenir la campagne telle quelle : « On ne recule pas pour quelques commentaires. »',
      'Le responsable communication veut tout suspendre tant que la polémique n’est pas réglée.',
      'Ils refusent désormais de travailler ensemble.',
    ].join(' '),
  },
  planning: {
    titre: 'Le lancement est avancé de 7 jours',
    texte: (c: ContexteUltimatum) => [
      'Le client avance la date de lancement d’une semaine.',
      c.canaux.length > 0
        ? `Vos actions prévues sur ${c.canaux.join(', ')} doivent être prêtes 7 jours plus tôt.`
        : 'Toutes vos actions doivent être prêtes 7 jours plus tôt.',
      'Le premier lot de 4 500 paires ne peut pas être augmenté.',
    ].join(' '),
  },
}

// Micro-textes de l'analyse IA — à valider par Stéphanie.
export const textesAnalyse = {
  chargement: 'Votre client analyse vos décisions…',
  titre: 'Conséquences',
  pointFort: 'Point fort',
  pointVigilance: 'Point de vigilance',
  enAttente: 'Analyse en attente. Vos réponses sont conservées : vous pouvez continuer à jouer et relancer l’analyse plus tard.',
  relancer: 'Relancer l’analyse',
  relancesEpuisees: 'Nombre de relances atteint. Prévenez l’intervenante : vos réponses restent conservées.',
  bandeauAttente: (n: number) => `Analyse en attente pour l’épreuve ${n}.`,
}
