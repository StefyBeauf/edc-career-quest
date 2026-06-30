import type { CardType, Track } from '@/types'

export interface Univers2Card {
  id: string
  missionNumber: number
  type: CardType
  content: string
  tags: string[]
}

export interface Univers2Mission {
  number: number
  title: string
  description: string
  availableFor: Track[]
}

export const UNIVERS2_MISSIONS: Univers2Mission[] = [
  {
    number: 1,
    title: 'Régler sa boussole',
    description: 'Réfléchissez à vos compétences, vos qualités, vos motivations et votre projet.',
    availableFor: ['bachelor2', 'pge2'],
  },
  {
    number: 2,
    title: 'Ouvrir son carnet de bord',
    description: 'Comprenez le rôle de LinkedIn, la première impression, et ce qu\'un profil dit de nous.',
    availableFor: ['bachelor2', 'pge2'],
  },
  {
    number: 3,
    title: 'Régler sa longue-vue',
    description: "Optimisez votre profil LinkedIn et votre prise de parole professionnelle.",
    availableFor: ['bachelor2', 'pge2'],
  },
  {
    number: 4,
    title: 'Dossier 4 — Les Pistes',
    description: "Apprenez à dénicher les opportunités là où les autres ne cherchent pas.",
    availableFor: ['pge2'],
  },
  {
    number: 5,
    title: 'Dossier 5 — Les Contacts',
    description: 'Maîtrisez le pitch et la rencontre professionnelle improvisée.',
    availableFor: ['pge2'],
  },
  {
    number: 6,
    title: "Dossier 6 — L'Opportunité",
    description: "Apprenez à décider vite face aux imprévus de la recherche d'emploi.",
    availableFor: ['pge2'],
  },
]

const m1Cards: Univers2Card[] = [
  { id: 'm1-c-1', missionNumber: 1, type: 'conseil', content: "Rédigez votre pitch en 3 phrases : qui vous êtes, ce que vous savez faire, ce que vous cherchez.", tags: ['pitch', 'identité'] },
  { id: 'm1-c-2', missionNumber: 1, type: 'conseil', content: "Identifiez vos 3 compétences distinctives — celles que vos proches reconnaissent chez vous sans que vous le demandiez.", tags: ['compétences', 'forces'] },
  { id: 'm1-c-3', missionNumber: 1, type: 'conseil', content: "Votre identité professionnelle ne se réduit pas à votre diplôme. Intégrez vos expériences associatives, sportives ou personnelles.", tags: ['parcours', 'identité'] },
  { id: 'm1-c-4', missionNumber: 1, type: 'conseil', content: "Testez votre pitch auprès de quelqu'un qui ne connaît pas votre secteur. S'il comprend, vous êtes clair.", tags: ['pitch', 'clarté'] },
  { id: 'm1-c-5', missionNumber: 1, type: 'conseil', content: "Distinguez vos compétences techniques (hard skills) de vos qualités humaines (soft skills). Les deux comptent autant en entretien.", tags: ['compétences', 'entretien'] },
  { id: 'm1-c-6', missionNumber: 1, type: 'conseil', content: "Notez 5 situations où vous avez eu un impact positif. Ce sont les preuves concrètes de votre valeur.", tags: ['preuves', 'impact'] },
  { id: 'm1-c-7', missionNumber: 1, type: 'conseil', content: "Votre valeur n'est pas ce que vous faites, c'est le problème que vous résolvez pour un employeur.", tags: ['valeur', 'employeur'] },
  { id: 'm1-c-8', missionNumber: 1, type: 'conseil', content: "Relisez vos anciens retours de stages, évaluations ou feedbacks. Ils révèlent souvent des forces que vous minimisez.", tags: ['feedback', 'forces'] },
  { id: 'm1-c-9', missionNumber: 1, type: 'conseil', content: "Adaptez votre pitch selon l'interlocuteur : une version pour un RH, une autre pour un manager opérationnel.", tags: ['pitch', 'adaptation'] },
  { id: 'm1-c-10', missionNumber: 1, type: 'conseil', content: "L'authenticité est une compétence rare en entretien. Osez mentionner ce qui vous passionne vraiment.", tags: ['authenticité', 'passion'] },
  { id: 'm1-c-11', missionNumber: 1, type: 'conseil', content: "Construisez une liste de vos réalisations avec la méthode STAR : Situation, Tâche, Action, Résultat.", tags: ['méthode STAR', 'réalisations'] },
  { id: 'm1-c-12', missionNumber: 1, type: 'conseil', content: "Ne cherchez pas à plaire à tout le monde. Définissez le type d'environnement professionnel dans lequel vous vous épanouissez.", tags: ['environnement', 'bien-être'] },

  { id: 'm1-r-1', missionNumber: 1, type: 'réflexion', content: "Si vous deviez choisir 3 mots pour vous décrire professionnellement, lesquels choisiriez-vous — et pourquoi ceux-là ?", tags: ['identité', 'mots-clés'] },
  { id: 'm1-r-2', missionNumber: 1, type: 'réflexion', content: "Quelle est la différence entre le professionnel que vous êtes aujourd'hui et celui que vous souhaitez devenir dans 2 ans ?", tags: ['projection', 'évolution'] },
  { id: 'm1-r-3', missionNumber: 1, type: 'réflexion', content: "Quelles expériences passées ont le plus façonné votre façon de travailler ?", tags: ['expériences', 'influences'] },
  { id: 'm1-r-4', missionNumber: 1, type: 'réflexion', content: "Y a-t-il une compétence que vous sous-estimez chez vous, que les autres semblent apprécier ?", tags: ['compétences', 'regard des autres'] },
  { id: 'm1-r-5', missionNumber: 1, type: 'réflexion', content: "Dans quels contextes vous sentez-vous le plus performant : en équipe, en autonomie, sous pression ?", tags: ['environnement', 'performance'] },
  { id: 'm1-r-6', missionNumber: 1, type: 'réflexion', content: "Qu'est-ce qui vous distingue d'un autre candidat ayant le même diplôme que vous ?", tags: ['différenciation', 'valeur ajoutée'] },
  { id: 'm1-r-7', missionNumber: 1, type: 'réflexion', content: "Quel aspect de votre profil avez-vous tendance à mettre en avant ? Est-ce vraiment votre point le plus fort ?", tags: ['mise en valeur', 'honnêteté'] },
  { id: 'm1-r-8', missionNumber: 1, type: 'réflexion', content: "Si votre meilleur(e) ami(e) devait vous recommander à un recruteur, que dirait-il ou elle de vous ?", tags: ['regard extérieur', 'réputation'] },
  { id: 'm1-r-9', missionNumber: 1, type: 'réflexion', content: "Quelle décision professionnelle vous a le plus appris sur vous-même ?", tags: ['apprentissage', 'décisions'] },
  { id: 'm1-r-10', missionNumber: 1, type: 'réflexion', content: "Y a-t-il une compétence que vous avez développée en dehors de vos études et qui vous semble précieuse ?", tags: ['compétences informelles', 'richesse du parcours'] },

  { id: 'm1-d-1', missionNumber: 1, type: 'défi', content: "En 2 minutes, enregistrez votre pitch vidéo depuis votre téléphone. Regardez-le et identifiez ce que vous changeriez.", tags: ['pitch', 'vidéo', 'pratique'] },
  { id: 'm1-d-2', missionNumber: 1, type: 'défi', content: "Demandez à 3 personnes de votre entourage professionnel de vous décrire en 3 mots. Comparez avec votre propre vision.", tags: ['feedback', '360°'] },
  { id: 'm1-d-3', missionNumber: 1, type: 'défi', content: "Réécrivez votre résumé LinkedIn en vous mettant à la place d'un recruteur qui vous lirait pour la première fois.", tags: ['LinkedIn', 'résumé'] },
  { id: 'm1-d-4', missionNumber: 1, type: 'défi', content: "Listez 5 réalisations concrètes avec des chiffres (résultats, délais, volumes). Entraînez-vous à les raconter en 30 secondes chacune.", tags: ['chiffres', 'réalisations'] },
  { id: 'm1-d-5', missionNumber: 1, type: 'défi', content: "Préparez une réponse à 'Quels sont vos points d'amélioration ?' qui soit honnête sans vous dévaloriser.", tags: ['entretien', 'points faibles'] },
  { id: 'm1-d-6', missionNumber: 1, type: 'défi', content: "Créez une liste de 10 valeurs professionnelles qui comptent pour vous et classez-les par ordre d'importance.", tags: ['valeurs', 'priorités'] },
  { id: 'm1-d-7', missionNumber: 1, type: 'défi', content: "Décrivez votre profil à quelqu'un d'une autre filière sans utiliser le vocabulaire de votre secteur.", tags: ['vulgarisation', 'clarté'] },
  { id: 'm1-d-8', missionNumber: 1, type: 'défi', content: "Identifiez une compétence que vous souhaitez développer dans les 3 prochains mois et proposez un plan d'action concret.", tags: ['développement', 'plan d\'action'] },
  { id: 'm1-d-9', missionNumber: 1, type: 'défi', content: "Simulez une présentation de 2 minutes devant votre groupe. Recueillez un retour sur votre impact et votre clarté.", tags: ['oral', 'feedback'] },
  { id: 'm1-d-10', missionNumber: 1, type: 'défi', content: "Comparez votre CV actuel avec une offre d'emploi cible. Identifiez les écarts et réfléchissez à comment les combler.", tags: ['CV', 'analyse d\'écart'] },

  { id: 'm1-i-1', missionNumber: 1, type: 'inspiration', content: "\"Le plus grand danger pour la plupart d'entre nous n'est pas de viser trop haut et de manquer notre objectif, mais de viser trop bas et de l'atteindre.\" — Michel-Ange", tags: ['ambition', 'objectifs'] },
  { id: 'm1-i-2', missionNumber: 1, type: 'inspiration', content: "Les recruteurs n'embauchent pas des diplômes — ils embauchent des personnes capables de résoudre des problèmes réels.", tags: ['recrutement', 'valeur'] },
  { id: 'm1-i-3', missionNumber: 1, type: 'inspiration', content: "Votre parcours atypique est souvent votre plus grande force. Ce qui semble hors du cadre attire l'attention.", tags: ['différenciation', 'authenticité'] },
  { id: 'm1-i-4', missionNumber: 1, type: 'inspiration', content: "\"Se connaître soi-même est le début de toute sagesse.\" — Aristote. En recrutement aussi, la clarté sur soi est décisive.", tags: ['connaissance de soi', 'sagesse'] },
  { id: 'm1-i-5', missionNumber: 1, type: 'inspiration', content: "Les professionnels les plus accomplis savent expliquer leur valeur simplement. La complexité cache souvent le doute.", tags: ['simplicité', 'clarté'] },
  { id: 'm1-i-6', missionNumber: 1, type: 'inspiration', content: "Votre identité professionnelle évolue à chaque expérience. Ne vous enfermez pas dans une définition trop étroite de vous-même.", tags: ['évolution', 'flexibilité'] },
  { id: 'm1-i-7', missionNumber: 1, type: 'inspiration', content: "\"La confiance, ce n'est pas croire que tout ira bien. C'est savoir qu'on aura les ressources pour affronter ce qui vient.\" — Brené Brown", tags: ['confiance', 'résilience'] },
  { id: 'm1-i-8', missionNumber: 1, type: 'inspiration', content: "Les compétences s'apprennent. Le caractère, lui, se révèle. Les deux sont essentiels dans une carrière.", tags: ['caractère', 'compétences'] },
  { id: 'm1-i-9', missionNumber: 1, type: 'inspiration', content: "Chaque expérience, même courte, vous a appris quelque chose. Votre mission : savoir l'articuler clairement.", tags: ['expérience', 'articulation'] },
  { id: 'm1-i-10', missionNumber: 1, type: 'inspiration', content: "\"Ce que vous êtes résonne si fort que j'entends à peine ce que vous dites.\" — Ralph Waldo Emerson. Votre présence compte.", tags: ['présence', 'impact'] },
]

const m2Cards: Univers2Card[] = [
  { id: 'm2-c-1', missionNumber: 2, type: 'conseil', content: "Optimisez votre profil LinkedIn avec une photo professionnelle, un titre accrocheur et un résumé en première personne.", tags: ['LinkedIn', 'profil'] },
  { id: 'm2-c-2', missionNumber: 2, type: 'conseil', content: "Connectez-vous avec 5 professionnels par semaine dans votre secteur cible. La constance crée le réseau.", tags: ['réseau', 'régularité'] },
  { id: 'm2-c-3', missionNumber: 2, type: 'conseil', content: "Commentez de manière pertinente les publications de professionnels que vous suivez. La visibilité se construit ainsi.", tags: ['visibilité', 'engagement'] },
  { id: 'm2-c-4', missionNumber: 2, type: 'conseil', content: "Participez à des événements professionnels (salons, conférences, afterworks) même virtuels. Chaque échange compte.", tags: ['événements', 'réseau'] },
  { id: 'm2-c-5', missionNumber: 2, type: 'conseil', content: "Votre personal branding repose sur 3 piliers : ce que vous dites, ce que vous faites, et ce que les autres disent de vous.", tags: ['personal branding', 'cohérence'] },
  { id: 'm2-c-6', missionNumber: 2, type: 'conseil', content: "Rédigez un article court sur un sujet de votre secteur. Partager vos connaissances renforce votre crédibilité.", tags: ['contenu', 'expertise'] },
  { id: 'm2-c-7', missionNumber: 2, type: 'conseil', content: "Avant un événement networking, préparez 3 sujets de conversation pertinents et 2 questions ouvertes.", tags: ['préparation', 'networking'] },
  { id: 'm2-c-8', missionNumber: 2, type: 'conseil', content: "Envoyez un message de suivi dans les 48h après une rencontre professionnelle. C'est ce qui transforme un contact en connexion.", tags: ['suivi', 'relation'] },
  { id: 'm2-c-9', missionNumber: 2, type: 'conseil', content: "Demandez des recommandations LinkedIn à vos anciens maîtres de stage ou responsables. Elles valent de l'or.", tags: ['recommandations', 'crédibilité'] },
  { id: 'm2-c-10', missionNumber: 2, type: 'conseil', content: "Votre réseau de proximité (famille, amis, anciens camarades) est souvent sous-exploité. Commencez par là.", tags: ['réseau de proximité', 'démarche'] },
  { id: 'm2-c-11', missionNumber: 2, type: 'conseil', content: "Fixez-vous un objectif de réseau mensuel : X nouvelles connexions, X messages envoyés, X cafés professionnels.", tags: ['objectifs', 'régularité'] },
  { id: 'm2-c-12', missionNumber: 2, type: 'conseil', content: "Votre image en ligne doit être cohérente avec ce que vous projetez en face-à-face. Vérifiez vos réseaux sociaux publics.", tags: ['image en ligne', 'cohérence'] },

  { id: 'm2-r-1', missionNumber: 2, type: 'réflexion', content: "Comment voulez-vous être perçu(e) par quelqu'un qui découvre votre profil LinkedIn pour la première fois ?", tags: ['perception', 'LinkedIn'] },
  { id: 'm2-r-2', missionNumber: 2, type: 'réflexion', content: "Qui sont les 5 personnes de votre réseau actuel avec lesquelles vous ne maintenez pas le contact et que vous devriez recontacter ?", tags: ['réseau', 'relance'] },
  { id: 'm2-r-3', missionNumber: 2, type: 'réflexion', content: "Y a-t-il un domaine d'expertise sur lequel vous pourriez vous positionner progressivement sur les réseaux ?", tags: ['expertise', 'positionnement'] },
  { id: 'm2-r-4', missionNumber: 2, type: 'réflexion', content: "Qu'est-ce qui vous retient de contacter directement un professionnel qui vous inspire ou un recruteur potentiel ?", tags: ['blocages', 'prise de contact'] },
  { id: 'm2-r-5', missionNumber: 2, type: 'réflexion', content: "Si vous n'aviez qu'un seul réseau professionnel en ligne, lequel choisiriez-vous et pourquoi ?", tags: ['réseau', 'stratégie'] },
  { id: 'm2-r-6', missionNumber: 2, type: 'réflexion', content: "Quelle valeur apportez-vous à votre réseau ? Le networking n'est pas seulement recevoir, c'est aussi donner.", tags: ['valeur', 'réciprocité'] },
  { id: 'm2-r-7', missionNumber: 2, type: 'réflexion', content: "Avez-vous des ambassadeurs dans votre réseau — des personnes qui vous recommanderaient spontanément ?", tags: ['ambassadeurs', 'réputation'] },
  { id: 'm2-r-8', missionNumber: 2, type: 'réflexion', content: "Votre présence en ligne reflète-t-elle votre ambition professionnelle ? Ou reste-t-elle trop modeste ?", tags: ['ambition', 'visibilité'] },
  { id: 'm2-r-9', missionNumber: 2, type: 'réflexion', content: "Avez-vous peur d'être trop visible ? D'où vient cette peur et comment pourriez-vous la dépasser ?", tags: ['visibilité', 'blocages'] },
  { id: 'm2-r-10', missionNumber: 2, type: 'réflexion', content: "Dans quelle mesure votre réseau actuel correspond-il à là où vous voulez aller professionnellement ?", tags: ['alignement', 'réseau cible'] },

  { id: 'm2-d-1', missionNumber: 2, type: 'défi', content: "Envoyez 3 messages personnalisés à des professionnels de votre secteur cible sur LinkedIn cette semaine.", tags: ['LinkedIn', 'prise de contact'] },
  { id: 'm2-d-2', missionNumber: 2, type: 'défi', content: "Rédigez un post LinkedIn sur une leçon apprise lors d'une expérience professionnelle. Publiez-le réellement.", tags: ['publication', 'partage'] },
  { id: 'm2-d-3', missionNumber: 2, type: 'défi', content: "Organisez un café (virtuel ou présentiel) avec un(e) ancien(ne) camarade entré(e) dans la vie active. Demandez-lui 3 conseils.", tags: ['networking', 'alumni'] },
  { id: 'm2-d-4', missionNumber: 2, type: 'défi', content: "Réécrivez votre titre LinkedIn pour qu'il décrive ce que vous apportez, pas seulement votre statut étudiant.", tags: ['LinkedIn', 'titre'] },
  { id: 'm2-d-5', missionNumber: 2, type: 'défi', content: "Trouvez un événement professionnel gratuit dans les 2 prochains mois dans votre secteur et inscrivez-vous.", tags: ['événements', 'action'] },
  { id: 'm2-d-6', missionNumber: 2, type: 'défi', content: "Demandez à quelqu'un de votre réseau de vous lire une recommandation LinkedIn en 3 phrases. Utilisez-la pour améliorer votre section 'Infos'.", tags: ['recommandation', 'profil'] },
  { id: 'm2-d-7', missionNumber: 2, type: 'défi', content: "Identifiez 3 entreprises cibles et suivez leurs pages LinkedIn. Interagissez avec leur contenu pendant 2 semaines.", tags: ['veille', 'entreprises cibles'] },
  { id: 'm2-d-8', missionNumber: 2, type: 'défi', content: "Préparez votre pitch de 30 secondes pour vous présenter à un événement réseau. Testez-le avec un(e) camarade.", tags: ['pitch', 'networking'] },
  { id: 'm2-d-9', missionNumber: 2, type: 'défi', content: "Rejoignez un groupe LinkedIn ou une communauté en ligne de votre secteur et participez à une discussion.", tags: ['communauté', 'engagement'] },
  { id: 'm2-d-10', missionNumber: 2, type: 'défi', content: "Créez une liste de vos 10 contacts les plus stratégiques et planifiez comment les entretenir dans les 3 prochains mois.", tags: ['stratégie', 'contacts clés'] },

  { id: 'm2-i-1', missionNumber: 2, type: 'inspiration', content: "\"Votre réseau est votre valeur nette.\" — Porter Gale. Les opportunités naissent presque toujours d'une relation.", tags: ['réseau', 'valeur'] },
  { id: 'm2-i-2', missionNumber: 2, type: 'inspiration', content: "80% des emplois ne sont jamais publiés. Ils se pourvient par recommandation. Votre réseau est votre accès à ce marché caché.", tags: ['marché caché', 'réseau'] },
  { id: 'm2-i-3', missionNumber: 2, type: 'inspiration', content: "Le personal branding n'est pas une question d'égo — c'est rendre visible votre contribution potentielle pour ceux qui en ont besoin.", tags: ['personal branding', 'utilité'] },
  { id: 'm2-i-4', missionNumber: 2, type: 'inspiration', content: "\"Les gens oublieront ce que vous avez dit, mais ils n'oublieront jamais ce que vous leur avez fait ressentir.\" — Maya Angelou", tags: ['relation', 'impact émotionnel'] },
  { id: 'm2-i-5', missionNumber: 2, type: 'inspiration', content: "Les meilleures carrières se construisent dans la durée, grâce à des relations de confiance tissées patiemment.", tags: ['patience', 'confiance'] },
  { id: 'm2-i-6', missionNumber: 2, type: 'inspiration', content: "Un profil LinkedIn actif et cohérent travaille pour vous 24h/24, même quand vous dormez.", tags: ['LinkedIn', 'présence en ligne'] },
  { id: 'm2-i-7', missionNumber: 2, type: 'inspiration', content: "\"Donnez d'abord. Donnez souvent. Les retours viendront — toujours.\" — principe fondamental du networking durable.", tags: ['générosité', 'networking'] },
  { id: 'm2-i-8', missionNumber: 2, type: 'inspiration', content: "Un inconnu bien contacté peut devenir un mentor, un recruteur ou un associé. Une connexion timide ne devient rien.", tags: ['audace', 'opportunités'] },
  { id: 'm2-i-9', missionNumber: 2, type: 'inspiration', content: "Votre réputation professionnelle se construit bien avant votre premier emploi. Commencez dès aujourd'hui.", tags: ['réputation', 'anticipation'] },
  { id: 'm2-i-10', missionNumber: 2, type: 'inspiration', content: "Le networking n'est pas du démarchage — c'est créer des ponts entre des personnes qui peuvent s'apporter mutuellement.", tags: ['mindset', 'réseau'] },
]

const m3Cards: Univers2Card[] = [
  { id: 'm3-c-1', missionNumber: 3, type: 'conseil', content: "Définissez votre cible avec précision : secteur, taille d'entreprise, zone géographique, type de poste. Plus vous êtes précis, plus vous êtes efficace.", tags: ['ciblage', 'stratégie'] },
  { id: 'm3-c-2', missionNumber: 3, type: 'conseil', content: "Candidatez en priorité via votre réseau (60%), puis les candidatures spontanées (25%), puis les offres publiées (15%).", tags: ['priorités', 'méthodes'] },
  { id: 'm3-c-3', missionNumber: 3, type: 'conseil', content: "Adaptez votre CV et lettre de motivation à chaque offre. Un CV générique obtient peu de réponses.", tags: ['CV', 'personnalisation'] },
  { id: 'm3-c-4', missionNumber: 3, type: 'conseil', content: "Fixez-vous des objectifs hebdomadaires de recherche : X candidatures, X relances, X prises de contact réseau.", tags: ['organisation', 'objectifs'] },
  { id: 'm3-c-5', missionNumber: 3, type: 'conseil', content: "Utilisez un tableau de suivi (Excel, Notion) pour tracer chaque candidature : date, entreprise, contact, statut, relance.", tags: ['organisation', 'suivi'] },
  { id: 'm3-c-6', missionNumber: 3, type: 'conseil', content: "Avant un entretien, préparez 5 questions pertinentes sur le poste, l'équipe et la culture d'entreprise.", tags: ['entretien', 'préparation'] },
  { id: 'm3-c-7', missionNumber: 3, type: 'conseil', content: "Renseignez-vous sur l'entreprise au-delà du site officiel : actualités, avis salariés, publications des dirigeants.", tags: ['recherche', 'entreprise'] },
  { id: 'm3-c-8', missionNumber: 3, type: 'conseil', content: "Relancez systématiquement après 7 à 10 jours sans réponse. La plupart des candidats ne le font pas — c'est un avantage.", tags: ['relance', 'persévérance'] },
  { id: 'm3-c-9', missionNumber: 3, type: 'conseil', content: "Préparez votre entretien en simulant les 5 questions les plus fréquentes : présentation, motivation, points forts/faibles, projet professionnel, questions.", tags: ['entretien', 'simulation'] },
  { id: 'm3-c-10', missionNumber: 3, type: 'conseil', content: "La lettre de motivation doit répondre à une seule question : pourquoi vous, pour ce poste, dans cette entreprise ?", tags: ['motivation', 'lettre'] },
  { id: 'm3-c-11', missionNumber: 3, type: 'conseil', content: "Consultez les rapports d'activité et les offres d'emploi en interne des entreprises cibles pour comprendre leurs enjeux actuels.", tags: ['veille', 'entreprises'] },
  { id: 'm3-c-12', missionNumber: 3, type: 'conseil', content: "Ne négligez pas les cabinets de recrutement spécialisés dans votre secteur — ils ont accès à des offres non publiées.", tags: ['cabinets', 'offres cachées'] },

  { id: 'm3-r-1', missionNumber: 3, type: 'réflexion', content: "Avez-vous une stratégie de recherche ou répondez-vous à des offres au fil de l'eau, sans cap défini ?", tags: ['stratégie', 'structure'] },
  { id: 'm3-r-2', missionNumber: 3, type: 'réflexion', content: "Quelle est votre vraie motivation pour ce type de poste — et comment la formuleriez-vous de manière convaincante en entretien ?", tags: ['motivation', 'authenticité'] },
  { id: 'm3-r-3', missionNumber: 3, type: 'réflexion', content: "Après plusieurs refus, comment gardez-vous votre énergie et votre confiance intactes ?", tags: ['résilience', 'mindset'] },
  { id: 'm3-r-4', missionNumber: 3, type: 'réflexion', content: "Y a-t-il des secteurs ou des types de postes que vous n'avez pas explorés et qui pourraient vous correspondre ?", tags: ['ouverture', 'exploration'] },
  { id: 'm3-r-5', missionNumber: 3, type: 'réflexion', content: "Qu'est-ce que vous cherchez au-delà du salaire : l'apprentissage, l'impact, l'autonomie, la stabilité ?", tags: ['valeurs', 'motivations profondes'] },
  { id: 'm3-r-6', missionNumber: 3, type: 'réflexion', content: "Avez-vous des critères non-négociables pour un emploi ? Avez-vous vraiment réfléchi à ce qui est indispensable vs. souhaitable ?", tags: ['critères', 'priorités'] },
  { id: 'm3-r-7', missionNumber: 3, type: 'réflexion', content: "En quoi votre stratégie de recherche actuelle est-elle cohérente avec votre projet professionnel à 2-3 ans ?", tags: ['cohérence', 'projet'] },
  { id: 'm3-r-8', missionNumber: 3, type: 'réflexion', content: "Quel est le poste de rêve auquel vous n'osez pas postuler ? Qu'est-ce qui vous en empêche réellement ?", tags: ['ambition', 'blocages'] },
  { id: 'm3-r-9', missionNumber: 3, type: 'réflexion', content: "Si votre recherche d'emploi était une campagne marketing, quel serait votre message central et votre audience cible ?", tags: ['stratégie', 'marketing personnel'] },
  { id: 'm3-r-10', missionNumber: 3, type: 'réflexion', content: "Avez-vous un plan B si votre stratégie principale ne donne pas de résultats dans les 3 prochains mois ?", tags: ['plan B', 'adaptabilité'] },

  { id: 'm3-d-1', missionNumber: 3, type: 'défi', content: "Créez un tableau de suivi de candidatures avec 5 colonnes : entreprise, poste, date, statut, prochaine action. Remplissez-le avec vos 10 candidatures prioritaires.", tags: ['organisation', 'tableau de bord'] },
  { id: 'm3-d-2', missionNumber: 3, type: 'défi', content: "Réécrivez votre CV en utilisant des verbes d'action percutants et des résultats quantifiés pour chaque expérience.", tags: ['CV', 'impact'] },
  { id: 'm3-d-3', missionNumber: 3, type: 'défi', content: "Envoyez une candidature spontanée à une entreprise qui vous attire, même sans offre publiée. Personnalisez votre approche.", tags: ['candidature spontanée', 'audace'] },
  { id: 'm3-d-4', missionNumber: 3, type: 'défi', content: "Préparez votre présentation de 2 minutes chronométrée. Entraînez-vous jusqu'à ce qu'elle soit fluide et naturelle.", tags: ['entretien', 'présentation'] },
  { id: 'm3-d-5', missionNumber: 3, type: 'défi', content: "Faites un entretien blanc avec quelqu'un qui vous donnera un retour honnête. Demandez-lui spécifiquement ce qui manque de conviction.", tags: ['entretien blanc', 'feedback'] },
  { id: 'm3-d-6', missionNumber: 3, type: 'défi', content: "Identifiez une offre d'emploi, trouvez le nom du manager responsable du recrutement et contactez-le directement via LinkedIn.", tags: ['approche directe', 'LinkedIn'] },
  { id: 'm3-d-7', missionNumber: 3, type: 'défi', content: "Relancez 3 candidatures déposées il y a plus de 10 jours sans réponse. Personnalisez chaque message de relance.", tags: ['relance', 'persévérance'] },
  { id: 'm3-d-8', missionNumber: 3, type: 'défi', content: "Analysez 3 offres d'emploi de votre secteur cible. Identifiez les compétences récurrentes que vous devez mettre en avant.", tags: ['analyse', 'compétences clés'] },
  { id: 'm3-d-9', missionNumber: 3, type: 'défi', content: "Préparez vos réponses aux 3 questions pièges classiques : 'Où vous voyez-vous dans 5 ans ?', 'Pourquoi avez-vous quitté votre dernier poste ?', 'Quelles sont vos prétentions salariales ?'", tags: ['entretien', 'questions difficiles'] },
  { id: 'm3-d-10', missionNumber: 3, type: 'défi', content: "Demandez à un professionnel de votre réseau de relire votre CV et votre profil LinkedIn en 15 minutes et de vous donner 3 retours actionnables.", tags: ['CV', 'review'] },

  { id: 'm3-i-1', missionNumber: 3, type: 'inspiration', content: "\"La chance, c'est quand la préparation rencontre l'opportunité.\" — Sénèque. Préparez-vous, les opportunités viendront.", tags: ['préparation', 'chance'] },
  { id: 'm3-i-2', missionNumber: 3, type: 'inspiration', content: "La recherche d'emploi est un sprint de longue durée — la constance et la méthode battront toujours l'intensité éphémère.", tags: ['méthode', 'constance'] },
  { id: 'm3-i-3', missionNumber: 3, type: 'inspiration', content: "Chaque entretien raté est un entraînement gratuit. Les candidats les plus performants ont souvent le plus d'entretiens derrière eux.", tags: ['apprentissage', 'résilience'] },
  { id: 'm3-i-4', missionNumber: 3, type: 'inspiration', content: "\"Le succès, c'est aller d'échec en échec sans perdre son enthousiasme.\" — Winston Churchill", tags: ['résilience', 'enthousiasme'] },
  { id: 'm3-i-5', missionNumber: 3, type: 'inspiration', content: "Un refus n'est jamais définitif. Certains professionnels ont été embauchés par une entreprise qui les avait d'abord refusés.", tags: ['refus', 'persistance'] },
  { id: 'm3-i-6', missionNumber: 3, type: 'inspiration', content: "La meilleure lettre de motivation est celle qui prouve que vous connaissez l'entreprise mieux que les autres candidats.", tags: ['lettres', 'différenciation'] },
  { id: 'm3-i-7', missionNumber: 3, type: 'inspiration', content: "Vous ne cherchez pas un emploi — vous cherchez l'environnement professionnel dans lequel vous vous épanouirez. Ce recadrage change tout.", tags: ['mindset', 'épanouissement'] },
  { id: 'm3-i-8', missionNumber: 3, type: 'inspiration', content: "Les meilleurs candidats n'attendent pas les offres — ils créent leur opportunité par la proactivité et la connexion.", tags: ['proactivité', 'opportunités'] },
  { id: 'm3-i-9', missionNumber: 3, type: 'inspiration', content: "\"Votre CV n'est pas vous. Il est une invitation à vous rencontrer.\" Soignez-le, mais surtout préparez la rencontre.", tags: ['CV', 'entretien'] },
  { id: 'm3-i-10', missionNumber: 3, type: 'inspiration', content: "Chaque 'non' vous rapproche du bon 'oui'. La recherche d'emploi est un jeu de nombres, mais aussi de qualité.", tags: ['persévérance', 'qualité'] },
]

const m4Cards: Univers2Card[] = [
  { id: 'm4-c-1', missionNumber: 4, type: 'conseil', content: "Ne donnez jamais votre fourchette salariale en premier. Laissez l'employeur poser ses chiffres avant de répondre.", tags: ['négociation', 'salaire'] },
  { id: 'm4-c-2', missionNumber: 4, type: 'conseil', content: "Préparez votre négociation avec 3 niveaux : objectif idéal, objectif réaliste, minimum acceptable. Ne descendez jamais sous le minimum.", tags: ['préparation', 'fourchette'] },
  { id: 'm4-c-3', missionNumber: 4, type: 'conseil', content: "Négociez toujours après avoir reçu une offre, jamais avant. Une offre prouve que vous êtes désiré — c'est le moment de force.", tags: ['timing', 'offre'] },
  { id: 'm4-c-4', missionNumber: 4, type: 'conseil', content: "Au-delà du salaire, négociez le package global : jours de télétravail, titre de poste, formation, variable, avantages.", tags: ['package', 'négociation globale'] },
  { id: 'm4-c-5', missionNumber: 4, type: 'conseil', content: "Justifiez votre demande salariale avec des données de marché, pas avec vos besoins personnels. Les recruteurs répondent aux arguments objectifs.", tags: ['justification', 'données marché'] },
  { id: 'm4-c-6', missionNumber: 4, type: 'conseil', content: "Entraînez-vous à accepter le silence lors d'une négociation. Celui qui parle en premier après une proposition perd souvent du terrain.", tags: ['silence', 'tactique'] },
  { id: 'm4-c-7', missionNumber: 4, type: 'conseil', content: "Si l'offre est en dessous de vos attentes, demandez : 'Quelle est la marge de manœuvre sur ce point ?' plutôt que 'C'est trop peu.'", tags: ['formulation', 'dialogue'] },
  { id: 'm4-c-8', missionNumber: 4, type: 'conseil', content: "Consultez des sources fiables (Glassdoor, LinkedIn Salary, APEC, enquêtes sectorielles) pour connaître le marché avant de négocier.", tags: ['veille salariale', 'préparation'] },
  { id: 'm4-c-9', missionNumber: 4, type: 'conseil', content: "La phase de closing est aussi importante que la négociation. Récapitulez par écrit ce qui a été convenu pour éviter les malentendus.", tags: ['closing', 'confirmation écrite'] },
  { id: 'm4-c-10', missionNumber: 4, type: 'conseil', content: "Une contre-offre de votre employeur actuel, après une démission, doit être acceptée avec prudence. Les raisons qui vous ont fait partir restent souvent.", tags: ['contre-offre', 'fidélisation'] },
  { id: 'm4-c-11', missionNumber: 4, type: 'conseil', content: "Après une négociation réussie, restez professionnel et chaleureux. La relation de travail commence dès cet échange.", tags: ['relation', 'professionnalisme'] },
  { id: 'm4-c-12', missionNumber: 4, type: 'conseil', content: "Si vous avez plusieurs offres, vous avez un levier de négociation puissant. Utilisez-le avec honnêteté et discrétion.", tags: ['multi-offres', 'levier'] },

  { id: 'm4-r-1', missionNumber: 4, type: 'réflexion', content: "Êtes-vous à l'aise à l'idée de parler d'argent en entretien ? D'où vient ce confort ou cet inconfort ?", tags: ['argent', 'blocages'] },
  { id: 'm4-r-2', missionNumber: 4, type: 'réflexion', content: "Connaissez-vous votre valeur marchande réelle dans votre secteur et pour votre niveau d'expérience ?", tags: ['valeur', 'marché'] },
  { id: 'm4-r-3', missionNumber: 4, type: 'réflexion', content: "Avez-vous déjà renoncé à négocier de peur de froisser l'employeur ? Qu'est-ce que cela vous a coûté ?", tags: ['renoncement', 'coût'] },
  { id: 'm4-r-4', missionNumber: 4, type: 'réflexion', content: "Quelle est la différence entre négocier et marchander ? Pourquoi cette distinction est-elle importante en contexte professionnel ?", tags: ['négociation', 'valeur'] },
  { id: 'm4-r-5', missionNumber: 4, type: 'réflexion', content: "Si vous deviez décrire votre style de négociation naturel, comment le qualifieriez-vous ? Comment l'améliorer ?", tags: ['style', 'auto-évaluation'] },
  { id: 'm4-r-6', missionNumber: 4, type: 'réflexion', content: "Comment différenciez-vous vos non-négociables de vos préférences lors d'une discussion sur les conditions d'un poste ?", tags: ['critères', 'priorités'] },
  { id: 'm4-r-7', missionNumber: 4, type: 'réflexion', content: "Pensez-vous que négocier agresse la relation avec l'employeur — ou au contraire, qu'est-ce que cela signale sur vous ?", tags: ['relation', 'perception'] },
  { id: 'm4-r-8', missionNumber: 4, type: 'réflexion', content: "Comment évalueriez-vous le risque vs. le bénéfice de demander 10% de plus que ce qui vous est proposé ?", tags: ['risque', 'bénéfice'] },
  { id: 'm4-r-9', missionNumber: 4, type: 'réflexion', content: "Avez-vous une stratégie pour négocier dans un secteur où les salaires sont peu transparents ?", tags: ['transparence', 'stratégie'] },
  { id: 'm4-r-10', missionNumber: 4, type: 'réflexion', content: "Quel impact aurait une meilleure négociation dès votre premier CDI sur l'ensemble de votre carrière financière ?", tags: ['impact long terme', 'rémunération'] },

  { id: 'm4-d-1', missionNumber: 4, type: 'défi', content: "Simulez une négociation salariale en binôme. Un joue le recruteur, l'autre le candidat. Inversez les rôles.", tags: ['jeu de rôle', 'négociation'] },
  { id: 'm4-d-2', missionNumber: 4, type: 'défi', content: "Recherchez les salaires moyens pour 3 postes que vous ciblez sur Glassdoor, LinkedIn et APEC. Établissez votre fourchette cible.", tags: ['salaire', 'benchmark'] },
  { id: 'm4-d-3', missionNumber: 4, type: 'défi', content: "Préparez 5 arguments factuels pour justifier un salaire supérieur de 10% à la moyenne du marché pour votre profil.", tags: ['arguments', 'valeur ajoutée'] },
  { id: 'm4-d-4', missionNumber: 4, type: 'défi', content: "Entraînez-vous à répondre à 'Quelles sont vos prétentions ?' avec 3 formulations différentes. Identifiez la plus efficace.", tags: ['prétentions', 'formulation'] },
  { id: 'm4-d-5', missionNumber: 4, type: 'défi', content: "Listez 5 avantages non salariaux que vous pourriez négocier et hiérarchisez-les selon votre priorité personnelle.", tags: ['avantages', 'package'] },
  { id: 'm4-d-6', missionNumber: 4, type: 'défi', content: "Demandez à un professionnel de votre réseau de vous expliquer comment il a négocié son dernier contrat. Tirez-en 3 leçons.", tags: ['témoignage', 'apprentissage'] },
  { id: 'm4-d-7', missionNumber: 4, type: 'défi', content: "Écrivez un script de 5 phrases pour annoncer une contre-proposition salariale de manière assertive et bienveillante.", tags: ['script', 'assertivité'] },
  { id: 'm4-d-8', missionNumber: 4, type: 'défi', content: "Préparez votre réponse à : 'Nous n'avons pas de budget pour aller plus haut.' Trouvez 3 réponses possibles qui maintiennent le dialogue.", tags: ['objections', 'réponses'] },
  { id: 'm4-d-9', missionNumber: 4, type: 'défi', content: "Rédigez le récapitulatif d'une offre reçue par email, avec toutes les conditions négociées. Exercice de formulation écrite.", tags: ['récapitulatif', 'écrit professionnel'] },
  { id: 'm4-d-10', missionNumber: 4, type: 'défi', content: "Identifiez une situation passée où vous avez mal négocié. Écrivez ce que vous feriez différemment aujourd'hui.", tags: ['retour d\'expérience', 'amélioration'] },

  { id: 'm4-i-1', missionNumber: 4, type: 'inspiration', content: "\"Vous n'obtenez pas ce que vous méritez — vous obtenez ce que vous négociez.\" — Chester L. Karrass", tags: ['négociation', 'mérite'] },
  { id: 'm4-i-2', missionNumber: 4, type: 'inspiration', content: "Ne jamais négocier est toujours une erreur. Le pire qu'on puisse vous dire, c'est non — et vous êtes déjà là.", tags: ['audace', 'risque'] },
  { id: 'm4-i-3', missionNumber: 4, type: 'inspiration', content: "Les personnes qui négocient leur salaire à l'embauche gagnent en moyenne 1 million d'euros de plus sur l'ensemble de leur carrière.", tags: ['impact financier', 'long terme'] },
  { id: 'm4-i-4', missionNumber: 4, type: 'inspiration', content: "\"La négociation est l'art de laisser l'autre obtenir ce dont il a besoin pendant que vous obtenez ce que vous voulez.\" — Daniele Trevisani", tags: ['win-win', 'négociation'] },
  { id: 'm4-i-5', missionNumber: 4, type: 'inspiration', content: "Les meilleurs négociateurs ne sont pas les plus agressifs — ce sont ceux qui écoutent le plus et comprennent les besoins de l'autre partie.", tags: ['écoute', 'empathie'] },
  { id: 'm4-i-6', missionNumber: 4, type: 'inspiration', content: "Négocier n'est pas un combat — c'est une conversation sur la valeur. Restez curieux, pas défensif.", tags: ['état d\'esprit', 'valeur'] },
  { id: 'm4-i-7', missionNumber: 4, type: 'inspiration', content: "Votre premier salaire est une ancre. Plus il est haut, plus toutes vos futures augmentations partiront d'une base solide.", tags: ['ancrage', 'premier salaire'] },
  { id: 'm4-i-8', missionNumber: 4, type: 'inspiration', content: "\"Se taire au bon moment est aussi puissant que parler au bon moment.\" Dans une négociation, le silence est un outil.", tags: ['silence', 'pouvoir'] },
  { id: 'm4-i-9', missionNumber: 4, type: 'inspiration', content: "Une négociation réussie laisse les deux parties satisfaites. C'est le signe d'un accord durable et d'une relation de confiance.", tags: ['relation', 'accord'] },
  { id: 'm4-i-10', missionNumber: 4, type: 'inspiration', content: "Les meilleures opportunités professionnelles se closent toujours avec une décision claire et rapide. L'hésitation coûte.", tags: ['décision', 'closing'] },
]

const m5Cards: Univers2Card[] = [
  { id: 'm5-c-1', missionNumber: 5, type: 'conseil', content: "Un bon leader commence par se connaître. Identifiez votre style naturel de management avant d'adapter votre approche.", tags: ['leadership', 'connaissance de soi'] },
  { id: 'm5-c-2', missionNumber: 5, type: 'conseil', content: "Le feedback régulier est la base de tout management efficace. Donnez-en et demandez-en systématiquement.", tags: ['feedback', 'management'] },
  { id: 'm5-c-3', missionNumber: 5, type: 'conseil', content: "Distinguez management et leadership : le management est une fonction, le leadership est une posture. Les deux sont nécessaires.", tags: ['distinction', 'posture'] },
  { id: 'm5-c-4', missionNumber: 5, type: 'conseil', content: "Apprenez à déléguer sans micromanager. Fixez des objectifs clairs et faites confiance à l'exécution.", tags: ['délégation', 'confiance'] },
  { id: 'm5-c-5', missionNumber: 5, type: 'conseil', content: "La communication est votre outil de leadership le plus puissant. Soignez votre clarté, votre écoute et votre cohérence.", tags: ['communication', 'clarté'] },
  { id: 'm5-c-6', missionNumber: 5, type: 'conseil', content: "Adaptez votre style de management à la maturité de chaque collaborateur (situationnel : directif, persuasif, participatif, délégatif).", tags: ['management situationnel', 'adaptation'] },
  { id: 'm5-c-7', missionNumber: 5, type: 'conseil', content: "Gérez vos émotions avant de gérer celles de votre équipe. L'intelligence émotionnelle est le socle du leadership.", tags: ['intelligence émotionnelle', 'émotions'] },
  { id: 'm5-c-8', missionNumber: 5, type: 'conseil', content: "Créez un environnement psychologiquement sûr où l'erreur est un vecteur d'apprentissage, pas une source de punition.", tags: ['sécurité psychologique', 'erreur'] },
  { id: 'm5-c-9', missionNumber: 5, type: 'conseil', content: "Un leader efficace fixe une vision claire, aligne son équipe sur les priorités et enlève les obstacles à la performance.", tags: ['vision', 'performance'] },
  { id: 'm5-c-10', missionNumber: 5, type: 'conseil', content: "Célébrez les succès collectifs avant les succès individuels. La culture d'équipe se construit dans les moments de victoire partagée.", tags: ['équipe', 'célébration'] },
  { id: 'm5-c-11', missionNumber: 5, type: 'conseil', content: "Le conflit bien géré renforce une équipe. Fuyez-le et il s'accumule ; affrontez-le avec méthode et il devient levier.", tags: ['conflit', 'gestion'] },
  { id: 'm5-c-12', missionNumber: 5, type: 'conseil', content: "Investissez dans le développement de vos collaborateurs. Un manager qui fait grandir son équipe est toujours plus performant.", tags: ['développement', 'équipe'] },

  { id: 'm5-r-1', missionNumber: 5, type: 'réflexion', content: "Quel type de manager avez-vous eu qui vous a le plus marqué positivement — et pourquoi ?", tags: ['modèles', 'inspiration'] },
  { id: 'm5-r-2', missionNumber: 5, type: 'réflexion', content: "Quelles sont vos forces naturelles en tant que potentiel leader ? Quels sont vos angles morts ?", tags: ['forces', 'angles morts'] },
  { id: 'm5-r-3', missionNumber: 5, type: 'réflexion', content: "Comment réagissez-vous face à un collaborateur qui ne performe pas ? Est-ce votre réaction par défaut ou votre meilleure réaction ?", tags: ['performance', 'réaction'] },
  { id: 'm5-r-4', missionNumber: 5, type: 'réflexion', content: "En quoi être manager serait-il différent d'être expert individuel ? Êtes-vous prêt(e) à ce changement de posture ?", tags: ['transition', 'posture'] },
  { id: 'm5-r-5', missionNumber: 5, type: 'réflexion', content: "Comment définissez-vous la confiance dans une relation managériale ? Comment la construire, comment la perdre ?", tags: ['confiance', 'relation'] },
  { id: 'm5-r-6', missionNumber: 5, type: 'réflexion', content: "Avez-vous déjà eu à recadrer quelqu'un ? Comment s'est passé cet échange ? Qu'avez-vous appris ?", tags: ['recadrage', 'apprentissage'] },
  { id: 'm5-r-7', missionNumber: 5, type: 'réflexion', content: "Quelle est la différence entre être apprécié de son équipe et être respecté ? Les deux sont-ils compatibles ?", tags: ['appréciation', 'respect'] },
  { id: 'm5-r-8', missionNumber: 5, type: 'réflexion', content: "Comment gérez-vous la pression quand elle vient d'en haut et que vous devez la filtrer pour votre équipe ?", tags: ['pression', 'protection d\'équipe'] },
  { id: 'm5-r-9', missionNumber: 5, type: 'réflexion', content: "Qu'est-ce qui vous motive davantage : performer vous-même ou voir votre équipe performer grâce à vous ?", tags: ['motivation', 'équipe'] },
  { id: 'm5-r-10', missionNumber: 5, type: 'réflexion', content: "Si vous deviez choisir entre un bon leader charismatique et un bon manager méthodique, lequel serait le plus utile à votre équipe ? Pourquoi ?", tags: ['leadership', 'management'] },

  { id: 'm5-d-1', missionNumber: 5, type: 'défi', content: "Faites le test DISC ou MBTI (versions gratuites en ligne). Analysez comment votre profil influence votre style managérial.", tags: ['profil', 'test'] },
  { id: 'm5-d-2', missionNumber: 5, type: 'défi', content: "Préparez un brief de mission clair pour un projet fictif : objectif, délai, ressources, livrables. Testez votre capacité à déléguer par l'écrit.", tags: ['brief', 'délégation'] },
  { id: 'm5-d-3', missionNumber: 5, type: 'défi', content: "Simulez un entretien de feedback difficile en binôme. Donnez un retour constructif sur un problème de performance fictif.", tags: ['feedback', 'simulation'] },
  { id: 'm5-d-4', missionNumber: 5, type: 'défi', content: "Rédigez votre 'manifeste de leadership' en 10 lignes : vos valeurs, votre vision du management, ce que vous garantissez à votre équipe.", tags: ['manifeste', 'valeurs'] },
  { id: 'm5-d-5', missionNumber: 5, type: 'défi', content: "Lisez un article sur le management situationnel (Hersey & Blanchard). Appliquez le modèle à une situation réelle ou fictive de votre groupe.", tags: ['management situationnel', 'application'] },
  { id: 'm5-d-6', missionNumber: 5, type: 'défi', content: "Interviewez un manager de votre entourage sur sa première expérience de management. Identifiez 3 erreurs à ne pas reproduire.", tags: ['interview', 'apprentissage'] },
  { id: 'm5-d-7', missionNumber: 5, type: 'défi', content: "Gérez un scénario de conflit d'équipe fictif en groupe. Utilisez une méthode de médiation structurée et débriefez collectivement.", tags: ['conflit', 'médiation'] },
  { id: 'm5-d-8', missionNumber: 5, type: 'défi', content: "Préparez un onboarding de 3 jours pour un nouveau collaborateur fictif. Qu'est-ce qui compte vraiment dans les 72 premières heures ?", tags: ['onboarding', 'accueil'] },
  { id: 'm5-d-9', missionNumber: 5, type: 'défi', content: "Identifiez 3 leaders qui vous inspirent (vivants ou historiques) et listez les traits communs qui font leur efficacité.", tags: ['modèles', 'traits de leadership'] },
  { id: 'm5-d-10', missionNumber: 5, type: 'défi', content: "Préparez une réunion d'équipe de 20 minutes avec un ordre du jour clair, un objectif précis et un plan pour impliquer tous les participants.", tags: ['réunion', 'animation'] },

  { id: 'm5-i-1', missionNumber: 5, type: 'inspiration', content: "\"Le vrai leadership, c'est inspirer les gens à faire ce qui doit être fait, même quand c'est difficile.\" — Tim Cook", tags: ['leadership', 'inspiration'] },
  { id: 'm5-i-2', missionNumber: 5, type: 'inspiration', content: "\"Le management consiste à faire bien ce qui doit être fait. Le leadership consiste à décider ce qui doit être fait.\" — Peter Drucker", tags: ['management', 'leadership'] },
  { id: 'm5-i-3', missionNumber: 5, type: 'inspiration', content: "Les équipes les plus performantes ont en commun une chose : un leader qui sait écouter avant d'agir.", tags: ['écoute', 'performance'] },
  { id: 'm5-i-4', missionNumber: 5, type: 'inspiration', content: "\"Si vos actions inspirent les autres à rêver plus, apprendre plus, faire plus et devenir plus, alors vous êtes un leader.\" — John Quincy Adams", tags: ['inspiration', 'impact'] },
  { id: 'm5-i-5', missionNumber: 5, type: 'inspiration', content: "Les meilleurs managers ont souvent été des collaborateurs frustrés par un mauvais management. Ils ont décidé de faire différemment.", tags: ['expérience', 'motivation'] },
  { id: 'm5-i-6', missionNumber: 5, type: 'inspiration', content: "\"La culture d'entreprise, c'est ce qui se passe quand personne ne regarde.\" — Ben Horowitz. Elle se construit dans les petits actes quotidiens.", tags: ['culture', 'actes'] },
  { id: 'm5-i-7', missionNumber: 5, type: 'inspiration', content: "Un leader sûr de lui donne du crédit à son équipe. Un leader insécure garde le crédit pour lui. La différence se voit.", tags: ['insécurité', 'crédit'] },
  { id: 'm5-i-8', missionNumber: 5, type: 'inspiration', content: "\"Les gens ne quittent pas les entreprises, ils quittent leurs managers.\" — Gallup. Un bon manager retient les talents.", tags: ['rétention', 'talent'] },
  { id: 'm5-i-9', missionNumber: 5, type: 'inspiration', content: "Le leadership s'apprend. Ce n'est pas inné. Les leaders les plus accomplis ont tous eu des mentors, des erreurs et du temps.", tags: ['apprentissage', 'progression'] },
  { id: 'm5-i-10', missionNumber: 5, type: 'inspiration', content: "\"Seul on va plus vite, ensemble on va plus loin.\" — Proverbe africain. Le vrai leader choisit le 'loin' plutôt que le 'vite'.", tags: ['collaboration', 'vision'] },
]

const m6Cards: Univers2Card[] = [
  { id: 'm6-c-1', missionNumber: 6, type: 'conseil', content: "Définissez votre vision à 10 ans non pas comme un poste précis, mais comme un impact que vous voulez avoir dans votre secteur.", tags: ['vision', 'impact'] },
  { id: 'm6-c-2', missionNumber: 6, type: 'conseil', content: "Planifiez votre carrière par jalons de 3 ans : chaque étape doit vous rapprocher de votre vision long terme.", tags: ['jalons', 'planification'] },
  { id: 'm6-c-3', missionNumber: 6, type: 'conseil', content: "Investissez dans votre apprentissage continu : une compétence acquise chaque trimestre change radicalement votre trajectoire sur 10 ans.", tags: ['apprentissage', 'investissement'] },
  { id: 'm6-c-4', missionNumber: 6, type: 'conseil', content: "Identifiez vos sponsors potentiels : des leaders influents qui croient en vous et peuvent ouvrir des portes. Cultivez ces relations.", tags: ['sponsors', 'influence'] },
  { id: 'm6-c-5', missionNumber: 6, type: 'conseil', content: "Restez ouvert aux pivots de carrière. Les meilleures trajectoires ne sont jamais linéaires — elles s'adaptent aux opportunités et aux découvertes.", tags: ['pivot', 'flexibilité'] },
  { id: 'm6-c-6', missionNumber: 6, type: 'conseil', content: "Construisez une expertise rare ou une combinaison de compétences distinctives. La spécialisation protège ; la combinaison créée de la valeur.", tags: ['expertise', 'spécialisation'] },
  { id: 'm6-c-7', missionNumber: 6, type: 'conseil', content: "Évaluez chaque opportunité selon 3 critères : alignement avec votre vision, potentiel d'apprentissage, qualité des personnes autour de vous.", tags: ['évaluation', 'opportunités'] },
  { id: 'm6-c-8', missionNumber: 6, type: 'conseil', content: "Soignez votre réputation dans votre secteur dès le début. Ce que les gens disent de vous en votre absence est votre vraie carte de visite.", tags: ['réputation', 'secteur'] },
  { id: 'm6-c-9', missionNumber: 6, type: 'conseil', content: "Prévoyez des temps de recul réguliers (annuel au minimum) pour évaluer si votre trajectoire est toujours alignée avec vos aspirations.", tags: ['recul', 'alignement'] },
  { id: 'm6-c-10', missionNumber: 6, type: 'conseil', content: "Construisez des compétences financières de base : comprendre un P&L, lire un bilan, parler le langage des chiffres. C'est indispensable au niveau senior.", tags: ['finance', 'compétences clés'] },
  { id: 'm6-c-11', missionNumber: 6, type: 'conseil', content: "Pensez à votre marque employeur personnelle sur le long terme. Soyez le professionnel qu'on contacte quand on a un défi difficile.", tags: ['marque personnelle', 'réputation'] },
  { id: 'm6-c-12', missionNumber: 6, type: 'conseil', content: "Planifiez aussi la dimension personnelle de votre carrière : équilibre vie professionnelle/personnelle, santé, relations. La durabilité compte.", tags: ['équilibre', 'durabilité'] },

  { id: 'm6-r-1', missionNumber: 6, type: 'réflexion', content: "Dans 10 ans, quelle phrase aimeriez-vous qu'on utilise pour vous décrire professionnellement ?", tags: ['vision', 'réputation future'] },
  { id: 'm6-r-2', missionNumber: 6, type: 'réflexion', content: "Qu'est-ce qui vous empêche de penser à long terme ? L'urgence du quotidien, la peur, le manque de clarté ?", tags: ['blocages', 'long terme'] },
  { id: 'm6-r-3', missionNumber: 6, type: 'réflexion', content: "Si argent, statut et regard des autres n'existaient pas, quelle carrière choisiriez-vous ?", tags: ['authenticité', 'motivation profonde'] },
  { id: 'm6-r-4', missionNumber: 6, type: 'réflexion', content: "Y a-t-il un secteur ou une cause pour laquelle vous aimeriez contribuer dans les 10 prochaines années ?", tags: ['impact', 'sens'] },
  { id: 'm6-r-5', missionNumber: 6, type: 'réflexion', content: "Comment imaginez-vous concilier votre ambition professionnelle avec votre vision de la vie que vous souhaitez mener ?", tags: ['équilibre', 'ambition'] },
  { id: 'm6-r-6', missionNumber: 6, type: 'réflexion', content: "Quelle compétence manquante, si vous l'acquériez dans les 2 prochaines années, changerait radicalement votre trajectoire ?", tags: ['compétences', 'développement'] },
  { id: 'm6-r-7', missionNumber: 6, type: 'réflexion', content: "Avez-vous des mentors dans votre vie ? Que vous apportent-ils ? Comment en trouver davantage ?", tags: ['mentors', 'guidance'] },
  { id: 'm6-r-8', missionNumber: 6, type: 'réflexion', content: "Qu'est-ce que vous n'êtes pas prêt(e) à sacrifier pour réussir ? Cette réponse définit vos vraies limites.", tags: ['limites', 'valeurs'] },
  { id: 'm6-r-9', missionNumber: 6, type: 'réflexion', content: "Regardez la trajectoire de 3 professionnels que vous admirez. Quels patterns communs observez-vous ?", tags: ['modèles', 'patterns'] },
  { id: 'm6-r-10', missionNumber: 6, type: 'réflexion', content: "Dans quelle mesure votre environnement actuel (études, réseau, habitudes) vous prépare-t-il à votre vision long terme ?", tags: ['environnement', 'préparation'] },

  { id: 'm6-d-1', missionNumber: 6, type: 'défi', content: "Rédigez votre 'obituaire professionnel' imaginaire dans 30 ans : qu'est-ce qu'on dirait de votre carrière et de votre impact ?", tags: ['impact', 'vision'] },
  { id: 'm6-d-2', missionNumber: 6, type: 'défi', content: "Créez un 'career roadmap' visuel sur 10 ans avec des jalons de 2-3 ans. Partagez-le et demandez des retours.", tags: ['roadmap', 'planification'] },
  { id: 'm6-d-3', missionNumber: 6, type: 'défi', content: "Identifiez 3 tendances qui vont transformer votre secteur dans les 5 prochaines années. Comment vous y préparez-vous ?", tags: ['tendances', 'anticipation'] },
  { id: 'm6-d-4', missionNumber: 6, type: 'défi', content: "Contactez un professionnel ayant 10-15 ans d'expérience dans votre domaine cible. Demandez-lui ce qu'il ferait différemment s'il recommençait.", tags: ['mentor', 'conseils'] },
  { id: 'm6-d-5', missionNumber: 6, type: 'défi', content: "Écrivez une lettre à vous-même à lire dans 5 ans : vos ambitions actuelles, vos peurs, vos engagements.", tags: ['lettre future', 'engagements'] },
  { id: 'm6-d-6', missionNumber: 6, type: 'défi', content: "Lisez un livre de référence de votre secteur (biographie d'un dirigeant, essai de management). Présentez 3 idées clés au groupe.", tags: ['lecture', 'partage'] },
  { id: 'm6-d-7', missionNumber: 6, type: 'défi', content: "Définissez votre 'zone de génie' : là où vos talents naturels, vos compétences développées et votre passion se rejoignent.", tags: ['zone de génie', 'talents'] },
  { id: 'm6-d-8', missionNumber: 6, type: 'défi', content: "Analysez une transition de carrière réussie dans votre secteur. Quels éléments ont rendu ce pivot possible ?", tags: ['pivot', 'analyse'] },
  { id: 'm6-d-9', missionNumber: 6, type: 'défi', content: "Préparez votre plan de développement professionnel sur 12 mois : compétences à acquérir, expériences à chercher, réseau à construire.", tags: ['plan de développement', '12 mois'] },
  { id: 'm6-d-10', missionNumber: 6, type: 'défi', content: "Identifiez 3 entreprises dans lesquelles vous aimeriez travailler dans 7-10 ans. Commencez à construire votre réseau dans ces organisations dès maintenant.", tags: ['cibles long terme', 'réseau'] },

  { id: 'm6-i-1', missionNumber: 6, type: 'inspiration', content: "\"La meilleure façon de prédire l'avenir est de le créer.\" — Peter Drucker. Votre carrière n'attend pas — elle se construit.", tags: ['avenir', 'action'] },
  { id: 'm6-i-2', missionNumber: 6, type: 'inspiration', content: "Les carrières les plus remarquables ne suivent jamais un plan parfait. Elles suivent une direction, ajustée à chaque tournant.", tags: ['direction', 'adaptabilité'] },
  { id: 'm6-i-3', missionNumber: 6, type: 'inspiration', content: "\"Investissez en vous-même. Votre carrière est le moteur de votre vie.\" — Charlie Munger", tags: ['investissement', 'développement'] },
  { id: 'm6-i-4', missionNumber: 6, type: 'inspiration', content: "Dans 10 ans, vous regretterez davantage ce que vous n'avez pas osé que ce que vous avez tenté et raté.", tags: ['regret', 'audace'] },
  { id: 'm6-i-5', missionNumber: 6, type: 'inspiration', content: "\"Le succès durable est construit sur des fondations de confiance, d'expertise et de relations authentiques.\" Ces trois piliers se cultivent dès maintenant.", tags: ['durabilité', 'fondations'] },
  { id: 'm6-i-6', missionNumber: 6, type: 'inspiration', content: "Les compétences de demain ne sont pas encore définies. La capacité d'apprendre et de s'adapter sera toujours la compétence la plus précieuse.", tags: ['adaptabilité', 'apprentissage'] },
  { id: 'm6-i-7', missionNumber: 6, type: 'inspiration', content: "\"Ce que vous faites aujourd'hui peut améliorer tous vos lendemains.\" — Ralph Marston. Les petites actions d'aujourd'hui composent les grandes trajectoires.", tags: ['actions quotidiennes', 'long terme'] },
  { id: 'm6-i-8', missionNumber: 6, type: 'inspiration', content: "Les professionnels qui ont une vision claire de leur trajectoire prennent de meilleures décisions — même les petites décisions quotidiennes.", tags: ['vision', 'décisions'] },
  { id: 'm6-i-9', missionNumber: 6, type: 'inspiration', content: "\"Un expert est quelqu'un qui a fait toutes les erreurs possibles dans un domaine très étroit.\" — Niels Bohr. L'expertise vient de l'expérience, pas de la prudence.", tags: ['expertise', 'erreurs'] },
  { id: 'm6-i-10', missionNumber: 6, type: 'inspiration', content: "Votre carrière idéale existe déjà quelque part — quelqu'un la vit. Votre mission est de comprendre comment il ou elle y est arrivé.", tags: ['modèles', 'possibilité'] },
]

export const UNIVERS2_CARDS: Univers2Card[] = [
  ...m1Cards,
  ...m2Cards,
  ...m3Cards,
  ...m4Cards,
  ...m5Cards,
  ...m6Cards,
]

export function getCardsByMission(missionNumber: number): Univers2Card[] {
  return UNIVERS2_CARDS.filter(c => c.missionNumber === missionNumber)
}

export function getCardsByMissionAndType(missionNumber: number, type: CardType): Univers2Card[] {
  return UNIVERS2_CARDS.filter(c => c.missionNumber === missionNumber && c.type === type)
}

export function getMissionsForTrack(track: Track): Univers2Mission[] {
  return UNIVERS2_MISSIONS.filter(m => m.availableFor.includes(track))
}
