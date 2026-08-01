// Contenu du parcours PGE1A — adapté du parcours B1 (checkpoints 2, 3 et 6)
// Niveau Grande École : vocabulaire plus exigeant, situations orientées stages à responsabilités
// (conseil, finance, marketing digital, structures internationales)

// ─── Checkpoint 1 — Mon CV, ma vitrine professionnelle (adapté du CP2 B1) ───

export const diagnosticCV = [
  { texte: 'En école de commerce, un CV se démarque surtout par son originalité graphique plus que par son contenu.', reponse: false, explication: 'Faux. Un recruteur en cabinet ou en entreprise attend un format sobre et lisible : c\'est la précision du contenu qui fait la différence, pas la créativité visuelle.' },
  { texte: 'Une accroche professionnelle en tête de CV (2-3 lignes) aide le recruteur à comprendre immédiatement votre projet.', reponse: true, explication: 'Vrai. En PGE, où les candidatures sont nombreuses, une accroche claire évite au recruteur de deviner votre positionnement.' },
  { texte: 'Mentionner sa mention au bac ou sa moyenne générale est toujours valorisant, quel que soit le niveau.', reponse: false, explication: 'Faux. Ce n\'est pertinent que si le résultat est réellement un atout ; sinon, mieux vaut consacrer la place aux expériences et compétences.' },
  { texte: 'Un CV pour un stage en finance ou en conseil doit systématiquement indiquer le niveau de maîtrise d\'Excel et des outils d\'analyse.', reponse: true, explication: 'Vrai. Ces secteurs filtrent souvent sur les compétences techniques : les nommer précisément (Excel avancé, Power BI, SQL...) évite d\'être écarté sur ce critère.' },
  { texte: 'Indiquer un niveau d\'anglais "courant" suffit, sans plus de précision, car c\'est un attendu implicite en PGE.', reponse: false, explication: 'Faux. Un niveau CECRL (B2, C1) ou une certification (TOEIC, TOEFL) est plus crédible et vérifiable qu\'une mention vague.' },
  { texte: 'Une expérience associative (junior-entreprise, BDE, asso humanitaire) a sa place sur un CV de stage en entreprise.', reponse: true, explication: 'Vrai. Ces expériences démontrent des compétences transférables (gestion de projet, leadership, budget) très recherchées, à condition d\'être formulées en termes de résultats.' },
  { texte: 'Le lien vers son profil LinkedIn n\'apporte rien de plus qu\'un CV papier bien fait.', reponse: false, explication: 'Faux. Un recruteur consulte quasi systématiquement le LinkedIn en complément : un lien à jour renforce la cohérence et la crédibilité du dossier.' },
  { texte: 'Un CV pour une candidature en France et un CV pour une candidature à l\'international peuvent nécessiter des formats différents.', reponse: true, explication: 'Vrai. Les usages varient selon les pays (photo, longueur, informations personnelles) : il faut adapter le format au marché visé.' },
]

export const reformulationsPGE1A = [
  {
    experience: 'Mission au sein d\'une junior-entreprise',
    bon: 'Chef de projet junior-entreprise — piloté une mission de conseil pour un client PME, budget 8 000 €, équipe de 4 étudiants',
    faible: 'Membre actif de la junior-entreprise de l\'école',
    moyen: 'A participé à des missions pour la junior-entreprise, gestion d\'équipe',
    explication: 'Préciser le rôle exact, le montant du budget et la taille de l\'équipe rend l\'expérience vérifiable et professionnelle, même sans salaire perçu.',
  },
  {
    experience: 'Compétences analytiques (Excel, data)',
    bon: 'Maîtrise avancée d\'Excel (TCD, macros VBA) et bases de SQL, utilisées lors d\'un projet d\'analyse de données marketing',
    faible: 'Bon niveau Excel',
    moyen: 'À l\'aise avec Excel et les chiffres',
    explication: 'Nommer les fonctions précises et le contexte d\'utilisation transforme une compétence vague en preuve concrète, exploitable par un recruteur technique.',
  },
  {
    experience: 'Stage ou job à l\'international',
    bon: 'Stage marketing digital (3 mois, Dublin) : gestion de campagnes social ads en anglais pour un marché B2C européen',
    faible: 'Stage à l\'étranger, expérience internationale',
    moyen: 'A fait un stage en Irlande dans le marketing',
    explication: 'La durée, la ville, la mission concrète et la langue de travail donnent une valeur mesurable à l\'expérience internationale.',
  },
  {
    experience: 'Objectif professionnel / accroche de CV',
    bon: 'Étudiant en PGE1, spécialisation marketing digital envisagée, à la recherche d\'un stage opérationnel en agence ou en direction marketing pour l\'été prochain',
    faible: 'Objectif : trouver un stage intéressant',
    moyen: 'Recherche un stage pour développer ses compétences',
    explication: 'Une accroche précise (niveau d\'études, spécialisation, type de poste, période) permet au recruteur de vous positionner en quelques secondes.',
  },
  {
    experience: 'Engagement associatif (BDE, asso étudiante)',
    bon: 'Trésorier BDE — géré un budget annuel de 25 000 € et coordonné 6 événements réunissant 300 étudiants',
    faible: 'Membre du bureau des étudiants',
    moyen: 'A aidé à organiser des événements étudiants',
    explication: 'Le montant géré et l\'ampleur des événements démontrent une vraie responsabilité, transposable à un contexte professionnel.',
  },
]

export const checklistPGE1A = [
  'Accroche professionnelle claire en tête de CV (2-3 lignes)',
  'Une seule page, format sobre et lisible (pas de surcharge graphique)',
  'Compétences techniques nommées précisément (outils, niveaux)',
  'Niveaux de langue avec référentiel (CECRL ou certification)',
  'Au moins une expérience chiffrée (budget, équipe, résultat)',
  'Lien LinkedIn à jour et cohérent avec le CV',
  'Zéro faute d\'orthographe (relu au moins 3 fois)',
  'Nom de fichier professionnel : NOM_Prénom_CV.pdf',
]

// ─── Checkpoint 2 — Rédiger et envoyer sa candidature (adapté du CP3 B1) ───

export const diagnosticEnvoiPGE1A = [
  { texte: 'Le fichier CV envoyé doit s\'appeler "CV_Prénom_Nom.pdf" plutôt que "Document1.pdf".', reponse: true, explication: 'Vrai. Un nom de fichier professionnel facilite le tri côté recruteur, surtout quand il reçoit des dizaines de candidatures pour une même offre en cabinet ou en grand groupe.' },
  { texte: 'Pour une candidature en cabinet de conseil ou en finance, il est acceptable d\'envoyer la même lettre de motivation à toutes les entreprises.', reponse: false, explication: 'Faux. Ces secteurs valorisent particulièrement la personnalisation : citer un projet, une actualité ou une spécificité de l\'entreprise fait la différence.' },
  { texte: 'Le CV doit être envoyé au format PDF plutôt qu\'en Word.', reponse: true, explication: 'Vrai. Le PDF garantit une mise en page identique quel que soit l\'ordinateur ou le logiciel du destinataire.' },
  { texte: 'L\'objet du mail doit mentionner précisément le poste et, si besoin, la référence de l\'offre.', reponse: true, explication: 'Vrai. En grande entreprise, le recrutement gère souvent plusieurs offres en parallèle : une référence précise évite toute confusion.' },
  { texte: 'Une candidature spontanée pour un stage en grande entreprise n\'a aucune chance d\'aboutir, mieux vaut ne postuler qu\'aux offres publiées.', reponse: false, explication: 'Faux. De nombreux stages en PGE se décrochent par candidature spontanée, notamment en identifiant le bon interlocuteur (alumni, manager d\'équipe).' },
  { texte: 'Mentionner un contact commun (alumni, professeur, professionnel du secteur) dans le mail de candidature est déconseillé.', reponse: false, explication: 'Faux. Mentionner un contact pertinent, avec son accord, renforce la crédibilité de la candidature — c\'est une pratique courante en PGE.' },
  { texte: 'Le mail de candidature doit rester court : quelques lignes suffisent, le CV et la lettre détaillent le reste.', reponse: true, explication: 'Vrai. Le mail doit donner envie d\'ouvrir les pièces jointes, pas les répéter intégralement.' },
  { texte: 'Il est acceptable d\'envoyer sa candidature sans relire une dernière fois le mail et la lettre de motivation.', reponse: false, explication: 'Faux. Une relecture finale (fond et forme) reste indispensable, quel que soit le niveau d\'études.' },
]

export const formulesMailPGE1A = [
  {
    contexte: 'Objet du mail',
    bon: 'Candidature — Stage Assistant(e) Marketing Digital (réf. 2026-047) — [Prénom Nom]',
    faible: 'Candidature',
    moyen: 'Bonjour, candidature pour un stage',
    explication: 'Un objet précis (poste, référence, nom) permet à un service RH qui gère plusieurs offres d\'identifier immédiatement la candidature.',
  },
  {
    contexte: 'Phrase d\'accroche',
    bon: 'Étudiant(e) en PGE1 à l\'EDC Paris, spécialisation marketing digital envisagée, je suis particulièrement intéressé(e) par le stage d\'Assistant(e) Marketing que vous proposez.',
    faible: 'Je vous écris pour vous proposer ma candidature.',
    moyen: 'Je suis étudiant en école de commerce et votre offre m\'intéresse.',
    explication: 'La bonne accroche nomme le niveau d\'études, la spécialisation envisagée et le poste : elle montre une candidature réfléchie, pas envoyée en masse.',
  },
  {
    contexte: 'Mention d\'un contact ou d\'une motivation spécifique',
    bon: 'Ayant suivi le développement de votre nouvelle offre B2C, je souhaiterais contribuer à son déploiement digital.',
    faible: 'Votre entreprise m\'intéresse beaucoup.',
    moyen: 'J\'aime bien votre secteur d\'activité.',
    explication: 'Une motivation ancrée dans une actualité ou un projet réel de l\'entreprise démontre une recherche préalable, très valorisée en PGE.',
  },
  {
    contexte: 'Formule de clôture',
    bon: 'Je reste à votre disposition pour échanger sur ma candidature lors d\'un entretien et vous remercie de l\'attention portée à ma démarche.',
    faible: 'Voilà, j\'espère une réponse rapide.',
    moyen: 'Merci d\'avance pour votre réponse.',
    explication: 'Une formule de clôture professionnelle marque la disponibilité du candidat sans paraître pressante.',
  },
]

export const criteresCoherencePGE1A = [
  'Le mail nomme précisément le poste, l\'entreprise et la référence de l\'offre si elle existe',
  'La lettre ou le mail est personnalisé pour cette entreprise (pas de copier-coller générique)',
  'Le CV joint reprend les mots-clés de l\'offre',
  'Le ton correspond au secteur visé (formel en finance/conseil, plus direct en marketing/digital)',
  'Aucune faute dans le mail, la lettre ni dans le nom du fichier joint',
]

// ─── Checkpoint 3 — Entretien de stage (adapté du CP6 B1) ───

export type ThemePGE1A = 'experiences' | 'formations' | 'disponibilite' | 'personnalite' | 'langues' | 'informatique'

export interface CarteThemePGE1A {
  question: string
  conseilReponse: string
  aEviter: string
  bonneAmorce: string
}

export const cartesPGE1A: Record<ThemePGE1A, CarteThemePGE1A[]> = {
  experiences: [
    { question: 'Quelle expérience (junior-entreprise, stage, association) illustre le mieux votre capacité à porter un projet ?', conseilReponse: 'Choisissez une expérience avec un enjeu réel (budget, délai, équipe) et racontez-la avec la méthode STAR (Situation, Tâche, Action, Résultat).', aEviter: 'Une expérience purement académique sans mise en situation concrète, ou un récit flou sans résultat mesurable.', bonneAmorce: 'Lors de ma mission au sein de [structure], j\'ai été confronté(e) à [situation], et voici comment j\'ai procédé…' },
    { question: 'Vous n\'avez pas encore d\'expérience en entreprise classique : comment valorisez-vous vos engagements associatifs ou projets étudiants ?', conseilReponse: 'Un engagement associatif avec responsabilités (budget, équipe, événement) se valorise comme une vraie expérience professionnelle si vous en chiffrez les résultats.', aEviter: '« Je n\'ai pas vraiment d\'expérience » sans proposer d\'alternative concrète.', bonneAmorce: 'Bien que mon expérience en entreprise soit limitée, mon rôle de [fonction] au sein de [asso/junior-entreprise] m\'a permis de développer…' },
    { question: 'Parlez-moi d\'un projet où vous avez dû convaincre ou fédérer une équipe.', conseilReponse: 'Montrez votre posture de leadership sans écraser le collectif : décrivez la difficulté, votre méthode, et le résultat obtenu ensemble.', aEviter: 'S\'attribuer tout le mérite d\'un travail collectif, ou au contraire ne se donner aucun rôle actif.', bonneAmorce: 'Sur le projet [X], j\'ai dû fédérer une équipe de [taille] autour de [objectif], ce qui a permis…' },
  ],
  formations: [
    { question: 'Pourquoi avoir choisi un Programme Grande École plutôt qu\'un autre parcours ?', conseilReponse: 'Reliez ce choix à un projet professionnel cohérent (généraliste avant spécialisation, ouverture internationale, réseau) plutôt qu\'à un choix par défaut.', aEviter: '« Par défaut » ou parce que c\'était la voie la plus prestigieuse sans lien avec un projet.', bonneAmorce: 'J\'ai choisi le PGE car il me permet de construire un socle généraliste avant de me spécialiser en [domaine envisagé]…' },
    { question: 'Vous n\'avez pas encore choisi votre spécialisation (finance, marketing, négociation…) : comment en parlez-vous en entretien ?', conseilReponse: 'Assumez que la première année sert justement à explorer, en citant 1 ou 2 pistes sérieuses et ce qui vous attire dans chacune.', aEviter: 'Une réponse totalement vague type « je ne sais pas encore » sans aucune piste de réflexion.', bonneAmorce: 'À ce stade, deux spécialisations m\'intéressent particulièrement : [X] et [Y], pour des raisons différentes…' },
    { question: 'En quoi votre première année de PGE vous a-t-elle déjà préparé(e) à un stage en entreprise ?', conseilReponse: 'Citez 2 à 3 acquis concrets (méthodologie de projet, travail en équipe internationale, outils analytiques) directement transférables.', aEviter: 'Une réponse vague du type « j\'ai beaucoup appris » sans rien de concret.', bonneAmorce: 'Cette première année m\'a surtout appris à [compétence précise], que je pourrai mobiliser dès le premier jour de stage.' },
  ],
  disponibilite: [
    { question: 'Quelles sont vos disponibilités pour ce stage ?', conseilReponse: 'Indiquez des dates précises, cohérentes avec le calendrier académique du PGE, et anticipez d\'éventuels séjours à l\'international.', aEviter: 'Rester flou sans avoir vérifié son calendrier de cours et de mobilité.', bonneAmorce: 'Je suis disponible du [date] au [date], ce qui correspond à la durée que vous recherchez.' },
    { question: 'Le PGE prévoit une mobilité internationale : comment l\'articulez-vous avec votre recherche de stage ?', conseilReponse: 'Montrez que vous avez déjà réfléchi au calendrier global de votre cursus et anticipé les périodes disponibles pour un stage.', aEviter: 'Découvrir l\'incompatibilité de dates après avoir accepté un stage.', bonneAmorce: 'Ma mobilité internationale est prévue en [période], ce qui laisse [période] disponible pour un stage.' },
    { question: 'Pouvez-vous vous engager sur la durée complète du stage demandée ?', conseilReponse: 'Confirmez clairement votre engagement, ou soyez honnête tout de suite si une contrainte académique existe.', aEviter: 'Vous engager sans vérifier votre calendrier, au risque de devoir écourter le stage plus tard.', bonneAmorce: 'Oui, je peux m\'engager sur toute la durée prévue, mes cours reprenant seulement le [date].' },
  ],
  personnalite: [
    { question: 'Comment vos camarades de junior-entreprise ou d\'association vous décriraient-ils en 3 mots ?', conseilReponse: 'Choisissez des qualités cohérentes avec votre profil professionnel et illustrez-les par un exemple concret vécu en collectif.', aEviter: 'Des qualités trop superficielles ou incohérentes avec le poste visé.', bonneAmorce: 'Ils diraient que je suis [mot 1], [mot 2] et [mot 3], ce qui s\'est vu quand [exemple concret]…' },
    { question: 'Comment gérez-vous la pression d\'un délai serré (rendu de projet, deadline client) ?', conseilReponse: 'Donnez un exemple concret de gestion du temps et des priorités, sans prétendre ne jamais être stressé(e).', aEviter: '« Je ne stresse jamais » sans exemple, ou au contraire décrire une situation subie sans méthode.', bonneAmorce: 'Face à [deadline concrète], j\'ai priorisé en commençant par… ce qui m\'a permis de livrer à temps.' },
    { question: 'Comment réagissez-vous quand vous recevez une critique sur votre travail ?', conseilReponse: 'Montrez que vous écoutez, prenez du recul, et transformez la critique en amélioration concrète.', aEviter: '« Je ne prends pas bien la critique » sans rien pour compenser.', bonneAmorce: 'Quand je reçois une critique, je prends d\'abord le temps de l\'analyser avant d\'ajuster [aspect concret].' },
  ],
  langues: [
    { question: 'Quel est votre niveau en anglais professionnel ?', conseilReponse: 'Indiquez un niveau réel et vérifiable (CECRL, TOEIC/TOEFL) plutôt qu\'une estimation optimiste, surtout dans un contexte international.', aEviter: 'Annoncer un niveau bilingue sans pouvoir le confirmer si l\'entretien bascule en anglais.', bonneAmorce: 'J\'ai un niveau [B2/C1], certifié par [test], que j\'ai pu pratiquer lors de [expérience concrète].' },
    { question: 'Avez-vous déjà travaillé ou étudié en anglais sur un cas concret (projet, cours, stage) ?', conseilReponse: 'Citez un exemple précis : cours dispensé en anglais, étude de cas internationale, stage avec clientèle étrangère.', aEviter: 'Répondre non sans chercher une expérience proche.', bonneAmorce: 'Oui, lors de [expérience], j\'ai dû produire/échanger en anglais pour…' },
    { question: 'Parlez-vous une troisième langue, et dans quel contexte l\'utilisez-vous ?', conseilReponse: 'Si oui, situez le niveau et l\'usage réel ; si non, montrez une ouverture ou un projet d\'apprentissage cohérent avec votre parcours.', aEviter: 'Survendre une langue à peine débutée.', bonneAmorce: 'Je pratique [langue] à un niveau [précision], notamment lors de…' },
  ],
  informatique: [
    { question: 'Quelles sont vos compétences en analyse de données ou en outils bureautiques avancés ?', conseilReponse: 'Citez des outils précis (Excel avancé, Power BI, SQL) et un exemple d\'usage concret, plutôt qu\'une liste générique.', aEviter: '« Je maîtrise tous les outils » sans précision, ou survendre son niveau.', bonneAmorce: 'Je suis à l\'aise avec [outil précis], que j\'ai utilisé pour [usage concret lors d\'un projet].' },
    { question: 'Avez-vous déjà utilisé des outils d\'intelligence artificielle dans vos travaux académiques ou projets associatifs ? Comment ?', conseilReponse: 'Montrez un usage réfléchi et honnête : aide à la recherche, structuration d\'idées, jamais un rendu final non vérifié.', aEviter: 'Prétendre ne jamais utiliser l\'IA, ou au contraire dire qu\'on lui délègue tout sans relecture.', bonneAmorce: 'J\'utilise [outil IA] pour [usage précis], en vérifiant et en adaptant toujours le résultat moi-même.' },
    { question: 'Êtes-vous à l\'aise pour présenter des résultats chiffrés à l\'oral (soutenance, présentation client) ?', conseilReponse: 'Donnez un exemple concret de présentation réalisée, en insistant sur la clarté du message plutôt que sur la technique seule.', aEviter: 'Éluder la question par manque de préparation apparente.', bonneAmorce: 'Lors de [présentation/soutenance], j\'ai dû restituer [type de résultats] devant [public], en insistant sur…' },
  ],
}

